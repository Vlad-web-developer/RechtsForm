import { AnimatePresence, motion } from 'framer-motion'
import '../css/SectionJ.css'

const SectionJ = ({ data, onChange, onBack, onNext }) => {
    const updateField = (field, value) => {
        onChange(field, value)
    }

    const updateItem = (index, field, value) => {
        const currentList = data.loads || []
        const newItems = [...currentList]
        newItems[index] = { ...newItems[index], [field]: value }
        updateField('loads', newItems)
    }

    const addItem = () => {
        const currentList = data.loads || []
        if (currentList.length >= 2) return
        const newItems = [...currentList, { description: '', amount: '' }]
        updateField('loads', newItems)
    }

    const removeItem = index => {
        const currentList = data.loads || []
        const newItems = currentList.filter((_, i) => i !== index)
        updateField('loads', newItems)
    }

    const isStepValid = () => {
        if (!data.hasSpecialLoads) return false
        if (data.hasSpecialLoads === 'no') return true
        if (!data.loads || data.loads.length === 0) return false
        return data.loads.every(
            item =>
                item.description &&
                item.description.trim() !== '' &&
                item.amount &&
                item.amount.trim() !== '',
        )
    }

    return (
        <div className='section-card'>
            <h2 className='section-title'>J. Besondere Belastungen</h2>

            <div
                className='info-box-alert'
                style={{
                    marginBottom: '25px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderLeft: '4px solid var(--accent-color)', 
                    padding: '15px',
                    borderRadius: '8px',
                    display: 'flex', 
                    gap: '15px'
                }}
            >
                <div className='info-icon-container' style={{ fontSize: '1.5rem' }}>ℹ️</div>
                <div className='info-text-content'>
                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-primary)' }}>
                        Haben Sie besondere Belastungen? (z.B. Mehrausgaben für
                        körperbehinderte Angehörige, Mehrbedarfe gemäß § 21 SGB II).{' '}
                        <span style={{ color: '#ef4444' }}>*</span>
                    </p>
                </div>
            </div>

            <div className='toggle-container'>
                <button
                    className={`btn-toggle-j ${data.hasSpecialLoads === 'yes' ? 'active-yes' : ''}`}
                    onClick={() => {
                        updateField('hasSpecialLoads', 'yes')
                        
                        if (!data.loads || data.loads.length === 0) {
                            addItem()
                        }
                    }}
                >
                    {data.hasSpecialLoads === 'yes'} Ja
                </button>
                <button
                    className={`btn-toggle-j ${data.hasSpecialLoads === 'no' ? 'active-no' : ''}`}
                    onClick={() => {
                        updateField('hasSpecialLoads', 'no')
                        updateField('loads', []) 
                    }}
                >
                    Nein
                </button>
            </div>

            <AnimatePresence>
                {data.hasSpecialLoads === 'yes' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {(data.loads || []).map((item, index) => (
                            <div key={index} className='load-card'>
                                <div className='load-header'>
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

                                <div className='form-grid-j'>
                                    <div>
                                        <label className='input-label'>
                                            Beschreibung (Art der Belastung){' '}
                                            <span style={{ color: '#ef4444' }}>*</span>
                                        </label>
                                        <textarea
                                            
                                            className='modern-input'
                                            style={{ minHeight: '80px', resize: 'vertical' }}
                                            placeholder='z.B. Mehrbedarf für Behinderung, teure Medikamente...'
                                            value={item.description || ''}
                                            onChange={e =>
                                                updateItem(index, 'description', e.target.value)
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className='input-label'>Ich zahle davon (€)</label>
                                        <input
                                            type='number'
                                            className='modern-input'
                                            placeholder='0,00'
                                            value={item.amount || ''}
                                            onChange={e =>
                                                updateItem(index, 'amount', e.target.value)
                                            }
                                            style={{ color: 'var(--accent-color)', fontWeight: '600' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {(data.loads || []).length < 2 && (
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
                    style={{ 
                        opacity: isStepValid() ? 1 : 0.5, 
                        cursor: isStepValid() ? 'pointer' : 'not-allowed' 
                    }}
                    title={
                        !isStepValid() ? 'Bitte füllen Sie alle Pflichtfelder aus' : ''
                    }
                >
                    Weiter zu Abschnitt K
                </button>
            </div>
        </div>
    )
}

export default SectionJ