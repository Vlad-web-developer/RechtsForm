import { CheckCircle2, Circle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import '../css/SectionF.css'

const SectionF = ({ data, onChange, onBack, onNext }) => {
    const [localData, setLocalData] = useState(() => {
        return { hasDeductions: data?.hasDeductions || null }
    })

    const isValid = localData.hasDeductions !== null

    useEffect(() => {
        onChange('sectionF', localData)
    }, [localData, onChange])

    const toggleDeductions = val => {
        setLocalData({ hasDeductions: val })
    }

    return (
        <div className='section-card'>
            <h2 className='section-title'>F. Abzüge vom Einkommen</h2>

            <div className='main-question-block'>
                <label className='question-header'>
                    Haben Sie regelmäßige Abzüge vom Einkommen?
                </label>
                <div className='question-subheader'>
                    (z.B. Lohnsteuer, Sozialversicherung, Fahrtkosten zur Arbeit, notwendige Versicherungen)
                </div>

                {/* Сетка выбора: на десктопе 2 колонки, на мобилках 1 */}
                <div className='selection-grid'>
                    
                    {/* Карточка "JA" */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`selection-card ${localData.hasDeductions === 'yes' ? 'selected' : ''}`}
                        onClick={() => toggleDeductions('yes')}
                    >
                        <div className='selection-indicator'>
                            {localData.hasDeductions === 'yes' ? (
                                <CheckCircle2 size={24} className="icon-active" />
                            ) : (
                                <Circle size={24} className="icon-inactive" />
                            )}
                        </div>
                        <div className='selection-content'>
                            <span className='selection-label'>Ja, habe ich</span>
                        </div>
                    </motion.div>

                    {/* Карточка "NEIN" */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`selection-card ${localData.hasDeductions === 'no' ? 'selected' : ''}`}
                        onClick={() => toggleDeductions('no')}
                    >
                        <div className='selection-indicator'>
                            {localData.hasDeductions === 'no' ? (
                                <CheckCircle2 size={24} className="icon-active" />
                            ) : (
                                <Circle size={24} className="icon-inactive" />
                            )}
                        </div>
                        <div className='selection-content'>
                            <span className='selection-label'>Nein, keine</span>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* === НАВИГАЦИЯ === */}
            <div className='navigation-footer'>
                <button className='btn-secondary-action' onClick={onBack}>
                    Zurück
                </button>
                <button
                    className='btn-primary-action'
                    onClick={onNext}
                    disabled={!isValid}
                    style={{ background: isValid ? 'var(--accent-color)' : '#94a3b8' }}
                >
                    Weiter
                </button>
            </div>
        </div>
    )
}

export default SectionF