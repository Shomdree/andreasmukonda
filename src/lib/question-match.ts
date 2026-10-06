export type KnownQuestion = {
  id: string;
  source: "faq" | "public";
  needles: string[];
  question: string;
  answer: string;
};

const STOP = new Set([
  "a",
  "an",
  "are",
  "au",
  "aux",
  "avec",
  "can",
  "ce",
  "ces",
  "cet",
  "cette",
  "comment",
  "d",
  "dans",
  "de",
  "des",
  "do",
  "does",
  "du",
  "en",
  "est",
  "et",
  "eza",
  "ezali",
  "how",
  "i",
  "il",
  "in",
  "is",
  "j",
  "je",
  "kaka",
  "l",
  "la",
  "le",
  "les",
  "ma",
  "me",
  "mes",
  "mon",
  "mpo",
  "my",
  "n",
  "na",
  "nakoki",
  "ndenge",
  "ne",
  "ngai",
  "nini",
  "nous",
  "of",
  "on",
  "ou",
  "oyo",
  "par",
  "pas",
  "peut",
  "peux",
  "plus",
  "pour",
  "puis",
  "quel",
  "quelle",
  "quelles",
  "quels",
  "quoi",
  "soki",
  "sont",
  "sur",
  "te",
  "the",
  "to",
  "tu",
  "un",
  "une",
  "vos",
  "votre",
  "vous",
  "what",
  "ya",
  "yo",
]);

const ALIASES: Record<string, string> = {
  commande: "commande",
  commander: "commande",
  commandes: "commande",
  order: "commande",
  prix: "prix",
  tarif: "prix",
  tarifs: "prix",
  combien: "prix",
  devis: "prix",
  price: "prix",
  formation: "formation",
  formations: "formation",
  training: "formation",
  trainings: "formation",
  kinshasa: "kinshasa",
  distance: "distance",
  remotely: "distance",
  remote: "distance",
  publiee: "publier",
  publier: "publier",
  published: "publier",
  publication: "publier",
  shomdree: "shomdree",
  gsi: "shomdree",
};

export function normalizeQuestion(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function aliasToken(token: string): string {
  return ALIASES[token] ?? token;
}

export function questionTokens(text: string): string[] {
  return normalizeQuestion(text)
    .split(" ")
    .map(aliasToken)
    .filter((token) => token.length > 1 && !STOP.has(token));
}

export function questionSimilarity(a: string, b: string): number {
  const left = normalizeQuestion(a);
  const right = normalizeQuestion(b);
  if (!left || !right) return 0;
  if (left === right) return 1;
  if (left.length >= 12 && right.length >= 12 && (left.includes(right) || right.includes(left))) return 0.94;
  const ta = questionTokens(a);
  const tb = questionTokens(b);
  if (!ta.length || !tb.length) return 0;
  const setB = new Set(tb);
  const inter = ta.filter((token) => setB.has(token)).length;
  if (!inter) return 0;
  const union = new Set([...ta, ...tb]).size;
  const jaccard = inter / union;
  const cover = inter / Math.min(ta.length, tb.length);
  return Math.max(jaccard, cover * 0.86);
}

export function findKnownQuestion(
  text: string,
  known: KnownQuestion[],
  threshold = 0.58,
): KnownQuestion | undefined {
  const prepared = text.trim();
  if (prepared.length < 8) return undefined;
  let best: { item: KnownQuestion; score: number } | undefined;
  for (const item of known) {
    for (const needle of item.needles) {
      const score = questionSimilarity(prepared, needle);
      if (!best || score > best.score) best = { item, score };
    }
  }
  return best && best.score >= threshold ? best.item : undefined;
}

export function collectKnownQuestions(input: {
  faqDisplay: { q: string; a: string }[];
  faqNeedles: string[][];
  publicQuestions: { id: string; question: string; answer: string }[];
  extraFaq?: { id: string; question: string; answer: string }[];
}): KnownQuestion[] {
  const known: KnownQuestion[] = input.faqDisplay.map((item, index) => ({
    id: `faq-${index}`,
    source: "faq",
    needles: [...new Set([item.q, ...(input.faqNeedles[index] ?? [])].filter(Boolean))],
    question: item.q,
    answer: item.a,
  }));

  for (const item of input.extraFaq ?? []) {
    if (findKnownQuestion(item.question, known, 0.4)) continue;
    known.push({
      id: item.id.startsWith("faq-") ? item.id : `faq-extra-${item.id}`,
      source: "faq",
      needles: [item.question],
      question: item.question,
      answer: item.answer,
    });
  }

  for (const item of input.publicQuestions) {
    if (!item.question.trim()) continue;
    if (findKnownQuestion(item.question, known)) continue;
    known.push({
      id: `public-${item.id}`,
      source: "public",
      needles: [item.question],
      question: item.question,
      answer: item.answer,
    });
  }

  return known;
}
