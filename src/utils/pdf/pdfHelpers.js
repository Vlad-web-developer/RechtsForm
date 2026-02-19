import { rgb } from 'pdf-lib';

export const setFieldDirect = (form, name, val) => {
  try {
    const field = form.getTextField(name);
    if (field) {
      field.setText(val ? val.toString() : '');
      field.setFontSize(9);
      field.setTextColor(rgb(0, 0, 0));
    }
  } catch (e) {
  }
};

export const setCheckbox = (form, fieldName, shouldCheck) => {
  try {
    const checkbox = form.getCheckBox(fieldName);
    if (shouldCheck) checkbox.check();
    else checkbox.uncheck();
  } catch (error) { 
  }
};

export const setFieldBySearch = (form, fields, partialName, value, isPartner = false) => {
  if (!value) return;
  
  const field = fields.find(f => {
    const name = f.getName();
    const matchesPhrase = name.includes(partialName);
    const isPartnerField = name.includes("Partner/Partnerin");
    return matchesPhrase && (isPartner === isPartnerField);
  });

  if (field) {
    try {
      const textField = form.getTextField(field.getName());
      textField.setText(value.toString());
      textField.setFontSize(9);
      textField.setTextColor(rgb(0, 0, 0));
    } catch (e) { }
  }
};

export const drawSignatureImage = async (pdfDoc, base64Image, fieldName) => {
  const form = pdfDoc.getForm();
  const signatureField = form.getField(fieldName);
  
  if (!signatureField) {
    console.warn(`Field ${fieldName} not found in PDF`);
    return;
  }
  const widgets = signatureField.acroField.getWidgets();
  const rect = widgets[0].getRectangle();

  const imageBytes = await fetch(base64Image).then((res) => res.arrayBuffer());
  const image = await pdfDoc.embedPng(imageBytes);

  const imgDims = image.scaleToFit(rect.width, rect.height);

  const page = pdfDoc.getPages()[pdfDoc.getPageCount() - 1];

  const xOffset = rect.x + (rect.width - imgDims.width) / 2;
  const yOffset = rect.y + (rect.height - imgDims.height) / 2;

  form.removeField(signatureField);

  page.drawImage(image, {
    x: xOffset,
    y: yOffset,
    width: imgDims.width,
    height: imgDims.height,
  });
};