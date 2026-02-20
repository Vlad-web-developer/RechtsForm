import { PenLine, Trash2, Upload, Image as ImageIcon } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import '../css/SectionJ.css'
import '../css/SectionK.css'

const SectionK = ({ data = {}, onChange = () => {}, onBack, onFinish }) => {
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [signatureMode, setSignatureMode] = useState('draw') 
    const [isSigned, setIsSigned] = useState(false) 
    const [uploadedSignature, setUploadedSignature] = useState(null) 
    
    const sigCanvas = useRef(null)
    const fileInputRef = useRef(null)

    // --- УСТАНОВКА СЕГОДНЯШНЕЙ ДАТЫ ПО УМОЛЧАНИЮ ---
    useEffect(() => {
        if (!data.date) {
            const today = new Date();
            // Форматируем дату в немецкий стандарт: DD.MM.YYYY
            const formattedDate = today.toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            onChange('date', formattedDate);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- МАСКА ДЛЯ ДАТЫ (TT.MM.JJJJ) ---
    const handleDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Удаляем все, кроме цифр
        if (value.length > 8) value = value.slice(0, 8); // Максимум 8 цифр

        // Автоматически добавляем точки
        if (value.length >= 5) {
            value = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4)}`;
        } else if (value.length >= 3) {
            value = `${value.slice(0, 2)}.${value.slice(2)}`;
        }
        
        onChange('date', value);
    };

    // Пересчет координат холста под реальный размер экрана (для мобильных)
    useEffect(() => {
        let lastWidth = 0;

        const resizeCanvas = () => {
            if (sigCanvas.current && signatureMode === 'draw') {
                const canvas = sigCanvas.current.getCanvas();
                const currentWidth = canvas.offsetWidth;
                
                if (currentWidth === lastWidth || currentWidth === 0) return;
                lastWidth = currentWidth;

                const ratio = Math.max(window.devicePixelRatio || 1, 1);
                
                canvas.width = currentWidth * ratio;
                canvas.height = canvas.offsetHeight * ratio;
                canvas.getContext("2d").scale(ratio, ratio);
                
                sigCanvas.current.clear();
                setIsSigned(false);
            }
        };

        const timeout = setTimeout(resizeCanvas, 50);
        window.addEventListener('resize', resizeCanvas);
        
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [signatureMode]);

    const clearSignature = () => {
        if (signatureMode === 'draw') {
            sigCanvas.current.clear()
            setIsSigned(false)
        } else {
            setUploadedSignature(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setUploadedSignature(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleFinish = () => {
        let finalSignature = null

        if (signatureMode === 'draw' && isSigned) {
            finalSignature = sigCanvas.current.getCanvas().toDataURL('image/png')
        } else if (signatureMode === 'upload' && uploadedSignature) {
            finalSignature = uploadedSignature
        }

        if (isConfirmed && finalSignature) {
            onFinish(finalSignature)
        }
    }

    const hasLocation = data.location && data.location.trim().length > 0;
    const hasValidDate = data.date && data.date.length >= 8;
    const canFinish = isConfirmed && (isSigned || uploadedSignature) && hasLocation && hasValidDate;

    return (
        <div className='section-card'>
            <h2 className='section-title'>K. Abschließende Erklärung</h2>

            <div className='important-box'>
                <strong>WICHTIG:</strong> Bitte lesen Sie diesen Text sorgfältig durch.
            </div>

            <div className='declaration-text'>
                <p>
                    Ich versichere hiermit, dass meine Angaben vollständig und wahr sind.
                    Das Hinweisblatt zu diesem Formular habe ich erhalten und gelesen.
                </p>
                <p>
                    Mir ist bekannt, dass unvollständige oder unrichtige Angaben die Aufhebung der Bewilligung von Prozess- oder Verfahrenskostenhilfe und eine Strafverfolgung nach sich ziehen können. Das Gericht kann
                    mich auffordern, fehlende Belege nachzureichen und meine Angaben an Eides statt zu versichern.
                </p>
                <p>
                    Mir ist auch bekannt, dass ich während des Gerichtsverfahrens und innerhalb eines Zeitraums von
                    vier Jahren seit der rechtskräftigen Entscheidung oder der sonstigen Beendigung des Verfahrens verpflichtet bin, dem Gericht wesentliche Verbesserungen meiner wirtschaftlichen Lage oder eine Änderung meiner Anschrift unaufgefordert und unverzüglich mitzuteilen. Bei laufenden Einkünften ist jede
                    nicht nur einmalige Verbesserung von mehr als 100 Euro (brutto) im Monat mitzuteilen. 
                </p>
                <p>
                    Reduzieren sich geltend gemachte Abzüge, muss ich dies ebenfalls unaufgefordert und unverzüglich mitteilen,
                    wenn die Entlastung nicht nur einmalig 100 Euro im Monat übersteigt. Ich weiß, dass die Bewilligung
                    der Prozess- oder Verfahrenskostenhilfe bei einem Verstoß gegen diese Pflicht aufgehoben werden
                    kann, und ich dann die gesamten Kosten nachzahlen muss.
                </p>
            </div>

            {/* --- БЛОК: ORT UND DATUM --- */}
            <div style={{ 
                display: 'flex', 
                gap: '20px', 
                marginTop: '30px', 
                flexWrap: 'wrap'
            }}>
                <div className='input-group' style={{ flex: '1 1 200px' }}>
                    <label>Ort <span style={{color: 'red'}}>*</span></label>
                    <input
                        type='text'
                        value={data.location || ''}
                        onChange={(e) => onChange('location', e.target.value)}
                        placeholder='z.B. Berlin'
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line-color)' }}
                    />
                </div>
                <div className='input-group' style={{ flex: '1 1 200px' }}>
                    <label>Datum <span style={{color: 'red'}}>*</span></label>
                    <input
                        type='text'
                        value={data.date || ''}
                        onChange={handleDateChange} // Используем функцию маски
                        placeholder='TT.MM.JJJJ'
                        maxLength="10"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line-color)' }}
                    />
                </div>
            </div>

            <div className='signature-section' style={{ marginTop: '30px' }}>
                <label className='input-label-small' style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                    <PenLine size={16} /> Unterschrift <span style={{color: 'red'}}>*</span>
                </label>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <button 
                        className={`toggle-btn ${signatureMode === 'draw' ? 'active' : ''}`}
                        onClick={() => { setSignatureMode('draw'); clearSignature(); }}
                        type="button"
                    >
                        <PenLine size={14} /> Zeichnen
                    </button>
                    <button 
                        className={`toggle-btn ${signatureMode === 'upload' ? 'active' : ''}`}
                        onClick={() => { setSignatureMode('upload'); clearSignature(); }}
                        type="button"
                    >
                        <Upload size={14} /> Datei hochladen
                    </button>
                </div>

                <div className='signature-container' style={{ 
                    border: '2px dashed var(--line-color)', 
                    borderRadius: '12px', 
                    background: 'white', 
                    position: 'relative',
                    minHeight: '180px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    touchAction: 'none'
                }}>
                    
                    {signatureMode === 'draw' ? (
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor='black'
                            canvasProps={{
                                className: 'sigCanvas',
                                style: { width: '100%', height: '180px', touchAction: 'none' },
                            }}
                            onBegin={() => setIsSigned(true)}
                        />
                    ) : (
                        <div style={{ width: '100%', padding: '20px', textAlign: 'center' }}>
                            {uploadedSignature ? (
                                <img src={uploadedSignature} alt="Signature" style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'contain' }} />
                            ) : (
                                <div onClick={() => fileInputRef.current.click()} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                    <ImageIcon size={48} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
                                    <p>Klicken Sie hier, um ein Bild Ihrer Unterschrift hochzuladen</p>
                                    <p style={{ fontSize: '0.7rem' }}>(PNG, JPG empfohlen)</p>
                                </div>
                            )}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                style={{ display: 'none' }} 
                                accept="image/*" 
                                onChange={handleFileUpload} 
                            />
                        </div>
                    )}

                    {(isSigned || uploadedSignature) && (
                        <button
                            onClick={clearSignature}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '10px',
                                background: '#fee2e2',
                                border: '1px solid #ef4444',
                                color: '#ef4444',
                                padding: '5px 10px',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                zIndex: 10,
                            }}
                        >
                            <Trash2 size={14} /> Löschen
                        </button>
                    )}
                </div>
                
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                    {signatureMode === 'draw' 
                        ? 'Bitte unterschreiben Sie innerhalb des Feldes (mit Maus oder Touch).'
                        : 'Laden Sie ein Foto oder einen Scan Ihrer Unterschrift hoch.'}
                </p>
            </div>

            <div
                onClick={() => setIsConfirmed(!isConfirmed)}
                className={`radio-card-option ${isConfirmed ? 'selected' : ''}`}
                style={{ marginTop: '25px', padding: '15px' }}
            >
                <div
                    className={`custom-checkbox ${isConfirmed ? 'checked' : ''}`}
                    style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        border: isConfirmed ? 'none' : '2px solid #cbd5e1',
                        backgroundColor: isConfirmed ? '#3b82f6' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        flexShrink: 0,
                        marginRight: '15px',
                    }}
                >
                    {isConfirmed && '✓'}
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    Ich bestätige die Richtigkeit meiner Angaben.
                </span>
            </div>

            <div className='navigation-footer' style={{ marginTop: '30px' }}>
                <button className='btn-secondary-action' onClick={onBack}>
                    Zurück
                </button>
                <button
                    className='btn-primary-action'
                    style={{
                        background: canFinish ? '#10b981' : '#94a3b8',
                        cursor: canFinish ? 'pointer' : 'not-allowed',
                    }}
                    onClick={handleFinish}
                    disabled={!canFinish}
                    title={!canFinish ? "Bitte füllen Sie Ort und Datum aus, unterschreiben Sie und bestätigen Sie die Angaben." : ""}
                >
                    Fertigstellen & PDF laden
                </button>
            </div>
        </div>
    )
}

export default SectionK