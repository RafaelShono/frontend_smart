# Sistema de Marcação e Análise Detalhada de Redações

## 📋 Visão Geral

Sistema completo de análise visual de redações com marcação colorida e feedback específico, desenvolvido para complementar o sistema de correção ENEM existente.

## 🎯 Funcionalidades

### ✅ Análise Automática
- **Identificação de erros ortográficos e gramaticais**
- **Detecção de problemas de conectivos e coesão**
- **Análise de repetições vocabulares**
- **Sugestões de melhoria de vocabulário**
- **Avaliação de problemas estruturais**
- **Destaque de pontos fortes**

### 🎨 Sistema Visual
- **Marcação colorida no texto**
- **Painel lateral com categorização**
- **Tooltips informativos**
- **Filtros por categoria**
- **Estatísticas em tempo real**

## 🎨 Sistema de Cores

| Cor | Categoria | Descrição |
|-----|-----------|-----------|
| 🔴 **Vermelho** | Ortografia/Gramática | Erros graves de concordância, ortografia, acentuação |
| 🟠 **Laranja** | Conectivos/Coesão | Problemas de conectivos, quebras na progressão lógica |
| 🟡 **Amarelo** | Repetições | Palavras repetidas, expressões redundantes |
| 🔵 **Azul** | Vocabulário | Sugestões de melhoria lexical, sinônimos |
| 🟣 **Roxo** | Estrutura | Problemas estruturais, tangenciamento, argumentação |
| 🟢 **Verde** | Pontos Fortes | Acertos identificados, argumentação sólida |

## 🏗️ Arquitetura

### Componentes Principais

```
RedacaoAnalyzer/
├── RedacaoAnalyzer.jsx          # Componente principal
├── RedacaoAnalyzer.css          # Estilos e variáveis CSS
├── RedacaoAnalyzerDemo.jsx      # Componente de demonstração
└── README.md                    # Documentação
```

### Backend

```
routes/
└── analyzeDetailed.js           # Endpoint de análise detalhada
```

## 🚀 Como Usar

### 1. Importar o Componente

```jsx
import RedacaoAnalyzer from './components/RedacaoAnalyzer/RedacaoAnalyzer';
```

### 2. Usar o Componente

```jsx
<RedacaoAnalyzer
  redacao="Sua redação aqui..."
  tema="Tema da redação"
  estudanteId="ID do estudante (opcional)"
  onAnaliseCompleta={(analise) => {
    console.log('Análise completa:', analise);
  }}
  configuracoes={{
    mostrarPontosFortesAtivado: true,
    nivelDetalhamentoAnalise: 'intermediario',
    focarEm: ['ortografia', 'conectivos']
  }}
/>
```

### 3. Acessar a Demonstração

```
http://localhost:5173/analise-detalhada
```

## 📊 Estrutura de Dados

### Interface AnaliseDetalhada

```typescript
interface AnaliseDetalhada {
  textoOriginal: string;
  textoComMarcacoes: string; // HTML com spans coloridos
  estatisticas: {
    totalProblemas: number;
    problemasResolvidos: number;
    pontosFortesIdentificados: number;
  };
  categorias: {
    ortografia: FeedbackCategoria;
    conectivos: FeedbackCategoria;
    repeticoes: FeedbackCategoria;
    vocabulario: FeedbackCategoria;
    estrutura: FeedbackCategoria;
    pontosFortesDestaque: FeedbackCategoria;
  };
}
```

### Interface FeedbackCategoria

```typescript
interface FeedbackCategoria {
  cor: string;
  icone: string;
  titulo: string;
  total: number;
  itens: ItemFeedback[];
}
```

### Interface ItemFeedback

```typescript
interface ItemFeedback {
  trechoOriginal: string;
  posicao: {
    inicio: number;
    fim: number;
    linha?: number;
    paragrafo?: number;
  };
  problema: string;
  sugestao: string;
  gravidade: 'baixa' | 'media' | 'alta';
  exemplos?: string[];
}
```

## 🔧 Configurações

### Opções de Configuração

```typescript
interface Configuracoes {
  mostrarPontosFortesAtivado: boolean;     // Mostrar pontos fortes
  nivelDetalhamentoAnalise: 'basico' | 'intermediario' | 'avancado';
  focarEm?: ('ortografia' | 'conectivos' | 'estrutura')[];
}
```

### Níveis de Detalhamento

- **Básico**: Identifica apenas erros graves
- **Intermediário**: Análise completa (padrão)
- **Avançado**: Análise detalhada com sugestões específicas

## 🎯 Tipos de Análise

### 🔴 Ortografia/Gramática
- Erros de concordância verbal/nominal
- Ortografia incorreta
- Problemas de acentuação
- Uso inadequado de crase
- Regência verbal/nominal incorreta

### 🟠 Conectivos/Coesão
- Ausência de conectivos entre parágrafos
- Conectivos inadequados para o contexto
- Repetição excessiva do mesmo conectivo
- Quebra na progressão lógica

### 🟡 Repetições
- Mesma palavra repetida próxima (<30 palavras)
- Mesmo radical repetido excessivamente
- Expressões redundantes
- Vícios de linguagem

### 🔵 Vocabulário
- Sugestões de sinônimos mais precisos
- Palavras muito informais para o contexto
- Oportunidades de enriquecimento lexical
- Termos técnicos mal utilizados

### 🟣 Estrutura
- Ausência de tese na introdução
- Argumentação fraca ou inconsistente
- Tangenciamento do tema
- Problemas na proposta de intervenção
- Falta de desenvolvimento de ideias

### 🟢 Pontos Fortes
- Uso exemplar de conectivos
- Argumentação sólida
- Repertório sociocultural relevante
- Boa articulação de ideias

## 🔌 Integração com Backend

### Endpoint

```
POST /api/analyze-detailed
```

### Payload

```json
{
  "prompt": "Prompt estruturado para IA",
  "redacao": "Texto da redação",
  "tema": "Tema da redação",
  "estudanteId": "ID do estudante (opcional)",
  "configuracoes": {
    "mostrarPontosFortesAtivado": true,
    "nivelDetalhamentoAnalise": "intermediario",
    "focarEm": []
  }
}
```

### Resposta

```json
{
  "marcacoes": [
    {
      "inicio": 15,
      "fim": 23,
      "categoria": "ortografia",
      "trechoOriginal": "enfrenta",
      "problema": "Erro de concordância verbal",
      "sugestao": "enfrentam",
      "gravidade": "alta",
      "exemplos": ["A sociedade enfrenta → A sociedade enfrentam"]
    }
  ],
  "estatisticas": {
    "totalProblemas": 4,
    "problemasResolvidos": 0,
    "pontosFortesIdentificados": 2
  }
}
```

## 🎨 Personalização de Estilos

### Variáveis CSS

```css
:root {
  --erro-ortografia: #ff4757;    /* 🔴 Vermelho */
  --erro-conectivo: #ff6348;     /* 🟠 Laranja */
  --repeticao: #feca57;          /* 🟡 Amarelo */
  --melhoria-vocab: #3742fa;     /* 🔵 Azul */
  --erro-estrutural: #5f27cd;    /* 🟣 Roxo */
  --ponto-forte: #00d2d3;        /* 🟢 Verde */
}
```

### Classes CSS

```css
.marcacao-ortografia { /* Estilos para marcação vermelha */ }
.marcacao-conectivos { /* Estilos para marcação laranja */ }
.marcacao-repeticoes { /* Estilos para marcação amarela */ }
.marcacao-vocabulario { /* Estilos para marcação azul */ }
.marcacao-estrutura { /* Estilos para marcação roxa */ }
.marcacao-pontosFortes { /* Estilos para marcação verde */ }
```

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop**: Layout lado a lado (texto + painel)
- **Tablet**: Layout empilhado com painel redimensionável
- **Mobile**: Layout vertical otimizado

## 🔍 Exemplos de Uso

### Exemplo 1: Análise Básica

```jsx
<RedacaoAnalyzer
  redacao="A sociedade brasileira enfrenta diversos problemas..."
  tema="Desafios sociais no Brasil"
  configuracoes={{
    nivelDetalhamentoAnalise: 'basico'
  }}
/>
```

### Exemplo 2: Foco em Ortografia

```jsx
<RedacaoAnalyzer
  redacao="Sua redação aqui..."
  tema="Tema da redação"
  configuracoes={{
    focarEm: ['ortografia', 'gramatica']
  }}
/>
```

### Exemplo 3: Análise Completa

```jsx
<RedacaoAnalyzer
  redacao="Sua redação aqui..."
  tema="Tema da redação"
  onAnaliseCompleta={(analise) => {
    // Salvar análise no banco de dados
    salvarAnalise(analise);
  }}
  configuracoes={{
    mostrarPontosFortesAtivado: true,
    nivelDetalhamentoAnalise: 'avancado'
  }}
/>
```

## 🚀 Próximos Passos

### Funcionalidades Futuras

1. **Exportação de Relatórios**
   - PDF com análise completa
   - Relatório detalhado por categoria

2. **Histórico de Análises**
   - Comparação entre redações
   - Gráficos de evolução

3. **Sugestões Personalizadas**
   - Baseadas no perfil do estudante
   - Foco em pontos fracos específicos

4. **Integração com LMS**
   - Moodle, Canvas, etc.
   - Sincronização automática

## 🐛 Troubleshooting

### Problemas Comuns

1. **Marcações não aparecem**
   - Verificar se o texto está sendo processado
   - Confirmar conexão com backend

2. **Cores não aplicadas**
   - Verificar se o CSS está carregado
   - Confirmar variáveis CSS

3. **Análise não funciona**
   - Verificar chave da API Anthropic
   - Confirmar endpoint do backend

## 📞 Suporte

Para dúvidas ou problemas:

- **E-mail**: suporte@redacaosmart.com.br
- **WhatsApp**: (44) 99887-9523
- **Documentação**: Este arquivo README

## 📄 Licença

Este sistema é parte do projeto Redação Smart e está sujeito aos termos de uso da plataforma.
