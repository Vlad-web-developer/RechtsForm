import '../css/SectionJ.css'
import '../css/SectionK.css'
import DateInput from './common/DateInput'

const SectionK = ({ data, onChange, onBack, onFinish }) => {
	const updateField = (field, value) => {
		onChange(field, value)
	}

	const isStepValid = () => {
		return (
			data.location &&
			data.location.trim() !== '' &&
			data.date &&
			data.date.trim() !== ''
		)
	}

	return (
		<div className='section-card'>
			<h2 className='section-title'>K. Abschließende Erklärung</h2>

			<div className='important-box'>
				<strong>WICHTIG:</strong> Bitte lesen Sie diesen Text sorgfältig durch.
			</div>

			<div className='declaration-text'>
				<p>
					Ich versichere hiermit, dass meine Angaben vollständig und wahr sind.
					Das Hinweisblatt zu diesem Formular habe ich erhalten und gelesen.
				</p>
				<p>
					Mir ist bekannt, dass unvollständige oder unrichtige Angaben die
					Aufhebung der Bewilligung von Prozess- oder Verfahrenskostenhilfe und
					eine Strafverfolgung nach sich ziehen können. Das Gericht kann mich
					auffordern, fehlende Belege nachzureichen und meine Angaben an Eides
					statt zu versichern.
				</p>
				<p>
					Mir ist auch bekannt, dass ich während des Gerichtsverfahrens und
					innerhalb eines Zeitraums von vier Jahren seit der rechtskräftigen
					Entscheidung oder der sonstigen Beendigung des Verfahrens verpflichtet
					bin, dem Gericht wesentliche Verbesserungen meiner wirtschaftlichen
					Lage oder eine Änderung meiner Anschrift unaufgefordert und
					unverzüglich mitzuteilen.
				</p>
			</div>

			<div className='form-grid-j'>
				<div>
					<label className='input-label'>
						Ort <span style={{ color: 'red' }}>*</span>
					</label>
					<input
						type='text'
						className='std-input'
						placeholder='z.B. Berlin'
						value={data.location}
						onChange={e => updateField('location', e.target.value)}
					/>
				</div>

				<div>
					<label className='input-label'>
						Datum <span style={{ color: 'red' }}>*</span>
					</label>
					<DateInput
						value={data.date}
						onChange={val => updateField('date', val)}
						placeholder='TT.MM.JJJJ'
					/>
				</div>
			</div>

			<div className='navigation-footer'>
				<button className='btn-secondary-action' onClick={onBack}>
					Zurück
				</button>
				<button
					className='btn-primary-action'
					style={{
						background: isStepValid() ? '#10b981' : '#ccc',
						cursor: isStepValid() ? 'pointer' : 'not-allowed',
					}}
					onClick={onFinish}
					disabled={!isStepValid()}
					title={
						!isStepValid() ? 'Bitte füllen Sie alle Pflichtfelder aus' : ''
					}
				>
					Fertigstellen & PDF laden
				</button>
			</div>
		</div>
	)
}

export default SectionK
