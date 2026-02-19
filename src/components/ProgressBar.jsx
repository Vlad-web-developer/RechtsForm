import { motion } from 'framer-motion'
import '../css/ProgressBar.css'

const STEP_TITLES = {
    1: 'Persönliches',
    2: 'Versicherung',
    3: 'Unterhalt',
    4: 'Angehörige',
    5: 'Einnahmen',
    6: 'Abzüge',
    7: 'Vermögen',
    8: 'Wohnkosten',
    9: 'Zahlungen',
    10: 'Belastungen',
    11: 'Belege',      
    12: 'Abschluss',   
}

const STEP_LABELS = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
    8: 'H',
    9: 'I',
    10: 'J',
    11: 'L', 
    12: 'K', 
}

const ProgressBar = ({ progress, steps, currentStep, onStepClick }) => {
    const currentTitle = STEP_TITLES[currentStep] || ''
    const currentLabel = STEP_LABELS[currentStep] || ''
    
    
    const displayStep = currentStep > 12 ? 12 : currentStep
    const totalSteps = steps.length || 12

    const displayProgress =
        steps.length > 0
            ? steps[Math.min(Math.max(displayStep - 1, 0), steps.length - 1)]?.position || 0
            : (displayStep / totalSteps) * 100

    return (
        <div className='progress-bar-container'>
            {}
            <motion.div
                className='mobile-progress-card'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className='mobile-header'>
                    <div className='mobile-step-badge'>
                        <span className='badge-text'>
                            {displayStep}/{totalSteps}
                        </span>
                    </div>
                    <div className='mobile-title-col'>
                        <span className='mobile-step-label'>
                            {currentStep > 12 ? 'Fertig' : `Abschnitt ${currentLabel}`}
                        </span>
                        <span className='mobile-step-name'>
                            {currentStep > 12 ? 'Antrag erstellt' : currentTitle}
                        </span>
                    </div>
                </div>
                <div className='mobile-track-bg'>
                    <motion.div
                        className='mobile-track-fill'
                        initial={{ width: 0 }}
                        animate={{ width: `${displayProgress}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                </div>
            </motion.div>

            {}
            <motion.div
                className='desktop-glass-panel'
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className='desktop-track-container'>
                    {}
                    <div className='desktop-track-bg'></div>

                    {}
                    <motion.div
                        className='desktop-track-fill'
                        initial={{ width: 0 }}
                        animate={{ width: `${displayProgress}%` }}
                        transition={{ duration: 0.6, ease: 'circOut' }}
                    >
                        <div className='track-glow'></div>
                    </motion.div>

                    {}
                    <div className='desktop-steps-layer'>
                        {steps.map((step, index) => {
                            const stepNumber = index + 1
                            const isActive = currentStep === stepNumber
                            const isCompleted = currentStep > stepNumber

                            let statusClass = 'future'
                            if (isActive) statusClass = 'active'
                            if (isCompleted) statusClass = 'completed'

                            return (
                                <div
                                    key={step.label}
                                    className={`step-node-container ${statusClass}`}
                                    style={{ left: `${step.position}%` }}
                                    onClick={() => {
                                        if (isCompleted && onStepClick) {
                                            onStepClick(stepNumber)
                                        }
                                    }}
                                >
                                    {}
                                    {isActive && (
                                        <motion.div
                                            className='active-pulse-ring'
                                            initial={{ x: '-50%', y: '-50%', scale: 1, opacity: 1 }}
                                            animate={{ x: '-50%', y: '-50%', scale: 1.6, opacity: 0 }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: 'easeOut',
                                            }}
                                        />
                                    )}

                                    <motion.div
                                        className='step-circle'
                                        whileHover={isCompleted ? { scale: 1.15 } : {}}
                                        whileTap={isCompleted ? { scale: 0.95 } : {}}
                                        animate={{
                                            scale: isActive ? 1.1 : 1,
                                            backgroundColor: isActive
                                                ? '#3b82f6'
                                                : isCompleted
                                                    ? '#10b981'
                                                    : 'var(--card-bg)',
                                            borderColor: isActive
                                                ? '#3b82f6'
                                                : isCompleted
                                                    ? '#10b981'
                                                    : 'var(--border-color)',
                                        }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    >
                                        {isCompleted ? (
                                            <motion.svg
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.3 }}
                                                width='14'
                                                height='14'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                stroke='#fff'
                                                strokeWidth='3'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            >
                                                <polyline points='20 6 9 17 4 12'></polyline>
                                            </motion.svg>
                                        ) : (
                                            <span
                                                style={{
                                                    color: isActive || isCompleted ? '#fff' : 'inherit',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                {step.label}
                                            </span>
                                        )}
                                    </motion.div>

                                    {}
                                    <div className={`step-tooltip ${isActive ? 'visible' : ''}`}>
                                        {STEP_TITLES[stepNumber]}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default ProgressBar