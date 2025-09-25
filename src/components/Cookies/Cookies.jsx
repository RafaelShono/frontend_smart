import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCookie, FaCheck, FaTimes, FaCog, FaInfoCircle } from 'react-icons/fa';

const Cookies = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Sempre necessário
    analytics: false,
    marketing: false,
    preferences: false
  });

  const [showPreferences, setShowPreferences] = useState(false);

  const handleCookieChange = (type) => {
    if (type === 'necessary') return; // Não pode ser desabilitado
    
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const acceptAll = () => {
    setCookiePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    });
    // Aqui você salvaria as preferências
    alert('Preferências de cookies salvas!');
  };

  const acceptSelected = () => {
    // Aqui você salvaria as preferências selecionadas
    alert('Preferências de cookies salvas!');
  };

  const rejectAll = () => {
    setCookiePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    });
    // Aqui você salvaria as preferências
    alert('Cookies desnecessários rejeitados!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
              <FaCookie className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Política de Cookies
          </h1>
          <p className="text-xl text-gray-600">
            Entenda como usamos cookies para melhorar sua experiência
          </p>
        </div>

        {/* Cookie Banner */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start">
            <FaInfoCircle className="text-blue-600 text-2xl mr-4 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Gerenciar Preferências de Cookies
              </h2>
              <p className="text-gray-700 mb-6">
                Usamos cookies para personalizar conteúdo e anúncios, fornecer recursos de mídia social 
                e analisar nosso tráfego. Você pode escolher quais tipos de cookies aceitar.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={acceptAll}
                  className="flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaCheck className="mr-2" />
                  Aceitar Todos
                </button>
                
                <button
                  onClick={() => setShowPreferences(!showPreferences)}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaCog className="mr-2" />
                  Personalizar
                </button>
                
                <button
                  onClick={rejectAll}
                  className="flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  <FaTimes className="mr-2" />
                  Rejeitar Todos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cookie Preferences */}
        {showPreferences && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Configurações de Cookies
            </h2>
            
            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Cookies Necessários
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Essenciais para o funcionamento básico do site
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-3">Sempre ativo</span>
                    <div className="w-12 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Estes cookies são necessários para o funcionamento básico do site e não podem ser desativados. 
                  Incluem cookies de autenticação, segurança e funcionalidades essenciais.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Cookies de Análise
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Nos ajudam a entender como você usa o site
                    </p>
                  </div>
                  <button
                    onClick={() => handleCookieChange('analytics')}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      cookiePreferences.analytics ? 'bg-green-600 justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
                <p className="text-gray-700 text-sm">
                  Estes cookies coletam informações sobre como você usa nosso site, como páginas visitadas 
                  e tempo gasto. Isso nos ajuda a melhorar a experiência do usuário.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Cookies de Marketing
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Usados para personalizar anúncios e conteúdo
                    </p>
                  </div>
                  <button
                    onClick={() => handleCookieChange('marketing')}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      cookiePreferences.marketing ? 'bg-green-600 justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
                <p className="text-gray-700 text-sm">
                  Estes cookies são usados para personalizar anúncios e conteúdo baseado em seus interesses. 
                  Podem ser definidos por nós ou por terceiros.
                </p>
              </div>

              {/* Preferences Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Cookies de Preferências
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Lembram suas configurações e preferências
                    </p>
                  </div>
                  <button
                    onClick={() => handleCookieChange('preferences')}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      cookiePreferences.preferences ? 'bg-green-600 justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
                <p className="text-gray-700 text-sm">
                  Estes cookies lembram suas preferências, como idioma, tema e configurações personalizadas, 
                  para proporcionar uma experiência mais personalizada.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={acceptSelected}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Salvar Preferências
              </button>
            </div>
          </div>
        )}

        {/* Detailed Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Informações Detalhadas sobre Cookies
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">O que são Cookies?</h3>
              <p className="text-gray-700">
                Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. 
                Eles são amplamente usados para fazer os sites funcionarem de forma mais eficiente e fornecer 
                informações aos proprietários do site.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Como Usamos Cookies</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Para manter você logado em sua conta</li>
                <li>Para lembrar suas preferências e configurações</li>
                <li>Para analisar como você usa nosso site</li>
                <li>Para personalizar conteúdo e anúncios</li>
                <li>Para melhorar a segurança do site</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Gerenciando Cookies</h3>
              <p className="text-gray-700 mb-4">
                Você pode controlar e/ou deletar cookies como desejar. Você pode deletar todos os cookies 
                que já estão no seu computador e pode configurar a maioria dos navegadores para impedir 
                que sejam colocados.
              </p>
              <p className="text-gray-700">
                <strong>Importante:</strong> Se você desabilitar cookies, algumas funcionalidades do site 
                podem não funcionar corretamente.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookies de Terceiros</h3>
              <p className="text-gray-700">
                Nosso site pode conter cookies de terceiros, como Google Analytics, Facebook Pixel e outros 
                serviços de análise. Estes cookies são controlados pelos respectivos provedores de serviços 
                e estão sujeitos às suas próprias políticas de privacidade.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Dúvidas sobre Cookies?
          </h2>
          <p className="text-gray-700 mb-6">
            Se você tiver dúvidas sobre nossa política de cookies ou como gerenciar suas preferências, 
            entre em contato conosco:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Contato</h3>
              <div className="space-y-2 text-gray-700">
                <div><strong>E-mail:</strong> privacidade@redacaosmart.com.br</div>
                <div><strong>Telefone:</strong> (44) 99887-9523</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Links Úteis</h3>
              <div className="space-y-2">
                <Link to="/privacidade" className="block text-blue-600 hover:text-blue-700">
                  Política de Privacidade
                </Link>
                <Link to="/termos" className="block text-blue-600 hover:text-blue-700">
                  Termos de Serviço
                </Link>
                <Link to="/suporte" className="block text-blue-600 hover:text-blue-700">
                  Central de Suporte
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
