import React from 'react';

const NumberInput = ({ value, onChange, placeholder, min = 0, max, className }) => {
    
    
    const handleChange = (e) => {
        const val = e.target.value;
        
        if (val === '' || /^\d+$/.test(val)) {
            onChange(val);
        }
    };

    
    const handleDecrement = () => {
        let currentVal = parseInt(value || 0, 10);
        if (isNaN(currentVal)) currentVal = 0;
        
        if (currentVal > min) {
            onChange(String(currentVal - 1));
        }
    };

    
    const handleIncrement = () => {
        let currentVal = parseInt(value || 0, 10);
        if (isNaN(currentVal)) currentVal = 0;

        if (!max || currentVal < max) {
            onChange(String(currentVal + 1));
        }
    };

    return (
        <div className="number-input-wrapper">
            <button 
                type="button" 
                className="spin-btn minus" 
                onClick={handleDecrement}
                tabIndex="-1" 
            >
                −
            </button>
            
            <input
                type="text" 
                inputMode="numeric"
                pattern="[0-9]*"
                className={`modern-input with-spinners ${className || ''}`}
                placeholder={placeholder}
                value={value || ''}
                onChange={handleChange}
            />

            <button 
                type="button" 
                className="spin-btn plus" 
                onClick={handleIncrement}
                tabIndex="-1"
            >
                +
            </button>
        </div>
    );
};

export default NumberInput;