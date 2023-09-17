import { SIG_SECRET } from '../config';
import c from 'crypto-js';

async function ds(sig: string) {
  if (c && c.subtle && c.subtle.digest) {
    const u8 = new TextEncoder().encode(sig);
    const hb = await c.subtle.digest('SHA-256', u8);
    const ha = Array.from(new Uint8Array(hb));

    return ha.map((b) => b.toString(16).padStart(2, '0')).join('');
  } else {
    return c.SHA256(sig).toString(c.enc.Hex);
  }
}

export const gs = async (
  tm: string | number,//timestamp
  mt: string,//method
  l: string,//url
  q?: Record<string, any>,//query
  d?: Record<string, any>,//body
) => {
  // @ts-ignore
  const k = SIG_SECRET;

  let t = `${tm}:${mt?.toLowerCase()}:${l}`;

  t += `?${sp(q || {})}`;
  t += `:${sb(d || {})}`;
  t += `:${k}`;

  const s = await ds(t);

  return s;
};

export const vs = async (
  s: string,//sig
  tm: string | number,//timestamp
  mt: string,//method
  l: string,//url
  q?: Record<string, any>,//query
  d?: Record<string, any>,//body
) => {
  const bs = await gs(tm, mt, l, q, d);

  return bs === s;
};

export function sp(query: Record<string, any>): string {
  const ps = new URLSearchParams(query);
  const p = Array.from(ps.entries()).sort();

  return p.map(([key, value]) => `${key}=${value}`).join('&');
}

export function sb(body: Record<string, any>): string {
  const b = Object.entries(body).sort();

  return JSON.stringify(Object.fromEntries(b));
}
