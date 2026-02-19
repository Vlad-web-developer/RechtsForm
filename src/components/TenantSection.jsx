const TenantSection = ({ data, onUpdate }) => {
    return (
        <>
            <h3 className='section-subtitle' style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>
                Kosten als Mieter (in €) <span style={{ color: '#ef4444' }}>*</span>
            </h3>
            <div className='costs-grid'>
                <div className='input-group'>
                    <label className='input-label'>
                        Miete (Kalt) <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                        type='text'
                        className='brutto-input'
                        placeholder='0,00'
                        value={data.rentCold || ''}
                        onChange={e => onUpdate('rentCold', e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <label className='input-label'>Heizungskosten <span style={{ color: '#ef4444' }}>*</span></label>
                    <input
                        type='text'
                        className='brutto-input'
                        placeholder='0,00'
                        value={data.heatingCosts || ''}
                        onChange={e => onUpdate('heatingCosts', e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <label className='input-label'>Nebenkosten (Übrige) <span style={{ color: '#ef4444' }}>*</span></label>
                    <input
                        type='text'
                        className='brutto-input'
                        placeholder='0,00'
                        value={data.otherCosts || ''}
                        onChange={e => onUpdate('otherCosts', e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <label className='input-label'>
                        Gesamtbetrag <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                        type='text'
                        className='brutto-input'
                        placeholder='Summe'
                        style={{ borderColor: 'var(--accent-color)' }}
                        value={data.totalRent || ''}
                        onChange={e => onUpdate('totalRent', e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <label className='input-label'>Ich allein zahle davon: <span style={{ color: '#ef4444' }}>*</span></label>
                    <input
                        type='text'
                        className='brutto-input'
                        placeholder='Ihr Anteil'
                        value={data.ownShareRent || ''}
                        onChange={e => onUpdate('ownShareRent', e.target.value)}
                    />
                </div>
            </div>
        </>
    );
};

export default TenantSection;