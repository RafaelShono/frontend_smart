# Redação Smart - Frontend

Uma plataforma avançada para prática de redação do ENEM com análise de IA, desenvolvida em React com Vite.

## 🚀 Características

- **Análise de IA**: Avaliação automática das 5 competências do ENEM
- **Interface Moderna**: Design responsivo com Tailwind CSS
- **Sistema de Cores**: Design system consistente com cores customizadas
- **Animações**: Transições suaves com Framer Motion
- **Autenticação**: Sistema de login com Firebase
- **Dashboard**: Acompanhamento de progresso e estatísticas
- **Temas IA**: Geração automática de temas para prática

## 🛠️ Tecnologias

- **React 18** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de CSS
- **Framer Motion** - Animações
- **Firebase** - Autenticação e banco de dados
- **React Router** - Roteamento
- **React Icons** - Ícones
- **Recharts** - Gráficos e visualizações

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/RafaelShono/frontend_smart.git

# Entre no diretório
cd frontend_smart

# Instale as dependências
npm install

# Execute o projeto em desenvolvimento
npm run dev
```

## 🎨 Sistema de Design

O projeto utiliza um sistema de cores customizado:

- **Primary**: Azul (#3B82F6)
- **Secondary**: Lilás (#8B5CF6)
- **Success**: Verde (#22C55E)
- **Warning**: Amarelo (#EAB308)
- **Error**: Vermelho (#EF4444)

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes de UI reutilizáveis
│   ├── Dashboard/      # Dashboard principal
│   ├── LandingPage/    # Página inicial
│   ├── Avaliacao/      # Componente de avaliação
│   └── ...
├── styles/             # Arquivos de estilo
│   ├── design-system.css
│   ├── force-colors.css
│   └── test.css
├── config/             # Configurações
└── firebaseConfig.js   # Configuração do Firebase
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## 🌐 Deploy

O projeto está configurado para deploy no Vercel:

- **URL de Produção**: [frontend-smart.vercel.app](https://frontend-smart.vercel.app)
- **Configuração**: `vercel.json`

## 🎯 Funcionalidades Principais

### 1. Landing Page
- Hero section com animações
- Seção de recursos
- Como funciona
- Call-to-action

### 2. Dashboard
- Estatísticas de progresso
- Gráficos de evolução
- Ranking de usuários
- Conquistas

### 3. Avaliação
- Análise das 5 competências
- Feedback detalhado
- Sugestões de melhoria
- Histórico de redações

### 4. Sistema de Cores
- Configuração completa do Tailwind
- Cores customizadas no safelist
- Suporte a classes dinâmicas
- Fallbacks para compatibilidade

## 🔍 Correções Aplicadas

### Problemas de CSS/Tailwind Resolvidos:
- ✅ Classes dinâmicas não reconhecidas
- ✅ Cores padrão não incluídas no safelist
- ✅ Inconsistências no sistema de cores
- ✅ Configuração incompleta do Tailwind
- ✅ Problemas de linting

### Melhorias Implementadas:
- ✅ Sistema de cores padronizado
- ✅ Mapeamento de cores para classes dinâmicas
- ✅ Safelist completo no Tailwind
- ✅ Arquivo force-colors.css atualizado
- ✅ Componentes otimizados

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- Mobile: < 640px
- Tablet: 640px - 768px
- Desktop: 768px - 1024px
- Large: > 1024px

## 🔐 Autenticação

Sistema de autenticação implementado com Firebase:
- Login/Registro
- Proteção de rotas
- Context API para estado global
- Persistência de sessão

## 📊 Analytics e Métricas

- Acompanhamento de progresso
- Estatísticas de performance
- Gráficos de evolução
- Sistema de conquistas

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Rafael Shono**
- GitHub: [@RafaelShono](https://github.com/RafaelShono)
- Projeto: [Redação Smart](https://github.com/RafaelShono/frontend_smart)

## 🙏 Agradecimentos

- Equipe de desenvolvimento
- Comunidade React
- Documentação do Tailwind CSS
- Firebase por fornecer a infraestrutura
