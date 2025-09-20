// src/components/SignupPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FaUser, FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Avatar from 'react-avatar';

function SignupPage() {
  const { usuarioAtual } = useAuth();

  // Estados para o formulário de cadastro
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Estados para gerenciamento de erros e carregamento
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  // Função para cadastrar com Email e Senha
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validações
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    if (!nome.trim()) {
      setError('Por favor, insira seu nome.');
      return;
    }

    setLoading(true);
    try {
      // Criação do usuário via e-mail/senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Atualiza o displayName no objeto do Auth
      await updateProfile(user, {
        displayName: nome,
      });

      // Salva informações adicionais do usuário no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        nome: nome,
        email: user.email,
        fotoURL: user.photoURL || '',
        redacoesEnviadas: 0,
        planoAtivo: false,
        dataCriacao: new Date(),
        ultimoAcesso: new Date()
      });

      setSuccessMessage('Conta criada com sucesso! Redirecionando...');

      // Redireciona após um curto período para exibir a mensagem de sucesso
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Este email já está em uso.');
          break;
        case 'auth/invalid-email':
          setError('O email inserido é inválido.');
          break;
        case 'auth/weak-password':
          setError('A senha é muito fraca. Deve conter pelo menos 6 caracteres.');
          break;
        default:
          setError('Não foi possível criar a conta. Por favor, tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para cadastrar com Google
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');

      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Verifica se o usuário já existe no Firestore para evitar duplicatas
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        // Salva informações adicionais do usuário no Firestore
        await setDoc(userDocRef, {
          uid: user.uid,
          nome: user.displayName || 'Desconhecido',
          email: user.email,
          fotoURL: user.photoURL || '',
          redacoesEnviadas: 0,
          planoAtivo: false,
          dataCriacao: new Date(),
          ultimoAcesso: new Date()
        });
      }

      setSuccessMessage('Conta Google cadastrada com sucesso! Redirecionando...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Erro ao cadastrar com Google:', error);
      setError('Falha no cadastro com Google.');
    } finally {
      setLoading(false);
    }
  };

  // Se o usuário já estiver logado, exibe uma mensagem informativa
  if (usuarioAtual) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundColor: '#dbe4f2',
        }}
      >
        <div
          className="rounded-lg shadow-lg p-8 w-full max-w-md text-center"
          style={{
            backgroundColor: '#ffffff',
          }}
        >
          {/* Foto do Usuário */}
          {usuarioAtual.photoURL && (
            <Avatar
              src={usuarioAtual.photoURL}
              name={usuarioAtual.displayName}
              size="80"
              round={true}
              className="mx-auto mb-4"
            />
          )}

          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#124f62' }}>
            Você já está logado!
          </h2>
          <p className="mb-6" style={{ color: '#6c6a81' }}>
            Bem-vindo, <strong>{usuarioAtual.displayName || 'Usuário'}</strong>.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
            style={{
              width: '100%',
              display: 'inline-block',
              textAlign: 'center',
            }}
          >
            Ir para a Página Inicial
          </Link>
        </div>
      </div>
    );
  }

  // Caso o usuário não esteja logado, exibe o formulário de cadastro
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: '#dbe4f2',
      }}
    >
      <div
        className="rounded-lg shadow-lg p-8 w-full max-w-md"
        style={{
          backgroundColor: '#ffffff',
        }}
      >
        {/* Logo ou Ícone Opcional */}
        <div className="flex justify-center mb-6">
          {/* Substitua por um logo se tiver */}
          <FaUser size={64} color="#124f62" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6" style={{ color: '#124f62' }}>
          Criar Conta
        </h2>

        {/* Mensagem de Erro */}
        {error && (
          <div
            className="px-4 py-3 rounded mb-4 text-center"
            style={{ backgroundColor: '#f8d7da', color: '#721c24' }}
          >
            {error}
          </div>
        )}

        {/* Mensagem de Sucesso (opcional) */}
        {successMessage && (
          <div
            className="px-4 py-3 rounded mb-4 text-center"
            style={{ backgroundColor: '#d4edda', color: '#155724' }}
          >
            {successMessage}
          </div>
        )}

        {/* Formulário de Cadastro com Email e Senha */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block mb-1" htmlFor="nome" style={{ color: '#6c6a81' }}>
              Nome
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <div className="px-3" style={{ backgroundColor: '#f0f0f0' }}>
                <FaUser color="#6c6a81" />
              </div>
              <input
                type="text"
                id="nome"
                className="w-full px-4 py-2 focus:outline-none"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1" htmlFor="email" style={{ color: '#6c6a81' }}>
              Email
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <div className="px-3" style={{ backgroundColor: '#f0f0f0' }}>
                <FaEnvelope color="#6c6a81" />
              </div>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1" htmlFor="senha" style={{ color: '#6c6a81' }}>
              Senha
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <div className="px-3" style={{ backgroundColor: '#f0f0f0' }}>
                <FaLock color="#6c6a81" />
              </div>
              <input
                type="password"
                id="senha"
                className="w-full px-4 py-2 focus:outline-none"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1" htmlFor="confirmarSenha" style={{ color: '#6c6a81' }}>
              Confirmar Senha
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <div className="px-3" style={{ backgroundColor: '#f0f0f0' }}>
                <FaLock color="#6c6a81" />
              </div>
              <input
                type="password"
                id="confirmarSenha"
                className="w-full px-4 py-2 focus:outline-none"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Confirme sua senha"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg transition duration-300 font-semibold ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{
              backgroundColor: '#4cad87',
              color: '#ffffff',
            }}
            disabled={loading}
          >
            {loading ? 'Criando Conta...' : 'Cadastrar'}
          </button>
        </form>

        {/* Botões de Cadastro Alternativo */}
        <div className="mt-6 flex flex-col space-y-4">
          <button
            onClick={handleGoogleSignup}
            className={`w-full flex items-center justify-center py-2 rounded-lg transition duration-300 font-semibold ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{
              backgroundColor: '#84bdca',
              color: '#ffffff',
            }}
            disabled={loading}
          >
            <FaGoogle className="mr-2" />
            Cadastrar com Google
          </button>
        </div>

        {/* Link para Login */}
        <p className="mt-6 text-center" style={{ color: '#6c6a81' }}>
          Já tem uma conta?{' '}
          <Link
            to="/login"
            style={{ color: '#4cad87' }}
            className="font-medium hover:underline"
          >
            Faça Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
