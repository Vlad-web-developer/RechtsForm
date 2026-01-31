import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import '../css/SectionF.css'

const SectionF = ({ data, onChange, onBack, onNext, hasPartner }) => {
    const [subStep, setSubStep] = useState(0)
    
    
    
    const [noExpensesConfirmed, setNoExpensesConfirmed] = useState(false)

    
    useEffect(() => {
        setNoExpensesConfirmed(false)
    }, [subStep])

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
        
        if (value) setNoExpensesConfirmed(false)
    }

    
    const isStepValid = (personType) => {
        const personData = data[personType];
        
        
        const hasAnyValue = categories.some(cat => {
            const item = personData[cat.key];
            return item.amount && item.amount.trim() !== '';
        });

        
        return hasAnyValue || noExpensesConfirmed;
    }

    const handleNext = () => {
        if (subStep === 0) {
            setSubStep(1)
        } else if (subStep === 1) {
            if (hasPartner === 'yes') {
                setSubStep(2)
            } else {
                onNext()
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
                <div key={cat.key} className='income-card'>
                    <div className='mb-15'>
                        <strong className='category-label' style={{ color: 'var(--text-primary)' }}>
                            {cat.label}
                        </strong>
                        <p className='category-desc' style={{ color: 'var(--text-secondary)' }}>
                            {cat.desc}
                        </p>
                    </div>

                    <div className='deduction-grid'>
                        <div className='input-group'>
                            <label className='input-label-small' style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '5px', display:'block' }}>
                                Bezeichnung (Art)
                            </label>
                            <input
                                type='text'
                                className='modern-input'
                                placeholder={cat.placeholderDesc}
                                value={data[personType][cat.key].description}
                                onChange={e =>
                                    updateField(personType, cat.key, 'description', e.target.value)
                                }
                            />
                        </div>

                        <div className='input-group'>
                            <label className='input-label-small' style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '5px', display:'block' }}>
                                {cat.isCommute ? 'Betrag (€) / KM' : 'Betrag (€ mtl.)'}
                            </label>
                            <input
                                type='text'
                                className='modern-input'
                                style={{ color: 'var(--accent-color)', fontWeight: '600' }}
                                placeholder={cat.placeholderAmnt}
                                value={data[personType][cat.key].amount}
                                onChange={e => {
                                    const val = e.target.value;
                                    if (/^[0-9.,]*$/.test(val)) {
                                        updateField(personType, cat.key, 'amount', val)
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}

            {}
            <div 
                className="checkbox-wrapper" 
                style={{ 
                    marginTop: '20px', 
                    padding: '15px', 
                    background: 'var(--input-bg)', 
                    borderRadius: '10px',
                    border: '1px solid var(--line-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer'
                }}
                onClick={() => setNoExpensesConfirmed(!noExpensesConfirmed)}
            >
                <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: `2px solid ${noExpensesConfirmed ? 'var(--accent-color)' : 'var(--text-secondary)'}`,
                    background: noExpensesConfirmed ? 'var(--accent-color)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'all 0.2s'
                }}>
                    {noExpensesConfirmed && '✓'}
                </div>
                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                    Ich habe keine (weiteren) Abzüge anzugeben.
                </span>
            </div>
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
                        <div className='info-box-alert' style={{ background: 'rgba(14, 165, 233, 0.1)', borderLeft: '4px solid #0ea5e9', padding: '15px', borderRadius: '8px', display: 'flex', gap: '15px' }}>
                            <div style={{ fontSize: '1.5rem' }}>ℹ️</div>
                            <div>
                                <h4 style={{ color: '#0ea5e9', margin: '0 0 5px 0' }}>Was können Sie abziehen?</h4>
                                <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0, opacity: 0.9 }}>
                                    In diesem Abschnitt geben Sie Ausgaben an, die Ihr Einkommen mindern ("Abzüge"). Dazu gehören Steuern, Pflichtbeiträge, Fahrtkosten zur Arbeit und notwendige Versicherungen.
                                </p>
                            </div>
                        </div>

                        <div className='navigation-footer'>
                            <button className='btn-secondary-action' onClick={handleBack}>Zurück</button>
                            <button className='btn-primary-action' onClick={handleNext}>Abzüge eintragen</button>
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
                        <h3 className='section-subtitle' style={{marginBottom: '20px', color: 'var(--text-primary)'}}>Ihre Abzüge</h3>
                        {renderFields('self')}

                        <div className='navigation-footer'>
                            <button className='btn-secondary-action' onClick={handleBack}>Zurück</button>
                            <button
                                className='btn-primary-action'
                                onClick={handleNext}
                                disabled={!isStepValid('self')}
                                style={{ 
                                    opacity: isStepValid('self') ? 1 : 0.5, 
                                    cursor: isStepValid('self') ? 'pointer' : 'not-allowed',
                                    background: isStepValid('self') ? 'var(--accent-color)' : '#94a3b8' 
                                }}
                            >
                                {hasPartner === 'yes' ? 'Weiter zum Partner' : 'Weiter'}
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
                        <h3 className='section-subtitle' style={{marginBottom: '10px', color: 'var(--text-primary)'}}>Abzüge des Partners</h3>
                        {renderFields('partner')}

                        <div className='navigation-footer'>
                            <button className='btn-secondary-action' onClick={handleBack}>Zurück</button>
                            <button
                                className='btn-primary-action'
                                onClick={handleNext}
                                disabled={!isStepValid('partner')}
                                style={{ 
                                    opacity: isStepValid('partner') ? 1 : 0.5, 
                                    cursor: isStepValid('partner') ? 'pointer' : 'not-allowed',
                                    background: isStepValid('partner') ? 'var(--accent-color)' : '#94a3b8' 
                                }}
                            >
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