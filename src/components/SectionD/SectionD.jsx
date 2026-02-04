import { motion } from 'framer-motion';
import DependentCard from './DependentCard';
import '../../css/Calendar.css';
import '../../css/SectionD.css';

const SectionD = ({ 
    data = { hasDependents: null, dependents: [] }, 
    onChange, 
    onBack, 
    onNext 
}) => {
    const handleMainOptionChange = val => {
        onChange('hasDependents', val);
        const currentDeps = data?.dependents || [];
        if (val === 'yes' && currentDeps.length === 0) {
            addDependent();
        } else if (val === 'no') {
            onChange('dependents', []);
        }
    };

    const addDependent = () => {
        const currentDeps = data?.dependents || [];
        if (currentDeps.length >= 5) return;
        const newPerson = {
            id: Date.now(),
            name: '',
            birthday: '',
            relationship: '',
            monthlyAmount: '',
            hasOwnIncome: null,
            incomeAmount: '',
        };
        onChange('dependents', [...currentDeps, newPerson]);
    };

    const removeDependent = index => {
        const newList = [...(data?.dependents || [])];
        newList.splice(index, 1);
        onChange('dependents', newList);
        if (newList.length === 0) onChange('hasDependents', 'no');
    };

    const updateDependent = (index, field, value) => {
        const newList = [...(data?.dependents || [])];
        newList[index] = { ...newList[index], [field]: value };
        onChange('dependents', newList);
    };

    const isStepValid = () => {
        
        if (!data || data.hasDependents === null) return false;
        if (data.hasDependents === 'no') return true;
        if (!data.dependents || data.dependents.length === 0) return false;

        return data.dependents.every(person => {
            const basicValid = person.name?.trim() && person.relationship?.trim();
            const incomeValid = person.hasOwnIncome === 'yes'
                ? person.incomeAmount?.trim() !== ''
                : person.hasOwnIncome === 'no';

            return basicValid && person.hasOwnIncome !== null && incomeValid;
        });
    };

    return (
        <div className='section-card'>
            <h2 className='section-title'>D. Angehörige (Unterhalt)</h2>

            <div className='input-group mb-25'>
                <div className='section-d-question-container'>
                    <div>
                        <span className='question-text-d'>
                            Gewähren Sie Angehörigen Bar- oder Naturalunterhalt? <span style={{ color: 'red' }}>*</span>
                        </span>
                        <br/>
                        <span className='subtext-d'>(z. B. Kinder, Ehegatte, Eltern)</span>
                    </div>

                    <div className='info-hint-box' style={{ marginTop: '10px', padding: '10px', borderLeft: '3px solid var(--accent-color)', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: '0 6px 6px 0' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                             💡 Beispiel: Wenn Sie Kinder zuhause betreuen, gewähren Sie ihnen Naturalunterhalt.
                        </span>
                    </div>
                </div>

                <div className='button-group mt-12'>
                    <button
                        className={`btn-secondary ${data?.hasDependents === 'yes' ? 'active-yes' : ''}`}
                        onClick={() => handleMainOptionChange('yes')}
                    > Ja </button>
                    <button
                        className={`btn-secondary ${data?.hasDependents === 'no' ? 'active-no' : ''}`}
                        onClick={() => handleMainOptionChange('no')}
                    > Nein </button>
                </div>
            </div>

            {data?.hasDependents === 'yes' && data?.dependents && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='mt-20'>
                    {data.dependents.map((person, index) => (
                        <DependentCard 
                            key={person.id}
                            person={person}
                            index={index}
                            onUpdate={(field, val) => updateDependent(index, field, val)}
                            onRemove={() => removeDependent(index)}
                        />
                    ))}

                    {(data?.dependents?.length || 0) < 5 ? (
                        <button className='add-btn' onClick={addDependent}>
                            + Weitere Person hinzufügen
                        </button>
                    ) : (
                        <p className='limit-hint' style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            Maximal 5 Personen möglich.
                        </p>
                    )}
                </motion.div>
            )}

            <div className='navigation-footer'>
                <button className='btn-secondary-action' onClick={onBack}> Zurück </button>
                <button
                    className='btn-primary-action'
                    onClick={onNext}
                    disabled={!isStepValid()}
                    style={{ background: isStepValid() ? 'var(--accent-color)' : '#ccc' }}
                >
                    Weiter zu Abschnitt E
                </button>
            </div>
        </div>
    );
};

export default SectionD;