import { AnimatePresence, motion } from 'framer-motion'
import NumberInput from './common/NumberInput' 
import '../css/SectionH.css'

const SectionH = ({ data, onChange, onBack, onNext }) => {
    const updateField = (field, value) => {
        onChange(field, value)
    }

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
        
        if (data.housingType === 'tenant') {
            return (
                data.livingSpace &&
                data.numberOfRooms &&
                data.totalPeople &&
                data.rentCold &&
                data.rentCold.trim() !== ''
            )
        }
        if (data.housingType === 'owner') {
            return (
                data.livingSpace &&
                data.numberOfRooms &&
                data.totalPeople &&
                data.interestRepayment &&
                data.interestRepayment.trim() !== ''
            )
        }
        return false
    }

    return (
        <div className='section-card'>
            <h2 className='section-title'>H. Wohnkosten</h2>

            <div className='info-box-alert' style={{ marginBottom: '25px', display: 'flex', gap: '15px' }}>
                <div style={{ fontSize: '1.5rem' }}>ℹ️</div>
                <div className='info-text-content'>
                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--accent-color)' }}>Wohnsituation</h4>
                    <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        Bitte füllen Sie zunächst die allgemeinen Angaben aus und wählen Sie
                        dann, ob Sie zur <strong>Miete</strong> wohnen oder im{' '}
                        <strong>Eigenheim</strong>.
                    </p>
                </div>
            </div>

            <h3 className='section-subtitle' style={{color: 'var(--text-primary)', marginBottom: '15px'}}>1. Allgemeine Angaben</h3>
            
            <div className='general-grid'>
                <div className='input-group'>
                    <label className='input-label'>
                        Gesamtgröße (m²) <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    {}
                    <NumberInput
                        placeholder='65'
                        value={data.livingSpace}
                        onChange={(val) => updateField('livingSpace', val)}
                    />
                </div>
                <div className='input-group'>
                    <label className='input-label'>
                        Zimmeranzahl <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    {}
                    <NumberInput
                        placeholder='3'
                        value={data.numberOfRooms}
                        onChange={(val) => updateField('numberOfRooms', val)}
                    />
                </div>
                <div className='input-group'>
                    <label className='input-label'>
                        Personen im Haushalt <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    {}
                    <NumberInput
                        placeholder='2'
                        value={data.totalPeople}
                        onChange={(val) => updateField('totalPeople', val)}
                    />
                </div>
            </div>

            <h3 className='section-subtitle' style={{color: 'var(--text-primary)', marginBottom: '15px'}}>2. Ihre Situation</h3>
            
            <div className='housing-selector'>
                <motion.div
                    whileTap={{ scale: 0.98 }}
                    className={`type-card ${data.housingType === 'tenant' ? 'active' : ''}`}
                    onClick={() => updateField('housingType', 'tenant')}
                >
                    <span className='type-icon'>🏠</span>
                    <span style={{color: 'var(--text-primary)'}}>Ich bin Mieter <span style={{ color: '#ef4444' }}>*</span></span>
                    <div style={{ fontSize: '0.8rem', marginTop: '5px', fontWeight: '400', color: 'var(--text-secondary)' }}>
                        (Miete)
                    </div>
                </motion.div>

                <motion.div
                    whileTap={{ scale: 0.98 }}
                    className={`type-card ${data.housingType === 'owner' ? 'active' : ''}`}
                    onClick={() => updateField('housingType', 'owner')}
                >
                    <span className='type-icon'>🏡</span>
                    <span style={{color: 'var(--text-primary)'}}>Ich bin Eigentümer <span style={{ color: '#ef4444' }}>*</span></span>
                    <div style={{ fontSize: '0.8rem', marginTop: '5px', fontWeight: '400', color: 'var(--text-secondary)' }}>
                        (Eigenheim / Erbbaurecht)
                    </div>
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
                        <h3 className='section-subtitle' style={{color: 'var(--text-primary)', marginBottom: '15px'}}>Kosten als Mieter (in €) <span style={{ color: '#ef4444' }}>*</span></h3>
                        <div className='costs-grid'>
                            <div className='input-group'>
                                <label className='input-label'>
                                    Miete (Kalt) <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type='text'
                                    className='modern-input input-highlight'
                                    placeholder='0,00'
                                    value={data.rentCold || ''}
                                    onChange={e => updateField('rentCold', e.target.value)}
                                />
                            </div>
                            <div className='input-group'>
                                <label className='input-label'>Heizungskosten <span style={{ color: '#ef4444' }}>*</span></label>
                                <input
                                    type='text'
                                    className='modern-input input-highlight'
                                    placeholder='0,00'
                                    value={data.heatingCosts || ''}
                                    onChange={e => updateField('heatingCosts', e.target.value)}
                                />
                            </div>
                            <div className='input-group'>
                                <label className='input-label'>Nebenkosten (Übrige) <span style={{ color: '#ef4444' }}>*</span></label>
                                <input
                                    type='text'
                                    className='modern-input input-highlight'
                                    placeholder='0,00'
                                    value={data.otherCosts || ''}
                                    onChange={e => updateField('otherCosts', e.target.value)}
                                />
                            </div>

                            <div className='input-group'>
                                <label className='input-label' style={{ color: 'var(--accent-color)' }}>
                                    Gesamtbetrag <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type='text'
                                    className='modern-input input-highlight'
                                    placeholder='Summe'
                                    style={{ borderColor: 'var(--accent-color)' }}
                                    value={data.totalRent || ''}
                                    onChange={e => updateField('totalRent', e.target.value)}
                                />
                            </div>
                            <div className='input-group'>
                                <label className='input-label'>Ich allein zahle davon: <span style={{ color: '#ef4444' }}>*</span></label>
                                <input
                                    type='text'
                                    className='modern-input input-highlight'
                                    placeholder='Ihr Anteil'
                                    value={data.ownShareRent || ''}
                                    onChange={e => updateField('ownShareRent', e.target.value)}
                                />
                            </div>
                        </div>
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
                        <h3 className='section-subtitle' style={{color: 'var(--text-primary)', marginBottom: '15px'}}>Kosten als Eigentümer (in €) <span style={{ color: '#ef4444' }}>*</span></h3>
                        <div className='costs-grid'>
                            <div className='input-group'>
                                <label className='input-label'>
                                    Zinsen & Tilgung <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type='text'
                                    className='modern-input input-highlight'
                                    placeholder='Rate an Bank'
                                    value={data.interestRepayment || ''}
                                    onChange={e => updateField('interestRepayment', e.target.value)}
                                />
                            </div>
                            <div className='input-group'>
                                <label className='input-label'>Heizungskosten <span style={{ color: '#ef4444' }}>*</span></label>
                                <input
                                    type='text'
                                    className='modern-input input-highlight'
                                    placeholder='0,00'
                                    value={data.heatingCostsOwner || ''}
                                    onChange={e => updateField('heatingCostsOwner', e.target.value)}
                                />
                            </div>
                            <div className='input-group'>
                                <label className='input-label'>Nebenkosten (Übrige) <span style={{ color: '#ef4444' }}>*</span></label>
                                <input
                                    type='text'
                                    className='modern-input input-highlight'
                                    placeholder='Wasser, Müll, Grundsteuer...'
                                    value={data.otherCostsOwner || ''}
                                    onChange={e => updateField('otherCostsOwner', e.target.value)}
                                />
                            </div>

                            <div className='input-group'>
                                <label className='input-label' style={{ color: 'var(--accent-color)' }}>
                                    Gesamtbetrag <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type='text'
                                    className='modern-input input-highlight'
                                    placeholder='Summe'
                                    style={{ borderColor: 'var(--accent-color)' }}
                                    value={data.totalCostOwner || ''}
                                    onChange={e => updateField('totalCostOwner', e.target.value)}
                                />
                            </div>
                            <div className='input-group'>
                                <label className='input-label'>Ich allein zahle davon: <span style={{ color: '#ef4444' }}>*</span>  </label>
                                <input
                                    type='text'
                                    className='modern-input input-highlight'
                                    placeholder='Ihr Anteil'
                                    value={data.ownShareOwner || ''}
                                    onChange={e => updateField('ownShareOwner', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='loan-section'>
                            <h4 style={{ margin: '0 0 15px 0', fontSize: '1rem', color: 'var(--text-primary)' }}>
                                Belastungen aus Fremdmitteln (Kredite) <span style={{ color: '#ef4444' }}>*</span>
                            </h4>

                            <div className='input-group' style={{ marginBottom: '15px' }}>
                                <label className='input-label'>
                                    Details (Datum, Bank, Laufzeit)
                                </label>
                                <textarea
                                    className='modern-input'
                                    style={{minHeight: '80px', resize: 'vertical'}}
                                    placeholder='z.B. Darlehensvertrag vom 01.01.2020 bei Sparkasse...'
                                    value={data.loanDetails || ''}
                                    onChange={e => updateField('loanDetails', e.target.value)}
                                />
                            </div>

                            <div className='loan-rows-container'>
                                <div className='loan-row' style={{ border: 'none', paddingBottom: 0, marginBottom: 5 }}>
                                    <label className='input-label'>Restschuld (in €) <span style={{ color: '#ef4444' }}>*</span> </label>
                                    <label className='input-label'>Zinsen & Tilgung (mtl.) <span style={{ color: '#ef4444' }}>*</span></label>
                                </div>

                                {[0, 1].map(idx => {
                                    const loanItem = data.loans && data.loans[idx]
                                            ? data.loans[idx]
                                            : { remainingDebt: '', monthlyPayment: '' }

                                    return (
                                        <div key={idx} className='loan-row'>
                                            <input
                                                type='text'
                                                className='modern-input input-highlight'
                                                placeholder='Restschuld'
                                                value={loanItem.remainingDebt || ''}
                                                onChange={e => updateLoan(idx, 'remainingDebt', e.target.value)}
                                            />
                                            <input
                                                type='text'
                                                className='modern-input input-highlight'
                                                placeholder='Monatliche Rate'
                                                value={loanItem.monthlyPayment || ''}
                                                onChange={e => updateLoan(idx, 'monthlyPayment', e.target.value)}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='navigation-footer'>
                <button className='btn-secondary-action' onClick={onBack}>
                    Zurück
                </button>
                <button
                    className='btn-primary-action'
                    onClick={onNext}
                    disabled={!isStepValid()}
                    style={{ 
                        opacity: isStepValid() ? 1 : 0.5, 
                        cursor: isStepValid() ? 'pointer' : 'not-allowed' 
                    }}
                    title={
                        !isStepValid() ? 'Bitte füllen Sie alle Pflichtfelder aus' : ''
                    }
                >
                    Weiter zu Abschnitt I
                </button>
            </div>
        </div>
    )
}

export default SectionH