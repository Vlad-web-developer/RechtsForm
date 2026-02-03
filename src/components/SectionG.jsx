import React from 'react';
import { motion } from 'framer-motion';
import '../css/SectionG.css'; 

const SectionG = ({ data, onChange, onBack, onNext }) => {
    const categories = [
        {
            key: 'bankAccounts',
            label: '1. Bankkonten',
            desc: 'Girokonten, Sparkonten, Festgeld, PayPal, etc. (auch Gemeinschaftskonten).',
            placeholderDesc: 'z.B. Girokonto Sparkasse (IBAN...), Sparkonto Volksbank',
            placeholderVal: 'Kontostand in €',
        },
        {
            key: 'realEstate',
            label: '2. Grundeigentum',
            desc: 'Haus, Eigentumswohnung, Grundstück, Erbbaurecht (Größe, Anschrift).',
            placeholderDesc: 'z.B. Eigentumswohnung, Musterstraße 1, 12345 Berlin, 60qm, Alleineigentum',
            placeholderVal: 'Verkehrswert in €',
        },
        {
            key: 'vehicles',
            label: '3. Kraftfahrzeuge',
            desc: 'PKW, Motorrad (Marke, Typ, Baujahr, KM-Stand).',
            placeholderDesc: 'z.B. VW Golf VII, Bj. 2018, 80.000km, Zeitwert geschätzt',
            placeholderVal: 'Verkehrswert in €',
        },
        {
            key: 'cash',
            label: '4. Bargeld / Wertgegenstände',
            desc: 'Bargeld, Schmuck, Gold, Antiquitäten, teure Elektronik.',
            placeholderDesc: 'z.B. Bargeldbestand zuhause, Goldmünzen Sammlung',
            placeholderVal: 'Gesamtwert in €',
        },
        {
            key: 'lifeInsurance',
            label: '5. Lebens- oder Rentenversicherungen',
            desc: 'Kapitallebensversicherungen, Private Rentenversicherungen (Rückkaufswert angeben).',
            placeholderDesc: 'z.B. Allianz Lebensversicherung Nr. 123456',
            placeholderVal: 'Rückkaufswert in €',
        },
        {
            key: 'otherAssets',
            label: '6. Sonstige Vermögenswerte',
            desc: 'Bausparverträge, Aktien, Fonds, Krypto, Forderungen gegen Dritte.',
            placeholderDesc: 'z.B. LBS Bausparvertrag, ETF-Depot TradeRepublic',
            placeholderVal: 'Aktueller Wert in €',
        },
    ];

    const handleToggle = (key, status) => {
        const currentItem = data[key] || { has: null, description: '', value: '' };
        let newItem;
        if (status === 'no') {
            newItem = { has: 'no', description: '', value: '' };
        } else {
            newItem = { ...currentItem, has: 'yes' };
        }
        onChange(key, newItem);
    };

    const handleChange = (key, field, value) => {
        const currentItem = data[key] || { has: 'yes', description: '', value: '' };
        const newItem = { ...currentItem, [field]: value };
        onChange(key, newItem);
    };
    
    const isStepValid = () => {
        return categories.every(cat => {
            const item = data[cat.key];
            if (item && item.has === 'yes') {
                return (
                    item.description &&
                    item.description.trim() !== '' &&
                    item.value &&
                    item.value.trim() !== ''
                );
            }
            return true;
        });
    };

    return (
        <div className='section-card'>
            <h2 className='section-title'>G. Vermögenswerte</h2>

            <div className='info-box-alert' style={{ marginBottom: '25px' }}>
                <div className='info-text-content'>
                    <h4 style={{ margin: '0 0 5px 0' }}>💡 Ihr Vermögen</h4>
                    <p style={{ margin: 0 }}>
                        Verfügen Sie oder Ihr Ehegatte/Partner allein oder gemeinsam über
                        folgende Vermögenswerte?
                    </p>
                </div>
            </div>

            <div className='asset-list'>
                {categories.map(cat => {
                    const itemData = data[cat.key] || {
                        has: null,
                        description: '',
                        value: '',
                    };

                    return (
                        <motion.div
                            key={cat.key}
                            className='asset-card'
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className='asset-header'>
                                <strong>{cat.label}</strong>
                                <p>{cat.desc}</p>
                            </div>

                            <div className='asset-controls'>
                                {}
                                <button
                                    className={`btn-toggle ${itemData.has === 'yes' ? 'active-ja' : ''}`}
                                    onClick={() => handleToggle(cat.key, 'yes')}
                                >
                                    Ja
                                </button>
                                <button
                                    className={`btn-toggle ${itemData.has === 'no' ? 'active-nein' : ''}`}
                                    onClick={() => handleToggle(cat.key, 'no')}
                                >
                                    Nein
                                </button>
                            </div>

                            {itemData.has === 'yes' && (
                                <div className='form-grid-assets'>
                                    <div>
                                        <label className='input-label-small'>
                                            Beschreibung / Details{' '}
                                            <span style={{ color: '#ef4444' }}>*</span>
                                        </label>
                                        <textarea
                                            className='modern-input'
                                            rows="2"
                                            placeholder={cat.placeholderDesc}
                                            value={itemData.description || ''}
                                            onChange={e => handleChange(cat.key, 'description', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className='input-label-small'>
                                            Wert in € <span style={{ color: '#ef4444' }}>*</span>
                                        </label>
                                        <input
                                            type='text' 
                                            inputMode='decimal'
                                            className='modern-input money-input' 
                                            placeholder={cat.placeholderVal}
                                            value={itemData.value || ''}
                                            onChange={e => handleChange(cat.key, 'value', e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

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
                        cursor: isStepValid() ? 'pointer' : 'not-allowed',
                        background: isStepValid() ? 'var(--accent-color)' : '#94a3b8' 
                    }}
                >
                    Weiter zu Abschnitt H
                </button>
            </div>
        </div>
    );
};

export default SectionG;