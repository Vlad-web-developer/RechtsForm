import React from 'react';
import { motion } from 'framer-motion';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, isValid, format } from 'date-fns';
import '../css/SectionD.css'; 
import '../css/Calendar.css'; 

const CustomInput = React.forwardRef(({ value, onClick, onChange, className, placeholder }, ref) => (
  <input 
      value={value}
      onClick={onClick}
      onChange={onChange}
      ref={ref}
      className={className}
      placeholder={placeholder}
  />
));

const SectionD = ({ data, onChange, onBack, onNext }) => {
  
  const handleMainOptionChange = (val) => {
    onChange('hasDependents', val);
    if (val === 'yes' && data.dependents.length === 0) {
      addDependent();
    } else if (val === 'no') {
      onChange('dependents', []);
    }
  };

  const addDependent = () => {
    if (data.dependents.length >= 5) return;
    const newPerson = {
      id: Date.now(),
      name: '',
      birthday: '',
      relationship: '',
      monthlyAmount: '',
      hasOwnIncome: null,
      incomeAmount: ''
    };
    onChange('dependents', [...data.dependents, newPerson]);
  };

  const removeDependent = (index) => {
    const newList = [...data.dependents];
    newList.splice(index, 1);
    onChange('dependents', newList);
    
    if (newList.length === 0) {
      onChange('hasDependents', 'no');
    }
  };

  const updateDependent = (index, field, value) => {
    const newList = [...data.dependents];
    newList[index] = { ...newList[index], [field]: value };
    onChange('dependents', newList);
  };

  const isStepValid = () => {
    if (!data.hasDependents) return false;
    if (data.hasDependents === 'no') return true;
    
    if (data.dependents.length === 0) return false;

    return data.dependents.every(person => {
      const basicValid = person.name && person.name.trim() !== '' &&
                         person.relationship && person.relationship.trim() !== '';
      
      const incomeValid = person.hasOwnIncome === 'yes' 
                          ? (person.incomeAmount && person.incomeAmount.trim() !== '')
                          : person.hasOwnIncome === 'no'; 

      return basicValid && (person.hasOwnIncome !== null) && incomeValid;
    });
  };

  const getValidDate = (dateString) => {
      if (!dateString) return null;
      const parsedDate = parse(dateString, 'dd.MM.yyyy', new Date());
      return isValid(parsedDate) ? parsedDate : null;
  };

  return (
    <div className="section-card">
      <h2 className="section-title">D. Angehörige (Unterhalt)</h2>

      <div className="input-group mb-25">
        
        <div className="section-d-question-container">
          <span className="question-text-d">
            Gewähren Sie Angehörigen Bar- oder Naturalunterhalt?
          </span>
          <span className="subtext-d">
            (z. B. Kinder, Ehegatte, Eltern)
          </span>
        </div>
        
        <div className="button-group mt-12">
          <button 
            className={`btn-secondary ${data.hasDependents === 'yes' ? 'active-selection' : ''}`}
            onClick={() => handleMainOptionChange('yes')}
          >
            Ja
          </button>
          <button 
            className={`btn-secondary ${data.hasDependents === 'no' ? 'active-selection' : ''}`}
            onClick={() => handleMainOptionChange('no')}
          >
            Nein
          </button>
        </div>
      </div>

      {data.hasDependents === 'yes' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="mt-20"
        >
          {data.dependents.map((person, index) => (
            <div key={person.id} className="dependent-card">
              <div className="dependent-title">
                Person {index + 1}
                {index > 0 && (
                  <button className="remove-btn" onClick={() => removeDependent(index)}>
                    🗑️ Entfernen
                  </button>
                )}
              </div>

              <div className="dependent-grid">
                <div className="input-group">
                  <label>Name, Vorname, Anschrift <span style={{color:'red'}}>*</span></label>
                  <input 
                    type="text"
                    placeholder="Mustermann, Max"
                    value={person.name}
                    onChange={(e) => updateDependent(index, 'name', e.target.value)}
                  />
                </div>

                <div className="input-group">
                   <label>Geburtsdatum</label>
                   <div className="datepicker-input-container">
                      <DatePicker
                          selected={getValidDate(person.birthday)}
                          onChange={(date) => updateDependent(index, 'birthday', date ? format(date, 'dd.MM.yyyy') : '')}
                          dateFormat="dd.MM.yyyy"
                          locale="de"
                          showYearDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={100}
                          maxDate={new Date()}
                          placeholderText="TT.MM.JJJJ"
                          className="custom-datepicker"
                          customInput={<CustomInput />}
                      />
                   </div>
                </div>

                <div className="input-group">
                  <label>Verhältnis (z.B. Kind) <span style={{color:'red'}}>*</span></label>
                  <input 
                    type="text"
                    placeholder="Kind, Ehegatte..."
                    value={person.relationship}
                    onChange={(e) => updateDependent(index, 'relationship', e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Monatsbetrag (falls Zahlung)</label>
                  <input 
                    type="text"
                    placeholder="€ monatlich"
                    value={person.monthlyAmount}
                    onChange={(e) => updateDependent(index, 'monthlyAmount', e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginTop: '15px', borderTop: '1px solid var(--line-color)', paddingTop: '10px' }}>
                <label style={{display:'block', marginBottom:'8px'}}>
                  Hat diese Person eigene Einnahmen? <span style={{color:'red'}}>*</span>
                </label>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div className="button-group" style={{ margin: 0, width: 'auto' }}>
                    <button 
                      className={`btn-secondary ${person.hasOwnIncome === 'yes' ? 'active-selection' : ''}`}
                      onClick={() => updateDependent(index, 'hasOwnIncome', 'yes')}
                      style={{ padding: '5px 15px', fontSize: '0.85rem' }}
                    >
                      Ja
                    </button>
                    <button 
                      className={`btn-secondary ${person.hasOwnIncome === 'no' ? 'active-selection' : ''}`}
                      onClick={() => updateDependent(index, 'hasOwnIncome', 'no')}
                      style={{ padding: '5px 15px', fontSize: '0.85rem' }}
                    >
                      Nein
                    </button>
                  </div>

                  {person.hasOwnIncome === 'yes' && (
                    <input 
                      type="text"
                      placeholder="Betrag (netto) €"
                      style={{ width: '140px', padding: '8px' }}
                      value={person.incomeAmount}
                      onChange={(e) => updateDependent(index, 'incomeAmount', e.target.value)}
                    />
                  )}
                </div>
              </div>

            </div>
          ))}

          {data.dependents.length >= 5 && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic', marginTop: '10px', textAlign: 'center' }}>
              Hinweis: Es können maximal 5 Personen eingetragen werden.
            </p>
          )}

          {data.dependents.length < 5 && (
            <button className="add-btn" onClick={addDependent}>
              + Weitere Person hinzufügen
            </button>
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

export default SectionD;