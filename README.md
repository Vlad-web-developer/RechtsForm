# RechtsForm - Prozesskostenhilfe (PKH) Wizard

**RechtsForm** ist eine spezialisierte, interaktive React-Anwendung, die Antragsteller beim Ausfüllen des Formulars für Prozesskostenhilfe (PKH) unterstützt. Die Architektur ist strikt **Local-First** (Zero-Knowledge) aufgebaut, um höchsten Datenschutzanforderungen für sensible Finanz- und Personendaten gerecht zu werden.

---

## 📋 Inhaltsverzeichnis

1. [Projektübersicht & Tech Stack](#projektübersicht--tech-stack)
2. [Architektur & Datenfluss](#architektur--datenfluss)
3. [Funktionsumfang & Formular-Sektionen](#funktionsumfang--formular-sektionen)
4. [Datenschutz & Sicherheit (Privacy by Design)](#datenschutz--sicherheit-privacy-by-design)
5. [PDF-Generierung & Mapping](#pdf-generierung--mapping)
6. [Styling & UI-Konzept](#styling--ui-konzept)
7. [Installation & Lokale Entwicklung](#installation--lokale-entwicklung)
8. [Erweiterung des Projekts (Developer Guide)](#erweiterung-des-projekts-developer-guide)

---

## 🛠 Projektübersicht & Tech Stack

Die Anwendung verzichtet bewusst auf ein Backend zur Datenverarbeitung. Alle Eingaben, Dateianhänge und die finale PDF-Erstellung erfolgen direkt im Browser.

- **Core-Framework**: React 18 (Bootstrapped via `create-react-app`)
- **State Management**: React Hooks (`useFormData` für den zentralen State-Store, Local Storage für Persistenz)
- **PDF Processing**: `pdf-lib` für das client-seitige Auslesen, Zusammenführen und Befüllen des Behörden-PDFs
- **UI & Animation**: `framer-motion` für weiche Übergänge zwischen den Formularschritten
- **Interaktive Komponenten**:
  - `react-datepicker` & `date-fns` für Datumsfelder
  - `react-phone-input-2` für internationale Rufnummern
  - `react-signature-canvas` für die digitale Unterschrift direkt im Browser
- **Icons**: `lucide-react`

---

## 🏗 Architektur & Datenfluss

Die App nutzt einen unidirektionalen Datenfluss mit einem zentralisierten Hook (`useFormData`), um das komplexe Formular-State-Objekt zu mutieren.

1.  **Central Store (`useFormData`)**:
    Das gesamte Formular (Section A - K) wird als verschachteltes JSON-Objekt gepflegt. Die Funktion `updateData(section, field, value)` übernimmt partielle Updates und synchronisiert den Status fortlaufend mit dem `localStorage` des Browsers.
2.  **Progress Management (`useFormProgress`)**:
    Überwacht Pflichtfelder in Echtzeit und berechnet den globalen Fortschritt, dargestellt in der `ProgressBar.jsx`.
3.  **App Controller (`App.js`)**:
    Steuert das Routing zwischen den `step`-Indices, lädt Animationen via `<AnimatePresence>` und initialisiert nach Fertigstellung den Download- sowie Löschprozess.

---

## 🚀 Funktionsumfang & Formular-Sektionen

Die Anwendung ist in logische Sektionen (A bis L) unterteilt, welche sich den offiziellen Formularkategorien der Justiz anpassen:

- **Section A (Person)**: Stammdaten mit dynamischer Rufnummernformatierung und Validierung.
- **Section E (Einnahmen)**: Komplexer Sub-Wizard. Bezieht der Nutzer SGB XII, werden irrelevante Folgefragen (Partner-Einkommen etc.) intelligent übersprungen und der Wizard verkürzt.
- **Section H (Wohnkosten)**: Dynamische Render-Logik, die zwischen Mieter (Kaltmiete, Nebenkosten) und Eigentümer (Zinsen, Tilgung, Raten) unterscheidet.
- **Section K (Abschließende Erklärung & Unterschrift)**:
  - Erlaubt die **digitale Unterschrift** via Touch/Maus auf dem HTML5-Canvas (`react-signature-canvas`).
  - Alternativ kann eine Unterschrift als Bild (JPG/PNG) hochgeladen werden.
- **Section L (Belege & Anhänge)**:
  - Ermittelt automatisch basierend auf den vorherigen Eingaben (z.B. "Besitzt Lebensversicherung?"), welche Dokumente zwingend hochgeladen werden müssen.
  - Strikte Validierung: Max. 10 MB pro Datei, nur `PDF`, `JPG`, `PNG`.
  - Drag-and-Drop Unterstützung.

---

## 🔒 Datenschutz & Sicherheit (Privacy by Design)

Dieses Projekt erfasst hochsensible, persönliche Daten. Daher wurden folgende Zero-Knowledge- und Datensparsamkeits-Prinzipien strikt implementiert:

1.  **100% Client-Side Processing**: Es findet keine Netzwerkkommunikation mit einem Server statt. Weder Eingaben noch hochgeladene Einkommensnachweise verlassen das Endgerät.
2.  **Ephemere Datenhaltung (Auto-Clear)**: Der `localStorage` dient ausschließlich dem Verhindern von Datenverlust bei Verbindungsabbruch oder Page-Reload. Beim Klick auf "Fertigstellen & PDF laden" wird ein **Deep Clean** (`localStorage.clear()`, `sessionStorage.clear()`) erzwungen, und der Arbeitsspeicher wird geleert.
3.  **Lokales Dokumenten-Merging**: Hochgeladene Beweisdokumente werden direkt im Speicher (`ArrayBuffer`) in das PDF-generierte Enddokument eingebettet.

---

## 📄 PDF-Generierung & Mapping

Zuständig ist `src/utils/pdfGenerator.js` in Verbindung mit dem `src/utils/pdf/` Verzeichnis.

1.  **Template Load**: Das leere amtliche Formular (`public/formular.pdf`) wird als Base-Array eingelesen.
2.  **Data Mapping**: Konstanten in `pdfMappings.js` ordnen den State des React-Wizards eindeutig den Namen der AcroForm-Felder im PDF zu. Die Funktionen in `pdfFillers.js` befüllen Checkboxen und Textfelder.
3.  **File Merging**: Im Anschluss werden die in Section L gesammelten Dateien an das Base-PDF angehängt. Bilder (JPG/PNG) werden hierbei zentriert auf neu generierten PDF-Seiten gezeichnet. Eine digitale Unterschrift aus Section K wird über fest definierte Koordinaten (`width, height, x, y`) in das originale Unterschriftenfeld gezeichnet.
4.  **Blob Generation**: Das finale PDF wird im Speicher zusammengesetzt und via DOM-Element (`<a>` Download-Attribut) zur Verfügung gestellt.

---

## 🎨 Styling & UI-Konzept

Das UI ist auf bestmögliche Conversion und Accessibility ausgelegt.

- **Custom CSS Modules**: Natives CSS wird zur Isolierung von Styles genutzt (`SectionK.css`, `App.css`, `index.css`). Die von `create-react-app` gelieferte CSS-Architektur wurde beibehalten (Kein Material-UI verwendet).
- **Responsivität**: Grid/Stack-Layouts passen sich via Media Queries in `phone.css` automatisch an Mobile Devices an.
- **Dark Mode**: Ein integrierter `ThemeToggle` erlaubt den nahtlosen Wechsel zwischen einer klassischen hellen Ansicht und einem fokussierten Dark Mode, wobei Farbvariablen auf der `:root` Ebene (`--bg-color`, `--accent-color`) genutzt werden.

---

## 💻 Installation & Lokale Entwicklung

### Voraussetzungen

- **Node.js**: `v16.x` oder höher (empfohlen `v18+ LTS`)
- **npm** oder **yarn**

### Setup

```bash
# 1. Repository klonen
git clone <repository-url>
cd rechtsform

# 2. Abhängigkeiten installieren
npm install

# 3. Lokalen Entwicklungsserver starten (läuft auf http://localhost:3000)
npm start
```

### Build für Produktion

```bash
npm run build
```

Das statische, optimierte Build-Ergebnis liegt danach im Ordner `build/` und kann auf jedwedem statischen Webserver (Nginx, Netlify, Vercel) gehostet werden.

---

## 👨‍💻 Erweiterung des Projekts (Developer Guide)

### Hinzufügen einer neuen Formular-Sektion

Wenn Sie den Wizard um eine Sektion "M" erweitern möchten:

1.  **State erweitern**: Fügen Sie im Start-State (`src/hooks/useFormData.js`) ein neues Objekt `sectionM` ein.
2.  **Komponente bauen**: Erstellen Sie `src/components/SectionM.jsx` und leiten Sie Props ab: `data`, `onChange`, `onBack`, `onNext`.
3.  **Routing in App.js anpassen**:
    - Erhöhen Sie die Konditionen im Layout `<main>` (z.B. `step < 14`).
    - Fügen Sie `<SectionM>` beim passenden `step` innerhalb der `<AnimatePresence>` Verzweigung ein.
4.  **PDF-Mapping (`pdfMappings.js` & `pdfFillers.js`)**: Falls der Schritt neue Felder in das End-PDF schreibt, benennen Sie das Formtextfeld im Original-PDF und verlinken Sie es in der Mapping-Liste. Fügen Sie die Evaluierung in die entsprechende Filler-Methode ein.
5.  **Belege (`SectionL.jsx`)**: Falls der neue Schritt ebenfalls Belege erfordert, passen Sie die Logik in `getRequiredDocs()` an.
