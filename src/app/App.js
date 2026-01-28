import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle.jsx';
import FormIntro from '../components/FormIntro.jsx';
import SectionA from '../components/SectionA.jsx';
import SectionB from '../components/SectionB.jsx';
import SectionC from '../components/SectionC.jsx';
import SectionD from '../components/SectionD.jsx'; 
import SectionE from '../components/SectionE.jsx';
import SectionF from '../components/SectionF.jsx'; 
import SectionG from '../components/SectionG.jsx'; // <--- 1. Импорт SectionG
import ProgressBar from '../components/ProgressBar.jsx';
import { useFormData } from '../hooks/useFormData'; 
import { useFormProgress } from '../hooks/useFormProgress'; 
import { generateAndDownloadPDF } from '../utils/pdfGenerator'; 
import '../css/index.css';
import '../css/App.css';

function App() {
  const { step, setStep, formData, updateData } = useFormData();
  
  const { globalProgress, milestones } = useFormProgress(formData);

  const handleDownload = () => {
    generateAndDownloadPDF(formData);
  };

  return (
    <div className="App">
      <header className="main-header">
        <h1 className="logo">Rechts<span>Form</span></h1>
        <ThemeToggle />
      </header>
      
      <main className="content">
        <div className="layout-wrapper">
          
          {step > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ProgressBar progress={globalProgress} steps={milestones} />
            </motion.div>
          )}

          <AnimatePresence mode="wait">
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

              {/* --- 2. Добавлен SectionG на шаг 7 --- */}
{step === 7 && (
  <SectionG 
    data={formData.sectionG} 
    onChange={(field, value) => updateData('sectionG', field, value)}
    onBack={() => setStep(6)} 
    onNext={() => setStep(8)} 
  />
)}

              {/* --- 3. Финиш сдвинут на шаг 8 --- */}
              {step === 8 && (
                 <div className="section-card">
                    <h3>Fertig! (100%)</h3>
                    <p>Alle Abschnitte sind ausgefüllt. Bitte überprüfen Sie Ihre Daten vor dem Herunterladen.</p>
                    <div className="button-group">
                      <button className="btn-primary" onClick={handleDownload}>PDF Herunterladen</button>
                      <button className="btn-secondary" onClick={() => setStep(7)}>Zurück</button>
                    </div>
                 </div>
              )}

              {step === 11 && (
                <div className="section-card">
                  <h3>Fertig!</h3>
                  <p>Alle Abschnitte sind ausgefüllt oder gemäß Ihren Angaben übersprungen (SGB XII).</p>
                  <div className="button-group">
                    <button className="btn-primary" onClick={handleDownload}>PDF Herunterladen</button>
                    <button className="btn-secondary" onClick={() => setStep(5)}>Zurück</button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div> 
      </main>
    </div>
  );
}

export default App;