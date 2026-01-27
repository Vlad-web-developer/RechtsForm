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