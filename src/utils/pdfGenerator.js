import { PDFDocument } from 'pdf-lib';
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
  fillDeclarationData
} from './pdf/pdfFillers';

export const generateAndDownloadPDF = async (formData) => {
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
    fillIncomeData(form, fields, formData.sectionE);
    fillDeductionsData(form, formData.sectionF, formData.sectionE.hasPartner);
    fillAssetsData(form, formData.sectionG);
    fillHousingData(form, formData.sectionH);
    fillObligationsData(form, formData.sectionI);
    fillSpecialLoadsData(form, formData.sectionJ);
    fillDeclarationData(form, formData.sectionK);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'PKH_Formular_Final.pdf';
    link.click();
    
  } catch (error) {
    console.error(error);
    alert('Fehler beim Erstellen des PDFs.');
  }
};