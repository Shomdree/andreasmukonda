export type VideoKind = "iframe" | "file" | "external";
export type VideoAspect = "landscape" | "portrait";

export type VideoSource = {
  kind: VideoKind;
  src: string;
  embedSrc: string | null;
  poster: string | null;
  aspect: VideoAspect;
  platform: string;
  mime: string | null;
};

const YOUTUBE_ID = /^[\w-]{11}$/;
const VIDEO_FILE = /\.(mp4|m4v|webm|ogv|ogg)$/i;

export function isVideoFile(path: string): boolean {
  return VIDEO_FILE.test(path.split("?")[0] ?? "");
}

export function videoMime(path: string): string | null {
  const clean = (path.split("?")[0] ?? "").toLowerCase();
  if (clean.endsWith(".webm")) return "video/webm";
  if (clean.endsWith(".ogv") || clean.endsWith(".ogg")) return "video/ogg";
  if (clean.endsWith(".mp4") || clean.endsWith(".m4v")) return "video/mp4";
  return null;
}

export function youtubePoster(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function resolveVideo(raw: string): VideoSource {
  const src = raw.trim();
  const empty: VideoSource = {
    kind: "external",
    src,
    embedSrc: null,
    poster: null,
    aspect: "landscape",
    platform: "",
    mime: null,
  };
  if (!src) return empty;

  if (src.startsWith("/") && !src.startsWith("//")) {
    if (!isVideoFile(src)) return empty;
    return {
      kind: "file",
      src,
      embedSrc: null,
      poster: null,
      aspect: "landscape",
      platform: "Fichier",
      mime: videoMime(src),
    };
  }

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return empty;
  }

  const youtube = youtubeSource(url);
  if (youtube) return youtube;

  const facebook = facebookSource(url);
  if (facebook) return facebook;

  const tiktok = tiktokSource(url);
  if (tiktok) return tiktok;

  const instagram = instagramSource(url);
  if (instagram) return instagram;

  if (isVideoFile(url.pathname)) {
    return {
      kind: "file",
      src,
      embedSrc: null,
      poster: null,
      aspect: "landscape",
      platform: "Fichier",
      mime: videoMime(url.pathname),
    };
  }

  return { ...empty, src };
}

function hostOf(url: URL): string {
  return url.hostname.replace(/^www\./, "").replace(/^m\./, "").replace(/^web\./, "").toLowerCase();
}

function youtubeSource(url: URL): VideoSource | null {
  const host = hostOf(url);
  if (host !== "youtu.be" && host !== "youtube.com" && host !== "youtube-nocookie.com") return null;

  const parts = url.pathname.split("/").filter(Boolean);
  let id = url.searchParams.get("v") ?? "";
  if (!id && host === "youtu.be") id = parts[0] ?? "";
  if (!id) {
    const marker = parts.findIndex((part) => part === "embed" || part === "shorts" || part === "live" || part === "v");
    if (marker >= 0) id = parts[marker + 1] ?? "";
  }
  id = id.replace(/[^A-Za-z0-9_-].*$/, "");
  if (!YOUTUBE_ID.test(id)) return null;

  const portrait = parts.includes("shorts");
  const start = youtubeStart(url);
  const embed = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
  if (start) embed.searchParams.set("start", String(start));

  return {
    kind: "iframe",
    src: url.toString(),
    embedSrc: embed.toString(),
    poster: youtubePoster(id),
    aspect: portrait ? "portrait" : "landscape",
    platform: "YouTube",
    mime: null,
  };
}

function youtubeStart(url: URL): number | null {
  const raw = url.searchParams.get("start") || url.searchParams.get("t");
  if (!raw) return null;
  if (/^\d+$/.test(raw)) return Number(raw);
  const match = raw.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!match) return null;
  const seconds = Number(match[1] || 0) * 3600 + Number(match[2] || 0) * 60 + Number(match[3] || 0);
  return seconds > 0 ? seconds : null;
}

function facebookSource(url: URL): VideoSource | null {
  const host = hostOf(url);
  if (host !== "facebook.com" && host !== "fb.com" && host !== "fb.watch") return null;
  const href = url.toString();
  const embed = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(href)}&show_text=false`;
  const portrait = url.pathname.includes("/reel/");
  return {
    kind: "iframe",
    src: href,
    embedSrc: embed,
    poster: null,
    aspect: portrait ? "portrait" : "landscape",
    platform: "Facebook",
    mime: null,
  };
}

function tiktokSource(url: URL): VideoSource | null {
  const host = hostOf(url);
  if (host !== "tiktok.com") return null;
  const parts = url.pathname.split("/").filter(Boolean);
  const marker = parts.indexOf("video");
  const id = marker >= 0 ? parts[marker + 1] ?? "" : "";
  if (!/^\d+$/.test(id)) return null;
  return {
    kind: "iframe",
    src: url.toString(),
    embedSrc: `https://www.tiktok.com/player/v1/${id}`,
    poster: null,
    aspect: "portrait",
    platform: "TikTok",
    mime: null,
  };
}

function instagramSource(url: URL): VideoSource | null {
  const host = hostOf(url);
  if (host !== "instagram.com") return null;
  const parts = url.pathname.split("/").filter(Boolean);
  const marker = parts.findIndex((part) => part === "p" || part === "reel" || part === "reels" || part === "tv");
  const code = marker >= 0 ? parts[marker + 1] ?? "" : "";
  if (!code) return null;
  const kind = parts[marker] === "p" ? "p" : "reel";
  return {
    kind: "iframe",
    src: url.toString(),
    embedSrc: `https://www.instagram.com/${kind}/${code}/embed/`,
    poster: null,
    aspect: kind === "p" ? "landscape" : "portrait",
    platform: "Instagram",
    mime: null,
  };
}
