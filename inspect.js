const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function listFields() {
  try {
    // Читаем файл из текущей папки
    const pdfBytes = fs.readFileSync('./public/formular.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    console.log('--- СПИСОК ПОЛЕЙ PDF ---');
    
    fields.forEach((field, index) => {
      const type = field.constructor.name;
      const name = field.getName();
      console.log(`${index + 1}. [${type}] Имя поля: "${name}"`);
    });

    console.log('------------------------');
    console.log(`Всего найдено полей: ${fields.length}`);
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
}

listFields();