const COOKIE = "preferred_theme";
const DARK = "#0E1014";
const LIGHT = "#F7F5F0";

let bound = false;

function storedTheme(): "dark" | "light" {
  try {
    const match = document.cookie.match(/(?:^|; )preferred_theme=(dark|light)/);
    const value = match?.[1] || localStorage.getItem(COOKIE);
    return value === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function applyTheme(theme: "dark" | "light"): void {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(COOKIE, theme);
  } catch {
    /* private mode */
  }
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${theme}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute("content", theme === "light" ? LIGHT : DARK);
  });
  document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((button) => {
    const next = theme === "light" ? button.dataset.labelDark : button.dataset.labelLight;
    if (next) button.setAttribute("aria-label", next);
    button.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
  });
}

export function restoreTheme(): void {
  applyTheme(storedTheme());
}

export function bootTheme(): void {
  restoreTheme();
  if (bound) return;
  bound = true;
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!target.closest("[data-theme-toggle]")) return;
    event.preventDefault();
    applyTheme(storedTheme() === "dark" ? "light" : "dark");
  });
  document.addEventListener("astro:after-swap", restoreTheme);
}
