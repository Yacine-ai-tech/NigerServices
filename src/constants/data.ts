// Emergency contacts for Niger
export const EMERGENCY_CONTACTS = [
  {
    id: '1',
    name: 'Police Secours',
    number: '17',
    description: 'Police nationale du Niger',
    icon: 'shield-checkmark',
    category: 'security',
  },
  {
    id: '2',
    name: 'Pompiers',
    number: '18',
    description: 'Sapeurs-pompiers',
    icon: 'flame',
    category: 'emergency',
  },
  {
    id: '3',
    name: 'SAMU',
    number: '15',
    description: 'Service d\'aide médicale urgente',
    icon: 'medical',
    category: 'medical',
  },
  {
    id: '4',
    name: 'Gendarmerie',
    number: '20 72 23 52',
    description: 'Gendarmerie nationale',
    icon: 'shield',
    category: 'security',
  },
  {
    id: '5',
    name: 'Hôpital National',
    number: '20 72 25 21',
    description: 'Hôpital National de Niamey',
    icon: 'business',
    category: 'medical',
  },
  {
    id: '6',
    name: 'Hôpital National Lamordé',
    number: '20 72 26 43',
    description: 'Centre hospitalier',
    icon: 'business',
    category: 'medical',
  },
  {
    id: '7',
    name: 'NIGELEC',
    number: '20 72 26 92',
    description: 'Urgences électricité',
    icon: 'flash',
    category: 'utility',
  },
  {
    id: '8',
    name: 'SEEN',
    number: '20 73 34 40',
    description: 'Urgences eau',
    icon: 'water',
    category: 'utility',
  },
  {
    id: '9',
    name: 'Ambassade de France',
    number: '20 72 24 32',
    description: 'Services consulaires',
    icon: 'flag',
    category: 'embassy',
  },
  {
    id: '10',
    name: 'Aéroport Diori Hamani',
    number: '20 73 23 81',
    description: 'Aéroport international de Niamey',
    icon: 'airplane',
    category: 'transport',
  },
];

// Cities in Niger for prayer times
export const NIGER_CITIES = [
  { id: 'niamey', name: 'Niamey', latitude: 13.5137, longitude: 2.1098 },
  { id: 'zinder', name: 'Zinder', latitude: 13.8069, longitude: 8.9881 },
  { id: 'maradi', name: 'Maradi', latitude: 13.5000, longitude: 7.1017 },
  { id: 'agadez', name: 'Agadez', latitude: 16.9730, longitude: 7.9910 },
  { id: 'tahoua', name: 'Tahoua', latitude: 14.8888, longitude: 5.2692 },
  { id: 'dosso', name: 'Dosso', latitude: 13.0489, longitude: 3.1939 },
  { id: 'diffa', name: 'Diffa', latitude: 13.3154, longitude: 12.6113 },
  { id: 'tillaberi', name: 'Tillabéri', latitude: 14.2117, longitude: 1.4531 },
];

// Currency data
export const CURRENCIES = [
  { code: 'XOF', name: 'Franc CFA (BCEAO)', symbol: 'FCFA', flag: '🇳🇪' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'USD', name: 'Dollar américain', symbol: '$', flag: '🇺🇸' },
  { code: 'GBP', name: 'Livre sterling', symbol: '£', flag: '🇬🇧' },
  { code: 'NGN', name: 'Naira nigérian', symbol: '₦', flag: '🇳🇬' },
  { code: 'GHS', name: 'Cedi ghanéen', symbol: '₵', flag: '🇬🇭' },
  { code: 'MAD', name: 'Dirham marocain', symbol: 'DH', flag: '🇲🇦' },
  { code: 'CNY', name: 'Yuan chinois', symbol: '¥', flag: '🇨🇳' },
];

// Fixed exchange rates (XOF base) - These are approximate rates
// In production, you would fetch these from an API when online
export const EXCHANGE_RATES: Record<string, number> = {
  XOF: 1,
  EUR: 0.00152449, // 1 EUR = 655.957 XOF (fixed rate)
  USD: 0.00166,
  GBP: 0.00131,
  NGN: 2.45,
  GHS: 0.0198,
  MAD: 0.0165,
  CNY: 0.012,
};

// Unit conversion categories
export const UNIT_CATEGORIES = [
  {
    id: 'length',
    name: 'Longueur',
    icon: 'resize',
    units: [
      { id: 'km', name: 'Kilomètre', symbol: 'km', toBase: 1000 },
      { id: 'm', name: 'Mètre', symbol: 'm', toBase: 1 },
      { id: 'cm', name: 'Centimètre', symbol: 'cm', toBase: 0.01 },
      { id: 'mi', name: 'Mile', symbol: 'mi', toBase: 1609.344 },
      { id: 'ft', name: 'Pied', symbol: 'ft', toBase: 0.3048 },
    ],
  },
  {
    id: 'weight',
    name: 'Poids',
    icon: 'barbell',
    units: [
      { id: 'kg', name: 'Kilogramme', symbol: 'kg', toBase: 1 },
      { id: 'g', name: 'Gramme', symbol: 'g', toBase: 0.001 },
      { id: 'lb', name: 'Livre', symbol: 'lb', toBase: 0.453592 },
      { id: 'oz', name: 'Once', symbol: 'oz', toBase: 0.0283495 },
    ],
  },
  {
    id: 'temperature',
    name: 'Température',
    icon: 'thermometer',
    units: [
      { id: 'c', name: 'Celsius', symbol: '°C', toBase: 1 },
      { id: 'f', name: 'Fahrenheit', symbol: '°F', toBase: 1 },
      { id: 'k', name: 'Kelvin', symbol: 'K', toBase: 1 },
    ],
  },
  {
    id: 'area',
    name: 'Surface',
    icon: 'square',
    units: [
      { id: 'sqm', name: 'Mètre carré', symbol: 'm²', toBase: 1 },
      { id: 'sqkm', name: 'Kilomètre carré', symbol: 'km²', toBase: 1000000 },
      { id: 'ha', name: 'Hectare', symbol: 'ha', toBase: 10000 },
      { id: 'sqft', name: 'Pied carré', symbol: 'ft²', toBase: 0.092903 },
      { id: 'acre', name: 'Acre', symbol: 'ac', toBase: 4046.86 },
    ],
  },
  {
    id: 'volume',
    name: 'Volume',
    icon: 'cube',
    units: [
      { id: 'l', name: 'Litre', symbol: 'L', toBase: 1 },
      { id: 'ml', name: 'Millilitre', symbol: 'mL', toBase: 0.001 },
      { id: 'gal', name: 'Gallon (US)', symbol: 'gal', toBase: 3.78541 },
      { id: 'qt', name: 'Quart', symbol: 'qt', toBase: 0.946353 },
    ],
  },
];

// App strings (French - primary language in Niger)
export const STRINGS = {
  fr: {
    appName: 'Niger Services',
    home: 'Accueil',
    currency: 'Devises',
    prayer: 'Prières',
    emergency: 'Urgences',
    converter: 'Convertir',
    notes: 'Notes',
    settings: 'Paramètres',
    
    // Home screen
    welcome: 'Bienvenue',
    quickActions: 'Actions rapides',
    
    // Currency
    currencyConverter: 'Convertisseur de devises',
    from: 'De',
    to: 'Vers',
    amount: 'Montant',
    convert: 'Convertir',
    result: 'Résultat',
    lastUpdated: 'Dernière mise à jour',
    
    // Prayer times
    prayerTimes: 'Heures de prière',
    fajr: 'Fajr',
    sunrise: 'Lever du soleil',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    selectCity: 'Choisir une ville',
    
    // Emergency
    emergencyContacts: 'Contacts d\'urgence',
    call: 'Appeler',
    
    // Notes
    myNotes: 'Mes notes',
    newNote: 'Nouvelle note',
    editNote: 'Modifier la note',
    deleteNote: 'Supprimer',
    noteTitle: 'Titre',
    noteContent: 'Contenu',
    save: 'Enregistrer',
    cancel: 'Annuler',
    noNotes: 'Aucune note',
    addFirstNote: 'Ajoutez votre première note',
    
    // Converter
    unitConverter: 'Convertisseur d\'unités',
    selectCategory: 'Choisir une catégorie',
    selectUnit: 'Choisir une unité',
    
    // Settings
    language: 'Langue',
    theme: 'Thème',
    darkMode: 'Mode sombre',
    notifications: 'Notifications',
    about: 'À propos',
    version: 'Version',
    
    // Common
    loading: 'Chargement...',
    error: 'Erreur',
    retry: 'Réessayer',
    offline: 'Hors ligne',
    online: 'En ligne',
  },
};
