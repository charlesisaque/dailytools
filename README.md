# 🛠️ DailyTools

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-MVP-orange)

Uma aplicação web moderna que centraliza ferramentas úteis e práticas em um único lugar. Desenvolvida como MVP (Minimum Viable Product) com foco em usabilidade, design limpo e funcionalidades essenciais para gerenciar tarefas, finanças e saúde.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [✨ Funcionalidades](#-funcionalidades)
- [🖥️ Tecnologias](#️-tecnologias)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [⚙️ Instalação](#️-instalação)
- [🚀 Como Executar](#-como-executar)
- [📦 Scripts Disponíveis](#-scripts-disponíveis)
- [🗺️ Roadmap](#️-roadmap)
- [📝 Licença](#-licença)

## 📝 Visão Geral

DailyTools é uma plataforma all-in-one para gerenciar seu dia a dia. O projeto utiliza as melhores práticas modernas de desenvolvimento web, oferecendo uma interface responsiva e intuitiva.

## ✨ Funcionalidades

- **📅 Agenda Inteligente**
  - Calendário com abas de segunda a domingo
  - Criação de tarefas com opções de repetição (diária, específica ou sem repetição)
  - Visualização clara de compromissos por dia
  - Lista de tarefas organizada

- **⚡ Calculadora**
  - Interface simples e rápida
  - Suporte a operações básicas

- **💱 Conversor de Moedas**
  - Integração com API ExchangeRate Host
  - Cotações em tempo real
  - Múltiplas moedas suportadas

- **💰 Gestão Financeira**
  - Dashboard financeiro
  - Acompanhamento de gastos

- **🏥 Sobre Saúde**
  - Informações e dicas úteis

- **🛠️ Utilitários**
  - Conjunto de ferramentas diversas

## 🖥️ Tecnologias

| Tecnologia | Versão | Descrição |
|---|---|---|
| React | 18+ | Biblioteca UI |
| TypeScript | 5.0+ | Tipagem estatística |
| Vite | 5.0+ | Build tool ultra-rápida |
| React Router | 6+ | Roteamento |
| TailwindCSS | 3.0+ | Estilização utilitária |
| React Icons | Latest | Ícones |
| PostCSS | 8+ | Processamento de CSS |

## 📂 Estrutura do Projeto

```
dailytools/
├── src/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Agenda/
│   │   │   ├── Agenda.tsx
│   │   │   ├── Calendar.tsx
│   │   │   ├── CardsSection.tsx
│   │   │   ├── TasksList.tsx
│   │   │   └── WeeklyGoals.tsx
│   │   ├── Financas/
│   │   ├── Saude/
│   │   └── Utilidades/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ChartCard.tsx
│   ├── assets/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## ⚙️ Instalação

### Pré-requisitos

- Node.js 16.0 ou superior
- npm ou yarn

### Passos

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/dailytools.git
cd dailytools
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

## 🚀 Como Executar

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run preview` | Visualiza build de produção localmente |
| `npm run lint` | Executa ESLint |

## 🗺️ Roadmap

### Próximos passos:

- [ ] Adicionar mais ferramentas úteis
  - [ ] Conversor de unidades
  - [ ] Bloco de notas rápido
  - [ ] Gerador de senhas
  - [ ] Pomodoro timer
- [ ] Melhorar responsividade em telas menores
- [ ] Adicionar tema escuro/claro
- [ ] Criar testes automatizados (Jest, React Testing Library)
- [ ] Autenticação e sincronização na nuvem
- [ ] Deploy em produção (Vercel/Netlify)
- [ ] PWA (Progressive Web App)
- [ ] Notificações push

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ para facilitar seu dia a dia!
