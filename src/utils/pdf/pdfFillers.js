import { setFieldDirect, setCheckbox, setFieldBySearch } from './pdfHelpers';
import { incomeMap } from './pdfMappings';

export const fillPersonalData = (form, sectionA) => {
  setFieldDirect(form, 'Name, Vorname, ggf. Geburtsname', sectionA.fullName);
  setFieldDirect(form, 'Beruf, Erwerbstätigkeit', sectionA.occupation);
  setFieldDirect(form, 'Geburtsdatum', sectionA.birthday);
  setFieldDirect(form, 'Familienstand', sectionA.maritalStatus);
  setFieldDirect(form, 'Anschrift (Straße, Hausnummer, Postleitzahl, Wohnort)', sectionA.address);
  setFieldDirect(form, 'Tagsüber erreichbar unter Nummer', sectionA.phone);
  setFieldDirect(form, 'Sofern vorhanden: Gesetzlicher Vertreter (Name, Vorname, Anschrift, Telefon', sectionA.legalRepresentative);
};

export const fillInsuranceData = (form, sectionB) => {
  if (sectionB.hasInsurance === 'yes') {
    setCheckbox(form, 'B2', true); 
    setFieldDirect(form, 'Höhe der Kosten', sectionB.insuranceDetails);
  } else { 
    setCheckbox(form, 'B1', true); 
  }
  
  if (sectionB.hasPotentialInsurance === 'yes') {
    setCheckbox(form, 'B4', true); 
    setFieldDirect(form, 'Bezeichnung der Versicherung', sectionB.potentialInsuranceDetails);
  } else if (sectionB.hasPotentialInsurance === 'no') { 
    setCheckbox(form, 'B3', true); 
  }
};

export const fillMaintenanceData = (form, sectionC) => {
  if (sectionC.hasMaintenanceClaims === 'yes') {
    setCheckbox(form, 'C2', true); 
    setFieldDirect(form, 'Name des Unterhaltspflichtigen', sectionC.maintenancePersonDetails);
  } else { 
    setCheckbox(form, 'C1', true); 
  }
};

export const fillDependentsData = (form, sectionD) => {
  if (sectionD.hasDependents === 'yes' && sectionD.dependents.length > 0) {
    sectionD.dependents.forEach((person, index) => {
      if (index >= 5) return;
      const rowNum = index + 1;
      setFieldDirect(form, `Angehöriger Nr. ${rowNum}`, person.name);
      setFieldDirect(form, `Geburtsdatum ${rowNum}`, person.birthday);
      setFieldDirect(form, `Verhältnis ${rowNum}`, person.relationship);
      setFieldDirect(form, `Monatsbetrag ${rowNum}`, person.monthlyAmount);
      if (person.hasOwnIncome === 'yes') {
        setCheckbox(form, `D${rowNum * 2}`, true); 
        setFieldDirect(form, `Betrag ${rowNum}`, person.incomeAmount);
      } else { 
        setCheckbox(form, `D${rowNum * 2 - 1}`, true); 
      }
    });
  }
};

export const fillIncomeData = (form, fields, sectionE) => {
  Object.keys(incomeMap).forEach(key => {
    const mapping = incomeMap[key];
    
    // Заявитель
    const selfItem = sectionE.self[key];
    if (selfItem) {
      if (selfItem.has === 'yes') {
        setCheckbox(form, mapping.self.ja, true);
        setFieldBySearch(form, fields, mapping.search, selfItem.brutto, false); 
      } else {
        setCheckbox(form, mapping.self.nein, true);
      }
    } else {
      setCheckbox(form, mapping.self.nein, true);
    }

    if (sectionE.hasPartner === 'yes') {
      const partnerItem = sectionE.partner[key];
      if (partnerItem) {
        if (partnerItem.has === 'yes') {
          setCheckbox(form, mapping.partner.ja, true);
          setFieldBySearch(form, fields, mapping.search, partnerItem.brutto, true);
        } else {
          setCheckbox(form, mapping.partner.nein, true);
        }
      } else {
        setCheckbox(form, mapping.partner.nein, true);
      }
    }
  });

  const otherSelf = sectionE.self.sonstige;
  if (otherSelf && otherSelf.has === 'yes') {
    setCheckbox(form, 'E26', true); 
    if (otherSelf.items && otherSelf.items.length > 0) {
      if (otherSelf.items[0]) {
        setFieldDirect(form, 'Andere Einnahmen 1', otherSelf.items[0].details);
        setFieldDirect(form, 'Bruttobezug 1', otherSelf.items[0].brutto);
      }
      if (otherSelf.items[1]) {
        setFieldDirect(form, 'Andere Einnahmen 2', otherSelf.items[1].details);
        setFieldDirect(form, 'Bruttobezug 2', otherSelf.items[1].brutto);
      }
    } else {
      setFieldDirect(form, 'Andere Einnahmen 1', otherSelf.details);
      setFieldDirect(form, 'Bruttobezug 1', otherSelf.brutto);
    }
  } else {
    setCheckbox(form, 'E25', true); 
  }

  // Партнер
  if (sectionE.hasPartner === 'yes') {
    const otherPartner = sectionE.partner.sonstige;
    if (otherPartner && otherPartner.has === 'yes') {
      setCheckbox(form, 'E52', true); 
      if (otherPartner.items && otherPartner.items.length > 0) {
        if (otherPartner.items[0]) {
          setFieldDirect(form, 'Andere Einnahmen Partner/Partnerin 1', otherPartner.items[0].details);
          setFieldDirect(form, 'Bruttobezug Partner/Partnerin 1', otherPartner.items[0].brutto);
        }
        if (otherPartner.items[1]) {
          setFieldDirect(form, 'Andere Einnahmen Partner/Partnerin 2', otherPartner.items[1].details);
          setFieldDirect(form, 'Bruttobezug Partner/Partnerin 2', otherPartner.items[1].brutto);
        }
      } else {
        setFieldDirect(form, 'Andere Einnahmen Partner/Partnerin 1', otherPartner.details);
        setFieldDirect(form, 'Bruttobezug Partner/Partnerin 1', otherPartner.brutto);
      }
    } else {
      setCheckbox(form, 'E51', true); 
    }
  }
};