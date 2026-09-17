import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  const file = path.resolve(".env");
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const url = process.env.PUBLIC_SUPABASE_URL;
const anon = process.env.PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !service) {
  console.log("SKIP: configure PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(0);
}

const admin = createClient(url, service, { auth: { persistSession: false, autoRefreshToken: false } });
const visitor = anon
  ? createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;

const stamp = Date.now();
const contactId = crypto.randomUUID();
const orderId = crypto.randomUUID();
const email = `smoke-${stamp}@example.invalid`;

function fail(step, code) {
  console.error(`FAIL ${step}${code ? ` code=${code}` : ""}`);
  process.exitCode = 1;
}

const { error: contactErr } = await admin.from("contact_messages").insert({
  id: contactId,
  full_name: "Vérification production",
  email,
  phone: "243000000000",
  subject: "Smoke test",
  message: "Message de vérification à supprimer après test.",
  preferred_contact: "email",
  status: "nouvelle",
});
if (contactErr) fail("contact.insert", contactErr.code);

const { data: contactRow, error: contactRead } = await admin
  .from("contact_messages")
  .select("id,status,created_at")
  .eq("id", contactId)
  .single();
if (contactRead || contactRow?.status !== "nouvelle" || !contactRow.created_at) {
  fail("contact.read", contactRead?.code);
}

for (const status of ["lue", "repondue", "archivee"]) {
  const { error } = await admin.from("contact_messages").update({ status }).eq("id", contactId);
  if (error) fail(`contact.status.${status}`, error.code);
}

if (visitor) {
  const { data: leaked } = await visitor.from("contact_messages").select("id").eq("id", contactId);
  if (leaked && leaked.length > 0) fail("rls.contact.select");
}

const { data: reference, error: rpcErr } = await admin.rpc("next_order_reference");
if (rpcErr || typeof reference !== "string" || !/^AM-\d{4}-\d{4}$/.test(reference)) {
  fail("order.rpc", rpcErr?.code);
}

const { error: orderErr } = await admin.from("orders").insert({
  id: orderId,
  reference,
  service_title: "Design graphique",
  full_name: "Vérification production",
  email,
  phone: "243000000000",
  project_type: "Logo",
  description: "Commande de vérification à supprimer après test.",
  budget_range: "À discuter",
  contact_preference: "whatsapp",
  status: "nouvelle",
});
if (orderErr) fail("order.insert", orderErr.code);

const { error: dupErr } = await admin.from("orders").insert({
  id: crypto.randomUUID(),
  reference,
  service_title: "Design graphique",
  full_name: "Doublon",
  email,
  phone: "243000000000",
  project_type: "Logo",
  description: "Ne doit pas passer.",
  budget_range: "À discuter",
  contact_preference: "whatsapp",
  status: "nouvelle",
});
if (!dupErr) fail("order.unique");

await admin.from("orders").update({ status: "en_analyse" }).eq("id", orderId);
const { data: history } = await admin
  .from("order_status_history")
  .select("id,new_status")
  .eq("order_id", orderId);
if (!history || history.length < 2) fail("order.history");

const pdf = new Blob(["%PDF-1.4 smoke"], { type: "application/pdf" });
const pdfPath = `smoke/${contactId}.pdf`;
const { error: upErr } = await admin.storage.from("order-attachments").upload(pdfPath, pdf, {
  contentType: "application/pdf",
  upsert: false,
});
if (upErr) fail("storage.upload", upErr.name);
const { data: signed, error: signErr } = await admin.storage.from("order-attachments").createSignedUrl(pdfPath, 60);
if (signErr || !signed?.signedUrl) fail("storage.signedUrl", signErr?.name);
if (visitor) {
  const { data: listed } = await visitor.storage.from("order-attachments").list("smoke");
  if (listed && listed.length > 0) fail("storage.list.anon");
}

await admin.storage.from("order-attachments").remove([pdfPath]);
await admin.from("orders").delete().eq("id", orderId);
await admin.from("contact_messages").delete().eq("id", contactId);

if (process.exitCode) {
  console.error("Smoke Supabase incomplet. Les lignes de test ont été nettoyées autant que possible.");
  process.exit(process.exitCode);
}

console.log(`OK contact ${contactId.slice(0, 8)}`);
console.log(`OK order ${reference}`);
console.log(`OK history ${history.length}`);
console.log("OK storage signed URL");
