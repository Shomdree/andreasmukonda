import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assets = path.resolve(
  "C:/Users/PC/.cursor/projects/c-Users-PC-Projects-andreas-mukonda/assets",
);
const outDir = path.resolve("C:/Users/PC/Projects/andreas-mukonda/public/images/andreas");
const publicDir = path.resolve("C:/Users/PC/Projects/andreas-mukonda/public");

const sources = {
  portrait: path.join(
    assets,
    "c__Users_PC_AppData_Roaming_Cursor_User_workspaceStorage_a56a609abbe33f014cfac8741d811c01_images_Andreas-jpg-1aaed006-e85f-465e-a992-75e3fb24c9b0.jpg",
  ),
  studio: path.join(
    assets,
    "c__Users_PC_AppData_Roaming_Cursor_User_workspaceStorage_a56a609abbe33f014cfac8741d811c01_images_SHomdreas-20258af0-b086-4d04-8975-4498751bdfdc.jpg",
  ),
  logo: path.join(
    assets,
    "c__Users_PC_AppData_Roaming_Cursor_User_workspaceStorage_a56a609abbe33f014cfac8741d811c01_images_logo-shom-DTF-8aedad22-8356-4b14-b371-0fdb97ad6f23.jpg",
  ),
};

async function variants(input, basename, { width, height, position }) {
  const widths = [480, 720, 960];
  for (const w of widths) {
    const h = Math.round((height / width) * w);
    const pipeline = sharp(input).rotate().resize(w, h, {
      fit: "cover",
      position,
      withoutEnlargement: false,
    });
    await pipeline.clone().avif({ quality: 52 }).toFile(path.join(outDir, `${basename}-${w}.avif`));
    await pipeline.clone().webp({ quality: 72 }).toFile(path.join(outDir, `${basename}-${w}.webp`));
    await pipeline.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(outDir, `${basename}-${w}.jpg`));
  }
  await sharp(input)
    .rotate()
    .resize(720, 900, { fit: "cover", position })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(outDir, `${basename}.jpg`));
}

function inkOnWhiteToColor(buffer, info, rgb) {
  const out = Buffer.from(buffer);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    out[i] = rgb[0];
    out[i + 1] = rgb[1];
    out[i + 2] = rgb[2];
    out[i + 3] = Math.round(255 - luminance);
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 8 })
    .png();
}

async function processLogo() {
  const raw = await sharp(sources.logo).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const light = inkOnWhiteToColor(raw.data, raw.info, [247, 245, 240]);
  const dark = inkOnWhiteToColor(raw.data, raw.info, [14, 16, 20]);

  const lightBuf = await light.toBuffer();
  const meta = await sharp(lightBuf).metadata();
  const height = 96;
  const width = Math.round(((meta.width || 1) / (meta.height || 1)) * height);

  await sharp(lightBuf)
    .resize(width, height, { fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, "logo.png"));
  await sharp(lightBuf)
    .resize(width, height, { fit: "inside" })
    .webp({ quality: 90 })
    .toFile(path.join(outDir, "logo.webp"));
  await sharp(lightBuf)
    .resize(width * 2, height * 2, { fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, "logo@2x.png"));

  const darkBuf = await dark.toBuffer();
  await sharp(darkBuf)
    .resize(width, height, { fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, "logo-dark.png"));

  const markSize = Math.round((meta.height || height) * 0.92);
  const left = 0;
  const top = Math.max(0, Math.round(((meta.height || markSize) - markSize) / 2));
  const extractW = Math.min(markSize, meta.width || markSize);
  await sharp(lightBuf)
    .extract({ left, top, width: extractW, height: Math.min(markSize, meta.height || markSize) })
    .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outDir, "mark.png"));
  await sharp(lightBuf)
    .extract({ left, top, width: extractW, height: Math.min(markSize, meta.height || markSize) })
    .resize(64, 64, { fit: "contain", background: { r: 14, g: 16, b: 20, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, "favicon.png"));

  return { width, height, srcWidth: meta.width, srcHeight: meta.height };
}

await mkdir(outDir, { recursive: true });
await variants(sources.portrait, "portrait", { width: 960, height: 1200, position: "attention" });
await variants(sources.studio, "studio", { width: 960, height: 1200, position: "attention" });
await sharp(sources.studio)
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 78, mozjpeg: true })
  .toFile(path.join(outDir, "og.jpg"));
const logoMeta = await processLogo();
console.log("media ready", logoMeta);
