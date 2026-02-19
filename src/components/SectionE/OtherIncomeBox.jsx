const OtherIncomeBox = ({ items, onUpdateItem, onAddItem, onRemoveItem }) => {
    const handleTextareaChange = e => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    return (
        <div className='andere-einnahmen-box'>
            <div className='info-box-small' style={{ marginBottom: '15px', fontSize: '0.85rem', background: '#f0f9ff', padding: '10px', borderRadius: '8px', border: '1px solid #bae6fd', color: '#0369a1' }}>
                <strong>Hinweis:</strong> Belege (z. B. Lohnbescheinigung, Steuerbescheid, Bewilligungsbescheid) müssen in Kopie beigefügt werden.
            </div>

            {items.map((item, index) => (
                <div key={index} className='other-income-item' style={{ marginBottom: index === 0 && items.length > 1 ? '20px' : '0', paddingBottom: index === 0 && items.length > 1 ? '15px' : '0', borderBottom: index === 0 && items.length > 1 ? '1px dashed #cbd5e1' : 'none' }}>
                    <div className='mb-15'>
                        <label className='input-label-small'>Art & Zeitraum (Eintrag {index + 1})</label>
                        <textarea
                            rows='1'
                            placeholder='z.B. Weihnachtsgeld (jährlich), Steuererstattung (einmalig)'
                            className='details-textarea'
                            value={item.details}
                            onChange={e => {
                                handleTextareaChange(e);
                                onUpdateItem(index, 'details', e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label className='input-label-small'>Betrag (Brutto)</label>
                        <div className='currency-input'>
                            <input
                                type='text'
                                placeholder='0,00'
                                className='brutto-input'
                                style={{ color: '#3B82F6' }}
                                value={item.brutto}
                                onChange={e => onUpdateItem(index, 'brutto', e.target.value)}
                            />
                            <span className='currency-label'>€ Brutto</span>
                        </div>
                    </div>
                    {index > 0 && (
                        <button onClick={() => onRemoveItem(index)} style={{ marginTop: '10px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}>
                            Eintrag entfernen
                        </button>
                    )}
                </div>
            ))}

            {items.length < 2 && (
                <button className='btn-secondary-action' style={{ width: '100%', marginTop: '15px' }} onClick={onAddItem}>
                    + Weiteren Eintrag hinzufügen
                </button>
            )}
        </div>
    );
};

export default OtherIncomeBox;