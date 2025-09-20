// src/components/Forum.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Forum() {
  const [topicos, setTopicos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const { usuarioAtual } = useAuth();

  useEffect(() => {
    const fetchTopicos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'topicos'));
        const topicosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTopicos(topicosData);
      } catch (error) {
        console.error('Erro ao buscar tópicos:', error);
      }
    };

    fetchTopicos();
  }, []);

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'topicos'), {
        usuarioId: usuarioAtual.uid,
        autor: usuarioAtual.email,
        titulo,
        conteudo,
        criadoEm: serverTimestamp(),
      });
      setTitulo('');
      setConteudo('');
      // Atualiza a lista de tópicos após criar um novo
      const querySnapshot = await getDocs(collection(db, 'topicos'));
      const topicosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopicos(topicosData);
    } catch (error) {
      console.error('Erro ao criar tópico:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Fórum</h2>

      {/* Formulário para criar um novo tópico */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Criar Novo Tópico</h3>
        <form onSubmit={handleCreateTopic} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Título:</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Conteúdo:</label>
            <textarea
              className="w-full border px-3 py-2 rounded resize-none"
              rows="4"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Publicar Tópico
          </button>
        </form>
      </div>

      {/* Lista de Tópicos */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Tópicos Recentes</h3>
        {topicos.length === 0 ? (
          <p>Nenhum tópico encontrado.</p>
        ) : (
          <ul className="space-y-4">
            {topicos.map((topico) => (
              <li key={topico.id} className="p-4 bg-white rounded shadow">
                <Link to={`/forum/${topico.id}`}>
                  <h4 className="text-xl font-bold text-blue-500 hover:underline">
                    {topico.titulo}
                  </h4>
                </Link>
                <p className="text-gray-700 mt-2">{topico.conteudo.substring(0, 100)}...</p>
                <div className="text-gray-500 text-sm mt-2">
                  Por {topico.autor} em{' '}
                  {topico.criadoEm
                    ? new Date(topico.criadoEm.seconds * 1000).toLocaleDateString()
                    : '...'}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Forum;

