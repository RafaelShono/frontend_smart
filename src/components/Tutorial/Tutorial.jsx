import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaCheckCircle, FaArrowRight, FaArrowLeft, FaGraduationCap } from 'react-icons/fa';

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      id: 1,
      title: 'Bem-vindo à Redação Smart',
      content: 'Aprenda como usar nossa plataforma para melhorar suas redações e se preparar para o ENEM.',
      image: '🎯',
      details: [
        'Plataforma de correção de redações com IA',
        'Feedback instantâneo e personalizado',
        'Preparação completa para o ENEM',
        'Acompanhamento de progresso'
      ]
    },
    {
      id: 2,
      title: 'Criando sua Conta',
      content: 'Primeiro passo: crie sua conta gratuita para começar a praticar.',
      image: '👤',
      details: [
        'Clique em "Cadastrar" no canto superior direito',
        'Preencha seus dados pessoais',
        'Confirme seu e-mail',
        'Faça login e comece a praticar'
      ]
    },
    {
      id: 3,
      title: 'Escolhendo um Tema',
      content: 'Selecione um tema de redação para praticar. Temos temas do ENEM e outros vestibulares.',
      image: '📝',
      details: [
        'Acesse a seção "Praticar"',
        'Escolha entre temas do ENEM ou outros vestibulares',
        'Leia atentamente a proposta',
        'Analise os textos de apoio'
      ]
    },
    {
      id: 4,
      title: 'Escrevendo sua Redação',
      content: 'Use nosso editor de texto para escrever sua redação. Dicas e sugestões estão disponíveis.',
      image: '✍️',
      details: [
        'Digite sua redação no editor',
        'Use a contagem de palavras como guia',
        'Revise antes de enviar',
        'Clique em "Enviar para Correção"'
      ]
    },
    {
      id: 5,
      title: 'Recebendo a Correção',
      content: 'Nossa IA analisa sua redação e fornece feedback detalhado em segundos.',
      image: '🤖',
      details: [
        'Correção instantânea com IA',
        'Análise das 5 competências do ENEM',
        'Pontuação de 0 a 1000',
        'Sugestões de melhoria específicas'
      ]
    },
    {
      id: 6,
      title: 'Analisando o Feedback',
      content: 'Entenda sua pontuação e como melhorar cada competência.',
      image: '📊',
      details: [
        'Veja sua pontuação por competência',
        'Leia os comentários detalhados',
        'Identifique pontos fortes e fracos',
        'Use as sugestões para melhorar'
      ]
    },
    {
      id: 7,
      title: 'Acompanhando seu Progresso',
      content: 'Monitore sua evolução através do dashboard e relatórios de progresso.',
      image: '📈',
      details: [
        'Acesse seu dashboard pessoal',
        'Veja gráficos de evolução',
        'Compare redações anteriores',
        'Defina metas de melhoria'
      ]
    },
    {
      id: 8,
      title: 'Planos e Assinaturas',
      content: 'Conheça nossos planos e escolha o que melhor se adapta às suas necessidades.',
      image: '💳',
      details: [
        'Plano gratuito: 3 redações/mês',
        'Planos pagos: 5, 10 ou ilimitado',
        'Cancelamento a qualquer momento',
        'Suporte prioritário para assinantes'
      ]
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <FaGraduationCap className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tutorial Completo
          </h1>
          <p className="text-xl text-gray-600">
            Aprenda a usar a Redação Smart em poucos passos
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Passo {currentStep + 1} de {tutorialSteps.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Tutorial Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{currentTutorial.image}</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentTutorial.title}
            </h2>
            <p className="text-xl text-gray-600">
              {currentTutorial.content}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                O que você vai aprender:
              </h3>
              {currentTutorial.details.map((detail, index) => (
                <div key={index} className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{detail}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💡 Dica Importante
              </h3>
              {currentStep === 0 && (
                <p className="text-gray-700">
                  Reserve alguns minutos para explorar a plataforma antes de começar a escrever. 
                  Isso vai ajudar você a se familiarizar com as ferramentas disponíveis.
                </p>
              )}
              {currentStep === 1 && (
                <p className="text-gray-700">
                  Use um e-mail que você acessa frequentemente, pois enviaremos atualizações 
                  importantes sobre seu progresso.
                </p>
              )}
              {currentStep === 2 && (
                <p className="text-gray-700">
                  Leia sempre os textos de apoio com atenção. Eles contêm informações 
                  importantes para sua argumentação.
                </p>
              )}
              {currentStep === 3 && (
                <p className="text-gray-700">
                  Não se preocupe com a perfeição na primeira versão. O importante é 
                  estruturar suas ideias e argumentos.
                </p>
              )}
              {currentStep === 4 && (
                <p className="text-gray-700">
                  Nossa IA é muito precisa, mas sempre revise o feedback com atenção 
                  para entender os pontos de melhoria.
                </p>
              )}
              {currentStep === 5 && (
                <p className="text-gray-700">
                  Não se desanime com pontuações baixas no início. O importante é 
                  identificar os pontos de melhoria e praticar.
                </p>
              )}
              {currentStep === 6 && (
                <p className="text-gray-700">
                  Faça um plano de estudo baseado nos seus pontos fracos identificados 
                  nas correções.
                </p>
              )}
              {currentStep === 7 && (
                <p className="text-gray-700">
                  Comece com o plano gratuito para testar a plataforma. Você pode 
                  fazer upgrade a qualquer momento.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentStep === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            <FaArrowLeft className="mr-2" />
            Anterior
          </button>

          <div className="flex space-x-2">
            {tutorialSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-blue-600'
                    : index < currentStep
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep < tutorialSteps.length - 1 ? (
            <button
              onClick={nextStep}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Próximo
              <FaArrowRight className="ml-2" />
            </button>
          ) : (
            <Link
              to="/praticar"
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <FaPlay className="mr-2" />
              Começar a Praticar
            </Link>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Link
            to="/praticar"
            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
          >
            <div className="text-3xl mb-3">✍️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Praticar Agora
            </h3>
            <p className="text-gray-600 text-sm">
              Comece a escrever sua primeira redação
            </p>
          </Link>

          <Link
            to="/suporte"
            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Precisa de Ajuda?
            </h3>
            <p className="text-gray-600 text-sm">
              Entre em contato com nosso suporte
            </p>
          </Link>

          <Link
            to="/Plano"
            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
          >
            <div className="text-3xl mb-3">💳</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ver Planos
            </h3>
            <p className="text-gray-600 text-sm">
              Conheça nossos planos de assinatura
            </p>
          </Link>
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

export default Tutorial;
