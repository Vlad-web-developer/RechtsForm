import { motion } from 'framer-motion';
import '../css/SectionB.css';

const SectionB = ({ data, onChange, onBack, onNext }) => {
  
  const handleOptionChange = (field, value) => {
    onChange(field, value);
    if (field === 'hasInsurance' && value === 'yes') {
      onChange('hasPotentialInsurance', null);
      onChange('potentialInsuranceDetails', '');
    }
  };

  const isStepValid = () => {
    if (!data.hasInsurance) return false; 

    if (data.hasInsurance === 'yes') {
      return data.insuranceDetails && data.insuranceDetails.trim().length > 0;
    }

    if (data.hasInsurance === 'no') {
      if (!data.hasPotentialInsurance) return false; 

      if (data.hasPotentialInsurance === 'yes') {
        return data.potentialInsuranceDetails && data.potentialInsuranceDetails.trim().length > 0;
      }
      
      return true;
    }

    return false;
  };

  return (
    <div className="section-card">
      <h2 className="section-title">B. Rechtsschutzversicherung</h2>

      <div className="input-group mb-25">
        <label className="label-block">
          <span>
            1. Trägt eine Rechtsschutzversicherung oder eine andere Stelle (z.B. Gewerkschaft, Mieterverein) die Kosten?
          </span>
        </label>
        
        <div className="button-group mt-12" style={{ gap: '10px' }}>
          <button 
            className={`btn-secondary ${data.hasInsurance === 'yes' ? 'active-selection' : ''}`}
            onClick={() => handleOptionChange('hasInsurance', 'yes')}
          >
            Ja
          </button>
          <button 
            className={`btn-secondary ${data.hasInsurance === 'no' ? 'active-selection' : ''}`}
            onClick={() => handleOptionChange('hasInsurance', 'no')}
          >
            Nein
          </button>
        </div>

        {data.hasInsurance === 'yes' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-20"
          >
            <div className="warning-box">
              <div className="info-icon">⚠️</div>
              <div className="info-text">
                <b>Hinweis aus dem Formular:</b><br/>
                Wenn die Kosten in voller Höhe von einer Versicherung oder anderen Stelle/Person getragen werden, ist die Bewilligung von Prozess- oder Verfahrenskostenhilfe <u>nicht möglich</u> und damit die Beantwortung der weiteren Fragen nicht erforderlich.
              </div>
            </div>

            <label className="field-label">
              In welcher Höhe? / Wer trägt die Kosten? <span style={{color: 'red'}}>*</span>
            </label>
            <textarea 
              placeholder="z.B. ARAG Rechtsschutz, übernimmt 50% der Kosten..."
              value={data.insuranceDetails}
              onChange={(e) => onChange('insuranceDetails', e.target.value)}
              rows={2}
              style={!data.insuranceDetails ? { borderColor: '#e2e8f0' } : {}}
            />
          </motion.div>
        )}
      </div>

      {data.hasInsurance !== 'yes' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="input-group"
        >
          <div className="divider-line"></div>
          
          <label className="label-block">
            <span>
              2. Besteht eine Rechtsschutzversicherung oder Mitgliedschaft, die die Kosten tragen <b>könnte</b>?
            </span>
          </label>
          
          <div className="button-group mt-12" style={{ gap: '10px' }}>
            <button 
              className={`btn-secondary ${data.hasPotentialInsurance === 'yes' ? 'active-selection' : ''}`}
              onClick={() => onChange('hasPotentialInsurance', 'yes')}
            >
              Ja
            </button>
            <button 
              className={`btn-secondary ${data.hasPotentialInsurance === 'no' ? 'active-selection' : ''}`}
              onClick={() => onChange('hasPotentialInsurance', 'no')}
            >
              Nein
            </button>
          </div>

          {data.hasPotentialInsurance === 'yes' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-15"
            >
               <label className="field-label">
                 Bezeichnung der Versicherung / des Vereins / der Organisation <span style={{color: 'red'}}>*</span>
               </label>
               
               <p className="hint-text">
                 Klären Sie möglichst vorab, ob die Kosten getragen werden. Bereits vorhandene Belege über eine (Teil-)Ablehnung seitens der Versicherung/des Vereins/der Organisation fügen Sie dem Antrag bei.
               </p>

               <textarea 
                 placeholder="Name der Versicherung..."
                 value={data.potentialInsuranceDetails}
                 onChange={(e) => onChange('potentialInsuranceDetails', e.target.value)}
                 rows={2}
               />
            </motion.div>
          )}
        </motion.div>
      )}

      <div className="button-group mt-40">
        <button className="btn-secondary" onClick={onBack}>Zurück</button>
        
        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={!isStepValid()}
          title={!isStepValid() ? "Bitte füllen Sie alle Pflichtfelder aus" : ""}
        >
          Weiter
        </button>
      </div>
    </div>
  );
};

export default SectionB;