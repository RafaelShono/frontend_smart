import React, { useState } from 'react';
import { FaRobot, FaSync, FaMagic, FaCog, FaCheck, FaTimes } from 'react-icons/fa';
import API_CONFIG from '../../config/api';

function ThemeGenerator({ onThemeGenerated, onClose }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    areaTema: 'aleatorio',
    nivelProva: 'enem',
    contextoEspecifico: '',
    quantidadeTextos: 3
  });

  const areasTema = [
    { value: 'aleatorio', label: 'Aleatório' },
    { value: 'social', label: 'Questões Sociais' },
    { value: 'educacao', label: 'Educação' },
    { value: 'meio-ambiente', label: 'Meio Ambiente' },
    { value: 'tecnologia', label: 'Tecnologia' },
    { value: 'saude', label: 'Saúde' },
    { value: 'cultura', label: 'Cultura' },
    { value: 'politica', label: 'Política' },
    { value: 'economia', label: 'Economia' }
  ];

  const niveisProva = [
    { value: 'ensino-medio', label: 'Ensino Médio' },
    { value: 'vestibular', label: 'Vestibular' },
    { value: 'concurso', label: 'Concurso Público' },
    { value: 'enem', label: 'ENEM' }
  ];

  const contextosSugeridos = [
    'Foco em dados de 2024',
    'Pandemia e pós-pandemia',
    'Eleições e democracia',
    'Sustentabilidade',
    'Transformação digital',
    'Desigualdades sociais',
    'Mudanças climáticas',
    'Inteligência artificial',
    'Inclusão e diversidade',
    'Cidades inteligentes'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContextoSugerido = (contexto) => {
    setFormData(prev => ({
      ...prev,
      contextoEspecifico: contexto
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch(API_CONFIG.urls.generateTheme, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Erro ao gerar tema');
      }
      
      const data = await response.json();
      
      if (data.success) {
        onThemeGenerated(data.tema);
        onClose();
      } else {
        throw new Error(data.message || 'Erro ao gerar tema');
      }
      
    } catch (error) {
      console.error('Erro ao gerar tema:', error);
      alert('Erro ao gerar tema. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-cyan-500/20 bg-gradient-to-r from-slate-700/50 to-slate-600/50 backdrop-blur-sm rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <FaRobot className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Gerador de Temas com IA
                </h2>
                <p className="text-slate-300 text-sm">Configure os parâmetros para gerar um tema personalizado</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-slate-700/50 hover:bg-slate-600/50 rounded-full flex items-center justify-center transition-colors"
            >
              <FaTimes className="text-slate-300 text-sm" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Área do Tema */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-3">
              <FaCog className="inline mr-2 text-cyan-400" />
              Área do Tema
            </label>
            <select
              name="areaTema"
              value={formData.areaTema}
              onChange={handleInputChange}
              className="w-full border border-cyan-500/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200 bg-slate-700/50 backdrop-blur-sm text-slate-200 shadow-xl"
            >
              {areasTema.map(area => (
                <option key={area.value} value={area.value} className="bg-slate-800 text-slate-300">
                  {area.label}
                </option>
              ))}
            </select>
          </div>

          {/* Nível da Prova */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-3">
              <FaCog className="inline mr-2 text-cyan-400" />
              Nível da Prova
            </label>
            <select
              name="nivelProva"
              value={formData.nivelProva}
              onChange={handleInputChange}
              className="w-full border border-cyan-500/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200 bg-slate-700/50 backdrop-blur-sm text-slate-200 shadow-xl"
            >
              {niveisProva.map(nivel => (
                <option key={nivel.value} value={nivel.value} className="bg-slate-800 text-slate-300">
                  {nivel.label}
                </option>
              ))}
            </select>
          </div>

          {/* Contexto Específico */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-3">
              <FaCog className="inline mr-2 text-cyan-400" />
              Contexto Específico (opcional)
            </label>
            <textarea
              name="contextoEspecifico"
              value={formData.contextoEspecifico}
              onChange={handleInputChange}
              placeholder="Ex: Foco em dados de 2024, pandemia, eleições, sustentabilidade, etc..."
              className="w-full border border-cyan-500/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200 bg-slate-700/50 backdrop-blur-sm text-slate-200 shadow-xl resize-none"
              rows="3"
            />
            
            {/* Contextos Sugeridos */}
            <div className="mt-3">
              <p className="text-xs text-slate-400 mb-2">Contextos sugeridos:</p>
              <div className="flex flex-wrap gap-2">
                {contextosSugeridos.map((contexto, index) => (
                  <button
                    key={index}
                    onClick={() => handleContextoSugerido(contexto)}
                    className="px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-xs rounded-full border border-slate-600/30 transition-colors"
                  >
                    {contexto}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantidade de Textos Motivadores */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-3">
              <FaCog className="inline mr-2 text-cyan-400" />
              Quantidade de Textos Motivadores
            </label>
            <select
              name="quantidadeTextos"
              value={formData.quantidadeTextos}
              onChange={handleInputChange}
              className="w-full border border-cyan-500/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200 bg-slate-700/50 backdrop-blur-sm text-slate-200 shadow-xl"
            >
              <option value="3" className="bg-slate-800 text-slate-300">3 textos</option>
              <option value="4" className="bg-slate-800 text-slate-300">4 textos</option>
              <option value="5" className="bg-slate-800 text-slate-300">5 textos</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-cyan-500/20 bg-gradient-to-r from-slate-700/50 to-slate-600/50 backdrop-blur-sm rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-400">
              <FaRobot className="inline mr-1" />
              Powered by OpenAI GPT-4
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-sm font-medium rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-purple-400 hover:to-pink-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <FaSync className="animate-spin" />
                    <span>Gerando...</span>
                  </>
                ) : (
                  <>
                    <FaMagic />
                    <span>Gerar Tema</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeGenerator;
