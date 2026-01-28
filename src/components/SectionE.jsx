import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../css/SectionE.css"

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
    { key: 'sonstige', label: 'Andere Einnahmen (z.B. Urlaubsgeld)', isOther: true }
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
    const currentItems = data[person].sonstige.items || [{ details: '', brutto: '' }];
    const newItems = [...currentItems];
    newItems[index] = { ...newItems[index], [field]: value };

    const newData = { ...data[person] };
    newData.sonstige = { ...newData.sonstige, items: newItems };
    onChange(person, newData);
  };

  const addOtherIncomeItem = (person) => {
    const currentItems = data[person].sonstige.items || [{ details: '', brutto: '' }];
    if (currentItems.length < 2) {
      const newItems = [...currentItems, { details: '', brutto: '' }];
      const newData = { ...data[person] };
      newData.sonstige = { ...newData.sonstige, items: newItems };
      onChange(person, newData);
    }
  };

  const removeOtherIncomeItem = (person, index) => {
    const currentItems = [...data[person].sonstige.items];
    currentItems.splice(index, 1);
    const newData = { ...data[person] };
    newData.sonstige = { ...newData.sonstige, items: currentItems };
    onChange(person, newData);
  };

  const handleTextareaChange = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleNext = () => {
    if (subStep === 0 && data.receivesSocialAssistanceSGBXII === 'yes') {
      setStep(11); 
    } else if (subStep === 0 && data.receivesSocialAssistanceSGBXII === 'no') {
      setSubStep(1); 
    } else if (subStep === 1) {
      setSubStep(2); 
    } else if (subStep === 2 && data.hasPartner === 'no') {
      onNext(); 
    } else if (subStep === 2 && data.hasPartner === 'yes') {
      setSubStep(3); 
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (subStep === 0) onBack();
    else setSubStep(subStep - 1);
  };

  const renderIncomeList = (personType) => {
    const allNo = incomeCategories.every(cat => data[personType]?.[cat.key]?.has === 'no');

    return (
      <div className="income-list">
        <p className="substep-instruction">
          Haben Sie Einnahmen aus folgenden Quellen? (Monatliche Bruttobeträge)
        </p>
        {incomeCategories.map((cat) => (
          <div key={cat.key} className={`income-card ${data[personType]?.[cat.key]?.has === 'yes' ? 'active' : ''}`}>
            <div className="income-header">
              <span className="income-label">{cat.label}</span>
              <div className="income-controls">
                <button 
                  className={`btn-toggle ${data[personType]?.[cat.key]?.has === 'yes' ? 'selected-ja' : ''}`}
                  onClick={() => updateIncome(personType, cat.key, 'has', 'yes')}
                >Ja</button>
                <button 
                  className={`btn-toggle ${data[personType]?.[cat.key]?.has === 'no' ? 'selected-nein' : ''}`}
                  onClick={() => updateIncome(personType, cat.key, 'has', 'no')}
                >Nein</button>
              </div>
            </div>

            {data[personType]?.[cat.key]?.has === 'yes' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="income-input-wrapper">
                {cat.isOther ? (
                  <div className="andere-einnahmen-box">
                    <div className="info-box-small" style={{ marginBottom: '15px', fontSize: '0.85rem', background: '#f0f9ff', padding: '10px', borderRadius: '8px', border: '1px solid #bae6fd', color: '#0369a1' }}>
                      <strong>Hinweis:</strong> Belege (z. B. Lohnbescheinigung, Steuerbescheid, Bewilligungsbescheid mit Berechnungsbogen) müssen in Kopie beigefügt werden.
                    </div>

                    {(data[personType].sonstige.items || [{ details: '', brutto: '' }]).map((item, index) => (
                      <div key={index} className="other-income-item" style={{ 
                          marginBottom: index === 0 && (data[personType].sonstige.items?.length > 1) ? '20px' : '0', 
                          paddingBottom: index === 0 && (data[personType].sonstige.items?.length > 1) ? '15px' : '0',
                          borderBottom: index === 0 && (data[personType].sonstige.items?.length > 1) ? '1px dashed #cbd5e1' : 'none'
                      }}>
                        <div className="mb-15">
                          <label className="input-label-small">
                            {index === 0 ? 'Art & Zeitraum (Eintrag 1)' : 'Art & Zeitraum (Eintrag 2)'}
                          </label>
                          <textarea 
                            rows="1"
                            placeholder="z.B. Weihnachtsgeld (jährlich), Steuererstattung (einmalig)" 
                            className="details-textarea"
                            value={item.details}
                            onChange={(e) => {
                              handleTextareaChange(e);
                              updateOtherIncomeItem(personType, index, 'details', e.target.value);
                            }}
                          />
                          <p className="income-hint">Geben Sie bitte Art, Bezugszeitraum u Höhe an.</p>
                        </div>
                        <div>
                          <label className="input-label-small">Betrag (Brutto)</label>
                          <div className="currency-input">
                            <input 
                              type="text" 
                              placeholder="0,00" 
                              className="brutto-input"
                              value={item.brutto}
                              onChange={(e) => updateOtherIncomeItem(personType, index, 'brutto', e.target.value)}
                            />
                            <span className="currency-label">€ Brutto</span>
                          </div>
                        </div>

                        {index === 1 && (
                          <button 
                            onClick={() => removeOtherIncomeItem(personType, index)}
                            style={{ 
                              marginTop: '10px', color: '#ef4444', background: 'none', border: 'none', 
                              cursor: 'pointer', fontSize: '0.9rem', padding: '5px 0', textDecoration: 'underline' 
                            }}
                          >
                            Eintrag entfernen
                          </button>
                        )}
                      </div>
                    ))}

                    {(!data[personType].sonstige.items || data[personType].sonstige.items.length < 2) && (
                      <button 
                        className="btn-secondary-action" 
                        style={{ width: '100%', marginTop: '15px', fontSize: '0.9rem', padding: '10px' }}
                        onClick={() => addOtherIncomeItem(personType)}
                      >
                        + Weiteren Eintrag hinzufügen
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="currency-input">
                    <input 
                      type="text" 
                      placeholder="0,00" 
                      className="brutto-input"
                      value={data[personType][cat.key].brutto}
                      onChange={(e) => updateIncome(personType, cat.key, 'brutto', e.target.value)}
                    />
                    <span className="currency-label">€ Brutto</span>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        ))}

        {allNo && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="income-card" 
            style={{ border: '1px solid #f87171', background: '#fef2f2', padding: '20px' }}
          >
            <div className="mb-15">
              <label className="input-label-small" style={{ color: '#991b1b', fontWeight: 'bold', fontSize: '1rem' }}>
                5. Sie haben alle Fragen zu Ihrem Einkommen mit „Nein“ beantwortet:
              </label>
              <p style={{ fontSize: '0.95rem', color: '#b91c1c', marginTop: '10px', lineHeight: '1.5' }}>
                Sie geben an, keine Einkünfte zu haben. Bitte erläutern Sie auf einem separaten Blatt, wie Sie Ihren Lebensunterhalt bestreiten.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#7f1d1d', marginTop: '10px', fontStyle: 'italic' }}>
                Hinweis: Dieses Dokument muss der Erklärung separat beigefügt werden.
              </p>
            </div>
          </motion.div>
        )}

        <div className="navigation-footer">
          <button className="btn-secondary-action" onClick={handleBack}>Zurück</button>
          <button className="btn-primary-action" onClick={handleNext}>Weiter</button>
        </div>
      </div>
    );
  };

  return (
    <div className="section-card">
      <h2 className="section-title">E. Bruttoeinnahmen</h2>
      <AnimatePresence mode="wait">
        {subStep === 0 && (
          <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="substep-container">
            <div className="info-box-alert">
              <div className="info-icon-container">💡</div>
              <div className="info-text-content">Wenn Sie <b>Ja</b> wählen, werden die Abschnitte <b>E bis J</b> automatisch übersprungen.</div>
            </div>
            <div className="substep-instruction">Beziehen Sie laufende Leistungen zum Lebensunterhalt nach dem SGB XII (Sozialhilfe)?</div>
            <div className="button-row-sgb">
              <button className={`sgb-btn-large ${data.receivesSocialAssistanceSGBXII === 'yes' ? 'active-ja' : ''}`} onClick={() => onChange('receivesSocialAssistanceSGBXII', 'yes')}>Ja, ich beziehe SGB XII</button>
              <button className={`sgb-btn-small ${data.receivesSocialAssistanceSGBXII === 'no' ? 'active-nein' : ''}`} onClick={() => onChange('receivesSocialAssistanceSGBXII', 'no')}>Nein</button>
            </div>
            <div className="navigation-footer">
              <button className="btn-secondary-action" onClick={handleBack}>Zurück</button>
              <button className="btn-primary-action" onClick={handleNext} disabled={data.receivesSocialAssistanceSGBXII === null}>{data.receivesSocialAssistanceSGBXII === 'yes' ? 'Direkt zu K' : 'Weiter'}</button>
            </div>
          </motion.div>
        )}

        {subStep === 1 && <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}><h3>Ihre Bruttoeinnahmen </h3>{renderIncomeList('self')}</motion.div>}
        {subStep === 2 && (
          <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="substep-instruction">Haben Sie einen Ehegatten / Lebenspartner?</div>
            <div className="button-row-sgb">
              <button className={`sgb-btn-large ${data.hasPartner === 'yes' ? 'active-ja' : ''}`} onClick={() => onChange('hasPartner', 'yes')}>Ja</button>
              <button className={`sgb-btn-small ${data.hasPartner === 'no' ? 'active-nein' : ''}`} onClick={() => onChange('hasPartner', 'no')}>Nein</button>
            </div>
            <div className="navigation-footer">
              <button className="btn-secondary-action" onClick={handleBack}>Zurück</button>
              <button className="btn-primary-action" onClick={handleNext} disabled={data.hasPartner === null}>Weiter</button>
            </div>
          </motion.div>
        )}
        {subStep === 3 && <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}><h3>Bruttoeinnahmen des Partners</h3>{renderIncomeList('partner')}</motion.div>}
      </AnimatePresence>
    </div>
  );
};

export default SectionE;