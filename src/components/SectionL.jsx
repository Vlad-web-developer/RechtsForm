import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Upload, FileCheck, X, AlertCircle, FileWarning } from 'lucide-react';

// WICHTIG: Props 'files' und 'setFiles' werden von App.js empfangen
const SectionL = ({ formData, onBack, onNext, files, setFiles }) => {
    
    const [errors, setErrors] = useState({}); 
    const [draggingId, setDraggingId] = useState(null);
    const fileInputRefs = useRef({});

    // === KONSTANTEN ===
    const MAX_FILE_SIZE_MB = 10;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

    const isYes = (val) => val === 'yes' || val === 'ja' || val === true;

    // === KORRIGIERTE LOGIK ===
    const getRequiredDocs = () => {
        const docs = [];
        
        const secB = formData?.sectionB || {};
        const secC = formData?.sectionC || {};
        const secD = formData?.sectionD || {};
        const secE = formData?.sectionE || {};
        const secG = formData?.sectionG || {};
        const secH = formData?.sectionH || {};
        const secI = formData?.sectionI || {};
        const secJ = formData?.sectionJ || {};

        const isSGBXII = isYes(secE.receivesSocialAssistanceSGBXII);

        // --- TEIL 1: IMMER ERFORDERLICH (unabhängig von SGB XII) ---
        
        // Abschnitt B: Rechtsschutz
        if (isYes(secB.hasInsurance)) {
            docs.push({ id: 'insurance_policy', label: 'Rechtsschutzversicherung', desc: 'Police oder Deckungsablehnung.' });
        }

        // Abschnitt C: Unterhaltsansprüche
        if (isYes(secC.hasMaintenanceClaims)) {
            docs.push({ id: 'maintenance_claims', label: 'Unterhaltsbelege', desc: 'Titel oder Schriftverkehr.' });
        }

        // Abschnitt D: Angehörige (Das hat gefehlt!)
        if (isYes(secD.hasDependents)) {
            docs.push({ id: 'dependents_proof', label: 'Nachweise Angehörige', desc: 'Geburtsurkunden, Unterhaltsnachweise.' });
        }

        // --- TEIL 2: SGB XII ODER FINANZEN ---

        if (isSGBXII) {
            // Wenn SGB XII: Wir brauchen den Bescheid, aber KEINE Einzelnachweise für E-J
            docs.push({ 
                id: 'sgb12', 
                label: 'Aktueller Bewilligungsbescheid (SGB XII)', 
                desc: 'Vollständiger Bescheid inkl. Berechnungsbogen.' 
            });
            
            // HIER ENDE FÜR SGB-EMPFÄNGER (Die Docs aus Teil 1 bleiben aber erhalten!)
            return docs;
        }

        // --- TEIL 3: NUR WENN KEIN SGB XII (Abschnitte E-J) ---

        // Abschnitt E: Einkommen
        const self = secE.self || {};
        if (isYes(self.nichtselbstaendig?.has)) docs.push({ id: 'salary_self', label: 'Lohnabrechnungen', desc: 'Letzte 3 Monate.' });
        if (isYes(self.selbstaendig?.has)) docs.push({ id: 'tax_self', label: 'Steuerbescheid / BWA', desc: 'Aktuellster Bescheid.' });
        if (isYes(self.arbeitslosengeld?.has) || isYes(self.buergergeld?.has)) docs.push({ id: 'alg_self', label: 'Bescheid ALG I / Bürgergeld', desc: 'Aktueller Bescheid.' });
        if (isYes(self.rente?.has)) docs.push({ id: 'pension_self', label: 'Rentenbescheid', desc: 'Aktueller Rentenbescheid.' });

        // Partner Einkommen
        if (isYes(secE.hasPartner)) {
            const partner = secE.partner || {};
            if (isYes(partner.nichtselbstaendig?.has)) docs.push({ id: 'salary_partner', label: 'Lohnabrechnungen (Partner)', desc: 'Letzte 3 Monate.' });
            if (isYes(partner.selbstaendig?.has) || isYes(partner.rente?.has)) docs.push({ id: 'income_partner', label: 'Einkommensbelege (Partner)', desc: 'Steuerbescheid/Rentenbescheid.' });
        }

        // Abschnitt E5: Keine Einkünfte
        const allNoIncome = Object.values(self).every(cat => {
             if (cat && typeof cat === 'object' && 'has' in cat) return cat.has === 'no' || cat.has === 'nein';
             return true; 
        });
        if (allNoIncome) docs.push({ id: 'e5_explain', label: 'Erklärung zum Lebensunterhalt', desc: 'Schriftliche Erklärung (E 5).' });

        // Abschnitt G: Vermögen
        docs.push({ id: 'bank_statements', label: 'Kontoauszüge', desc: 'Lückenlos, letzte 3 Monate.' });
        if (isYes(secG.realEstate?.has)) docs.push({ id: 'real_estate', label: 'Grundbuchauszug', desc: 'Aktueller Auszug.' });
        if (isYes(secG.vehicles?.has)) docs.push({ id: 'vehicle_doc', label: 'Fahrzeugschein', desc: 'Zulassungsbescheinigung Teil I.' });
        if (isYes(secG.lifeInsurance?.has)) docs.push({ id: 'life_insurance', label: 'Lebensversicherung', desc: 'Rückkaufswert.' });

        // Abschnitt H: Wohnen
        if (secH.housingType === 'tenant') {
            docs.push({ id: 'rent_contract', label: 'Mietvertrag', desc: 'Aktueller Vertrag & Änderungsschreiben.' });
            docs.push({ id: 'heating_bill', label: 'Nebenkostenabrechnung', desc: 'Letzte Abrechnung.' });
        } else if (secH.housingType === 'owner') {
            docs.push({ id: 'loan_home', label: 'Immobiliendarlehen', desc: 'Jahreskontoauszug.' });
            docs.push({ id: 'housing_costs', label: 'Wohnnebenkosten', desc: 'Grundsteuer, Wasser, Heizung.' });
        }

        // Abschnitt I: Schulden
        if (isYes(secI.hasObligations)) docs.push({ id: 'loans_general', label: 'Kreditverträge', desc: 'Verträge & Zahlungsnachweise.' });
        
        // Abschnitt J: Besondere Belastungen
        if (isYes(secJ.hasSpecialLoads)) docs.push({ id: 'special_loads', label: 'Besondere Belastungen', desc: 'Atteste, Rechnungen.' });

        return docs;
    };

    const requiredDocs = getRequiredDocs();
    const missingDocsCount = requiredDocs.length - Object.keys(files || {}).length; // Safe access
    const isComplete = missingDocsCount === 0;

    // === VALIDIERUNG & UPLOAD ===
    const validateFile = (file) => {
        if (!file) return 'Keine Datei ausgewählt.';
        if (!ALLOWED_TYPES.includes(file.type)) return 'Ungültiges Format. Erlaubt: PDF, JPG, PNG.';
        if (file.size > MAX_FILE_SIZE_BYTES) return `Datei zu groß (Max. ${MAX_FILE_SIZE_MB} MB).`;
        return null;
    };

    const handleFileChange = (docId, fileList) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[docId];
            return newErrors;
        });

        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            const error = validateFile(file);

            if (error) {
                setErrors(prev => ({ ...prev, [docId]: error }));
                return;
            }

            // Update in App.js State
            setFiles(prev => ({ ...prev, [docId]: file }));
        }
    };

    const onDragOver = (e, id) => { e.preventDefault(); setDraggingId(id); };
    const onDragLeave = () => setDraggingId(null);
    const onDrop = (e, id) => {
        e.preventDefault();
        setDraggingId(null);
        handleFileChange(id, e.dataTransfer.files);
    };

    const removeFile = (e, id) => {
        e.stopPropagation();
        setFiles(prev => {
            const newFiles = { ...prev };
            delete newFiles[id];
            return newFiles;
        });
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[id];
            return newErrors;
        });
        
        if (fileInputRefs.current[id]) {
            fileInputRefs.current[id].value = '';
        }
    };

    return (
        <div className='section-card'>
            <h2 className='section-title'>L. Belege hochladen</h2>
            
            <div className='privacy-shield-box' style={{ 
                display: 'flex', gap: '15px', padding: '15px', background: 'rgba(34, 197, 94, 0.1)', 
                border: '1px solid #22c55e', borderRadius: '10px', marginBottom: '25px' 
            }}>
                <Shield color='#22c55e' size={24} style={{flexShrink: 0}} />
                <div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>Datenschutz & Sicherheit</p>
                    <p style={{ margin: '5px 0 0', fontSize: '0.8rem', color: 'var(--text-primary)', opacity: 0.9 }}>
                        Ihre Dokumente werden <strong>ausschließlich lokal</strong> verarbeitet. Es erfolgt kein Upload. 
                        Erlaubte Formate: <strong>PDF, JPG, PNG</strong> (max. 10 MB).
                    </p>
                </div>
            </div>

            <div className='docs-list'>
                {requiredDocs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                        <FileCheck size={48} color="var(--accent-color)" style={{ margin: '0 auto 15px' }} />
                        <p style={{ color: 'var(--text-primary)' }}>Keine Belege erforderlich.</p>
                    </div>
                ) : (
                    requiredDocs.map(doc => {
                        const isUploaded = !!(files && files[doc.id]);
                        const hasError = !!errors[doc.id];

                        return (
                            <div key={doc.id} style={{ marginBottom: '15px' }}>
                                <div style={{ marginBottom: '6px', fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{doc.label} <span style={{color: '#ef4444'}}>*</span></span>
                                    {isUploaded && <span style={{color: '#22c55e', fontSize: '0.8rem'}}>✓ Bereit</span>}
                                </div>
                                
                                <div
                                    onClick={() => fileInputRefs.current[doc.id].click()}
                                    onDragOver={(e) => onDragOver(e, doc.id)}
                                    onDragLeave={onDragLeave}
                                    onDrop={(e) => onDrop(e, doc.id)}
                                    style={{
                                        border: '2px dashed',
                                        borderColor: hasError ? '#ef4444' : (isUploaded ? '#22c55e' : (draggingId === doc.id ? 'var(--accent-color)' : 'var(--line-color)')),
                                        background: hasError ? 'rgba(239, 68, 68, 0.05)' : (isUploaded ? 'rgba(34, 197, 94, 0.05)' : (draggingId === doc.id ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255,255,255,0.02)')),
                                        borderRadius: '10px',
                                        padding: '15px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        position: 'relative',
                                        marginTop: '15px',
                                    }}
                                >
                                    <input
                                        type="file"
                                        ref={el => fileInputRefs.current[doc.id] = el}
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            handleFileChange(doc.id, e.target.files);
                                            e.target.value = ''; 
                                        }}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />

                                    <AnimatePresence mode='wait'>
                                        {hasError ? (
                                            <motion.div 
                                                key="error"
                                                initial={{ opacity: 0 }} 
                                                animate={{ opacity: 1 }}
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#ef4444' }}
                                            >
                                                <FileWarning size={24} />
                                                <div style={{ textAlign: 'left' }}>
                                                    <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold' }}>Fehler</span>
                                                    <span style={{ fontSize: '0.8rem' }}>{errors[doc.id]}</span>
                                                </div>
                                                <X size={18} style={{marginLeft: 'auto'}} />
                                            </motion.div>
                                        ) : isUploaded ? (
                                            <motion.div 
                                                key="uploaded"
                                                initial={{ opacity: 0, scale: 0.95 }} 
                                                animate={{ opacity: 1, scale: 1 }}
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <FileCheck size={24} color="#22c55e" />
                                                    <div style={{ textAlign: 'left' }}>
                                                        <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                                                            {files[doc.id].name}
                                                        </span>
                                                        <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                                                            {(files[doc.id].size / 1024 / 1024).toFixed(2)} MB
                                                        </span>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={(e) => removeFile(e, doc.id)}
                                                    style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer', display: 'flex' }}
                                                    title="Entfernen"
                                                >
                                                    <X size={18} color="#ef4444" />
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                                    <Upload size={24} color="var(--text-secondary)" />
                                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                                                        Datei auswählen oder hierher ziehen
                                                    </div>
                                                    <div style={{ fontSize: '0.8rem', opacity: 0.7, color: 'var(--text-secondary)' }}>
                                                        {doc.desc}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {!isComplete && requiredDocs.length > 0 && (
                <div style={{ 
                    display: 'flex', alignItems: 'center', gap: '10px', 
                    marginTop: '20px', padding: '10px', 
                    background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', 
                    color: '#ef4444', fontSize: '0.9rem' 
                }}>
                    <AlertCircle size={20} />
                    <span>Bitte laden Sie alle erforderlichen Belege hoch ({missingDocsCount} fehlt/fehlen).</span>
                </div>
            )}

            <div className='navigation-footer' style={{ marginTop: '20px' }}>
                <button className='btn-secondary-action' onClick={onBack}>Zurück</button>
                <button 
                    className='btn-primary-action' 
                    onClick={onNext}
                    disabled={!isComplete} 
                    style={{ opacity: !isComplete ? 0.5 : 1, cursor: !isComplete ? 'not-allowed' : 'pointer' }}
                >
                    Weiter zur Bestätigung
                </button>
            </div>
        </div>
    );
};

export default SectionL;