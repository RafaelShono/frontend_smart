// src/components/ComoFunciona.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaRobot, 
  FaCheckCircle, 
  FaLightbulb, 
  FaUsers, 
  FaArrowRight,
  FaStar,
  FaGraduationCap,
  FaChartLine
} from 'react-icons/fa';

function ComoFunciona() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-50">
      {/* Cabeçalho Moderno */}
      <motion.header 
        className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-white py-20 relative overflow-hidden"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center px-4 relative z-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Como Funciona
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transformando suas redações com a Inteligência Artificial mais avançada
          </motion.p>
        </div>
      </motion.header>

      {/* Seção de Introdução Moderna */}
      <motion.section 
        className="py-20 bg-white relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              A Revolução da IA na Preparação para o ENEM
            </h2>
            <p className="text-gray-700 text-xl max-w-4xl mx-auto leading-relaxed">
              Nossa plataforma utiliza a mais avançada tecnologia de Inteligência Artificial para oferecer feedbacks personalizados, identificar pontos de melhoria e proporcionar uma experiência de aprendizado única e eficiente. Tudo isso para garantir que você alcance a excelência nas suas redações para o ENEM.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefícios da IA Modernos */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Por Que Utilizar a IA?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefício 1 */}
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                <FaRobot className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Automatização Inteligente</h3>
              <p className="text-gray-600 leading-relaxed">
                Receba análises detalhadas e feedbacks instantâneos sobre sua redação, permitindo um aprendizado contínuo e eficiente.
              </p>
            </motion.div>
            {/* Benefício 2 */}
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-success-500 to-success-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                <FaCheckCircle className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Qualidade Superior</h3>
              <p className="text-gray-600 leading-relaxed">
                Melhore sua escrita com sugestões precisas que elevam a qualidade e a coesão do seu texto.
              </p>
            </motion.div>
            {/* Benefício 3 */}
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-warning-500 to-warning-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Inovação Constante</h3>
              <p className="text-gray-600 leading-relaxed">
                Utilize ferramentas inovadoras que acompanham as tendências e exigências do ENEM.
              </p>
            </motion.div>
            {/* Benefício 4 */}
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Suporte Personalizado</h3>
              <p className="text-gray-600 leading-relaxed">
                Tenha acesso a um suporte dedicado que entende suas necessidades e oferece soluções sob medida.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Processo Moderno */}
      <motion.section 
        className="py-20 bg-white relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Como Funciona o Processo
          </motion.h2>
          
          <div className="space-y-20">
            {/* Passo 1 */}
            <motion.div 
              className="flex flex-col lg:flex-row items-center gap-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="lg:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mr-6">
                    <FaRobot className="text-white text-3xl" />
                  </div>
                  <div className="text-6xl font-bold text-primary-200">01</div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-800">Submeta Sua Redação</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Envie sua redação diretamente para nossa plataforma de forma rápida e segura. Nossa interface intuitiva torna o processo simples e eficiente.
                </p>
                <div className="flex items-center text-primary-600 font-semibold">
                  <span>Começar agora</span>
                  <FaArrowRight className="ml-2" />
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <FaGraduationCap className="text-6xl text-primary-600 mx-auto mb-4" />
                    <p className="text-primary-700 font-semibold">Interface Intuitiva</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Passo 2 */}
            <motion.div 
              className="flex flex-col lg:flex-row-reverse items-center gap-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="lg:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-success-500 to-success-600 rounded-2xl flex items-center justify-center mr-6">
                    <FaCheckCircle className="text-white text-3xl" />
                  </div>
                  <div className="text-6xl font-bold text-success-200">02</div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-800">Análise Inteligente</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Nossa IA avalia sua redação com base nas 5 competências do ENEM, identificando pontos fortes e áreas de melhoria com precisão cirúrgica.
                </p>
                <div className="flex items-center text-success-600 font-semibold">
                  <span>Análise detalhada</span>
                  <FaArrowRight className="ml-2" />
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-success-100 to-success-200 rounded-3xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <FaChartLine className="text-6xl text-success-600 mx-auto mb-4" />
                    <p className="text-success-700 font-semibold">IA Avançada</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Passo 3 */}
            <motion.div 
              className="flex flex-col lg:flex-row items-center gap-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="lg:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-warning-500 to-warning-600 rounded-2xl flex items-center justify-center mr-6">
                    <FaLightbulb className="text-white text-3xl" />
                  </div>
                  <div className="text-6xl font-bold text-warning-200">03</div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-800">Feedback Personalizado</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Receba sugestões detalhadas e personalizadas para aprimorar sua redação e alcançar a pontuação desejada no ENEM.
                </p>
                <div className="flex items-center text-warning-600 font-semibold">
                  <span>Melhorias específicas</span>
                  <FaArrowRight className="ml-2" />
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-warning-100 to-warning-200 rounded-3xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <FaStar className="text-6xl text-warning-600 mx-auto mb-4" />
                    <p className="text-warning-700 font-semibold">Feedback Detalhado</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Passo 4 */}
            <motion.div 
              className="flex flex-col lg:flex-row-reverse items-center gap-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="lg:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mr-6">
                    <FaUsers className="text-white text-3xl" />
                  </div>
                  <div className="text-6xl font-bold text-secondary-200">04</div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-800">Melhoria Contínua</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Com o uso contínuo da plataforma, veja sua evolução ao longo do tempo e prepare-se para atingir seus objetivos no ENEM.
                </p>
                <div className="flex items-center text-secondary-600 font-semibold">
                  <span>Evolução constante</span>
                  <FaArrowRight className="ml-2" />
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-3xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <FaChartLine className="text-6xl text-secondary-600 mx-auto mb-4" />
                    <p className="text-secondary-700 font-semibold">Progresso Contínuo</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testemunhos Modernos */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            O Que Nossos Usuários Dizem
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testemunho 1 */}
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800">Ana Clara</h4>
                  <p className="text-primary-600 text-sm font-medium">Aluno do Ensino Médio</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "A plataforma transformou minha maneira de escrever. As análises são detalhadas e me ajudaram a melhorar significativamente minhas redações para o ENEM."
              </p>
              <div className="flex text-warning-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
              </div>
            </motion.div>
            {/* Testemunho 2 */}
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-success-500 to-success-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800">João Pedro</h4>
                  <p className="text-success-600 text-sm font-medium">Estudante Universitário</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "Com o feedback personalizado da IA, consegui identificar e corrigir meus erros mais rapidamente. Recomendo para todos que querem se destacar no ENEM."
              </p>
              <div className="flex text-warning-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
              </div>
            </motion.div>
            {/* Testemunho 3 */}
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800">Maria Fernanda</h4>
                  <p className="text-secondary-600 text-sm font-medium">Profissional em transição</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "A qualidade das sugestões é incrível! Minha confiança na escrita aumentou muito e estou mais preparado para o exame."
              </p>
              <div className="flex text-warning-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Moderno */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Pronto para Transformar Sua Redação?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-3xl mx-auto text-primary-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Junte-se a milhares de estudantes que já estão elevando suas redações com nossa plataforma inteligente.
          </motion.p>
          <motion.a
            href="/signup"
            className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Comece Agora</span>
            <FaArrowRight className="ml-3" />
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}

export default ComoFunciona;
