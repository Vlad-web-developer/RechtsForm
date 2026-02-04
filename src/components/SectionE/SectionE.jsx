import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import IncomeItem from './IncomeItem';
import OtherIncomeBox from './OtherIncomeBox';
import '../../css/SectionE.css';

const SectionE = ({ data, onChange, onBack, onNext, setStep }) => {
    const [subStep, setSubStep] = useState(0);

    const incomeCategories = [
        { key: 'nichtselbstaendig', label: 'Nichtselbständige Arbeit' },
        { key: 'selbstaendig', label: 'Selbständige Arbeit / Gewerbe' },
        { key: 'vermietung', label: 'Vermietung und Verpachtung' },
        { key: 'kapital', label: 'Kapitalvermögen' },
        { key: 'kindergeld', label: 'Kindergeld / Kinderzuschlag' },
        { key: 'wohngeld', label: 'Wohngeld' },
        { key: 'unterhalt', label: 'Unterhalt' },
        { key: 'rente', label: 'Rente / Pension' },
        { key: 'arbeitslosengeld', label: 'Arbeitslosengeld (ALG I)' },
        { key: 'buergergeld', label: 'Bürgergeld' },
        { key: 'krankengeld', label: 'Krankengeld' },
        { key: 'elterngeld', label: 'Elterngeld' },
        { key: 'sonstige', label: 'Andere Einnahmen (z.B. Urlaubsgeld)', isOther: true },
    ];

    const updateIncome = (person, key, field, value) => {
        const newData = { ...data[person] };
        if (key === 'sonstige' && field === 'has' && value === 'yes') {
            if (!newData[key].items || newData[key].items.length === 0) {
                newData[key] = { ...newData[key], items: [{ details: '', brutto: '' }], [field]: value };
            } else {
                newData[key] = { ...newData[key], [field]: value };
            }
        } else {
            newData[key] = { ...newData[key], [field]: value };
        }
        onChange(person, newData);
    };

    const updateOtherIncomeItem = (person, index, field, value) => {
        const newData = { ...data[person] };
        const newItems = [...(newData.sonstige.items || [])];
        newItems[index] = { ...newItems[index], [field]: value };
        newData.sonstige = { ...newData.sonstige, items: newItems };
        onChange(person, newData);
    };

    const handleNext = () => {
        if (subStep === 0 && data.receivesSocialAssistanceSGBXII === 'yes') setStep(11);
        else if (subStep === 0) setSubStep(1);
        else if (subStep === 1) setSubStep(2);
        else if (subStep === 2 && data.hasPartner === 'no') onNext();
        else if (subStep === 2) setSubStep(3);
        else onNext();
    };

    const isIncomeStepValid = personType => {
        return incomeCategories.every(cat => {
            const item = data[personType]?.[cat.key];
            if (item?.has === 'yes') {
                if (cat.key === 'sonstige') return item.items?.every(i => i.brutto?.trim() !== '');
                return item.brutto?.trim() !== '';
            }
            return item?.has !== null;
        });
    };

    const renderIncomeList = personType => {
        const allNo = incomeCategories.every(cat => data[personType]?.[cat.key]?.has === 'no');

        return (
            <div className='income-list'>
                <p className='substep-instruction'>Haben Sie Einnahmen aus folgenden Quellen? <span className='required' style={{ color: 'red' }}>*</span></p>
                {incomeCategories.map(cat => (
                    cat.isOther ? (
                        <div key={cat.key} className={`income-card ${data[personType]?.sonstige?.has === 'yes' ? 'active' : ''}`}>
                            <div className='income-header'>
                                <span className='income-label'>{cat.label}</span>
                                <div className='income-controls'>
                                    <button className={`btn-toggle ${data[personType]?.sonstige?.has === 'yes' ? 'selected-ja' : ''}`} onClick={() => updateIncome(personType, 'sonstige', 'has', 'yes')}>Ja</button>
                                    <button className={`btn-toggle ${data[personType]?.sonstige?.has === 'no' ? 'selected-nein' : ''}`} onClick={() => updateIncome(personType, 'sonstige', 'has', 'no')}>Nein</button>
                                </div>
                            </div>
                            {data[personType]?.sonstige?.has === 'yes' && (
                                <OtherIncomeBox 
                                    items={data[personType].sonstige.items || []}
                                    onUpdateItem={(idx, f, v) => updateOtherIncomeItem(personType, idx, f, v)}
                                    onAddItem={() => {
                                        const newData = {...data[personType]};
                                        newData.sonstige.items.push({details: '', brutto: ''});
                                        onChange(personType, newData);
                                    }}
                                    onRemoveItem={(idx) => {
                                        const newData = {...data[personType]};
                                        newData.sonstige.items.splice(idx, 1);
                                        onChange(personType, newData);
                                    }}
                                />
                            )}
                        </div>
                    ) : (
                        <IncomeItem 
                            key={cat.key} 
                            cat={cat} 
                            itemData={data[personType]?.[cat.key]} 
                            onUpdate={(f, v) => updateIncome(personType, cat.key, f, v)} 
                        />
                    )
                ))}

{allNo && personType === 'self' && (
    <div className='income-card' style={{ 
        border: '1px solid #ef4444',            
        background: 'rgba(239, 68, 68, 0.1)',   
        padding: '20px', 
        marginTop: '20px',
        borderRadius: '8px'                     
    }}>
        <label style={{ 
            color: '#ef4444',                   
            fontWeight: 'bold',
            display: 'block'                    
        }}>
            5. Ergänzende Angaben bei fehlenden Einnahmen
        </label>
        
        <p style={{ 
            fontSize: '0.9rem', 
            color: 'var(--text-primary)',       
            marginTop: '10px',
            opacity: 0.9 
        }}>
            Erläutern Sie kurz, von welchen Mitteln Sie Ihren Lebensunterhalt bestreiten. Ein Beleg kann später in Abschnitt L hochgeladen werden.
        </p>
    </div>
)}

                <div className='navigation-footer'>
                    <button className='btn-secondary-action' onClick={() => setSubStep(subStep - 1)}>Zurück</button>
                    <button className='btn-primary-action' onClick={handleNext} disabled={!isIncomeStepValid(personType)} style={{ background: isIncomeStepValid(personType) ? 'var(--accent-color)' : '#ccc' }}>Weiter</button>
                </div>
            </div>
        );
    };

    return (
        <div className='section-card'>
            <h2 className='section-title'>E. Bruttoeinnahmen</h2>
            <AnimatePresence mode='wait'>
                {subStep === 0 && (
                    <motion.div key='step0' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                     <div className='info-box-alert' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <div style={{ fontWeight: '600' }}>
        💡 Beziehen Sie Leistungen nach SGB XII (Sozialhilfe)?
    </div>
    <div style={{ fontSize: '0.9rem', opacity: 0.85 }}>
        Wenn Sie hier mit <strong>"Ja"</strong> antworten, werden die detaillierten Fragen zu Einkommen und Vermögen (Abschnitte E bis J) 
        <strong> automatisch übersprungen</strong>. Sie müssen am Ende lediglich Ihren aktuellen Bewilligungsbescheid hochladen.
    </div>
</div>
                        <div className='button-row-sgb'>
                            <button className={`sgb-btn-large ${data.receivesSocialAssistanceSGBXII === 'yes' ? 'active-yes' : ''}`} onClick={() => onChange('receivesSocialAssistanceSGBXII', 'yes')}>Ja, SGB XII</button>
                            <button className={`sgb-btn-small ${data.receivesSocialAssistanceSGBXII === 'no' ? 'active-no' : ''}`} onClick={() => onChange('receivesSocialAssistanceSGBXII', 'no')}>Nein</button>
                        </div>
                        <div className='navigation-footer'>
                            <button className='btn-secondary-action' onClick={onBack}>Zurück</button>
                            <button className='btn-primary-action' onClick={handleNext} disabled={data.receivesSocialAssistanceSGBXII === null}>Weiter</button>
                        </div>
                    </motion.div>
                )}
                {subStep === 1 && renderIncomeList('self')}
                {subStep === 2 && (
                    <motion.div key='step2' initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        <div className='substep-instruction'>Haben Sie einen Partner?</div>
                        <div className='button-row-sgb'>
                            <button className={`sgb-btn-large ${data.hasPartner === 'yes' ? 'active-yes' : ''}`} onClick={() => onChange('hasPartner', 'yes')}>Ja</button>
                            <button className={`sgb-btn-small ${data.hasPartner === 'no' ? 'active-no' : ''}`} onClick={() => onChange('hasPartner', 'no')}>Nein</button>
                        </div>
                        <div className='navigation-footer'>
                            <button className='btn-secondary-action' onClick={() => setSubStep(1)}>Zurück</button>
                            <button className='btn-primary-action' onClick={handleNext} disabled={data.hasPartner === null}>Weiter</button>
                        </div>
                    </motion.div>
                )}
                {subStep === 3 && renderIncomeList('partner')}
            </AnimatePresence>
        </div>
    );
};

export default SectionE;