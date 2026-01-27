import React from 'react';
import { motion } from 'framer-motion';

const FormIntro = ({ onNext }) => {
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
        
        <div style={{ marginBottom: '30px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <p>
            Bitte füllen Sie dieses Formular wahrheitsgemäß aus, um Prozess- oder Verfahrenskostenhilfe zu beantragen.
          </p>
          <p style={{ marginTop: '15px', fontWeight: '500', color: 'var(--accent-color)' }}>
            Hinweis: Die Angaben zum Gericht werden vom Gericht ausgefüllt und müssen von Ihnen nicht eingetragen werden.
          </p>
        </div>

        <button className="btn-primary" onClick={onNext}>
          Beginnen Sie mit dem Ausfüllen
        </button>
      </motion.div>
    </div>
  );
};

export default FormIntro;