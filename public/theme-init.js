(function () {
  try {
    var match = document.cookie.match(/(?:^|; )preferred_theme=(dark|light)/);
    var theme = match ? match[1] : localStorage.getItem("preferred_theme");
    if (theme !== "light" && theme !== "dark") theme = "dark";
    document.documentElement.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#F7F5F0" : "#0E1014");
  } catch {
    /* private mode */
  }
})();
