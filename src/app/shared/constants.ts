export interface SocialDef {
  key: "whatsapp" | "instagram" | "facebook" | "linkedin" | "youtube" | "substack" | "others";
  label: string;
  icon: string;
  placeholder: string;
}

/** Canais de contato do psicólogo: usados no formulário de perfil e na exibição do detalhe. */
export const SOCIALS: SocialDef[] = [
  { key: "whatsapp", label: "WhatsApp", icon: "chat", placeholder: "WhatsApp (número com DDD)" },
  { key: "instagram", label: "Instagram", icon: "photo_camera", placeholder: "Instagram (@seu.perfil)" },
  { key: "facebook", label: "Facebook", icon: "thumb_up", placeholder: "Facebook (URL do perfil)" },
  { key: "linkedin", label: "LinkedIn", icon: "work", placeholder: "LinkedIn (URL do perfil)" },
  { key: "youtube", label: "YouTube", icon: "smart_display", placeholder: "Canal do YouTube" },
  { key: "substack", label: "Substack", icon: "menu_book", placeholder: "Substack / Artigos / Blog" },
  { key: "others", label: "Outros", icon: "link", placeholder: "Site próprio ou outros links" },
];

export const REQUEST_STATUS_OPTIONS = [
  { value: "new", label: "Status: Novo" },
  { value: "contacted", label: "Status: Contatado" },
  { value: "scheduled", label: "Status: Sessão agendada" },
  { value: "archived", label: "Status: Arquivada" },
];

export const REQUEST_STATUS_META: Record<string, { label: string; tone: "primary" | "secondary" | "tertiary" | "neutral"; icon: string }> = {
  new: { label: "Novo recebido", tone: "primary", icon: "fiber_new" },
  contacted: { label: "Contatado", tone: "secondary", icon: "chat" },
  scheduled: { label: "Sessão agendada", tone: "tertiary", icon: "check_circle" },
  archived: { label: "Arquivada", tone: "neutral", icon: "inventory_2" },
};
