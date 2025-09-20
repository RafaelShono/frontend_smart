// src/pages/CanceladoPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFrown, FaWhatsapp, FaUndo } from 'react-icons/fa';

function CanceladoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col items-center justify-center p-6">
      {/* Container */}
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        {/* Ícone ou ilustração */}
        <div className="text-6xl text-red-500 mb-4 mx-auto">
          <FaFrown />
        </div>

        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Pagamento Cancelado
        </h1>
        <p className="text-gray-600 mb-6">
          Você optou por cancelar o pagamento ou algo saiu do previsto. Caso tenha mudado de ideia,
          ainda pode concluir sua compra ou entrar em contato conosco.
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
          <Link
            to="/plano"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md inline-flex items-center justify-center transition-all"
          >
            <FaUndo className="mr-2" />
            Tentar Novamente
          </Link>

          <a
            href="https://wa.me/5544998879523" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md inline-flex items-center justify-center transition-all"
          >
            <FaWhatsapp className="mr-2" />
            Fale Conosco
          </a>
        </div>

        {/* Informações Extras */}
        <div className="mt-6 text-sm text-gray-500">
          Se precisar de ajuda ou tiver dúvidas, envie-nos um e-mail em
          {' '}
          <a
            href="mailto:contato@redacaosmart.com.br"
            className="text-blue-600 underline"
          >
            contato@redacaosmart.com.br
          </a>
        </div>
      </div>
    </div>
  );
}

export default CanceladoPage;
