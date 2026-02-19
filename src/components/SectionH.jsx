import { AnimatePresence, motion } from 'framer-motion'
import '../css/SectionH.css'
import NumberInput from './common/NumberInput'
import OwnerSection from './OwnerSection'
import TenantSection from './TenantSection'

const SectionH = ({ data, onChange, onBack, onNext }) => {
	const updateField = (field, value) => onChange(field, value)

	const updateLoan = (index, nestedField, value) => {
		const currentLoans = data.loans || [
			{ remainingDebt: '', monthlyPayment: '' },
			{ remainingDebt: '', monthlyPayment: '' },
		]
		const newLoans = [...currentLoans]
		newLoans[index] = { ...newLoans[index], [nestedField]: value }
		onChange('loans', newLoans)
	}

	const isStepValid = () => {
		if (!data.housingType) return false
		const baseValid = data.livingSpace && data.numberOfRooms && data.totalPeople

		if (data.housingType === 'tenant') {
			return baseValid && data.rentCold?.trim()
		}
		if (data.housingType === 'owner') {
			return baseValid && data.interestRepayment?.trim()
		}
		return false
	}

	return (
		<div className='section-card'>
			<h2 className='section-title'>H. Wohnkosten</h2>

			<div
				className='info-box-alert'
				style={{ marginBottom: '25px', display: 'flex', gap: '15px' }}
			>
				<div style={{ fontSize: '1.5rem' }}>ℹ️</div>
				<div className='info-text-content'>
					<h4 style={{ margin: '0 0 5px 0', color: 'var(--accent-color)' }}>
						Wohnsituation
					</h4>
					<p
						style={{
							margin: 0,
							color: 'var(--text-primary)',
							fontSize: '0.95rem',
							lineHeight: '1.5',
						}}
					>
						Bitte füllen Sie zunächst die allgemeinen Angaben aus und wählen Sie
						dann Ihre Situation.
					</p>
				</div>
			</div>

			<h3
				className='section-subtitle'
				style={{ color: 'var(--text-primary)', marginBottom: '15px' }}
			>
				1. Allgemeine Angaben
			</h3>
			<div className='general-grid'>
				<div className='input-group'>
					<label className='input-label'>
						Gesamtgröße (m²) <span style={{ color: '#ef4444' }}>*</span>
					</label>
					<NumberInput
						placeholder='0'
						value={data.livingSpace}
						onChange={val => updateField('livingSpace', val)}
					/>
				</div>
				<div className='input-group'>
					<label className='input-label'>
						Zimmeranzahl <span style={{ color: '#ef4444' }}>*</span>
					</label>
					<NumberInput
						placeholder='0'
						value={data.numberOfRooms}
						onChange={val => updateField('numberOfRooms', val)}
					/>
				</div>
				<div className='input-group'>
					<label className='input-label'>
						Personen im Haushalt <span style={{ color: '#ef4444' }}>*</span>
					</label>
					<NumberInput
						placeholder='0'
						value={data.totalPeople}
						onChange={val => updateField('totalPeople', val)}
					/>
				</div>
			</div>

			<h3
				className='section-subtitle'
				style={{ color: 'var(--text-primary)', marginBottom: '15px' }}
			>
				2. Ihre Situation
			</h3>
			<div className='housing-selector'>
				<motion.div
					whileTap={{ scale: 0.98 }}
					className={`type-card ${data.housingType === 'tenant' ? 'active' : ''}`}
					onClick={() => updateField('housingType', 'tenant')}
				>
					<span className='type-icon'>🏠</span>
					<span style={{ color: 'var(--text-primary)' }}>
						Ich bin Mieter <span style={{ color: '#ef4444' }}>*</span>
					</span>
				</motion.div>

				<motion.div
					whileTap={{ scale: 0.98 }}
					className={`type-card ${data.housingType === 'owner' ? 'active' : ''}`}
					onClick={() => updateField('housingType', 'owner')}
				>
					<span className='type-icon'>🏡</span>
					<span style={{ color: 'var(--text-primary)' }}>
						Ich bin Eigentümer <span style={{ color: '#ef4444' }}>*</span>
					</span>
				</motion.div>
			</div>

			<AnimatePresence mode='wait'>
				{data.housingType === 'tenant' && (
					<motion.div
						key='tenant'
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
					>
						<TenantSection data={data} onUpdate={updateField} />
					</motion.div>
				)}
				{data.housingType === 'owner' && (
					<motion.div
						key='owner'
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
					>
						<OwnerSection
							data={data}
							onUpdate={updateField}
							onUpdateLoan={updateLoan}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<div className='navigation-footer'>
				<button className='btn-secondary-action' onClick={onBack}>
					{' '}
					Zurück{' '}
				</button>
				<button
					className='btn-primary-action'
					onClick={onNext}
					disabled={!isStepValid()}
					style={{
						opacity: isStepValid() ? 1 : 0.5,
						background: isStepValid() ? 'var(--accent-color)' : '#94a3b8',
					}}
				>
					{' '}
					Weiter{' '}
				</button>
			</div>
		</div>
	)
}

export default SectionH
