import type { PortfolioCategory, ServiceItem, TrainingItem } from "../lib/types";
import type { Messages } from "./types";

type TrainingCopy = Messages["catalog"]["trainings"][keyof Messages["catalog"]["trainings"]];
type ServiceCopy = Messages["catalog"]["services"][keyof Messages["catalog"]["services"]];

function pick(map: Record<string, string>, key: string, fallback: string): string {
  return map[key] ?? fallback;
}

export function localizeCategory(category: PortfolioCategory, t: Messages): PortfolioCategory {
  return {
    ...category,
    name: pick(t.catalog.categories as Record<string, string>, category.slug, category.name),
  };
}

export function localizeTraining(item: TrainingItem, t: Messages): TrainingItem {
  const copy = (t.catalog.trainings as Record<string, TrainingCopy | undefined>)[item.slug];
  if (!copy) return item;
  return {
    ...item,
    title: copy.title,
    excerpt: copy.excerpt,
    description: copy.description,
    audience: copy.audience,
    program: copy.program,
    level: copy.level,
    format: copy.format,
    duration: copy.duration,
    priceLabel: copy.priceLabel,
  };
}

export function localizeService(item: ServiceItem, t: Messages): ServiceItem {
  const copy = (t.catalog.services as Record<string, ServiceCopy | undefined>)[item.slug];
  if (!copy) return item;
  return {
    ...item,
    title: copy.title,
    excerpt: copy.excerpt,
    description: copy.description,
    benefits: [...copy.benefits],
    deliverables: [...copy.deliverables],
    turnaround: copy.turnaround,
    priceLabel: copy.priceLabel,
    ctaLabel: copy.ctaLabel,
  };
}

export function localizeBudget(value: string, t: Messages): string {
  return pick(t.catalog.budget as Record<string, string>, value, value);
}

export function localizeQuestionCategory(value: string, t: Messages): string {
  return pick(t.catalog.questionCategories as Record<string, string>, value, value);
}

export function trainingStatusLabel(status: TrainingItem["statusLabel"], t: Messages): string {
  return pick(t.catalog.trainingStatus as Record<string, string>, status, status);
}

export function fillNetwork(template: string, network: string): string {
  return template.replaceAll("{network}", network);
}
