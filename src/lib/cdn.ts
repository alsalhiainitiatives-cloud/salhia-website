// All media URLs go through here. Set NEXT_PUBLIC_CDN_URL to your Cloudflare R2/CDN domain.
const base = (process.env.NEXT_PUBLIC_CDN_URL ?? "").replace(/\/$/, "");
export const media = (path: string) => `${base}/${path.replace(/^\//, "")}`;
