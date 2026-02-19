import { setFieldDirect, setCheckbox, setFieldBySearch, drawSignatureImage } from './pdfHelpers';
import { 
  incomeMap, 
  deductionMap, 
  assetsMap, 
  housingMap, 
  obligationsMap,
  declarationMap,
  specialLoadsMap,
} from './pdfMappings';

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

export const fillDeductionsData = (form, sectionF, hasPartner) => {
  if (!sectionF) return;

  Object.keys(deductionMap).forEach(key => {
    const mapping = deductionMap[key];
    
    const selfItem = sectionF.self[key];
    if (selfItem) {
      if (selfItem.description && selfItem.description.trim() !== '') {
        setFieldDirect(form, mapping.self.desc, selfItem.description);
      }
      if (selfItem.amount && selfItem.amount.trim() !== '') {
        setFieldDirect(form, mapping.self.amount, selfItem.amount);
      }
    }

    if (hasPartner === 'yes') {
      const partnerItem = sectionF.partner[key];
      if (partnerItem) {
        if (partnerItem.description && partnerItem.description.trim() !== '') {
          setFieldDirect(form, mapping.partner.desc, partnerItem.description);
        }
        if (partnerItem.amount && partnerItem.amount.trim() !== '') {
          setFieldDirect(form, mapping.partner.amount, partnerItem.amount);
        }
      }
    }
  });
};

export const fillAssetsData = (form, sectionG) => {
  if (!sectionG) return;

  Object.keys(assetsMap).forEach(key => {
    const mapping = assetsMap[key];
    const item = sectionG[key];
    
    if (item && item.has === 'yes') {
      setCheckbox(form, mapping.ja, true);
      if (item.description) {
        setFieldDirect(form, mapping.desc, item.description);
      }
      if (item.value) {
        setFieldDirect(form, mapping.val, item.value);
      }
    } else {
      setCheckbox(form, mapping.nein, true);
    }
  });
};

export const fillHousingData = (form, sectionH) => {
  if (!sectionH) return;

  setFieldDirect(form, housingMap.general.space, sectionH.livingSpace);
  setFieldDirect(form, housingMap.general.rooms, sectionH.numberOfRooms);
  setFieldDirect(form, housingMap.general.people, sectionH.totalPeople);

  if (sectionH.housingType === 'tenant') {
    setCheckbox(form, housingMap.tenant.checkbox.ja, true);
    setCheckbox(form, housingMap.owner.checkbox.nein, true);

    setFieldDirect(form, housingMap.tenant.rentCold, sectionH.rentCold);
    setFieldDirect(form, housingMap.tenant.heating, sectionH.heatingCosts);
    setFieldDirect(form, housingMap.tenant.other, sectionH.otherCosts);
    setFieldDirect(form, housingMap.tenant.total, sectionH.totalRent);
    setFieldDirect(form, housingMap.tenant.share, sectionH.ownShareRent);
  
  } 
  else if (sectionH.housingType === 'owner') {
    setCheckbox(form, housingMap.tenant.checkbox.nein, true);
    setCheckbox(form, housingMap.owner.checkbox.ja, true);

    setFieldDirect(form, housingMap.owner.interest, sectionH.interestRepayment);
    setFieldDirect(form, housingMap.owner.heating, sectionH.heatingCostsOwner);
    setFieldDirect(form, housingMap.owner.other, sectionH.otherCostsOwner);
    setFieldDirect(form, housingMap.owner.total, sectionH.totalCostOwner);
    setFieldDirect(form, housingMap.owner.share, sectionH.ownShareOwner);

    setFieldDirect(form, housingMap.owner.details, sectionH.loanDetails);
    
    if (sectionH.loans && sectionH.loans.length > 0) {
      if (sectionH.loans[0]) {
        setFieldDirect(form, housingMap.owner.restschuld1, sectionH.loans[0].remainingDebt);
        setFieldDirect(form, housingMap.owner.rate1, sectionH.loans[0].monthlyPayment);
      }
      if (sectionH.loans[1]) {
        setFieldDirect(form, housingMap.owner.restschuld2, sectionH.loans[1].remainingDebt); 
        setFieldDirect(form, housingMap.owner.rate2, sectionH.loans[1].monthlyPayment);
      }
    }
  }
};

export const fillObligationsData = (form, sectionI) => {
  if (!sectionI || sectionI.hasObligations !== 'yes' || !sectionI.obligations) return;

  sectionI.obligations.forEach((item, index) => {
    if (index > 2) return;

    const mapping = obligationsMap[index];
    
    if (mapping) {
      setFieldDirect(form, mapping.desc, item.description);
      setFieldDirect(form, mapping.debt, item.remainingDebt);
      setFieldDirect(form, mapping.rate, item.monthlyPayment);
      setFieldDirect(form, mapping.share, item.ownShare);
    }
  });
};

export const fillSpecialLoadsData = (form, sectionJ) => {
  if (!sectionJ || sectionJ.hasSpecialLoads !== 'yes' || !sectionJ.loads) return;

  sectionJ.loads.forEach((item, index) => {
    
    if (index > 1) return; 

    const mapping = specialLoadsMap[index];
    
    if (mapping) {
      setFieldDirect(form, mapping.desc, item.description);
      setFieldDirect(form, mapping.amount, item.amount);
    }
  });
};

export const fillDeclarationData = async (pdfDoc, form, sectionK, signatureData) => {
  const locationDateText = `${sectionK.location || ''}, ${sectionK.date || ''}`;
  setFieldDirect(form, declarationMap.locationDate, locationDateText);

  if (signatureData) {
    try {
      await drawSignatureImage(pdfDoc, signatureData, declarationMap.signature);
    } catch (error) {
      console.error("Error drawing signature onto PDF:", error);
    }
  }
};