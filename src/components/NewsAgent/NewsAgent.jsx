import { useState, useEffect } from 'react';
import { FaNewspaper, FaRobot, FaSync, FaCalendarAlt, FaTag, FaExternalLinkAlt } from 'react-icons/fa';

function NewsAgent() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [themes, setThemes] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [message, setMessage] = useState('');

  // Buscar temas existentes
  const fetchThemes = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/themes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setThemes(data.themes);
        if (data.themes.length > 0) {
          setLastUpdate(data.themes[0].dataCriacao);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar temas:', error);
      setMessage('Erro ao carregar temas. Verifique se o backend está rodando.');
      
      // Dados mockados para demonstração
      const mockThemes = [
        {
          id: 'mock1',
          titulo: 'Desafios da sustentabilidade no Brasil contemporâneo',
          descricao: 'Com base em notícias recentes sobre meio ambiente, reflita sobre os desafios ambientais enfrentados pela sociedade brasileira.',
          categoria: 'Meio Ambiente',
          fonte: 'G1',
          dataCriacao: new Date().toISOString(),
          proposta: 'Proponha medidas concretas para promover a sustentabilidade.'
        },
        {
          id: 'mock2',
          titulo: 'Impactos da tecnologia na sociedade brasileira',
          descricao: 'Considerando as transformações digitais recentes, discuta os impactos da tecnologia na sociedade brasileira.',
          categoria: 'Tecnologia',
          fonte: 'UOL',
          dataCriacao: new Date().toISOString(),
          proposta: 'Sugira políticas públicas para maximizar benefícios da tecnologia.'
        }
      ];
      
      setThemes(mockThemes);
      setLastUpdate(new Date().toISOString());
    }
  };

  // Gerar novos temas
  const generateThemes = async () => {
    setIsGenerating(true);
    setMessage('');
    
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/generate-themes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(`✅ ${data.message}`);
        await fetchThemes(); // Recarregar temas
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao gerar temas:', error);
      setMessage('❌ Erro ao gerar temas. Verifique se o backend está rodando.');
      
      // Simular geração de temas para demonstração
      setTimeout(() => {
        const newMockThemes = [
          {
            id: `mock-${Date.now()}`,
            titulo: 'Desigualdades sociais no Brasil atual',
            descricao: 'A partir de notícias recentes, analise os aspectos sociais e suas consequências para a sociedade brasileira.',
            categoria: 'Sociedade',
            fonte: 'Folha',
            dataCriacao: new Date().toISOString(),
            proposta: 'Apresente soluções viáveis para os problemas sociais identificados.'
          }
        ];
        
        setThemes(prev => [...newMockThemes, ...prev]);
        setMessage('✅ Tema de demonstração adicionado!');
        setIsGenerating(false);
      }, 2000);
    } finally {
      setIsGenerating(false);
    }
  };

  // Carregar temas ao montar o componente
  useEffect(() => {
    fetchThemes();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Meio Ambiente': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Sociedade': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Tecnologia': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Cultura': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Política': 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <FaRobot className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Agente de Notícias
              </h1>
              <p className="text-slate-300">Geração automática de temas de redação baseados em notícias atuais</p>
            </div>
          </div>
          
          {/* Status e Controles */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FaNewspaper className="text-cyan-400" />
                  <span className="text-slate-300">Última atualização:</span>
                  <span className="text-cyan-400 font-medium">{formatDate(lastUpdate)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-cyan-400" />
                  <span className="text-slate-300">Temas disponíveis:</span>
                  <span className="text-cyan-400 font-medium">{themes.length}</span>
                </div>
              </div>
              
              <button
                onClick={generateThemes}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <FaSync className="animate-spin" />
                    <span>Gerando...</span>
                  </>
                ) : (
                  <>
                    <FaRobot />
                    <span>Gerar Novos Temas</span>
                  </>
                )}
              </button>
            </div>
            
            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('✅') 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Lista de Temas */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-200 mb-4">Temas Gerados</h2>
          
          {themes.length === 0 ? (
            <div className="text-center py-12">
              <FaNewspaper className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">Nenhum tema gerado ainda</p>
              <p className="text-slate-500">Clique em &quot;Gerar Novos Temas&quot; para começar</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((theme, index) => (
                <div key={theme.id || index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(theme.categoria)}`}>
                      {theme.categoria}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                      <FaTag />
                      <span>{theme.fonte}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-200 mb-3 line-clamp-2">
                    {theme.titulo}
                  </h3>
                  
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {theme.descricao}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="text-xs text-slate-500">
                      <strong>Proposta:</strong> {theme.proposta}
                    </div>
                    
                    {theme.linkNoticia && (
                      <a
                        href={theme.linkNoticia}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <FaExternalLinkAlt />
                        <span>Ver notícia original</span>
                      </a>
                    )}
                    
                    <div className="text-xs text-slate-500">
                      Gerado em: {formatDate(theme.dataCriacao)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsAgent;
