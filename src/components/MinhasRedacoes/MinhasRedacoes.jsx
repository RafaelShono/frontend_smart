// src/components/MinhasRedacoes.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import Avatar from 'react-avatar';

function MinhasRedacoes() {
  const [redacoes, setRedacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { usuarioAtual } = useAuth();

  useEffect(() => {
    const fetchRedacoes = async () => {
      setLoading(true);
      setError('');
      try {
        const q = query(
          collection(db, 'redacoes'),
          where('usuarioId', '==', usuarioAtual.uid),
          orderBy('criadoEm', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const redacoesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Minhas Redações</h1>

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

        {!loading && !error && redacoes.length > 0 && (
          <div className="space-y-6">
            {redacoes.map((redacao) => {
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
                    <h3 className="text-lg font-semibold mb-2">Redação:</h3>
                    <p className="text-gray-800 whitespace-pre-wrap">
                      {redacao.texto || 'Texto da redação não disponível.'}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Avaliação:</h3>
                    {avaliacao.competencias ? (
                      <ul className="list-disc list-inside text-gray-700 space-y-4">
                        {avaliacao.competencias.map((competencia) => (
                          <li key={competencia.id}>
                            <p>
                              <span className="font-semibold">
                                {competencia.id}. {competencia.descricao || 'Comentário não disponível.'}
                              </span>
                            </p>
                            <p>
                              <span className="font-semibold">Nota:</span> {competencia.nota || 'N/A'}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">Avaliação não disponível.</p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold">
                      Pontuação Total: {avaliacao.pontuacaoTotal || 'N/A'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MinhasRedacoes;
