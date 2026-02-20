export const incomeMap = {
  nichtselbstaendig: { 
    search: 'durch nichtselbständige Arbeit',
    self:    { ja: 'E2', nein: 'E1' },
    partner: { ja: 'E28', nein: 'E27' }
  },
  selbstaendig: { 
    search: 'durch selbständige Arbeit',
    self:    { ja: 'E4', nein: 'E3' }, 
    partner: { ja: 'E30', nein: 'E29' }
  },
  vermietung: { 
    search: 'durch Vermietung',
    self:    { ja: 'E6', nein: 'E5' }, 
    partner: { ja: 'E32', nein: 'E31' }
  },
  kapital: { 
    search: 'durch Kapitalvermögen',
    self:    { ja: 'E8', nein: 'E7' }, 
    partner: { ja: 'E34', nein: 'E33' }
  },
  kindergeld: { 
    search: 'durch Kindergeld',
    self:    { ja: 'E10', nein: 'E9' }, 
    partner: { ja: 'E36', nein: 'E35' }
  },
  wohngeld: { 
    search: 'durch Wohngeld',
    self:    { ja: 'E12', nein: 'E11' }, 
    partner: { ja: 'E38', nein: 'E37' }
  },
  unterhalt: { 
    search: 'durch Unterhalt',
    self:    { ja: 'E14', nein: 'E13' }, 
    partner: { ja: 'E40', nein: 'E39' }
  },
  rente: { 
    search: 'durch Rente',
    self:    { ja: 'E16', nein: 'E15' }, 
    partner: { ja: 'E42', nein: 'E41' }
  },
  arbeitslosengeld: { 
    search: 'durch Arbeitslosengeld',
    self:    { ja: 'E18', nein: 'E17' }, 
    partner: { ja: 'E44', nein: 'E43' }
  },
  buergergeld: { 
    search: 'durch Bürgergeld',
    self:    { ja: 'E20', nein: 'E19' }, 
    partner: { ja: 'E46', nein: 'E45' }
  },
  krankengeld: { 
    search: 'durch Krankengeld',
    self:    { ja: 'E22', nein: 'E21' }, 
    partner: { ja: 'E48', nein: 'E47' }
  },
  elterngeld: { 
    search: 'durch Elterngeld',
    self:    { ja: 'E24', nein: 'E23' }, 
    partner: { ja: 'E50', nein: 'E49' }
  }
};

export const deductionMap = {
  steuern: {
    self: {
      desc: "Steuern/Solidarzuschlag",
      amount: "Monatliche Abzüge in Euro durch Steuern/Solidaritätszuschlag",
      beleg: "Belegnummer F1"
    },
    partner: {
      desc: "Steuern/Solidarzuschlag Partner/Partnerin",
      amount: "Monatliche Abzüge in Euro durch Steuern/Solidaritätszuschlag Partner/Partnerin",
      beleg: "Belegnummer F6"
    }
  },
  sozialvers: {
    self: {
      desc: "Sozialversicherungsbeiträge",
      amount: "Monatliche Abzüge in Euro durch Sozialversicherungsbeiträge",
      beleg: "Belegnummer F2"
    },
    partner: {
      desc: "Sozialversicherungsbeiträge Partner/Partnerin",
      amount: "Monatliche Abzüge in Euro durch Sozialversicherungsbeiträge Partner/Partnerin",
      beleg: "Belegnummer F7"
    }
  },
  sonstigevers: {
    self: {
      desc: "Sonstige Versicherungen",
      amount: "Monatliche Abzüge in Euro durch Sonstige Versicherungen",
      beleg: "Belegnummer F3"
    },
    partner: {
      desc: "Sonstige Versicherungen Partner/Partnerin",
      amount: "Monatliche Abzüge in Euro durch Sonstige Versicherungen Partner/Partnerin",
      beleg: "Belegnummer F8"
    }
  },
  fahrt: {
    self: {
      desc: "Fahrt zur Arbeit (Kosten für öffentliche Verkehrsmittel oder einfache Entfernung bei KFZ-Nutzung)",
      amount: "Monatliche Abzüge in Euro durch Fahrtkosten",
      beleg: "Belegnummer F4"
    },
    partner: {
      desc: "Fahrt zur Arbeit (Kosten für öffentliche Verkehrsmittel oder einfache Entfernung bei KFZ-Nutzung) Pa",
      amount: "Monatliche Abzüge in Euro durch Fahrtkosten Partner/Partnerin",
      beleg: "Belegnummer F9"
    }
  },
  werbungskosten: {
    self: {
      desc: "Sonstige Werbungskosten/Betriebsausgaben",
      amount: "Monatliche Abzüge in Euro durch Sonstige Werbungskosten/Betriebsausgaben",
      beleg: "Belegnummer F5"
    },
    partner: {
      desc: "Sonstige Werbungskosten/Betriebsausgaben Partner/Partnerin",
      amount: "Monatliche Abzüge in Euro durch Sonstige Werbungskosten/Betriebsausgaben Partner/Partnerin",
      beleg: "Belegnummer F10"
    }
  }
};

export const assetsMap = {
  bankAccounts: {
    nein: 'G1',
    ja: 'G2',
    desc: 'Art des Kontos, Kontoinhaber, Kreditinstitut',
    val: 'Kontostand'
  },
  realEstate: {
    nein: 'G3',
    ja: 'G4',
    desc: 'Größe, Anschrift/Grundbuchbezeichnung, Allein- oder Miteigentum, Zahl der Wohneinheiten ',
    val: 'Verkehrswert Grundeigentum'
  },
  vehicles: {
    nein: 'G5',
    ja: 'G6',
    desc: 'Marke, Typ, Baujahr, Anschaffungsjahr, Allein- oder Miteigentum, Kilometerstand ',
    val: 'Verkehrswert Kfz'
  },
  cash: {
    nein: 'G7',
    ja: 'G8',
    desc: 'Bargeldbetrag in EUR, Bezeichnung der Wertgegenstände, Allein- oder Miteigentum ',
    val: 'Verkehrswert Bargeld'
  },
  lifeInsurance: {
    nein: 'G9',
    ja: 'G10',
    desc: 'Versicherung, Versicherungsnehmer, Datum des Vertrages/Handelt es sich um eine zusätzliche Altersvor',
    val: 'Rückkaufswert '
  },
  otherAssets: {
    nein: 'G11',
    ja: 'G12',
    desc: 'Bezeichnung, Allein- oder Miteigentum ',
    val: 'Verkehrswert sonstige Vermögenswerte'
  }
};

export const housingMap = {
  general: {
    space: "1. Gesamtgröße des Wohnraums, den Sie allein oder gemeinsam mit anderen Personen bewohnen",
    rooms: "2. Zahl der Zimmer",
    people: "3. Anzahl der Personen, die den Wohnraum insgesamt bewohnen"
  },
  tenant: {
    checkbox: { ja: "H2", nein: "H1" }, 
    rentCold: "Wohnkosten als Mieter/Mieterin - Miete ohne Nebenkosten", 
    heating: "Wohnkosten als Mieter/Mieterin - Heizungskosten", 
    other: "Wohnkosten als Mieter/Mieterin - übrige Nebenkosten",
    total: "Gesamtbetrag als Mieter/Mieterin", 
    share: "Ich allein zahle davon als Mieter/Mieterin" 
  },
  owner: {
    checkbox: { ja: "H4", nein: "H3" }, 
    interest: "Kosten als Eigentümer/Eigentümerin - Zinsen und Tilgung", 
    heating: "Kosten als Eigentümer/Eigentümerin - Heizungskosten",
    other: "Kosten als Eigentümer/Eigentümerin - übrige Nebenkosten", 
    total: "Gesamtbetrag als Eigentümer/Eigentümerin", 
    share: "Ich allein zahle davon als Eigentümer/Eigentümerin", 
    
    details: "Genaue Einzelangaben zu der Belastung aus Fremdmitteln bei Nutzung als (Mit-)Eigentümer usw 1",
    
    restschuld1: "Restschuld in Euro 1 H", 
    restschuld2: "Restschuld in Euro 2 H",
    
    rate1: "Zinsen und Tilgung mtl. 1",
    rate2: "Zinsen und Tilgung mtl. 2"
  }
};

export const obligationsMap = [

  {
    desc: "Sonstige Zahlungsverpflichtungen 1",
    debt: "Restschuld in Euro 1", 
    rate: "Gesamtbelastung mtl. 1",
    share: "Ich allein zahle davon (sonstige Zahlungsverpflichtungen) 1"
  },
  {
    desc: "Sonstige Zahlungsverpflichtungen 2",
    debt: "Restschuld in Euro 2",
    rate: "Gesamtbelastung mtl. 2",
    share: "Ich allein zahle davon (sonstige Zahlungsverpflichtungen) 2"
  },
  {
    desc: "Sonstige Zahlungsverpflichtungen 3",
    debt: "Restschuld in Euro 3",
    rate: "Gesamtbelastung mtl. 3",
    share: "Ich allein zahle davon (sonstige Zahlungsverpflichtungen) 3"
  }
];

export const specialLoadsMap = [
  {
    desc: "Besondere Belastungen 1",
    amount: "Ich allein zahle davon (besondere Belastungen) 1"
  },
  {
    desc: "Besondere Belastungen 2",
    amount: "Ich allein zahle davon (besondere Belastungen) 2"
  }
];

export const declarationMap = {
  locationDate: "Ort, Datum",
  signature: "Unterschrift der Partei oder Person, die sie gesetzlich vertritt" 
};