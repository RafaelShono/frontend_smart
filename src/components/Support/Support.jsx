import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeadset, FaWhatsapp, FaEnvelope, FaClock, FaQuestionCircle } from 'react-icons/fa';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aqui você pode implementar o envio do formulário
    console.log('Formulário enviado:', formData);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <FaHeadset className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Central de Suporte
          </h1>
          <p className="text-xl text-gray-600">
            Estamos aqui para ajudar você a ter a melhor experiência possível
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulário de Contato */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Envie sua Mensagem
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assunto
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="problema-tecnico">Problema Técnico</option>
                  <option value="duvida-pagamento">Dúvida sobre Pagamento</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="reclamacao">Reclamação</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descreva sua dúvida ou problema..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-6">
            {/* WhatsApp */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <FaWhatsapp className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">WhatsApp</h3>
                  <p className="text-gray-600">Resposta rápida</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Fale conosco diretamente pelo WhatsApp para suporte imediato.
              </p>
              <a
                href="https://wa.me/5544998879523"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaWhatsapp className="mr-2" />
                Abrir WhatsApp
              </a>
            </div>

            {/* E-mail */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">E-mail</h3>
                  <p className="text-gray-600">Resposta em até 24h</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Envie um e-mail detalhado e receba uma resposta completa.
              </p>
              <a
                href="mailto:suporte@redacaosmart.com.br"
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaEnvelope className="mr-2" />
                Enviar E-mail
              </a>
            </div>

            {/* Horário de Atendimento */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <FaClock className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Horário de Atendimento</h3>
                  <p className="text-gray-600">Segunda a Sexta</p>
                </div>
              </div>
              <div className="text-gray-700">
                <p><strong>WhatsApp:</strong> 8h às 18h</p>
                <p><strong>E-mail:</strong> 24h (resposta em até 24h)</p>
                <p><strong>Finais de semana:</strong> Apenas e-mail</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Rápido */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FaQuestionCircle className="mr-3 text-blue-600" />
            Perguntas Frequentes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Como funciona a correção de redações?
              </h3>
              <p className="text-gray-600 text-sm">
                Nossa IA analisa sua redação e fornece feedback detalhado sobre competências, 
                gramática e estrutura.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Posso cancelar minha assinatura?
              </h3>
              <p className="text-gray-600 text-sm">
                Sim, você pode cancelar a qualquer momento. Não há taxas de cancelamento.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Quanto tempo demora para receber a correção?
              </h3>
              <p className="text-gray-600 text-sm">
                A correção é instantânea! Você recebe o resultado em segundos.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Posso usar em qualquer dispositivo?
              </h3>
              <p className="text-gray-600 text-sm">
                Sim, nossa plataforma funciona em computadores, tablets e smartphones.
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link
              to="/faq"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Ver todas as perguntas frequentes →
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Support;
