(function () {
  if (window.__amVideoPlayer) return;
  window.__amVideoPlayer = true;

  function withAutoplay(embed) {
    if (!embed) return embed;
    var join = embed.indexOf("?") >= 0 ? "&" : "?";
    if (/youtube-nocookie\.com|youtube\.com/.test(embed)) {
      return embed + join + "rel=0&modestbranding=1&playsinline=1&autoplay=1";
    }
    if (/tiktok\.com/.test(embed)) {
      return embed + join + "autoplay=1";
    }
    if (/facebook\.com\/plugins\/video\.php/.test(embed)) {
      return embed + (embed.indexOf("autoplay=") >= 0 ? "" : join + "autoplay=true");
    }
    return embed;
  }

  function restore(card) {
    var mount = card.querySelector("[data-video-mount]");
    var poster = card.querySelector("[data-video-poster]");
    if (mount) {
      var current = mount.querySelector("video");
      if (current) {
        current.pause();
        current.removeAttribute("src");
        current.load();
      }
      mount.replaceChildren();
      mount.hidden = true;
    }
    if (poster) poster.hidden = false;
    card.querySelectorAll("[data-video-play]").forEach(function (el) {
      el.hidden = false;
    });
  }

  function stopOthers(current) {
    document.querySelectorAll("[data-video-card], [data-live-card]").forEach(function (card) {
      if (card === current) return;
      restore(card);
    });
  }

  function play(card, title) {
    var embed = card.getAttribute("data-embed");
    var file = card.getAttribute("data-file");
    var mime = card.getAttribute("data-mime") || "";
    var mount = card.querySelector("[data-video-mount]");
    var poster = card.querySelector("[data-video-poster]");
    if (!mount || (!embed && !file)) return;

    stopOthers(card);
    mount.hidden = false;
    if (poster) poster.hidden = true;
    card.querySelectorAll("[data-video-play]").forEach(function (el) {
      if (el.tagName !== "A") el.hidden = true;
    });

    if (file) {
      var video = document.createElement("video");
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.title = title;
      video.setAttribute("playsinline", "");
      video.setAttribute("controlslist", "nodownload");
      video.setAttribute(
        "style",
        "width:100%;height:100%;display:block;background:#000;object-fit:contain",
      );
      if (mime) {
        var source = document.createElement("source");
        source.src = file;
        source.type = mime;
        video.appendChild(source);
      } else {
        video.src = file;
      }
      mount.replaceChildren(video);
      var attempt = video.play();
      if (attempt && attempt.catch) attempt.catch(function () {});
      return;
    }

    var frame = document.createElement("iframe");
    frame.src = withAutoplay(embed);
    frame.title = title;
    frame.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    frame.allowFullscreen = true;
    frame.loading = "lazy";
    frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    frame.setAttribute("style", "width:100%;height:100%;border:0;background:#000;display:block");
    mount.replaceChildren(frame);
  }

  document.addEventListener(
    "click",
    function (event) {
      var target = event.target;
      if (!target || !target.closest) return;
      var trigger = target.closest("[data-video-play], [data-live-play]");
      if (!trigger) return;
      var card = trigger.closest("[data-video-card], [data-live-card]");
      if (!card) return;
      if (!card.getAttribute("data-embed") && !card.getAttribute("data-file")) return;
      event.preventDefault();
      play(card, trigger.getAttribute("data-player-title") || card.getAttribute("data-title") || "Video");
    },
    true,
  );

  document.addEventListener("astro:before-swap", function () {
    document.querySelectorAll("[data-video-card], [data-live-card]").forEach(restore);
  });
})();
