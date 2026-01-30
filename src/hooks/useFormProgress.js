import { useMemo } from 'react';

export const useFormProgress = (formData) => {
  return useMemo(() => {
    const hasVal = (val) => val && val.toString().trim().length > 0;

    const isA = hasVal(formData.sectionA.fullName) && hasVal(formData.sectionA.address) ? 1 : 0;

    const isB = formData.sectionB.hasInsurance !== null ? 1 : 0;

    const isC = formData.sectionC.hasMaintenanceClaims !== null ? 1 : 0;

    const isD = formData.sectionD.hasDependents !== null ? 1 : 0;

    let isE = 0;
    const isSGBXII = formData.sectionE?.receivesSocialAssistanceSGBXII === 'yes';
    
    if (formData.sectionE?.receivesSocialAssistanceSGBXII) {
        isE = 1;
    }

    let isF = isSGBXII ? 1 : 0;
    let isG = isSGBXII ? 1 : 0;
    let isH = isSGBXII ? 1 : 0;
    let isI = isSGBXII ? 1 : 0;
    let isJ = isSGBXII ? 1 : 0;

    if (!isSGBXII) {

        isF = isE; 

        isG = formData.sectionG.bankAccounts.has !== null ? 1 : 0;

        isH = formData.sectionH.housingType ? 1 : 0;

        isI = formData.sectionI.hasObligations !== null ? 1 : 0;

        isJ = formData.sectionJ.hasSpecialLoads !== null ? 1 : 0;
    }

    const isK = formData.sectionK?.date ? 1 : 0;

    const totalSteps = 11;
    const completedSteps = isA + isB + isC + isD + isE + isF + isG + isH + isI + isJ + isK;
    const progressPercent = Math.round((completedSteps / totalSteps) * 100);

    const milestones = [
        { label: 'A', position: 0 },
        { label: 'B', position: 10 },
        { label: 'C', position: 20 },
        { label: 'D', position: 30 },
        { label: 'E', position: 40 },
        { label: 'F', position: 50 },
        { label: 'G', position: 60 },
        { label: 'H', position: 70 },
        { label: 'I', position: 80 },
        { label: 'J', position: 90 },
        { label: 'K', position: 100 }
    ];

    return {
      globalProgress: progressPercent,
      milestones
    };
  }, [formData]);
};