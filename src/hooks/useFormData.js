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
			nichtselbstaendig: { has: null, brutto: '' },
			selbstaendig: { has: null, brutto: '' },
			vermietung: { has: null, brutto: '' },
			kapital: { has: null, brutto: '' },
			kindergeld: { has: null, brutto: '' },
			wohngeld: { has: null, brutto: '' },
			unterhalt: { has: null, brutto: '' },
			rente: { has: null, brutto: '' },
			arbeitslosengeld: { has: null, brutto: '' },
			buergergeld: { has: null, brutto: '' },
			krankengeld: { has: null, brutto: '' },
			elterngeld: { has: null, brutto: '' },
			sonstige: {
				has: null,
				items: [{ details: '', brutto: '' }],
			},
			noIncomeExplanation: '',
		},
		partner: {
			nichtselbstaendig: { has: null, brutto: '' },
			selbstaendig: { has: null, brutto: '' },
			vermietung: { has: null, brutto: '' },
			kapital: { has: null, brutto: '' },
			kindergeld: { has: null, brutto: '' },
			wohngeld: { has: null, brutto: '' },
			unterhalt: { has: null, brutto: '' },
			rente: { has: null, brutto: '' },
			arbeitslosengeld: { has: null, brutto: '' },
			buergergeld: { has: null, brutto: '' },
			krankengeld: { has: null, brutto: '' },
			elterngeld: { has: null, brutto: '' },
			sonstige: {
				has: null,
				items: [{ details: '', brutto: '' }],
			},
			noIncomeExplanation: '',
		},
	},
	sectionF: {
		hasDeductions: null,
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
		loans: [{ remainingDebt: '', monthlyPayment: '' }],
	},
	sectionI: {
		hasObligations: null,
		obligations: [
			{ description: '', remainingDebt: '', monthlyPayment: '', ownShare: '' },
		],
	},
	sectionJ: {
		hasSpecialLoads: null,
		loads: [{ description: '', amount: '' }],
	},
	sectionK: {
		signature: null,
		confirmed: false,
		date: new Date().toLocaleDateString('de-DE'),
	},
}

export const useFormData = () => {
	
	const [step, setStep] = useState(() => {
		const savedStep = localStorage.getItem('currentStep')
		return savedStep ? parseInt(savedStep, 10) : 0
	})

	
	const [formData, setFormData] = useState(() => {
		const savedData = localStorage.getItem('appFormData')
		if (!savedData) return INITIAL_DATA

		try {
			const parsed = JSON.parse(savedData)
			
			return {
				...INITIAL_DATA,
				...parsed,
				
				sectionA: { ...INITIAL_DATA.sectionA, ...(parsed.sectionA || {}) },
				sectionE: {
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
				},
				sectionF: { ...INITIAL_DATA.sectionF, ...(parsed.sectionF || {}) },
				sectionK: { ...INITIAL_DATA.sectionK, ...(parsed.sectionK || {}) },
			}
		} catch (e) {
			console.error('Data parsing error, resetting form', e)
			return INITIAL_DATA
		}
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

	
	const resetFormData = () => {
		const currentTheme = localStorage.getItem('theme')
		localStorage.clear()
		sessionStorage.clear()
		if (currentTheme) localStorage.setItem('theme', currentTheme)

		setFormData(INITIAL_DATA)
		setStep(0)
	}

	return { step, setStep, formData, updateData, resetFormData }
}
