import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
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
  FaSave
} from 'react-icons/fa';
import Button from '../ui/Button';
import Card from '../ui/Card';
import '../../styles/design-system.css';

function Avaliacao({ avaliacao }) {
  // Log para depuração
  console.log('Avaliacao recebida:', avaliacao);

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

  // Calcular nota final
  const notaFinal = avaliacao.competencias?.reduce((total, comp) => total + (comp.nota || 0), 0) || 0;

  // Função para salvar no histórico
  const salvarNoHistorico = async () => {
    try {
      // Implementar lógica para salvar no histórico
      console.log('Salvando no histórico:', avaliacao);
      // Aqui você pode adicionar a lógica para salvar no Firestore
    } catch (error) {
      console.error('Erro ao salvar no histórico:', error);
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
        {avaliacao.competencias?.map((competencia, index) => {
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

                  {/* Feedback */}
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
        })}
        </div>

        {/* Comentários Gerais */}
      {avaliacao.comentariosGerais && (
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
                <h3 className="font-semibold text-gray-900">Comentários Gerais</h3>
              </div>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-700 leading-relaxed">
                {avaliacao.comentariosGerais}
              </p>
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
          motionProps={{
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 }
          }}
        >
          <FaSave className="mr-2" />
          Salvar no Histórico
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.location.reload()}
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
        feedback: PropTypes.string
      })
    ),
    comentariosGerais: PropTypes.string,
    notaFinal: PropTypes.number
  })
};

export default Avaliacao;