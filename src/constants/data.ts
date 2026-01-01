// Emergency contacts for Niger - Real verified numbers
export const EMERGENCY_CONTACTS = [
  {
    id: '1',
    name: 'Police Secours',
    number: '17',
    description: 'Police nationale du Niger - Urgences',
    icon: 'shield-checkmark',
    category: 'security',
  },
  {
    id: '2',
    name: 'Pompiers',
    number: '18',
    description: 'Protection civile - Sapeurs-pompiers',
    icon: 'flame',
    category: 'emergency',
  },
  {
    id: '3',
    name: 'SAMU Niger',
    number: '15',
    description: 'Service d\'aide médicale urgente',
    icon: 'medical',
    category: 'medical',
  },
  {
    id: '4',
    name: 'Gendarmerie Nationale',
    number: '+227 20 72 23 52',
    description: 'Gendarmerie nationale - État-Major',
    icon: 'shield',
    category: 'security',
  },
  {
    id: '5',
    name: 'Hôpital National Niamey',
    number: '+227 20 72 25 21',
    description: 'Centre Hospitalier National de Niamey',
    icon: 'business',
    category: 'medical',
  },
  {
    id: '6',
    name: 'Hôpital Lamordé',
    number: '+227 20 72 26 43',
    description: 'Centre Hospitalier Lamordé',
    icon: 'business',
    category: 'medical',
  },
  {
    id: '7',
    name: 'NIGELEC',
    number: '+227 20 72 26 92',
    description: 'Société Nigérienne d\'Électricité',
    icon: 'flash',
    category: 'utility',
  },
  {
    id: '8',
    name: 'SEEN',
    number: '+227 20 73 34 40',
    description: 'Société d\'Exploitation des Eaux du Niger',
    icon: 'water',
    category: 'utility',
  },
  {
    id: '9',
    name: 'Croix-Rouge Niger',
    number: '+227 20 73 31 63',
    description: 'Croix-Rouge Nigérienne',
    icon: 'heart',
    category: 'medical',
  },
  {
    id: '10',
    name: 'Aéroport Diori Hamani',
    number: '+227 20 73 23 81',
    description: 'Aéroport International de Niamey',
    icon: 'airplane',
    category: 'transport',
  },
];

// Niger Flag colors (CORRECT: Orange-White-Green with sun)
export const NIGER_FLAG = {
  orange: '#E05206',
  white: '#FFFFFF',
  green: '#0DB02B',
  sun: '#E05206',
};

// Cities in Niger with verified GPS coordinates
export const NIGER_CITIES = [
  { id: 'niamey', name: 'Niamey', latitude: 13.5137, longitude: 2.1098, population: 1200000, region: 'Capitale' },
  { id: 'zinder', name: 'Zinder', latitude: 13.8069, longitude: 8.9881, population: 322935, region: 'Zinder' },
  { id: 'maradi', name: 'Maradi', latitude: 13.5000, longitude: 7.1017, population: 267249, region: 'Maradi' },
  { id: 'agadez', name: 'Agadez', latitude: 16.9730, longitude: 7.9910, population: 124324, region: 'Agadez' },
  { id: 'tahoua', name: 'Tahoua', latitude: 14.8888, longitude: 5.2692, population: 117826, region: 'Tahoua' },
  { id: 'dosso', name: 'Dosso', latitude: 13.0489, longitude: 3.1939, population: 58671, region: 'Dosso' },
  { id: 'diffa', name: 'Diffa', latitude: 13.3154, longitude: 12.6113, population: 48486, region: 'Diffa' },
  { id: 'tillaberi', name: 'Tillabéri', latitude: 14.2117, longitude: 1.4531, population: 31265, region: 'Tillabéri' },
  { id: 'arlit', name: 'Arlit', latitude: 18.7369, longitude: 7.3853, population: 112000, region: 'Agadez' },
  { id: 'birni_nkonni', name: 'Birni N\'Konni', latitude: 13.7963, longitude: 5.2497, population: 63169, region: 'Tahoua' },
  { id: 'tessaoua', name: 'Tessaoua', latitude: 13.7571, longitude: 7.9874, population: 43409, region: 'Maradi' },
  { id: 'gaya', name: 'Gaya', latitude: 11.8843, longitude: 3.4461, population: 42976, region: 'Dosso' },
  { id: 'dogondoutchi', name: 'Dogondoutchi', latitude: 13.6393, longitude: 4.0288, population: 36881, region: 'Dosso' },
  { id: 'madaoua', name: 'Madaoua', latitude: 14.0733, longitude: 5.9583, population: 35431, region: 'Tahoua' },
  { id: 'mirriah', name: 'Mirriah', latitude: 13.7073, longitude: 9.1501, population: 28407, region: 'Zinder' },
  { id: 'tanout', name: 'Tanout', latitude: 15.0709, longitude: 8.8879, population: 20339, region: 'Zinder' },
  { id: 'ingall', name: 'In-Gall', latitude: 16.7889, longitude: 6.9342, population: 15000, region: 'Agadez' },
  { id: 'bouza', name: 'Bouza', latitude: 14.4229, longitude: 6.0428, population: 10000, region: 'Tahoua' },
];

// Tourist attractions in Niger with GPS
export const TOURIST_PLACES = [
  {
    id: 'museum_national',
    name: 'Musée National Boubou Hama',
    description: 'Principal musée du Niger avec artisanat et histoire',
    latitude: 13.5215,
    longitude: 2.1063,
    city: 'Niamey',
    category: 'culture',
    icon: 'library',
  },
  {
    id: 'grande_mosquee',
    name: 'Grande Mosquée de Niamey',
    description: 'Plus grande mosquée du Niger',
    latitude: 13.5089,
    longitude: 2.1125,
    city: 'Niamey',
    category: 'religion',
    icon: 'moon',
  },
  {
    id: 'pont_kennedy',
    name: 'Pont Kennedy',
    description: 'Pont historique sur le fleuve Niger',
    latitude: 13.5158,
    longitude: 2.0856,
    city: 'Niamey',
    category: 'landmark',
    icon: 'map',
  },
  {
    id: 'reserve_w',
    name: 'Parc National du W',
    description: 'Réserve UNESCO - Éléphants, lions, buffles',
    latitude: 12.4000,
    longitude: 2.4000,
    city: 'Dosso',
    category: 'nature',
    icon: 'leaf',
  },
  {
    id: 'air_tenere',
    name: 'Réserve Aïr et Ténéré',
    description: 'UNESCO - Plus grande réserve protégée d\'Afrique',
    latitude: 18.5000,
    longitude: 9.0000,
    city: 'Agadez',
    category: 'nature',
    icon: 'globe',
  },
  {
    id: 'vieille_ville_agadez',
    name: 'Vieille Ville d\'Agadez',
    description: 'UNESCO - Architecture en terre traditionnelle',
    latitude: 16.9730,
    longitude: 7.9910,
    city: 'Agadez',
    category: 'culture',
    icon: 'home',
  },
  {
    id: 'mosquee_agadez',
    name: 'Mosquée d\'Agadez',
    description: 'Minaret en terre de 27m - XIVe siècle',
    latitude: 16.9737,
    longitude: 7.9918,
    city: 'Agadez',
    category: 'religion',
    icon: 'moon',
  },
  {
    id: 'sultanat_zinder',
    name: 'Palais du Sultan de Zinder',
    description: 'Palais historique du sultanat de Damagaram',
    latitude: 13.8069,
    longitude: 8.9881,
    city: 'Zinder',
    category: 'culture',
    icon: 'business',
  },
  {
    id: 'arbre_tenere',
    name: 'Site de l\'Arbre du Ténéré',
    description: 'Emplacement de l\'arbre le plus isolé au monde',
    latitude: 17.7500,
    longitude: 10.1667,
    city: 'Agadez',
    category: 'landmark',
    icon: 'leaf',
  },
  {
    id: 'marche_niamey',
    name: 'Grand Marché de Niamey',
    description: 'Principal marché de la capitale',
    latitude: 13.5100,
    longitude: 2.1150,
    city: 'Niamey',
    category: 'shopping',
    icon: 'cart',
  },
  {
    id: 'kouré',
    name: 'Girafes de Kouré',
    description: 'Dernières girafes d\'Afrique de l\'Ouest en liberté',
    latitude: 13.3167,
    longitude: 2.5833,
    city: 'Kouré',
    category: 'nature',
    icon: 'leaf',
  },
  {
    id: 'boubon',
    name: 'Village de Boubon',
    description: 'Village de potiers au bord du fleuve Niger',
    latitude: 13.6667,
    longitude: 1.9167,
    city: 'Boubon',
    category: 'culture',
    icon: 'color-palette',
  },
  {
    id: 'birni_zinder',
    name: 'Quartier Birni de Zinder',
    description: 'Quartier historique avec architecture traditionnelle',
    latitude: 13.8069,
    longitude: 8.9881,
    city: 'Zinder',
    category: 'culture',
    icon: 'home',
  },
  {
    id: 'termit',
    name: 'Massif de Termit',
    description: 'Réserve naturelle abritant des addax',
    latitude: 16.0000,
    longitude: 11.3333,
    city: 'Zinder/Diffa',
    category: 'nature',
    icon: 'paw',
  },
];

// Currency data - XOF is the West African CFA Franc
export const CURRENCIES = [
  { code: 'XOF', name: 'Franc CFA (BCEAO)', symbol: 'FCFA', flag: '🇳🇪' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'USD', name: 'Dollar américain', symbol: '$', flag: '🇺🇸' },
  { code: 'GBP', name: 'Livre sterling', symbol: '£', flag: '🇬🇧' },
  { code: 'NGN', name: 'Naira nigérian', symbol: '₦', flag: '🇳🇬' },
  { code: 'GHS', name: 'Cedi ghanéen', symbol: '₵', flag: '🇬🇭' },
  { code: 'MAD', name: 'Dirham marocain', symbol: 'DH', flag: '🇲🇦' },
  { code: 'CNY', name: 'Yuan chinois', symbol: '¥', flag: '🇨🇳' },
  { code: 'XAF', name: 'Franc CFA (BEAC)', symbol: 'FCFA', flag: '🇨🇲' },
  { code: 'DZD', name: 'Dinar algérien', symbol: 'DA', flag: '🇩🇿' },
];

// Fixed exchange rates (XOF base) - Verified rates
// XOF/EUR is fixed at 655.957 by treaty
// Other rates are approximate and should be updated via API
export const EXCHANGE_RATES: Record<string, number> = {
  XOF: 1,
  EUR: 0.00152449, // Fixed: 1 EUR = 655.957 XOF
  USD: 0.00162,    // ~617 XOF per USD
  GBP: 0.00128,    // ~780 XOF per GBP
  NGN: 2.52,       // ~0.40 XOF per NGN
  GHS: 0.0245,     // ~40.8 XOF per GHS
  MAD: 0.0152,     // ~65.8 XOF per MAD
  CNY: 0.0118,     // ~84.7 XOF per CNY
  XAF: 1,          // XOF = XAF (same value)
  DZD: 0.205,      // ~4.88 XOF per DZD
};

// Exchange rate API info
export const CURRENCY_API = {
  baseUrl: 'https://api.exchangerate-api.com/v4/latest/',
  fallbackUrl: 'https://open.er-api.com/v6/latest/',
  updateInterval: 3600000, // 1 hour in ms
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
