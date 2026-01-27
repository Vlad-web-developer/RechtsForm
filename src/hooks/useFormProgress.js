import { useMemo } from 'react';

export const useFormProgress = (formData) => {
  return useMemo(() => {
    const fieldsA = ['fullName', 'occupation', 'birthday', 'maritalStatus', 'address', 'phone'];
    const countA_Total = fieldsA.length;
    let countA_Filled = 0;
    fieldsA.forEach(field => {
      const val = formData.sectionA[field];
      if (val && val.trim().length > 0) {
        if (field === 'phone' && val.length < 5) return;
        countA_Filled++;
      }
    });

    let countB_Total = 2; 
    let countB_Filled = 0;
    if (formData.sectionB.hasInsurance) countB_Filled++;
    if (formData.sectionB.hasInsurance === 'yes' && formData.sectionB.insuranceDetails) countB_Filled++;
    if (formData.sectionB.hasInsurance === 'no' && formData.sectionB.hasPotentialInsurance) countB_Filled++;

    let countC_Total = 1; 
    let countC_Filled = 0;
    if (formData.sectionC.hasMaintenanceClaims) countC_Filled++;
    if (formData.sectionC.hasMaintenanceClaims === 'yes' && formData.sectionC.maintenancePersonDetails) {
        countC_Total++;
        countC_Filled++;
    }

    let countD_Total = 1; 
    let countD_Filled = 0;
    if (formData.sectionD.hasDependents) countD_Filled++;
    if (formData.sectionD.hasDependents === 'yes') {
      formData.sectionD.dependents.forEach(person => {
         countD_Total += 3; 
         if (person.name?.trim()) countD_Filled++;
         if (person.relationship?.trim()) countD_Filled++;
         if (person.hasOwnIncome) countD_Filled++;
      });
    }

    let countE_Total = 1; 
    let countE_Filled = 0;

    if (formData.sectionE?.receivesSocialAssistanceSGBXII) {
        countE_Filled++;
    }

    if (formData.sectionE?.receivesSocialAssistanceSGBXII === 'no') {
        const incomeKeys = [
            'nichtselbstaendig', 'selbstaendig', 'vermietung', 'kapital',
            'kindergeld', 'wohngeld', 'unterhalt', 'rente', 
            'arbeitslosengeld', 'buergergeld', 'krankengeld', 'elterngeld', 'sonstige'
        ];
        
        countE_Total += incomeKeys.length; 
        incomeKeys.forEach(key => {
            if (formData.sectionE.self?.[key]?.has) countE_Filled++;
        });

        if (formData.sectionE.hasPartner === 'yes') {
            countE_Total += incomeKeys.length;
            incomeKeys.forEach(key => {
                if (formData.sectionE.partner?.[key]?.has) countE_Filled++;
            });
        }
        
        countE_Total++; 
        if (formData.sectionE.hasPartner) countE_Filled++;
    }

    const grandTotal = countA_Total + countB_Total + countC_Total + countD_Total + countE_Total;
    const totalFilled = countA_Filled + countB_Filled + countC_Filled + countD_Filled + countE_Filled;
    const progressPercent = grandTotal === 0 ? 0 : Math.round((totalFilled / grandTotal) * 100);

    const posB = (countA_Total / grandTotal) * 100;
    const posC = ((countA_Total + countB_Total) / grandTotal) * 100;
    const posD = ((countA_Total + countB_Total + countC_Total) / grandTotal) * 100; 
    const posE = ((countA_Total + countB_Total + countC_Total + countD_Total) / grandTotal) * 100;

    return {
      globalProgress: progressPercent,
      milestones: [
        { label: 'A', position: 0 },
        { label: 'B', position: posB },
        { label: 'C', position: posC },
        { label: 'D', position: posD },
        { label: 'E', position: posE },
        { label: 'K', position: 100 }
      ]
    };
  }, [formData]);
};