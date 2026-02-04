const OwnerSection = ({ data, onUpdate, onUpdateLoan }) => {
    return (
        <>
            <h3 className='section-subtitle' style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>
                Kosten als Eigentümer (in €) <span style={{ color: '#ef4444' }}>*</span>
            </h3>
            <div className='costs-grid'>
                <div className='input-group'>
                    <label className='input-label'>
                        Zinsen & Tilgung <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                        type='text'
                        className='brutto-input'
                        placeholder='Rate an Bank'
                        value={data.interestRepayment || ''}
                        onChange={e => onUpdate('interestRepayment', e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <label className='input-label'>Heizungskosten <span style={{ color: '#ef4444' }}>*</span></label>
                    <input
                        type='text'
                        className='brutto-input'
                        placeholder='0,00'
                        value={data.heatingCostsOwner || ''}
                        onChange={e => onUpdate('heatingCostsOwner', e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <label className='input-label'>Nebenkosten (Übrige) <span style={{ color: '#ef4444' }}>*</span></label>
                    <input
                        type='text'
                        className='brutto-input'
                        placeholder='Wasser, Müll...'
                        value={data.otherCostsOwner || ''}
                        onChange={e => onUpdate('otherCostsOwner', e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <label className='input-label'>Gesamtbetrag <span style={{ color: '#ef4444' }}>*</span></label>
                    <input
                        type='text'
                        className='brutto-input'
                        placeholder='Summe'
                        style={{ borderColor: 'var(--accent-color)' }}
                        value={data.totalCostOwner || ''}
                        onChange={e => onUpdate('totalCostOwner', e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <label className='input-label'>Ich allein zahle davon: <span style={{ color: '#ef4444' }}>*</span></label>
                    <input
                        type='text'
                        className='brutto-input'
                        placeholder='Ihr Anteil'
                        value={data.ownShareOwner || ''}
                        onChange={e => onUpdate('ownShareOwner', e.target.value)}
                    />
                </div>
            </div>

            <div className='loan-section'>
                <h4 style={{ margin: '0 0 15px 0', fontSize: '1rem', color: 'var(--text-primary)' }}>
                    Belastungen aus Fremdmitteln (Kredite) <span style={{ color: '#ef4444' }}>*</span>
                </h4>
                <div className='input-group' style={{ marginBottom: '15px' }}>
                    <label className='input-label'>Details (Datum, Bank, Laufzeit)</label>
                    <textarea
                        className='modern-input'
                        style={{ minHeight: '80px', resize: 'vertical' }}
                        placeholder='z.B. Darlehensvertrag vom 01.01.2020...'
                        value={data.loanDetails || ''}
                        onChange={e => onUpdate('loanDetails', e.target.value)}
                    />
                </div>
                <div className='loan-rows-container'>
                    <div className='loan-row' style={{ border: 'none', paddingBottom: 0, marginBottom: 5 }}>
                        <label className='input-label'>Restschuld (€) <span style={{ color: '#ef4444' }}>*</span></label>
                        <label className='input-label'>Zinsen & Tilgung (mtl.) <span style={{ color: '#ef4444' }}>*</span></label>
                    </div>
                    {[0, 1].map(idx => {
                        const loanItem = data.loans?.[idx] || { remainingDebt: '', monthlyPayment: '' };
                        return (
                            <div key={idx} className='loan-row'>
                                <input
                                    type='text'
                                    className='brutto-input'
                                    placeholder='Restschuld'
                                    value={loanItem.remainingDebt || ''}
                                    onChange={e => onUpdateLoan(idx, 'remainingDebt', e.target.value)}
                                />
                                <input
                                    type='text'
                                    className='brutto-input'
                                    placeholder='Monatliche Rate'
                                    value={loanItem.monthlyPayment || ''}
                                    onChange={e => onUpdateLoan(idx, 'monthlyPayment', e.target.value)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default OwnerSection;