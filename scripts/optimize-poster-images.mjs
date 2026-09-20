import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const photosDir = path.join(root, "Photos", "Afiiches");
const outDir = path.join(root, "public", "images", "portfolio");
const widths = [480, 720, 960];

const catalog = await readFile(path.join(root, "src/content/poster-catalog.ts"), "utf8");
const pairs = [...catalog.matchAll(/files: \[([^\]]+)\], sources: \[([^\]]+)\]/g)];
const works = [];
for (const match of pairs) {
  const files = [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
  const sources = [...match[2].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
  files.forEach((file, index) => {
    const source = sources[index];
    if (file && source) works.push({ source, stem: file.replace(/\.jpg$/i, "") });
  });
}

await mkdir(outDir, { recursive: true });
for (const { source, stem } of works) {
  const input = path.join(photosDir, source);
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

console.log("poster images ready", works.length);
