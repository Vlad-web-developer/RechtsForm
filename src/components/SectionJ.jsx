import { motion, AnimatePresence } from 'framer-motion';
import "../css/SectionJ.css";

const SectionJ = ({ data, onChange, onBack, onNext }) => {

  const updateField = (field, value) => {
    onChange(field, value);
  };

  const updateItem = (index, field, value) => {
    const currentList = data.loads || [];
    const newItems = [...currentList];
    newItems[index] = { ...newItems[index], [field]: value };
    updateField('loads', newItems);
  };

  const addItem = () => {
    const currentList = data.loads || [];
    if (currentList.length >= 2) return; 
    const newItems = [...currentList, { description: '', amount: '' }];
    updateField('loads', newItems);
  };

  const removeItem = (index) => {
    const currentList = data.loads || [];
    const newItems = currentList.filter((_, i) => i !== index);
    updateField('loads', newItems);
  };

  return (
    <div className="section-card">
      <h2 className="section-title">J. Besondere Belastungen</h2>
      
      <div className="info-box-alert" style={{marginBottom: '25px', background: 'rgba(59, 130, 246, 0.1)', padding: '15px', borderRadius: '10px'}}>
        <p style={{margin: 0, fontSize: '0.9rem'}}>
          Haben Sie besondere Belastungen? 
          (z.B. Mehrausgaben für körperbehinderte Angehörige, Mehrbedarfe gemäß § 21 SGB II).
        </p>
      </div>

      <div className="toggle-container">
        <button 
          className={`btn-toggle ${data.hasSpecialLoads === 'yes' ? 'active-yes' : ''}`}
          onClick={() => updateField('hasSpecialLoads', 'yes')}
        >
          Ja
        </button>
        <button 
          className={`btn-toggle ${data.hasSpecialLoads === 'no' ? 'active-no' : ''}`}
          onClick={() => {
            updateField('hasSpecialLoads', 'no');
          }}
        >
          Nein
        </button>
      </div>

      <AnimatePresence>
        {data.hasSpecialLoads === 'yes' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {(data.loads || []).map((item, index) => (
              <div key={index} className="load-card">
                <div className="load-header">
                  <span>Eintrag {index + 1}</span>
                  {index > 0 && (
                    <button className="btn-remove" onClick={() => removeItem(index)}>
                      Entfernen
                    </button>
                  )}
                </div>

                <div className="form-grid-j">
                  <div>
                    <label className="input-label">Beschreibung (Art der Belastung)</label>
                    <textarea 
                      className="text-area-j"
                      placeholder="z.B. Mehrbedarf für Behinderung, teure Medikamente..."
                      value={item.description || ''}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="input-label">Ich zahle davon (€)</label>
                    <input 
                      type="text" className="std-input" placeholder="0,00"
                      value={item.amount || ''}
                      onChange={(e) => updateItem(index, 'amount', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            {(data.loads || []).length < 2 && (
              <button className="btn-add" onClick={addItem}>
                + Weiteren Eintrag hinzufügen
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="navigation-footer">
        <button className="btn-secondary-action" onClick={onBack}>Zurück</button>
        <button className="btn-primary-action" onClick={onNext}>Weiter zu Abschnitt K</button>
      </div>
    </div>
  );
};

export default SectionJ;