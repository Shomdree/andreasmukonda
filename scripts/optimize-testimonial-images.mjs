import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const photosDir = path.join(root, "Photos", "Temoignages");
const outDir = path.join(root, "public", "images", "testimonials");
const widths = [480, 720, 960];

const works = [
  { source: "t-1.jpg", stem: "t-1" },
  { source: "T-2.jpg", stem: "t-2" },
  { source: "T-3.jpg", stem: "t-3" },
  { source: "T-4.jpg", stem: "t-4" },
  { source: "T-5.jpg", stem: "t-5" },
  { source: "t-6.jpg", stem: "t-6" },
];

await mkdir(outDir, { recursive: true });

for (const { source, stem } of works) {
  const input = path.join(photosDir, source);
  const image = sharp(input).rotate();
  const meta = await image.metadata();
  console.log(stem, meta.width, meta.height);

  for (const width of widths) {
    const resized = image.clone().resize({ width, fit: "inside", withoutEnlargement: true });
    await resized.clone().avif({ quality: 68 }).toFile(path.join(outDir, `${stem}-${width}.avif`));
    await resized.clone().webp({ quality: 82 }).toFile(path.join(outDir, `${stem}-${width}.webp`));
    await resized.clone().jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(outDir, `${stem}-${width}.jpg`));
  }

  await image
    .clone()
    .resize({ width: 960, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(outDir, `${stem}.jpg`));

  console.log("optimized", stem);
}

console.log("testimonial images ready", works.length);
