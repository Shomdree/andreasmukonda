export type VideoCopy = {
  title: string;
};

export type VideoMeta = {
  id: `live-tt-${string}`;
  tiktokId: string;
  file: string;
};

export const videoWorkMeta: VideoMeta[] = [
  { id: "live-tt-001", tiktokId: "7614529648487091463", file: "tt-001.jpg" },
  { id: "live-tt-002", tiktokId: "7614530779720224018", file: "tt-002.jpg" },
  { id: "live-tt-003", tiktokId: "7614653368669146375", file: "tt-003.jpg" },
  { id: "live-tt-004", tiktokId: "7614883680766397703", file: "tt-004.jpg" },
  { id: "live-tt-005", tiktokId: "7614886022807129351", file: "tt-005.jpg" },
];

export const videoCatalogFr: Record<string, VideoCopy> = {
  "live-tt-001": { title: "Conception d’une affiche pour église" },
  "live-tt-002": { title: "Conception d’une affiche corporate" },
  "live-tt-003": { title: "Conception d’affiches d’anniversaire" },
  "live-tt-004": { title: "Je crée une affiche professionnelle de A à Z avec Photoshop" },
  "live-tt-005": { title: "Cette fois-ci, je crée une affiche pour une église. Le résultat est incroyable." },
};

export const videoCatalogLn: Record<string, VideoCopy> = {
  "live-tt-001": { title: "Kobongisa affiche ya église" },
  "live-tt-002": { title: "Kobongisa affiche corporate" },
  "live-tt-003": { title: "Kobongisa ba affiches ya anniversaire" },
  "live-tt-004": { title: "Nasali affiche professionnelle kobanda na nsuka na Photoshop" },
  "live-tt-005": { title: "Siku oyo nasali affiche ya église. Résultat ezali kitoko mingi." },
};

export const videoCatalogEn: Record<string, VideoCopy> = {
  "live-tt-001": { title: "Designing a poster for a church" },
  "live-tt-002": { title: "Designing a corporate poster" },
  "live-tt-003": { title: "Designing birthday posters" },
  "live-tt-004": { title: "I create a professional poster from start to finish in Photoshop" },
  "live-tt-005": { title: "This time I create a poster for a church. The result is incredible." },
};
