import { AnimatePresence, motion } from 'framer-motion'
import '../css/SectionI.css'

const SectionI = ({ data, onChange, onBack, onNext }) => {
    const updateField = (field, value) => {
        onChange(field, value)
    }

    const updateItem = (index, field, value) => {
        const currentList = data.obligations || []
        const newItems = [...currentList]
        newItems[index] = { ...newItems[index], [field]: value }
        updateField('obligations', newItems)
    }

    const addItem = () => {
        const currentList = data.obligations || []
        if (currentList.length >= 3) return

        const newItems = [
            ...currentList,
            { description: '', remainingDebt: '', monthlyPayment: '', ownShare: '' },
        ]
        updateField('obligations', newItems)
    }

    const removeItem = index => {
        const currentList = data.obligations || []
        const newItems = currentList.filter((_, i) => i !== index)
        updateField('obligations', newItems)
    }

    const isStepValid = () => {
        if (!data.hasObligations) return false
        if (data.hasObligations === 'no') return true
        if (!data.obligations || data.obligations.length === 0) return false

        
        return data.obligations.every(item => {
            return (
                item.description &&
                item.description.trim() !== '' &&
                ((item.remainingDebt && item.remainingDebt.trim() !== '') ||
                    (item.monthlyPayment && item.monthlyPayment.trim() !== ''))
            )
        })
    }

    return (
        <div className='section-card'>
            <h2 className='section-title'>I. Sonstige Zahlungsverpflichtungen</h2>

            <div className='info-box-alert' style={{ marginBottom: '25px', display: 'flex', gap: '15px' }}>
                <div style={{ fontSize: '1.5rem' }}>ℹ️</div>
                <div className='info-text-content'>
                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-primary)' }}>
                        Haben Sie sonstige Zahlungsverpflichtungen? (z.B. Ratenkredite,
                        Unterhaltszahlungen, offene Rechnungen).{' '}
                        <span style={{ color: '#ef4444' }}>*</span>
                    </p>
                    <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                        Bitte geben Sie hier keine Versicherungen oder Wohnkosten an (diese gehören in Abschnitt G oder H).
                    </p>
                </div>
            </div>

            <div className='toggle-container'>
                <button
                    className={`btn-toggle-i ${data.hasObligations === 'yes' ? 'active-yes' : ''}`}
                    onClick={() => {
                        updateField('hasObligations', 'yes')
                        
                        if (!data.obligations || data.obligations.length === 0) {
                            addItem()
                        }
                    }}
                >
                    {data.hasObligations === 'yes' } Ja
                </button>
                <button
                    className={`btn-toggle-i ${data.hasObligations === 'no' ? 'active-no' : ''}`}
                    onClick={() => {
                        updateField('hasObligations', 'no')
                        updateField('obligations', []) 
                    }}
                >
                    Nein
                </button>
            </div>

            <AnimatePresence>
                {data.hasObligations === 'yes' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {(data.obligations || []).map((item, index) => (
                            <div key={index} className='obligation-card'>
                                <div className='obligation-header'>
                                    <span>Eintrag {index + 1}</span>
                                    {index > 0 && (
                                        <button
                                            className='btn-remove'
                                            onClick={() => removeItem(index)}
                                        >
                                            Entfernen
                                        </button>
                                    )}
                                </div>

                                <div className='form-grid-i'>
                                    <div>
                                        <label className='input-label'>
                                            Beschreibung (Gläubiger, Grund, von wann bis wann){' '}
                                            <span style={{ color: '#ef4444' }}>*</span>
                                        </label>
                                        <textarea
                                            
                                            className='modern-input'
                                            style={{ minHeight: '80px', resize: 'vertical' }}
                                            placeholder='z.B. Ratenkredit MediaMarkt, seit 01.2023 bis 01.2025'
                                            value={item.description || ''}
                                            onChange={e =>
                                                updateItem(index, 'description', e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className='money-row'>
                                        <div>
                                            <label className='input-label'>Restschuld (€)</label>
                                            <input
                                                type='number'
                                                className='modern-input'
                                                placeholder='0,00'
                                                value={item.remainingDebt || ''}
                                                onChange={e =>
                                                    updateItem(index, 'remainingDebt', e.target.value)
                                                }
                                                style={{ color: 'var(--accent-color)', fontWeight: '600' }}
                                            />
                                        </div>
                                        <div>
                                            <label className='input-label'>Rate mtl. (€)</label>
                                            <input
                                                type='number'
                                                className='modern-input'
                                                placeholder='0,00'
                                                value={item.monthlyPayment || ''}
                                                onChange={e =>
                                                    updateItem(index, 'monthlyPayment', e.target.value)
                                                }
                                                style={{ color: 'var(--accent-color)', fontWeight: '600' }}
                                            />
                                        </div>
                                        <div>
                                            <label className='input-label'>Ich zahle (€)</label>
                                            <input
                                                type='text' 
                                                className='modern-input'
                                                placeholder='Anteil'
                                                value={item.ownShare || ''}
                                                onChange={e =>
                                                    updateItem(index, 'ownShare', e.target.value)
                                                }
                                                style={{ color: 'var(--accent-color)', fontWeight: '600' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {(data.obligations || []).length < 3 && (
                            <button className='btn-add' onClick={addItem}>
                                + Weiteren Eintrag hinzufügen
                            </button>
                        )}
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
                    style={{ opacity: isStepValid() ? 1 : 0.5, cursor: isStepValid() ? 'pointer' : 'not-allowed' }}
                    title={
                        !isStepValid() ? 'Bitte füllen Sie alle Pflichtfelder aus' : ''
                    }
                >
                    Weiter zu Abschnitt J
                </button>
            </div>
        </div>
    )
}

export default SectionI