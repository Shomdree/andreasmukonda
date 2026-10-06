import { findKnownQuestion, type KnownQuestion } from "./question-match";

type Labels = {
  alreadyAsked: string;
  alreadyAskedLead: string;
  alreadyAskedCta: string;
};

function readKnown(root: ParentNode): KnownQuestion[] {
  const node = root.querySelector("#known-questions");
  if (!node?.textContent?.trim()) return [];
  try {
    const parsed = JSON.parse(node.textContent) as KnownQuestion[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setHidden(node: HTMLElement, hidden: boolean) {
  node.hidden = hidden;
  if (hidden) node.removeAttribute("tabindex");
}

export function bindQuestionMatch(root: ParentNode = document): () => void {
  const form = root.querySelector<HTMLFormElement>("form[data-known-questions]");
  const field = form?.querySelector<HTMLTextAreaElement>("#q-text");
  const box = root.querySelector<HTMLElement>("#q-known");
  if (!form || !field || !box) return () => undefined;

  const known = readKnown(root);
  const labels: Labels = {
    alreadyAsked: box.dataset.alreadyAsked || "",
    alreadyAskedLead: box.dataset.alreadyAskedLead || "",
    alreadyAskedCta: box.dataset.alreadyAskedCta || "",
  };

  const title = box.querySelector("[data-known-title]");
  const lead = box.querySelector("[data-known-lead]");
  const question = box.querySelector("[data-known-question]");
  const answer = box.querySelector("[data-known-answer]");
  const link = box.querySelector<HTMLAnchorElement>("[data-known-link]");

  let timer = 0;
  let current: KnownQuestion | undefined;

  const render = (match?: KnownQuestion) => {
    current = match;
    if (!match) {
      setHidden(box, true);
      return;
    }
    if (title) title.textContent = labels.alreadyAsked;
    if (lead) lead.textContent = labels.alreadyAskedLead;
    if (question) question.textContent = match.question;
    if (answer) answer.textContent = match.answer;
    if (link) {
      const href = match.source === "faq" ? "#faq" : `#${match.id}`;
      link.href = href;
      link.textContent = labels.alreadyAskedCta;
      link.hidden = false;
    }
    setHidden(box, false);
  };

  const scan = () => {
    render(findKnownQuestion(field.value, known));
  };

  const onInput = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(scan, 220);
  };

  const onSubmit = (event: SubmitEvent) => {
    scan();
    if (!current) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    box.scrollIntoView({ block: "nearest", behavior: "smooth" });
    field.focus();
  };

  field.addEventListener("input", onInput);
  field.addEventListener("blur", scan);
  form.addEventListener("submit", onSubmit, true);

  return () => {
    window.clearTimeout(timer);
    field.removeEventListener("input", onInput);
    field.removeEventListener("blur", scan);
    form.removeEventListener("submit", onSubmit, true);
  };
}
