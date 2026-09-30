export const uid = () => crypto.randomUUID();

export const initials = (name: string) =>
  name
    .replace(/^(dra?\.?)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");

/** Lê o arquivo como data URL (o recorte/redimensionamento é feito no image-cropper). */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

export const socialUrl = (kind: "instagram" | "facebook" | "linkedin" | "youtube" | "substack" | "others", v: string) => {
  if (/^https?:\/\//i.test(v)) return v;
  const h = v.replace(/^@/, "");
  switch (kind) {
    case "instagram": return `https://instagram.com/${h}`;
    case "facebook": return `https://facebook.com/${h}`;
    case "linkedin": return `https://linkedin.com/in/${h}`;
    case "youtube": return `https://youtube.com/@${h}`;
    case "substack": return `https://${h}.substack.com`;
    default: return `https://${v}`;
  }
};

export const whatsappUrl = (v: string, text?: string) => {
  const d = v.replace(/\D/g, "");
  const num = d.length <= 11 ? `55${d}` : d;
  return `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
};
