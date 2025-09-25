// src/pages/SucessoPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight, FaPenFancy, FaSpinner, FaCrown, FaInfinity } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

function SucessoPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [planoInfo, setPlanoInfo] = useState(null);
  const { usuarioAtual } = useAuth();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verificarPlano = async () => {
      if (usuarioAtual && sessionId) {
        try {
          // Aguardar um pouco para o webhook processar
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const userDoc = await getDoc(doc(db, 'users', usuarioAtual.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setPlanoInfo({
              planoAtivo: userData.planoAtivo,
              planoAtual: userData.planoAtual,
              limiteRedacoes: userData.limiteRedacoes,
              redacoesUsadas: userData.redacoesUsadas || 0
            });
          }
        } catch (error) {
          console.error('Erro ao verificar plano:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    verificarPlano();
  }, [usuarioAtual, sessionId]);
  const getPlanoDisplay = (plano) => {
    switch (plano) {
      case '5_redacoes':
        return { nome: '5 Redações Mensais', icon: FaCrown, cor: 'text-blue-600' };
      case '10_redacoes':
        return { nome: '10 Redações Mensais', icon: FaCrown, cor: 'text-purple-600' };
      case 'ilimitado':
        return { nome: 'Redações Ilimitadas', icon: FaInfinity, cor: 'text-green-600' };
      default:
        return { nome: 'Plano Ativo', icon: FaCheckCircle, cor: 'text-green-600' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full text-center">
        {/* Ícone ou ilustração de sucesso */}
        <div className="text-6xl text-green-500 mb-4 mx-auto">
          <FaCheckCircle />
        </div>

        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Pagamento Realizado com Sucesso!
        </h1>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <FaSpinner className="animate-spin text-blue-600 text-2xl mr-3" />
            <span className="text-gray-600">Ativando seu plano...</span>
          </div>
        ) : planoInfo?.planoAtivo ? (
          <div className="mb-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center mb-2">
                {React.createElement(getPlanoDisplay(planoInfo.planoAtual).icon, {
                  className: `text-2xl ${getPlanoDisplay(planoInfo.planoAtual).cor} mr-2`
                })}
                <span className={`font-bold ${getPlanoDisplay(planoInfo.planoAtual).cor}`}>
                  {getPlanoDisplay(planoInfo.planoAtual).nome}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {planoInfo.limiteRedacoes === -1 
                  ? 'Redações ilimitadas por mês' 
                  : `${planoInfo.limiteRedacoes} redações por mês`
                }
              </p>
            </div>
            <p className="text-gray-600 mb-6">
              ✅ Seu plano foi ativado com sucesso! Agora você pode enviar suas redações e receber feedback detalhado.
            </p>
          </div>
        ) : (
          <p className="text-gray-600 mb-6">
            Agradecemos pela confiança. Seu pagamento foi processado e o plano será ativado em breve.
          </p>
        )}

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg inline-flex items-center justify-center transition-all shadow-md hover:shadow-lg"
          >
            <FaArrowRight className="mr-2" />
            Ir para o Painel
          </Link>
          <Link
            to="/praticar"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg inline-flex items-center justify-center transition-all shadow-md hover:shadow-lg"
          >
            <FaPenFancy className="mr-2" />
            Praticar Redação
          </Link>
        </div>

        {/* Informações adicionais */}
        {planoInfo?.planoAtivo && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">🎯 Próximos Passos:</h3>
            <ul className="text-sm text-blue-700 text-left space-y-1">
              <li>• Acesse o painel para ver seu progresso</li>
              <li>• Escolha um tema e comece a praticar</li>
              <li>• Receba feedback detalhado com marcação visual</li>
              <li>• Acompanhe sua evolução ao longo do tempo</li>
            </ul>
          </div>
        )}

        {/* Observações adicionais */}
        <div className="mt-6 text-sm text-gray-500">
          Caso tenha qualquer dúvida ou problema, entre em contato conosco em 
          {' '}
          <a
            href="mailto:suporte@redacaosmart.com.br"
            className="text-blue-600 underline hover:text-blue-800"
          >
            suporte@redacaosmart.com.br
          </a>.
        </div>
      </div>
    </div>
  );
}

export default SucessoPage;
