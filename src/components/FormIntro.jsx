import { motion } from 'framer-motion'
import { useState } from 'react'

const FormIntro = ({ onNext }) => {
    const [generalConsent, setGeneralConsent] = useState(false)
    const [privacyConsent, setPrivacyConsent] = useState(false)
    const [showPrivacy, setShowPrivacy] = useState(false)

    return (
        <div className='section-card'>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className='section-title'>
                    Erklärung über die persönlichen und wirtschaftlichen Verhältnisse
                </h2>

                {}
                <div
                    style={{
                        backgroundColor: '#fffbeb',
                        border: '1px solid #fcd34d',
                        borderRadius: '8px',
                        padding: '20px',
                        marginBottom: '25px',
                        color: '#92400e',
                    }}
                >
                    <h3
                        style={{ marginTop: 0, fontSize: '1.1rem', marginBottom: '10px' }}
                    >
                        Allgemeine Hinweise
                    </h3>
                    <p
                        style={{
                            fontSize: '0.95rem',
                            lineHeight: '1.5',
                            marginBottom: '10px',
                        }}
                    >
                        Diese App ist eine reine Ausfüllhilfe. Sie überträgt Ihre Angaben
                        lediglich in das Formular, ohne diese inhaltlich zu prüfen. Die
                        Verantwortung für die Richtigkeit und Vollständigkeit liegt allein
                        bei Ihnen. Bitte kontrollieren Sie das fertige PDF daher vor der
                        Einreichung sorgfältig. Es erfolgt auch keine Prüfung, ob Sie einen
                        Anspruch auf Verfahrenskostenhilfe haben.
                    </p>
                    <p style={{ fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                        Beachten Sie bitte unbedingt den rechtlichen Hinweis vor dem
                        Unterschriftsfeld und das Hinweisblatt.
                    </p>

                    <div
                        style={{
                            marginTop: '15px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                        }}
                    ></div>
                </div>

                {}
                <div
                    style={{
                        marginBottom: '25px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }}
                >
                    <button
                        onClick={() => setShowPrivacy(!showPrivacy)}
                        style={{
                            width: '100%',
                            padding: '15px 20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: '#f9fafb',
                            border: 'none',
                            borderBottom: showPrivacy ? '1px solid #e5e7eb' : 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: '#374151',
                        }}
                    >
                        <span>Datenschutzinformationen für den VKH-Assistenten</span>
                        <span>{showPrivacy ? '▲' : '▼'}</span>
                    </button>

                    {showPrivacy && (
                        <div
                            style={{
                                padding: '20px',
                                backgroundColor: '#fff',
                                fontSize: '0.95rem',
                                lineHeight: '1.6',
                                color: '#4b5563',
                            }}
                        >
                            <h4
                                style={{
                                    margin: '0 0 10px 0',
                                    fontSize: '1rem',
                                    color: '#1f2937',
                                }}
                            >
                                1. Verantwortlicher
                            </h4>
                            <p style={{ marginBottom: '15px' }}>
                                Rechtsanwalt Richard Mertens, LL.M.
                                <br />
                                Kurfürstendamm 216
                                <br />
                                10719 Berlin
                                <br />
                                E-Mail: info@mertens-rechtsanwalt.de
                            </p>

                            <h4
                                style={{
                                    margin: '0 0 10px 0',
                                    fontSize: '1rem',
                                    color: '#1f2937',
                                }}
                            >
                                2. Art der Datenverarbeitung (Client-Side)
                            </h4>
                            <p style={{ marginBottom: '15px' }}>
                                Dieser Assistent ermöglicht es Ihnen, Daten für den Antrag auf
                                Verfahrenskostenhilfe strukturiert zu erfassen. Die Verarbeitung
                                dieser Daten (Einkommen, Ausgaben, Vermögenswerte) findet
                                ausschließlich auf Ihrem Endgerät (im Arbeitsspeicher Ihres
                                Browsers) statt.
                            </p>

                            <h4
                                style={{
                                    margin: '0 0 10px 0',
                                    fontSize: '1rem',
                                    color: '#1f2937',
                                }}
                            >
                                3. Zweck und Rechtsgrundlage
                            </h4>
                            <p style={{ marginBottom: '15px' }}>
                                Zweck ist die Bereitstellung eines technischen Hilfsmittels zur
                                Erstellung eines PDF-Antragsformulars. Rechtsgrundlage für die
                                Bereitstellung dieses Dienstes ist unser berechtigtes Interesse
                                gemäß Art. 6 Abs. 1 lit. f DSGVO, ein effizientes Tool zur
                                Antragsstellung zur Verfügung zu stellen.
                            </p>

                            <h4
                                style={{
                                    margin: '0 0 10px 0',
                                    fontSize: '1rem',
                                    color: '#1f2937',
                                }}
                            >
                                4. Keine Speicherung / Datenübermittlung
                            </h4>
                            <p style={{ marginBottom: '15px' }}>
                                Es findet keine Speicherung der von Ihnen eingegebenen Daten auf
                                unseren Servern statt. Die Kanzlei Rechtsanwalt Richard Mertens
                                erhält durch die Nutzung dieses Tools keine Kenntnis von Ihren
                                wirtschaftlichen Verhältnissen. Eine Übermittlung an Dritte
                                erfolgt nicht.
                            </p>

                            <h4
                                style={{
                                    margin: '0 0 10px 0',
                                    fontSize: '1rem',
                                    color: '#1f2937',
                                }}
                            >
                                5. Protokolldaten (Server-Logs)
                            </h4>
                            <p style={{ marginBottom: '15px' }}>
                                Beim Aufruf der App werden technisch bedingt Zugriffsdaten (z.
                                B. IP-Adresse, Datum/Uhrzeit des Abrufs) durch unseren
                                Webhosting-Anbieter verarbeitet. Dies ist für die Auslieferung
                                der Webseite erforderlich. Diese Daten werden getrennt von Ihren
                                Eingaben im Tool behandelt.
                            </p>

                            <h4
                                style={{
                                    margin: '0 0 10px 0',
                                    fontSize: '1rem',
                                    color: '#1f2937',
                                }}
                            >
                                6. Ihre Rechte
                            </h4>
                            <p style={{ margin: 0 }}>
                                Da wir keine personenbezogenen Eingaben aus dem Tool speichern,
                                können wir diesbezüglich keine Auskunft oder Löschung vornehmen.
                                Bezüglich der allgemeinen Verbindungsdaten (IP-Adresse) stehen
                                Ihnen die üblichen Betroffenenrechte (Auskunft, Widerspruch)
                                gemäß DSGVO zu.
                            </p>
                        </div>
                    )}
                </div>

                {}
                <div
                    style={{
                        marginBottom: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                    }}
                >
                    {}
                    <div
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                    >
                        <input
                            type='checkbox'
                            id='general-consent'
                            checked={generalConsent}
                            onChange={e => setGeneralConsent(e.target.checked)}
                            style={{
                                marginTop: '4px',
                                width: '20px',        
                                height: '20px',       
                                minWidth: '20px',     
                                minHeight: '20px',    
                                cursor: 'pointer',
                                flexShrink: 0,
                                accentColor: 'var(--accent-color)' 
                            }}
                        />
                        <label
                            htmlFor='general-consent'
                            style={{
                                fontSize: '1rem',
                                cursor: 'pointer',
                                lineHeight: '1.4',
                            }}
                        >
                            Ich habe die Hinweise gelesen und bin damit einverstanden.
                        </label>
                    </div>

                    {}
                    <div
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                    >
                        <input
                            type='checkbox'
                            id='privacy-consent'
                            checked={privacyConsent}
                            onChange={e => setPrivacyConsent(e.target.checked)}
                            style={{
                                marginTop: '4px',
                                width: '20px',        
                                height: '20px',       
                                minWidth: '20px',     
                                minHeight: '20px',    
                                cursor: 'pointer',
                                flexShrink: 0,
                                accentColor: 'var(--accent-color)' 
                            }}
                        />
                        <label
                            htmlFor='privacy-consent'
                            style={{
                                fontSize: '1rem',
                                cursor: 'pointer',
                                lineHeight: '1.4',
                                color: 'var(--text-primary)',
                            }}
                        >
                            Ich habe die Datenschutzhinweise zur lokalen Datenverarbeitung
                            gelesen und bin mit der Erstellung des Antragsformulars
                            einverstanden.
                        </label>
                    </div>
                </div>
                <button
                    className='btn-primary'
                    onClick={onNext}
                    disabled={!generalConsent || !privacyConsent}
                    style={{
                        opacity: generalConsent && privacyConsent ? 1 : 0.5,
                        cursor:
                            generalConsent && privacyConsent ? 'pointer' : 'not-allowed',
                        flexShrink: 0,
                    }}
                >
                    Beginnen Sie mit dem Ausfüllen
                </button>
            </motion.div>
        </div>
    )
}

export default FormIntro;