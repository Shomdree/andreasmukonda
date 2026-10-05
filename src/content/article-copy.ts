export type ArticleCopy = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
};

export type ArticleMeta = {
  id: string;
  slug: string;
  publishedAt: string;
};

export const articleWorkMeta: ArticleMeta[] = [
  {
    id: "post-rdc-numerique-opportunites",
    slug: "le-numerique-comme-levier-dopportunites-en-rdc",
    publishedAt: "2026-10-05",
  },
];

export const articleCatalogFr: Record<string, ArticleCopy> = {
  "post-rdc-numerique-opportunites": {
    title: "Le numérique comme levier d’opportunités en RDC",
    excerpt:
      "La transformation numérique crée aujourd’hui de nouvelles possibilités pour entreprendre, apprendre et développer des solutions adaptées aux réalités de la République démocratique du Congo.",
    category: "Réflexion",
    content: [
      "La transformation numérique crée aujourd’hui de nouvelles possibilités pour entreprendre, apprendre et développer des solutions adaptées aux réalités de la République démocratique du Congo.",
      "À Kinshasa comme ailleurs dans le pays, de nombreux besoins restent encore sans solutions efficaces. Pour moi, c’est précisément là que se trouvent les opportunités : identifier un problème, comprendre le besoin et construire une solution utile.",
      "Le design, le développement informatique, l’intelligence artificielle, la communication digitale et les plateformes numériques permettent aujourd’hui de transformer des compétences en services, des idées en entreprises et des solutions en véritables sources de valeur.",
      "La technologie ne remplace cependant ni la vision ni les compétences. Elle les amplifie.",
      "Ma conviction est simple : la RDC ne doit pas seulement consommer les technologies développées ailleurs. Nous devons également créer nos propres solutions, adaptées à notre environnement et capables de répondre aux besoins de notre population.",
      "À travers mes projets dans le numérique, le design et l’entrepreneuriat, je souhaite participer à cette transformation.",
      "Observer. Apprendre. Créer. Construire.",
      "C’est ainsi que nous pouvons progressivement transformer les défis de notre environnement en opportunités.",
      "Andréas Mukonda Eke-Shomba",
      "Entrepreneur • Informaticien • Designer",
      "Fondateur de Global SHOMDREE Industries",
    ].join("\n\n"),
  },
};

export const articleCatalogEn: Record<string, ArticleCopy> = {
  "post-rdc-numerique-opportunites": {
    title: "Digital Technology as a Driver of Opportunity in the DRC",
    excerpt:
      "Digital transformation is creating new opportunities to build businesses, learn new skills and develop solutions adapted to the realities of the Democratic Republic of Congo.",
    category: "Reflection",
    content: [
      "Digital transformation is creating new opportunities to build businesses, learn new skills and develop solutions adapted to the realities of the Democratic Republic of Congo.",
      "In Kinshasa and across the country, many needs still lack effective solutions. I believe that this is exactly where opportunities can be found: identify a problem, understand the need and build a useful solution.",
      "Graphic design, software development, artificial intelligence, digital communication and online platforms now make it possible to turn skills into services, ideas into businesses and solutions into real value.",
      "Technology, however, does not replace vision or skills. It amplifies them.",
      "My belief is simple: the DRC should not only consume technologies created elsewhere. We must also build our own solutions, adapted to our environment and designed to meet the needs of our people.",
      "Through my projects in technology, design and entrepreneurship, I want to contribute to this transformation.",
      "Observe. Learn. Create. Build.",
      "This is how we can gradually turn the challenges around us into opportunities.",
      "Andréas Mukonda Eke-Shomba",
      "Entrepreneur • IT Specialist • Designer",
      "Founder of Global SHOMDREE Industries",
    ].join("\n\n"),
  },
};

export const articleCatalogLn: Record<string, ArticleCopy> = {
  "post-rdc-numerique-opportunites": {
    title: "Numérique lokola nzela ya mabaku na RDC",
    excerpt:
      "Mbongwana ya numérique ezali kofungola lelo mabaku ya sika mpo na kosala mombongo, koyekola mpe kokela ba solutions oyo ebongi na makambo ya solo ya République démocratique du Congo.",
    category: "Réflexion",
    content: [
      "Mbongwana ya numérique ezali kofungola lelo mabaku ya sika mpo na kosala mombongo, koyekola mpe kokela ba solutions oyo ebongi na makambo ya solo ya République démocratique du Congo.",
      "Na Kinshasa mpe na bisika mosusu ya mboka, bamposa mingi ezali naino kozanga ba solutions ya malamu. Mpo na ngai, ezali kaka wana nde mabaku ezali: komona problème, kososola besoin mpe kokela solution oyo ezali na ntina.",
      "Design graphique, informatique, intelligence artificielle, communication digitale mpe ba plateformes numériques epesi biso lelo makoki ya kobongola mayele na biso na ba services, makanisi na ba entreprises mpe ba solutions na valeur ya solo.",
      "Kasi technologie ezwi esika ya vision to ya compétence te. Esalisaka nde mpo makoki yango ekola lisusu.",
      "Likambo oyo nandimi ezali polele: RDC esengeli kaka te kosalela ba technologies oyo basali na mikili mosusu. Tosengeli mpe kokela ba solutions na biso moko, oyo ebongi na environnement na biso mpe ekoki koyanola na bamposa ya bato na biso.",
      "Na nzela ya ba projets na ngai na numérique, design mpe entrepreneuriat, nalingi kopesa maboko na mbongwana yango.",
      "Kotala. Koyekola. Kokela. Kotonga.",
      "Ezali na nzela yango nde tokoki kobongola mikakatano oyo ezali zingazinga na biso na mabaku.",
      "Andréas Mukonda Eke-Shomba",
      "Entrepreneur • Informaticien • Designer",
      "Fondateur ya Global SHOMDREE Industries",
    ].join("\n\n"),
  },
};
