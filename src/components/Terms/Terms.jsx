import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Termos de Serviço
          </h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Aceitação dos Termos</h2>
              <p>
                Ao utilizar os serviços da Redação Smart, você concorda em cumprir e estar 
                vinculado a estes Termos de Serviço. Se você não concordar com qualquer 
                parte destes termos, não deve utilizar nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Descrição do Serviço</h2>
              <p>
                A Redação Smart oferece serviços de correção de redação utilizando 
                inteligência artificial, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Correção automática de redações</li>
                <li>Feedback detalhado e personalizado</li>
                <li>Análise de competências e habilidades</li>
                <li>Relatórios de progresso</li>
                <li>Plataforma de prática e estudo</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Planos e Pagamentos</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold">Planos Disponíveis:</h3>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li><strong>5 Redações:</strong> R$ 14,99/mês - 5 correções por mês</li>
                    <li><strong>10 Redações:</strong> R$ 24,99/mês - 10 correções por mês</li>
                    <li><strong>Ilimitado:</strong> R$ 54,99/mês - Correções ilimitadas</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Termos de Pagamento:</h3>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Pagamentos são processados mensalmente via Stripe</li>
                    <li>Cancelamento pode ser feito a qualquer momento</li>
                    <li>Reembolsos seguem nossa política de reembolso</li>
                    <li>Preços podem ser alterados com aviso prévio de 30 dias</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Limitações de Uso</h2>
              <p>Você concorda em não:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Usar o serviço para atividades ilegais ou não autorizadas</li>
                <li>Tentar acessar contas de outros usuários</li>
                <li>Interferir com o funcionamento da plataforma</li>
                <li>Enviar conteúdo ofensivo, difamatório ou inadequado</li>
                <li>Usar bots ou scripts automatizados</li>
                <li>Violar direitos de propriedade intelectual</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Propriedade Intelectual</h2>
              <p>
                Você mantém a propriedade de suas redações. Ao utilizar nossos serviços, 
                você nos concede uma licença limitada para processar, analisar e corrigir 
                suas redações exclusivamente para fornecer o serviço contratado.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Limitação de Responsabilidade</h2>
              <p>
                Nossos serviços são fornecidos "como estão". Não garantimos que as 
                correções sejam perfeitas ou que resultem em melhorias específicas em 
                suas notas. Nossa responsabilidade é limitada ao valor pago pelos 
                serviços no mês em questão.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Modificações dos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                Alterações significativas serão comunicadas com 30 dias de antecedência. 
                O uso continuado dos serviços após as modificações constitui aceitação 
                dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contato</h2>
              <p>
                Para questões relacionadas a estes Termos de Serviço, entre em contato:
              </p>
              <div className="mt-2 p-4 bg-blue-50 rounded">
                <p><strong>E-mail:</strong> legal@redacaosmart.com.br</p>
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

export default TermsOfService;