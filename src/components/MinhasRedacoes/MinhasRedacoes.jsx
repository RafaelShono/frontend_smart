// src/components/MinhasRedacoes.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import Avatar from 'react-avatar';
import RedacaoAnalyzer from '../RedacaoAnalyzer/RedacaoAnalyzer';

function MinhasRedacoes() {
  const [redacoes, setRedacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroAvaliacao, setFiltroAvaliacao] = useState('todas'); // 'todas', 'completas', 'basicas', 'sem-avaliacao'
  const [redacaoAnalisando, setRedacaoAnalisando] = useState(null);
  const { usuarioAtual } = useAuth();

  useEffect(() => {
    const fetchRedacoes = async () => {
      setLoading(true);
      setError('');
      try {
        // Buscar redações sem orderBy para evitar problemas de índice
        const q = query(
          collection(db, 'redacoes'),
          where('usuarioId', '==', usuarioAtual.uid)
        );
        const querySnapshot = await getDocs(q);
        const redacoesData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          
          // Processar tema com fallbacks robustos
          let temaProcessado = data.tema;
          
          if (!temaProcessado) {
            temaProcessado = { 
              titulo: 'Tema não especificado', 
              id: data.temaId || 'unknown',
              descricao: 'Tema não especificado'
            };
          } else if (typeof temaProcessado === 'string') {
            temaProcessado = { 
              titulo: temaProcessado, 
              id: data.temaId || 'unknown',
              descricao: temaProcessado
            };
          } else if (typeof temaProcessado === 'object') {
            if (!temaProcessado.titulo) {
              temaProcessado = {
                ...temaProcessado,
                titulo: temaProcessado.descricao || temaProcessado.nome || 'Tema não especificado'
              };
            }
          }
          
          return {
            id: doc.id,
            ...data,
            tema: temaProcessado,
            pontuacaoTotal: data.pontuacaoTotal || (data.avaliacao && data.avaliacao.pontuacaoTotal) || 0,
            criadoEm: data.criadoEm || new Date()
          };
        });
        
        // Ordenar no cliente por data (mais recente primeiro)
        redacoesData.sort((a, b) => {
          const dateA = a.criadoEm?.toDate ? a.criadoEm.toDate() : new Date(a.criadoEm);
          const dateB = b.criadoEm?.toDate ? b.criadoEm.toDate() : new Date(b.criadoEm);
          return dateB - dateA;
        });
        
        setRedacoes(redacoesData);
      } catch (error) {
        console.error('Erro ao buscar redações:', error);
        setError('Não foi possível carregar suas redações. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (usuarioAtual) {
      fetchRedacoes();
    }
  }, [usuarioAtual]);

  // Função para filtrar redações baseado no tipo de avaliação
  const filtrarRedacoes = (redacoes) => {
    switch (filtroAvaliacao) {
      case 'completas':
        return redacoes.filter(redacao => 
          redacao.avaliacao?.competencias && redacao.avaliacao.competencias.length > 0
        );
      case 'basicas':
        return redacoes.filter(redacao => 
          (redacao.avaliacao?.pontuacao || redacao.avaliacao?.analise) && 
          (!redacao.avaliacao?.competencias || redacao.avaliacao.competencias.length === 0)
        );
      case 'sem-avaliacao':
        return redacoes.filter(redacao => 
          !redacao.avaliacao?.competencias && 
          !redacao.avaliacao?.pontuacao && 
          !redacao.avaliacao?.analise
        );
      default:
        return redacoes;
    }
  };

  const redacoesFiltradas = filtrarRedacoes(redacoes);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Minhas Redações</h1>

        {/* Filtros */}
        {!loading && redacoes.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setFiltroAvaliacao('todas')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroAvaliacao === 'todas'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Todas ({redacoes.length})
            </button>
            <button
              onClick={() => setFiltroAvaliacao('completas')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroAvaliacao === 'completas'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Completas ({redacoes.filter(r => r.avaliacao?.competencias?.length > 0).length})
            </button>
            <button
              onClick={() => setFiltroAvaliacao('basicas')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroAvaliacao === 'basicas'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Básicas ({redacoes.filter(r => (r.avaliacao?.pontuacao || r.avaliacao?.analise) && (!r.avaliacao?.competencias || r.avaliacao.competencias.length === 0)).length})
            </button>
            <button
              onClick={() => setFiltroAvaliacao('sem-avaliacao')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroAvaliacao === 'sem-avaliacao'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Sem Análise ({redacoes.filter(r => !r.avaliacao?.competencias && !r.avaliacao?.pontuacao && !r.avaliacao?.analise).length})
            </button>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            <span className="ml-4 text-gray-700">Carregando...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && redacoes.length === 0 && (
          <p className="text-center text-gray-700">Você ainda não escreveu nenhuma redação.</p>
        )}

        {!loading && !error && redacoesFiltradas.length === 0 && redacoes.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-700 mb-4">Nenhuma redação encontrada com o filtro selecionado.</p>
            <button
              onClick={() => setFiltroAvaliacao('todas')}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Ver Todas as Redações
            </button>
          </div>
        )}

        {!loading && !error && redacoesFiltradas.length > 0 && (
          <div className="space-y-6">
            {redacoesFiltradas.map((redacao) => {
              const avaliacao = redacao.avaliacao || {};

              return (
                <div key={redacao.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-4">
                    <Avatar
                      src={redacao.fotoURL}
                      name={redacao.nome}
                      size="50"
                      round={true}
                      className="mr-3"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{redacao.nome || 'Desconhecido'}</h2>
                      <p className="text-gray-600 text-sm">
                        {redacao.criadoEm &&
                          redacao.criadoEm.toDate().toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Tema:</h3>
                    <p className="text-primary-600 font-medium mb-3">
                      {redacao.tema?.titulo || 'Tema não especificado'}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Redação:</h3>
                    <p className="text-gray-800 whitespace-pre-wrap">
                      {redacao.texto || 'Texto da redação não disponível.'}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Avaliação:</h3>
                    {avaliacao.competencias && avaliacao.competencias.length > 0 ? (
                      <div className="space-y-4">
                        {avaliacao.competencias.map((competencia) => (
                          <div key={competencia.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900">
                                Competência {competencia.id}
                              </h4>
                              <span className="text-lg font-bold text-primary-600">
                                {competencia.nota || 'N/A'}/200
                              </span>
                            </div>
                            
                            <p className="text-gray-700 mb-3">
                              {competencia.descricao || 'Comentário não disponível.'}
                            </p>

                            {/* Pontos Fortes */}
                            {competencia.pontosFortes && competencia.pontosFortes.length > 0 && (
                              <div className="mb-3 p-2 bg-green-50 rounded border border-green-200">
                                <h5 className="text-sm font-semibold text-green-700 mb-1">Pontos Fortes:</h5>
                                <ul className="text-sm text-green-700 space-y-1">
                                  {competencia.pontosFortes.map((ponto, idx) => (
                                    <li key={idx} className="flex items-start space-x-1">
                                      <span className="text-green-500">•</span>
                                      <span>{ponto}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Áreas de Melhoria */}
                            {competencia.areasMelhoria && competencia.areasMelhoria.length > 0 && (
                              <div className="mb-3 p-2 bg-orange-50 rounded border border-orange-200">
                                <h5 className="text-sm font-semibold text-orange-700 mb-1">Áreas para Melhoria:</h5>
                                <ul className="text-sm text-orange-700 space-y-1">
                                  {competencia.areasMelhoria.map((area, idx) => (
                                    <li key={idx} className="flex items-start space-x-1">
                                      <span className="text-orange-500">•</span>
                                      <span>{area}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Sugestões */}
                            {competencia.sugestoes && competencia.sugestoes.length > 0 && (
                              <div className="p-2 bg-blue-50 rounded border border-blue-200">
                                <h5 className="text-sm font-semibold text-blue-700 mb-1">Sugestões:</h5>
                                <ul className="text-sm text-blue-700 space-y-1">
                                  {competencia.sugestoes.map((sugestao, idx) => (
                                    <li key={idx} className="flex items-start space-x-1">
                                      <span className="text-blue-500">•</span>
                                      <span>{sugestao}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* Comentários Gerais */}
                        {avaliacao.comentariosGerais && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">Comentários Gerais:</h4>
                            <p className="text-gray-700">{avaliacao.comentariosGerais}</p>
                          </div>
                        )}
                      </div>
                    ) : avaliacao.pontuacao ? (
                      // Formato antigo com pontuação por competência
                      <div className="space-y-3">
                        {Object.entries(avaliacao.pontuacao).map(([key, pontos]) => {
                          const competenciaId = key.replace('competencia', '');
                          return (
                            <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium">Competência {competenciaId}:</span>
                              <span className="font-bold text-primary-600">{pontos}/200</span>
                            </div>
                          );
                        })}
                        {avaliacao.comentariosGerais && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">Comentários Gerais:</h4>
                            <p className="text-gray-700">{avaliacao.comentariosGerais}</p>
                          </div>
                        )}
                      </div>
                    ) : avaliacao.analise ? (
                      // Formato com análise simples
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">Análise:</h4>
                          <p className="text-gray-700">{avaliacao.analise}</p>
                        </div>
                        {avaliacao.sugestoes && (
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-700 mb-2">Sugestões:</h4>
                            <ul className="text-blue-700 space-y-1">
                              {avaliacao.sugestoes.map((sugestao, idx) => (
                                <li key={idx} className="flex items-start space-x-1">
                                  <span className="text-blue-500">•</span>
                                  <span>{sugestao}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-yellow-800">
                          <strong>Avaliação não disponível.</strong> Esta redação ainda não foi analisada ou a análise não está disponível.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      {avaliacao.competencias && avaliacao.competencias.length > 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ Avaliação Completa
                        </span>
                      ) : avaliacao.pontuacao || avaliacao.analise ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          ⚠ Avaliação Básica
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          ⏳ Aguardando Análise
                        </span>
                      )}
                      <button
                        onClick={() => setRedacaoAnalisando(redacao)}
                        className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-200 transition-colors"
                      >
                        🔍 Análise Detalhada
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-600">
                        Pontuação Total: {redacao.pontuacaoTotal || avaliacao.pontuacaoTotal || 'N/A'}
                      </p>
                      {redacao.pontuacaoTotal && (
                        <p className="text-sm text-gray-500">
                          {((redacao.pontuacaoTotal / 1000) * 100).toFixed(1)}% da nota máxima
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de Análise Detalhada */}
      {redacaoAnalisando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full h-full max-w-7xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                Análise Detalhada - {redacaoAnalisando.tema?.titulo || 'Tema não especificado'}
              </h2>
              <button
                onClick={() => setRedacaoAnalisando(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="h-full overflow-hidden">
              <RedacaoAnalyzer 
                redacao={redacaoAnalisando.texto}
                analise={redacaoAnalisando.avaliacao}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MinhasRedacoes;
