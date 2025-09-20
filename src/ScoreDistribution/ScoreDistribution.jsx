// src/components/ScoreDistribution.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Registrar os componentes necessários do Chart.js
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ScoreDistribution({ redacoes, historicalScores }) {
  if (historicalScores.length === 0) {
    return null; // Ou exibir um indicador de carregamento
  }

  // Assume que os dados históricos mais recentes estão no início do array
  const latestHistorical = historicalScores[0];

  // Calcular médias das competências do usuário
  const userAverages = redacoes.reduce((acc, redacao) => {
    redacao.avaliacao.competencias.forEach((comp) => {
      acc[comp.id] = (acc[comp.id] || 0) + comp.nota;
    });
    acc.total = (acc.total || 0) + redacao.avaliacao.pontuacaoTotal;
    return acc;
  }, {});

  const userCount = redacoes.length;
  const userData = {
    competencia1: userCount ? (userAverages[1] / userCount).toFixed(2) : 0,
    competencia2: userCount ? (userAverages[2] / userCount).toFixed(2) : 0,
    competencia3: userCount ? (userAverages[3] / userCount).toFixed(2) : 0,
    competencia4: userCount ? (userAverages[4] / userCount).toFixed(2) : 0,
    competencia5: userCount ? (userAverages[5] / userCount).toFixed(2) : 0,
    totalScore: userCount ? (userAverages.total / userCount).toFixed(2) : 0,
  };

  const data = {
    labels: [
      'Competência 1',
      'Competência 2',
      'Competência 3',
      'Competência 4',
      'Competência 5',
      'Nota Total',
    ],
    datasets: [
      {
        label: 'Sua Média',
        data: [
          parseFloat(userData.competencia1),
          parseFloat(userData.competencia2),
          parseFloat(userData.competencia3),
          parseFloat(userData.competencia4),
          parseFloat(userData.competencia5),
          parseFloat(userData.totalScore),
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Média Oficial',
        data: [
          latestHistorical.competencias[0].average,
          latestHistorical.competencias[1].average,
          latestHistorical.competencias[2].average,
          latestHistorical.competencias[3].average,
          latestHistorical.competencias[4].average,
          latestHistorical.pontuacaoTotal.average,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-4">Distribuição das Notas</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ScoreDistribution;

