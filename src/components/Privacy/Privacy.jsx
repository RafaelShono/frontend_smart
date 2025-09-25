import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Política de Privacidade
          </h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introdução</h2>
              <p>
                A Redação Smart respeita sua privacidade e está comprometida em proteger 
                suas informações pessoais. Esta Política de Privacidade descreve como 
                coletamos, usamos, armazenamos e protegemos suas informações.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Informações que Coletamos</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Data de nascimento</li>
                <li>Informações de pagamento (processadas pelo Stripe)</li>
                <li>Redações enviadas para correção</li>
                <li>Dados de navegação e interação</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Como Usamos suas Informações</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Fornecer e melhorar nossos serviços de correção de redação</li>
                <li>Processar pagamentos e gerenciar assinaturas</li>
                <li>Comunicar-nos com você sobre atualizações e suporte</li>
                <li>Personalizar sua experiência na plataforma</li>
                <li>Analisar o uso da plataforma para melhorias</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Compartilhamento de Informações</h2>
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com 
                terceiros, exceto com provedores de serviços (Stripe para pagamentos, 
                Firebase para autenticação) ou quando exigido por lei.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Segurança dos Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais apropriadas 
                para proteger suas informações contra acesso não autorizado, alteração, 
                divulgação ou destruição.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Seus Direitos</h2>
              <p>
                Você tem o direito de acessar, corrigir, excluir suas informações pessoais 
                e retirar seu consentimento a qualquer momento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Contato</h2>
              <p>
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato:
              </p>
              <div className="mt-2 p-4 bg-blue-50 rounded">
                <p><strong>E-mail:</strong> privacidade@redacaosmart.com.br</p>
                <p><strong>Telefone:</strong> (44) 99887-9523</p>
              </div>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;