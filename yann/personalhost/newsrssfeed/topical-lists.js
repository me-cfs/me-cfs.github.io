// topical lists

// Bottom Lists
const democraticParty = ['democrat', 'biden', 'kamala', 'sanders'];
// -crimethinc, +usPolitics
const usPolitics = [...democraticParty, 'GOP', 'Trump', 'senate', 'Eric Adams'];
// +Grist, +The Hill Healthcare, +Human Rights Watch, +KFF Health News, +Politics
const prehistory = ['neanderthal', 'ancient primate', 'primate ancestor', 'prehistory', 'australopithecus'];
// +Arstechnica, +The Conversation, +Science Research



//exclusionLists
const clickbait = ['hilarious', 'most beautiful', 'rage', 'GOAT', 'glow up', 'shout', 'shitstir',
  'crazy', 'apocalypse',
];
// -Crikey, -Hill (Healthcare), -Politico EU
const culture = ['anime', 'artist', 'manga', 'oscar', 'film'];
// -Open Democracy, -RTS, -Semafor
const fluffyTitle = ['spirit of', 'the tragedy of', 'just gave us', 'grandma', 'behind the curtain', 'the most powerful',
    'and the prize for the', 'sandwich', 'letter meant for', '5-star', 'most amazing', 'churchill short', 'drinking',
    'bored', 'of faith', 'santa claus', 'holiday cheer', 'operation santa', 'dans les pas des soldat',
];
// -Axios, -BBC Aus, -Economist, -NYT Most Viewed, -Politico EU, -RFI
const nonArticle = ['podcast', 'quiz', 'video', 'watch', 'join the conversation'];
// -CrimethInc, -Economist, -Fivethirtyeight, -Open Democracy, -RTS
const nonInformativeTitle = ['how much', '?', 'pour vous?', 'what to know', 'what we know', 'what you can do to', 'new details in',
    'how it happened', 'know about', 'who is', 'why', 'will the', 'winners and losers', 'the best way', 'understanding',
];
// -Axios. -Hill Climate, -Hill Healthcare. -Huffpost (World), -NYT Most Viewed, -OpenDemocracy, -Vox
const singleCrime = ['assault', 'rape', 'guilty', 'charged with', 'alcohol poisoning', 'apologise', 'smuggler', 'sentenced with'];
// -BBC Australia, -BBC Fiji
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
    'fashion brand', 'traffic jam', 'noël', 'Mega Millions',
];
// -Axios, -BBC (Australia), -Hurfington Post (World Post), -NYT Most Viewed, -Politico EU, -RTS
const uninterestedPeople = ['Taylor Swift', 'Austin Tice', 'Juan Sotos', 'Jake Paul', 'Mike Tyson'];
// Axios
const uninterestedSports = ['boxing', 'USWNT', 'LeBron', 'NBA', 'NFL', 'college football', 'Mets', 'cricket', 'NY Yankees', 'martial arts'];
// -Axios, -Economist



// inclusionLists
const activism = ['protest', 'rights', 'strike', 'acivis'];
// +{Byline Times, +Converation, Indian Country Today, +Motherjones
const commons = ['open-source', 'public housing', 'commons', 'community owned'];
// +west england bylines
const cybersecurity = ['spyware', 'disinformation', 'astroturf', 'bot network'];
// + Amnesty Intl, +Byline Times
const dataJournalism = ['data', 'polling'];
const disability = ['disability', 'assisted suicide', 'disabilities', 'handicap', 'handicapé', 'face mask', 'ADHD advocate',
  'chronic illness', 'lupus',
];
// +Amnesty Intl, +AP, +Disabled Writer. +Orient XXI, *PublicEye, +Human Rights Watch, +Jacobin, 
// +KFF Health, +SBS News, +West England Bylines, +Vox
const environment = ['greenwashing', 'pesticides interdits', 'ecocide', 'pollution', 'cop29', 'cop30', 'cop31', 'cop32', 'climat',
  'fast fashion', 'global warming', 'glacier', 'recyclage', 
  ];
// +Environment, +Equal Times. +Indian Country Today, +Inside Climate News, +Grist, *Open Democracy, +Orient XXI, +PublicEye
const europe = ['EU funding'];
// +opendemocracy
const geopolitics = ['sanctions', 'five eyes', 'brics', 'united nations'];
// *Crikey, +The intercept
const history = ['Klu Klux Klan']; 
// +Jacobin
const humanRights = ['death row'];
// +AP
const important = ['genocide', 'génocide', 'human toll', 'human rights'];
// +AmnestyInternational, +Equal Times, +Motherjones, +Orient XXI, 
const independenceMovements = ['sahara occidental', 'catalonia', 'taiwan', 'indigenous', 'microstate'];
// +Conversation, Open Democracy, +Orient XXI
const location = ['idaho', 'france', 'switzerland', 'fiji', 'australia', 'japan', 'chippenham', 'calne', 'bristol', 'romandie', 'lausanne',
  'France',
];
// +Amnesty Intl. +Human Rights Watch, +Orient XXI, +RFI, +Semafor, +West England Bylines
const medicine = ['microbiology', 'disability', 'medicaid', 'coroner', 'cancer', 'covid', 'medicaid', 'hospital',
  'brain inflammation', 'epistemic', 'pandemic', 'medic',
];
// +AP News, +The Conversation, +The Disabled Writer, +KFF Health, +Propublica
const people = ['Bernie', 'Sanders', 'Taylor Lorenz', 'George Monbiot'];
// +Semafor
const politics = [...usPolitics, 'senator', 'election', 'democra', 'under-resourced', 'officially appointed', 'socialist',
  //
];
// +Open Democracy, +RFI, +SBS News
const scienceResearch = ['science', 'astrobio', ...prehistory];
// +Ap, +Inside Climate News
const socialism = ['class', 'droits du travail', 'capitalism'];
// +Equal Times, +Jacobin
const sportsInterested = [ 'PSG', 'Paris', 'Switzerland', 'France', 'Australia', 'Xhaka', 'Sommer',
   'Lausanne', 'Embolo', 'Zakaria', 'Germain', 'Coupe du Monde', 'Champions League Final'];
// + The Athletic, + The Equal Times
const technology = ['open-source', 'sattelite', 'bluesky', 'large language model', 'foss', 'generative AI',
  '3D Printing', 
];
// +Arstechnica, +PublicEye



// mixedLists
const business = ['merger', 'business', 'market value'];
// -Axios, -Economist
const israelPalestine = ['gaza', 'palestine', 'Nethanyahu']; 
// +The intercept
const ukraineRussia = ['ukraine', 'russia', 'gulag', 'putin'];

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
};

