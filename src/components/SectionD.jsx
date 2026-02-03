import { motion } from 'framer-motion'
import '../css/Calendar.css'
import '../css/SectionD.css'
import DateInput from './common/DateInput'

const SectionD = ({ data, onChange, onBack, onNext }) => {
    
    
    const handleMainOptionChange = val => {
        onChange('hasDependents', val)
        if (val === 'yes' && data.dependents.length === 0) {
            addDependent()
        } else if (val === 'no') {
            onChange('dependents', [])
        }
    }

    const addDependent = () => {
        if (data.dependents.length >= 5) return
        const newPerson = {
            id: Date.now(),
            name: '',
            birthday: '',
            relationship: '',
            monthlyAmount: '',
            hasOwnIncome: null,
            incomeAmount: '',
        }
        onChange('dependents', [...data.dependents, newPerson])
    }

    const removeDependent = index => {
        const newList = [...data.dependents]
        newList.splice(index, 1)
        onChange('dependents', newList)

        if (newList.length === 0) {
            onChange('hasDependents', 'no')
        }
    }

    const updateDependent = (index, field, value) => {
        const newList = [...data.dependents]
        newList[index] = { ...newList[index], [field]: value }
        onChange('dependents', newList)
    }

    const isStepValid = () => {
        if (!data.hasDependents) return false
        if (data.hasDependents === 'no') return true
        if (data.dependents.length === 0) return false

        return data.dependents.every(person => {
            const basicValid =
                person.name &&
                person.name.trim() !== '' &&
                person.relationship &&
                person.relationship.trim() !== ''

            const incomeValid =
                person.hasOwnIncome === 'yes'
                    ? person.incomeAmount && person.incomeAmount.trim() !== ''
                    : person.hasOwnIncome === 'no'

            return basicValid && person.hasOwnIncome !== null && incomeValid
        })
    }

    
    return (
        <div className='section-card'>
            <h2 className='section-title'>D. Angehörige (Unterhalt)</h2>

            <div className='input-group mb-25'>
                <div 
                    className='section-d-question-container'
                    style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'flex-start',
                        gap: '5px' 
                    }}
                >
                    <div>
                        <span className='question-text-d'>
                            Gewähren Sie Angehörigen Bar- oder Naturalunterhalt?{' '}
                            <span style={{ color: 'red' }}>*</span>
                        </span>
                        <br/>
                        <span className='subtext-d'>(z. B. Kinder, Ehegatte, Eltern)</span>
                    </div>

                    {}
                    <div style={{ 
                        marginTop: '10px',
                        padding: '10px 12px',
                        borderLeft: '3px solid var(--accent-color)',
                        backgroundColor: 'rgba(59, 130, 246, 0.05)', 
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        fontStyle: 'italic',
                        borderRadius: '0 6px 6px 0',
                        display: 'flex',
                        gap: '8px',
                        lineHeight: '1.4',
                        maxWidth: '100%' 
                    }}>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>*</span>
                        <span>
                            Beispiel: Wenn Sie Kinder zuhause betreuen, gewähren Sie ihnen Naturalunterhalt.
                        </span>
                    </div>
                    {}
                </div>

                {}
                <div className='button-group mt-12'>
                    <button
                        className={`btn-secondary ${data.hasDependents === 'yes' ? 'active-ja' : ''}`}
                        onClick={() => handleMainOptionChange('yes')}
                    >
                        Ja
                    </button>
                    <button
                        className={`btn-secondary ${data.hasDependents === 'no' ? 'active-nein' : ''}`}
                        onClick={() => handleMainOptionChange('no')}
                    >
                        Nein
                    </button>
                </div>
            </div>

            {}
            {data.hasDependents === 'yes' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='mt-20'
                >
                    {data.dependents.map((person, index) => (
                        <div key={person.id} className='dependent-card'>
                            <div className='dependent-title'>
                                Person {index + 1}
                                {index > 0 && (
                                    <button
                                        className='remove-btn'
                                        onClick={() => removeDependent(index)}
                                    >
                                        🗑️ Entfernen
                                    </button>
                                )}
                            </div>

                            <div className='dependent-grid'>
                                {}
                                <div className='input-group'>
                                    <label className='input-label'>
                                        Name, Vorname, Anschrift{' '}
                                        <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        className='modern-input' 
                                        placeholder='Mustermann, Max'
                                        value={person.name}
                                        onChange={e =>
                                            updateDependent(index, 'name', e.target.value)
                                        }
                                    />
                                </div>

                                {}
                                <div className='input-group'>
                                    <label className='input-label'>Geburtsdatum</label>
                                    <DateInput
                                        value={person.birthday}
                                        onChange={val => updateDependent(index, 'birthday', val)}
                                        placeholder='TT.MM.JJJJ'
                                    />
                                </div>

                                {}
                                <div className='input-group'>
                                    <label className='input-label'>
                                        Verhältnis (z.B. Kind){' '}
                                        <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        className='modern-input'
                                        placeholder='Kind, Ehegatte...'
                                        value={person.relationship}
                                        onChange={e =>
                                            updateDependent(index, 'relationship', e.target.value)
                                        }
                                    />
                                </div>

                                {}
                                <div className='input-group'>
                                    <label className='input-label'>Monatsbetrag (falls Zahlung)</label>
                                    <div className="currency-input-wrapper">
                                        <input
                                            type='text'
                                            className='modern-input'
                                            placeholder='€ monatlich'
                                            value={person.monthlyAmount}
                                            onChange={e =>
                                                updateDependent(index, 'monthlyAmount', e.target.value)
                                            }
                                            style={{ color: '#3B82F6', fontWeight: '500' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {}
                            <div
                                style={{
                                    marginTop: '15px',
                                    borderTop: '1px solid var(--line-color)',
                                    paddingTop: '15px',
                                }}
                            >
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                    Hat diese Person eigene Einnahmen?{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </label>

                                {}
                                <div className='income-toggle-group'>
                                    <button
                                        className={`btn-secondary ${person.hasOwnIncome === 'yes' ? 'active-ja' : ''}`}
                                        onClick={() =>
                                            updateDependent(index, 'hasOwnIncome', 'yes')
                                        }
                                    >
                                        Ja
                                    </button>
                                    <button
                                        className={`btn-secondary ${person.hasOwnIncome === 'no' ? 'active-nein' : ''}`}
                                        onClick={() =>
                                            updateDependent(index, 'hasOwnIncome', 'no')
                                        }
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
                                            style={{
                                                color: '#3B82F6',
                                                fontWeight: 'bold',
                                            }}
                                            value={person.incomeAmount}
                                            onChange={e =>
                                                updateDependent(index, 'incomeAmount', e.target.value)
                                            }
                                        />
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    ))}

                    {}
                    {data.dependents.length >= 5 && (
                        <p
                            style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                fontStyle: 'italic',
                                marginTop: '10px',
                                textAlign: 'center',
                            }}
                        >
                            Hinweis: Es können maximal 5 Personen eingetragen werden.
                        </p>
                    )}

                    {}
                    {data.dependents.length < 5 && (
                        <button className='add-btn' onClick={addDependent}>
                            + Weitere Person hinzufügen
                        </button>
                    )}
                </motion.div>
            )}

            <div className='navigation-footer'>
                <button className='btn-secondary-action' onClick={onBack}>
                    Zurück
                </button>
                <button
                    className='btn-primary-action'
                    onClick={onNext}
                    disabled={!isStepValid()}
                    style={{ background: isStepValid() ? 'var(--accent-color)' : '#ccc' }}
                    title={
                        !isStepValid() ? 'Bitte füllen Sie alle Pflichtfelder aus' : ''
                    }
                >
                    Weiter zu Abschnitt E
                </button>
            </div>
        </div>
    )
}

export default SectionD