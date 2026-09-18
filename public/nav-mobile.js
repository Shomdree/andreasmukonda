(function () {
  var scrollY = 0;
  var locked = false;

  function openMenu() {
    return document.querySelector("details.nav-mobile[open]");
  }

  function lockScroll() {
    if (locked) return;
    locked = true;
    scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.position = "fixed";
    document.body.style.top = "-" + scrollY + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }

  function unlockScroll() {
    if (!locked) return;
    locked = false;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    window.scrollTo(0, scrollY);
  }

  function syncLock() {
    if (openMenu()) lockScroll();
    else unlockScroll();
  }

  function closeMenu() {
    var node = openMenu();
    if (node) node.removeAttribute("open");
    unlockScroll();
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
      if (target.closest("details.nav-mobile")) return;
      closeMenu();
    },
    true,
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
  document.addEventListener("astro:page-load", syncLock);
})();
