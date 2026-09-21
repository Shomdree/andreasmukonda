import { mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "images", "videos");
const widths = [480, 720, 960];
const stems = ["tt-001", "tt-002", "tt-003", "tt-004", "tt-005"];

await mkdir(outDir, { recursive: true });

for (const stem of stems) {
  const input = path.join(outDir, `${stem}-src.jpg`);
  const image = sharp(input).rotate();
  for (const width of widths) {
    const resized = image.clone().resize({ width, withoutEnlargement: true });
    await resized.clone().avif({ quality: 50 }).toFile(path.join(outDir, `${stem}-${width}.avif`));
    await resized.clone().webp({ quality: 72 }).toFile(path.join(outDir, `${stem}-${width}.webp`));
    await resized.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(outDir, `${stem}-${width}.jpg`));
  }
  await image
    .clone()
    .resize({ width: 720, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(path.join(outDir, `${stem}.jpg`));
  await unlink(input);
  console.log("optimized", stem);
}

console.log("video posters ready", stems.length);
