export const MOTION_FAST_MS = 180;
export const MOTION_NORMAL_MS = 320;
export const MOTION_SLOW_MS = 650;

export function reducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function stagger(count: number, step = 80, max = 320): number[] {
  return Array.from({ length: Math.max(0, count) }, (_, i) => Math.min(i * step, max));
}

export function observeReveal(root: ParentNode = document): () => void {
  const nodes = [...root.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger]")];
  if (!nodes.length) return () => undefined;

  const show = (node: Element) => node.classList.add("is-in");

  if (reducedMotion() || typeof IntersectionObserver === "undefined") {
    for (const node of nodes) show(node);
    return () => undefined;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target);
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.01, rootMargin: "64px 0px" },
  );

  for (const node of nodes) io.observe(node);

  const revealVisible = () => {
    const vh = window.innerHeight || 0;
    for (const node of nodes) {
      if (node.classList.contains("is-in")) continue;
      const rect = node.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < vh + 64) {
        show(node);
        io.unobserve(node);
      }
    }
  };

  const raf = requestAnimationFrame(revealVisible);
  const fallback = window.setTimeout(() => {
    for (const node of nodes) show(node);
  }, 700);

  return () => {
    cancelAnimationFrame(raf);
    window.clearTimeout(fallback);
    io.disconnect();
  };
}

export function parallaxPointer(target: HTMLElement, amplitude = 8): () => void {
  if (reducedMotion() || window.matchMedia("(pointer: coarse)").matches) return () => undefined;

  let frame = 0;
  let nextX = 0;
  let nextY = 0;
  let currentX = 0;
  let currentY = 0;
  const max = Math.min(Math.max(amplitude, 0), 10);

  const tick = () => {
    currentX += (nextX - currentX) * 0.12;
    currentY += (nextY - currentY) * 0.12;
    target.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
    frame = requestAnimationFrame(tick);
  };

  const onMove = (event: PointerEvent) => {
    const rect = target.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    nextX = ((event.clientX - cx) / rect.width) * max;
    nextY = ((event.clientY - cy) / rect.height) * max;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onMove);
    target.style.transform = "";
  };
}

export function enhanceForms(root: ParentNode = document): () => void {
  const forms = [...root.querySelectorAll<HTMLFormElement>("form.js-form")];
  const cleanups: Array<() => void> = [];

  for (const form of forms) {
    const started = form.querySelector<HTMLInputElement>("[data-started]");
    if (started && !started.value) started.value = String(Date.now());

    const onSubmit = () => {
      if (form.dataset.sending === "1") return false;
      form.dataset.sending = "1";
      const button = form.querySelector<HTMLButtonElement>("button[type=submit]");
      if (!button) return;
      button.disabled = true;
      button.classList.add("is-loading");
      button.dataset.label = button.textContent ?? "";
      button.textContent = button.dataset.loadingLabel || "Envoi en cours…";
    };

    form.addEventListener("submit", onSubmit);
    cleanups.push(() => form.removeEventListener("submit", onSubmit));
  }

  return () => {
    for (const stop of cleanups) stop();
  };
}

export function bindHeader(header: HTMLElement | null): () => void {
  if (!header) return () => undefined;
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

let stopAll: (() => void) | null = null;

export function bootMotion(): void {
  stopAll?.();
  const stops = [
    observeReveal(),
    enhanceForms(),
    bindHeader(document.querySelector(".site-header")),
  ];
  const parallaxRoot = document.querySelector<HTMLElement>("[data-parallax]");
  if (parallaxRoot) stops.push(parallaxPointer(parallaxRoot));
  stopAll = () => {
    for (const stop of stops) stop();
  };
}
