import type { ServiceItem } from "../lib/types";

export type PrintDesignKind = "affiche" | "bache" | "badge" | "carte" | "tshirt" | "print";

export type PrintServiceMeta = {
  id: `s-imp-${string}`;
  slug: string;
  file: string;
  designKind: PrintDesignKind;
};

type PrintCopy = {
  title: string;
  excerpt: string;
  description: string;
  benefits: string[];
  deliverables: string[];
  turnaround: string;
  priceLabel: string;
  ctaLabel: string;
};

export const printServiceMeta: PrintServiceMeta[] = [
  { id: "s-imp-001", slug: "creation-d-affiches", file: "impression-affiches.jpg", designKind: "affiche" },
  { id: "s-imp-002", slug: "agendas-personnalises", file: "impression-agenda.jpg", designKind: "print" },
  { id: "s-imp-003", slug: "impression-de-baches", file: "impression-baches.jpg", designKind: "bache" },
  { id: "s-imp-004", slug: "badges-personnalises", file: "impression-badges.jpg", designKind: "badge" },
  { id: "s-imp-005", slug: "cartes-de-visite-personnalisees", file: "impression-carte-de-visite.jpg", designKind: "carte" },
  { id: "s-imp-006", slug: "etiquettes-personnalisees", file: "impression-etiquettes.jpg", designKind: "print" },
  { id: "s-imp-007", slug: "casquettes-personnalisees", file: "impression-kepi.jpg", designKind: "print" },
  { id: "s-imp-008", slug: "polos-personnalises", file: "impression-lacostes.jpg", designKind: "tshirt" },
  { id: "s-imp-009", slug: "flocage-de-maillots", file: "impression-maillot.jpg", designKind: "tshirt" },
  { id: "s-imp-010", slug: "coques-de-telephone-personnalisees", file: "impression-pochettes.jpg", designKind: "print" },
  { id: "s-imp-011", slug: "porte-cles-personnalises", file: "impression-porte-cles.jpg", designKind: "print" },
  { id: "s-imp-012", slug: "impression-de-portraits", file: "impression-portrait.jpg", designKind: "print" },
  { id: "s-imp-013", slug: "stylos-personnalises", file: "impression-stylo.jpg", designKind: "print" },
  { id: "s-imp-014", slug: "tasses-personnalisees", file: "impression-tasses.jpg", designKind: "print" },
  { id: "s-imp-015", slug: "t-shirts-personnalises", file: "impression-thsirt.jpg", designKind: "tshirt" },
];

export const printCatalogFr: Record<string, PrintCopy> = {
  "creation-d-affiches": {
    title: "Création d’affiches",
    excerpt: "Vous préparez un événement ou souhaitez faire connaître votre activité ?",
    description:
      "Vous préparez un événement ou souhaitez faire connaître votre activité ? Votre public doit comprendre rapidement ce que vous proposez et pourquoi cela peut l’intéresser. Une affiche réunit votre message, vos images et les informations pratiques dans un même visuel. Elle vous aide à présenter l’essentiel sans vous perdre dans de longues explications. Pour un anniversaire, une rencontre ou une annonce professionnelle, une création adaptée donne à votre message une forme claire, prête à être partagée.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
  "agendas-personnalises": {
    title: "Agendas personnalisés",
    excerpt: "Entre les rendez-vous, les tâches à terminer et les idées à garder, il est facile de perdre le fil de sa journée.",
    description:
      "Entre les rendez-vous, les tâches à terminer et les idées à garder, il est facile de perdre le fil de sa journée. Un agenda permet de rassembler vos notes et de préparer les prochaines étapes au même endroit. Personnalisé avec votre nom ou votre logo, il devient aussi un objet qui vous ressemble. Pour vous-même, votre équipe ou un cadeau professionnel, il associe un usage concret à une attention personnelle, sans dépendre d’un écran pour retrouver vos notes.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
  "impression-de-baches": {
    title: "Impression de bâches",
    excerpt: "Votre événement ou votre activité a besoin d’être repéré ?",
    description:
      "Votre événement ou votre activité a besoin d’être repéré ? Une bâche donne de la place à votre nom, à votre message et aux informations importantes. Elle peut servir à annoncer une rencontre, présenter un commerce ou habiller l’espace d’un événement. Plutôt que de multiplier les petits supports, vous disposez d’un visuel central qui aide les visiteurs à reconnaître le lieu et à comprendre ce qui s’y passe. Le format et le contenu se choisissent selon votre besoin.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
  "badges-personnalises": {
    title: "Badges personnalisés",
    excerpt: "Lors d’un événement ou au sein d’une équipe, les visiteurs ne savent pas toujours à qui s’adresser.",
    description:
      "Lors d’un événement ou au sein d’une équipe, les visiteurs ne savent pas toujours à qui s’adresser. Un badge avec un nom, une fonction ou une mention de groupe rend les présentations plus simples. Il aide à distinguer les organisateurs, les intervenants et les participants sans devoir redemander le rôle de chacun. C’est un petit support utile pour faciliter l’accueil et les échanges, tout en donnant une présentation commune aux personnes qui représentent votre organisation.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
  "cartes-de-visite-personnalisees": {
    title: "Cartes de visite personnalisées",
    excerpt: "Une bonne rencontre mérite de pouvoir se poursuivre.",
    description:
      "Une bonne rencontre mérite de pouvoir se poursuivre. Après un échange avec un client ou un partenaire, la carte de visite lui laisse votre nom, votre activité et les coordonnées pour vous retrouver. Elle évite de devoir tout dicter ou compter sur un numéro qui se perd parmi les messages. Avec une présentation à votre image, vous laissez un repère concret de votre activité. Un petit support à garder sous la main pour les rencontres prévues comme pour les occasions inattendues.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
  "etiquettes-personnalisees": {
    title: "Étiquettes personnalisées",
    excerpt: "Vous avez travaillé sur votre produit : sa présentation doit aider à comprendre ce que vous proposez.",
    description:
      "Vous avez travaillé sur votre produit : sa présentation doit aider à comprendre ce que vous proposez. Une étiquette permet d’identifier votre marque, de distinguer vos produits et de réunir les informations utiles que vous souhaitez communiquer. Elle donne un repère au client qui découvre votre offre ou qui cherche à la retrouver. Que vous lanciez une activité ou souhaitiez harmoniser vos emballages, la personnalisation vous aide à construire une présentation reconnaissable, sans laisser le produit anonyme.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
  "casquettes-personnalisees": {
    title: "Casquettes personnalisées",
    excerpt: "Vous souhaitez représenter votre activité ou réunir votre groupe autour d’un même signe ?",
    description:
      "Vous souhaitez représenter votre activité ou réunir votre groupe autour d’un même signe ? Une casquette personnalisée permet de porter votre nom, votre logo ou votre message lors d’une sortie, d’un événement ou d’une journée de travail. Elle peut compléter la tenue d’une équipe et aider les participants à se reconnaître. C’est aussi une idée de souvenir à offrir : un objet que l’on peut porter, plutôt qu’un support destiné seulement à être regardé.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
  "polos-personnalises": {
    title: "Polos personnalisés",
    excerpt: "Lorsque votre équipe accueille du public, une tenue commune aide à reconnaître les personnes qui représentent votre activité.",
    description:
      "Lorsque votre équipe accueille du public, une tenue commune aide à reconnaître les personnes qui représentent votre activité. Le polo personnalisé permet d’associer votre logo à une présentation soignée, sans imposer une tenue trop formelle. Il peut accompagner le travail à l’accueil, en boutique, au restaurant ou pendant un événement. Pour une équipe ou une petite structure, c’est une façon simple de donner une unité aux tenues et de rendre votre identité visible dans les échanges du quotidien.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
  "flocage-de-maillots": {
    title: "Flocage de maillots",
    excerpt: "Vous voulez un maillot qui porte votre nom, votre surnom ou votre numéro préféré ?",
    description:
      "Vous voulez un maillot qui porte votre nom, votre surnom ou votre numéro préféré ? Le flocage transforme un vêtement de sport en une pièce personnelle. Pour une équipe, il permet aussi de distinguer les joueurs et de donner une présentation commune au groupe. Qu’il s’agisse de jouer entre amis, de participer à un tournoi ou d’offrir un cadeau à un amateur de sport, la personnalisation ajoute au maillot une signification qui va au-delà du vêtement.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
  "coques-de-telephone-personnalisees": {
    title: "Coques de téléphone personnalisées",
    excerpt: "Certaines photos méritent une autre place que le dossier de votre téléphone.",
    description:
      "Certaines photos méritent une autre place que le dossier de votre téléphone. Une coque personnalisée vous permet de garder près de vous un visage, un souvenir ou une image qui vous plaît. Elle donne une touche personnelle à un objet que vous utilisez au quotidien. Pour vous-même ou pour offrir, c’est une façon de choisir un cadeau lié à une personne et à son histoire. Le modèle du téléphone permet ensuite de vérifier la coque adaptée à votre demande.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
  "porte-cles-personnalises": {
    title: "Porte-clés personnalisés",
    excerpt: "Vous cherchez un petit cadeau utile qui garde une touche personnelle ?",
    description:
      "Vous cherchez un petit cadeau utile qui garde une touche personnelle ? Un porte-clés avec une photo ou un logo accompagne un objet dont on se sert souvent. Il peut rappeler une personne, une rencontre ou un événement, tout en aidant à reconnaître un trousseau. Pour une organisation, il offre aussi une manière simple de partager son identité. Un souvenir à emporter avec soi, pour un usage personnel comme pour remercier les participants à une occasion particulière.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
  "impression-de-portraits": {
    title: "Impression de portraits",
    excerpt: "Il y a des photos que l’on aime trop pour les laisser seulement sur un téléphone.",
    description:
      "Il y a des photos que l’on aime trop pour les laisser seulement sur un téléphone. L’impression d’un portrait permet de leur donner une place dans votre maison, votre bureau ou votre espace personnel. Le visage d’un proche, une photo de famille ou le souvenir d’un moment important peut ainsi vous accompagner autrement. Pour un anniversaire, une attention familiale ou le plaisir de décorer votre intérieur, un portrait offre un cadeau personnel, choisi pour ce qu’il représente.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
  "stylos-personnalises": {
    title: "Stylos personnalisés",
    excerpt: "Un stylo reste utile pendant une formation, une réunion ou un rendez-vous.",
    description:
      "Un stylo reste utile pendant une formation, une réunion ou un rendez-vous. En y ajoutant votre nom ou votre logo, vous associez votre activité à un objet que l’on peut garder et utiliser. C’est une manière discrète de laisser un souvenir après un échange, sans se limiter à distribuer un document. Pour votre équipe, vos participants ou vos contacts professionnels, le stylo personnalisé réunit un usage pratique et un rappel de votre identité.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
  "tasses-personnalisees": {
    title: "Tasses personnalisées",
    excerpt: "Vous cherchez un cadeau qui montre que vous avez pensé à la personne ?",
    description:
      "Vous cherchez un cadeau qui montre que vous avez pensé à la personne ? Une tasse personnalisée permet de réunir une photo, un prénom ou quelques mots autour de ce qui compte pour elle. Elle peut marquer un anniversaire, rappeler un souvenir partagé ou accompagner une petite attention sans occasion particulière. Au-delà du cadeau, elle trouve sa place à la maison ou au bureau : un objet du quotidien auquel votre message donne une valeur personnelle.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
  "t-shirts-personnalises": {
    title: "T-shirts personnalisés",
    excerpt: "Vous organisez un événement, représentez une association ou souhaitez donner une tenue commune à votre équipe ?",
    description:
      "Vous organisez un événement, représentez une association ou souhaitez donner une tenue commune à votre équipe ? Un T-shirt personnalisé permet de porter le même logo, le même message ou les mêmes couleurs. Il aide à reconnaître les membres du groupe et donne une place visible à ce qui vous rassemble. Il peut aussi devenir un souvenir que chacun conserve après l’événement. Pour une activité professionnelle comme pour une occasion entre proches, votre idée prend une forme que l’on peut porter.",
    benefits: [],
    deliverables: [],
    turnaround: "Selon le projet — sur devis",
    priceLabel: "Sur devis",
    ctaLabel: "Demander un devis",
  },
};

export const printCatalogEn: Record<string, PrintCopy> = {
  "creation-d-affiches": {
    title: "Poster design",
    excerpt: "Are you preparing an event or want people to know about your activity?",
    description:
      "Are you preparing an event or want people to know about your activity? Your audience needs to understand quickly what you offer and why it may matter to them. A poster brings your message, your images and the practical details together in one visual. It helps you present the essentials without long explanations. For a birthday, a gathering or a professional announcement, a well-adapted design gives your message a clear form, ready to be shared.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
  "agendas-personnalises": {
    title: "Personalized planners",
    excerpt: "Between appointments, tasks to finish and ideas to keep, it is easy to lose the thread of the day.",
    description:
      "Between appointments, tasks to finish and ideas to keep, it is easy to lose the thread of the day. A planner helps you gather your notes and prepare the next steps in one place. Personalized with your name or logo, it also becomes an object that feels like you. For yourself, your team or a professional gift, it combines a practical use with a personal touch, without depending on a screen to find your notes again.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
  "impression-de-baches": {
    title: "Banner printing",
    excerpt: "Does your event or activity need to be noticed?",
    description:
      "Does your event or activity need to be noticed? A banner gives space to your name, your message and the important information. It can announce a gathering, present a business or dress the space of an event. Rather than multiplying small materials, you have one central visual that helps visitors recognize the place and understand what is happening. Format and content are chosen according to your need.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
  "badges-personnalises": {
    title: "Personalized badges",
    excerpt: "At an event or within a team, visitors do not always know whom to speak to.",
    description:
      "At an event or within a team, visitors do not always know whom to speak to. A badge with a name, a role or a group mention makes introductions simpler. It helps distinguish organizers, speakers and participants without having to ask again what each person does. It is a small, useful support for welcome and conversation, while giving a shared presentation to the people who represent your organization.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
  "cartes-de-visite-personnalisees": {
    title: "Personalized business cards",
    excerpt: "A good meeting deserves a way to continue.",
    description:
      "A good meeting deserves a way to continue. After a conversation with a client or partner, a business card leaves your name, your activity and the details to reach you again. It avoids having to dictate everything or relying on a number that gets lost among messages. With a presentation that looks like you, you leave a concrete reminder of your work. A small support to keep at hand for planned meetings and unexpected ones.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
  "etiquettes-personnalisees": {
    title: "Personalized labels",
    excerpt: "You have worked on your product: its presentation should help people understand what you offer.",
    description:
      "You have worked on your product: its presentation should help people understand what you offer. A label identifies your brand, distinguishes your products and gathers the useful information you want to share. It gives a landmark to a client discovering your offer or looking for it again. Whether you are starting an activity or want more consistent packaging, personalization helps you build a recognizable presentation, without leaving the product anonymous.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
  "casquettes-personnalisees": {
    title: "Personalized caps",
    excerpt: "Do you want to represent your activity or gather your group around the same sign?",
    description:
      "Do you want to represent your activity or gather your group around the same sign? A personalized cap lets you wear your name, logo or message during an outing, an event or a work day. It can complete a team outfit and help participants recognize each other. It is also a souvenir to offer: an object people can wear, rather than a support meant only to be looked at.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
  "polos-personnalises": {
    title: "Personalized polos",
    excerpt: "When your team welcomes the public, a shared outfit helps people recognize those who represent your activity.",
    description:
      "When your team welcomes the public, a shared outfit helps people recognize those who represent your activity. A personalized polo associates your logo with a neat presentation, without imposing a too formal dress. It can accompany work at reception, in a shop, in a restaurant or during an event. For a team or a small structure, it is a simple way to unify outfits and make your identity visible in everyday exchanges.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
  "flocage-de-maillots": {
    title: "Jersey flocking",
    excerpt: "Do you want a jersey with your name, nickname or favorite number?",
    description:
      "Do you want a jersey with your name, nickname or favorite number? Flocking turns a sports garment into a personal piece. For a team, it also helps distinguish players and give the group a shared presentation. Whether you play with friends, join a tournament or offer a gift to a sports fan, personalization adds a meaning to the jersey that goes beyond the garment.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
  "coques-de-telephone-personnalisees": {
    title: "Personalized phone cases",
    excerpt: "Some photos deserve another place than a folder on your phone.",
    description:
      "Some photos deserve another place than a folder on your phone. A personalized case lets you keep a face, a memory or an image you like close to you. It gives a personal touch to an object you use every day. For yourself or as a gift, it is a way to choose something linked to a person and their story. The phone model then helps check the case that fits your request.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
  "porte-cles-personnalises": {
    title: "Personalized keychains",
    excerpt: "Are you looking for a small useful gift that still feels personal?",
    description:
      "Are you looking for a small useful gift that still feels personal? A keychain with a photo or a logo accompanies an object people use often. It can recall a person, a meeting or an event, while helping recognize a set of keys. For an organization, it is also a simple way to share its identity. A souvenir to take along, for personal use or to thank participants at a particular occasion.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
  "impression-de-portraits": {
    title: "Portrait printing",
    excerpt: "Some photos are too loved to stay only on a phone.",
    description:
      "Some photos are too loved to stay only on a phone. Printing a portrait gives them a place in your home, your office or your personal space. The face of someone close, a family photo or the memory of an important moment can then accompany you in another way. For a birthday, a family attention or the pleasure of decorating your interior, a portrait offers a personal gift, chosen for what it represents.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
  "stylos-personnalises": {
    title: "Personalized pens",
    excerpt: "A pen remains useful during training, a meeting or an appointment.",
    description:
      "A pen remains useful during training, a meeting or an appointment. By adding your name or logo, you associate your activity with an object people can keep and use. It is a discreet way to leave a reminder after an exchange, without limiting yourself to handing out a document. For your team, your participants or your professional contacts, a personalized pen combines a practical use with a reminder of your identity.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
  "tasses-personnalisees": {
    title: "Personalized mugs",
    excerpt: "Are you looking for a gift that shows you thought of the person?",
    description:
      "Are you looking for a gift that shows you thought of the person? A personalized mug can bring together a photo, a first name or a few words around what matters to them. It can mark a birthday, recall a shared memory or accompany a small attention with no particular occasion. Beyond the gift, it finds its place at home or at the office: an everyday object to which your message gives a personal value.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
  "t-shirts-personnalises": {
    title: "Personalized T-shirts",
    excerpt: "Are you organizing an event, representing an association, or giving your team a shared outfit?",
    description:
      "Are you organizing an event, representing an association, or giving your team a shared outfit? A personalized T-shirt lets people wear the same logo, the same message or the same colors. It helps recognize the members of the group and gives a visible place to what brings you together. It can also become a souvenir each person keeps after the event. For professional activity as for an occasion among people close to you, your idea takes a form that can be worn.",
    benefits: [],
    deliverables: [],
    turnaround: "Depends on the project — on request",
    priceLabel: "On request",
    ctaLabel: "Request a quote",
  },
};

export const printCatalogLn: Record<string, PrintCopy> = {
  "creation-d-affiches": {
    title: "Kosala ba affiches",
    excerpt: "Ozali kobongisa événement to olingi bato bayeba activité na yo ?",
    description:
      "Ozali kobongisa événement to olingi bato bayeba activité na yo ? Bato basengeli kososola noki oyo opesaka mpe mpo na nini ekoki kosalisa bango. Affiche endimaka likambo na yo, ba images mpe ba informations ya ntina na visuel moko. Esalisaka yo kolakisa makambo ya ntina mpe te milayi mingi. Mpo na anniversaire, rencontre to annonce ya mosala, création oyo ebongi epesaka likambo na yo lolenge ya polele, ya kokabola.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
  "agendas-personnalises": {
    title: "Ba agendas personnalisés",
    excerpt: "Kati na ba rendez-vous, misala oyo esengeli kosila mpe makanisi oyo esengeli kobomba, pete ya kokanga mokili ya mokolo.",
    description:
      "Kati na ba rendez-vous, misala oyo esengeli kosila mpe makanisi oyo esengeli kobomba, pete ya kokanga mokili ya mokolo. Agenda esalisaka kobundisa ba notes na yo mpe kobongisa ba étapes oyo eza na nsima na esika moko. Soki ezali na nkombo to logo na yo, ekoma mpe eloko oyo ekomonisa yo. Mpo na yo moko, équipe to cadeau ya mosala, esangisaka bosaleli ya solo na attention personnelle, mpe te kotegema écran mpo na kozwa ba notes na yo.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
  "impression-de-baches": {
    title: "Ko-imprimer ba bâches",
    excerpt: "Événement to activité na yo esengeli komonana ?",
    description:
      "Événement to activité na yo esengeli komonana ? Bâche epesaka esika na nkombo na yo, likambo na yo mpe ba informations ya ntina. Ekoki kolakisa rencontre, commerce to kobongisa esika ya événement. Na esika ya kobakisa ba supports mike mingi, ozali na visuel ya katikati oyo esalisaka ba visiteurs koyeba esika mpe kososola nini ezali kosalema. Format mpe contenu eponami na posa na yo.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
  "badges-personnalises": {
    title: "Ba badges personnalisés",
    excerpt: "Na événement to na équipe, ba visiteurs bayebaka ntango nyonso te nani basengeli koloba na ye.",
    description:
      "Na événement to na équipe, ba visiteurs bayebaka ntango nyonso te nani basengeli koloba na ye. Badge na nkombo, fonction to mention ya groupe esalisaka ba présentations ekoma pete. Esalisaka koyeba ba organisateurs, ba intervenants mpe ba participants mpe te kotuna lisusu mosala ya moto nini. Ezali support ya moke oyo esalisaka accueil mpe masolo, mpe epesaka présentation moko na bato oyo bazali kolakisa organisation na yo.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
  "cartes-de-visite-personnalisees": {
    title: "Ba cartes de visite personnalisées",
    excerpt: "Rencontre ya malamu esengeli kokoka kokoba.",
    description:
      "Rencontre ya malamu esengeli kokoka kokoba. Nsima ya masolo na client to partenaire, carte de visite etikaka nkombo na yo, activité na yo mpe ndenge ya kozwa yo. Ekebisaka koteya nyonso to kotegema numéro oyo ekoki kobungana kati na ba messages. Na présentation oyo ekomonisa yo, otikaka rappel ya solo ya activité na yo. Support ya moke ya kobomba pene mpo na ba rencontres oyo eza mpe oyo ekoki koya mbala moko.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
  "etiquettes-personnalisees": {
    title: "Ba étiquettes personnalisées",
    excerpt: "Osalaki na produit na yo : présentation na yango esengeli kosalisa kososola oyo opesaka.",
    description:
      "Osalaki na produit na yo : présentation na yango esengeli kosalisa kososola oyo opesaka. Étiquette esalisaka koyeba marque na yo, kobongola ba produits na yo mpe kobundisa ba informations oyo olingi koloba. Epesaka client oyo azali koyeba offre na yo to oyo azali koluka yango lisusu esika ya koyeba. Soki ozali kobanda activité to olingi ba emballages ekoma ndenge moko, personnalisation esalisaka yo kotonga présentation oyo bato bakoki koyeba, mpe te kotika produit nkaka te.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
  "casquettes-personnalisees": {
    title: "Ba casquettes personnalisées",
    excerpt: "Olingi kolakisa activité na yo to kokangisa groupe na yo na elembo moko ?",
    description:
      "Olingi kolakisa activité na yo to kokangisa groupe na yo na elembo moko ? Casquette personnalisée esalisaka komema nkombo, logo to likambo na yo na sortie, événement to mokolo ya mosala. Ekoki kobakisa tenue ya équipe mpe kosalisa ba participants koyeba bango. Ezali mpe souvenir ya kopesa : eloko oyo bakoki komema, te kaka support ya kotala.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
  "polos-personnalises": {
    title: "Ba polos personnalisés",
    excerpt: "Ntango équipe na yo ezali kondima bato, tenue moko esalisaka koyeba bato oyo bazali kolakisa activité na yo.",
    description:
      "Ntango équipe na yo ezali kondima bato, tenue moko esalisaka koyeba bato oyo bazali kolakisa activité na yo. Polo personnalisé esalisaka kokangisa logo na yo na présentation ya malamu, mpe te kotinda tenue ya formelle mingi. Ekoki kolanda mosala na accueil, na boutique, na restaurant to na événement. Mpo na équipe to structure ya moke, ezali ndenge ya pete ya kopesa unité na ba tenues mpe komonisa identité na yo na masolo ya mokolo na mokolo.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
  "flocage-de-maillots": {
    title: "Flocage ya ba maillots",
    excerpt: "Olingi maillot oyo ezali na nkombo na yo, surnom to numéro oyo olingaka ?",
    description:
      "Olingi maillot oyo ezali na nkombo na yo, surnom to numéro oyo olingaka ? Flocage ebongolaka vêtement ya sport na eloko personnelle. Mpo na équipe, esalisaka mpe koyeba ba joueurs mpe kopesa présentation moko na groupe. Soki ozali kosakana na ba amis, kokota na tournoi to kopesa cadeau na moto oyo alingaka sport, personnalisation ebakisaka na maillot ntina oyo eleki kaka vêtement.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
  "coques-de-telephone-personnalisees": {
    title: "Ba coques ya téléphone personnalisées",
    excerpt: "Ba photos mosusu esengeli esika mosusu te kaka dossier ya téléphone.",
    description:
      "Ba photos mosusu esengeli esika mosusu te kaka dossier ya téléphone. Coque personnalisée esalisaka yo kobomba pene na yo elongi, souvenir to image oyo olingaka. Epesaka touche personnelle na eloko oyo osalelaka mokolo na mokolo. Mpo na yo moko to mpo na kopesa, ezali ndenge ya kopona cadeau oyo ezali na ntina na moto mpe lisolo na ye. Modèle ya téléphone esalisaka nsima kotala coque oyo ebongi na posa na yo.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
  "porte-cles-personnalises": {
    title: "Ba porte-clés personnalisés",
    excerpt: "Ozali koluka cadeau ya moke oyo esaleli mpe ezali na touche personnelle ?",
    description:
      "Ozali koluka cadeau ya moke oyo esaleli mpe ezali na touche personnelle ? Porte-clés na photo to logo elandaka eloko oyo basalelaka mingi. Ekoki kokundola moto, rencontre to événement, mpe kosalisa koyeba trousseau. Mpo na organisation, ezali mpe ndenge ya pete ya kokabola identité na yango. Souvenir ya komema na nzela, mpo na yo moko to mpo na kotonda ba participants na ntango ya ntina.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
  "impression-de-portraits": {
    title: "Ko-imprimer ba portraits",
    excerpt: "Ba photos ezali oyo tolingaka mingi mpo na kotika yango kaka na téléphone.",
    description:
      "Ba photos ezali oyo tolingaka mingi mpo na kotika yango kaka na téléphone. Ko-imprimer portrait epesaka yango esika na ndako, bureau to esika na yo. Elongi ya moto ya pene, photo ya famille to souvenir ya ntango ya ntina ekoki kolanda yo na ndenge mosusu. Mpo na anniversaire, attention ya famille to mpo na kobongisa ndako, portrait ezali cadeau personnelle, oponami mpo na oyo ezali kolakisa.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
  "stylos-personnalises": {
    title: "Ba stylos personnalisés",
    excerpt: "Stylo esaleli ntango ya formation, réunion to rendez-vous.",
    description:
      "Stylo esaleli ntango ya formation, réunion to rendez-vous. Soki obakisi nkombo to logo na yo, okangisaka activité na yo na eloko oyo bakoki kobomba mpe kosalela. Ezali ndenge ya pete ya kotika souvenir nsima ya masolo, mpe te kofunda kaka document. Mpo na équipe, ba participants to ba contacts ya mosala, stylo personnalisé esangisaka bosaleli mpe rappel ya identité na yo.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
  "tasses-personnalisees": {
    title: "Ba tasses personnalisées",
    excerpt: "Ozali koluka cadeau oyo emonisa ete okanisaki moto ?",
    description:
      "Ozali koluka cadeau oyo emonisa ete okanisaki moto ? Tasse personnalisée ekoki kobundisa photo, nkombo to maloba moke na makambo oyo ezali na ntina na ye. Ekoki kolakisa anniversaire, kokundola souvenir to kolanda attention ya moke ata sans occasion. Koleka cadeau, ezwa esika na ndako to na bureau : eloko ya mokolo na mokolo oyo likambo na yo epesaka ntina personnelle.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
  "t-shirts-personnalises": {
    title: "Ba T-shirts personnalisés",
    excerpt: "Ozali kobongisa événement, kolakisa association to olingi tenue moko mpo na équipe na yo ?",
    description:
      "Ozali kobongisa événement, kolakisa association to olingi tenue moko mpo na équipe na yo ? T-shirt personnalisé esalisaka komema logo moko, likambo moko to ba couleurs moko. Esalisaka koyeba ba membres ya groupe mpe epesaka esika ya komonana na oyo ekangisaka bino. Ekoki mpe kokoma souvenir oyo moto nini abombaka nsima ya événement. Mpo na mosala to mpo na ntango kati na bato ya pene, likanisi na yo ezwa lolenge oyo bakoki komema.",
    benefits: [],
    deliverables: [],
    turnaround: "Na ndenge ya projet — na devis",
    priceLabel: "Na devis",
    ctaLabel: "Tuna devis",
  },
};

export function printCoverSrc(file: string): string {
  return `/images/services/${encodeURI(file)}`;
}

export function printCoverFile(src: string): string {
  const name = src.split("/").pop() ?? "";
  try {
    return decodeURI(name);
  } catch {
    return name;
  }
}

export function isPrintService(item?: Pick<ServiceItem, "id" | "slug"> | null): boolean {
  if (!item) return false;
  if (item.id.startsWith("s-imp-")) return true;
  return printServiceMeta.some((meta) => meta.slug === item.slug);
}

export function designKindFromService(item?: Pick<ServiceItem, "id" | "slug"> | null): PrintDesignKind | "" {
  if (!item) return "";
  return printServiceMeta.find((meta) => meta.id === item.id || meta.slug === item.slug)?.designKind ?? "";
}

export function buildPrintServices(copy: Record<string, PrintCopy>): ServiceItem[] {
  return printServiceMeta.map((meta) => {
    const text = copy[meta.slug];
    return {
      id: meta.id,
      title: text.title,
      slug: meta.slug,
      excerpt: text.excerpt,
      description: text.description,
      benefits: [...text.benefits],
      deliverables: [...text.deliverables],
      turnaround: text.turnaround,
      priceLabel: text.priceLabel,
      coverImage: printCoverSrc(meta.file),
      featured: false,
      ctaLabel: text.ctaLabel,
      ctaHref: `/commander?service=${meta.slug}`,
    };
  });
}

export const catalogPrintServices = buildPrintServices(printCatalogFr);

export function withPrintCatalog(services: ServiceItem[]): ServiceItem[] {
  const have = new Set(services.map((item) => item.slug));
  const extra = catalogPrintServices.filter((item) => !have.has(item.slug));
  return extra.length ? [...services, ...extra] : services;
}
