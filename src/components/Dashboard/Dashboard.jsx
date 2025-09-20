/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { 
  FaTrophy, 
  FaChartLine, 
  FaPenFancy, 
  FaFire, 
  FaAward, 
  FaBookOpen,
  FaBullseye,
  FaCalendarAlt,
  FaStar,
  FaMedal,
  FaSpinner,
  FaArrowUp,
  FaArrowDown,
  FaChartBar,
  FaRocket
} from 'react-icons/fa';
import ScoreEvolution from '../ScoreEvolution/ScoreEvolution';
import Leaderboard from '../LeaderBoard/LeaderBoard';
import Achievements from '../Achievements/Achievements';
import '../../styles/design-system.css';

function Dashboard() {
  const [redacoes, setRedacoes] = useState([]);
  const [historicalScores, setHistoricalScores] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState({
    totalRedacoes: 0,
    mediaNotas: 0,
    melhorNota: 0,
    streakAtual: 0,
    redacoesEsteMes: 0,
    evolucao: 0
  });
  const [loading, setLoading] = useState(true);
  const { usuarioAtual } = useAuth();

  useEffect(() => {
    if (usuarioAtual) {
      fetchDashboardData();
    }
  }, [usuarioAtual]);

  // Calcular estatísticas quando as redações forem carregadas
  useEffect(() => {
    console.log('🔄 useEffect redacoes executado, redações:', redacoes.length);
    fetchStats();
  }, [redacoes]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchRedacoes(),
        fetchLeaderboard()
      ]);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRedacoes = async () => {
    try {
      console.log('🔍 Buscando redações para usuário:', usuarioAtual.uid);
      
      let q = query(
        collection(db, 'redacoes'),
        where('usuarioId', '==', usuarioAtual.uid),
        orderBy('criadoEm', 'desc')
      );
      
      let querySnapshot;
      try {
        querySnapshot = await getDocs(q);
        console.log('✅ Query com orderBy executada com sucesso');
      } catch (indexError) {
        console.warn('⚠️ Índice não encontrado, buscando sem orderBy:', indexError);
        q = query(
          collection(db, 'redacoes'),
          where('usuarioId', '==', usuarioAtual.uid)
        );
        querySnapshot = await getDocs(q);
        console.log('✅ Query sem orderBy executada com sucesso');
      }
      
      const redacoesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      console.log('📊 Redações encontradas:', redacoesData.length);
      console.log('📋 Dados das redações:', redacoesData);
      
      // Ordenar no cliente se necessário
      redacoesData.sort((a, b) => {
        const dateA = a.criadoEm?.toDate ? a.criadoEm.toDate() : new Date(a.criadoEm);
        const dateB = b.criadoEm?.toDate ? b.criadoEm.toDate() : new Date(b.criadoEm);
        return dateB - dateA;
      });
      
      setRedacoes(redacoesData);
      setHistoricalScores(redacoesData.map(r => ({
        data: r.criadoEm?.toDate ? r.criadoEm.toDate() : new Date(r.criadoEm),
        nota: r.pontuacaoTotal || 0
      })));
    } catch (error) {
      console.error('❌ Erro ao buscar redações:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const q = query(
        collection(db, 'redacoes'),
        orderBy('pontuacaoTotal', 'desc'),
        limit(10)
      );
      
      const querySnapshot = await getDocs(q);
      const leaderboardData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Erro ao buscar leaderboard:', error);
    }
  };

  const fetchStats = () => {
    console.log('📈 Calculando estatísticas para:', redacoes.length, 'redações');
    
    if (!redacoes || redacoes.length === 0) {
      console.log('📊 Nenhuma redação encontrada, definindo estatísticas zeradas');
      setStats({
        totalRedacoes: 0,
        mediaNotas: 0,
        melhorNota: 0,
        streakAtual: 0,
        redacoesEsteMes: 0,
        evolucao: 0
      });
      return;
    }

    const totalRedacoes = redacoes.length;
    const mediaNotas = totalRedacoes > 0 
      ? redacoes.reduce((sum, r) => sum + (r.pontuacaoTotal || 0), 0) / totalRedacoes 
      : 0;
    const melhorNota = totalRedacoes > 0 
      ? Math.max(...redacoes.map(r => r.pontuacaoTotal || 0)) 
      : 0;
    
    // Calcular streak (dias consecutivos)
    const streakAtual = calculateStreak(redacoes);
    
    // Redações este mês
    const agora = new Date();
    const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
    const redacoesEsteMes = redacoes.filter(r => {
      const dataRedacao = r.criadoEm?.toDate ? r.criadoEm.toDate() : new Date(r.criadoEm);
      return dataRedacao >= inicioMes;
    }).length;
    
    // Evolução (comparar com mês anterior)
    const mesAnterior = new Date(agora.getFullYear(), agora.getMonth() - 1, 1);
    const fimMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
    const redacoesMesAnterior = redacoes.filter(r => {
      const dataRedacao = r.criadoEm?.toDate ? r.criadoEm.toDate() : new Date(r.criadoEm);
      return dataRedacao >= mesAnterior && dataRedacao <= fimMesAnterior;
    }).length;
    
    const evolucao = redacoesMesAnterior > 0 
      ? ((redacoesEsteMes - redacoesMesAnterior) / redacoesMesAnterior) * 100 
      : redacoesEsteMes > 0 ? 100 : 0;

    const newStats = {
      totalRedacoes,
      mediaNotas: Math.round(mediaNotas),
      melhorNota,
      streakAtual,
      redacoesEsteMes,
      evolucao: Math.round(evolucao)
    };
    
    console.log('📊 Estatísticas calculadas:', newStats);
    setStats(newStats);
  };

  const calculateStreak = (redacoes) => {
    if (redacoes.length === 0) return 0;
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let dataAtual = new Date(hoje);
    
    // Ordenar redações por data (mais recente primeiro)
    const redacoesOrdenadas = [...redacoes].sort((a, b) => {
      const dateA = a.criadoEm?.toDate ? a.criadoEm.toDate() : new Date(a.criadoEm);
      const dateB = b.criadoEm?.toDate ? b.criadoEm.toDate() : new Date(b.criadoEm);
      return dateB - dateA;
    });
    
    for (const redacao of redacoesOrdenadas) {
      const dataRedacao = redacao.criadoEm?.toDate ? redacao.criadoEm.toDate() : new Date(redacao.criadoEm);
      dataRedacao.setHours(0, 0, 0, 0);
      
      if (dataRedacao.getTime() === dataAtual.getTime()) {
        streak++;
        dataAtual.setDate(dataAtual.getDate() - 1);
      } else if (dataRedacao.getTime() < dataAtual.getTime()) {
        break;
      }
    }
    
    return streak;
  };

  const getScoreColor = (score) => {
    if (score >= 900) return 'text-success-600';
    if (score >= 800) return 'text-primary-600';
    if (score >= 700) return 'text-warning-600';
    if (score >= 600) return 'text-warning-500';
    return 'text-error-600';
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 900) return 'badge-success';
    if (score >= 800) return 'badge-primary';
    if (score >= 700) return 'badge-warning';
    return 'badge-error';
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-4xl text-primary-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-50">
      <div className="container py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent flex items-center justify-center mb-4">
              <FaRocket className="mr-3 text-primary-500" />
              Dashboard
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Acompanhe seu progresso e evolução na redação com análises detalhadas e insights personalizados
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total de Redações */}
          <motion.div 
            className="card motion-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total de Redações</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    {stats.totalRedacoes}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaPenFancy className="text-2xl text-primary-600" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Média de Notas */}
          <motion.div 
            className="card motion-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Média de Notas</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-success-600 to-success-700 bg-clip-text text-transparent">
                    {stats.mediaNotas}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-success-100 to-success-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaArrowUp className="text-2xl text-success-600" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Melhor Nota */}
          <motion.div 
            className="card motion-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Melhor Nota</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-warning-600 to-warning-700 bg-clip-text text-transparent">
                    {stats.melhorNota}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-warning-100 to-warning-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaTrophy className="text-2xl text-warning-600" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Streak Atual */}
          <motion.div 
            className="card motion-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Sequência Atual</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-error-600 to-error-700 bg-clip-text text-transparent">
                    {stats.streakAtual} dias
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-error-100 to-error-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaFire className="text-2xl text-error-600" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Evolução e Estatísticas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Gráfico de Evolução */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="card motion-card">
              <div className="card-header">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mr-3">
                    <FaChartLine className="text-primary-600" />
                  </div>
                  Evolução das Notas
                </h2>
              </div>
              <div className="card-body">
                <ScoreEvolution scores={historicalScores} />
              </div>
            </div>
          </motion.div>

          {/* Estatísticas do Mês */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Redações Este Mês */}
            <motion.div 
              className="card motion-card"
              whileHover={{ scale: 1.02 }}
            >
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Este Mês</h3>
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                    <FaCalendarAlt className="text-primary-600 text-sm" />
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-2">
                  {stats.redacoesEsteMes}
                </div>
                <p className="text-sm text-gray-600">redações enviadas</p>
                
                {stats.evolucao !== 0 && (
                  <div className="mt-3 flex items-center">
                    {stats.evolucao > 0 ? (
                      <FaArrowUp className="text-success-500 mr-1" />
                    ) : (
                      <FaArrowDown className="text-error-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stats.evolucao > 0 ? 'text-success-600' : 'text-error-600'
                    }`}>
                      {Math.abs(stats.evolucao)}% vs mês anterior
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Meta Mensal */}
            <motion.div 
              className="card motion-card"
              whileHover={{ scale: 1.02 }}
            >
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Meta Mensal</h3>
                  <div className="w-8 h-8 bg-gradient-to-br from-warning-100 to-warning-200 rounded-lg flex items-center justify-center">
                   
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-warning-600 to-warning-700 bg-clip-text text-transparent mb-2">
                  {Math.min(stats.redacoesEsteMes, 10)}/10
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-warning-500 to-warning-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((stats.redacoesEsteMes / 10) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                  ></motion.div>
                </div>
                <p className="text-sm text-gray-600">
                  {stats.redacoesEsteMes >= 10 ? 'Meta atingida! 🎉' : `${10 - stats.redacoesEsteMes} redações restantes`}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Redações Recentes e Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Redações Recentes */}
          <motion.div 
            className="card motion-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="card-header">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mr-3">
                  <FaBookOpen className="text-primary-600" />
                </div>
                Redações Recentes
              </h2>
            </div>
            <div className="card-body">
              {redacoes.length === 0 ? (
                <div className="text-center py-8">
                  <FaPenFancy className="text-4xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Nenhuma redação enviada ainda</p>
                  <a 
                    href="/praticar" 
                    className="btn btn-primary"
                  >
                    Começar a Praticar
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {redacoes.slice(0, 5).map((redacao, index) => (
                    <motion.div 
                      key={redacao.id} 
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                          {redacao.tema?.titulo || 'Tema não especificado'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {formatDate(redacao.criadoEm)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreBadgeColor(redacao.pontuacaoTotal || 0)}`}>
                          {redacao.pontuacaoTotal || 0}
                        </span>
                        {redacao.pontuacaoTotal >= 900 && (
                          <FaStar className="text-warning-500 animate-pulse" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {redacoes.length > 5 && (
                    <div className="text-center pt-4">
                      <a 
                        href="/minhas-redacoes" 
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Ver todas as redações
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Leaderboard */}
          <motion.div 
            className="card motion-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="card-header">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-warning-100 to-warning-200 rounded-xl flex items-center justify-center mr-3">
                  <FaTrophy className="text-warning-600" />
                </div>
                Ranking Geral
              </h2>
            </div>
            <div className="card-body">
              {leaderboard.length === 0 ? (
                <div className="text-center py-8">
                  <FaTrophy className="text-4xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum ranking disponível</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leaderboard.slice(0, 5).map((redacao, index) => (
                    <motion.div 
                      key={redacao.id} 
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 + (index * 0.1) }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold shadow-lg ${
                          index === 0 ? 'bg-gradient-to-br from-warning-100 to-warning-200 text-warning-800' :
                          index === 1 ? 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800' :
                          index === 2 ? 'bg-gradient-to-br from-warning-100 to-warning-200 text-warning-800' :
                          'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {redacao.usuarioNome || 'Usuário Anônimo'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDate(redacao.criadoEm)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-lg ${getScoreColor(redacao.pontuacaoTotal || 0)}`}>
                          {redacao.pontuacaoTotal || 0}
                        </span>
                        {index < 3 && (
                          <FaMedal className={`text-lg ${
                            index === 0 ? 'text-warning-500' :
                            index === 1 ? 'text-gray-400' :
                            'text-warning-500'
                          }`} />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="card motion-card">
            <div className="card-header">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-200 rounded-xl flex items-center justify-center mr-3">
                  <FaAward className="text-purple-600" />
                </div>
                Conquistas
              </h2>
            </div>
            <div className="card-body">
              <Achievements redacoes={redacoes} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;