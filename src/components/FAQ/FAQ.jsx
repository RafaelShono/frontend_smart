import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaQuestionCircle, FaSearch } from 'react-icons/fa';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState({});

  const faqData = [
    {
      category: 'Geral',
      questions: [
        {
          id: 1,
          question: 'O que é a Redação Smart?',
          answer: 'A Redação Smart é uma plataforma que utiliza inteligência artificial para corrigir e avaliar redações, fornecendo feedback detalhado e personalizado para ajudar estudantes a melhorar sua escrita.'
        },
        {
          id: 2,
          question: 'Como funciona a correção de redações?',
          answer: 'Nossa IA analisa sua redação considerando as 5 competências do ENEM: domínio da escrita formal, compreensão da proposta, seleção e organização de informações, conhecimento da língua e proposta de intervenção. O resultado é instantâneo e inclui pontuação e sugestões de melhoria.'
        },
        {
          id: 3,
          question: 'A correção é realmente instantânea?',
          answer: 'Sim! Nossa tecnologia de IA processa sua redação em segundos, fornecendo uma análise completa e detalhada imediatamente após o envio.'
        }
      ]
    },
    {
      category: 'Planos e Pagamentos',
      questions: [
        {
          id: 4,
          question: 'Quais planos estão disponíveis?',
          answer: 'Oferecemos 3 planos: 5 Redações (R$ 14,99/mês), 10 Redações (R$ 24,99/mês) e Ilimitado (R$ 54,99/mês). Também há um plano gratuito com 3 redações por mês.'
        },
        {
          id: 5,
          question: 'Posso cancelar minha assinatura a qualquer momento?',
          answer: 'Sim, você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento. O acesso aos serviços continuará até o final do período pago.'
        },
        {
          id: 6,
          question: 'Como funciona o pagamento?',
          answer: 'Os pagamentos são processados mensalmente através do Stripe, uma plataforma segura e confiável. Aceitamos cartões de crédito e débito.'
        },
        {
          id: 7,
          question: 'Há garantia de reembolso?',
          answer: 'Sim, oferecemos garantia de 7 dias. Se não ficar satisfeito com nossos serviços, você pode solicitar o reembolso total.'
        }
      ]
    },
    {
      category: 'Técnico',
      questions: [
        {
          id: 8,
          question: 'Posso usar em qualquer dispositivo?',
          answer: 'Sim, nossa plataforma é responsiva e funciona perfeitamente em computadores, tablets e smartphones com qualquer navegador moderno.'
        },
        {
          id: 9,
          question: 'Preciso instalar algum software?',
          answer: 'Não, nossa plataforma é totalmente web-based. Você só precisa de um navegador e conexão com a internet.'
        },
        {
          id: 10,
          question: 'Minhas redações ficam salvas?',
          answer: 'Sim, todas as suas redações e correções ficam salvas na sua conta, permitindo que você acompanhe seu progresso ao longo do tempo.'
        },
        {
          id: 11,
          question: 'Posso baixar minhas correções?',
          answer: 'Sim, você pode visualizar, imprimir e baixar suas correções em formato PDF a qualquer momento.'
        }
      ]
    },
    {
      category: 'ENEM e Vestibulares',
      questions: [
        {
          id: 12,
          question: 'A correção segue os critérios do ENEM?',
          answer: 'Sim, nossa IA foi treinada especificamente nos critérios de correção do ENEM, considerando as 5 competências e a escala de 0 a 1000 pontos.'
        },
        {
          id: 13,
          question: 'Posso praticar com temas de anos anteriores?',
          answer: 'Sim, oferecemos uma biblioteca com temas de redações do ENEM e outros vestibulares de anos anteriores para prática.'
        },
        {
          id: 14,
          question: 'A IA consegue identificar plágio?',
          answer: 'Nossa IA pode identificar similaridades com textos conhecidos e alertar sobre possíveis problemas de originalidade, mas recomendamos sempre a autoria própria.'
        }
      ]
    },
    {
      category: 'Suporte',
      questions: [
        {
          id: 15,
          question: 'Como posso entrar em contato com o suporte?',
          answer: 'Você pode entrar em contato através do WhatsApp (44) 99887-9523, e-mail suporte@redacaosmart.com.br ou através do formulário de contato em nossa página de suporte.'
        },
        {
          id: 16,
          question: 'Qual o horário de atendimento?',
          answer: 'WhatsApp: Segunda a Sexta, 8h às 18h. E-mail: 24h (resposta em até 24h). Finais de semana: apenas e-mail.'
        },
        {
          id: 17,
          question: 'Posso sugerir melhorias na plataforma?',
          answer: 'Claro! Valorizamos muito o feedback dos usuários. Você pode enviar sugestões através do formulário de contato ou e-mail.'
        }
      ]
    }
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <FaQuestionCircle className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-xl text-gray-600">
            Encontre respostas para as dúvidas mais comuns
          </p>
        </div>

        {/* Busca */}
        <div className="mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar perguntas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-8">
          {filteredData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-600 text-white px-6 py-4">
                <h2 className="text-xl font-bold">{category.category}</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {category.questions.map((item) => (
                  <div key={item.id} className="p-6">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {item.question}
                      </h3>
                      {openItems[item.id] ? (
                        <FaChevronUp className="text-blue-600 flex-shrink-0" />
                      ) : (
                        <FaChevronDown className="text-blue-600 flex-shrink-0" />
                      )}
                    </button>
                    
                    {openItems[item.id] && (
                      <div className="mt-4 text-gray-700 leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Não encontrou resposta */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Não encontrou sua resposta?
          </h2>
          <p className="text-gray-600 mb-6">
            Nossa equipe de suporte está pronta para ajudar você
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/suporte"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Entrar em Contato
            </Link>
            <a
              href="https://wa.me/5544998879523"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              WhatsApp
            </a>
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

export default FAQ;
