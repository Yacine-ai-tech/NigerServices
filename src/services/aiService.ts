/**
 * Lightweight Offline AI Service for Niger Services
 * Provides intelligent responses for Niger-specific queries
 * Works completely offline with pre-trained knowledge base
 */

import { NIGER_CITIES, EMERGENCY_CONTACTS, TOURIST_PLACES } from '../constants';

interface AIResponse {
  text: string;
  confidence: number;
  category: string;
  suggestions?: string[];
}

interface KnowledgeEntry {
  title: string;
  keywords: string[];
  response: string;
  category: string;
  followUp?: string[];
}

// Pre-trained knowledge base for Niger-specific queries
const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // --- GREETINGS & PERSONALITY ---
  {
    title: 'Bonjour',
    keywords: ['bonjour', 'salut', 'hello', 'hi', 'bonsoir', 'hey', 'yo', 'coucou'],
    response: "Bonjour! 👋 Je suis votre assistant Niger Services. Je suis ravi de vous aider à découvrir notre beau pays ou à trouver les services dont vous avez besoin.\n\nComment se passe votre journée ?",
    category: 'greeting',
    followUp: ['Comment puis-je vous aider aujourd\'hui ?', 'Voulez-vous découvrir des sites touristiques ?'],
  },
  {
    title: 'Hausa Greetings',
    keywords: ['ina kwana', 'ina uni', 'sannu', 'barkadi'],
    response: "Sannu! 😊 (Bonjour en Hausa). Je comprends aussi les langues locales ! Le Niger est riche de sa diversité linguistique.\n\nComment puis-je vous assister ?",
    category: 'greeting',
  },
  {
    title: 'Zarma Greetings',
    keywords: ['fofo', 'mate ni go', 'mate kani'],
    response: "Fofo! 👋 (Bonjour en Zarma). C'est un plaisir de discuter avec vous. Le Zarma est l'une des principales langues parlées au Niger, surtout dans l'ouest.",
    category: 'greeting',
  },
  {
    title: 'Ça va ?',
    keywords: ['ca va', 'comment vas-tu', 'tu vas bien', 'comment tu vas', 'ca gaze'],
    response: "Je vais très bien, merci de demander ! 😊 Je suis toujours prêt à vous fournir des informations précises sur le Niger. Et vous, comment allez-vous ?",
    category: 'greeting',
  },
  {
    title: 'Qui es-tu ?',
    keywords: ['qui es tu', 'ton nom', 'c\'est quoi ton nom', 'tu es qui', 'presente toi'],
    response: "Je suis l'Assistant Intelligent de Niger Services. 🇳🇪\n\nJ'ai été conçu pour fonctionner 100% hors-ligne afin de vous aider partout au Niger, même sans connexion internet. Je connais l'histoire, la géographie, les services d'urgence et la culture de notre pays.",
    category: 'personality',
  },
  {
    title: 'Merci',
    keywords: ['merci', 'thank', 'thanks', 'shukran', 'nagode'],
    response: "Je vous en prie ! (Nagode en Hausa). 😊 C'est un plaisir de vous aider. Avez-vous besoin d'autre chose ?",
    category: 'greeting',
  },

  // --- EMERGENCY & SAFETY ---
  {
    title: 'Urgences',
    keywords: ['urgence', 'emergency', 'police', 'secours', 'aide', 'danger', 'accident'],
    response: "🚨 **Numéros d'urgence au Niger :**\n\n• **Police Secours :** 17\n• **Sapeurs-Pompiers :** 18\n• **SAMU (Santé) :** 15\n• **Gendarmerie :** +227 20 72 23 52\n\nEn cas d'accident, essayez de rester calme et indiquez votre position exacte (quartier, rue ou monument proche).",
    category: 'emergency',
    followUp: ['Voulez-vous appeler un service?', 'Avez-vous besoin de l\'adresse d\'un hôpital?'],
  },
  {
    title: 'Santé & Hôpitaux',
    keywords: ['hopital', 'hospital', 'médecin', 'docteur', 'malade', 'santé', 'clinique', 'pharmacie'],
    response: "🏥 **Principaux établissements de santé :**\n\n• **Hôpital National de Niamey :** +227 20 72 25 21\n• **Hôpital National Lamordé :** +227 20 72 26 43\n• **Maternité Issaka Gazobi :** +227 20 73 29 16\n• **Hôpital de l'Amitié Niger-Turquie**\n\nPour les pharmacies de garde, il est conseillé de consulter les panneaux d'affichage devant les pharmacies locales.",
    category: 'medical',
  },

  // --- HISTORY & POLITICS ---
  {
    title: 'Indépendance',
    keywords: ['independance', 'histoire', 'colonisation', '3 aout', '1960'],
    response: "Le Niger a proclamé son indépendance vis-à-vis de la France le **3 août 1960**. 🇳🇪\n\nLe premier président de la République était **Hamani Diori**. Chaque année, le 3 août est célébré comme la fête nationale, marquée par la plantation d'arbres à travers tout le pays.",
    category: 'history',
  },
  {
    title: 'Fête de la République',
    keywords: ['republique', '18 decembre', '1958'],
    response: "La République du Niger a été proclamée le **18 décembre 1958**. C'est une date historique majeure célébrée chaque année avec de grands défilés et des festivités culturelles dans une ville tournante du pays.",
    category: 'history',
  },
  {
    title: 'Anciens Présidents',
    keywords: ['president', 'dirigeant', 'hamani diori', 'seyni kountche', 'baré', 'tandja', 'issoufou'],
    response: "Quelques figures historiques du Niger :\n\n• **Hamani Diori :** 1er président (1960-1974).\n• **Seyni Kountché :** A dirigé le pays de 1974 à 1987 (période de stabilité et de développement agricole).\n• **Mahamadou Issoufou :** Président de 2011 à 2021.\n\nLe pays a connu plusieurs transitions politiques au cours de son histoire.",
    category: 'history',
  },

  // --- GEOGRAPHY & REGIONS ---
  {
    title: 'Géographie du Niger',
    keywords: ['geographie', 'superficie', 'fleuve', 'desert', 'sahara', 'climat'],
    response: "Le Niger est le plus grand pays d'Afrique de l'Ouest avec **1 267 000 km²**. 🌍\n\n• **Le Désert :** Le Sahara couvre environ 80% du territoire.\n• **Le Fleuve Niger :** Traverse le sud-ouest sur 550 km, vital pour l'agriculture et l'énergie.\n• **Le Massif de l'Aïr :** Montagnes spectaculaires au nord.",
    category: 'geography',
  },
  {
    title: 'Les 8 Régions',
    keywords: ['regions', 'departements', 'villes', 'administration'],
    response: "Le Niger est divisé en 7 régions et 1 district de la capitale :\n\n1. **Niamey** (District capitale)\n2. **Agadez** (Le Nord, désertique)\n3. **Diffa** (L'Est, Lac Tchad)\n4. **Dosso** (Le Sud-Ouest)\n5. **Maradi** (Le Centre-Sud, économique)\n6. **Tahoua** (L'Ader)\n7. **Tillabéri** (Zone du fleuve)\n8. **Zinder** (Le Damagaram)",
    category: 'geography',
  },
  {
    title: 'Fleuve Niger',
    keywords: ['fleuve', 'eau', 'peche', 'irrigation'],
    response: "Le fleuve Niger est le 3ème plus long d'Afrique. Au Niger, il permet la culture du riz, le maraîchage et la pêche. C'est aussi une voie de transport importante entre Niamey et les zones frontalières.",
    category: 'geography',
  },

  // --- CULTURE & ETHNIC GROUPS ---
  {
    title: 'Ethnies du Niger',
    keywords: ['ethnie', 'peuple', 'haoussa', 'zarma', 'touareg', 'peul', 'kanouri', 'arabe', 'toubou'],
    response: "Le Niger est une mosaïque culturelle :\n\n• **Haoussa (53%) :** Surtout au centre et à l'est.\n• **Zarma-Songhaï (21%) :** Surtout à l'ouest.\n• **Touareg (10%) :** Les 'hommes bleus' du nord.\n• **Peul (7%) :** Éleveurs nomades présents partout.\n• **Kanouri (5%) :** À l'est (Diffa).\n\nLa 'parenté à plaisanterie' permet à ces groupes de vivre en parfaite harmonie.",
    category: 'culture',
  },
  {
    title: 'Cure Salée',
    keywords: ['cure salee', 'ingall', 'festival', 'nomade'],
    response: "La **Cure Salée** est le plus grand rassemblement annuel des éleveurs nomades (Peuls et Touaregs) à **In-Gall** (Agadez). C'est un moment de retrouvailles, de fêtes, de courses de chameaux et de célébrations culturelles uniques au monde.",
    category: 'culture',
  },
  {
    title: 'Lutte Traditionnelle',
    keywords: ['lutte', 'sport', 'sabre national', 'lutteur'],
    response: "La **Lutte Traditionnelle** est le sport national n°1 au Niger ! 🤼‍♂️\n\nChaque année, le championnat national (le Sabre National) réunit les meilleurs lutteurs des 8 régions. C'est un événement qui passionne tout le pays et renforce l'unité nationale.",
    category: 'culture',
  },
  {
    title: 'Artisanat',
    keywords: ['artisanat', 'bijoux', 'cuir', 'croix d\'agadez', 'tapis'],
    response: "L'artisanat nigérien est célèbre pour :\n\n• **La Croix d'Agadez :** Bijou en argent emblématique.\n• **Le Cuir :** Maroquinerie de Tahoua et Maradi.\n• **Les Tapis de Terra :** Tissages traditionnels.\n• **La Poterie de Boubon.**",
    category: 'culture',
  },

  // --- ECONOMY & RESOURCES ---
  {
    title: 'Économie & Ressources',
    keywords: ['economie', 'uranium', 'petrole', 'agriculture', 'mines', 'richesse'],
    response: "Les piliers de l'économie nigérienne :\n\n• **Uranium :** Exploité à Arlit (Agadez), le Niger est l'un des plus grands producteurs mondiaux.\n• **Pétrole :** Exploité à Agadem (Diffa) avec une raffinerie à Zinder (SORAZ).\n• **Agriculture :** Mil, sorgho, et l'oignon de Galmi (exporté dans toute l'Afrique).\n• **Élevage :** Une richesse nationale majeure.",
    category: 'economy',
  },
  {
    title: 'Oignon de Galmi',
    keywords: ['oignon', 'galmi', 'exportation', 'agriculture'],
    response: "L'**Oignon de Galmi** (région de Tahoua) est célèbre pour sa couleur violette et sa longue conservation. C'est l'un des produits agricoles les plus exportés du Niger vers les pays de la sous-région (Côte d'Ivoire, Ghana, Nigeria).",
    category: 'economy',
  },

  // --- TOURISM & SITES ---
  {
    title: 'Tourisme',
    keywords: ['tourisme', 'visite', 'visiter', 'attraction', 'monument', 'musée', 'parc', 'vacances'],
    response: "Sites touristiques incontournables :\n\n🏛️ **Culture :** Musée National Boubou Hama, Vieille ville de Zinder.\n🕌 **Religion :** Grande Mosquée d'Agadez (UNESCO).\n🦒 **Nature :** Dernières girafes d'Afrique de l'Ouest à Kouré, Parc du W.\n🏜️ **Désert :** Massif de l'Aïr et désert du Ténéré.",
    category: 'tourism',
  },
  {
    title: 'Girafes de Kouré',
    keywords: ['girafes', 'koure', 'animaux', 'nature'],
    response: "À seulement 60km de Niamey, à **Kouré**, vous pouvez observer les dernières girafes peralta (girafes blanches) d'Afrique de l'Ouest en liberté totale. C'est une expérience unique et accessible !",
    category: 'tourism',
  },
  {
    title: 'Agadez',
    keywords: ['agadez', 'air', 'ténéré', 'désert', 'sahara', 'touareg'],
    response: "Agadez, la 'Porte du Désert' :\n\n📍 **Patrimoine mondial de l'UNESCO**.\n🕌 **Grande Mosquée :** Célèbre pour son minaret en terre de 27m.\n🎭 **Culture :** Centre de l'artisanat touareg.\n🏜️ Point de départ pour les expéditions dans le Ténéré.",
    category: 'tourism',
  },

  // --- PRACTICAL INFO ---
  {
    title: 'Monnaie',
    keywords: ['argent', 'money', 'cfa', 'franc', 'euro', 'dollar', 'change', 'devise', 'banque', 'xof'],
    response: "Le Niger utilise le **Franc CFA (XOF)**.\n\n• **Taux fixe :** 1 EUR = 655.957 FCFA.\n• Les cartes bancaires (Visa/Mastercard) sont acceptées dans les grands hôtels et supermarchés de Niamey.\n• Les agences de transfert d'argent (Western Union, MoneyGram) et le Mobile Money (Airtel Money, Moov Money) sont très répandus.",
    category: 'currency',
  },
  {
    title: 'Transport',
    keywords: ['transport', 'bus', 'taxi', 'avion', 'aéroport', 'voyage', 'déplacement', 'route'],
    response: "Se déplacer au Niger :\n\n• **En ville :** Taxis collectifs ou privés (négociez le prix).\n• **Interurbain :** Compagnies de bus modernes (STM, Rimbo, Azawad).\n• **Air :** Vols internes Niamey-Agadez-Zinder avec Niger Airlines.\n• **Aéroport :** Aéroport International Diori Hamani (Niamey).",
    category: 'transport',
  },
  {
    title: 'Météo & Climat',
    keywords: ['météo', 'weather', 'température', 'climat', 'chaleur', 'pluie', 'saison', 'froid'],
    response: "Le climat est de type sahélien :\n\n• **Saison des pluies :** Juin à Septembre.\n• **Saison froide :** Décembre à Février (Harmattan, vent sec et frais).\n• **Saison chaude :** Mars à Mai (les températures peuvent dépasser 45°C).",
    category: 'weather',
  },
  {
    title: 'Cuisine Nigérienne',
    keywords: ['nourriture', 'food', 'manger', 'restaurant', 'cuisine', 'plat', 'riz', 'kilishi'],
    response: "À goûter absolument :\n\n• **Kilishi :** Viande de bœuf séchée et épicée (spécialité de Madaoua).\n• **Riz Sauce :** Le plat quotidien.\n• **Djerma :** Couscous de mil.\n• **Foura :** Boule de mil délayée dans du lait caillé.\n• **Massa :** Galettes de riz sucrées.",
    category: 'culture',
  },
  {
    title: 'Télécom & Internet',
    keywords: ['téléphone', 'phone', 'internet', 'wifi', 'réseau', 'mobile', 'airtel', 'moov', 'zamani'],
    response: "Opérateurs au Niger :\n\n• **Airtel Niger**\n• **Moov Africa**\n• **Zamani Telecom**\n\nL'indicatif téléphonique est le **+227**. La 4G est disponible dans les grandes villes. Vous pouvez acheter une carte SIM facilement avec une pièce d'identité.",
    category: 'communication',
  },

  // --- RELIGION ---
  {
    title: 'Religion',
    keywords: ['religion', 'islam', 'musulman', 'chretien', 'eglise', 'mosquée', 'fête', 'tabaski', 'ramadan'],
    response: "Le Niger est un pays laïc où la population est à **99% de confession musulmane** (sunnite). 🕌\n\nLes grandes fêtes religieuses (Tabaski, Korité, Mouloud) sont des moments de partage intense. Il existe également une communauté chrétienne qui vit en parfaite harmonie avec la majorité.",
    category: 'religion',
  },

  // --- EDUCATION ---
  {
    title: 'Éducation',
    keywords: ['ecole', 'universite', 'etude', 'uam', 'diplome'],
    response: "L'enseignement supérieur au Niger :\n\n• **Université Abdou Moumouni (UAM) :** La plus grande et ancienne université à Niamey.\n• Il existe des universités publiques dans chaque région (Zinder, Maradi, Tahoua, Agadez, etc.) et de nombreux instituts privés.",
    category: 'education',
  },

  // --- HELP & APP ---
  {
    title: 'Aide',
    keywords: ['aide', 'help', 'comment', 'quoi', 'fonction', 'utilisation'],
    response: "Je peux vous renseigner sur :\n\n🚨 **Urgences** (Police, Santé)\n🕌 **Religions & Prières**\n🌍 **Géographie & Histoire**\n🎭 **Culture & Ethnies**\n💱 **Économie & Monnaie**\n🦒 **Tourisme & Nature**\n\nPosez-moi une question comme : 'Quelles sont les ethnies du Niger ?' ou 'Numéro de la police'.",
    category: 'help',
  },
  {
    title: 'Au revoir',
    keywords: ['au revoir', 'bye', 'a plus', 'ciao', 'adieu'],
    response: "Au revoir ! 👋 C'était un plaisir de discuter avec vous. N'hésitez pas à revenir si vous avez d'autres questions sur le Niger. Bonne journée !",
    category: 'greeting',
  },
  {
    title: 'Créateur',
    keywords: ['createur', 'qui t\'a fait', 'developpeur', 'yacine'],
    response: "J'ai été développé par **Yacine-ai-tech** pour aider les citoyens et les visiteurs du Niger à accéder facilement à des informations utiles, même sans connexion internet. 🇳🇪",
    category: 'personality',
  },
  {
    title: 'Zinder',
    keywords: ['zinder', 'damagaram', 'sultanat'],
    response: "Zinder (le Damagaram) est la deuxième ville du Niger. 🏙️\n\n• Ancienne capitale du pays.\n• Célèbre pour son **Palais du Sultan** et son quartier historique de **Birni**.\n• Centre culturel et artisanal majeur.",
    category: 'geography',
  },
  {
    title: 'Maradi',
    keywords: ['maradi', 'economie', 'commerce'],
    response: "Maradi est la capitale économique du Niger. 💰\n\n• Située au centre-sud, près de la frontière avec le Nigeria.\n• Dynamisme commercial exceptionnel.\n• Région agricole fertile (mil, arachide).",
    category: 'geography',
  },
  {
    title: 'Tahoua',
    keywords: ['tahoua', 'ader', 'elevage'],
    response: "Tahoua (l'Ader) est une région charnière entre le Sahara et la zone sahélienne. 🏜️\n\n• Connue pour son élevage et sa maroquinerie.\n• C'est la région d'origine de l'oignon de Galmi.",
    category: 'geography',
  },
  {
    title: 'Diffa',
    keywords: ['diffa', 'lac tchad', 'manga'],
    response: "Diffa est située à l'extrême est du Niger. 🌅\n\n• Bordée par le lac Tchad.\n• Peuplée majoritairement de Kanouri (Manga).\n• Connue pour sa production de poivron et sa pêche.",
    category: 'geography',
  },
  {
    title: 'Dosso',
    keywords: ['dosso', 'djerma', 'koyratene'],
    response: "Dosso est le berceau de la culture Zarma. 🏰\n\n• Siège du **Sultanat de Dosso**.\n• Région de transition vers le fleuve Niger.\n• Proche de Niamey et de la frontière béninoise.",
    category: 'geography',
  },
  {
    title: 'Tillabéri',
    keywords: ['tillaberi', 'fleuve', 'riz'],
    response: "Tillabéri entoure la capitale Niamey. 🌊\n\n• Traversée par le fleuve Niger.\n• Zone de grande production rizicole.\n• Abrite le Parc National du W.",
    category: 'geography',
  },
];

class AIService {
  private isOnline: boolean = false;
  
  constructor() {
    this.checkConnectivity();
  }

  // Check network connectivity
  async checkConnectivity(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      await fetch('https://www.google.com', { 
        method: 'HEAD',
        signal: controller.signal 
      });
      
      clearTimeout(timeoutId);
      this.isOnline = true;
      return true;
    } catch {
      this.isOnline = false;
      return false;
    }
  }

  // Get online status
  getOnlineStatus(): boolean {
    return this.isOnline;
  }

  // Process user query with intelligent matching
  async processQuery(query: string): Promise<AIResponse> {
    const normalizedQuery = this.normalizeText(query);
    
    // Handle very short queries
    if (normalizedQuery.length < 2) {
      return {
        text: "Je vous écoute... 😊 Posez-moi une question sur le Niger, ses services ou sa culture.",
        confidence: 0.1,
        category: 'unknown',
        suggestions: this.getQuickSuggestions(),
      };
    }

    // Check for exact greeting matches first for natural feel
    const greetings = ['bonjour', 'salut', 'hello', 'hi', 'fofo', 'sannu', 'ca va', 'ina kwana', 'ina uni'];
    if (greetings.some(g => normalizedQuery.includes(g))) {
      const greetingEntry = KNOWLEDGE_BASE.find(e => e.category === 'greeting' && e.keywords.some(k => normalizedQuery.includes(k)));
      if (greetingEntry) {
        return {
          text: greetingEntry.response,
          confidence: 1.0,
          category: 'greeting',
          suggestions: greetingEntry.followUp || this.getQuickSuggestions(),
        };
      }
    }

    // Calculate scores for all entries using TF-IDF
    const scoredEntries = KNOWLEDGE_BASE.map(entry => ({
      entry,
      score: this.calculateTFIDFScore(query, entry),
    }))
    .filter(item => item.score > 0.05)
    .sort((a, b) => b.score - a.score);

    if (scoredEntries.length > 0) {
      const bestMatch = scoredEntries[0].entry;
      
      // If multiple good matches, add them as suggestions
      const otherSuggestions = scoredEntries
        .slice(1, 4)
        .map(item => item.entry.title);

      return {
        text: bestMatch.response,
        confidence: Math.min(scoredEntries[0].score, 0.95),
        category: bestMatch.category,
        suggestions: otherSuggestions.length > 0 ? otherSuggestions : bestMatch.followUp,
      };
    }

    // Default response for unknown queries
    return {
      text: "Je n'ai pas trouvé d'information précise à ce sujet dans ma base de données locale. 😅\n\nJe suis un assistant spécialisé sur le Niger. Essayez de me poser des questions sur les urgences, la météo, les villes ou la culture nigérienne.",
      confidence: 0.1,
      category: 'unknown',
      suggestions: this.getQuickSuggestions(),
    };
  }

  // Normalize text for matching
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^\w\s]/g, ' ')
      .trim();
  }

  /**
   * TF-IDF Implementation for "True AI" matching
   * This weights words based on their importance in the knowledge base
   */
  private calculateTFIDFScore(query: string, entry: KnowledgeEntry): number {
    const queryWords = this.normalizeText(query).split(/\s+/).filter(w => w.length > 2);
    const entryText = this.normalizeText(`${entry.title} ${entry.response} ${entry.keywords.join(' ')}`);
    const entryWords = entryText.split(/\s+/);
    
    if (queryWords.length === 0) return 0;

    let score = 0;
    const totalDocs = KNOWLEDGE_BASE.length;

    queryWords.forEach(word => {
      // Term Frequency (TF) in this document
      // We use fuzzy matching (Levenshtein) to handle typos
      const tf = entryWords.filter(w => w === word || this.levenshteinDistance(w, word) <= 1).length;
      
      if (tf > 0) {
        // Inverse Document Frequency (IDF)
        const docsWithWord = KNOWLEDGE_BASE.filter(e => 
          this.normalizeText(`${e.title} ${e.response} ${e.keywords.join(' ')}`).includes(word)
        ).length;
        
        const idf = Math.log(totalDocs / (1 + docsWithWord));
        
        // Boost score if word is in title or keywords
        let multiplier = 1;
        if (this.normalizeText(entry.title).includes(word)) multiplier = 2.5;
        if (entry.keywords.some(k => this.normalizeText(k).includes(word))) multiplier = 2;

        score += tf * idf * multiplier;
      }
    });

    return score;
  }

  /**
   * Fuzzy matching for typos
   */
  private levenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  // Get quick suggestions based on context
  getQuickSuggestions(category?: string): string[] {
    const general = [
      '🚨 Urgences',
      '🕌 Heures de prière',
      '💱 Devises',
      '🦒 Tourisme',
      '🏙️ Villes du Niger',
      '🌡️ Météo',
      '🍽️ Culture & Cuisine',
    ];

    if (!category) return general;

    switch (category) {
      case 'emergency':
        return ['Police', 'Pompiers', 'SAMU', 'Hôpitaux'];
      case 'tourism':
        return ['Agadez', 'Parc du W', 'Girafes de Kouré', 'Musée National'];
      case 'geography':
        return ['Niamey', 'Zinder', 'Maradi', 'Tahoua', 'Diffa'];
      case 'culture':
        return ['Ethnies', 'Lutte traditionnelle', 'Cure Salée', 'Cuisine'];
      case 'history':
        return ['Indépendance', 'Anciens présidents', '18 Décembre'];
      default:
        return general;
    }
  }

  // Get city-specific information
  getCityInfo(cityId: string): AIResponse {
    const city = NIGER_CITIES.find(c => c.id === cityId);
    if (!city) {
      return {
        text: "Ville non trouvée. Villes disponibles: Niamey, Zinder, Maradi, Agadez, Tahoua, Dosso, Diffa, Tillabéri.",
        confidence: 0.5,
        category: 'geography',
      };
    }

    return {
      text: `📍 ${city.name}\n\nRégion: ${city.region}\nPopulation: ~${city.population?.toLocaleString() || 'N/A'}\nCoordonnées: ${city.latitude}°N, ${city.longitude}°E\n\nUtilisez la carte pour voir la localisation exacte.`,
      confidence: 1,
      category: 'geography',
    };
  }

  // Get tourist place information
  getTouristInfo(placeId: string): AIResponse {
    const place = TOURIST_PLACES?.find(p => p.id === placeId);
    if (!place) {
      return {
        text: "Utilisez l'onglet Tourisme pour découvrir les sites du Niger.",
        confidence: 0.5,
        category: 'tourism',
      };
    }

    return {
      text: `🏛️ ${place.name}\n\n${place.description}\n\n📍 Localisation: ${place.latitude}°N, ${place.longitude}°E\n📂 Catégorie: ${place.category}`,
      confidence: 1,
      category: 'tourism',
    };
  }
}

export const aiService = new AIService();
