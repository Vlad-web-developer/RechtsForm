import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import '../css/Calendar.css'
import '../css/phone.css'
import { useSectionAValidation } from '../hooks/useSectionValidation'
import DateInput from './common/DateInput'

const SectionA = ({ data, onChange, onBack, onNext }) => {
	
	const { errors, validateStep, clearError } = useSectionAValidation(data)

	const handleNextClick = () => {
		if (validateStep()) {
			onNext()
		}
	}

	const handleNameChange = e => {
		const val = e.target.value
		if (val === '' || /^[a-zA-Zа-яА-ЯёЁ\s\-äöüÄÖÜß.]+$/.test(val)) {
			onChange('fullName', val)
			clearError('fullName')
		}
	}

	
	const isStepValid = () => {
		
		const isNameValid = data.fullName && data.fullName.trim().length > 0
		const isJobValid = data.occupation && data.occupation.trim().length > 0
		const isBirthdayValid = data.birthday && data.birthday.trim().length === 10 
		const isMaritalStatusValid =
			data.maritalStatus && data.maritalStatus.trim().length > 0
		const isPhoneValid = data.phone && data.phone.length > 5 
		const isAddressValid = data.address && data.address.trim().length > 0

		return (
			isNameValid &&
			isJobValid &&
			isBirthdayValid &&
			isMaritalStatusValid &&
			isPhoneValid &&
			isAddressValid
		)
	}
	

	return (
		<div className='section-card'>
			<h3 className='section-title'>A. Angaben zu ihrer Person</h3>

			<div className='grid-container'>
				<div className='input-group full-width'>
					<label>
						👤 Name, Vorname, ggf. Geburtsname{' '}
						<span style={{ color: '#ef4444' }}>*</span>
					</label>
					<input
						className={`modern-input ${errors.fullName ? 'input-error' : ''}`}
						value={data.fullName || ''}
						onChange={handleNameChange}
						placeholder='z. B. Mustermann, Max'
					/>
					{errors.fullName && (
						<span className='error-message'>Pflichtfeld (Nur Buchstaben)</span>
					)}
				</div>

				<div className='input-group'>
					<label>
						💼 Beruf, Erwerbstätigkeit{' '}
						<span style={{ color: '#ef4444' }}>*</span>
					</label>
					<input
						className={`modern-input ${errors.occupation ? 'input-error' : ''}`}
						value={data.occupation || ''}
						onChange={e => {
							onChange('occupation', e.target.value)
							clearError('occupation')
						}}
						placeholder='z. B. Softwareentwickler'
					/>
					{errors.occupation && (
						<span className='error-message'>Pflichtfeld</span>
					)}
				</div>

				<div className='input-group'>
					<label>
						📅 Geburtsdatum <span style={{ color: '#ef4444' }}>*</span>
					</label>
					<DateInput
						value={data.birthday}
						onChange={val => {
							onChange('birthday', val)
							clearError('birthday')
						}}
						error={errors.birthday}
						placeholder='TT.MM.JJJJ'
					/>
					{errors.birthday && (
						<span className='error-message'>Format: TT.MM.JJJJ</span>
					)}
				</div>

				<div className='input-group'>
					<label>
						💍 Familienstand <span style={{ color: '#ef4444' }}>*</span>
					</label>
					<input
						className={`modern-input ${errors.maritalStatus ? 'input-error' : ''}`}
						value={data.maritalStatus || ''}
						onChange={e => {
							onChange('maritalStatus', e.target.value)
							clearError('maritalStatus')
						}}
						placeholder='ledig, verheiratet, geschieden...'
					/>
					{errors.maritalStatus && (
						<span className='error-message'>Pflichtfeld</span>
					)}
				</div>

				<div className='input-group'>
					<label>
						📞 Telefonnummer <span style={{ color: '#ef4444' }}>*</span>
					</label>
					<PhoneInput
						country={'de'}
						value={data.phone}
						onChange={phone => {
							onChange('phone', phone)
							clearError('phone')
						}}
						containerClass='custom-phone-container'
						inputClass={`custom-phone-input ${errors.phone ? 'input-error' : ''}`}
						buttonClass='custom-phone-button'
						dropdownClass='custom-phone-dropdown'
						enableSearch={true}
						disableSearchIcon={true}
						placeholder='176 12345678'
						specialLabel=''
					/>
					{errors.phone && (
						<span className='error-message'>Gültige Nummer erforderlich</span>
					)}
				</div>

				<div className='input-group full-width'>
					<label>
						🏠 Anschrift (Straße, Hausnummer, PLZ, Wohnort){' '}
						<span style={{ color: '#ef4444' }}>*</span>
					</label>
					<textarea
						className={`modern-input ${errors.address ? 'input-error' : ''}`}
						value={data.address || ''}
						onChange={e => {
							onChange('address', e.target.value)
							clearError('address')
						}}
						placeholder='Musterstraße 1, 12345 Berlin'
						rows='2'
					/>
					{errors.address && <span className='error-message'>Pflichtfeld</span>}
				</div>

				<div className='input-group full-width' style={{ marginTop: '10px' }}>
					<label>
						⚖️ Sofern vorhanden: Gesetzlicher Vertreter (Name, Anschrift,
						Telefon)
					</label>
					<textarea
						className='modern-input'
						value={data.legalRepresentative || ''}
						onChange={e => onChange('legalRepresentative', e.target.value)}
						placeholder='z.B. Eltern bei Minderjährigen oder Betreuer...'
						rows='2'
					/>
				</div>
			</div>

			<div className='navigation-footer'>
				<button className='btn-secondary-action' onClick={onBack}>
					Zurück
				</button>
				<button
					className='btn-primary-action'
					onClick={handleNextClick} 
					disabled={!isStepValid()} 
					style={{ background: isStepValid() ? 'var(--accent-color)' : '#ccc' }}
					title={
						!isStepValid() ? 'Bitte füllen Sie alle Pflichtfelder aus' : ''
					}
				>
					Weiter zu Abschnitt B
				</button>
			</div>
		</div>
	)
}

export default SectionA
