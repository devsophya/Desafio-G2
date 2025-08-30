# 🚀 G2 - Cadastro de CPF/CNPJ

Sistema completo para cadastro e validação de documentos CPF e CNPJ com validação em tempo real, tema claro/escuro e acessibilidade total.

<a href="https://desafio-g2-eight.vercel.app/" target="_blank">Acesse aqui o desafio rodando na Vercel 🚀</a> 

![G2 Logo](public/favicon.svg)

## ✨ Características

- 🔐 **Validação 100% Local** - Algoritmos oficiais da Receita Federal
- ♿ **Totalmente Acessível** - WCAG 2.1 AA compliant
- 🌓 **Tema Claro/Escuro** - Toggle dinâmico com persistência
- 📱 **Responsivo** - Funciona em todos os dispositivos
- 🎨 **G2 Design System** - Paleta de cores customizada
- 🔔 **Notificações Inteligentes** - Feedback visual e sonoro
- 📚 **Storybook** - Documentação interativa dos componentes
- ☁️ **Deploy Ready** - Configurado para Vercel
- 🛡️ **Análise de Qualidade** - Verificação automática de segurança

## 🛠️ Tecnologias

- **React 19** + **TypeScript** + **Vite**
- **CSS Modules** + **CSS Variables**
- **Context API** para estado global
- **Hook personalizado** de acessibilidade
- **Storybook** para documentação
- **Vercel** para deploy em produção
- **ESLint** + análise de qualidade customizada

## 🚀 Como Executar

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Desenvolvimento simples
npm run dev

# Desenvolvimento com análise de qualidade
npm run dev:full

# Storybook (documentação dos componentes)
npm run storybook
```

### Produção

```bash
# Verificar qualidade antes do deploy
npm run quality-check

# Build para produção
npm run build

# Preview local
npm run preview
```

### Deploy

```bash
# Para instruções completas de deploy na Vercel
# Consulte: DEPLOY.md

# Verificação final antes do deploy
npm run quality-check
```

## 🎯 Funcionalidades

### ✅ Validação de Documentos

- **CPF**: Algoritmo oficial com verificação de dígitos
- **CNPJ**: Algoritmo oficial da Receita Federal
- **Formatação automática** durante digitação
- **Validação em tempo real** com feedback visual

### ♿ Acessibilidade

- **Navegação por teclado** completa
- **Leitores de tela** compatíveis
- **Alto contraste** disponível
- **Skip links** para navegação rápida
- **Anúncios sonoros** para mudanças de estado
- **Focus management** inteligente

### 🎨 Interface

- **Design responsivo** para todos os dispositivos
- **Tema claro/escuro** com toggle no header
- **Animações suaves** com `prefers-reduced-motion`
- **Notificações inteligentes** no canto superior direito
- **Cards informativos** com dicas de preenchimento

### 🔧 Qualidade de Código

- **TypeScript** strict mode
- **ESLint** com regras customizadas
- **Análise de segurança** automatizada
- **Verificação de acessibilidade** automática
- **Bundle analysis** para performance

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes organizados para Storybook
│   ├── ui/              # Componentes base (Button, Input, Card...)
│   ├── forms/           # Componentes de formulário
│   └── layout/          # Componentes de layout (Header, Footer)
├── contexts/            # React Contexts (Theme, Notifications)
├── hooks/               # Hooks personalizados
├── services/            # Lógica de negócio (validação)
├── types/               # Definições TypeScript
├── styles/              # Estilos globais e variáveis CSS
├── stories/             # Stories do Storybook
└── scripts/             # Scripts de qualidade e análise
```

## 🧪 Testes e Qualidade

### Análise de Qualidade

```bash
npm run quality-check
```

Verifica:

- 🔍 Vulnerabilidades em dependências
- 📊 Tamanho dos bundles
- 🛡️ Práticas de segurança no código
- ♿ Problemas de acessibilidade
- ⚡ Performance básica

### Storybook

```bash
npm run storybook
```

Acesse `http://localhost:6006` para ver:

- 📚 Documentação interativa
- 🎛️ Controles de props em tempo real
- ♿ Testes de acessibilidade automáticos
- 🌓 Preview em tema claro/escuro

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte o repositório na Vercel
2. Deploy automático a cada push
3. Configurações otimizadas em `vercel.json`

## 🔒 Segurança

- ✅ **Validação local** - Sem dependências externas
- ✅ **Headers de segurança** configurados
- ✅ **CSP** (Content Security Policy)
- ✅ **XSS Protection** habilitada
- ✅ **Análise de vulnerabilidades** automática
- ✅ **Bundle otimizado** e limpo

## 📈 Performance

- ⚡ **Bundle otimizado** < 5MB
- 🗜️ **Compressão automática** na Vercel
- 📦 **Code splitting** automático
- 🎯 **Tree shaking** configurado
- 💾 **Cache otimizado** para assets
- 🚀 **React 19** com JSX Transform

## 🎨 Design System G2

### Cores Principais

- **Primary**: `#1BA3C4` (G2 Blue)
- **Primary Dark**: `#148FA8`
- **Primary Light**: `#4BB8D1`
- **Secondary**: `#2C5282`

### Tipografia

- **Font Family**: System fonts (SF Pro, Segoe UI, Roboto)
- **Escala**: Baseada em `rem` para acessibilidade
- **Line Height**: Otimizada para legibilidade

### Espaçamento

- **Base**: 4px (0.25rem)
- **Escala**: 2, 3, 4, 6, 8, 12, 16, 24, 32, 48px

## 📋 Checklist de Qualidade

- ✅ **Validação local** (sem APIs externas)
- ✅ **Acessibilidade WCAG 2.1 AA**
- ✅ **Performance otimizada**
- ✅ **Segurança verificada**
- ✅ **Bundle otimizado**
- ✅ **Responsivo completo**
- ✅ **Tema claro/escuro**
- ✅ **Documentação completa**

## 📄 Licença

Este projeto foi desenvolvido para o desafio técnico da G2.

---

**Desenvolvido com ❤️ por [Sophya] para G2**
