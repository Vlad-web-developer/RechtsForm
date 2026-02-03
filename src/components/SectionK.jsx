import { useState } from 'react'
import '../css/SectionJ.css'
import '../css/SectionK.css'

const SectionK = ({ onBack, onFinish }) => {
    
    const [isConfirmed, setIsConfirmed] = useState(false)

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
                    Mir ist bekannt, dass unvollständige oder unrichtige Angaben die
                    Aufhebung der Bewilligung von Prozess- oder Verfahrenskostenhilfe und
                    eine Strafverfolgung nach sich ziehen können. Das Gericht kann mich
                    auffordern, fehlende Belege nachzureichen und meine Angaben an Eides
                    statt zu versichern.
                </p>
                <p>
                    Mir ist auch bekannt, dass ich während des Gerichtsverfahrens und
                    innerhalb eines Zeitraums von vier Jahren seit der rechtskräftigen
                    Entscheidung oder der sonstigen Beendigung des Verfahrens verpflichtet
                    bin, dem Gericht wesentliche Verbesserungen meiner wirtschaftlichen
                    Lage oder eine Änderung meiner Anschrift unaufgefordert und
                    unverzüglich mitzuteilen.
                </p>
            </div>

            {}
            <div 
                onClick={() => setIsConfirmed(!isConfirmed)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginTop: '25px',
                    padding: '15px',
                    backgroundColor: 'rgba(59, 130, 246, 0.05)', 
                    borderRadius: '10px',
                    cursor: 'pointer',
                    border: isConfirmed ? '1px solid #3b82f6' : '1px solid transparent',
                    transition: 'all 0.2s ease'
                }}
            >
                {}
                <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: isConfirmed ? 'none' : '2px solid #cbd5e1',
                    backgroundColor: isConfirmed ? '#3b82f6' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                }}>
                    {isConfirmed && '✓'}
                </div>
                
                {}
                <span style={{ 
                    fontSize: '0.95rem', 
                    color: 'var(--text-primary)',
                    lineHeight: '1.4'
                }}>
                    Ich habe die oben stehenden Hinweise gelesen und bestätige die Richtigkeit meiner Angaben.
                </span>
            </div>

            {}
            <div className='navigation-footer' style={{ marginTop: '30px' }}>
                <button className='btn-secondary-action' onClick={onBack}>
                    Zurück
                </button>
                <button
                    className='btn-primary-action'
                    style={{
                        
                        background: isConfirmed ? '#10b981' : '#ccc', 
                        cursor: isConfirmed ? 'pointer' : 'not-allowed',
                        transition: 'background 0.3s ease'
                    }}
                    onClick={onFinish}
                    disabled={!isConfirmed} 
                    title={!isConfirmed ? "Bitte bestätigen Sie die Angaben oben" : ""}
                >
                    Fertigstellen & PDF laden
                </button>
            </div>
        </div>
    )
}

export default SectionK