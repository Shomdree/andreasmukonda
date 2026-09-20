import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const photosDir = path.join(root, "Photos", "Services");
const outDir = path.join(root, "public", "images", "services");
const widths = [480, 720, 960];

const sources = [
  ["services impression-affiches.jpg", "impression-affiches"],
  ["services impression-agenda.jpg", "impression-agenda"],
  ["services impression-baches.jpg", "impression-baches"],
  ["services impression-badges.jpg", "impression-badges"],
  ["services impression-carte de visite.jpg", "impression-carte-de-visite"],
  ["services impression-etiquettes.jpg", "impression-etiquettes"],
  ["services impression-kepi.jpg", "impression-kepi"],
  ["services impression-lacostes.jpg", "impression-lacostes"],
  ["services impression-maillot.jpg", "impression-maillot"],
  ["services impression-pochettes.jpg", "impression-pochettes"],
  ["services impression-portec cles.jpg", "impression-porte-cles"],
  ["services impression-portraits.jpg", "impression-portrait"],
  ["services impression-stylo.jpg", "impression-stylo"],
  ["services impression-tasses.jpg", "impression-tasses"],
  ["services impression-thsirt.jpg", "impression-thsirt"],
];

for (const [sourceName, stem] of sources) {
  const input = path.join(photosDir, sourceName);
  const image = sharp(input).rotate();
  for (const width of widths) {
    const resized = image.clone().resize({ width, fit: "inside", withoutEnlargement: true });
    await resized.clone().avif({ quality: 48 }).toFile(path.join(outDir, `${stem}-${width}.avif`));
    await resized.clone().webp({ quality: 68 }).toFile(path.join(outDir, `${stem}-${width}.webp`));
    await resized.clone().jpeg({ quality: 72, mozjpeg: true }).toFile(path.join(outDir, `${stem}-${width}.jpg`));
  }
  await image
    .clone()
    .resize({ width: 720, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(path.join(outDir, `${stem}.jpg`));
  console.log("optimized", stem);
}

console.log("service images ready");
