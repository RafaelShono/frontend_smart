// src/components/TopicDetail.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

function TopicDetail() {
  const { id } = useParams();
  const [topico, setTopico] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');
  const { usuarioAtual } = useAuth();

  useEffect(() => {
    const fetchTopico = async () => {
      try {
        const docRef = doc(db, 'topicos', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTopico({ id: docSnap.id, ...docSnap.data() });
        } else {
       
        }
      } catch (error) {
       
      }
    };

    const fetchComentarios = async () => {
      try {
        const comentariosQuery = query(
          collection(db, 'comentarios'),
          where('topicoId', '==', id),
          orderBy('criadoEm', 'asc')
        );
        const querySnapshot = await getDocs(comentariosQuery);
        const comentariosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComentarios(comentariosData);
      } catch (error) {
       
      }
    };

    fetchTopico();
    fetchComentarios();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'comentarios'), {
        topicoId: id,
        usuarioId: usuarioAtual.uid,
        autor: usuarioAtual.email,
        conteudo: novoComentario,
        criadoEm: serverTimestamp(),
      });
      setNovoComentario('');
      // Atualiza a lista de comentários
      const comentariosQuery = query(
        collection(db, 'comentarios'),
        where('topicoId', '==', id),
        orderBy('criadoEm', 'asc')
      );
      const querySnapshot = await getDocs(comentariosQuery);
      const comentariosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComentarios(comentariosData);
    } catch (error) {

    }
  };

  if (!topico) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{topico.titulo}</h2>
      <div className="mb-6">
        <p className="text-gray-700 whitespace-pre-wrap">{topico.conteudo}</p>
        <div className="text-gray-500 text-sm mt-2">
          Por {topico.autor} em{' '}
          {topico.criadoEm
            ? new Date(topico.criadoEm.seconds * 1000).toLocaleDateString()
            : '...'}
        </div>
      </div>

      {/* Comentários */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Comentários</h3>
        {comentarios.length === 0 ? (
          <p>Seja o primeiro a comentar!</p>
        ) : (
          <ul className="space-y-4">
            {comentarios.map((comentario) => (
              <li key={comentario.id} className="p-4 bg-white rounded shadow">
                <p className="text-gray-700 whitespace-pre-wrap">{comentario.conteudo}</p>
                <div className="text-gray-500 text-sm mt-2">
                  Por {comentario.autor} em{' '}
                  {comentario.criadoEm
                    ? new Date(comentario.criadoEm.seconds * 1000).toLocaleDateString()
                    : '...'}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Formulário para adicionar comentário */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Adicionar Comentário</h3>
        <form onSubmit={handleAddComment} className="space-y-4">
          <div>
            <textarea
              className="w-full border px-3 py-2 rounded resize-none"
              rows="4"
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Publicar Comentário
          </button>
        </form>
      </div>
    </div>
  );
}

export default TopicDetail;
