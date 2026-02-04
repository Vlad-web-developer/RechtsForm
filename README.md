# RechtsForm - Developer Guide & Documentation

**RechtsForm** ist eine spezialisierte React-Anwendung, die Nutzer beim Ausfüllen des Formulars für Prozesskostenhilfe (PKH) unterstützt. Die Anwendung transformiert den komplexen behördlichen Vordruck in einen benutzerfreundlichen, interaktiven "Wizard" und generiert am Ende ein versandfertiges PDF.

---

## Inhaltsverzeichnis

1. [Projektübersicht & Stack](#projektübersicht--stack)
2. [Architektur & Datenfluss](#architektur--datenfluss)
3. [Datenmodell (State Management)](#datenmodell-state-management)
4. [Formular-Sektionen & Logik](#formular-sektionen--logik)
5. [PDF-Generierung (Mapping)](#pdf-generierung-mapping)
6. [Styling & UI](#styling--ui)
7. [Installation & Entwicklung](#installation--entwicklung)
8. [Projektstruktur](#projektstruktur)

---

## Projektübersicht & Stack

Das Projekt wurde mit `create-react-app` erstellt und verwendet moderne Web-Technologien:

- **Core**: React 18
- **Routing/State**: React Hooks (Custom Hooks für Formularlogik)
- **PDF Engine**: `pdf-lib` (Client-seitige PDF-Bearbeitung)
- **Animation**: `framer-motion` (Übergänge zwischen den Schritten)
- **Icons**: `lucide-react`
- **UI Components**:
  - `react-datepicker`: Datumsauswahl
  - `react-phone-input-2`: Telefonnummernformatierung
- **Persistenz**: `localStorage` (Automatisches Speichern des Fortschritts)

---

## Architektur & Datenfluss

Die Anwendung folgt einem einseitigen Datenfluss (Unidirectional Data Flow) mit einem zentralen State-Manager-Hook.

### 1. Central Store (`useFormData`)

Der gesamte Zustand des Formulars wird im Custom Hook `src/hooks/useFormData.js` verwaltet.

- **Initialisierung**: Lädt Daten aus dem `localStorage` (`appFormData`), falls vorhanden.
- **Update-Logik**: Die Funktion `updateData(section, field, value)` ermöglicht gezielte Updates einzelner Felder in tief verschachtelten Objekten.
- **Persistenz**: Ein `useEffect` synchronisiert jede Änderung sofort mit dem LocalStorage.

### 2. Progress Management (`useFormProgress`)

Berechnet den globalen Fortschritt basierend auf ausgefüllten Pflichtfeldern.

- Definiert "Meilensteine" für jeden Schritt (0-100%).
- Visualisierung durch die Komponente `ProgressBar.jsx`.

### 3. App-Komponente (`App.js`)

Dient als Controller:

- Hält den aktuellen Schritt-Index (`step`).
- Entscheidet, welche `Section`-Komponente gerendert wird.
- Verwaltet Animations-Übergänge via `AnimatePresence`.

---

## Datenmodell (State Management)

Das Datenmodell ist ein großes JSON-Objekt, unterteilt in die Sektionen A bis K.

### Struktur des `formData` Objekts:

```javascript
{
  sectionA: { // Persönliche Angaben
    fullName: String,
    occupation: String,
    birthday: String, // Format: DD.MM.YYYY
    maritalStatus: String,
    address: String,
    phone: String,
    legalRepresentative: String
  },
  sectionB: { // Rechtsschutzversicherung
    hasInsurance: 'yes' | 'no' | null,
    insuranceDetails: String,
    hasPotentialInsurance: 'yes' | 'no' | null, // z.B. Vereine/Gewerkschaft
    potentialInsuranceDetails: String
  },
  sectionC: { // Unterhaltsanspruch
    hasMaintenanceClaims: 'yes' | 'no' | null,
    maintenancePersonDetails: String
  },
  sectionD: { // Angehörige
    hasDependents: 'yes' | 'no' | null,
    dependents: [ // Array von Objekten
      { name, birthday, relationship, monthlyAmount, hasOwnIncome, incomeAmount }
    ]
  },
  sectionE: { // Einnahmen (Komplex)
    receivesSocialAssistanceSGBXII: 'yes' | 'no' | null, // Wenn 'yes' -> Sprung zu K
    hasPartner: 'yes' | 'no' | null,
    self: { ...IncomeCategories },    // siehe unten
    partner: { ...IncomeCategories }  // siehe unten
  },
  sectionF: { // Abzüge
    self: { steuern, sozialvers, ... },
    partner: { steuern, sozialvers, ... }
  },
  sectionG: { // Vermögen
    bankAccounts: { has, description, value },
    realEstate: { has, description, value },
    // ... weitere Vermögenswerte
  },
  sectionH: { // Wohnkosten
    livingSpace: String,
    numberOfRooms: String,
    totalPeople: String,
    housingType: 'tenant' | 'owner',
    // Miet- oder Eigentumsfelder abhängig von housingType
    rentCold: String,
    loans: [] // Nur bei Eigentümern
  },
  sectionI: { // Zahlungsverpflichtungen
    hasObligations: 'yes' | 'no' | null,
    obligations: []
  },
  sectionJ: { // Besondere Belastungen
    hasSpecialLoads: 'yes' | 'no' | null,
    loads: []
  },
  sectionK: { // Abschluss
    location: String,
    date: String
  }
}
```

---

## Formular-Sektionen & Logik

Jede Sektion ist eine eigene React-Komponente (`src/components/SectionX.jsx`).

### Sektion A (Person)

- **Validierung**: Regex-Prüfung für Namen, Pflichtfelder.
- **Besonderheit**: Nutzt `react-phone-input-2` für internationale Nummernformate.

### Sektion E (Einnahmen)

Dies ist die komplexeste Sektion. Sie enthält einen **internen Sub-Wizard** (Steps 0-3):

1.  **SGB XII Check**: Bezieht der Nutzer Sozialhilfe nach SGB XII?
    - **JA**: Alle Einkommens-/Vermögensfragen entfallen. Der User wird direkt zu Sektion K geleitet.
    - **NEIN**: Weiter zu Einkommensfragen.
2.  **Einkommen Selbst**: Detaillierte Liste (Lohn, Rente, Kindergeld etc.).
3.  **Partner Check**: Gibt es einen Ehegatten/Partner?
    - **JA**: Sub-Step zur Erfassung der Partner-Einkommen wird aktiviert.
    - **NEIN**: Partner-Einkommen wird übersprungen.

### Sektion H (Wohnkosten)

- Unterscheidet dynamisch zwischen **Mieter** und **Eigentümer**.
- Zeigt je nach Auswahl (`housingType`) komplett unterschiedliche Eingabefelder an (Kaltmiete vs. Zinsen/Tilgung).

### Sektion L (Belege & Anhänge) [NEU]

Eine neue Komponente (`src/components/SectionL.jsx`) ermöglicht das Hinzufügen von Nachweisen.

- **Intelligente Anforderungslogik**: Das System prüft basierend auf den vorherigen Eingaben (z.B. "Haben Sie Kinder?", "Beziehen Sie SGB XII?"), welche Belege _zwingend_ erforderlich sind.
- **Drag & Drop**: Intuitive Oberfläche zum Hochladen von Dateien.
- **Client-Side Merging**: Hochgeladene Bilder (JPG/PNG) und PDFs werden mittels `pdf-lib` direkt im Browser in das finale Antrags-PDF eingebettet. Es findet kein Server-Upload statt.

---

## Datenschutz & Sicherheit

Sicherheit und Datenschutz stehen im Kern der Architektur. Da es sich um sensible persönliche und wirtschaftliche Daten handelt, wurde die App nach dem **Privacy-by-Design** Prinzip entwickelt.

### 1. Zero-Knowledge / Local-Only

- **Kein Backend**: Es gibt keinen Server, der Formulardaten empfängt oder speichert. Die gesamte Verarbeitung findet im Browser des Nutzers statt.
- **Lokale PDF-Generierung**: Das PDF wird lokal generiert. Selbst die angehängten Belege (Gehaltsnachweise, Mietverträge) verlassen nie das Gerät des Nutzers.

### 2. Daten-Sparsamkeit

- **Auto-Clear**: Sobald das PDF erfolgreich generiert und heruntergeladen wurde, initiiert die App einen "Deep Clean". Alle Formulardaten werden sofort aus dem `localStorage` und dem Arbeitsspeicher gelöscht.
- **Persistenz nur für UX**: Die Zwischenspeicherung im `localStorage` dient ausschließlich der Nutzerfreundlichkeit (Verhindern von Datenverlust bei versehentlichem Neuladen) und ist temporär.

### 3. Transparenz

- Vor Beginn wird der Nutzer explizit auf die lokale Verarbeitung hingewiesen.
- In Sektion L wird durch visuelle Indikatoren (Privacy Shield Icon) erneut bestätigt, dass kein Upload stattfindet.

---

## PDF-Generierung (Mapping)

Die PDF-Erstellung erfolgt im Browser (Client-Side) ohne Server-Backend.

**Dateien**: `src/utils/pdfGenerator.js` und `src/utils/pdf/`

### Workflow:

1.  **Template laden**: Lädt `public/formular.pdf`.
2.  **Formularfelder lesen**: `pdf-lib` analysiert die PDF-Struktur.
3.  **Mapping ausführen**:
    - `src/utils/pdf/pdfMappings.js`: Definiert Konstanten, welches Datenfeld welchem PDF-Feldnamen entspricht.
    - `src/utils/pdf/pdfFillers.js`: Enthält Funktionen (`fillIncomeData`, `fillAssetsData` etc.), die die Logik zur Befüllung implementieren.
4.  **Anhänge verarbeiten (Neu)**:
    - Iteriert über alle in Sektion L hochgeladenen Dateien.
    - **PDFs**: Werden Seite für Seite an das Hauptdokument angehängt.
    - **Bilder**: Werden automatisch skaliert und zentriert auf neuen Seiten platziert.
5.  **Download**: Der Blob wird direkt zum Download angeboten.

---

## Styling & UI

Das Projekt verwendet natives CSS in einer modularen Struktur.

- **Global**: `src/css/index.css` (Variablen, Resets, Typografie).
- **Komponenten**: Jede Sektion hat eine eigene CSS-Datei (z.B. `src/css/SectionE.css`).
- **Responsivität**:
  - `src/css/phone.css`: Spezielle Anpassungen für mobile Geräte.
  - Media Queries sorgen für Layout-Anpassungen (Grid zu Stack).
- **Themes**: Ein `ThemeToggle` erlaubt Umschalten zwischen Themes (Startet im Dark Mode mit Neon-Akzenten).

---

## Installation & Entwicklung

### Voraussetzungen

- Node.js (v16 oder höher empfohlen)
- npm

### Setup

```bash
# Repository klonen
git clone <repo-url>

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm start
```

Die App läuft unter `http://localhost:3000`.

### Build

```bash
npm run build
```

Erzeugt einen optimierten Production-Build im `build/` Ordner.

---

## Projektstruktur

```
src/
├── app/
│   └── App.js              # Hauptkomponente & Step-Routing-Logik
├── components/
│   ├── common/             # Wiederverwendbare UI-Elemente
│   │   ├── DateInput.jsx   # Datumswähler Wrapper
│   │   └── NumberInput.jsx # Input für Währungsbeträge
│   ├── SectionA.jsx bis SectionL.jsx  # Die einzelnen Formularschritte (inkl. Upload)
│   ├── FormIntro.jsx       # Startseite mit Datenschutz-Consent
│   ├── ProgressBar.jsx     # Fortschrittsanzeige
│   └── ThemeToggle.jsx     # Dark/Light Mode Switch
├── css/
│   ├── App.css             # Layout-Container Styles
│   ├── index.css           # Globale Styles & Variablen
│   ├── phone.css           # Mobile Overrides
│   └── Section*.css        # Sektionsspezifische Styles
├── hooks/
│   ├── useFormData.js      # Zentraler State & LocalStorage Logic
│   ├── useFormProgress.js  # Fortschrittsberechnung
│   └── useSectionValidation.js # Validierungslogik
├── utils/
│   ├── pdfGenerator.js     # Hauptfunktion PDF-Erstellung & File Merging
│   └── pdf/
│       ├── pdfFillers.js   # Logik zum Befüllen der PDF-Felder
│       ├── pdfHelpers.js   # Helper (SetCheckbox etc.)
│       └── pdfMappings.js  # Mapping-Tabellen (Daten -> PDF Feldnamen)
└── index.js                # React Entry Point
```
