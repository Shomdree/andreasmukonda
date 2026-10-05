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
  images?: string[];
};

export const articleWorkMeta: ArticleMeta[] = [
  {
    id: "post-debuter-design-graphique-rdc",
    slug: "debuter-dans-le-design-graphique-en-rdc",
    publishedAt: "2026-10-05",
  },
  {
    id: "post-rdc-numerique-opportunites",
    slug: "le-numerique-comme-levier-dopportunites-en-rdc",
    publishedAt: "2026-10-05",
  },
];

export const articleCatalogFr: Record<string, ArticleCopy> = {
  "post-debuter-design-graphique-rdc": {
    title: "Débuter dans le design graphique en RDC : ce qu’il faut comprendre aujourd’hui",
    excerpt: "Le design graphique reste une compétence rentable, mais le métier a changé.",
    category: "Conseil",
    content: [
      "Le design graphique reste une compétence rentable, mais le métier a changé.",
      "Avec l’intelligence artificielle, n’importe qui peut aujourd’hui générer une image en quelques secondes. Le graphiste qui se limite seulement à « faire de belles images » risque donc d’être rapidement dévalué.",
      "Votre véritable valeur doit être ailleurs : comprendre le besoin du client, organiser l’information, maîtriser les couleurs, la typographie et transformer une idée en communication efficace.",
      "En RDC, il faut aussi tenir compte des réalités : machines peu puissantes, coupures de courant et connexion Internet instable. Travaillez intelligemment avec ce que vous avez. Téléchargez vos polices, images et ressources à l’avance, gardez vos fichiers hors ligne et utilisez des outils adaptés à votre matériel.",
      "Et surtout, ne combattez pas l’IA : apprenez à l’utiliser.",
      "Le graphiste de demain ne sera pas simplement remplacé par l’IA. Il sera surtout dépassé par un autre graphiste qui sait mieux l’utiliser.",
      "Un bon outil aide. Une bonne machine accélère. Mais la compétence reste votre véritable capital.",
      "— Andréas Mukonda Eke-Shomba",
    ].join("\n\n"),
  },
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
  "post-debuter-design-graphique-rdc": {
    title: "Starting Graphic Design in the DRC: What You Need to Understand Today",
    excerpt: "Graphic design can still be profitable, but the profession has changed.",
    category: "Advice",
    content: [
      "Graphic design can still be profitable, but the profession has changed.",
      "With artificial intelligence, almost anyone can now generate an image in a few seconds. A designer who only knows how to make “beautiful images” can therefore quickly lose value.",
      "Your real value must be elsewhere: understanding the client’s needs, organizing information, mastering color, typography and turning an idea into effective communication.",
      "In the DRC, you also have to work with local realities: limited computers, power cuts and unstable Internet access. Learn to work intelligently with what you have. Download your fonts, images and resources in advance, keep important files offline and use tools that match your equipment.",
      "Most importantly, do not fight AI: learn how to use it.",
      "The designer of tomorrow will not simply be replaced by AI. He will more likely be overtaken by another designer who knows how to use AI better.",
      "Good tools help. A good computer makes you faster. But skill remains your real capital.",
      "— Andréas Mukonda Eke-Shomba",
    ].join("\n\n"),
  },
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
  "post-debuter-design-graphique-rdc": {
    title: "Kobanda design graphique na RDC : makambo oyo osengeli koyeba lelo",
    excerpt: "Design graphique ezali naino mosala oyo ekoki kopesa mbongo, kasi mosala yango ebongwani.",
    category: "Conseil",
    content: [
      "Design graphique ezali naino mosala oyo ekoki kopesa mbongo, kasi mosala yango ebongwani.",
      "Na intelligence artificielle, moto nyonso akoki lelo kosala image na mwa baseconde. Yango wana, graphiste oyo ayebi kaka kosala “ba images ya kitoko” akoki noki kobungisa valeur na ye.",
      "Valeur na yo ya solo esengeli kozala na makambo mosusu : kososola besoin ya client, kobongisa information, koyeba kosalela ba couleurs, typographie mpe kobongola idée na communication ya malamu.",
      "Na RDC, esengeli mpe koyeba kosala na ba réalités na biso : ba ordinateurs oyo ezali makasi mingi te, kokatakata ya courant mpe Internet oyo ezalaka stable te. Salela malamu oyo ozali na yango. Télécharger ba polices, images mpe ba ressources na yo liboso, bomba ba fichiers importants hors ligne mpe salela ba outils oyo ebongi na machine na yo.",
      "Mpe koleka nyonso, kobunda na IA te : yekola kosalela yango.",
      "Graphiste ya lobi akozala kaka te remplacé na IA. Akoki nde kolekama na graphiste mosusu oyo ayebi kosalela IA malamu koleka ye.",
      "Outil ya malamu esalisaka. Machine ya malamu epesaka vitesse. Kasi compétence na yo nde ezali capital na yo ya solo , eko permettre yo o se retrouver .",
      "— Andréas Mukonda Eke-Shomba",
    ].join("\n\n"),
  },
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
