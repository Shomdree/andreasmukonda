(function () {
  var root = document.documentElement;
  var portaled = false;

  function detailsNode() {
    return document.querySelector("details.nav-mobile");
  }

  function openMenu() {
    return document.querySelector("details.nav-mobile[open]");
  }

  function headerHeight() {
    var header = document.querySelector(".site-header");
    if (!header) return 64;
    var height = header.getBoundingClientRect().height;
    return height > 0 ? Math.round(height) : 64;
  }

  function layer(selector) {
    return document.querySelector(selector);
  }

  function portalOut() {
    var details = detailsNode();
    if (!details || portaled) return;
    var dismiss = details.querySelector("[data-nav-layer='dismiss']");
    var sheet = details.querySelector("[data-nav-layer='sheet']");
    if (dismiss) document.body.appendChild(dismiss);
    if (sheet) document.body.appendChild(sheet);
    portaled = true;
  }

  function portalIn() {
    var details = detailsNode();
    var dismiss = layer("[data-nav-layer='dismiss']");
    var sheet = layer("[data-nav-layer='sheet']");
    if (details) {
      if (dismiss && dismiss.parentNode !== details) details.appendChild(dismiss);
      if (sheet && sheet.parentNode !== details) details.appendChild(sheet);
    } else {
      if (dismiss) dismiss.remove();
      if (sheet) sheet.remove();
    }
    portaled = false;
  }

  function setOpen(open) {
    root.classList.toggle("nav-open", open);
    if (document.body) document.body.classList.toggle("nav-open", open);
    if (open) {
      root.style.setProperty("--header-h", headerHeight() + "px");
      portalOut();
    } else {
      portalIn();
      root.style.removeProperty("--header-h");
    }
  }

  function closeMenu() {
    var node = openMenu();
    if (node) node.removeAttribute("open");
    setOpen(false);
  }

  function syncLock() {
    setOpen(Boolean(openMenu()));
  }

  document.addEventListener(
    "click",
    function (event) {
      var node = openMenu();
      if (!node) return;
      var target = event.target;
      if (!target || !target.closest) return;
      if (target.closest("[data-nav-dismiss]")) {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (target.closest("details.nav-mobile, [data-nav-layer='sheet']")) return;
      closeMenu();
    },
    true,
  );

  document.addEventListener(
    "touchmove",
    function (event) {
      if (!root.classList.contains("nav-open")) return;
      var target = event.target;
      if (target && target.closest && target.closest("[data-nav-layer='sheet']")) return;
      event.preventDefault();
    },
    { passive: false },
  );

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener(
    "toggle",
    function (event) {
      var node = event.target;
      if (!node || !node.classList || !node.classList.contains("nav-mobile")) return;
      syncLock();
    },
    true,
  );

  document.addEventListener("astro:before-swap", closeMenu);
  document.addEventListener("astro:page-load", function () {
    document.querySelectorAll("body > [data-nav-layer]").forEach(function (node) {
      node.remove();
    });
    portaled = false;
    syncLock();
  });
})();
