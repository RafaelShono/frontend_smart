import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  FaInfoCircle,
  FaTrophy,
  FaChartLine,
  FaLightbulb,
  FaStar,
  FaBrain,
  FaPenFancy,
  FaBookOpen,
  FaGraduationCap,
  FaRocket,
  FaCheckCircle,
  FaSave,
  FaSpinner
} from 'react-icons/fa';
import Button from '../ui/Button';
import Card from '../ui/Card';
import '../../styles/design-system.css';

function Avaliacao({ avaliacao, onSaveToHistory, onNewRedacao }) {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  // Log para depuração

  // Verifica se a avaliação está disponível
  if (!avaliacao) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaInfoCircle className="text-gray-400 text-2xl" />
      </div>
        <p className="text-gray-500">Nenhuma avaliação disponível</p>
      </motion.div>
    );
  }

  // Função para obter o ícone da competência
  const getCompetenciaIcon = (id) => {
    const icons = {
      1: FaPenFancy,
      2: FaBookOpen,
      3: FaStar,
      4: FaLightbulb,
      5: FaGraduationCap
    };
    return icons[id] || FaStar;
  };

  // Função para obter a cor baseada na nota
  const getCompetenceColor = (nota) => {
    if (nota >= 160) return 'success';
    if (nota >= 120) return 'primary';
    if (nota >= 80) return 'warning';
    return 'error';
  };

  // Função para obter a cor do texto
  const getCompetenceTextColor = (nota) => {
    const color = getCompetenceColor(nota);
    const colorMap = {
      success: 'text-success-600',
      primary: 'text-primary-600',
      warning: 'text-warning-600',
      error: 'text-error-600'
    };
    return colorMap[color] || 'text-gray-600';
  };

  // Função para obter a cor de fundo
  const getCompetenceBgColor = (nota) => {
    const color = getCompetenceColor(nota);
    const colorMap = {
      success: 'bg-gradient-to-r from-success-500 to-success-600',
      primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
      warning: 'bg-gradient-to-r from-warning-500 to-warning-600',
      error: 'bg-gradient-to-r from-error-500 to-error-600'
    };
    return colorMap[color] || 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  // Função para obter a cor da borda
  const getCompetenceBorderColor = (nota) => {
    const color = getCompetenceColor(nota);
    const colorMap = {
      success: 'border-success-500',
      primary: 'border-primary-500',
      warning: 'border-warning-500',
      error: 'border-error-500'
    };
    return colorMap[color] || 'border-gray-500';
  };

  // Calcular nota final - adaptado para o formato do agente corretor ENEM
  const notaFinal = avaliacao.pontuacaoTotal || 
    (avaliacao.pontuacao ? Object.values(avaliacao.pontuacao).reduce((total, pontos) => total + pontos, 0) : 0) ||
    (avaliacao.competencias?.reduce((total, comp) => total + (comp.nota || 0), 0) || 0);

  // Função para salvar no histórico
  const salvarNoHistorico = async () => {
    setIsSaving(true);
    
    try {
      
      // Se há uma função de callback, use ela
      if (onSaveToHistory) {
        await onSaveToHistory(avaliacao);
      }
      
      // Pequeno delay para mostrar o feedback visual
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // A navegação será feita pelo callback do componente pai
      // Não navegar aqui para evitar problemas de rota
      
    } catch (error) {
      console.error('Erro ao salvar no histórico:', error);
      
      // Verificar se é erro de rede bloqueado
      if (error.message && error.message.includes('ERR_BLOCKED_BY_CLIENT')) {
        console.warn('Erro de rede bloqueado por extensão do navegador. Continuando...');
      }
      
      // Mesmo com erro, continuar (o callback do pai vai lidar com a navegação)
    } finally {
      setIsSaving(false);
    }
  };

  // Função para nova redação
  const novaRedacao = () => {
    if (onNewRedacao) {
      onNewRedacao();
    } else {
      // Fallback: navegar para praticar
      navigate('/praticar');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com Nota Final */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card variant="elevated" className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <Card.Body className="text-center py-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="text-white text-3xl" />
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Sua Redação foi Analisada!
            </motion.h2>
            
            <motion.div 
              className="text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {notaFinal}
            </motion.div>
            
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              de 1000 pontos
            </motion.p>

            {/* Barra de Progresso */}
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(notaFinal / 1000) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {((notaFinal / 1000) * 100).toFixed(1)}% da nota máxima
              </p>
            </motion.div>
          </Card.Body>
        </Card>
      </motion.div>

      {/* Cards das Competências */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(() => {
          // Adaptar para o formato do agente corretor ENEM
          const competencias = avaliacao.competencias || [];
          const pontuacao = avaliacao.pontuacao || {};
          const analiseDetalhada = avaliacao.analiseDetalhada || {};
          
          // Se temos pontuação do agente corretor, usar ela
          if (Object.keys(pontuacao).length > 0) {
            return Object.entries(pontuacao).map(([key, pontos], index) => {
              const competenciaId = key.replace('competencia', '');
              const IconComponent = getCompetenciaIcon(parseInt(competenciaId));
              const detalhes = analiseDetalhada[key] || {};
              
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                >
                  <Card 
                    variant="elevated" 
                    hoverable={true}
                    className={`border-l-4 ${getCompetenceBorderColor(pontos)}`}
                    motionProps={{
                      whileHover: { scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }
                    }}
                  >
                    <Card.Body>
                      {/* Header da Competência */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 ${getCompetenceBgColor(pontos)} rounded-xl flex items-center justify-center`}>
                            <IconComponent className="text-white text-lg" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-gray-900">
                              Competência {competenciaId}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {detalhes.nome || `Competência ${competenciaId}`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getCompetenceTextColor(pontos)}`}>
                            {pontos}/200
                          </div>
                          <div className="text-xs text-gray-500">
                            {((pontos / 200) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>

                      {/* Barra de Progresso */}
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
                        <motion.div
                          className={`${getCompetenceBgColor(pontos)} h-2.5 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(pontos / 200) * 100}%` }}
                          transition={{ duration: 1, delay: 0.6 + (index * 0.1) }}
                        />
                      </div>

                      {/* Observações */}
                      {detalhes.observacoes && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start space-x-2">
                            <FaInfoCircle className="text-blue-500 text-sm mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-blue-700">
                              {detalhes.observacoes}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Sugestões */}
                      {detalhes.sugestoes && (
                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="flex items-start space-x-2">
                            <FaLightbulb className="text-yellow-500 text-sm mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-yellow-700 italic">
                              {detalhes.sugestoes}
                            </p>
                          </div>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </motion.div>
              );
            });
          }
          
          // Fallback para formato antigo
          return competencias.map((competencia, index) => {
            const IconComponent = getCompetenciaIcon(competencia.id);
            
            return (
              <motion.div
                key={competencia.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              >
                <Card 
                  variant="elevated" 
                  hoverable={true}
                  className={`border-l-4 ${getCompetenceBorderColor(competencia.nota)}`}
                  motionProps={{
                    whileHover: { scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }
                  }}
                >
                  <Card.Body>
                    {/* Header da Competência */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${getCompetenceBgColor(competencia.nota)} rounded-xl flex items-center justify-center`}>
                          <IconComponent className="text-white text-lg" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">
                            Competência {competencia.id}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {competencia.nome || `Competência ${competencia.id}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getCompetenceTextColor(competencia.nota)}`}>
                          {competencia.nota}/200
                        </div>
                        <div className="text-xs text-gray-500">
                          {((competencia.nota / 200) * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>

                    {/* Barra de Progresso */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
                      <motion.div
                        className={`${getCompetenceBgColor(competencia.nota)} h-2.5 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(competencia.nota / 200) * 100}%` }}
                        transition={{ duration: 1, delay: 0.6 + (index * 0.1) }}
                      />
                    </div>

                    {/* Descrição */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {competencia.descricao || 'Descrição da competência não disponível.'}
                    </p>

                    {/* Pontos Fortes */}
                    {competencia.pontosFortes && competencia.pontosFortes.length > 0 && (
                      <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start space-x-2">
                          <FaCheckCircle className="text-green-500 text-sm mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="text-xs font-semibold text-green-700 mb-1">Pontos Fortes:</h5>
                            <ul className="text-xs text-green-700 space-y-1">
                              {competencia.pontosFortes.map((ponto, idx) => (
                                <li key={idx} className="flex items-start space-x-1">
                                  <span className="text-green-500">•</span>
                                  <span>{ponto}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Áreas de Melhoria */}
                    {competencia.areasMelhoria && competencia.areasMelhoria.length > 0 && (
                      <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-start space-x-2">
                          <FaLightbulb className="text-orange-500 text-sm mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="text-xs font-semibold text-orange-700 mb-1">Áreas para Melhoria:</h5>
                            <ul className="text-xs text-orange-700 space-y-1">
                              {competencia.areasMelhoria.map((area, idx) => (
                                <li key={idx} className="flex items-start space-x-1">
                                  <span className="text-orange-500">•</span>
                                  <span>{area}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Sugestões */}
                    {competencia.sugestoes && competencia.sugestoes.length > 0 && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start space-x-2">
                          <FaRocket className="text-blue-500 text-sm mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="text-xs font-semibold text-blue-700 mb-1">Sugestões:</h5>
                            <ul className="text-xs text-blue-700 space-y-1">
                              {competencia.sugestoes.map((sugestao, idx) => (
                                <li key={idx} className="flex items-start space-x-1">
                                  <span className="text-blue-500">•</span>
                                  <span>{sugestao}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Feedback antigo (compatibilidade) */}
                    {competencia.feedback && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-start space-x-2">
                          <FaLightbulb className="text-yellow-500 text-sm mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-600 italic">
                            {competencia.feedback}
                          </p>
                        </div>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </motion.div>
            );
          });
        })()}
        </div>

        {/* Comentários Gerais - Adaptado para agente corretor ENEM */}
      {(avaliacao.comentariosGerais || avaliacao.pontosFortes || avaliacao.areasMelhoria || avaliacao.sugestoesProximasRedacoes || avaliacao.analiseOrtografiaGramatica) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card variant="elevated">
            <Card.Header>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <FaBrain className="text-white text-sm" />
                </div>
                <h3 className="font-semibold text-gray-900">Análise do Corretor ENEM</h3>
              </div>
            </Card.Header>
            <Card.Body>
              {/* Comentários gerais tradicionais */}
              {avaliacao.comentariosGerais && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Comentários Gerais</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {avaliacao.comentariosGerais}
                  </p>
                </div>
              )}

              {/* Pontos fortes do agente corretor */}
              {avaliacao.pontosFortes && avaliacao.pontosFortes.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                    <FaCheckCircle className="mr-2" />
                    Pontos Fortes
                  </h4>
                  <ul className="space-y-2">
                    {avaliacao.pontosFortes.map((ponto, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{ponto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Áreas de melhoria do agente corretor */}
              {avaliacao.areasMelhoria && avaliacao.areasMelhoria.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-orange-700 mb-3 flex items-center">
                    <FaLightbulb className="mr-2" />
                    Áreas para Melhoria
                  </h4>
                  <ul className="space-y-2">
                    {avaliacao.areasMelhoria.map((area, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sugestões para próximas redações */}
              {avaliacao.sugestoesProximasRedacoes && avaliacao.sugestoesProximasRedacoes.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center">
                    <FaRocket className="mr-2" />
                    Sugestões para Próximas Redações
                  </h4>
                  <ul className="space-y-2">
                    {avaliacao.sugestoesProximasRedacoes.map((sugestao, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{sugestao}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Análise de ortografia e gramática */}
              {avaliacao.analiseOrtografiaGramatica && (
                <div className="mb-6">
                  <h4 className="font-semibold text-purple-700 mb-3 flex items-center">
                    <FaPenFancy className="mr-2" />
                    Análise de Ortografia e Gramática
                  </h4>
                  
                  {avaliacao.analiseOrtografiaGramatica.errosEncontrados && avaliacao.analiseOrtografiaGramatica.errosEncontrados.length > 0 && (
                    <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                      <h5 className="text-sm font-semibold text-red-700 mb-2">Erros Encontrados:</h5>
                      <ul className="text-sm text-red-700 space-y-1">
                        {avaliacao.analiseOrtografiaGramatica.errosEncontrados.map((erro, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <span className="text-red-500">•</span>
                            <span>{erro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {avaliacao.analiseOrtografiaGramatica.sugestoes && avaliacao.analiseOrtografiaGramatica.sugestoes.length > 0 && (
                    <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h5 className="text-sm font-semibold text-yellow-700 mb-2">Sugestões:</h5>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {avaliacao.analiseOrtografiaGramatica.sugestoes.map((sugestao, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <span className="text-yellow-500">•</span>
                            <span>{sugestao}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {avaliacao.analiseOrtografiaGramatica.exemplos && avaliacao.analiseOrtografiaGramatica.exemplos.length > 0 && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="text-sm font-semibold text-blue-700 mb-2">Exemplos de Correção:</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        {avaliacao.analiseOrtografiaGramatica.exemplos.map((exemplo, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <span className="text-blue-500">•</span>
                            <span>{exemplo}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Compatibilidade com formato antigo */}
              {avaliacao.pontosFracos && avaliacao.pontosFracos.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-orange-700 mb-3 flex items-center">
                    <FaLightbulb className="mr-2" />
                    Áreas para Melhoria
                  </h4>
                  <ul className="space-y-2">
                    {avaliacao.pontosFracos.map((ponto, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{ponto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sugestões gerais do agente corretor (formato antigo) */}
              {avaliacao.sugestoesGerais && avaliacao.sugestoesGerais.length > 0 && (
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center">
                    <FaRocket className="mr-2" />
                    Sugestões para Próximas Redações
                  </h4>
                  <ul className="space-y-2">
                    {avaliacao.sugestoesGerais.map((sugestao, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{sugestao}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Body>
          </Card>
        </motion.div>
      )}

      {/* Próximos Passos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <Card variant="elevated" className="bg-gradient-to-r from-success-50 to-primary-50 border-success-200">
          <Card.Header>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-success-500 to-primary-500 rounded-lg flex items-center justify-center">
                <FaRocket className="text-white text-sm" />
              </div>
              <h3 className="font-semibold text-gray-900">Próximos Passos</h3>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaCheckCircle className="text-success-600 text-xs" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Continue Praticando</h4>
                  <p className="text-sm text-gray-600">A prática constante é essencial para melhorar sua redação</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaChartLine className="text-primary-600 text-xs" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Acompanhe sua Evolução</h4>
                  <p className="text-sm text-gray-600">Compare com redações anteriores para ver sua evolução</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaStar className="text-secondary-600 text-xs" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Foque nas Competências</h4>
                  <p className="text-sm text-gray-600">Identifique as áreas que precisam de mais atenção</p>
                </div>
              </div>
      </div>
          </Card.Body>
        </Card>
      </motion.div>

      {/* Botões de Ação */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={salvarNoHistorico}
          disabled={isSaving}
          motionProps={{
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 }
          }}
        >
          {isSaving ? (
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <FaSave className="mr-2" />
          )}
          {isSaving ? 'Salvando...' : 'Salvar no Histórico'}
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={novaRedacao}
          motionProps={{
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 }
          }}
        >
          <FaPenFancy className="mr-2" />
          Nova Redação
        </Button>
      </motion.div>
    </div>
  );
}

Avaliacao.propTypes = {
  avaliacao: PropTypes.shape({
    competencias: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        nome: PropTypes.string,
        descricao: PropTypes.string,
        nota: PropTypes.number.isRequired,
        feedback: PropTypes.string,
        pontosFortes: PropTypes.arrayOf(PropTypes.string),
        areasMelhoria: PropTypes.arrayOf(PropTypes.string),
        sugestoes: PropTypes.arrayOf(PropTypes.string)
      })
    ),
    comentariosGerais: PropTypes.string,
    notaFinal: PropTypes.number,
    pontosFortes: PropTypes.arrayOf(PropTypes.string),
    areasMelhoria: PropTypes.arrayOf(PropTypes.string),
    sugestoesProximasRedacoes: PropTypes.arrayOf(PropTypes.string),
    analiseOrtografiaGramatica: PropTypes.shape({
      errosEncontrados: PropTypes.arrayOf(PropTypes.string),
      sugestoes: PropTypes.arrayOf(PropTypes.string),
      exemplos: PropTypes.arrayOf(PropTypes.string)
    }),
    // Compatibilidade com formato antigo
    pontosFracos: PropTypes.arrayOf(PropTypes.string),
    sugestoesGerais: PropTypes.arrayOf(PropTypes.string)
  }),
  onSaveToHistory: PropTypes.func,
  onNewRedacao: PropTypes.func
};

export default Avaliacao;