import '../css/ProgressBar.css'; 

const STEP_TITLES = {
  'A': 'Persönliches',
  'B': 'Versicherung',
  'C': 'Unterhalt',
  'D': 'Angehörige',
  'E': 'Einnahmen',
  'F': 'Abzüge',
  'G': 'Vermögen',
  'H': 'Wohnkosten',
  'I': 'Zahlungen',
  'J': 'Belastungen',
  'K': 'Abschluss'
};

const ProgressBar = ({ progress, steps, currentStep, onStepClick }) => {
  return (
    <div className="progress-container">
      <div className="progress-track"></div>
      <div 
        className="progress-fill" 
        style={{ width: `${progress}%` }}
      ></div>

      <div className="steps-container">
        {steps.map((step, index) => {
          const stepNumber = index + 1;

          const isActive = currentStep === stepNumber;

          const isCompleted = currentStep > stepNumber;

          let statusClass = '';
          if (isActive) statusClass = 'active';
          else if (isCompleted) statusClass = 'completed';

          return (
            <div 
              key={step.label} 
              className={`step-node ${statusClass}`}
              style={{ left: `${step.position}%` }}
              onClick={() => {
                if (isCompleted && onStepClick) {
                   onStepClick(stepNumber); 
                }
              }}
            >
              {step.label}

              <div className="step-tooltip">
                {STEP_TITLES[step.label] || step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;