import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import FormIntro from '../components/FormIntro.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import SectionA from '../components/SectionA.jsx'
import SectionB from '../components/SectionB.jsx'
import SectionC from '../components/SectionC.jsx'
import SectionD from '../components/SectionD/SectionD.jsx'
import SectionE from '../components/SectionE/SectionE.jsx'
import SectionF from '../components/SectionF.jsx'
import SectionG from '../components/SectionG.jsx'
import SectionH from '../components/SectionH.jsx'
import SectionI from '../components/SectionI.jsx'
import SectionJ from '../components/SectionJ.jsx'
import SectionK from '../components/SectionK.jsx'
import SectionL from '../components/SectionL.jsx' 
import ThemeToggle from '../components/ThemeToggle.jsx'

import '../css/App.css'
import '../css/index.css'

import { useFormData } from '../hooks/useFormData'
import { useFormProgress } from '../hooks/useFormProgress'
import { generateAndDownloadPDF } from '../utils/pdfGenerator'

function App() {
  // ДОБАВЛЕН resetFormData ИЗ ХУКА
  const { step, setStep, formData, updateData, resetFormData } = useFormData()
  const { globalProgress, milestones } = useFormProgress(formData)
  
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleDownload = (signatureData) => {
    const currentTheme = localStorage.getItem('theme'); 

    console.log("Generating PDF with signature and files..."); 
    
    generateAndDownloadPDF(formData, uploadedFiles, signatureData);

    // Очищаем хранилища браузера
    localStorage.clear();
    sessionStorage.clear();
    
    // ВАЖНО: Очищаем React State (данные формы)
    if (resetFormData) {
        resetFormData();
    }

    // Восстанавливаем тему
    if (currentTheme) {
        localStorage.setItem('theme', currentTheme);
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    setUploadedFiles({});
    
    setStep(13);
  }

  const handleRestart = () => {
     // Дополнительная перестраховка при рестарте
     if (resetFormData) resetFormData();
     localStorage.clear();
     sessionStorage.clear();
     setStep(0);
  };

  return (
    <div className='app'>
      {/* ... (ВЕСЬ ОСТАЛЬНОЙ КОД APP.JSX ОСТАЕТСЯ БЕЗ ИЗМЕНЕНИЙ) ... */}
      <header className='main-header'>
        <h1 className='logo'>Prozesskostenhilfe</h1>
        <ThemeToggle />
      </header>

      <main className='content'>
        <div className='layout-wrapper'>
          {step > 0 && step < 13 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ProgressBar
                progress={globalProgress}
                steps={milestones}
                currentStep={step}
              />
            </motion.div>
          )}

          <AnimatePresence mode='wait'>
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            >
              {step === 0 && <FormIntro onNext={() => setStep(1)} />}
              
              {step === 1 && <SectionA data={formData.sectionA} onChange={(f, v) => updateData('sectionA', f, v)} onBack={() => setStep(0)} onNext={() => setStep(2)} />}
              {step === 2 && <SectionB data={formData.sectionB} onChange={(f, v) => updateData('sectionB', f, v)} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
              {step === 3 && <SectionC data={formData.sectionC} onChange={(f, v) => updateData('sectionC', f, v)} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
              {step === 4 && <SectionD data={formData.sectionD} onChange={(f, v) => updateData('sectionD', f, v)} onBack={() => setStep(3)} onNext={() => setStep(5)} />}
              {step === 5 && <SectionE data={formData.sectionE} onChange={(f, v) => updateData('sectionE', f, v)} onBack={() => setStep(4)} onNext={() => setStep(6)} setStep={setStep} />}
              {step === 6 && <SectionF data={formData.sectionF} onChange={(f, v) => updateData('sectionF', f, v)} onBack={() => setStep(5)} onNext={() => setStep(7)} />}
              {step === 7 && <SectionG data={formData.sectionG} onChange={(f, v) => updateData('sectionG', f, v)} onBack={() => setStep(6)} onNext={() => setStep(8)} />}
              {step === 8 && <SectionH data={formData.sectionH} onChange={(f, v) => updateData('sectionH', f, v)} onBack={() => setStep(7)} onNext={() => setStep(9)} />}
              {step === 9 && <SectionI data={formData.sectionI} onChange={(f, v) => updateData('sectionI', f, v)} onBack={() => setStep(8)} onNext={() => setStep(10)} />}
              {step === 10 && <SectionJ data={formData.sectionJ} onChange={(f, v) => updateData('sectionJ', f, v)} onBack={() => setStep(9)} onNext={() => setStep(11)} />}

              {step === 11 && (
                <SectionL 
                  formData={formData} 
                  files={uploadedFiles}      
                  setFiles={setUploadedFiles}
                  onBack={() => formData.sectionE.receivesSocialAssistanceSGBXII === 'yes' ? setStep(5) : setStep(10)} 
                  onNext={() => setStep(12)} 
                />
              )}

              {step === 12 && (
                <SectionK 
                  data={formData.sectionK} 
                  onChange={(f, v) => updateData('sectionK', f, v)} 
                  onBack={() => setStep(11)} 
                  onFinish={handleDownload} 
                />
              )}

              {step === 13 && (
                <div className='section-card finish-card'>
                  <h2 className='section-title'>Fertig!</h2>
                  <p>Ihr Antrag wurde erfolgreich generiert und heruntergeladen.</p>
                  <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                    Ihre persönlichen Daten wurden aus Sicherheitsgründen vollständig aus dem Speicher Ihres Browsers gelöscht.
Bitte überprüfen Sie Ihre Downloads.
                  </p>
                  <div className='button-group' style={{marginTop: '25px'}}>
                    <button className='btn-primary-action' onClick={handleRestart}>
                        Neuen Antrag starten
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default App