import React, { useState, useEffect, useRef } from 'react';
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
  increment,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaPenFancy, 
  FaBrain, 
  FaChartLine, 
  FaClock, 
  FaFileAlt, 
  FaExclamationTriangle,
  FaLightbulb,
  FaBookOpen,
  FaGraduationCap,
  FaRocket,
  FaMagic,
  FaRobot,
  FaArrowRight,
  FaTimes,
  FaEdit
} from 'react-icons/fa';
import Button from '../ui/Button';
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  // Carregar temas do Firestore
  useEffect(() => {
    const carregarTemas = async () => {
      try {
        const temasRef = collection(db, 'temas');
        const q = query(temasRef, orderBy('dataCriacao', 'desc'), limit(20));
        const querySnapshot = await getDocs(q);
        const temasData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTemas(temasData);
      } catch (error) {
        console.error('Erro ao carregar temas:', error);
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
          console.error('Erro ao carregar dados do usuário:', error);
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

  // Gerar tema com IA
  const gerarTema = async () => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/news-agent/generate-theme`, {
        userId: usuarioAtual?.uid
      });
      
      if (response.data.success) {
        const novoTema = response.data.theme;
        setTemas(prev => [novoTema, ...prev]);
        setTemaSelecionado(novoTema);
      }
    } catch (error) {
      setErrorMessage('Erro ao gerar tema. Tente novamente.');
      console.error('Erro ao gerar tema:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Analisar redação
  const analisarRedacao = async () => {
    if (!texto.trim()) {
      setErrorMessage('Por favor, escreva sua redação antes de analisar.');
      return;
    }

    if (contarPalavras(texto) < 7) {
      setErrorMessage('Sua redação deve ter pelo menos 7 linhas.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/analyze`, {
        texto: texto,
        tema: temaSelecionado?.titulo || 'Tema livre',
        userId: usuarioAtual?.uid
      });

      if (response.data.success) {
        setAvaliacao(response.data.avaliacao);
        
        // Salvar no Firestore
        if (usuarioAtual) {
          await addDoc(collection(db, 'redacoes'), {
            userId: usuarioAtual.uid,
            texto: texto,
            tema: temaSelecionado?.titulo || 'Tema livre',
            avaliacao: response.data.avaliacao,
            dataCriacao: new Date(),
            palavras: contarPalavras(texto),
            caracteres: contarCaracteres(texto)
          });

          // Atualizar estatísticas do usuário
          const userRef = doc(db, 'usuarios', usuarioAtual.uid);
          await updateDoc(userRef, {
            totalRedacoes: increment(1),
            ultimaRedacao: new Date()
          });
        }
      }
    } catch (error) {
      setErrorMessage('Erro ao analisar redação. Tente novamente.');
      console.error('Erro ao analisar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sugerir melhorias
  const sugerirMelhorias = async () => {
    if (!texto.trim()) {
      setErrorMessage('Por favor, escreva sua redação antes de solicitar sugestões.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/analyze`, {
        texto: texto,
        tema: temaSelecionado?.titulo || 'Tema livre',
        userId: usuarioAtual?.uid,
        tipoAnalise: 'sugestoes'
      });

      if (response.data.success) {
        // Implementar modal ou seção para mostrar sugestões
        console.log('Sugestões:', response.data.sugestoes);
      }
    } catch (error) {
      setErrorMessage('Erro ao gerar sugestões. Tente novamente.');
      console.error('Erro ao gerar sugestões:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Nova redação
  const novaRedacao = () => {
    setTexto('');
    setAvaliacao(null);
    setTemaSelecionado(null);
    setErrorMessage('');
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
                  <FaPenFancy className="text-white text-lg" />
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
                          <FaPenFancy className="text-white text-3xl" />
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
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={gerarTema}
                          loading={isLoading}
                          motionProps={{
                            whileHover: { scale: 1.05 },
                            whileTap: { scale: 0.95 }
                          }}
                        >
                          <FaMagic className="mr-2" />
                          Gerar Tema com IA
                        </Button>
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setTemaSelecionado(null)}
                          motionProps={{
                            whileHover: { scale: 1.1 },
                            whileTap: { scale: 0.9 }
                          }}
                        >
                          <FaTimes />
                        </Button>
                      </div>
                    </Card.Header>

                    <Card.Body>
                      {avaliacao ? (
                        <Avaliacao avaliacao={avaliacao} />
                      ) : (
                        <div className="space-y-6">
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
                              <FaFileAlt className="mr-2" />
                              {contarPalavras(texto)} palavras
                            </div>
                            <div className="flex items-center">
                              <FaChartLine className="mr-2" />
                              {contarCaracteres(texto)} caracteres
                            </div>
                            <div className="flex items-center">
                              <FaClock className="mr-2" />
                              ~{estimarTempoLeitura(texto)} min de leitura
          </div>
        </div>

                          {/* Dicas de Escrita */}
                          <Card variant="outlined" className="bg-blue-50 border-blue-200">
                            <Card.Body>
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <FaLightbulb className="text-blue-600 text-sm" />
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
                                  <FaExclamationTriangle className="text-red-600 mr-2" />
                                  <span className="text-red-800">{errorMessage}</span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Botões de Ação */}
                          <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                              variant="primary"
                              size="lg"
                              onClick={analisarRedacao}
                              loading={isLoading}
                              disabled={!texto.trim()}
                              motionProps={{
                                whileHover: { scale: 1.02 },
                                whileTap: { scale: 0.98 }
                              }}
                            >
                              <FaBrain className="mr-2" />
                              Enviar para Análise
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="lg"
                              onClick={novaRedacao}
                              motionProps={{
                                whileHover: { scale: 1.02 },
                                whileTap: { scale: 0.98 }
                              }}
                            >
                              <FaEdit className="mr-2" />
                              Nova Redação
                            </Button>
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
                    <FaRobot className="text-white text-sm" />
                  </div>
                  <h3 className="font-semibold text-gray-900">IA Assistant</h3>
                </div>
              </Sidebar.Header>

              <Sidebar.Body>
                <Sidebar.Section title="Temas Disponíveis">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {temas.slice(0, 5).map((tema, index) => (
                      <motion.button
                        key={tema.id}
                        onClick={() => setTemaSelecionado(tema)}
                        className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
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
                          {new Date(tema.dataCriacao?.toDate()).toLocaleDateString()}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </Sidebar.Section>

                <Sidebar.Section title="Ferramentas IA">
                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={gerarTema}
                      loading={isLoading}
                      className="w-full"
                      motionProps={{
                        whileHover: { scale: 1.02 },
                        whileTap: { scale: 0.98 }
                      }}
                    >
                      <FaMagic className="mr-2" />
                      Gerar Tema
                    </Button>

                    <Button
                      variant="secondary"
                      size="md"
                      onClick={analisarRedacao}
                      loading={isLoading}
                      disabled={!texto.trim()}
                      className="w-full"
                      motionProps={{
                        whileHover: { scale: 1.02 },
                        whileTap: { scale: 0.98 }
                      }}
                    >
                      <FaBrain className="mr-2" />
                      Analisar Redação
                    </Button>

                    <Button
                      variant="success"
                      size="md"
                      onClick={sugerirMelhorias}
                      loading={isLoading}
                      disabled={!texto.trim()}
                      className="w-full"
                      motionProps={{
                        whileHover: { scale: 1.02 },
                        whileTap: { scale: 0.98 }
                      }}
                    >
                      <FaRocket className="mr-2" />
                      Sugerir Melhorias
                    </Button>
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
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
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
                          className="bg-gradient-to-r from-success-500 to-success-600 h-2 rounded-full transition-all duration-300"
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