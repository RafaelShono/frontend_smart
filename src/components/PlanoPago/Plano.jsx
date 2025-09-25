// src/components/PlanoPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import Modal from '../Modal/modal';
import { loadStripe } from '@stripe/stripe-js';
import STRIPE_CONFIG from '../../config/stripe';
import { useAuth } from '../context/AuthContext';

// Carrega a chave pública do Stripe baseada no ambiente
const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);
// Configuração do Stripe carregada
// Chave Stripe configurada
function PlanoPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingStripe, setLoadingStripe] = useState(false);
  const [error, setError] = useState('');

  // Obter userId do usuário logado
  const { usuarioAtual } = useAuth();
  const userId = usuarioAtual?.uid;

  const handlePagamento = async (dadosPlano) => {
    setLoadingStripe(true);
    setError('');
    try {
      const stripe = await stripePromise;
      const backendUrl = import.meta.env.VITE_BACKEND_URL || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:5001' : 'https://backend-smart-ys4l.onrender.com');
      const response = await fetch(`${backendUrl}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        // Envia o plano selecionado e o userId para o backend
        body: JSON.stringify({ plano: dadosPlano.plano, userId: userId }),
      });

      if (!response.ok) {
        throw new Error('Falha na criação da sessão de checkout');
      }

      const session = await response.json();

      // Redireciona para o checkout do Stripe
      const result = await stripe.redirectToCheckout({ sessionId: session.sessionId });
      if (result.error) {
        console.error(result.error.message);
        setError(result.error.message);
      }
    } catch (error) {
      console.error('Erro ao processar o pagamento:', error);
      setError('Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.');
    } finally {
      setLoadingStripe(false);
    }
  };

  const abrirModal = () => setIsModalOpen(true);
  const fecharModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Cabeçalho da Página */}
        <div className="text-center mb-12 max-w-4xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
            Escolha o Plano Ideal
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Desbloqueie todo o potencial da sua redação com correções detalhadas e feedback personalizado
          </p>
          <button
            onClick={abrirModal}
            className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-blue-600 hover:text-blue-700 hover:bg-white/90 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-200/50"
          >
            <FaInfoCircle className="mr-2" />
            Termos e Condições
          </button>
        </div>

        {/* Mensagens de erro */}
        {error && (
          <div className="mb-6 px-6 py-4 bg-red-50 border border-red-200 text-red-700 rounded-xl shadow-lg backdrop-blur-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Planos Disponíveis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">

          {/* 5 Redações Avulso - R$25 */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Mais Popular</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3">5 Redações</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Perfeito para quem quer testar o serviço ou tem poucas redações para corrigir.</p>
              
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-800">R$14</span>
                  <span className="text-lg text-gray-500 ml-1">,99</span>
                  <span className="text-sm text-gray-500 ml-2">/mês</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">R$ 3,00 por redação</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-gray-700">Correção detalhada com IA avançada</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-gray-700">Feedback personalizado e construtivo</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-gray-700">Cancelamento a qualquer momento</span>
                </li>
              </ul>
              
              <button
                onClick={() => handlePagamento({ plano: '5_redacoes' })}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                disabled={loadingStripe}
              >
                {loadingStripe ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Processando...
                  </div>
                ) : (
                  'Assinar por R$14,99/mês'
                )}
              </button>
            </div>
          </div>

          {/* 10 Redações Mensais - R$50/mês */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">Recomendado</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3">10 Redações Mensais</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Ideal para estudantes que praticam regularmente e querem evolução constante.</p>
              
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-800">R$24</span>
                  <span className="text-lg text-gray-500 ml-1">,99</span>
                  <span className="text-sm text-gray-500 ml-2">/mês</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">R$ 2,50 por redação</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-gray-700">10 correções detalhadas por mês</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-gray-700">Atualizações e melhorias contínuas</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-gray-700">Cancelamento a qualquer momento</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-gray-700">Suporte prioritário</span>
                </li>
              </ul>
              
              <button
                onClick={() => handlePagamento({ plano: '10_redacoes' })}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                disabled={loadingStripe}
              >
                {loadingStripe ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Processando...
                  </div>
                ) : (
                  'Assinar por R$24,99/mês'
                )}
              </button>
            </div>
          </div>

          {/* Anual Ilimitado - R$360/ano */}
          <div className="group relative bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl shadow-2xl hover:shadow-3xl p-8 transform hover:scale-105 transition-all duration-500 border-2 border-emerald-200/50">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-cyan-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-4 right-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Melhor Valor
              </span>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-xs text-emerald-600 font-medium bg-emerald-100 px-2 py-1 rounded-full">Economia de 40%</div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Redações Ilimitadas</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Para quem leva a sério e quer máxima liberdade para praticar sem limites.</p>
              
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-800">R$54</span>
                  <span className="text-lg text-gray-500 ml-1">,99</span>
                  <span className="text-sm text-gray-500 ml-2">/mês</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Correções ilimitadas por mês</p>
                <div className="mt-2 text-sm text-emerald-600 font-medium">
                  Melhor custo-benefício para uso intensivo
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-gray-700">Correções ilimitadas por mês</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-gray-700">Suporte prioritário 24/7</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-gray-700">Acesso antecipado a novas funcionalidades</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-gray-700">Relatórios de progresso mensais</span>
                </li>
              </ul>
              
              <button
                onClick={() => handlePagamento({ plano: 'ilimitado' })}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                disabled={loadingStripe}
              >
                {loadingStripe ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Processando...
                  </div>
                ) : (
                  'Assinar por R$54,99/mês'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Seção de Garantias e Benefícios */}
        <div className="mt-16 max-w-4xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Por que escolher a Redação Smart?</h2>
            <p className="text-lg text-gray-600">Tecnologia de ponta para sua evolução acadêmica</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">IA Avançada</h3>
              <p className="text-gray-600">Correções precisas usando inteligência artificial de última geração</p>
            </div>
            
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Resultados Rápidos</h3>
              <p className="text-gray-600">Receba suas correções em minutos, não em dias</p>
            </div>
            
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Evolução Garantida</h3>
              <p className="text-gray-600">Acompanhe seu progresso e melhore suas notas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Termos e Condições */}
      <Modal isOpen={isModalOpen} onClose={fecharModal} title="Termos e Condições">
        <div className="prose max-w-none">
          <h2>Termos e Condições</h2>
          {/* Conteúdo dos termos inalterado */}
          <h3>1. Aceitação dos Termos</h3>
          <p>
            Ao utilizar nosso serviço, você concorda em cumprir e estar vinculado aos seguintes Termos e Condições.
          </p>
          <h3>2. Descrição do Serviço</h3>
          <p>
            Oferecemos uma plataforma para envio e gerenciamento de redações, com planos de assinatura que proporcionam acesso ilimitado às funcionalidades.
          </p>
          <h3>3. Assinaturas e Pagamentos</h3>
          <h4>3.1 Planos Disponíveis</h4>
          <ul>
            <li><strong>5 Redações:</strong> R$14,99/mês</li>
            <li><strong>10 Redações Mensais:</strong> R$24,99/mês</li>
            <li><strong>Redações Ilimitadas:</strong> R$54,99/mês</li>
          </ul>
          <h4>3.2 Renovação Automática</h4>
          <p>
            As assinaturas (mensal e anual) são renovadas automaticamente ao final do período escolhido, a menos que você cancele antes da data de renovação.
          </p>
          <h4>3.3 Cancelamento</h4>
          <p>
            Você pode cancelar sua assinatura a qualquer momento através de sua conta. O cancelamento impedirá futuras renovações, mas não reembolsará o período já pago.
          </p>
          <h3>4. Uso Aceitável</h3>
          <p>
            Você concorda em usar a plataforma apenas para fins legais e de acordo com todas as leis aplicáveis.
          </p>
          <h3>5. Propriedade Intelectual</h3>
          <p>
            Todo o conteúdo e materiais fornecidos pela plataforma são de propriedade exclusiva da nossa empresa e protegidos por leis de direitos autorais.
          </p>
          <h3>6. Limitação de Responsabilidade</h3>
          <p>
            Não nos responsabilizamos por quaisquer danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou incapacidade de uso da plataforma.
          </p>
          <h3>7. Modificações nos Termos</h3>
          <p>
            Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação na plataforma.
          </p>
          <h3>8. Contato</h3>
          <p>
            Para quaisquer dúvidas ou questões sobre estes Termos, entre em contato conosco através do email: <a href="mailto:suporte@seudominio.com.br" className="text-blue-600 hover:underline">suporte@seudominio.com.br</a>
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default PlanoPage;
