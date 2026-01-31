import { motion } from 'framer-motion'
import '../css/SectionC.css'

const SectionC = ({ data, onChange, onBack, onNext }) => {
	const handleOptionChange = val => {
		onChange('hasMaintenanceClaims', val)
		if (val === 'no') {
			onChange('maintenancePersonDetails', '')
		}
	}

	const isStepValid = () => {
		if (!data.hasMaintenanceClaims) return false
		if (data.hasMaintenanceClaims === 'yes') {
			return (
				data.maintenancePersonDetails &&
				data.maintenancePersonDetails.trim().length > 0
			)
		}
		return true
	}

	return (
		<div className='section-card'>
			<h2 className='section-title'>C. Unterhaltsanspruch</h2>

			<div className='input-group mb-25'>
				<div className='section-c-question-container'>
					<span className='question-text'>
						Haben Sie Angehörige, die Ihnen gegenüber gesetzlich zur Leistung
						von Unterhalt verpflichtet sind (auch wenn tatsächlich keine
						Leistungen erfolgen)? <span style={{ color: 'red' }}>*</span>
					</span>
					<span className='section-c-subtext'>
						z. B. Mutter, Vater, Ehegatte/Ehegattin, eingetragene(r)
						Lebenspartner/Lebenspartnerin
					</span>
				</div>

				<div className='button-group button-group-c mt-12'>
					<button
						className={`btn-secondary ${data.hasMaintenanceClaims === 'yes' ? 'active-selection' : ''}`}
						onClick={() => handleOptionChange('yes')}
					>
						Ja
					</button>
					<button
						className={`btn-secondary ${data.hasMaintenanceClaims === 'no' ? 'active-selection' : ''}`}
						onClick={() => handleOptionChange('no')}
					>
						Nein
					</button>
				</div>

				{data.hasMaintenanceClaims === 'yes' && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						className='mt-20'
					>
						<div className='warning-box-c'>
							<div className='warning-icon'>⚠️</div>
							<div className='warning-text'>
								<b>Hinweis aus dem Formular:</b>
								<br />
								Bitte geben Sie auf einem weiteren Exemplar dieses Formulars
								seine persönlichen und wirtschaftlichen Verhältnisse an, sofern
								diese nicht bereits vollständig aus den folgenden Abschnitten
								ersichtlich sind.
							</div>
						</div>

						<label className='input-label-c'>
							Name des Unterhaltsverpflichteten{' '}
							<span style={{ color: 'red' }}>*</span>
						</label>

						<textarea
							className='textarea-c'
							placeholder='Vorname, Nachname...'
							value={data.maintenancePersonDetails}
							onChange={e =>
								onChange('maintenancePersonDetails', e.target.value)
							}
							rows={2}
							style={
								!data.maintenancePersonDetails ? { borderColor: '#e2e8f0' } : {}
							}
						/>
					</motion.div>
				)}
			</div>

			<div className='button-group button-group-c mt-40'>
				<button className='btn-secondary' onClick={onBack}>
					Zurück
				</button>

				<button
					className='btn-primary'
					onClick={onNext}
					disabled={!isStepValid()}
					style={{ background: isStepValid() ? 'var(--accent-color)' : '#ccc' }}
					title={
						!isStepValid() ? 'Bitte füllen Sie alle Pflichtfelder aus' : ''
					}
				>
					Weiter zu Abschnitt D
				</button>
			</div>
		</div>
	)
}

export default SectionC
