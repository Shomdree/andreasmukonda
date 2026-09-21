import { describe, expect, it } from "vitest";
import { isVideoFile, resolveVideo, videoMime, youtubePoster } from "./video-embed";

describe("video embed", () => {
  it("embeds common YouTube URL shapes on youtube-nocookie", () => {
    const watch = resolveVideo("https://www.youtube.com/watch?v=dQw4w9wgGcQ");
    expect(watch.kind).toBe("iframe");
    expect(watch.embedSrc).toBe("https://www.youtube-nocookie.com/embed/dQw4w9wgGcQ");
    expect(watch.poster).toBe(youtubePoster("dQw4w9wgGcQ"));
    expect(watch.aspect).toBe("landscape");

    const short = resolveVideo("https://youtu.be/dQw4w9wgGcQ");
    expect(short.embedSrc).toBe("https://www.youtube-nocookie.com/embed/dQw4w9wgGcQ");

    const embed = resolveVideo("https://www.youtube.com/embed/dQw4w9wgGcQ");
    expect(embed.embedSrc).toBe("https://www.youtube-nocookie.com/embed/dQw4w9wgGcQ");

    const shorts = resolveVideo("https://www.youtube.com/shorts/dQw4w9wgGcQ");
    expect(shorts.aspect).toBe("portrait");
    expect(shorts.embedSrc).toBe("https://www.youtube-nocookie.com/embed/dQw4w9wgGcQ");

    const timed = resolveVideo("https://www.youtube.com/watch?v=dQw4w9wgGcQ&t=1m30s");
    expect(timed.embedSrc).toBe("https://www.youtube-nocookie.com/embed/dQw4w9wgGcQ?start=90");
  });

  it("embeds Facebook, TikTok and Instagram without loading extra scripts", () => {
    const facebook = resolveVideo("https://www.facebook.com/watch/?v=123456789");
    expect(facebook.kind).toBe("iframe");
    expect(facebook.embedSrc).toContain("https://www.facebook.com/plugins/video.php?href=");
    expect(facebook.platform).toBe("Facebook");

    const tiktok = resolveVideo("https://www.tiktok.com/@studio/video/7123456789012345678");
    expect(tiktok.embedSrc).toBe("https://www.tiktok.com/player/v1/7123456789012345678");
    expect(tiktok.aspect).toBe("portrait");

    const reel = resolveVideo("https://www.instagram.com/reel/AbCdef12345/");
    expect(reel.embedSrc).toBe("https://www.instagram.com/reel/AbCdef12345/embed/");
    expect(reel.aspect).toBe("portrait");
  });

  it("plays local and remote video files in a native player", () => {
    const local = resolveVideo("/videos/presentation.mp4");
    expect(local.kind).toBe("file");
    expect(local.mime).toBe("video/mp4");
    expect(isVideoFile("/videos/clip.webm?v=1")).toBe(true);
    expect(videoMime("/videos/clip.webm")).toBe("video/webm");

    const remote = resolveVideo("https://cdn.example.com/studio/clip.webm");
    expect(remote.kind).toBe("file");
    expect(remote.mime).toBe("video/webm");
  });

  it("does not invent an embed for unknown or empty links", () => {
    expect(resolveVideo("").kind).toBe("external");
    expect(resolveVideo("https://www.linkedin.com/feed/update/urn:li:activity:1").embedSrc).toBeNull();
    expect(resolveVideo("https://vm.tiktok.com/ZMabcdef/").embedSrc).toBeNull();
    expect(resolveVideo("/images/logos/mark.png").kind).toBe("external");
  });
});
