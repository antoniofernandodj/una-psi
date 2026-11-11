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
  /** último acesso (login ou abertura da aplicação com sessão ativa) */
  lastSeenAt?: string;
}

export interface PsychologistProfile extends Entity {
  /** id do usuário (User.id) dono do perfil */
  id: string;
  crp: string;
  photo?: string;
  /** foto de fundo (capa) do perfil */
  cover?: string;
  approachIds: string[];
  specialtyIds: string[];
  sessionFee?: number;
  /** agenda lotada: não há vagas no momento; pacientes podem registrar interesse */
  agendaFull?: boolean;
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
  /** quando o psicólogo saiu do status "novo" pela primeira vez */
  respondedAt?: string;
}

export type InterestStatus = "waiting" | "notified";

/** Interesse em vagas futuras de um psicólogo com agenda lotada. */
export interface FutureInterest extends Entity {
  psychologistId: string;
  patientId?: string;
  name: string;
  email: string;
  phone: string;
  preferredTime: string;
  message: string;
  status: InterestStatus;
  createdAt: string;
}

/** Preferências do paciente usadas para calcular a compatibilidade. */
export interface PatientPreferences extends Entity {
  /** id do usuário paciente */
  id: string;
  specialtyIds: string[];
  approachIds: string[];
  maxFee?: number;
}

/** Psicólogo já combinado com o usuário, pronto para exibição. */
export interface PsychologistView {
  user: User;
  profile: PsychologistProfile;
  approaches: Approach[];
  specialties: Specialty[];
  /** tempo médio (ms) entre receber e responder uma solicitação; indefinido sem histórico */
  avgResponseMs?: number;
}

export interface SelectOption<T = string> {
  value: T;
  label: string;
}
