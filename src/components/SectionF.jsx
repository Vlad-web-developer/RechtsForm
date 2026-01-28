import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import '../css/SectionF.css'

const SectionF = ({ data, onChange, onBack, onNext, hasPartner }) => {
	const [subStep, setSubStep] = useState(0)

	const categories = [
		{
			key: 'steuern',
			label: '1. Steuern / Solidaritätszuschlag',
			desc: 'Lohnsteuer, Kirchensteuer, Soli (siehe Gehaltsabrechnung).',
			placeholderDesc: 'z.B. Lohnsteuer laut Abrechnung',
			placeholderAmnt: '0,00',
		},
		{
			key: 'sozialvers',
			label: '2. Sozialversicherungsbeiträge',
			desc: 'Gesetzliche Renten-, Kranken-, Pflege- und Arbeitslosenversicherung.',
			placeholderDesc: 'Pflichtbeiträge vom Lohn',
			placeholderAmnt: '0,00',
		},
		{
			key: 'sonstigevers',
			label: '3. Sonstige Versicherungen',
			desc: 'Privathaftpflicht, Hausrat, Unfall-, Lebensversicherung (nur angemessene).',
			placeholderDesc: 'z.B. Allianz Haftpflicht',
			placeholderAmnt: '0,00',
		},
		{
			key: 'fahrt',
			label: '4. Fahrt zur Arbeit',
			desc: 'Kosten für öffentliche Verkehrsmittel ODER einfache Entfernung in KM (bei PKW).',
			placeholderDesc: 'z.B. Monatskarte BVG oder "PKW"',
			placeholderAmnt: '€ oder km',
			isCommute: true,
		},
		{
			key: 'werbungskosten',
			label: '5. Sonstige Werbungskosten / Betriebsausgaben',
			desc: 'Gewerkschaftsbeiträge, Arbeitskleidung, Fortbildungskosten.',
			placeholderDesc: 'z.B. ver.di Beitrag',
			placeholderAmnt: '0,00',
		},
	]

	const updateField = (person, catKey, field, value) => {
		const newPersonData = { ...data[person] }
		newPersonData[catKey] = {
			...newPersonData[catKey],
			[field]: value,
		}
		onChange(person, newPersonData)
	}

	const handleNext = () => {
		if (subStep === 0) {
			setSubStep(1)
		} else if (subStep === 1) {
			// Check inherited prop from Section E
			if (hasPartner === 'yes') {
				setSubStep(2) // Go to partner fields
			} else {
				onNext() // Finish section
			}
		} else {
			onNext()
		}
	}

	const handleBack = () => {
		if (subStep === 0) onBack()
		else setSubStep(subStep - 1)
	}

	const renderFields = personType => (
		<div className='income-list'>
			{categories.map(cat => (
				<div
					key={cat.key}
					className='income-card active'
					style={{ padding: '20px', marginBottom: '15px' }}
				>
					<div className='mb-15'>
						<strong className='category-label'>{cat.label}</strong>
						<p className='category-desc'>{cat.desc}</p>
					</div>

					<div className='form-grid'>
						<div>
							<label className='input-label-small'>Bezeichnung (Art)</label>
							<input
								type='text'
								className='details-input'
								style={{ width: '100%' }}
								placeholder={cat.placeholderDesc}
								value={data[personType][cat.key].description}
								onChange={e =>
									updateField(
										personType,
										cat.key,
										'description',
										e.target.value,
									)
								}
							/>
						</div>

						<div>
							<label className='input-label-small'>
								{cat.isCommute ? 'Betrag (€) / KM' : 'Betrag (€ mtl.)'}
							</label>
							<div className='currency-input'>
								<input
									type='text'
									className='brutto-input'
									style={{ width: '100%' }}
									placeholder={cat.placeholderAmnt}
									value={data[personType][cat.key].amount}
									onChange={e =>
										updateField(personType, cat.key, 'amount', e.target.value)
									}
								/>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)

	return (
		<div className='section-card'>
			<h2 className='section-title'>F. Abzüge (Ausgaben)</h2>

			<AnimatePresence mode='wait'>
				{subStep === 0 && (
					<motion.div
						key='intro'
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
					>
						<div
							className='info-box-alert'
							style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9' }}
						>
							<div
								className='info-icon-container'
								style={{ background: '#e0f2fe', color: '#0284c7' }}
							>
								ℹ️
							</div>
							<div className='info-text-content'>
								<h4 style={{ color: '#0284c7', margin: '0 0 5px 0' }}>
									Was können Sie abziehen?
								</h4>
								<p
									style={{
										color: '#334155',
										fontSize: '0.95rem',
										lineHeight: '1.5',
									}}
								>
									In diesem Abschnitt geben Sie Ausgaben an, die Ihr Einkommen
									mindern ("Abzüge"). Dazu gehören Steuern, Pflichtbeiträge,
									Fahrtkosten zur Arbeit und notwendige Versicherungen.
								</p>
							</div>
						</div>

						<div
							className='info-box-small'
							style={{
								marginTop: '15px',
								background: '#fffbeb',
								border: '1px solid #fcd34d',
							}}
						>
							<p style={{ fontSize: '0.9rem', color: '#92400e', margin: 0 }}>
								<strong>Wichtig:</strong> Für alle Angaben müssen Sie später
								Belege (Kopien) einreichen (z. B. Lohnabrechnung,
								Versicherungspolicen).
							</p>
						</div>

						<div className='navigation-footer'>
							<button className='btn-secondary-action' onClick={handleBack}>
								Zurück
							</button>
							<button className='btn-primary-action' onClick={handleNext}>
								Abzüge eintragen
							</button>
						</div>
					</motion.div>
				)}

				{subStep === 1 && (
					<motion.div
						key='self'
						initial={{ x: 20, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: -20, opacity: 0 }}
					>
						<h3 className='section-subtitle'>Ihre Abzüge</h3>
						{renderFields('self')}

						<div className='navigation-footer'>
							<button className='btn-secondary-action' onClick={handleBack}>
								Zurück
							</button>
							<button className='btn-primary-action' onClick={handleNext}>
								{hasPartner === 'yes'
									? 'Weiter zum Partner'
									: 'Weiter zu Abschnitt G'}
							</button>
						</div>
					</motion.div>
				)}

				{subStep === 2 && (
					<motion.div
						key='partner'
						initial={{ x: 20, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: -20, opacity: 0 }}
					>
						<h3 className='section-subtitle'>Abzüge des Partners</h3>
						<div className='info-box-small' style={{ marginBottom: '20px' }}>
							Bitte geben Sie hier die Abzüge Ihres Ehegatten / Lebenspartners
							an.
						</div>

						{renderFields('partner')}

						<div className='navigation-footer'>
							<button className='btn-secondary-action' onClick={handleBack}>
								Zurück
							</button>
							<button className='btn-primary-action' onClick={handleNext}>
								Weiter zu Abschnitt G
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default SectionF
