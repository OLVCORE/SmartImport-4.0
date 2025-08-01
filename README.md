# SmartImport 4.0 - Simulador Estratégico de Importação

![SmartImport Logo](https://img.shields.io/badge/SmartImport-4.0-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.6-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📋 Visão Geral

O **SmartImport 4.0** é um simulador estratégico de operações de importação desenvolvido pela **OLV Internacional** como parte do ecossistema **EXCELTTA**. A plataforma utiliza inteligência artificial, OCR e análise tributária avançada para automatizar decisões logísticas e fiscais em operações de importação.

### 🎯 Objetivos Principais

- **Desmistificar** operações de importação para PMEs brasileiras
- **Automatizar** cálculos tributários e logísticos
- **Otimizar** decisões com base em IA e dados em tempo real
- **Simplificar** o processo de análise de viabilidade

## ✨ Funcionalidades Principais

### 🧮 Simulador Inteligente
- Cálculo automático de impostos (II, IPI, ICMS, PIS/COFINS, AFRMM)
- Análise de custos logísticos (frete, seguro, THC, armazenagem)
- Simulação por estado, modal e incoterm
- Análise de viabilidade com markup e rentabilidade

### 🤖 IA e OCR
- **Classificação NCM automática** com inteligência artificial
- **OCR avançado** para extração de dados de PDFs
- Processamento de editais e catálogos técnicos
- Sugestões inteligentes baseadas em histórico

### 📊 Relatórios e Análises
- Relatórios detalhados em PDF e Excel
- Análise comparativa entre simulações
- Dashboard com métricas e indicadores
- Exportação de dados estruturados

### 🔄 Gestão de Dados
- Histórico completo de simulações
- Backup automático no navegador
- Busca e filtros avançados
- Duplicação e edição de simulações

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca de interface
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilização
- **Framer Motion** - Animações
- **React Hook Form** - Gerenciamento de formulários
- **Zustand** - Gerenciamento de estado
- **React Query** - Cache e sincronização de dados

### Funcionalidades Especiais
- **Tesseract.js** - OCR em navegador
- **jsPDF** - Geração de relatórios PDF
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones modernos

### Deploy e Infraestrutura
- **Vercel** - Deploy automático
- **GitHub** - Versionamento
- **PWA** - Progressive Web App
- **Responsive Design** - Mobile-first

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm 9+ ou yarn
- Git

### Passos para Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/olvinternacional/smartimport-4.0.git
cd smartimport-4.0
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo desenvolvimento**
```bash
npm run dev
```

4. **Acesse a aplicação**
```
http://localhost:3000
```

### Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Verificação de código
npm run lint:fix     # Correção automática
npm run test         # Executar testes
```

## 🏗️ Estrutura do Projeto

```
smartimport-4.0/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes React
│   │   ├── Layout/        # Componentes de layout
│   │   └── UI/            # Componentes de interface
│   ├── pages/             # Páginas da aplicação
│   ├── hooks/             # Custom hooks
│   ├── store/             # Gerenciamento de estado
│   ├── services/          # Serviços e APIs
│   ├── utils/             # Utilitários
│   ├── styles/            # Estilos globais
│   ├── App.jsx           # Componente principal
│   └── main.jsx          # Ponto de entrada
├── package.json           # Dependências
├── vite.config.js         # Configuração Vite
├── tailwind.config.js     # Configuração Tailwind
└── README.md             # Documentação
```

## 🎨 Design System

### Cores Principais
- **Primary**: `#1e40af` (Azul EXCELTTA)
- **Success**: `#059669` (Verde)
- **Warning**: `#ea580c` (Laranja)
- **Danger**: `#dc2626` (Vermelho)

### Tipografia
- **Fonte Principal**: Inter
- **Fonte Mono**: JetBrains Mono

### Componentes
- Design system consistente
- Dark mode nativo
- Responsivo mobile-first
- Acessibilidade WCAG 2.1

## 🔧 Configuração de Deploy

### Vercel (Recomendado)

1. **Conecte o repositório**
```bash
vercel --prod
```

2. **Configure as variáveis de ambiente**
```env
VITE_API_URL=https://api.exceltta.com
VITE_APP_VERSION=4.0.0
```

### Outras Plataformas

- **Netlify**: Compatível com build Vite
- **Railway**: Deploy automático
- **Heroku**: Requer configuração adicional

## 📈 Roadmap

### Versão 4.1 (Próxima)
- [ ] Integração com APIs fiscais reais
- [ ] Sistema de usuários e autenticação
- [ ] Backup na nuvem
- [ ] Notificações push

### Versão 4.2
- [ ] Integração com ERPs
- [ ] API pública para desenvolvedores
- [ ] Módulo de compliance
- [ ] Análise preditiva

### Versão 5.0
- [ ] Mobile app nativo
- [ ] IA avançada para previsões
- [ ] Integração blockchain
- [ ] Marketplace de serviços

## 🤝 Contribuição

### Como Contribuir

1. **Fork o projeto**
2. **Crie uma branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit suas mudanças** (`git commit -m 'Add some AmazingFeature'`)
4. **Push para a branch** (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

### Padrões de Código

- **ESLint** para linting
- **Prettier** para formatação
- **Conventional Commits** para mensagens
- **TypeScript** (futuro)

## 📞 Suporte

### Contato
- **Email**: suporte@exceltta.com
- **Telefone**: (11) 99999-9999
- **Website**: https://exceltta.com

### Documentação
- **Guia do Usuário**: [docs.exceltta.com](https://docs.exceltta.com)
- **API Reference**: [api.exceltta.com](https://api.exceltta.com)
- **Vídeos Tutoriais**: [youtube.com/exceltta](https://youtube.com/exceltta)

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **OLV Internacional** - Desenvolvimento e suporte
- **EXCELTTA** - Plataforma e ecossistema
- **Comunidade React** - Ferramentas e bibliotecas
- **Usuários Beta** - Feedback e testes

---

**Desenvolvido com ❤️ pela OLV Internacional**

![OLV Internacional](https://olvinternacional.com.br/logo.png) #   S m a r t I m p o r t - 4 . 0  
 