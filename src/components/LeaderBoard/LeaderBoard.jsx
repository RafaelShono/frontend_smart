// src/components/Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from 'firebase/firestore';
import Avatar from 'react-avatar';

function Leaderboard() {
  const [topStudents, setTopStudents] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // 1. Obter as redações com as maiores pontuações
        const redacoesQuery = query(
          collection(db, 'redacoes'),
          orderBy('avaliacao.pontuacaoTotal', 'desc'),
          limit(10) // Top 10 alunos
        );
        const redacoesSnapshot = await getDocs(redacoesQuery);
        const redacoesData = redacoesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 2. Obter uma lista de IDs de usuários únicos
        const usuarioIds = [...new Set(redacoesData.map((redacao) => redacao.usuarioId))];

        // 3. Buscar os dados dos usuários correspondentes em uma única consulta
        let usuariosData = {};
        if (usuarioIds.length > 0) {
          const usuariosQuery = query(
            collection(db, 'users'),
            where('__name__', 'in', usuarioIds)
          );
          const usuariosSnapshot = await getDocs(usuariosQuery);
          usuariosSnapshot.forEach((doc) => {
            usuariosData[doc.id] = doc.data();
          });
        }

        // 4. Combinar os dados das redações com os dados dos usuários
        const studentsData = redacoesData.map((redacao) => {
          const usuarioId = redacao.usuarioId;
          const usuario = usuariosData[usuarioId] || {};

          return {
            id: redacao.id,
            nome: usuario.nome || 'Desconhecido',
            fotoURL: usuario.fotoURL || '',
            pontuacaoTotal: redacao.avaliacao.pontuacaoTotal || 'N/A',
          };
        });

        // 5. Atualizar o estado com os dados combinados
        setTopStudents(studentsData);
      } catch (error) {
        console.error('Erro ao buscar leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-2xl font-semibold mb-4">Leaderboard</h3>
      <ul>
        {topStudents.map((student, index) => (
          <li key={student.id} className="flex items-center mb-4">
            <span className="text-lg font-bold mr-2">{index + 1}.</span>
            <Avatar
              src={student.fotoURL}
              name={student.nome}
              size="40"
              round={true}
              className="mr-3"
            />
            <div>
              <p className="font-semibold">{student.nome}</p>
              <p className="text-gray-600">Total de Pontos: {student.pontuacaoTotal}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
