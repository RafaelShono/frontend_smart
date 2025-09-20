// src/components/ComoFunciona.jsx
import React from 'react';
import { FaRobot, FaCheckCircle, FaLightbulb, FaUsers } from 'react-icons/fa';


function ComoFunciona() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cabeçalho Atraente */}
      <header className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Como Funciona</h1>
          <p className="text-lg md:text-2xl">Transformando suas redações com a Inteligência Artificial</p>
        </div>
      </header>

      {/* Seção de Introdução */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6">A Revolução da IA na Preparação para o ENEM</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Nossa plataforma utiliza a mais avançada tecnologia de Inteligência Artificial para oferecer feedbacks personalizados, identificar pontos de melhoria e proporcionar uma experiência de aprendizado única e eficiente. Tudo isso para garantir que você alcance a excelência nas suas redações para o ENEM.
          </p>
        </div>
      </section>

      {/* Benefícios da IA na Melhoria das Redações */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Por Que Utilizar a IA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefício 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaRobot className="text-blue-500 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Automatização Inteligente</h3>
              <p className="text-gray-600">
                Receba análises detalhadas e feedbacks instantâneos sobre sua redação, permitindo um aprendizado contínuo e eficiente.
              </p>
            </div>
            {/* Benefício 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaCheckCircle className="text-green-500 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Qualidade Superior</h3>
              <p className="text-gray-600">
                Melhore sua escrita com sugestões precisas que elevam a qualidade e a coesão do seu texto.
              </p>
            </div>
            {/* Benefício 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaLightbulb className="text-yellow-500 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Inovação Constante</h3>
              <p className="text-gray-600">
                Utilize ferramentas inovadoras que acompanham as tendências e exigências do ENEM.
              </p>
            </div>
            {/* Benefício 4 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaUsers className="text-purple-500 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Suporte Personalizado</h3>
              <p className="text-gray-600">
                Tenha acesso a um suporte dedicado que entende suas necessidades e oferece soluções sob medida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona o Processo */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Como Funciona</h2>
          <div className="space-y-8">
            {/* Passo 1 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <FaRobot className="text-blue-500 w-16 h-16 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">1. Submeta Sua Redação</h3>
                <p className="text-gray-700">
                  Envie sua redação diretamente para nossa plataforma de forma rápida e segura.
                </p>
              </div>
              <div className="md:w-1/2 mt-6 md:mt-0">
                <img
                  src="https://via.placeholder.com/400x300" // Substitua pelo link da sua imagem
                  alt="Submeter Redação"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            {/* Passo 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2">
                <FaCheckCircle className="text-green-500 w-16 h-16 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">2. Análise Inteligente</h3>
                <p className="text-gray-700">
                  Nossa IA avalia sua redação com base nas 5 competências do ENEM, identificando pontos fortes e áreas de melhoria.
                </p>
              </div>
              <div className="md:w-1/2 mt-6 md:mt-0">
                <img
                  src="https://via.placeholder.com/400x300" // Substitua pelo link da sua imagem
                  alt="Análise Inteligente"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            {/* Passo 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <FaLightbulb className="text-yellow-500 w-16 h-16 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">3. Feedback Personalizado</h3>
                <p className="text-gray-700">
                  Receba sugestões detalhadas e personalizadas para aprimorar sua redação e alcançar a pontuação desejada.
                </p>
              </div>
              <div className="md:w-1/2 mt-6 md:mt-0">
                <img
                  src="https://via.placeholder.com/400x300" // Substitua pelo link da sua imagem
                  alt="Feedback Personalizado"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            {/* Passo 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2">
                <FaUsers className="text-purple-500 w-16 h-16 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">4. Melhoria Contínua</h3>
                <p className="text-gray-700">
                  Com o uso contínuo da plataforma, veja sua evolução ao longo do tempo e prepare-se para atingir seus objetivos no ENEM.
                </p>
              </div>
              <div className="md:w-1/2 mt-6 md:mt-0">
                <img
                  src="https://via.placeholder.com/400x300" // Substitua pelo link da sua imagem
                  alt="Melhoria Contínua"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testemunhos de Usuários */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">O Que Nossos Usuários Dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testemunho 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 mb-4">
                "A plataforma transformou minha maneira de escrever. As análises são detalhadas e me ajudaram a melhorar significativamente minhas redações para o ENEM."
              </p>
              <h4 className="font-semibold text-lg">Ana Clara</h4>
              <p className="text-gray-500 text-sm">Aluno do Ensino Médio</p>
            </div>
            {/* Testemunho 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 mb-4">
                "Com o feedback personalizado da IA, consegui identificar e corrigir meus erros mais rapidamente. Recomendo para todos que querem se destacar no ENEM."
              </p>
              <h4 className="font-semibold text-lg">João Pedro</h4>
              <p className="text-gray-500 text-sm">Estudante Universitário</p>
            </div>
            {/* Testemunho 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 mb-4">
                "A qualidade das sugestões é incrível! Minha confiança na escrita aumentou muito e estou mais preparado para o exame."
              </p>
              <h4 className="font-semibold text-lg">Maria Fernanda</h4>
              <p className="text-gray-500 text-sm">Profissional em transição de carreira</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chamada para Ação (CTA) */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">Pronto para Transformar Sua Redação?</h2>
          <p className="text-lg mb-6">
            Junte-se a milhares de estudantes que já estão elevando suas redações com nossa plataforma inteligente.
          </p>
          <a
            href="/signup"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
          >
            Comece Agora
          </a>
        </div>
      </section>
    </div>
  );
}

export default ComoFunciona;
