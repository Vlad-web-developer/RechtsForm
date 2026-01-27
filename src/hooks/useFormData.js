import { useState, useEffect } from 'react';

const INITIAL_DATA = {
  sectionA: {
    fullName: '',
    occupation: '',
    birthday: '',
    maritalStatus: '',
    address: '',
    phone: '',
    legalRepresentative: '',
  },
  sectionB: {
    hasInsurance: null,
    insuranceDetails: '',
    hasPotentialInsurance: null,
    potentialInsuranceDetails: ''
  },
  sectionC: {
    hasMaintenanceClaims: null,
    maintenancePersonDetails: ''
  },
  sectionD: {
    hasDependents: null,
    dependents: []
  },
  sectionE: {
    receivesSocialAssistanceSGBXII: null,
    hasPartner: null,
    // Полная структура для Заявителя (13 категорий)
    self: {
      nichtselbstaendig: { has: 'no', brutto: '' },
      selbstaendig: { has: 'no', brutto: '' },
      vermietung: { has: 'no', brutto: '' },       // Новое
      kapital: { has: 'no', brutto: '' },          // Новое
      kindergeld: { has: 'no', brutto: '' },
      wohngeld: { has: 'no', brutto: '' },
      unterhalt: { has: 'no', brutto: '' },
      rente: { has: 'no', brutto: '' },
      arbeitslosengeld: { has: 'no', brutto: '' },
      buergergeld: { has: 'no', brutto: '' },
      krankengeld: { has: 'no', brutto: '' },      // Новое
      elterngeld: { has: 'no', brutto: '' },       // Новое
      sonstige: { has: 'no', brutto: '', details: '' }
    },
    // Полная структура для Партнера (13 категорий)
    partner: {
      nichtselbstaendig: { has: 'no', brutto: '' },
      selbstaendig: { has: 'no', brutto: '' },
      vermietung: { has: 'no', brutto: '' },       // Новое
      kapital: { has: 'no', brutto: '' },          // Новое
      kindergeld: { has: 'no', brutto: '' },
      wohngeld: { has: 'no', brutto: '' },
      unterhalt: { has: 'no', brutto: '' },
      rente: { has: 'no', brutto: '' },
      arbeitslosengeld: { has: 'no', brutto: '' },
      buergergeld: { has: 'no', brutto: '' },
      krankengeld: { has: 'no', brutto: '' },      // Новое
      elterngeld: { has: 'no', brutto: '' },       // Новое
      sonstige: { has: 'no', brutto: '', details: '' }
    }
  },
  // Заглушки для будущих секций, чтобы не было ошибок
  sectionF: { hasBankAccounts: null, accounts: [], hasOtherAssets: null, assetsDescription: '' },
  sectionG: { totalRent: '' },
  sectionH: { hasOtherLiabilities: null }
};

export const useFormData = () => {
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('currentStep');
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('appFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        
        // ГЛУБОКОЕ СЛИЯНИЕ (Deep Merge) для Section E
        // Это предотвращает ошибку "undefined reading has", если в localStorage старая структура
        const mergedSectionE = {
          ...INITIAL_DATA.sectionE,
          ...parsed.sectionE,
          self: {
            ...INITIAL_DATA.sectionE.self,
            ...(parsed.sectionE?.self || {})
          },
          partner: {
            ...INITIAL_DATA.sectionE.partner,
            ...(parsed.sectionE?.partner || {})
          }
        };

        return {
          ...INITIAL_DATA,
          ...parsed,
          sectionA: { ...INITIAL_DATA.sectionA, ...parsed.sectionA },
          sectionB: { ...INITIAL_DATA.sectionB, ...parsed.sectionB },
          sectionC: { ...INITIAL_DATA.sectionC, ...parsed.sectionC },
          sectionD: { ...INITIAL_DATA.sectionD, ...parsed.sectionD },
          sectionE: mergedSectionE, // Используем безопасную версию
        };
      } catch (e) {
        console.error("Ошибка парсинга данных, сброс формы", e);
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem('appFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('currentStep', step.toString());
  }, [step]);

  const updateData = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  // Полезная функция для полной очистки (на случай багов)
  const resetForm = () => {
    setFormData(INITIAL_DATA);
    setStep(0);
    localStorage.removeItem('appFormData');
    localStorage.removeItem('currentStep');
  };

  return { step, setStep, formData, updateData, resetForm };
};