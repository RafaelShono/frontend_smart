// src/components/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Certifique-se de que o caminho está correto
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { usuarioAtual } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/dashboard');
    } catch (error) {
      
      setError('Email ou senha incorretos.');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      
      setError('Falha no login com Google.');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao sair da conta:', error);
    }
  };

  // Verificação se o usuário está logado
  if (usuarioAtual) {
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
          <h2
            className="text-2xl font-semibold text-center mb-6"
            style={{ color: '#124f62' }}
          >
            Você já está logado!
          </h2>
          <p className="text-center mb-6" style={{ color: '#6c6a81' }}>
            Deseja ir para o dashboard ou sair da conta?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Ir para o Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <FaLock size={64} color="#124f62" />
        </div>

        <h2
          className="text-2xl font-semibold text-center mb-6"
          style={{ color: '#124f62' }}
        >
          Bem-vindo de Volta!
        </h2>

        {error && (
          <div
            className="px-4 py-3 rounded mb-4 text-center"
            style={{ backgroundColor: '#f8d7da', color: '#721c24' }}
          >
            {error}
          </div>
        )}

        {/* Formulário de Login com Email e Senha */}
        <form onSubmit={handleLogin} className="space-y-4">
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
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Botões de Login Alternativo */}
        <div className="mt-6 flex flex-col space-y-4">
          <button
            onClick={handleGoogleLogin}
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
            Entrar com Google
          </button>
        </div>

        {/* Link para Cadastro */}
        <p className="mt-6 text-center" style={{ color: '#6c6a81' }}>
          Não tem uma conta?{' '}
          <Link to="/cadastro" style={{ color: '#4cad87' }} className="font-medium hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
