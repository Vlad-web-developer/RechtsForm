import { PDFDocument, rgb } from 'pdf-lib';
import { 
  fillPersonalData, 
  fillInsuranceData, 
  fillMaintenanceData, 
  fillDependentsData, 
  fillIncomeData,
  fillDeductionsData,
  fillAssetsData,
  fillHousingData,
  fillObligationsData,
  fillSpecialLoadsData,
  fillDeclarationData,
} from './pdf/pdfFillers';

const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

export const generateAndDownloadPDF = async (formData, files, signatureData) => {
  const url = '/formular.pdf';

  try {
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const form = pdfDoc.getForm();
    const fields = form.getFields(); 

    fillPersonalData(form, formData.sectionA);
    fillInsuranceData(form, formData.sectionB);
    fillMaintenanceData(form, formData.sectionC);
    fillDependentsData(form, formData.sectionD);

    const isSGBXII = formData.sectionE?.receivesSocialAssistanceSGBXII === 'yes';

    if (!isSGBXII) {
        fillIncomeData(form, fields, formData.sectionE);
        fillDeductionsData(form, formData.sectionF, formData.sectionE.hasPartner);
        fillAssetsData(form, formData.sectionG);
        fillHousingData(form, formData.sectionH);
        fillObligationsData(form, formData.sectionI);
        fillSpecialLoadsData(form, formData.sectionJ);
    }

    await fillDeclarationData(pdfDoc, form, formData.sectionK, signatureData);

    const fileArray = files ? Object.values(files) : [];

    if (fileArray.length > 0) {
        console.log(`Verarbeite ${fileArray.length} Anhänge...`);

        for (const file of fileArray) {
            try {
                const fileBytes = await readFileAsync(file);

                if (file.type === 'application/pdf') {
                    const attachmentPdf = await PDFDocument.load(fileBytes);
                    const copiedPages = await pdfDoc.copyPages(attachmentPdf, attachmentPdf.getPageIndices());
                    copiedPages.forEach((page) => pdfDoc.addPage(page));
                } 
                else if (file.type.startsWith('image/')) {
                    let image;
                    if (file.type === 'image/png') {
                        image = await pdfDoc.embedPng(fileBytes);
                    } else {
                        image = await pdfDoc.embedJpg(fileBytes);
                    }

                    const page = pdfDoc.addPage();
                    const { width, height } = page.getSize();
                    const margin = 40;
                    const imgDims = image.scaleToFit(width - margin * 2, height - margin * 2);

                    page.drawImage(image, {
                        x: (width - imgDims.width) / 2,
                        y: (height - imgDims.height) / 2,
                        width: imgDims.width,
                        height: imgDims.height,
                    });
                    
                    page.drawText(`Anlage: ${file.name}`, {
                        x: margin,
                        y: 20,
                        size: 9,
                        color: rgb(0, 0, 0),
                    });
                }
            } catch (err) {
                console.error("Fehler beim Verarbeiten des Anhangs:", err);
            }
        }
    }

    const pdfBytes = await pdfDoc.save();
    
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `PKH_Antrag_${new Date().toISOString().slice(0,10)}.pdf`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (error) {
    console.error("Критическая ошибка при создании PDF:", error);
  }
};