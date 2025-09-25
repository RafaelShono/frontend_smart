import React from 'react';
import { Link } from 'react-router-dom';
import { FaGavel, FaFileContract, FaShieldAlt, FaBalanceScale } from 'react-icons/fa';

const Legal = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <FaGavel className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Informações Legais
          </h1>
          <p className="text-xl text-gray-600">
            Documentos legais e informações sobre nossa empresa
          </p>
        </div>

        {/* Legal Documents Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Termos de Serviço */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <FaFileContract className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Termos de Serviço</h2>
                <p className="text-gray-600">Condições de uso da plataforma</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Nossos termos de serviço definem as regras e condições para o uso da 
              Redação Smart, incluindo direitos, responsabilidades e limitações.
            </p>
            <Link
              to="/termos"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ler Termos de Serviço
            </Link>
          </div>

          {/* Política de Privacidade */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Política de Privacidade</h2>
                <p className="text-gray-600">Como protegemos seus dados</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Nossa política de privacidade explica como coletamos, usamos, 
              armazenamos e protegemos suas informações pessoais.
            </p>
            <Link
              to="/privacidade"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Ler Política de Privacidade
            </Link>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
              <FaBalanceScale className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Informações da Empresa</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dados da Empresa</h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <strong>Razão Social:</strong> Redação Smart Ltda
                </div>
                <div>
                  <strong>CNPJ:</strong> 00.000.000/0001-00
                </div>
                <div>
                  <strong>Endereço:</strong> Rua das Redações, 123<br />
                  Centro - Maringá/PR - CEP: 87000-000
                </div>
                <div>
                  <strong>Telefone:</strong> (44) 99887-9523
                </div>
                <div>
                  <strong>E-mail:</strong> contato@redacaosmart.com.br
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Legais</h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <strong>Registro:</strong> Registrada na Junta Comercial do Paraná
                </div>
                <div>
                  <strong>Atividade:</strong> Desenvolvimento de software educacional
                </div>
                <div>
                  <strong>Fundada em:</strong> 2024
                </div>
                <div>
                  <strong>Capital Social:</strong> R$ 100.000,00
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Compliance */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Conformidade Legal</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Lei Geral de Proteção de Dados (LGPD)</h3>
              <p className="text-gray-700">
                Cumprimos rigorosamente a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), 
                garantindo que seus dados pessoais sejam tratados de forma segura e transparente.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Marco Civil da Internet</h3>
              <p className="text-gray-700">
                Respeitamos o Marco Civil da Internet (Lei nº 12.965/2014), garantindo 
                neutralidade da rede e proteção dos direitos dos usuários.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Código de Defesa do Consumidor</h3>
              <p className="text-gray-700">
                Seguimos todas as diretrizes do Código de Defesa do Consumidor (Lei nº 8.078/1990), 
                garantindo seus direitos como consumidor.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contato Legal</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Para Questões Legais</h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <strong>E-mail:</strong> legal@redacaosmart.com.br
                </div>
                <div>
                  <strong>Telefone:</strong> (44) 99887-9523
                </div>
                <div>
                  <strong>Horário:</strong> Segunda a Sexta, 8h às 18h
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Para Notificações Legais</h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <strong>E-mail:</strong> notificacoes@redacaosmart.com.br
                </div>
                <div>
                  <strong>Endereço:</strong> Rua das Redações, 123<br />
                  Centro - Maringá/PR - CEP: 87000-000
                </div>
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

export default Legal;
