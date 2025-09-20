// src/components/ScoreEvolution.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Paleta de cores para as barras
const COLORS = [
  '#8884d8', // Nota Total
  '#82ca9d', // Competência 1
  '#ffc658', // Competência 2
  '#ff7300', // Competência 3
  '#d0ed57', // Competência 4
  '#a4de6c', // Competência 5
];

// Lista das competências para facilitar a iteração
const COMPETENCIES = [
  { id: 1, name: 'Competência 1' },
  { id: 2, name: 'Competência 2' },
  { id: 3, name: 'Competência 3' },
  { id: 4, name: 'Competência 4' },
  { id: 5, name: 'Competência 5' },
];

function ScoreEvolution({ scores = [] }) {
  // Função para preparar os dados do gráfico
  const prepareData = () => {
    if (!scores || scores.length === 0) {
      return [];
    }
    
    return scores
      .map((score, index) => {
        const date = score.data ? new Date(score.data) : new Date();
        const formattedDate = date.toLocaleDateString('pt-BR', {
          month: 'short',
          day: 'numeric',
        });

        return {
          date: formattedDate,
          totalScore: score.nota || 0,
          index: index + 1,
        };
      })
      .reverse(); // Ordem cronológica
  };

  const data = prepareData();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
        Evolução das Notas
      </h3>
      {data.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Nenhuma redação disponível para exibir.</p>
          <p className="text-sm text-gray-400">Envie sua primeira redação para ver sua evolução aqui!</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#2563eb" />
            <YAxis stroke="#2563eb" />
            <Tooltip
              contentStyle={{ backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              labelStyle={{ color: '#1e40af', fontWeight: 'bold' }}
            />
            <Legend verticalAlign="top" height={36} />
            {/* Barra para a Nota Total */}
            <Bar
              dataKey="totalScore"
              fill="#2563eb"
              name="Nota Total"
              barSize={30}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ScoreEvolution;


