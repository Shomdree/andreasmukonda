(function () {
  var COOKIE = "preferred_theme";
  var DARK = "#0E1014";
  var LIGHT = "#F7F5F0";
  window.__amThemeBound = true;

  function read() {
    try {
      var match = document.cookie.match(/(?:^|; )preferred_theme=(dark|light)/);
      var value = match ? match[1] : localStorage.getItem(COOKIE);
      return value === "light" ? "light" : "dark";
    } catch (err) {
      return "dark";
    }
  }

  function apply(theme) {
    if (theme !== "light" && theme !== "dark") theme = "dark";
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(COOKIE, theme);
    } catch (err) {
      /* private mode */
    }
    var secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = COOKIE + "=" + theme + "; Path=/; Max-Age=31536000; SameSite=Lax" + secure;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? LIGHT : DARK);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      var next = theme === "light" ? button.getAttribute("data-label-dark") : button.getAttribute("data-label-light");
      if (next) button.setAttribute("aria-label", next);
      button.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    });
  }

  apply(read());

  document.addEventListener(
    "click",
    function (event) {
      var node = event.target;
      if (!node || !node.closest || !node.closest("[data-theme-toggle]")) return;
      event.preventDefault();
      apply(read() === "dark" ? "light" : "dark");
    },
    true,
  );

  document.addEventListener("astro:after-swap", function () {
    apply(read());
  });
  document.addEventListener("astro:page-load", function () {
    apply(read());
  });
})();
