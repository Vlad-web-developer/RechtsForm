import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown } from 'lucide-react';
import '../css/SectionF.css';

const SectionF = ({ data, onChange, onBack, onNext }) => {
    
    
    const [localData, setLocalData] = useState(() => {
        const defaults = {
            hasDeductions: null,
            taxes: { description: '', amount: '' },
            socialSecurity: { description: '', amount: '' },
            otherInsurance: { description: '', amount: '' },
            commute: { description: '', amount: '' },
            
            otherWorkCosts: { description: '', amount: '' }
        };

        if (!data) return defaults;

        
        return {
            ...defaults,
            ...data,
            taxes: { ...defaults.taxes, ...(data.taxes || {}) },
            socialSecurity: { ...defaults.socialSecurity, ...(data.socialSecurity || {}) },
            otherInsurance: { ...defaults.otherInsurance, ...(data.otherInsurance || {}) },
            commute: { ...defaults.commute, ...(data.commute || {}) },
            otherWorkCosts: { ...defaults.otherWorkCosts, ...(data.otherWorkCosts || {}) }
        };
    });

    const isValid = localData.hasDeductions !== null;

    useEffect(() => {
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
            
            {}
            <div className="main-question-block" style={{marginBottom: '30px'}}>
                <label className="question-header">
                    Haben Sie regelmäßige Abzüge vom Einkommen?
                </label>
                <div className="question-subheader">
                    (z.B. Lohnsteuer, Sozialversicherung, Fahrtkosten zur Arbeit, notwendige Versicherungen)
                </div>

                <div className="radio-cards-vertical">
                    <label className={`radio-card-option ${localData.hasDeductions === 'yes' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="hasDeductions"
                            value="yes"
                            checked={localData.hasDeductions === 'yes'}
                            onChange={() => toggleDeductions('yes')}
                        />
                        <span className="radio-label-text">Ja, ich habe Abzüge</span>
                    </label>
                    
                    <label className={`radio-card-option ${localData.hasDeductions === 'no' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="hasDeductions"
                            value="no"
                            checked={localData.hasDeductions === 'no'}
                            onChange={() => toggleDeductions('no')}
                        />
                        <span className="radio-label-text">Nein, keine Abzüge</span>
                    </label>
                </div>
            </div>

            {}
            <AnimatePresence>
                {localData.hasDeductions === 'yes' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="info-box-alert" style={{
                            marginBottom: '25px', 
                            background: 'rgba(59, 130, 246, 0.1)', 
                            color: 'var(--accent-color)', 
                            borderColor: 'var(--accent-color)', 
                            display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', borderRadius: '8px'
                        }}>
                            <TrendingDown size={20} />
                            <span style={{fontWeight: '500'}}>Ihre Abzüge (bitte monatliche Beträge angeben)</span>
                        </div>

                        {}
                        <div className="deduction-card" style={{ marginBottom: '15px', padding: '20px', border: '1px solid var(--line-color)', borderRadius: '12px' }}>
                            <div style={{fontWeight: '600', marginBottom: '5px'}}>1. Steuern / Solidaritätszuschlag</div>
                            <div style={{fontSize: '0.85rem', opacity: 0.7, marginBottom: '15px'}}>Lohnsteuer, Kirchensteuer, Soli (siehe Gehaltsabrechnung).</div>
                            
                            <div className="grid-2-col">
                                <div className="input-group">
                                    <label className="input-label">BEZEICHNUNG (ART)</label>
                                    <input 
                                        type="text" 
                                        placeholder="z.B. Lohnsteuer laut Abrechnung"
                                        className="modern-input"
                                        value={localData.taxes?.description || ''}
                                        onChange={(e) => updateField('taxes', 'description', e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">BETRAG (€ MTL.)</label>
                                    <input 
                                        type="number" 
                                        placeholder="0,00"
                                        className="modern-input"
                                        value={localData.taxes?.amount || ''}
                                        onChange={(e) => updateField('taxes', 'amount', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {}
                        <div className="deduction-card" style={{ marginBottom: '15px', padding: '20px', border: '1px solid var(--line-color)', borderRadius: '12px' }}>
                            <div style={{fontWeight: '600', marginBottom: '5px'}}>2. Sozialversicherungsbeiträge</div>
                            <div style={{fontSize: '0.85rem', opacity: 0.7, marginBottom: '15px'}}>Gesetzliche Renten-, Kranken-, Pflege- und Arbeitslosenversicherung.</div>
                            
                            <div className="grid-2-col">
                                <div className="input-group">
                                    <label className="input-label">BEZEICHNUNG (ART)</label>
                                    <input 
                                        type="text" 
                                        placeholder="Pflichtbeiträge vom Lohn"
                                        className="modern-input"
                                        value={localData.socialSecurity?.description || ''}
                                        onChange={(e) => updateField('socialSecurity', 'description', e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">BETRAG (€ MTL.)</label>
                                    <input 
                                        type="number" 
                                        placeholder="0,00"
                                        className="modern-input"
                                        value={localData.socialSecurity?.amount || ''}
                                        onChange={(e) => updateField('socialSecurity', 'amount', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {}
                        <div className="deduction-card" style={{ marginBottom: '15px', padding: '20px', border: '1px solid var(--line-color)', borderRadius: '12px' }}>
                            <div style={{fontWeight: '600', marginBottom: '5px'}}>3. Sonstige Versicherungen</div>
                            <div style={{fontSize: '0.85rem', opacity: 0.7, marginBottom: '15px'}}>Privathaftpflicht, Hausrat, Unfall-, Lebensversicherung (nur angemessene).</div>
                            
                            <div className="grid-2-col">
                                <div className="input-group">
                                    <label className="input-label">BEZEICHNUNG (ART)</label>
                                    <input 
                                        type="text" 
                                        placeholder="z.B. Allianz Haftpflicht"
                                        className="modern-input"
                                        value={localData.otherInsurance?.description || ''}
                                        onChange={(e) => updateField('otherInsurance', 'description', e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">BETRAG (€ MTL.)</label>
                                    <input 
                                        type="number" 
                                        placeholder="0,00"
                                        className="modern-input"
                                        value={localData.otherInsurance?.amount || ''}
                                        onChange={(e) => updateField('otherInsurance', 'amount', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {}
                        <div className="deduction-card" style={{ marginBottom: '15px', padding: '20px', border: '1px solid var(--line-color)', borderRadius: '12px' }}>
                            <div style={{fontWeight: '600', marginBottom: '5px'}}>4. Fahrt zur Arbeit</div>
                            <div style={{fontSize: '0.85rem', opacity: 0.7, marginBottom: '15px'}}>Kosten für öffentliche Verkehrsmittel ODER einfache Entfernung in KM (bei PKW).</div>
                            
                            <div className="grid-2-col">
                                <div className="input-group">
                                    <label className="input-label">BEZEICHNUNG (ART)</label>
                                    <input 
                                        type="text" 
                                        placeholder='z.B. Monatskarte BVG oder "PKW"'
                                        className="modern-input"
                                        value={localData.commute?.description || ''}
                                        onChange={(e) => updateField('commute', 'description', e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">BETRAG (€) / KM</label>
                                    <input 
                                        type="text" 
                                        placeholder="€ oder km"
                                        className="modern-input"
                                        value={localData.commute?.amount || ''}
                                        onChange={(e) => updateField('commute', 'amount', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {}
                        <div className="deduction-card" style={{ marginBottom: '15px', padding: '20px', border: '1px solid var(--line-color)', borderRadius: '12px' }}>
                            <div style={{fontWeight: '600', marginBottom: '5px'}}>5. Sonstige Werbungskosten / Betriebsausgaben</div>
                            <div style={{fontSize: '0.85rem', opacity: 0.7, marginBottom: '15px'}}>Gewerkschaftsbeiträge, Arbeitskleidung, Fortbildungskosten.</div>
                            
                            <div className="grid-2-col">
                                <div className="input-group">
                                    <label className="input-label">BEZEICHNUNG (ART)</label>
                                    <input 
                                        type="text" 
                                        placeholder="z.B. ver.di Beitrag"
                                        className="modern-input"
                                        value={localData.otherWorkCosts?.description || ''}
                                        onChange={(e) => updateField('otherWorkCosts', 'description', e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">BETRAG (€ MTL.)</label>
                                    <input 
                                        type="number" 
                                        placeholder="0,00"
                                        className="modern-input"
                                        value={localData.otherWorkCosts?.amount || ''}
                                        onChange={(e) => updateField('otherWorkCosts', 'amount', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

            {}
            <div className="navigation-footer">
                <button className="btn-secondary-action" onClick={onBack}>Zurück</button>
                <button className="btn-primary-action" onClick={onNext} disabled={!isValid}>Weiter</button>
            </div>
        </div>
    );
};

export default SectionF;