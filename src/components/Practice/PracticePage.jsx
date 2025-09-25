import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { db } from '../../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  increment,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { 
  FaPenFancy, 
  FaBrain, 
  FaChartLine, 
  FaClock, 
  FaFileAlt, 
  FaExclamationTriangle,
  FaLightbulb,
  FaRocket,
  FaMagic,
  FaTimes,
  FaEdit,
  FaExternalLinkAlt,
  FaSearch,
  FaSpinner
} from 'react-icons/fa';
import Card from '../ui/Card';
import Sidebar from '../ui/Sidebar';
import Avaliacao from '../Avalicao/Avaliacao';
import API_CONFIG from '../../config/api';
import '../../styles/design-system.css';

function PracticePage() {
  const [texto, setTexto] = useState('');
  const [avaliacao, setAvaliacao] = useState(null);
  const [temas, setTemas] = useState([]);
  const [temaSelecionado, setTemaSelecionado] = useState(null);
  const { usuarioAtual } = useAuth();
  const [isGeneratingTheme, setIsGeneratingTheme] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const textareaRef = useRef(null);
  

  // Carregar temas do Firestore
  useEffect(() => {
    const carregarTemas = async () => {
      try {
        const temasRef = collection(db, 'temas');
        
        let querySnapshot;
        try {
          // Tentar com ordenação primeiro
          const q = query(temasRef, orderBy('dataCriacao', 'desc'), limit(20));
          querySnapshot = await getDocs(q);
        } catch (orderError) {
          // Fallback: carregar sem ordenação
          querySnapshot = await getDocs(temasRef);
        }
        
        
        const temasData = querySnapshot.docs
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data
            };
          })
          .filter(tema => tema && tema.id); // Filtrar temas válidos
        
        setTemas(temasData);
      } catch (error) {
        setTemas([]); // Garantir que temas seja um array vazio em caso de erro
      }
    };

    carregarTemas();
  }, []);

  // Carregar dados do usuário
  useEffect(() => {
    const carregarUserData = async () => {
      if (usuarioAtual) {
        try {
          const userDoc = await getDoc(doc(db, 'usuarios', usuarioAtual.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
        }
      }
    };

    carregarUserData();
  }, [usuarioAtual]);

  // Contar palavras e caracteres
  const contarPalavras = (texto) => {
    return texto.trim().split(/\s+/).filter(palavra => palavra.length > 0).length;
  };

  const contarCaracteres = (texto) => {
    return texto.length;
  };

  // Estimar tempo de leitura
  const estimarTempoLeitura = (texto) => {
    const palavras = contarPalavras(texto);
    const tempoMinutos = Math.ceil(palavras / 200); // 200 palavras por minuto
    return tempoMinutos;
  };

  // Gerar tema com IA (método original)
  const gerarTema = async () => {
    setIsGeneratingTheme(true);
    setErrorMessage('');
    
    try {
      // Obter token de autenticação
      const token = await usuarioAtual.getIdToken();
      
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
      
      const response = await axios.post(API_CONFIG.buildURL('/api/generate-theme-ai'), {
        areaTema,
        nivelProva,
        contextoEspecifico,
        quantidadeTextos
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        const novoTema = response.data.tema;
        
        // Verificar se o tema é válido antes de adicionar
        if (novoTema && novoTema.id) {
          setTemas(prev => [novoTema, ...prev]);
          setTemaSelecionado(novoTema);
        } else {
          setErrorMessage('Erro: Tema gerado é inválido');
        }
      }
    } catch (error) {
      setErrorMessage('Erro ao gerar tema. Tente novamente.');
    } finally {
      setIsGeneratingTheme(false);
    }
  };


  // Analisar redação com Agente Corretor ENEM
  const analisarRedacao = async () => {
    if (!texto.trim()) {
      setErrorMessage('Por favor, escreva sua redação antes de analisar.');
      return;
    }

    if (contarPalavras(texto) < 7) {
      setErrorMessage('Sua redação deve ter pelo menos 7 linhas.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage('');

    try {
      const token = await usuarioAtual.getIdToken();
      const response = await axios.post(API_CONFIG.buildURL('/api/analisar-enem'), {
        texto: texto,
        tema: temaSelecionado?.titulo || 'Tema livre',
        userId: usuarioAtual?.uid
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setAvaliacao(response.data.analise);
        
        // Salvar no Firestore
        if (usuarioAtual) {
          await addDoc(collection(db, 'redacoes'), {
            usuarioId: usuarioAtual.uid, // Usar usuarioId para consistência
            nome: usuarioAtual.displayName || usuarioAtual.email?.split('@')[0] || 'Usuário',
            texto: texto,
            tema: temaSelecionado || { titulo: 'Tema livre' }, // Salvar tema completo como objeto
            temaId: temaSelecionado?.id || 'unknown',
            avaliacao: response.data.analise,
            pontuacaoTotal: response.data.analise?.pontuacaoTotal || 0, // Adicionar pontuação no nível raiz
            criadoEm: new Date(),
            palavras: contarPalavras(texto),
            caracteres: contarCaracteres(texto)
          });

          // Atualizar estatísticas do usuário
          const userRef = doc(db, 'usuarios', usuarioAtual.uid);
          try {
            // Verificar se o documento existe
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              // Documento existe, atualizar
              await updateDoc(userRef, {
                totalRedacoes: increment(1),
                ultimaRedacao: new Date()
              });
            } else {
              // Documento não existe, criar
              await setDoc(userRef, {
                nome: usuarioAtual.displayName || usuarioAtual.email?.split('@')[0] || 'Usuário',
                email: usuarioAtual.email,
                totalRedacoes: 1,
                ultimaRedacao: new Date(),
                criadoEm: new Date()
              });
            }
          } catch (updateError) {
            // Não falhar a operação por causa disso
          }
        }
      }
    } catch (error) {
      setErrorMessage('Erro ao analisar redação. Tente novamente.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Sugerir melhorias com Agente Corretor ENEM
  const sugerirMelhorias = async () => {
    if (!texto.trim()) {
      setErrorMessage('Por favor, escreva sua redação antes de solicitar sugestões.');
      return;
    }

    setIsSuggesting(true);
    setErrorMessage('');

    try {
      const token = await usuarioAtual.getIdToken();
      const response = await axios.post(API_CONFIG.buildURL('/api/analisar-enem'), {
        texto: texto,
        tema: temaSelecionado?.titulo || 'Tema livre',
        userId: usuarioAtual?.uid
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        // Usar as sugestões do agente corretor
        const sugestoes = response.data.analise.sugestoesGerais || [];
        
        // Mostrar sugestões em um alert ou modal
        if (sugestoes.length > 0) {
          alert(`Sugestões do Corretor ENEM:\n\n${sugestoes.join('\n• ')}`);
        } else {
          alert('Parabéns! Sua redação está muito boa. Continue praticando!');
        }
      }
    } catch (error) {
      setErrorMessage('Erro ao gerar sugestões. Tente novamente.');
    } finally {
      setIsSuggesting(false);
    }
  };

  // Nova redação
  const novaRedacao = () => {
    setTexto('');
    setAvaliacao(null);
    setTemaSelecionado(null);
    setErrorMessage('');
  };

  // Função para salvar no histórico
  const salvarNoHistorico = async (avaliacaoData) => {
    try {
      
      // A redação já foi salva no Firestore durante a análise
      // Aqui podemos adicionar lógica adicional se necessário
      
      // Pequeno delay para feedback visual
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Limpar o estado para voltar à tela inicial
      setTexto('');
      setAvaliacao(null);
      setTemaSelecionado(null);
      setErrorMessage('');
      
      
    } catch (error) {
      
      // Mesmo com erro, limpar o estado para não deixar a tela vazia
      setTexto('');
      setAvaliacao(null);
      setTemaSelecionado(null);
      setErrorMessage('');
      
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-3">
                  <FaPenFancy className="text-white text-lg" data-no-animate />
                </div>
                Editor de Redação
              </h1>
              <p className="text-gray-600">Pratique sua redação do ENEM com apoio da IA</p>
            </div>
            
            {/* User Stats */}
            {userData && (
              <motion.div 
                className="hidden md:flex items-center space-x-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{userData.totalRedacoes || 0}</div>
                  <div className="text-sm text-gray-500">Redações</div>
                  </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-600">{userData.mediaNotas || 0}</div>
                  <div className="text-sm text-gray-500">Média</div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Main Layout - 70/30 */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Editor Principal - 70% */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!temaSelecionado ? (
                <motion.div
                  key="instructions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card variant="elevated" className="h-full">
                    <Card.Body className="text-center py-16">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <FaPenFancy className="text-white text-3xl" data-no-animate />
                        </div>
                      </motion.div>
                      
                      <motion.h2 
                        className="text-2xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        Escolha um tema para começar
                      </motion.h2>
                      
                      <motion.p 
                        className="text-gray-600 mb-8 max-w-md mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        Selecione um tema da lista ou gere um novo tema com IA para praticar sua redação do ENEM.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <motion.button
                          onClick={gerarTema}
                          disabled={isGeneratingTheme}
                          className="inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          {isGeneratingTheme ? (
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          ) : (
                            <FaMagic className="mr-2" data-animate />
                          )}
                          {isGeneratingTheme ? 'Gerando...' : 'Gerar Tema com IA'}
                        </motion.button>
                      </motion.div>
                    </Card.Body>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card variant="elevated" className="h-full">
                    <Card.Header>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Tema Selecionado</h3>
                          <p className="text-sm text-gray-600 mt-1">{temaSelecionado.titulo}</p>
                        </div>
                        <motion.button
                          onClick={() => setTemaSelecionado(null)}
                          className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FaTimes data-no-animate />
                        </motion.button>
                      </div>
                    </Card.Header>

                    <Card.Body>
                      {avaliacao ? (
                        <Avaliacao 
                          avaliacao={avaliacao} 
                          onSaveToHistory={salvarNoHistorico}
                          onNewRedacao={novaRedacao}
                        />
                      ) : (
                        <div className="space-y-6">

                          {/* Textos Motivadores */}
                          {temaSelecionado?.textosMotivadores && temaSelecionado.textosMotivadores.length > 0 && (
                            <Card variant="outlined" className="bg-blue-50 border-blue-200">
                              <Card.Header>
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FaFileAlt className="text-blue-600 text-xs" data-no-animate />
                                  </div>
                                  <h4 className="font-semibold text-blue-900">Textos Motivadores</h4>
                                </div>
                              </Card.Header>
                              <Card.Body>
                                <div className="space-y-4">
                                  {temaSelecionado.textosMotivadores.map((texto, index) => {
                                    const isObject = typeof texto === 'object' && texto !== null;
                                    const conteudo = isObject ? (texto.conteudo || texto.titulo || texto.fonte) : texto;
                                    const fonte = isObject ? texto.fonte : null;
                                    const titulo = isObject ? texto.titulo : null;
                                    
                                    return (
                                      <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                                      >
                                        <div className="flex items-start space-x-3">
                                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                                            {index + 1}
                                          </div>
                                          <div className="flex-1">
                                            {titulo && (
                                              <h5 className="font-semibold text-gray-900 text-sm mb-2">
                                                {titulo}
                                              </h5>
                                            )}
                                            <p className="text-gray-800 text-sm leading-relaxed mb-3">
                                              {conteudo}
                                            </p>
                                            {fonte && (
                                              <div className="flex items-center space-x-2 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                                <span className="font-medium">Fonte:</span>
                                                <span className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                                                  {fonte.includes('http') ? (
                                                    <a 
                                                      href={fonte} 
                                                      target="_blank" 
                                                      rel="noopener noreferrer"
                                                      className="underline hover:no-underline inline-flex items-center space-x-1"
                                                    >
                                                      <span>{fonte}</span>
                                                      <FaExternalLinkAlt className="text-xs" data-no-animate />
                                                    </a>
                                                  ) : (
                                                    fonte
                                                  )}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                                  <div className="flex items-start space-x-2">
                                    <FaLightbulb className="text-blue-600 text-sm mt-0.5 flex-shrink-0" data-no-animate />
                                    <div className="text-blue-800 text-xs">
                                      <p className="mb-2">
                                        <strong>Dica:</strong> Use esses textos como base para sua argumentação, mas desenvolva suas próprias ideias e exemplos.
                                      </p>
                                      <p className="text-blue-700">
                                        <strong>💡</strong> Clique nas fontes para acessar o conteúdo original e enriquecer sua redação com dados atualizados.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          )}

                          {/* Editor de Texto */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Sua Redação
                            </label>
                            <textarea
                              ref={textareaRef}
                              value={texto}
                              onChange={(e) => setTexto(e.target.value)}
                              placeholder="Digite sua redação aqui..."
                              className="w-full h-96 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            />
                          </div>

                          {/* Contadores */}
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <FaFileAlt className="mr-2" data-no-animate />
                              {contarPalavras(texto)} palavras
                            </div>
                            <div className="flex items-center">
                              <FaChartLine className="mr-2" data-no-animate />
                              {contarCaracteres(texto)} caracteres
                            </div>
                            <div className="flex items-center">
                              <FaClock className="mr-2" data-no-animate />
                              ~{estimarTempoLeitura(texto)} min de leitura
          </div>
        </div>

                          {/* Dicas de Escrita */}
                          <Card variant="outlined" className="bg-blue-50 border-blue-200">
                            <Card.Body>
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <FaLightbulb className="text-blue-600 text-sm" data-no-animate />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-blue-900 mb-1">Dicas para uma boa redação</h4>
                                  <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Use linguagem formal e objetiva</li>
                                    <li>• Estruture em introdução, desenvolvimento e conclusão</li>
                                    <li>• Cite exemplos e dados quando possível</li>
                                    <li>• Revise a ortografia e gramática</li>
                                  </ul>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>

                          {/* Mensagem de Erro */}
                          <AnimatePresence>
                            {errorMessage && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-red-50 border border-red-200 rounded-xl p-4"
                              >
                                <div className="flex items-center">
                                  <FaExclamationTriangle className="text-red-600 mr-2" data-no-animate />
                                  <span className="text-red-800">{errorMessage}</span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Botões de Ação */}
                          <div className="flex flex-col sm:flex-row gap-4">
                            <motion.button
                              onClick={analisarRedacao}
                              disabled={!texto.trim() || isAnalyzing}
                              className="inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ duration: 0.2 }}
                            >
                              {isAnalyzing ? (
                                <motion.div
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                              ) : (
                                <FaBrain className="mr-2" data-animate />
                              )}
                              {isAnalyzing ? 'Analisando...' : 'Enviar para Análise'}
                            </motion.button>
                            
                            <motion.button
                              onClick={novaRedacao}
                              className="inline-flex items-center justify-center px-6 py-4 border-2 border-primary-500 text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition-colors duration-300"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FaEdit className="mr-2" data-animate />
                              Nova Redação
                            </motion.button>
                          </div>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
              </div>

          {/* Sidebar - 30% */}
          <div className="lg:col-span-3">
            <Sidebar position="right" sticky={true}>
              <Sidebar.Header>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <FaBrain className="text-white text-sm" data-no-animate />
                  </div>
                  <h3 className="font-semibold text-gray-900">IA Assistant</h3>
                </div>
              </Sidebar.Header>

              <Sidebar.Body>

                <Sidebar.Section title="Temas Disponíveis">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {temas.filter(tema => tema && tema.id).slice(0, 5).map((tema, index) => (
                      <motion.button
                        key={tema.id}
                        onClick={() => setTemaSelecionado(tema)}
                        className={`w-full text-left p-3 rounded-xl border transition-colors duration-200 ${
                          temaSelecionado?.id === tema.id
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="font-medium text-sm mb-1">{tema.titulo}</div>
                        <div className="text-xs text-gray-500">
                          {tema.dataCriacao ? (
                            typeof tema.dataCriacao.toDate === 'function' 
                              ? new Date(tema.dataCriacao.toDate()).toLocaleDateString()
                              : new Date(tema.dataCriacao).toLocaleDateString()
                          ) : 'Data não disponível'}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </Sidebar.Section>

                <Sidebar.Section title="Ferramentas IA">
                  <div className="space-y-3">
                    <motion.button
                      onClick={gerarTema}
                      disabled={isGeneratingTheme}
                      className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-700 transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isGeneratingTheme ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <FaMagic className="mr-2" data-animate />
                      )}
                      {isGeneratingTheme ? 'Gerando...' : 'Gerar Tema'}
                    </motion.button>


                    <motion.button
                      onClick={analisarRedacao}
                      disabled={isAnalyzing || !texto.trim()}
                      className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-medium rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isAnalyzing ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <FaBrain className="mr-2" data-animate />
                      )}
                      {isAnalyzing ? 'Analisando...' : 'Analisar Redação'}
                    </motion.button>

                    <motion.button
                      onClick={sugerirMelhorias}
                      disabled={isSuggesting || !texto.trim()}
                      className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-success-500 to-success-600 text-white font-medium rounded-xl hover:from-success-600 hover:to-success-700 transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isSuggesting ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <FaRocket className="mr-2" data-animate />
                      )}
                      {isSuggesting ? 'Processando...' : 'Sugerir Melhorias'}
                    </motion.button>
                  </div>
                </Sidebar.Section>


                <Sidebar.Section title="Progresso">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Redações Concluídas</span>
                        <span className="font-medium">{userData?.totalRedacoes || 0}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-colors duration-300"
                          style={{ width: `${Math.min((userData?.totalRedacoes || 0) * 10, 100)}%` }}
                        />
                      </div>
                    </div>

                        <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Média de Notas</span>
                        <span className="font-medium">{userData?.mediaNotas || 0}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-success-500 to-success-600 h-2 rounded-full transition-colors duration-300"
                          style={{ width: `${(userData?.mediaNotas || 0) / 10}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Sidebar.Section>
              </Sidebar.Body>
            </Sidebar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticePage;