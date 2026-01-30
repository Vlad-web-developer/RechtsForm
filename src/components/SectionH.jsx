import { motion, AnimatePresence } from 'framer-motion';
import "../css/SectionH.css";

const SectionH = ({ data, onChange, onBack, onNext }) => {

  const updateField = (field, value) => {
    onChange(field, value);
  };

  const updateLoan = (index, nestedField, value) => {
    const currentLoans = data.loans || [
      { remainingDebt: '', monthlyPayment: '' },
      { remainingDebt: '', monthlyPayment: '' }
    ];
    
    const newLoans = [...currentLoans];
    newLoans[index] = { ...newLoans[index], [nestedField]: value };
    
    onChange('loans', newLoans);
  };

  return (
    <div className="section-card">
      <h2 className="section-title">H. Wohnkosten</h2>

      <div className="info-box-alert" style={{marginBottom: '25px'}}>
        <div className="info-icon-container">ℹ️</div>
        <div className="info-text-content">
          <h4>Wohnsituation</h4>
          <p>
            Bitte füllen Sie zunächst die allgemeinen Angaben aus und wählen Sie dann, 
            ob Sie zur <strong>Miete</strong> wohnen oder im <strong>Eigenheim</strong>.
          </p>
        </div>
      </div>

      <h3 className="section-subtitle">1. Allgemeine Angaben</h3>
      <div className="general-grid">
        <div className="input-group">
          <label className="input-label">Gesamtgröße (m²)</label>
          <input 
            type="number" 
            className="std-input" 
            placeholder="z.B. 65"
            value={data.livingSpace || ''} 
            onChange={(e) => updateField('livingSpace', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Zimmeranzahl</label>
          <input 
            type="number" 
            className="std-input" 
            placeholder="z.B. 3"
            value={data.numberOfRooms || ''} 
            onChange={(e) => updateField('numberOfRooms', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Personen im Haushalt</label>
          <input 
            type="number" 
            className="std-input" 
            placeholder="z.B. 2"
            value={data.totalPeople || ''} 
            onChange={(e) => updateField('totalPeople', e.target.value)}
          />
        </div>
      </div>

      <h3 className="section-subtitle">2. Ihre Situation</h3>
      <div className="housing-selector">
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className={`type-card ${data.housingType === 'tenant' ? 'active' : ''}`}
          onClick={() => updateField('housingType', 'tenant')}
        >
          <span className="type-icon">🏠</span>
          <span>Ich bin Mieter</span>
          <div style={{fontSize: '0.8rem', marginTop: '5px', fontWeight: '400'}}>
            (Miete)
          </div>
        </motion.div>

        <motion.div 
          whileTap={{ scale: 0.98 }}
          className={`type-card ${data.housingType === 'owner' ? 'active' : ''}`}
          onClick={() => updateField('housingType', 'owner')}
        >
          <span className="type-icon">🏡</span>
          <span>Ich bin Eigentümer</span>
          <div style={{fontSize: '0.8rem', marginTop: '5px', fontWeight: '400'}}>
            (Eigenheim / Erbbaurecht)
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        
        {data.housingType === 'tenant' && (
          <motion.div
            key="tenant"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="section-subtitle">Kosten als Mieter (in €)</h3>
            <div className="costs-grid">
              <div className="input-group">
                <label className="input-label">Miete (Kalt)</label>
                <input 
                  type="text" className="std-input" placeholder="0,00"
                  value={data.rentCold || ''} 
                  onChange={(e) => updateField('rentCold', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Heizungskosten</label>
                <input 
                  type="text" className="std-input" placeholder="0,00"
                  value={data.heatingCosts || ''} 
                  onChange={(e) => updateField('heatingCosts', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Nebenkosten (Übrige)</label>
                <input 
                  type="text" className="std-input" placeholder="0,00"
                  value={data.otherCosts || ''} 
                  onChange={(e) => updateField('otherCosts', e.target.value)}
                />
              </div>

              <div className="desktop-spacer" style={{display: 'none'}}></div> 

              <div className="input-group">
                <label className="input-label" style={{color: 'var(--accent-color)'}}>Gesamtbetrag</label>
                <input 
                  type="text" className="std-input" placeholder="Summe"
                  style={{fontWeight: 'bold', borderColor: 'var(--accent-color)'}}
                  value={data.totalRent || ''} 
                  onChange={(e) => updateField('totalRent', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Ich allein zahle davon:</label>
                <input 
                  type="text" className="std-input" placeholder="Ihr Anteil"
                  value={data.ownShareRent || ''} 
                  onChange={(e) => updateField('ownShareRent', e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        )}

        {data.housingType === 'owner' && (
          <motion.div
            key="owner"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="section-subtitle">Kosten als Eigentümer (in €)</h3>
            <div className="costs-grid">
              <div className="input-group">
                <label className="input-label">Zinsen & Tilgung</label>
                <input 
                  type="text" className="std-input" placeholder="Rate an Bank"
                  value={data.interestRepayment || ''} 
                  onChange={(e) => updateField('interestRepayment', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Heizungskosten</label>
                <input 
                  type="text" className="std-input" placeholder="0,00"
                  value={data.heatingCostsOwner || ''} 
                  onChange={(e) => updateField('heatingCostsOwner', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Nebenkosten (Übrige)</label>
                <input 
                  type="text" className="std-input" placeholder="Wasser, Müll, Grundsteuer..."
                  value={data.otherCostsOwner || ''} 
                  onChange={(e) => updateField('otherCostsOwner', e.target.value)}
                />
              </div>

              <div className="desktop-spacer" style={{display: 'none'}}></div> 

              <div className="input-group">
                <label className="input-label" style={{color: 'var(--accent-color)'}}>Gesamtbetrag</label>
                <input 
                  type="text" className="std-input" placeholder="Summe"
                  style={{fontWeight: 'bold', borderColor: 'var(--accent-color)'}}
                  value={data.totalCostOwner || ''} 
                  onChange={(e) => updateField('totalCostOwner', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Ich allein zahle davon:</label>
                <input 
                  type="text" className="std-input" placeholder="Ihr Anteil"
                  value={data.ownShareOwner || ''} 
                  onChange={(e) => updateField('ownShareOwner', e.target.value)}
                />
              </div>
            </div>

            <div className="loan-section">
              <h4 style={{margin: '0 0 15px 0', fontSize: '1rem', color: 'var(--text-primary)'}}>
                Belastungen aus Fremdmitteln (Kredite)
              </h4>
              
              <div className="input-group" style={{marginBottom: '15px'}}>
                <label className="input-label">Details (Datum, Bank, Laufzeit)</label>
                <textarea 
                  className="loan-details-area"
                  placeholder="z.B. Darlehensvertrag vom 01.01.2020 bei Sparkasse..."
                  value={data.loanDetails || ''} 
                  onChange={(e) => updateField('loanDetails', e.target.value)}
                />
              </div>

              <div className="loan-rows-container">
                <div className="loan-row" style={{border: 'none', paddingBottom: 0, marginBottom: 5}}>
                   <label className="input-label">Restschuld (in €)</label>
                   <label className="input-label">Zinsen & Tilgung (mtl.)</label>
                </div>

                {[0, 1].map((idx) => {
                  const loanItem = (data.loans && data.loans[idx]) ? data.loans[idx] : { remainingDebt: '', monthlyPayment: '' };
                  
                  return (
                    <div key={idx} className="loan-row">
                      <input 
                        type="text" 
                        className="std-input" 
                        placeholder="Restschuld"
                        value={loanItem.remainingDebt || ''}
                        onChange={(e) => updateLoan(idx, 'remainingDebt', e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="std-input" 
                        placeholder="Monatliche Rate"
                        value={loanItem.monthlyPayment || ''}
                        onChange={(e) => updateLoan(idx, 'monthlyPayment', e.target.value)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      <div className="navigation-footer">
        <button className="btn-secondary-action" onClick={onBack}>Zurück</button>
        <button className="btn-primary-action" onClick={onNext}>Weiter zu Abschnitt I</button>
      </div>
    </div>
  );
};

export default SectionH;