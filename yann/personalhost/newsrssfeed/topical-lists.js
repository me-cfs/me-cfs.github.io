// topical lists
// ! Remeber to add lists to export below!

// 0 Lists
const democraticParty = ['democrat', 'biden', 'kamala', 'sanders'];
// -crimethinc, +usPolitics
const prehistory = ['neanderthal', 'ancient primate', 'primate ancestor', 'prehistory', 'australopithecus'];
// +Arstechnica, +The Conversation, +Science Research
const prison = ['pardon', 'prison'];
// +Amnesty, +Conversation
const rightWing = ['conservative backlash', 'Orbán ally'];
// +AP News, +Kiev Independent
const singleCrime = ['assault', 'rape', 'guilty', 'charged with', 'alcohol poisoning', 'apologise', 'smuggler', 'sentenced with'];
// -BBC Australia, -BBC Fiji

// 1 Lists
const humanRights = ['death row', 'censorship', ...prison];
// +AP, +Amnesty, +HRW, +Jacobin, +404 Media
const singlePerson = [...singleCrime, "eulogy",];
// -Axios
const usPolitics = [...democraticParty, 'GOP', 'Trump', 'senate', 'Eric Adams'];
// +Grist, +The Hill Healthcare, +Human Rights Watch, +KFF Health News, +Politics

// 2 Lists
const politics = [...usPolitics, 'senator', 'election', 'democra', 'under-resourced', 'officially appointed', 'socialist',
  ...rightWing, 'call for debate',
];
// +Euractiv, +Open Democracy, +RFI, +SBS News
const us = ['Anchorage', ...usPolitics];
// +Propublica


//exclusionLists
const clickbait = ['hilarious', 'most beautiful', 'rage', 'GOAT', 'glow up', 'shout', 'shitstir',
  'crazy', 'apocalypse', 'mega-maga', 'seeth', 'shocking', "won't believe", 'truth about',
];
// -Crikey, -Hill (Healthcare), -Politico EU
const culture = ['anime', 'artist', 'manga', 'oscar', 'film', 'celebrity', 'gossip', 'entertainment',];
// -Open Democracy, -RTS, -Semafor
const economics = ["GDP"];
// -Politico
const fluffyTitle = ['spirit of', 'the tragedy of', 'just gave us', 'grandma', 'behind the curtain', 'the most powerful',
    'and the prize for the', 'sandwich', 'letter meant for', '5-star', 'most amazing', 'churchill short', 'drinking',
    'bored', 'of faith', 'santa claus', 'holiday cheer', 'operation santa', 'dans les pas des soldat', "here's the",
    'hollywood legend', 'always look on the bright side', 'light show', 'what I got', 'good riddance', 'goes full',
    'à ne pas manquer', 
];
// -Axios, -BBC Aus, -Economist, -Fivethirtyeight, -NYT Most Viewed, -Politico EU, -RFI, -RTS, 
const nonArticle = ['podcast', 'quiz', 'video', 'watch', 'join the conversation'];
// -CrimethInc, -Economist, -Fivethirtyeight, -Open Democracy, -RTS
const nonInformativeTitle = ['how much', '?', 'pour vous?', 'what to know', 'what we know', 'what you can do to', 'new details in',
    'how it happened', 'know about', 'who is', 'why', 'will the', 'winners and losers', 'the best way', 'understanding',
    'these', "let's try something", 'to watch', 'inside', "things to watch",
];
// -Axios. -Hill Climate, -Hill Healthcare. -Huffpost (World), -NYT Most Viewed, -OpenDemocracy, -Politico, -Vox
const spanish = [
  'noticias', 'artículo', 'contenido', 'actualidad', 'español',
  'últimas', 'política', 'sociedad', 'educación', 'tecnología',
  'medio ambiente', 'salud pública', 'cultura', 'economía',
  'internacional', 'latinoamérica', 'iberoamérica', 'hispano', 
  '¿', '¡', 'í', 'ó'
];
// -KFF News
const triggers = ['gender dysphoria', 'Yuppie Flu'];
// -Huffington Post
const uninterestedGeneral = ['bouchon', 'dances', 'Taylor Swift', 'musical', 'Christmas', 'Baby Jesus', 'manger sain', 'un hôtel',
    'fashion brand', 'traffic jam', 'noël', 'Mega Millions', 'nativity', 'marries', 
];
// -Axios, -BBC (Australia), -Hurfington Post (World Post), -NYT Most Viewed, -Politico EU, -RTS
const uninterestedPeople = ['Taylor Swift', 'Austin Tice', 'Juan Sotos', 'Jake Paul', 'Mike Tyson'];
// Axios
const uninterestedSports = ['boxing', 'USWNT', 'LeBron', 'NBA', 'NFL', 'college football', 'Mets', 'cricket', 'NY Yankees', 'martial arts',
  'NASCAR', 
];
// -Arstechnica, -Axios, -Economist, 
const weather = ['storm', 'tornado'];
// -Axios


// inclusionLists
const activism = ['protest', 'rights', 'strike', 'acivis', 'social justice', 'human rights', 'advocacy',];
// +Byline Times, +Converation, Indian Country Today, +Motherjones
const commons = ['open-source', 'public housing', 'commons', 'community owned', 'shared resource', 'open source',];
// +west england bylines +404 Media
const country = ['Angola',];
//
const cybersecurity = ['spyware', 'disinformation', 'astroturf', 'bot network', 'China hack', 'cybercrime',
  'surveillence industry', 'leaking data', 
];
// + Amnesty Intl, +Arstechnica, +Byline Times, +EFF, +Human Rights Watch
const dataJournalism = ['data', 'polling'];
const disability = ['disability', 'assisted suicide', 'disabilities', 'handicap', 'handicapé', 'face mask', 'ADHD advocate',
  'chronic illness', 'lupus', 'eugenics', 'long term sick',
];
// +Amnesty Intl, +AP, +Byline Times, +Disabled Writer. +Orient XXI, *PublicEye, +Human Rights Watch, +Jacobin, 
// +KFF Health, +SBS News, +West England Bylines, +Vox
const environment = ['greenwashing', 'pesticide', 'ecocide', 'pollution', 'cop29', 'cop30', 'cop31', 'cop32', 'climat',
  'fast fashion', 'global warming', 'glacier', 'recyclage', 'Manta Ray', 'sustainable', 'extinction', 'ecosystem',
  ];
// +AP, +The Conversation, +Equal Times. +EURACTIV, +Indian Country Today, +Inside Climate News, +Grist, *Open Democracy, +Orient XXI, +PublicEye
const europe = ['EU funding'];
// +opendemocracy
const geopolitics = ['sanctions', 'five eyes', 'brics', 'united nations', 'international relations', 'global politics',
  "national security", "taliban",
];
// *Crikey, +The intercept, +KyivI
const history = ['Klu Klux Klan', 'Bronze Age',]; 
// +Arstechnica, +Jacobin
const important = ['genocide', 'génocide', 'human toll', 'human rights', 'famine', "harassment", "homelessness", "deported"];
// +AmnestyInternational, +Equal Times, +Human Rights Watch, +Motherjones, +Orient XXI, 
const independenceMovements = ['sahara occidental', 'catalonia', 'taiwan', 'indigenous', 'microstate'];
// +Conversation, Open Democracy, +Orient XXI
const location = ['idaho', 'france', 'switzerland', 'fiji', 'australia', 'japan', 'chippenham', 'calne', 'bristol', 'romandie', 'lausanne',
  'France', 'Victoria', 'Suisse', 'français', 
];
// +Amnesty Intl. +Human Rights Watch, +Orient XXI, +PublicEye,  +RFI, +Semafor, +West England Bylines
const medicine = ['microbiology', 'disability', 'medicaid', 'coroner', 'cancer', 'covid', 'medicaid', 'hospital',
  'brain inflammation', 'epistemic', 'pandemic', 'medic', 'maladie', 'public health',
];
// +AP News, +The Conversation, +The Disabled Writer, +The Equal Times, +KFF Health, +Propublica
const people = ['Bernie', 'Sanders', 'Taylor Lorenz', 'George Monbiot'];
// +Semafor
const scienceResearch = ['science', 'astrobio', ...prehistory];
// +Ap, +Inside Climate News
const socialism = ['class', 'droits du travail', 'capitalism'];
// +Equal Times, +Jacobin
const sportsInterested = [ 'PSG', 'Paris', 'Switzerland', 'France', 'Australia', 'Xhaka', 'Sommer',
   'Lausanne', 'Embolo', 'Zakaria', 'Germain', 'Coupe du Monde', 'Champions League Final'];
// + The Athletic, + The Equal Times
const technology = ['open-source', 'sattelite', 'bluesky', 'large language model', 'foss', 'generative AI',
  '3D Printing', 'AI could assist', 'LLMs',
];
// +Arstechnica, +Conversation, PublicEye
const war = ['missile attack', 'military aid'];
// +AP, +pKiev Independent, 




// mixedLists
const business = ['merger', 'business', 'market value'];
// -Axios, -Economist
const israelPalestine = ['gaza', 'palestine', 'Nethanyahu']; 
// +The intercept
const ukraineRussia = ['ukraine', 'russia', 'gulag', 'putin'];
// + Byline Times

// Export all lists
module.exports = {
  democraticParty,
  usPolitics,
  prehistory,
  clickbait,
  culture,
  fluffyTitle,
  nonArticle,
  nonInformativeTitle,
  singleCrime,
  spanish,
  triggers,
  uninterestedGeneral,
  uninterestedPeople,
  uninterestedSports,
  activism,
  commons,
  cybersecurity,
  dataJournalism,
  disability,
  environment,
  europe,
  geopolitics,
  important,
  independenceMovements,
  location,
  medicine,
  people,
  politics,
  scienceResearch,
  socialism,
  sportsInterested,
  technology,
  business,
  israelPalestine,
  ukraineRussia,
  humanRights,
  history,
  weather,
  prison,
  country,
  rightWing,
  us,
  war,
  economics,
  singlePerson, 
};

