import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const studio = path.join(root, "public/images/andreas/studio-960.jpg");
const logo = path.join(root, "public/images/andreas/logo.png");
const outDir = path.join(root, "public/images/andreas");

const width = 1200;
const height = 630;

await mkdir(outDir, { recursive: true });

const bg = await sharp(studio)
  .rotate()
  .resize(width, height, { fit: "cover", position: "attention" })
  .modulate({ brightness: 0.45, saturation: 0.85 })
  .toBuffer();

const svg = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="rgba(14,16,20,0.28)"/>
  <text x="72" y="430" fill="#F7F5F0" font-family="Georgia, serif" font-size="42" font-weight="700">Andréas Mukonda</text>
  <text x="72" y="488" fill="#E5E7EB" font-family="Georgia, serif" font-size="26">Créer aujourd’hui les solutions</text>
  <text x="72" y="528" fill="#E5E7EB" font-family="Georgia, serif" font-size="26">qui feront la différence demain.</text>
</svg>
`);

let composed = sharp(bg).composite([{ input: svg, top: 0, left: 0 }]);

try {
  const mark = await sharp(logo).resize({ height: 72, fit: "inside" }).png().toBuffer();
  composed = sharp(await composed.png().toBuffer()).composite([{ input: mark, top: 56, left: 72 }]);
} catch {
  // logo overlay is optional
}

await composed.jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(outDir, "og.jpg"));
console.log("og.jpg ready");
