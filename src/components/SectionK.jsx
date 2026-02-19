import { PenLine, Trash2, Upload, Image as ImageIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import '../css/SectionJ.css'
import '../css/SectionK.css'

const SectionK = ({ onBack, onFinish }) => {
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [signatureMode, setSignatureMode] = useState('draw') // 'draw' или 'upload'
    const [isSigned, setIsSigned] = useState(false) // для режима рисования
    const [uploadedSignature, setUploadedSignature] = useState(null) // для режима загрузки
    
    const sigCanvas = useRef(null)
    const fileInputRef = useRef(null)

    // Очистка подписи (в обоих режимах)
    const clearSignature = () => {
        if (signatureMode === 'draw') {
            sigCanvas.current.clear()
            setIsSigned(false)
        } else {
            setUploadedSignature(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    // Обработка загрузки файла
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

    const canFinish = isConfirmed && (isSigned || uploadedSignature)

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
                    Ich versichere hiermit, dass meine Angaben vollständig und wahr sind. Das Hinweisblatt zu diesem
Formular habe ich erhalten und gelesen.
Mir ist bekannt, dass unvollständige oder unrichtige Angaben die Aufhebung der Bewilligung von Prozess- oder Verfahrenskostenhilfe und eine Strafverfolgung nach sich ziehen können. Das Gericht kann
mich auffordern, fehlende Belege nachzureichen und meine Angaben an Eides statt zu versichern.
Mir ist auch bekannt, dass ich während des Gerichtsverfahrens und innerhalb eines Zeitraums von
vier Jahren seit der rechtskräftigen Entscheidung oder der sonstigen Beendigung des Verfahrens verpflichtet bin, dem Gericht wesentliche Verbesserungen meiner wirtschaftlichen Lage oder eine Änderung meiner Anschrift unaufgefordert und unverzüglich mitzuteilen. Bei laufenden Einkünften ist jede
nicht nur einmalige Verbesserung von mehr als 100 Euro (brutto) im Monat mitzuteilen. </p>

<p>Reduzieren
sich geltend gemachte Abzüge, muss ich dies ebenfalls unaufgefordert und unverzüglich mitteilen,
wenn die Entlastung nicht nur einmalig 100 Euro im Monat übersteigt. Ich weiß, dass die Bewilligung
der Prozess- oder Verfahrenskostenhilfe bei einem Verstoß gegen diese Pflicht aufgehoben werden
kann, und ich dann die gesamten Kosten nachzahlen muss.
                </p>
            </div>

            <div className='signature-section' style={{ marginTop: '30px' }}>
                <label className='input-label-small' style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                    <PenLine size={16} /> Unterschrift
                </label>

                {/* Переключатель режимов */}
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
                    justifyContent: 'center'
                }}>
                    
                    {signatureMode === 'draw' ? (
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor='black'
                            canvasProps={{
                                width: 500,
                                height: 180,
                                className: 'sigCanvas',
                                style: { width: '100%', height: '180px' },
                            }}
                            onBegin={() => setIsSigned(true)}
                        />
                    ) : (
                        <div style={{ width: '100%', padding: '20px', textAlign: 'center' }}>
                            {uploadedSignature ? (
                                <img src={uploadedSignature} alt="Signature" style={{ maxHeight: '140px', maxWidth: '100%' }} />
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
                >
                    Fertigstellen & PDF laden
                </button>
            </div>
        </div>
    )
}

export default SectionK