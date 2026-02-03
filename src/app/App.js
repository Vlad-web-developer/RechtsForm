import { AnimatePresence, motion } from 'framer-motion'

import FormIntro from '../components/FormIntro.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import SectionA from '../components/SectionA.jsx'
import SectionB from '../components/SectionB.jsx'
import SectionC from '../components/SectionC.jsx'
import SectionD from '../components/SectionD.jsx'
import SectionE from '../components/SectionE.jsx'
import SectionF from '../components/SectionF.jsx'
import SectionG from '../components/SectionG.jsx'
import SectionH from '../components/SectionH.jsx'
import SectionI from '../components/SectionI.jsx'
import SectionJ from '../components/SectionJ.jsx'
import SectionK from '../components/SectionK.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'

import '../css/App.css'
import '../css/index.css'

import { useFormData } from '../hooks/useFormData'
import { useFormProgress } from '../hooks/useFormProgress'
import { generateAndDownloadPDF } from '../utils/pdfGenerator'

function App() {
  const { step, setStep, formData, updateData } = useFormData()
  const { globalProgress, milestones } = useFormProgress(formData)

  const handleDownload = () => {
    generateAndDownloadPDF(formData)
  }

  return (
    <div className='app'>
      <header className='main-header'>
        <h1 className='logo'>
         Prozesskostenhilfe
        </h1>
        <ThemeToggle />
      </header>

      <main className='content'>
        <div className='layout-wrapper'>
          {}
          {step > 0 && (
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

          {}
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

              {step === 1 && (
                <SectionA
                  data={formData.sectionA}
                  onChange={(field, value) => updateData('sectionA', field, value)}
                  onBack={() => setStep(0)}
                  onNext={() => setStep(2)}
                />
              )}

              {step === 2 && (
                <SectionB
                  data={formData.sectionB}
                  onChange={(field, value) => updateData('sectionB', field, value)}
                  onBack={() => setStep(1)}
                  onNext={() => setStep(3)}
                />
              )}

              {step === 3 && (
                <SectionC
                  data={formData.sectionC}
                  onChange={(field, value) => updateData('sectionC', field, value)}
                  onBack={() => setStep(2)}
                  onNext={() => setStep(4)}
                />
              )}

              {step === 4 && (
                <SectionD
                  data={formData.sectionD}
                  onChange={(field, value) => updateData('sectionD', field, value)}
                  onBack={() => setStep(3)}
                  onNext={() => setStep(5)}
                />
              )}

              {step === 5 && (
                <SectionE
                  data={formData.sectionE}
                  onChange={(field, value) => updateData('sectionE', field, value)}
                  onBack={() => setStep(4)}
                  onNext={() => setStep(6)}
                  setStep={setStep}
                />
              )}

              {step === 6 && (
                <SectionF
                  data={formData.sectionF}
                  onChange={(field, value) => updateData('sectionF', field, value)}
                  onBack={() => setStep(5)}
                  onNext={() => setStep(7)}
                  hasPartner={formData.sectionE.hasPartner}
                />
              )}

              {step === 7 && (
                <SectionG
                  data={formData.sectionG}
                  onChange={(field, value) => updateData('sectionG', field, value)}
                  onBack={() => setStep(6)}
                  onNext={() => setStep(8)}
                />
              )}

              {step === 8 && (
                <SectionH
                  data={formData.sectionH}
                  onChange={(field, value) => updateData('sectionH', field, value)}
                  onBack={() => setStep(7)}
                  onNext={() => setStep(9)}
                />
              )}

              {step === 9 && (
                <SectionI
                  data={formData.sectionI}
                  onChange={(field, value) => updateData('sectionI', field, value)}
                  onBack={() => setStep(8)}
                  onNext={() => setStep(10)}
                />
              )}

              {step === 10 && (
                <SectionJ
                  data={formData.sectionJ}
                  onChange={(field, value) => updateData('sectionJ', field, value)}
                  onBack={() => setStep(9)}
                  onNext={() => setStep(11)}
                />
              )}

              {step === 11 && (
                <SectionK
                  data={formData.sectionK}
                  onChange={(field, value) => updateData('sectionK', field, value)}
                  onBack={() => setStep(10)}
                  onFinish={handleDownload}
                />
              )}

              {step === 12 && (
                <div className='section-card'>
                  <h3>Fertig!</h3>
                  <p>
                    Alle Abschnitte sind ausgefüllt oder gemäß Ihren Angaben übersprungen (SGB XII).
                  </p>
                  <p>
                    Bitte vergessen Sie nicht, Ort und Datum auf dem ausgedruckten Formular zu ergänzen.
                  </p>
                  <div className='button-group'>
                    <button className='btn-primary' onClick={handleDownload}>
                      PDF Herunterladen
                    </button>
                    <button className='btn-secondary' onClick={() => setStep(5)}>
                      Zurück
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


