// src/components/ContatoPage.jsx

import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

function ContatoPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleEnviarForm = async (e) => {
    e.preventDefault();

    // Validação simples
    if (!nome || !email || !mensagem) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Integração com backend ou serviço de email
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/enviar-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, mensagem }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar a mensagem.');
      }

      // Simulação de sucesso
      setEnviado(true);
      setNome('');
      setEmail('');
      setMensagem('');
      setError('');
    } catch (err) {
      console.error('Erro ao enviar a mensagem:', err);
      setError('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">Fale Conosco</h1>
        <p className="text-gray-700 text-center mb-6">
          Estamos aqui para ajudar! Envie-nos uma mensagem ou entre em contato diretamente via WhatsApp ou email.
        </p>

        {/* Opções rápidas de contato */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
          <a
            href="https://wa.me/5588999999999" // Substitua pelo seu número do WhatsApp com DDI e DDD
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
          >
            <FaWhatsapp className="mr-2" /> WhatsApp
          </a>
          <a
            href="mailto:contato@seudominio.com.br" // Substitua pelo seu email
            className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
          >
            <FaEnvelope className="mr-2" /> Enviar Email
          </a>
        </div>

        {/* Formulário de contato */}
        <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">Ou envie-nos uma mensagem:</h2>
        {enviado ? (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-4 flex items-center justify-center">
            <FaCheckCircle className="mr-2" /> Mensagem enviada com sucesso! Retornaremos em breve.
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg flex items-center">
                <FaExclamationTriangle className="mr-2" /> {error}
              </div>
            )}
            <form onSubmit={handleEnviarForm} className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="mensagem" className="block text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  className="w-full border border-gray-300 px-3 py-2 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
              >
                Enviar Mensagem
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ContatoPage;
