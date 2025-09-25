import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBrain, FaChartLine, FaUsers, FaTrophy, FaRocket, FaPenFancy, FaBookOpen, FaLightbulb, FaCheckCircle, FaArrowRight, FaMagic } from 'react-icons/fa';
import Button from '../ui/Button';
import Card from '../ui/Card';
import '../../styles/design-system.css';

function LandingPage() {
    return (
        <div className="font-sans bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>
                
                <div className="container relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <motion.div 
                            className="text-center lg:text-left"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Badge */}
                            <motion.div 
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full text-sm font-medium text-primary-700 mb-6"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <FaRocket className="mr-2" />
                                IA Especializada em ENEM
                            </motion.div>

                            {/* Main Title */}
                            <motion.h1 
                                className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                Pratique sua{' '}
                                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                    redação do ENEM
                                </span>{' '}
                                com apoio da IA
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p 
                                className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Receba feedback instantâneo, análise detalhada com marcação visual de erros e sugestões específicas das 5 competências do ENEM. 
                                Sua jornada para a nota 1000 começa aqui.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div 
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                <Button
                                    variant="primary"
                                    size="lg"
                                    motionProps={{
                                        whileHover: { scale: 1.05 },
                                        whileTap: { scale: 0.95 }
                                    }}
                                >
                                    <Link to="/praticar" className="flex items-center">
                                        <FaPenFancy className="mr-2" />
                                        Praticar Redação
                                        <FaArrowRight className="ml-2" />
                                    </Link>
                                </Button>
                                
                                <Button
                                    variant="outline"
                                    size="lg"
                                    motionProps={{
                                        whileHover: { scale: 1.05 },
                                        whileTap: { scale: 0.95 }
                                    }}
                                >
                                    <Link to="/comofunciona" className="flex items-center">
                                        <FaLightbulb className="mr-2" />
                                        Como Funciona
                                    </Link>
                                </Button>
                            </motion.div>

                            {/* Stats */}
                            <motion.div 
                                className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary-600 mb-1">10k+</div>
                                    <div className="text-sm text-gray-600">Redações Analisadas</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-secondary-600 mb-1">95%</div>
                                    <div className="text-sm text-gray-600">Satisfação</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-success-600 mb-1">+200</div>
                                    <div className="text-sm text-gray-600">Pontos em Média</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Visual */}
                        <motion.div 
                            className="relative"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div className="relative">
                                {/* Mockup Card */}
                                <motion.div 
                                    className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                                                <FaPenFancy className="text-white text-lg" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Redação ENEM</h3>
                                                <p className="text-sm text-gray-500">Tema: Sustentabilidade</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                                            <span className="text-sm text-gray-500">Analisando...</span>
                                        </div>
                                    </div>

                                    {/* Progress Bars */}
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Competência 1', score: 85, color: 'success' },
                                            { label: 'Competência 2', score: 78, color: 'primary' },
                                            { label: 'Competência 3', score: 92, color: 'success' },
                                            { label: 'Competência 4', score: 65, color: 'warning' },
                                            { label: 'Competência 5', score: 88, color: 'success' }
                                        ].map((item, index) => {
                                            const getColorClass = (color) => {
                                                const colorMap = {
                                                    success: 'bg-success-500',
                                                    primary: 'bg-primary-500',
                                                    warning: 'bg-warning-500',
                                                    error: 'bg-error-500'
                                                };
                                                return colorMap[color] || 'bg-gray-500';
                                            };

                                            return (
                                                <motion.div 
                                                    key={index}
                                                    className="space-y-2"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                                                >
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">{item.label}</span>
                                                        <span className="font-medium text-gray-900">{item.score}/200</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <motion.div 
                                                            className={`h-2 rounded-full ${getColorClass(item.color)}`}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${item.score}%` }}
                                                            transition={{ duration: 1, delay: 1 + (index * 0.1) }}
                                                        />
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* AI Analysis Badge */}
                                    <motion.div 
                                        className="mt-6 flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl py-3"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 1.5 }}
                                    >
                                        <FaBrain className="text-primary-600" />
                                        <span className="text-sm font-medium text-primary-700">Análise da IA Concluída</span>
                                    </motion.div>
                                </motion.div>

                                {/* Floating Elements */}
                                <motion.div 
                                    className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full opacity-20"
                                    animate={{ 
                                        y: [0, -10, 0],
                                        rotate: [0, 5, 0]
                                    }}
                                    transition={{ 
                                        duration: 3, 
                                        repeat: Infinity, 
                                        ease: "easeInOut" 
                                    }}
                                />
                                <motion.div 
                                    className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full opacity-20"
                                    animate={{ 
                                        y: [0, 10, 0],
                                        rotate: [0, -5, 0]
                                    }}
                                    transition={{ 
                                        duration: 4, 
                                        repeat: Infinity, 
                                        ease: "easeInOut" 
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{ 
                        y: [0, 10, 0],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                >
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <motion.div 
                            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container">
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Recursos que fazem a diferença
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Nossa IA foi treinada especificamente para avaliar redações do ENEM, 
                            seguindo rigorosamente os critérios oficiais.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: FaBrain,
                                title: "IA Especializada em ENEM",
                                description: "Nossa IA foi treinada especificamente para avaliar redações do ENEM, seguindo rigorosamente os critérios oficiais das 5 competências.",
                                color: "primary"
                            },
                            {
                                icon: FaMagic,
                                title: "Geração de Temas",
                                description: "Receba temas inéditos e atuais gerados por IA, sempre alinhados com as tendências do ENEM e questões sociais relevantes.",
                                color: "secondary"
                            },
                            {
                                icon: FaChartLine,
                                title: "Análise Detalhada com Marcação Visual",
                                description: "Sistema inovador que marca erros diretamente no texto com cores específicas: ortografia, conectivos, repetições e muito mais!",
                                color: "success"
                            },
                            {
                                icon: FaRocket,
                                title: "Feedback Instantâneo",
                                description: "Receba sua análise em segundos, não em dias. Pratique mais e evolua mais rápido.",
                                color: "warning"
                            },
                            {
                                icon: FaTrophy,
                                title: "Acompanhamento de Progresso",
                                description: "Veja sua evolução ao longo do tempo com gráficos detalhados e estatísticas de performance.",
                                color: "primary"
                            },
                            {
                                icon: FaUsers,
                                title: "Comunidade Ativa",
                                description: "Conecte-se com outros estudantes, compartilhe experiências e aprenda em grupo.",
                                color: "secondary"
                            }
                        ].map((feature, index) => {
                            const getFeatureColorClass = (color) => {
                                const colorMap = {
                                    primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
                                    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600',
                                    success: 'bg-gradient-to-r from-success-500 to-success-600',
                                    warning: 'bg-gradient-to-r from-warning-500 to-warning-600',
                                    error: 'bg-gradient-to-r from-error-500 to-error-600'
                                };
                                return colorMap[color] || 'bg-gradient-to-r from-gray-500 to-gray-600';
                            };

                            return (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card 
                                        variant="elevated" 
                                        hoverable={true}
                                        className="h-full"
                                        motionProps={{
                                            whileHover: { scale: 1.02 }
                                        }}
                                    >
                                        <Card.Body className="text-center">
                                            <motion.div 
                                                className={`w-16 h-16 ${getFeatureColorClass(feature.color)} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <feature.icon className="text-white text-2xl" />
                                            </motion.div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Análise Detalhada Section */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
                <div className="container">
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            🎯 Análise Detalhada com Marcação Visual
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Sistema inovador que marca erros diretamente no texto com cores específicas, 
                            facilitando a identificação e correção de problemas.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Visual Demo */}
                        <motion.div 
                            className="relative"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">📝 Redação com Marcações</h3>
                                    <p className="text-sm text-gray-600">Clique nas marcações coloridas para ver detalhes</p>
                                </div>
                                
                                {/* Mock Text with Markings */}
                                <div className="prose max-w-none leading-relaxed text-gray-800 text-sm">
                                    <p>
                                        A sociedade brasileira enfrenta <span className="bg-red-100 border-b-2 border-red-500 px-1">serios</span> desafios relacionados à tecnologia e educação. 
                                        <span className="bg-orange-100 border-b-2 border-orange-500 px-1">Além disso</span>, é importante destacar que 
                                        <span className="bg-orange-100 border-b-2 border-orange-500 px-1">além disso</span>, muitos jovens não têm acesso adequado.
                                    </p>
                                    <p>
                                        Primeiramente, podemos observar que a <span className="bg-yellow-100 border-b-2 border-yellow-500 px-1">tecnologia</span> pode ser uma ferramenta importante. 
                                        A <span className="bg-yellow-100 border-b-2 border-yellow-500 px-1">tecnologia</span> revolucionou a educação. 
                                        A <span className="bg-yellow-100 border-b-2 border-yellow-500 px-1">tecnologia</span> está presente em todos os lugares.
                                    </p>
                                </div>

                                {/* Legend */}
                                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-red-100 border border-red-500 rounded"></div>
                                        <span>🔴 Ortografia</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-orange-100 border border-orange-500 rounded"></div>
                                        <span>🟠 Conectivos</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-yellow-100 border border-yellow-500 rounded"></div>
                                        <span>🟡 Repetições</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-blue-100 border border-blue-500 rounded"></div>
                                        <span>🔵 Vocabulário</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Features List */}
                        <motion.div 
                            className="space-y-8"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            {[
                                {
                                    icon: "🔴",
                                    title: "Erros Ortográficos",
                                    description: "Identifica erros de ortografia, acentuação e concordância com sugestões específicas de correção."
                                },
                                {
                                    icon: "🟠", 
                                    title: "Conectivos e Coesão",
                                    description: "Detecta repetições de conectivos e sugere alternativas para melhorar a fluidez do texto."
                                },
                                {
                                    icon: "🟡",
                                    title: "Repetições Vocabulares",
                                    description: "Marca palavras repetidas e sugere sinônimos para enriquecer o vocabulário."
                                },
                                {
                                    icon: "🔵",
                                    title: "Melhorias de Vocabulário",
                                    description: "Identifica oportunidades de usar termos mais precisos e formais."
                                },
                                {
                                    icon: "🟣",
                                    title: "Problemas Estruturais",
                                    description: "Analisa a estrutura da redação, tese, argumentação e proposta de intervenção."
                                },
                                {
                                    icon: "🟢",
                                    title: "Pontos Fortes",
                                    description: "Destaca os acertos e pontos positivos da redação para reforçar o aprendizado."
                                }
                            ].map((feature, index) => (
                                <motion.div 
                                    key={index}
                                    className="flex items-start space-x-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="text-2xl">{feature.icon}</div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* CTA */}
                            <motion.div 
                                className="pt-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <Button
                                    variant="primary"
                                    size="lg"
                                    motionProps={{
                                        whileHover: { scale: 1.05 },
                                        whileTap: { scale: 0.95 }
                                    }}
                                >
                                    <Link to="/praticar" className="flex items-center">
                                        <FaPenFancy className="mr-2" />
                                        Experimentar Análise Detalhada
                                        <FaArrowRight className="ml-2" />
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Como funciona
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Três passos simples para começar sua jornada rumo à nota 1000
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Escolha um Tema",
                                description: "Selecione um tema gerado por IA ou use um tema personalizado para praticar.",
                                icon: FaBookOpen,
                                color: "primary"
                            },
                            {
                                step: "02", 
                                title: "Escreva sua Redação",
                                description: "Use nosso editor intuitivo para escrever sua redação com contador de palavras em tempo real.",
                                icon: FaPenFancy,
                                color: "secondary"
                            },
                            {
                                step: "03",
                                title: "Receba Feedback",
                                description: "Obtenha análise completa das 5 competências com sugestões de melhoria personalizadas.",
                                icon: FaCheckCircle,
                                color: "success"
                            }
                        ].map((step, index) => {
                            const getStepColorClass = (color) => {
                                const colorMap = {
                                    primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
                                    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600',
                                    success: 'bg-gradient-to-r from-success-500 to-success-600',
                                    warning: 'bg-gradient-to-r from-warning-500 to-warning-600',
                                    error: 'bg-gradient-to-r from-error-500 to-error-600'
                                };
                                return colorMap[color] || 'bg-gradient-to-r from-gray-500 to-gray-600';
                            };

                            return (
                                <motion.div 
                                    key={index}
                                    className="text-center"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="relative mb-8">
                                        <div className={`w-20 h-20 ${getStepColorClass(step.color)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                            <step.icon className="text-white text-2xl" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-sm font-bold text-gray-900">{step.step}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Pronto para começar sua jornada?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Junte-se a milhares de estudantes que já estão evoluindo suas redações com nossa IA.
                        </p>
                        <Button
                            variant="secondary"
                            size="lg"
                            motionProps={{
                                whileHover: { scale: 1.05 },
                                whileTap: { scale: 0.95 }
                            }}
                        >
                            <Link to="/praticar" className="flex items-center">
                                <FaRocket className="mr-2" />
                                Começar Agora - É Grátis
                                <FaArrowRight className="ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                                    <FaRocket className="text-white text-lg" />
                                </div>
                                <span className="text-xl font-bold">Redação Smart</span>
                            </div>
                            <p className="text-gray-400">
                                A plataforma mais avançada para praticar redação do ENEM com IA.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Produto</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to="/praticar" className="hover:text-white transition-colors">Praticar</Link></li>
                                <li><Link to="/comofunciona" className="hover:text-white transition-colors">Como Funciona</Link></li>
                                <li><Link to="/Plano" className="hover:text-white transition-colors">Planos</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Suporte</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to="/Contato" className="hover:text-white transition-colors">Contato</Link></li>
                                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Tutorial</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Redação Smart. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;