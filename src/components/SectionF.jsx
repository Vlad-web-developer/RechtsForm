import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, Euro, TrendingDown } from 'lucide-react';

const SectionF = ({ data, onChange, onBack, onNext, hasPartner }) => {
    const [localData, setLocalData] = useState(data || {
        hasDeductions: null, 
        taxes: { has: null, amount: '' },
        socialSecurity: { has: null, amount: '' },
        otherInsurance: { has: null, amount: '' }, 
        commute: { has: null, distance: '', transportMode: 'public', cost: '' }, 
        otherWorkCosts: { has: null, amount: '', description: '' } 
    });

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const validate = () => {
            if (!localData.hasDeductions) return false;
            if (localData.hasDeductions === 'no') return true;
            const checkField = (field) => {
                if (field.has === 'yes') {
                    if (!field.amount || parseFloat(field.amount) <= 0) return false;
                }
                return true;
            };

            if (!checkField(localData.taxes)) return false;
            if (!checkField(localData.socialSecurity)) return false;
            if (!checkField(localData.otherInsurance)) return false;
            if (!checkField(localData.otherWorkCosts)) return false;
            if (localData.commute?.has === 'yes') {
                if (!localData.commute.cost && !localData.commute.distance) return false; 
            }

            return true;
        };

        setIsValid(validate());
        onChange('sectionF', localData);
    }, [localData, onChange]);


    const updateField = (category, field, value) => {
        setLocalData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }));
    };

    const toggleDeductions = (val) => {
        setLocalData(prev => ({ ...prev, hasDeductions: val }));
    };

    return (
        <div className="section-card">
            <h2 className="section-title">F. Abzüge vom Einkommen</h2>
            <div className="form-note">
                Hier können Sie Ausgaben eintragen, die Ihr verfügbares Einkommen mindern (z.B. Steuern, Versicherungen, Fahrtkosten).
            </div>
            <div className="input-group">
                <label className="question-label">
                    Haben Sie regelmäßige Abzüge vom Einkommen?
                    <br/>
                    <span style={{fontWeight: 'normal', fontSize: '0.9rem', opacity: 0.8}}>
                        (z.B. Lohnsteuer, Sozialversicherung, Fahrtkosten zur Arbeit, notwendige Versicherungen)
                    </span>
                </label>
                <div className="radio-group">
                    <label className={`radio-option ${localData.hasDeductions === 'yes' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="hasDeductions"
                            value="yes"
                            checked={localData.hasDeductions === 'yes'}
                            onChange={() => toggleDeductions('yes')}
                        />
                        Ja, ich habe Abzüge
                    </label>
                    <label className={`radio-option ${localData.hasDeductions === 'no' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="hasDeductions"
                            value="no"
                            checked={localData.hasDeductions === 'no'}
                            onChange={() => toggleDeductions('no')}
                        />
                        Nein, keine Abzüge
                    </label>
                </div>
            </div>

            <AnimatePresence>
                {localData.hasDeductions === 'yes' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="info-box-alert" style={{marginBottom: '20px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-color)', borderColor: 'var(--accent-color)'}}>
                            <TrendingDown size={20} />
                            <span>Bitte geben Sie monatliche Beträge an.</span>
                        </div>

                        <DeductionItem 
                            title="Steuern & Solidaritätszuschlag"
                            subtitle="Lohnsteuer, Kirchensteuer, Soli (nicht Umsatzsteuer)"
                            data={localData.taxes}
                            onUpdate={(field, val) => updateField('taxes', field, val)}
                        />
                        <DeductionItem 
                            title="Sozialversicherungsbeiträge"
                            subtitle="Kranken-, Renten-, Arbeitslosen- & Pflegeversicherung"
                            data={localData.socialSecurity}
                            onUpdate={(field, val) => updateField('socialSecurity', field, val)}
                        />
                        <DeductionItem 
                            title="Sonstige Versicherungen"
                            subtitle="Angemessene Versicherungen (z.B. Haftpflicht, Hausrat, Unfall, Leben)"
                            data={localData.otherInsurance}
                            onUpdate={(field, val) => updateField('otherInsurance', field, val)}
                        />
                        <CommuteItem 
                            data={localData.commute}
                            onUpdate={(field, val) => updateField('commute', field, val)}
                        />
                        <DeductionItem 
                            title="Sonstige Werbungskosten"
                            subtitle="Gewerkschaftsbeiträge, Arbeitsmittel etc."
                            data={localData.otherWorkCosts}
                            onUpdate={(field, val) => updateField('otherWorkCosts', field, val)}
                            hasDesc={true}
                        />

                    </motion.div>
                )}
            </AnimatePresence>

            <div className="navigation-footer">
                <button className="btn-secondary-action" onClick={onBack}>
                    Zurück
                </button>
                <button 
                    className="btn-primary-action" 
                    onClick={onNext}
                    disabled={!isValid}
                >
                    Weiter
                </button>
            </div>
        </div>
    );
};

const DeductionItem = ({ title, subtitle, data, onUpdate, hasDesc = false }) => {
    const isActive = data.has === 'yes';

    return (
        <div className="deduction-card" style={{ 
            border: isActive ? '1px solid var(--accent-color)' : '1px solid var(--line-color)',
            background: isActive ? 'rgba(59, 130, 246, 0.02)' : 'transparent',
            borderRadius: '10px',
            marginBottom: '15px',
            padding: '15px',
            transition: 'all 0.2s'
        }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                <div>
                    <div style={{fontWeight: '600'}}>{title}</div>
                    <div style={{fontSize: '0.8rem', opacity: 0.7}}>{subtitle}</div>
                </div>
                {/* Mini Toggle */}
                <div style={{display: 'flex', gap: '5px'}}>
                    <button 
                        className={`toggle-btn ${data.has === 'yes' ? 'active-yes' : ''}`}
                        onClick={() => onUpdate('has', data.has === 'yes' ? 'no' : 'yes')} // Toggle Logik
                        style={{
                            padding: '5px 10px',
                            borderRadius: '6px',
                            border: '1px solid var(--line-color)',
                            background: data.has === 'yes' ? 'var(--accent-color)' : 'transparent',
                            color: data.has === 'yes' ? 'white' : 'var(--text-primary)',
                            cursor: 'pointer'
                        }}
                    >
                        {data.has === 'yes' ? 'Ja' : 'Hinzufügen'}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div style={{display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap'}}>
                            <div className="input-with-icon" style={{flex: 1}}>
                                <Euro size={18} className="input-icon" />
                                <input 
                                    type="number" 
                                    placeholder="Betrag"
                                    value={data.amount}
                                    onChange={(e) => onUpdate('amount', e.target.value)}
                                    className="modern-input pl-10"
                                />
                            </div>
                            {hasDesc && (
                                <input 
                                    type="text" 
                                    placeholder="Bezeichnung (z.B. Arbeitskleidung)"
                                    value={data.description || ''}
                                    onChange={(e) => onUpdate('description', e.target.value)}
                                    className="modern-input"
                                    style={{flex: 2}}
                                />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const CommuteItem = ({ data, onUpdate }) => {
    const isActive = data.has === 'yes';

    return (
        <div className="deduction-card" style={{ 
            border: isActive ? '1px solid var(--accent-color)' : '1px solid var(--line-color)',
            background: isActive ? 'rgba(59, 130, 246, 0.02)' : 'transparent',
            borderRadius: '10px',
            marginBottom: '15px',
            padding: '15px'
        }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                    <div style={{fontWeight: '600'}}>Fahrtkosten zur Arbeit</div>
                    <div style={{fontSize: '0.8rem', opacity: 0.7}} >Einfache Entfernung oder ÖPNV-Ticket</div>
                </div>
                <button 
                    className={`toggle-btn ${data.has === 'yes' ? 'active-yes' : ''}`}
                    onClick={() => onUpdate('has', data.has === 'yes' ? 'no' : 'yes')}
                    style={{
                        padding: '5px 10px',
                        borderRadius: '6px',
                        border: '1px solid var(--line-color)',
                        background: data.has === 'yes' ? 'var(--accent-color)' : 'transparent',
                        color: data.has === 'yes' ? 'white' : 'var(--text-primary)',
                        cursor: 'pointer'
                    }}
                >
                    {data.has === 'yes' ? 'Ja' : 'Hinzufügen'}
                </button>
            </div>

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div style={{marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                             <div className="radio-group" style={{fontSize: '0.9rem'}}>
                                <label className={`radio-option ${data.transportMode === 'public' ? 'selected' : ''}`}>
                                    <input type="radio" checked={data.transportMode === 'public'} onChange={() => onUpdate('transportMode', 'public')} />
                                    Öffentliche Verkehrsmittel
                                </label>
                                <label className={`radio-option ${data.transportMode === 'car' ? 'selected' : ''}`}>
                                    <input type="radio" checked={data.transportMode === 'car'} onChange={() => onUpdate('transportMode', 'car')} />
                                    PKW
                                </label>
                            </div>

                            <div style={{display: 'flex', gap: '10px'}}>
                                {data.transportMode === 'public' ? (
                                    <div className="input-with-icon" style={{flex: 1}}>
                                        <Euro size={18} className="input-icon" />
                                        <input 
                                            type="number" 
                                            placeholder="Monatliche Kosten"
                                            value={data.cost}
                                            onChange={(e) => onUpdate('cost', e.target.value)}
                                            className="modern-input pl-10"
                                        />
                                    </div>
                                ) : (
                                    <div className="input-group" style={{flex: 1, marginBottom: 0}}>
                                        <input 
                                            type="number" 
                                            placeholder="Einfache Entfernung (km)"
                                            value={data.distance}
                                            onChange={(e) => onUpdate('distance', e.target.value)}
                                            className="modern-input"
                                        />
                                        <div style={{fontSize: '0.8rem', marginTop: '5px', opacity: 0.7}}>
                                            Pauschale wird automatisch berechnet (z.B. 5,20 € pro km).
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SectionF;