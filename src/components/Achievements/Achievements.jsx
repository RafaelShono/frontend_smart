// src/components/Achievements.jsx
import React from 'react';

function Achievements({ redacoes = [] }) {
  // Define achievement criteria
  const achievements = [
    {
      id: 1,
      name: 'Iniciante',
      description: 'Envie sua primeira redação.',
      condition: redacoes && redacoes.length >= 1,
      icon: '🎉',
    },
    {
      id: 2,
      name: 'Melhoria Contínua',
      description: 'Melhore sua nota total em pelo menos 100 pontos.',
      condition: redacoes && redacoes.length >= 2 && 
        redacoes[0]?.pontuacaoTotal && redacoes[1]?.pontuacaoTotal &&
        (redacoes[0].pontuacaoTotal - redacoes[1].pontuacaoTotal) >= 100,
      icon: '📈',
    },
    {
      id: 3,
      name: 'Especialista em Competência',
      description: 'Alcance 200 pontos em pelo menos 3 competências.',
      condition: redacoes && redacoes.some((redacao) => 
        redacao?.competencias && 
        redacao.competencias.filter(c => c.nota === 200).length >= 3
      ),
      icon: '🏅',
    },
    {
      id: 4,
      name: 'Consistência',
      description: 'Envie 5 redações.',
      condition: redacoes && redacoes.length >= 5,
      icon: '⭐',
    },
    {
      id: 5,
      name: 'Excelência',
      description: 'Alcance 900 pontos em uma redação.',
      condition: redacoes && redacoes.some((redacao) => 
        redacao?.pontuacaoTotal && redacao.pontuacaoTotal >= 900
      ),
      icon: '🏆',
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-4 text-gray-900">Conquistas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              achievement.condition 
                ? 'bg-yellow-50 border-yellow-200 shadow-md' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="text-3xl mb-3">{achievement.icon}</div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">{achievement.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
            {achievement.condition ? (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✅ Conquistado!
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                🔒 Em progresso
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;
