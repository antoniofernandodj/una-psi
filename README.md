# UnaPsi

Plataforma que conecta pacientes a psicólogos (Angular 15 + Tailwind CSS). Os dados ficam no `localStorage` do navegador (sem backend).

## Rodar

```bash
npm install
npm start   # http://localhost:4200
```

## Conta owner (seed automático na primeira execução)

- E-mail: `owner@unapsi.com`
- Senha: `Owner@123`

O seed também cadastra 18 abordagens e 54 especialidades, editáveis na home do owner.

## Telas

| Rota | Perfil | Conteúdo |
|---|---|---|
| `/signin` | visitante | Cadastro (paciente ou psicólogo, com CRP mascarado, abordagens, especialidades, valor, foto, bio e redes) |
| `/login` | visitante | Login |
| `/paciente` | paciente / público | Lista de psicólogos com filtros + detalhe e formulário de contato |
| `/psicologo` | psicólogo | Solicitações de contato + edição do perfil |
| `/owner` | owner | Gestão de especialidades e abordagens |

## Estrutura

- `core/` modelos, serviços (stores em localStorage), guards, máscaras e validadores
- `shared/` componentes reutilizáveis (`app-input`, `app-button`, `app-chip-select`, `app-tag-picker`, `app-modal`, `app-tabs`, ...)
- `features/` módulos lazy por perfil (`auth`, `patient`, `psychologist`, `owner`)
- `design/` protótipos de referência
