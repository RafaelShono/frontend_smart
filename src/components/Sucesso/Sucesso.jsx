// src/pages/SucessoPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight, FaPenFancy } from 'react-icons/fa';

function SucessoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        {/* Ícone ou ilustração de sucesso */}
        <div className="text-6xl text-green-500 mb-4 mx-auto">
          <FaCheckCircle />
        </div>

        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Pagamento Realizado com Sucesso!
        </h1>
        <p className="text-gray-600 mb-6">
          Agradecemos pela confiança. Agora você tem acesso ao seu plano, podendo enviar suas redações e evoluir ainda mais.
        </p>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md inline-flex items-center justify-center transition-all"
          >
            <FaArrowRight className="mr-2" />
            Ir para o Painel
          </Link>
          <Link
            to="/praticar"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md inline-flex items-center justify-center transition-all"
          >
            <FaPenFancy className="mr-2" />
            Praticar Redação
          </Link>
        </div>

        {/* Observações adicionais */}
        <div className="mt-6 text-sm text-gray-500">
          Caso tenha qualquer dúvida ou problema, entre em contato conosco em 
          {' '}
          <a
            href="mailto:suporte@redacaosmart.com.br"
            className="text-blue-600 underline"
          >
            suporte@redacaosmart.com.br
          </a>.
        </div>
      </div>
    </div>
  );
}

export default SucessoPage;
