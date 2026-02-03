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

    
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px', 
        alignItems: 'end' 
    }

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        fontSize: '0.85rem',
        textTransform: 'uppercase', 
        letterSpacing: '0.05em',
        color: 'var(--text-primary)' 
    }

    
    return (
        <div className='section-card'>
            <h2 className='section-title'>D. Angehörige (Unterhalt)</h2>

            <div className='input-group mb-25'>
                <div style={{ width: '100%' }}>
                    {}
                    <div style={{ marginBottom: '10px' }}>
                        <span className='question-text-d' style={{ display: 'block', lineHeight: '1.4', fontSize: '1.1rem' }}>
                            Gewähren Sie Angehörigen Bar- oder Naturalunterhalt?{' '}
                            <span style={{ color: 'red' }}>*</span>
                        </span>
                        <div style={{ marginTop: '4px' }}>
                            <span className='subtext-d'>(z. B. Kinder, Ehegatte, Eltern)</span>
                        </div>
                    </div>

                    {}
                    <div style={{ 
                        marginTop: '15px',
                        marginBottom: '20px',
                        padding: '12px 15px',
                        borderLeft: '4px solid var(--accent-color)',
                        backgroundColor: 'rgba(59, 130, 246, 0.08)', 
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        fontStyle: 'italic',
                        borderRadius: '0 6px 6px 0',
                        display: 'flex',
                        gap: '10px',
                        lineHeight: '1.5',
                    }}>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>*</span>
                        <span>
                            Beispiel: Wenn Sie Kinder zuhause betreuen, gewähren Sie ihnen Naturalunterhalt.
                        </span>
                    </div>
                </div>

                <div className='button-group '>
                    <button
                        className={`btn-secondary ${data.hasDependents === 'yes' ? 'active-selection' : ''}`}
                        onClick={() => handleMainOptionChange('yes')}
                    >
                        Ja
                    </button>
                    <button
                        className={`btn-secondary ${data.hasDependents === 'no' ? 'active-selection' : ''}`}
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
                        <div key={person.id} className='dependent-card' style={{ marginBottom: '30px' }}>
                            <div className='dependent-title' style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: 'bold' }}>
                                Person {index + 1}
                                {index > 0 && (
                                    <button
                                        className='remove-btn'
                                        onClick={() => removeDependent(index)}
                                        style={{ float: 'right', fontSize: '0.9rem' }}
                                    >
                                        🗑️ Entfernen
                                    </button>
                                )}
                            </div>

                            {}
                            <div style={gridStyle} className="dependent-grid-container">
                                {}
                                <div className='input-group'>
                                    <label style={labelStyle}>
                                        Name, Vorname, Anschrift <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        className='modern-input' 
                                        placeholder='Mustermann, Max'
                                        value={person.name}
                                        onChange={e => updateDependent(index, 'name', e.target.value)}
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                {}
                                <div className='input-group'>
                                    <label style={labelStyle}>
                                        Geburtsdatum
                                    </label>
                                    <DateInput
                                        value={person.birthday}
                                        onChange={val => updateDependent(index, 'birthday', val)}
                                        placeholder='TT.MM.JJJJ'
                                    />
                                </div>

                                {}
                                <div className='input-group'>
                                    <label style={labelStyle}>
                                        Verhältnis (z.B. Kind) <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        className='modern-input'
                                        placeholder='Kind, Ehegatte...'
                                        value={person.relationship}
                                        onChange={e => updateDependent(index, 'relationship', e.target.value)}
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                {}
                                <div className='input-group'>
                                    <label style={labelStyle}>
                                        Monatsbetrag (falls Zahlung)
                                    </label>
                                    <input
                                        type='text'
                                        className='modern-input'
                                        placeholder='€ monatlich'
                                        value={person.monthlyAmount}
                                        onChange={e => updateDependent(index, 'monthlyAmount', e.target.value)}
                                        style={{ width: '100%', color: '#3B82F6', fontWeight: '500' }}
                                    />
                                </div>
                            </div>
                            
                            {}

                            {}
                            <div
                                style={{
                                    marginTop: '20px',
                                    borderTop: '1px solid var(--line-color)',
                                    paddingTop: '20px',
                                }}
                            >
                                <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold', fontSize: '1rem' }}>
                                    Hat diese Person eigene Einnahmen? <span style={{ color: 'red' }}>*</span>
                                </label>

                                <div className='income-toggle-group' style={{ display: 'flex', gap: '10px' }}>
                                    <button
                                        className={`btn-secondary ${person.hasOwnIncome === 'yes' ? 'active-selection' : ''}`}
                                        style={{ flex: 1 }}
                                        onClick={() => updateDependent(index, 'hasOwnIncome', 'yes')}
                                    >
                                        Ja
                                    </button>
                                    <button
                                        className={`btn-secondary ${person.hasOwnIncome === 'no' ? 'active-selection' : ''}`}
                                        style={{ flex: 1 }}
                                        onClick={() => updateDependent(index, 'hasOwnIncome', 'no')}
                                    >
                                        Nein
                                    </button>
                                </div>

                                {person.hasOwnIncome === 'yes' && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -5 }} 
                                        animate={{ opacity: 1, y: 0 }}
                                        className='input-group'
                                        style={{ marginTop: '15px' }}
                                    >
                                        <label style={labelStyle}>Haben Sie Nettoeinnahmen?</label>
                                        <input
                                            type='text'
                                            className='modern-input'
                                            placeholder='Betrag (netto) €'
                                            style={{
                                                color: '#3B82F6',
                                                fontWeight: 'bold',
                                                width: '100%'
                                            }}
                                            value={person.incomeAmount}
                                            onChange={e => updateDependent(index, 'incomeAmount', e.target.value)}
                                        />
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    ))}

                    {}
                    {data.dependents.length >= 5 && (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic', marginTop: '10px', textAlign: 'center' }}>
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

            {}
            <div className='button-group mt-40'>
                <button className='btn-secondary' onClick={onBack}>
                    Zurück
                </button>
                <button
                    className='btn-primary'
                    onClick={onNext}
                    disabled={!isStepValid()}
                    style={{ background: isStepValid() ? 'var(--accent-color)' : '#ccc' }}
                >
                    Weiter zu Abschnitt E
                </button>
            </div>
        </div>
    )
}

export default SectionD