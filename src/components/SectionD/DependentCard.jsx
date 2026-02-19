import { motion } from 'framer-motion'
import DateInput from '../common/DateInput'

const DependentCard = ({ person, index, onUpdate, onRemove, dateError }) => {
	return (
		<div className='dependent-card'>
			<div className='dependent-title'>
				Person {index + 1}
				{index > 0 && (
					<button className='remove-btn' onClick={onRemove}>
						🗑️ Entfernen
					</button>
				)}
			</div>

			<div className='dependent-grid'>
				<div className='input-group'>
					<label className='input-label'>
						Name, Vorname, Anschrift <span style={{ color: 'red' }}>*</span>
					</label>
					<input
						type='text'
						className='modern-input'
						placeholder='Mustermann, Max'
						value={person.name}
						onChange={e => onUpdate('name', e.target.value)}
					/>
				</div>

				<div className='input-group'>
					<label className='input-label'>Geburtsdatum</label>
					<DateInput
						value={person.birthday}
						onChange={val => onUpdate('birthday', val)}
						placeholder='TT.MM.JJJJ'
						error={dateError}
						maxDate={new Date()}
					/>
					{dateError && (
						<span
							style={{
								display: 'block',
								marginTop: '4px',
								color: '#ef4444',
								fontSize: '0.8rem',
							}}
						>
							Ungültiges Datum
						</span>
					)}
				</div>

				<div className='input-group'>
					<label className='input-label'>
						Verhältnis (z.B. Kind) <span style={{ color: 'red' }}>*</span>
					</label>
					<input
						type='text'
						className='modern-input'
						placeholder='Kind, Ehegatte...'
						value={person.relationship}
						onChange={e => onUpdate('relationship', e.target.value)}
					/>
				</div>

				<div className='input-group'>
					<label className='input-label'>Monatsbetrag (falls Zahlung)</label>
					<div className='currency-input-wrapper'>
						<input
							type='text'
							className='brutto-input'
							placeholder='€ monatlich'
							value={person.monthlyAmount}
							onChange={e => onUpdate('monthlyAmount', e.target.value)}
							style={{ color: '#3B82F6', fontWeight: '500' }}
						/>
					</div>
				</div>
			</div>

			<div style={{ marginTop: '5px', paddingTop: '5px' }}>
				<label
					style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
				>
					Hat diese Person eigene Einnahmen?{' '}
					<span style={{ color: 'red' }}>*</span>
				</label>

				<div className='income-toggle-group'>
					<button
						className={`btn-secondary ${person.hasOwnIncome === 'yes' ? 'active-yes' : ''}`}
						onClick={() => onUpdate('hasOwnIncome', 'yes')}
					>
						Ja
					</button>
					<button
						className={`btn-secondary ${person.hasOwnIncome === 'no' ? 'active-no' : ''}`}
						onClick={() => onUpdate('hasOwnIncome', 'no')}
					>
						Nein
					</button>
				</div>

				{person.hasOwnIncome === 'yes' && (
					<motion.div
						initial={{ opacity: 0, y: -5 }}
						animate={{ opacity: 1, y: 0 }}
						className='input-group'
						style={{ marginTop: '10px' }}
					>
						<label className='input-label'>Haben Sie Nettoeinnahmen?</label>
						<input
							type='text'
							className='brutto-input'
							placeholder='Betrag (netto) €'
							style={{ color: '#3B82F6', fontWeight: 'bold' }}
							value={person.incomeAmount}
							onChange={e => onUpdate('incomeAmount', e.target.value)}
						/>
					</motion.div>
				)}
			</div>
		</div>
	)
}

export default DependentCard
