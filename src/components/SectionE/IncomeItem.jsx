import { motion, AnimatePresence } from 'framer-motion';

const IncomeItem = ({ cat, itemData, onUpdate }) => {
    return (
        <div className={`income-card ${itemData?.has === 'yes' ? 'active' : ''}`}>
            <div className='income-header' style={{ display: 'block' }}>
                <div className='income-label' style={{ marginBottom: '15px' }}>{cat.label}</div>
                
                {}
                <div className='income-controls' style={{ display: 'flex', gap: '10px', background: 'transparent', padding: 0 }}>
                    <button
                        style={{ flex: 1, margin: 0 }}
                        className={`btn-toggle ${itemData?.has === 'yes' ? 'selected-ja' : ''}`}
                        onClick={() => onUpdate('has', 'yes')}
                    >
                        Ja
                    </button>
                    <button
                        style={{ flex: 1, margin: 0 }}
                        className={`btn-toggle ${itemData?.has === 'no' ? 'selected-nein' : ''}`}
                        onClick={() => onUpdate('has', 'no')}
                    >
                        Nein
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {itemData?.has === 'yes' && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className='income-input-wrapper'>
                            <div className='currency-input'>
                                <input
                                    type='text'
                                    inputMode='decimal'
                                    placeholder='0,00'
                                    className='brutto-input'
                                    style={{ color: '#3B82F6', paddingRight: '75px' }}
                                    value={itemData.brutto || ''}
                                    onChange={e => onUpdate('brutto', e.target.value)}
                                />
                                <span className='currency-label'>€ Brutto</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default IncomeItem;