export const uid = () => crypto.randomUUID();

export const initials = (name: string) =>
  name
    .replace(/^(dra?\.?)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");

/** Redimensiona a imagem escolhida para caber no localStorage. */
export function fileToDataUrl(file: File, size = 400): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = Math.min(size, side);
        canvas
          .getContext("2d")!
          .drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result as string;
    };
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
