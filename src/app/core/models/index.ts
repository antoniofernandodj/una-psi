export type Role = "patient" | "psychologist" | "owner";

export const ROLE_HOME: Record<Role, string> = {
  patient: "/paciente",
  psychologist: "/psicologo",
  owner: "/owner",
};

export interface Entity {
  id: string;
}

export interface User extends Entity {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
  createdAt: string;
}

export interface PsychologistProfile extends Entity {
  /** id do usuário (User.id) dono do perfil */
  id: string;
  crp: string;
  photo?: string;
  approachIds: string[];
  specialtyIds: string[];
  sessionFee?: number;
  bio?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  substack?: string;
  youtube?: string;
  others?: string;
}

export interface Approach extends Entity {
  name: string;
  description: string;
  active: boolean;
}

export interface Specialty extends Entity {
  name: string;
  category: string;
  keywords: string[];
  active: boolean;
}

export type RequestStatus = "new" | "contacted" | "scheduled" | "archived";

export interface ContactRequest extends Entity {
  psychologistId: string;
  patientId?: string;
  name: string;
  email: string;
  phone: string;
  preferredTime: string;
  message: string;
  status: RequestStatus;
  notes?: string;
  createdAt: string;
}

/** Psicólogo já combinado com o usuário, pronto para exibição. */
export interface PsychologistView {
  user: User;
  profile: PsychologistProfile;
  approaches: Approach[];
  specialties: Specialty[];
}

export interface SelectOption<T = string> {
  value: T;
  label: string;
}
