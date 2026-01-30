import { motion, AnimatePresence } from 'framer-motion';
import "../css/SectionI.css";

const SectionI = ({ data, onChange, onBack, onNext }) => {

  const updateField = (field, value) => {
    onChange(field, value);
  };

  const updateItem = (index, field, value) => {
    const currentList = data.obligations || [];
    const newItems = [...currentList];
    newItems[index] = { ...newItems[index], [field]: value };
    updateField('obligations', newItems);
  };

  const addItem = () => {
    const currentList = data.obligations || [];
    if (currentList.length >= 3) return; 
    
    const newItems = [
      ...currentList, 
      { description: '', remainingDebt: '', monthlyPayment: '', ownShare: '' }
    ];
    updateField('obligations', newItems);
  };

  const removeItem = (index) => {
    const currentList = data.obligations || [];
    const newItems = currentList.filter((_, i) => i !== index);
    updateField('obligations', newItems);
  };

  return (
    <div className="section-card">
      <h2 className="section-title">I. Sonstige Zahlungsverpflichtungen</h2>
      
      <div className="info-box-alert" style={{marginBottom: '25px', background: 'rgba(59, 130, 246, 0.1)', padding: '15px', borderRadius: '10px'}}>
        <p style={{margin: 0, fontSize: '0.9rem'}}>
          Haben Sie sonstige Zahlungsverpflichtungen? (z.B. Ratenkredite, Unterhaltszahlungen, offene Rechnungen).
          <br/><strong>Bitte geben Sie hier keine Versicherungen oder Wohnkosten an (diese gehören in Abschnitt G oder H).</strong>
        </p>
      </div>

      <div className="toggle-container">
        <button 
          className={`btn-toggle ${data.hasObligations === 'yes' ? 'active-yes' : ''}`}
          onClick={() => updateField('hasObligations', 'yes')}
        >
          Ja
        </button>
        <button 
          className={`btn-toggle ${data.hasObligations === 'no' ? 'active-no' : ''}`}
          onClick={() => {
            updateField('hasObligations', 'no');
          }}
        >
          Nein
        </button>
      </div>

      <AnimatePresence>
        {data.hasObligations === 'yes' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {(data.obligations || []).map((item, index) => (
              <div key={index} className="obligation-card">
                <div className="obligation-header">
                  <span>Eintrag {index + 1}</span>
                  {index > 0 && (
                    <button className="btn-remove" onClick={() => removeItem(index)}>
                      Entfernen
                    </button>
                  )}
                </div>

                <div className="form-grid-i">
                  <div>
                    <label className="input-label">Beschreibung (Gläubiger, Grund, von wann bis wann)</label>
                    <textarea 
                      className="text-area-i"
                      placeholder="z.B. Ratenkredit MediaMarkt, seit 01.2023 bis 01.2025"
                      value={item.description || ''}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                    />
                  </div>
                  
                  <div className="money-row">
                    <div>
                      <label className="input-label">Restschuld (€)</label>
                      <input 
                        type="text" className="std-input" placeholder="0,00"
                        value={item.remainingDebt || ''}
                        onChange={(e) => updateItem(index, 'remainingDebt', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="input-label">Rate mtl. (€)</label>
                      <input 
                        type="text" className="std-input" placeholder="0,00"
                        value={item.monthlyPayment || ''}
                        onChange={(e) => updateItem(index, 'monthlyPayment', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="input-label">Ich zahle (€)</label>
                      <input 
                        type="text" className="std-input" placeholder="Anteil"
                        value={item.ownShare || ''}
                        onChange={(e) => updateItem(index, 'ownShare', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {(data.obligations || []).length < 3 && (
              <button className="btn-add" onClick={addItem}>
                + Weiteren Eintrag hinzufügen
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="navigation-footer">
        <button className="btn-secondary-action" onClick={onBack}>Zurück</button>
        <button className="btn-primary-action" onClick={onNext}>Weiter zu Abschnitt J</button>
      </div>
    </div>
  );
};

export default SectionI;