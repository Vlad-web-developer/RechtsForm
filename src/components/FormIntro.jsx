import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FormIntro = ({ onNext }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="section-card">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">
          Erklärung über die persönlichen und wirtschaftlichen Verhältnisse
        </h2>
        
        <div style={{ 
            backgroundColor: '#fffbeb', 
            border: '1px solid #fcd34d', 
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '25px',
            color: '#92400e' 
        }}>
            <h3 style={{ marginTop: 0, fontSize: '1.1rem', marginBottom: '10px' }}>
                ⚠️ Wichtige Hinweise zur Nutzung
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '10px' }}>
                Diese App ist eine <strong>reine Ausfüllhilfe</strong>: Sie überträgt Ihre Angaben lediglich in das Formular, ohne diese inhaltlich zu prüfen. Die Verantwortung für die Richtigkeit und Vollständigkeit liegt allein bei Ihnen; bitte kontrollieren Sie das fertige PDF daher vor der Einreichung sorgfältig.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                Die App ersetzt nicht Ihre Unterschrift – Sie müssen das Dokument am Ende <strong>selbst unterschreiben</strong>. Beachten Sie dazu bitte unbedingt den rechtlichen Hinweis zur Wahrheitspflicht direkt beim Unterschriftsfeld.
            </p>
        </div>

        {/* Чекбокс согласия */}
        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <input 
                type="checkbox" 
                id="intro-consent" 
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                style={{ 
                    marginTop: '4px', 
                    width: '18px', 
                    height: '18px', 
                    cursor: 'pointer' 
                }}
            />
            <label htmlFor="intro-consent" style={{ fontSize: '1rem', cursor: 'pointer', lineHeight: '1.4', color: 'var(--text-primary)' }}>
                Ich habe die Hinweise gelesen und verstanden.
            </label>
        </div>

        <div style={{ marginBottom: '20px', color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.9rem' }}>
          <p>
             Hinweis: Die Angaben zum Gericht werden vom Gericht ausgefüllt und müssen von Ihnen nicht eingetragen werden.
          </p>
        </div>

        {/* Кнопка активна только если стоит галочка */}
        <button 
            className="btn-primary" 
            onClick={onNext}
            disabled={!isChecked}
            style={{ 
                opacity: isChecked ? 1 : 0.5, 
                cursor: isChecked ? 'pointer' : 'not-allowed',
                width: '100%' 
            }}
        >
          Beginnen Sie mit dem Ausfüllen
        </button>
      </motion.div>
    </div>
  );
};

export default FormIntro;