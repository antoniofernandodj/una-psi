export const OWNER_SEED = {
  name: "Administrador UnaPsi",
  email: "owner@unapsi.com",
  password: "Owner@123",
  phone: "11900000000",
};

export const SPECIALTY_CATEGORIES = [
  "Ansiedade e Trauma",
  "Transtornos de Humor",
  "Relacionamentos",
  "Neurodivergências",
  "Fases da Vida",
  "Carreira / Trabalho",
  "Saúde e Comportamento",
  "Crises",
];

export const APPROACH_SEED: [string, string][] = [
  ["TCC (Cognitivo-Comportamental)", "Foco na relação entre pensamentos, emoções e comportamentos, com metas e técnicas práticas."],
  ["Psicanálise", "Escuta do inconsciente a partir da associação livre, com base em Freud."],
  ["Psicanálise Lacaniana", "Leitura da clínica psicanalítica a partir de Jacques Lacan."],
  ["Junguiana (Psicologia Analítica)", "Trabalho com arquétipos, sonhos e processo de individuação."],
  ["Fenomenologia Existencial", "Compreensão da experiência vivida e dos sentidos da existência."],
  ["Gestalt-terapia", "Consciência do momento presente, contato e responsabilização."],
  ["Abordagem Centrada na Pessoa", "Relação terapêutica baseada em empatia, aceitação e autenticidade (Carl Rogers)."],
  ["Humanista", "Ênfase no potencial de crescimento e na autorrealização."],
  ["Terapia de Aceitação e Compromisso (ACT)", "Flexibilidade psicológica, aceitação e ação guiada por valores."],
  ["Terapia do Esquema", "Identificação e mudança de padrões emocionais cristalizados desde a infância."],
  ["Análise do Comportamento", "Análise funcional do comportamento a partir de Skinner."],
  ["Sistêmica / Familiar", "Compreensão do indivíduo no contexto de sistemas e vínculos familiares."],
  ["Terapia Comportamental Dialética (DBT)", "Regulação emocional, tolerância ao mal-estar e habilidades interpessoais."],
  ["Psicodrama", "Uso da dramatização e da espontaneidade como recurso terapêutico."],
  ["Logoterapia", "Busca de sentido como motor do desenvolvimento humano (Viktor Frankl)."],
  ["EMDR", "Reprocessamento de memórias traumáticas por dessensibilização por movimentos oculares."],
  ["Terapia Focada nas Emoções", "Trabalho de consciência, regulação e transformação emocional."],
  ["Psicologia Positiva", "Foco em forças pessoais, bem-estar e florescimento."],
];

export const SPECIALTY_SEED: Record<string, string[]> = {
  "Ansiedade e Trauma": [
    "Ansiedade Generalizada", "Síndrome do Pânico", "Fobia Social", "Fobias Específicas",
    "TOC (Transtorno Obsessivo-Compulsivo)", "Trauma e TEPT", "Estresse Pós-Traumático",
  ],
  "Transtornos de Humor": [
    "Depressão", "Transtorno Bipolar", "Distimia", "Depressão Pós-Parto", "Irritabilidade e Raiva",
  ],
  Relacionamentos: [
    "Terapia de Casal", "Conflitos de Relacionamento", "Dependência Emocional", "Término e Separação",
    "Relacionamentos Abusivos", "Conflitos Familiares", "Sexualidade e Vida Sexual", "Comunidade LGBTQIA+",
  ],
  Neurodivergências: [
    "TDAH em Adultos", "TDAH Infantil", "Autismo (TEA) em Adultos", "Autismo Infantil",
    "Altas Habilidades / Superdotação", "Dislexia e Dificuldades de Aprendizagem",
  ],
  "Fases da Vida": [
    "Psicologia Infantil", "Adolescência", "Terapia para Idosos", "Maternidade e Puerpério",
    "Parentalidade Positiva", "Crise dos 30 e Identidade", "Menopausa e Climatério",
  ],
  "Carreira / Trabalho": [
    "Burnout e Estresse Profissional", "Transição de Carreira", "Orientação Profissional",
    "Síndrome do Impostor", "Conflitos no Ambiente de Trabalho", "Perfeccionismo",
  ],
  "Saúde e Comportamento": [
    "Transtornos Alimentares", "Imagem Corporal", "Insônia e Sono", "Dependência Química",
    "Vícios Comportamentais (Jogos, Telas)", "Psicologia da Saúde", "Dor Crônica e Doenças Crônicas",
    "Autoestima e Insegurança", "Autoconhecimento",
  ],
  Crises: [
    "Luto e Perdas", "Ideação Suicida e Automutilação", "Crise Existencial", "Violência Doméstica",
    "Assédio Moral e Sexual", "Diagnóstico de Doença Grave",
  ],
};
