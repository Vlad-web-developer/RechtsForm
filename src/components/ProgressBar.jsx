import { motion } from 'framer-motion';
import '../css/ProgressBar.css';

const ProgressBar = ({ progress, steps }) => {
    return (
        <div className="timeline-wrapper">
            <div className="timeline-track">
                
                <motion.div 
                    className="timeline-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                    <div className="timeline-indicator">
                        <span className="indicator-text">{progress}%</span>
                        <div className="indicator-line"></div>
                    </div>
                </motion.div>

                {steps.map((step, index) => {
                    const position = step.position;
                    const isCompleted = progress >= position;

                    return (
                        <div 
                            key={index} 
                            className={`timeline-node ${isCompleted ? 'completed' : ''}`}
                            style={{ left: `${position}%` }}
                        >
                            <div className="node-circle"></div>
                            <span className="node-label">{step.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressBar;