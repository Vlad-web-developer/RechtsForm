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