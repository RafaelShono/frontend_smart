import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaPenFancy, FaTrash, FaPaperPlane, FaClock, FaFileAlt, FaLightbulb, FaCheckCircle, FaExclamationTriangle, FaEye, FaEyeSlash, FaRobot, FaSync, FaMagic } from 'react-icons/fa';
import ThemeGenerator from '../ThemeGenerator/ThemeGenerator';
import API_CONFIG from '../../config/api';

function RedacaoForm(props) {
  const {
    temas,
    temaSelecionado,
    handleTemaChange,
    texto,
    setTexto,
    handleSubmit,
    isLoading,
    addGeneratedTheme,
  } = props;
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showWritingTips, setShowWritingTips] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [writingProgress, setWritingProgress] = useState(0);
  const [showWordCount, setShowWordCount] = useState(true);
  const [isGeneratingTheme, setIsGeneratingTheme] = useState(false);
  const [generatedTheme, setGeneratedTheme] = useState(null);
  const [showThemeGenerator, setShowThemeGenerator] = useState(false);
  const textareaRef = useRef(null);
  const [writingSession, setWritingSession] = useState({
    startTime: null,
    lastActivity: null,
    pauses: 0
  });

  // Função para gerar tema automaticamente usando IA
  const generateRandomTheme = async () => {
    setIsGeneratingTheme(true);
    
    try {
      // Áreas de tema disponíveis
      const areas = ['social', 'educacao', 'meio-ambiente', 'tecnologia', 'saude', 'cultura', 'politica', 'economia'];
      const niveis = ['ensino-medio', 'vestibular', 'concurso', 'enem'];
      
      // Selecionar aleatoriamente
      const areaTema = areas[Math.floor(Math.random() * areas.length)];
      const nivelProva = niveis[Math.floor(Math.random() * niveis.length)];
      
      // Contextos específicos opcionais
      const contextos = [
        'Foco em dados de 2024',
        'Pandemia e pós-pandemia',
        'Eleições e democracia',
        'Sustentabilidade',
        'Transformação digital',
        'Desigualdades sociais',
        'Mudanças climáticas',
        'Inteligência artificial'
      ];
      const contextoEspecifico = Math.random() > 0.5 ? contextos[Math.floor(Math.random() * contextos.length)] : '';
      
      // Quantidade de textos motivadores
      const quantidadeTextos = Math.floor(Math.random() * 3) + 3; // 3-5 textos
      
      console.log('Gerando tema com IA...', { areaTema, nivelProva, contextoEspecifico, quantidadeTextos });
      
      const response = await fetch(API_CONFIG.urls.generateTheme, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          areaTema,
          nivelProva,
          contextoEspecifico,
          quantidadeTextos
        })
      });
      
      if (!response.ok) {
        throw new Error('Erro ao gerar tema');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setGeneratedTheme(data.tema);
        console.log('Tema gerado com sucesso:', data.tema);
      } else {
        throw new Error(data.message || 'Erro ao gerar tema');
      }
      
    } catch (error) {
      console.error('Erro ao gerar tema:', error);
      
      // Fallback para tema pré-definido em caso de erro
      const fallbackThemes = [
        {
          id: 'generated-fallback-1',
          titulo: 'Desafios da sustentabilidade no Brasil contemporâneo',
          categoria: 'Meio Ambiente',
          proposta: 'Proponha medidas concretas para promover a sustentabilidade, considerando o papel do governo, da sociedade civil e das empresas.',
          textosMotivadores: [
            {
              titulo: 'Contexto Histórico',
              conteudo: 'O Brasil possui uma das maiores biodiversidades do mundo, com aproximadamente 20% de todas as espécies conhecidas. No entanto, segundo dados do Instituto Nacional de Pesquisas Espaciais (INPE), o desmatamento na Amazônia Legal aumentou 22% em 2021, atingindo 13.235 km² de área devastada. Esta situação coloca em risco não apenas o ecossistema local, mas também o equilíbrio climático global.',
              fonte: 'Instituto Nacional de Pesquisas Espaciais (INPE), 2021'
            },
            {
              titulo: 'Dados Estatísticos',
              conteudo: 'O Brasil é um dos países com maior potencial para energias renováveis no mundo. Segundo dados da Agência Nacional de Energia Elétrica (ANEEL), a matriz energética brasileira já possui mais de 80% de fontes renováveis, com destaque para a energia hidrelétrica, eólica e solar. Esta posição privilegiada coloca o país em uma situação única para liderar a transição energética global.',
              fonte: 'Agência Nacional de Energia Elétrica (ANEEL), 2023'
            },
            {
              titulo: 'Perspectiva Internacional',
              conteudo: 'A participação da sociedade civil é fundamental para a preservação ambiental. Movimentos como o "Fridays for Future" e organizações não governamentais têm desempenhado papel crucial na conscientização sobre as mudanças climáticas e na pressão por políticas públicas mais efetivas.',
              fonte: 'Organização das Nações Unidas (ONU), Relatório sobre Ação Climática, 2023'
            }
          ]
        },
        {
          id: 'generated-fallback-2',
          titulo: 'Impactos da tecnologia na sociedade brasileira',
          categoria: 'Tecnologia',
          proposta: 'Sugira políticas públicas e ações sociais para maximizar os benefícios e minimizar os riscos da tecnologia.',
          textosMotivadores: [
            {
              titulo: 'Contexto Histórico',
              conteudo: 'A pandemia de COVID-19 acelerou significativamente a digitalização no Brasil. Segundo pesquisa do Comitê Gestor da Internet no Brasil (CGI.br), 81% dos brasileiros passaram a usar mais a internet durante o período, com destaque para o trabalho remoto, educação online e telemedicina. Este processo de transformação digital trouxe novos desafios e oportunidades para a sociedade brasileira.',
              fonte: 'Comitê Gestor da Internet no Brasil (CGI.br), 2022'
            },
            {
              titulo: 'Dados Estatísticos',
              conteudo: 'A inteligência artificial está transformando diversos setores da economia brasileira. Estima-se que até 2030, a IA possa contribuir com até 4,2% do PIB nacional, gerando oportunidades em áreas como agricultura de precisão, saúde digital e cidades inteligentes.',
              fonte: 'Instituto de Pesquisa Econômica Aplicada (IPEA), 2023'
            },
            {
              titulo: 'Impactos Sociais',
              conteudo: 'No entanto, a transformação digital também amplia desigualdades sociais. Dados do IBGE mostram que 46 milhões de brasileiros ainda não têm acesso à internet, principalmente em áreas rurais e periferias urbanas, criando uma nova forma de exclusão social.',
              fonte: 'Instituto Brasileiro de Geografia e Estatística (IBGE), 2023'
            }
          ]
        },
        {
          id: 'generated-fallback-3',
          titulo: 'Desigualdades sociais no Brasil atual',
          categoria: 'Sociedade',
          proposta: 'Apresente soluções viáveis para os problemas sociais identificados, destacando a importância da participação cidadã.',
          textosMotivadores: [
            {
              titulo: 'Contexto Histórico',
              conteudo: 'O Brasil é um dos países com maior desigualdade de renda no mundo. Segundo dados do Instituto Brasileiro de Geografia e Estatística (IBGE), os 10% mais ricos concentram cerca de 42% da renda nacional, enquanto os 40% mais pobres detêm apenas 10% da riqueza total do país. Esta concentração de renda reflete desigualdades históricas que persistem na sociedade brasileira.',
              fonte: 'Instituto Brasileiro de Geografia e Estatística (IBGE), 2023'
            },
            {
              titulo: 'Dados Estatísticos',
              conteudo: 'A pandemia de COVID-19 agravou ainda mais as desigualdades sociais no Brasil. Estudos da Fundação Getúlio Vargas (FGV) indicam que a renda dos 20% mais pobres caiu 20% durante a crise, enquanto os 20% mais ricos tiveram redução de apenas 2% em seus rendimentos.',
              fonte: 'Fundação Getúlio Vargas (FGV), 2022'
            },
            {
              titulo: 'Impactos Sociais',
              conteudo: 'A desigualdade racial persiste como um dos principais desafios sociais brasileiros. Dados do IBGE mostram que pretos e pardos representam 56% da população, mas ocupam apenas 29% dos cargos de direção e gerência, evidenciando a necessidade de políticas afirmativas mais efetivas.',
              fonte: 'Instituto Brasileiro de Geografia e Estatística (IBGE), 2023'
            }
          ]
        }
      ];
      
      // Selecionar um tema de fallback aleatoriamente
      const fallbackTheme = fallbackThemes[Math.floor(Math.random() * fallbackThemes.length)];
      setGeneratedTheme(fallbackTheme);
      
      // Mostrar mensagem de erro para o usuário
      alert('Erro ao gerar tema com IA. Usando tema pré-definido.');
      
    } finally {
      setIsGeneratingTheme(false);
    }
  };

  // Função para usar o tema gerado
  const useGeneratedTheme = () => {
    if (generatedTheme) {
      // Adicionar o tema à lista de temas disponíveis
      if (addGeneratedTheme) {
        addGeneratedTheme(generatedTheme);
      }
      // Selecionar o tema
      handleTemaChange({ target: { value: generatedTheme.id } });
      setGeneratedTheme(null);
    }
  };

  // Função para lidar com tema gerado pelo ThemeGenerator
  const handleThemeGenerated = (tema) => {
    setGeneratedTheme(tema);
    if (addGeneratedTheme) {
      addGeneratedTheme(tema);
    }
  };

  // Função para limpar o texto
  const handleLimparFolha = useCallback(() => {
    if (window.confirm('Tem certeza que deseja limpar toda a redação? Esta ação não pode ser desfeita.')) {
      setTexto('');
      setWordCount(0);
      setCharCount(0);
      setWritingProgress(0);
      setWritingSession({
        startTime: null,
        lastActivity: null,
        pauses: 0
      });
    }
  }, [setTexto]);

  // Função para contar palavras e caracteres
  const handleTextChange = useCallback((e) => {
    const newText = e.target.value;
    setTexto(newText);
    
    const words = newText.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(newText.length);
    
    // Calcular progresso baseado no tamanho ideal (600-800 palavras para ENEM)
    const idealWords = 700;
    const progress = Math.min((words.length / idealWords) * 100, 100);
    setWritingProgress(progress);
    
    // Atualizar sessão de escrita
    const now = new Date();
    if (!writingSession.startTime) {
      setWritingSession(prev => ({
        ...prev,
        startTime: now,
        lastActivity: now
      }));
    } else {
      setWritingSession(prev => ({
        ...prev,
        lastActivity: now
      }));
    }
  }, [setTexto, writingSession.startTime]);

  // Função para calcular tempo estimado de leitura
  const getEstimatedReadingTime = () => {
    const wordsPerMinute = 200;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  // Função para calcular tempo de escrita
  const getWritingTime = () => {
    if (!writingSession.startTime) return 0;
    const now = new Date();
    const diffMs = now - writingSession.startTime;
    return Math.floor(diffMs / 1000 / 60); // minutos
  };

  // Função para obter status do progresso
  const getProgressStatus = () => {
    if (wordCount < 100) return { status: 'iniciando', color: 'text-red-400', bg: 'bg-red-500/20' };
    if (wordCount < 300) return { status: 'desenvolvendo', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    if (wordCount < 600) return { status: 'bom progresso', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    if (wordCount < 800) return { status: 'quase pronto', color: 'text-green-400', bg: 'bg-green-500/20' };
    return { status: 'excelente', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
  };

  // Auto-save simulation (localStorage)
  useEffect(() => {
    if (texto.length > 0) {
      localStorage.setItem('redacao_draft', texto);
    }
  }, [texto]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('redacao_draft');
    if (draft && !texto) {
      if (window.confirm('Encontramos um rascunho salvo. Deseja continuar de onde parou?')) {
        setTexto(draft);
        handleTextChange({ target: { value: draft } });
      }
    }
  }, [handleTextChange, setTexto, texto]);

  // Focus management
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's': {
            e.preventDefault();
            // Auto-save feedback
            const saveIndicator = document.createElement('div');
            saveIndicator.textContent = 'Rascunho salvo!';
            saveIndicator.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
            document.body.appendChild(saveIndicator);
            setTimeout(() => document.body.removeChild(saveIndicator), 2000);
            break;
          }
          case 'l':
            e.preventDefault();
            handleLimparFolha();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleLimparFolha]);

  const progressStatus = getProgressStatus();

  return (
    <div className="w-full h-full flex flex-col">
      {/* Seleção de Tema */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="tema" className="block text-sm font-bold text-slate-300">
            <FaFileAlt className="inline mr-2 text-cyan-400" />
            Selecionar Tema
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={generateRandomTheme}
              disabled={isGeneratingTheme}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-purple-400 hover:to-pink-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingTheme ? (
                <>
                  <FaSync className="animate-spin" />
                  <span>Gerando...</span>
                </>
              ) : (
                <>
                  <FaMagic />
                  <span>Gerar Tema</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowThemeGenerator(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300"
            >
              <FaRobot />
              <span>Configurar</span>
            </button>
          </div>
        </div>
        
        <select
          id="tema"
          value={temaSelecionado ? temaSelecionado.id : ''}
          onChange={handleTemaChange}
          className="w-full border border-cyan-500/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200 bg-slate-700/50 backdrop-blur-sm text-slate-200 shadow-xl"
        >
          <option value="" className="bg-slate-800 text-slate-300">-- Selecione um tema --</option>
          {temas.map((tema) => (
            <option key={tema.id} value={tema.id} className="bg-slate-800 text-slate-300">
              {tema.titulo}
            </option>
          ))}
        </select>

        {/* Tema Gerado */}
        {generatedTheme && (
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl border border-purple-500/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <FaRobot className="text-purple-400" />
                <span className="text-sm font-bold text-purple-300">Tema Gerado</span>
              </div>
              <button
                type="button"
                onClick={useGeneratedTheme}
                className="px-3 py-1 bg-purple-500 text-white text-xs font-medium rounded-lg hover:bg-purple-400 transition-colors"
              >
                Usar Este Tema
              </button>
            </div>
            
            <h4 className="text-lg font-bold text-slate-200 mb-3">{generatedTheme.titulo}</h4>
            
            {/* Textos Motivadores */}
            {generatedTheme.textosMotivadores && (
              <div className="mb-4">
                <h5 className="text-sm font-bold text-purple-300 mb-3">Textos motivadores:</h5>
                <div className="space-y-3">
                  {generatedTheme.textosMotivadores.map((texto, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">
                      <h6 className="text-xs font-bold text-cyan-400 mb-2">{texto.titulo}</h6>
                      <p className="text-slate-300 text-xs leading-relaxed mb-2">{texto.conteudo}</p>
                      <p className="text-xs text-slate-500 italic">{texto.fonte}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Proposta */}
            <div className="mb-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <h6 className="text-xs font-bold text-amber-400 mb-2">Proposta de redação:</h6>
              <p className="text-slate-300 text-xs leading-relaxed">{generatedTheme.proposta}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                {generatedTheme.categoria}
              </span>
              <button
                type="button"
                onClick={() => setGeneratedTheme(null)}
                className="text-xs text-slate-400 hover:text-slate-300"
              >
                Descartar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Área de Escrita */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <div className="flex-grow relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 shadow-2xl overflow-hidden">
          {/* Header da área de escrita */}
          <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 backdrop-blur-sm px-6 py-4 border-b border-cyan-500/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <FaPenFancy className="text-cyan-400 mr-2" />
                <h3 className="font-bold text-slate-200">Sua Redação</h3>
                {isFocused && (
                  <div className="ml-3 flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="ml-2 text-xs text-green-400">Digitando...</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowWritingTips(!showWritingTips)}
                  className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 rounded-lg transition-all duration-200"
                  title="Dicas de escrita"
                >
                  <FaLightbulb className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowWordCount(!showWordCount)}
                  className="p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-600/50 rounded-lg transition-all duration-200"
                  title="Alternar contadores"
                >
                  {showWordCount ? <FaEye className="w-4 h-4" /> : <FaEyeSlash className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Progresso da redação</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${progressStatus.bg} ${progressStatus.color}`}>
                  {progressStatus.status}
                </span>
              </div>
              <div className="w-full bg-slate-600/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${writingProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Stats Row */}
            {showWordCount && (
              <div className="flex items-center space-x-4 text-sm text-slate-300">
                <div className="flex items-center bg-slate-600/50 px-3 py-1 rounded-lg">
                  <FaClock className="mr-1 text-cyan-400" />
                  {getEstimatedReadingTime()} min leitura
                </div>
                <div className="flex items-center bg-slate-600/50 px-3 py-1 rounded-lg">
                  <span className="text-cyan-400 mr-1">📝</span>
                  {wordCount} palavras
                </div>
                <div className="flex items-center bg-slate-600/50 px-3 py-1 rounded-lg">
                  <span className="text-cyan-400 mr-1">⏱️</span>
                  {getWritingTime()} min escrevendo
                </div>
                {charCount > 0 && (
                  <div className="flex items-center bg-slate-600/50 px-3 py-1 rounded-lg">
                    <span className="text-cyan-400 mr-1">🔤</span>
                    {charCount} caracteres
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Writing Tips Panel */}
          {showWritingTips && (
            <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 backdrop-blur-sm border-b border-amber-500/20 px-6 py-4">
              <div className="flex items-start space-x-3">
                <FaLightbulb className="text-amber-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-amber-300 mb-2">💡 Dicas para uma redação nota 1000</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-amber-200">
                    <div>
                      <strong>📝 Estrutura:</strong> Introdução + 2 desenvolvimentos + Conclusão
                    </div>
                    <div>
                      <strong>🎯 Tese:</strong> Apresente sua posição claramente
                    </div>
                    <div>
                      <strong>📊 Argumentos:</strong> Use dados, estatísticas e exemplos
                    </div>
                    <div>
                      <strong>🔗 Conectivos:</strong>   &quot;Além disso&quot;, &quot;Portanto&quot;, &quot;Dessa forma&quot;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Área de texto */}
          <div className="relative flex-grow p-6 min-h-[500px]">
            {/* Linhas de pauta */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent 0px, transparent 23px, #06b6d4 23px, #06b6d4 24px)',
                backgroundSize: '100% 24px',
                zIndex: 1,
              }}
            ></div>
            
            {/* Writing Guidelines Overlay */}
            {!texto && (
              <div className="absolute inset-0 pointer-events-none z-5 p-6">
                <div className="text-slate-400 text-sm leading-6">
                  <div className="mb-4">
                    <strong className="text-cyan-400">📝 Estrutura da Redação ENEM:</strong>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div><strong>1. Introdução (1 parágrafo):</strong> Apresente o tema e sua tese</div>
                    <div><strong>2. Desenvolvimento (2 parágrafos):</strong> Argumente com dados e exemplos</div>
                    <div><strong>3. Conclusão (1 parágrafo):</strong> Proponha uma solução detalhada</div>
                  </div>
                  <div className="mt-4 text-xs text-slate-500">
                    💡 <strong>Dica:</strong> Use conectivos para ligar suas ideias e mantenha o foco no tema proposto.
                  </div>
                </div>
              </div>
            )}
            
            <textarea
              ref={textareaRef}
              value={texto}
              onChange={handleTextChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="w-full h-full bg-transparent resize-none focus:outline-none z-10 relative text-slate-200 leading-6 placeholder-slate-400"
              placeholder=""
              required
              style={{
                lineHeight: '24px',
                fontSize: '16px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                minHeight: '450px',
              }}
            />
          </div>

          {/* Footer com controles */}
          <div className="bg-slate-700/50 backdrop-blur-sm px-6 py-4 border-t border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <span>Ctrl+S: Salvar</span>
                  <div className="w-px h-3 bg-slate-500"></div>
                  <span>Ctrl+L: Limpar</span>
                </div>
                {texto.length > 0 && (
                  <div className="flex items-center space-x-2 text-xs text-green-400">
                    <FaCheckCircle className="w-3 h-3" />
                    <span>Rascunho salvo automaticamente</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleLimparFolha}
                  className="flex items-center px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                  title="Limpar redação (Ctrl+L)"
                >
                  <FaTrash className="mr-1" />
                  Limpar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Envio */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-[1.02] shadow-2xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
            disabled={isLoading || !temaSelecionado || texto.trim().length < 100}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Analisando...
              </>
            ) : (
              <>
                <FaPaperPlane className="mr-2" />
                Enviar para Análise
                {wordCount >= 600 && (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                    ✨ Pronto para análise!
                  </span>
                )}
              </>
            )}
          </button>
          
          {/* Validation Messages */}
          <div className="mt-3 space-y-1">
            {!temaSelecionado && (
              <div className="flex items-center justify-center text-sm text-amber-400">
                <FaExclamationTriangle className="mr-2" />
                Selecione um tema antes de enviar
              </div>
            )}
            
            {temaSelecionado && texto.trim().length < 100 && (
              <div className="flex items-center justify-center text-sm text-amber-400">
                <FaExclamationTriangle className="mr-2" />
                Escreva pelo menos 100 caracteres para enviar
              </div>
            )}
            
            {temaSelecionado && texto.trim().length >= 100 && wordCount < 300 && (
              <div className="flex items-center justify-center text-sm text-blue-400">
                <FaLightbulb className="mr-2" />
                Continue escrevendo! Redações com 600-800 palavras têm melhor desempenho
              </div>
            )}
            
            {wordCount >= 600 && wordCount <= 800 && (
              <div className="flex items-center justify-center text-sm text-green-400">
                <FaCheckCircle className="mr-2" />
                Excelente! Tamanho ideal para uma redação ENEM
              </div>
            )}
            
            {wordCount > 800 && (
              <div className="flex items-center justify-center text-sm text-yellow-400">
                <FaExclamationTriangle className="mr-2" />
                Redação muito longa. Considere revisar e enxugar o texto
              </div>
            )}
          </div>
        </div>
      </form>

      {/* ThemeGenerator Modal */}
      {showThemeGenerator && (
        <ThemeGenerator
          onThemeGenerated={handleThemeGenerated}
          onClose={() => setShowThemeGenerator(false)}
        />
      )}
    </div>
  );
}

RedacaoForm.propTypes = {
  temas: PropTypes.array.isRequired,
  temaSelecionado: PropTypes.object,
  handleTemaChange: PropTypes.func.isRequired,
  texto: PropTypes.string.isRequired,
  setTexto: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  addGeneratedTheme: PropTypes.func,
};

export default RedacaoForm;
