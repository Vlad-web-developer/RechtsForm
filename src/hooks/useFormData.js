import { useEffect, useState } from 'react'

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
		potentialInsuranceDetails: '',
	},
	sectionC: {
		hasMaintenanceClaims: null,
		maintenancePersonDetails: '',
	},
	sectionD: {
		hasDependents: null,
		dependents: [],
	},
	sectionE: {
		receivesSocialAssistanceSGBXII: null,
		hasPartner: null,
		self: {
			nichtselbstaendig: { has: 'no', brutto: '' },
			selbstaendig: { has: 'no', brutto: '' },
			vermietung: { has: 'no', brutto: '' },
			kapital: { has: 'no', brutto: '' },
			kindergeld: { has: 'no', brutto: '' },
			wohngeld: { has: 'no', brutto: '' },
			unterhalt: { has: 'no', brutto: '' },
			rente: { has: 'no', brutto: '' },
			arbeitslosengeld: { has: 'no', brutto: '' },
			buergergeld: { has: 'no', brutto: '' },
			krankengeld: { has: 'no', brutto: '' },
			elterngeld: { has: 'no', brutto: '' },
			sonstige: {
				has: 'no',
				items: [{ details: '', brutto: '' }],
			},
		},
		partner: {
			nichtselbstaendig: { has: 'no', brutto: '' },
			selbstaendig: { has: 'no', brutto: '' },
			vermietung: { has: 'no', brutto: '' },
			kapital: { has: 'no', brutto: '' },
			kindergeld: { has: 'no', brutto: '' },
			wohngeld: { has: 'no', brutto: '' },
			unterhalt: { has: 'no', brutto: '' },
			rente: { has: 'no', brutto: '' },
			arbeitslosengeld: { has: 'no', brutto: '' },
			buergergeld: { has: 'no', brutto: '' },
			krankengeld: { has: 'no', brutto: '' },
			elterngeld: { has: 'no', brutto: '' },
			sonstige: {
				has: 'no',
				items: [{ details: '', brutto: '' }],
			},
		},
	},
	sectionF: {
		self: {
			steuern: { description: '', amount: '' },
			sozialvers: { description: '', amount: '' },
			sonstigevers: { description: '', amount: '' },
			fahrt: { description: '', amount: '' },
			werbungskosten: { description: '', amount: '' },
		},
		partner: {
			steuern: { description: '', amount: '' },
			sozialvers: { description: '', amount: '' },
			sonstigevers: { description: '', amount: '' },
			fahrt: { description: '', amount: '' },
			werbungskosten: { description: '', amount: '' },
		},
	},
	sectionG: {
		bankAccounts: { has: null, description: '', value: '' },
		realEstate: { has: null, description: '', value: '' },
		vehicles: { has: null, description: '', value: '' },
		cash: { has: null, description: '', value: '' },
		lifeInsurance: { has: null, description: '', value: '' },
		otherAssets: { has: null, description: '', value: '' },
	},
	sectionH: {
		livingSpace: '',
		numberOfRooms: '',
		totalPeople: '',

		housingType: '',

		rentCold: '',
		heatingCosts: '',
		otherCosts: '',
		totalRent: '',
		ownShareRent: '',

		interestRepayment: '',
		heatingCostsOwner: '',
		otherCostsOwner: '',
		totalCostOwner: '',
		ownShareOwner: '',

		loanDetails: '',
		loans: [
			{ remainingDebt: '', monthlyPayment: '' },
			{ remainingDebt: '', monthlyPayment: '' },
		],
	},
  sectionI: {
    hasObligations: null,
    obligations: [
      { description: '', remainingDebt: '', monthlyPayment: '', ownShare: '' }
    ]
  },
  sectionJ: {
    hasSpecialLoads: null, 
    loads: [
      { description: '', amount: '' }
    ]
  },
  sectionK: {
    location: '',      
    date: new Date().toLocaleDateString('de-DE') 
  }
}

export const useFormData = () => {
	const [step, setStep] = useState(() => {
		const savedStep = localStorage.getItem('currentStep')
		return savedStep ? parseInt(savedStep, 10) : 0
	})

	const [formData, setFormData] = useState(() => {
		const savedData = localStorage.getItem('appFormData')
		if (savedData) {
			try {
				const parsed = JSON.parse(savedData)

				const mergedSectionE = {
					...INITIAL_DATA.sectionE,
					...parsed.sectionE,
					self: {
						...INITIAL_DATA.sectionE.self,
						...(parsed.sectionE?.self || {}),
					},
					partner: {
						...INITIAL_DATA.sectionE.partner,
						...(parsed.sectionE?.partner || {}),
					},
				}

				const mergedSectionF = {
					...INITIAL_DATA.sectionF,
					...parsed.sectionF,
					self: {
						...INITIAL_DATA.sectionF.self,
						...(parsed.sectionF?.self || {}),
					},
					partner: {
						...INITIAL_DATA.sectionF.partner,
						...(parsed.sectionF?.partner || {}),
					},
				}

				const mergedSectionH = {
					...INITIAL_DATA.sectionH,
					...parsed.sectionH,
				}

				return {
					...INITIAL_DATA,
					...parsed,
					sectionA: { ...INITIAL_DATA.sectionA, ...parsed.sectionA },
					sectionB: { ...INITIAL_DATA.sectionB, ...parsed.sectionB },
					sectionC: { ...INITIAL_DATA.sectionC, ...parsed.sectionC },
					sectionD: { ...INITIAL_DATA.sectionD, ...parsed.sectionD },
					sectionE: mergedSectionE,
					sectionF: mergedSectionF,
					sectionG: { ...INITIAL_DATA.sectionG, ...parsed.sectionG },
					sectionH: mergedSectionH,
          sectionI: { ...INITIAL_DATA.sectionI, ...parsed.sectionI },
          sectionJ: { ...INITIAL_DATA.sectionJ, ...parsed.sectionJ },
          sectionK: { ...INITIAL_DATA.sectionK, ...parsed.sectionK },
				}
			} catch (e) {
				console.error('Ошибка парсинга данных, сброс формы', e)
				return INITIAL_DATA
			}
		}
		return INITIAL_DATA
	})

	useEffect(() => {
		localStorage.setItem('appFormData', JSON.stringify(formData))
	}, [formData])

	useEffect(() => {
		localStorage.setItem('currentStep', step.toString())
	}, [step])

	const updateData = (section, field, value) => {
		setFormData(prev => ({
			...prev,
			[section]: { ...prev[section], [field]: value },
		}))
	}

	const resetForm = () => {
		setFormData(INITIAL_DATA)
		setStep(0)
		localStorage.removeItem('appFormData')
		localStorage.removeItem('currentStep')
	}

	return { step, setStep, formData, updateData, resetForm }
}
