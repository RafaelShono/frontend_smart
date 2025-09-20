// src/components/PlanoPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import Modal from '../Modal/modal';
import { loadStripe } from '@stripe/stripe-js';
import STRIPE_CONFIG from '../../config/stripe';

// Carrega a chave pública do Stripe baseada no ambiente
const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);
console.log('AMBIENTE:', STRIPE_CONFIG.isDevelopment ? 'DESENVOLVIMENTO' : 'PRODUÇÃO');
console.log('CHAVE STRIPE:', STRIPE_CONFIG.publishableKey.substring(0, 20) + '...');
console.log('TIPO DE CHAVE:', STRIPE_CONFIG.publishableKey.startsWith('pk_test_') ? 'TESTE' : 'LIVE');
function PlanoPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingStripe, setLoadingStripe] = useState(false);
  const [error, setError] = useState('');

  // Ajuste: Assumindo que você tem o userId do usuário logado. Caso contrário, use um placeholder.
  const userId = 'exemploUser123';

  const handlePagamento = async (dadosPlano) => {
    setLoadingStripe(true);
    setError('');
    try {
      const stripe = await stripePromise;
      console.log('AMBIENTE:', STRIPE_CONFIG.isDevelopment ? 'DESENVOLVIMENTO' : 'PRODUÇÃO');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-checkout-session`, {
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-blue-200">
      {/* Cabeçalho da Página */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">Escolha o Plano Ideal para Você</h1>
        <p className="mt-4 text-lg text-gray-700">
          Faça o upgrade para desbloquear funcionalidades exclusivas e continue enviando suas redações.
        </p>
        <button
          onClick={abrirModal}
          className="mt-2 text-blue-500 hover:underline flex items-center justify-center mx-auto"
        >
          <FaInfoCircle className="mr-2" />
          Termos e Condições
        </button>
      </div>

      {/* Mensagens de erro */}
      {error && (
        <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Planos Disponíveis */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* 5 Redações Avulso - R$25 */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">5 Redações (Avulso)</h3>
          <p className="text-gray-600 mb-6">Receba correções detalhadas e feedback personalizado em 5 redações.</p>
          <div className="mb-6">
            <span className="text-3xl font-bold text-blue-700">R$25,00</span>
            <span className="text-gray-500"> Avulso</span>
          </div>
          <ul className="text-left mb-6 space-y-2">
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              Correção detalhada para cada redação
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              Feedback personalizado
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              Pagamento único
            </li>
          </ul>
          <button
            onClick={() => handlePagamento({ plano: '5_redacoes' })}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loadingStripe}
          >
            {loadingStripe ? 'Processando...' : 'Comprar por R$25,00'}
          </button>
        </div>

        {/* 10 Redações Mensais - R$50/mês */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">10 Redações Mensais</h3>
          <p className="text-gray-600 mb-6">Aproveite 10 correções por mês, garantindo uma evolução constante.</p>
          <div className="mb-6">
            <span className="text-3xl font-bold text-blue-700">R$50,00</span>
            <span className="text-gray-500">/mês</span>
          </div>
          <ul className="text-left mb-6 space-y-2">
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              10 correções todo mês
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              Atualizações e melhorias contínuas
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              Cancelamento a qualquer momento
            </li>
          </ul>
          <button
            onClick={() => handlePagamento({ plano: '10_redacoes' })}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loadingStripe}
          >
            {loadingStripe ? 'Processando...' : 'Assinar por R$50,00/mês'}
          </button>
        </div>

        {/* Anual Ilimitado - R$360/ano */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105 relative">
          <div className="absolute -top-4 right-4 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
            Mais Popular
          </div>

          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Anual Ilimitado</h3>
          <p className="text-gray-600 mb-6">Acesso ilimitado durante um ano inteiro, máxima liberdade para evoluir.</p>
          <div className="mb-6">
            <span className="text-3xl font-bold text-blue-700">R$360,00</span>
            <span className="text-gray-500">/ano</span>
          </div>
          <ul className="text-left mb-6 space-y-2">
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              Correções ilimitadas
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              Suporte prioritário
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              Economia de longo prazo
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              Atualizações anuais incluídas
            </li>
          </ul>
          <button
            onClick={() => handlePagamento({ plano: 'anual' })}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loadingStripe}
          >
            {loadingStripe ? 'Processando...' : 'Assinar por R$360,00/ano'}
          </button>
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
            <li><strong>5 Redações (Avulso):</strong> R$25,00</li>
            <li><strong>10 Redações Mensais:</strong> R$50,00/mês</li>
            <li><strong>Anual Ilimitado:</strong> R$360,00/ano</li>
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
