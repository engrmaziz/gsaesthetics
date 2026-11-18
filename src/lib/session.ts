const encoder = new TextEncoder();

function hex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function adminSecret() {
  return process.env.ADMIN_PASSWORD || "";
}

export async function signSession(exp: number, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(String(exp)));
  return `${exp}.${hex(signature)}`;
}

export async function readSession(token: string | undefined, secret: string) {
  if (!token || !secret) return false;
  const [exp, signature] = token.split(".");
  if (!exp || !signature || Number(exp) < Date.now()) return false;
  const expected = await signSession(Number(exp), secret);
  return expected === `${exp}.${signature}`;
}

export const SESSION_COOKIE = "hmd_admin";
