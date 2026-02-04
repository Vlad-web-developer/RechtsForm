import { motion } from 'framer-motion';

const IncomeItem = ({ cat, itemData, onUpdate }) => {
    return (
        <div className={`income-card ${itemData?.has === 'yes' ? 'active' : ''}`}>
            <div className='income-header'>
                <span className='income-label'>{cat.label}</span>
                <div className='income-controls'>
                    <button
                        className={`btn-toggle ${itemData?.has === 'yes' ? 'selected-ja' : ''}`}
                        onClick={() => onUpdate('has', 'yes')}
                    >
                        Ja
                    </button>
                    <button
                        className={`btn-toggle ${itemData?.has === 'no' ? 'selected-nein' : ''}`}
                        onClick={() => onUpdate('has', 'no')}
                    >
                        Nein
                    </button>
                </div>
            </div>

            {itemData?.has === 'yes' && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className='income-input-wrapper'
                >
                    <div className='currency-input'>
                        <input
                            type='text'
                            placeholder='0,00'
                            className='brutto-input'
                            style={{ color: '#3B82F6' }}
                            value={itemData.brutto || ''}
                            onChange={e => onUpdate('brutto', e.target.value)}
                        />
                        <span className='currency-label'>€ Brutto</span>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default IncomeItem;