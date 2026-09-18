(function () {
  function stopOthers(current) {
    document.querySelectorAll("[data-live-card]").forEach(function (card) {
      if (card === current) return;
      var frame = card.querySelector("iframe");
      var stage = card.querySelector(".stage");
      var thumb = card.getAttribute("data-thumb");
      if (!frame || !stage || !thumb) return;
      stage.innerHTML = "";
      var image = document.createElement("img");
      image.src = thumb;
      image.alt = "";
      image.width = 800;
      image.height = 450;
      image.loading = "lazy";
      image.decoding = "async";
      image.setAttribute("style", "width:100%;height:100%;object-fit:contain;background:#10131a;display:block");
      stage.appendChild(image);
      var play = card.querySelector("[data-live-play]");
      if (play) play.hidden = false;
    });
  }

  document.addEventListener(
    "click",
    function (event) {
      var target = event.target;
      if (!target || !target.closest) return;
      var button = target.closest("[data-live-play]");
      if (!button) return;
      var card = button.closest("[data-live-card]");
      if (!card) return;
      var embed = card.getAttribute("data-embed");
      if (!embed) return;
      event.preventDefault();
      stopOthers(card);
      var stage = card.querySelector(".stage");
      if (!stage) return;
      var frame = document.createElement("iframe");
      frame.src = embed + (embed.indexOf("?") >= 0 ? "&" : "?") + "rel=0";
      frame.title = button.getAttribute("data-player-title") || "Video";
      frame.allow = "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      frame.allowFullscreen = true;
      frame.loading = "lazy";
      frame.setAttribute("style", "width:100%;aspect-ratio:16/9;border:0;background:#000");
      stage.replaceChildren(frame);
      button.hidden = true;
    },
    true,
  );
})();
