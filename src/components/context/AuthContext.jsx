import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [usuarioAtual, setUsuarioAtual] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [userDocumentCreated, setUserDocumentCreated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
      if (usuario && !userDocumentCreated) {
        // Criar ou atualizar documento do usuário no Firestore apenas uma vez
        await createOrUpdateUserDocument(usuario);
        setUserDocumentCreated(true);
      }
      setUsuarioAtual(usuario);
      setCarregando(false);
    });

    return unsubscribe;
  }, [userDocumentCreated]);

  // Função para criar ou atualizar documento do usuário
  const createOrUpdateUserDocument = async (usuario) => {
    try {
      const userRef = doc(db, 'users', usuario.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // Criar novo documento do usuário
        await setDoc(userRef, {
          uid: usuario.uid,
          email: usuario.email,
          nome: usuario.displayName || usuario.email?.split('@')[0] || 'Usuário',
          fotoURL: usuario.photoURL || '',
          redacoesEnviadas: 0,
          planoAtivo: false,
          dataCriacao: new Date(),
          ultimoAcesso: new Date()
        });
        console.log('Documento do usuário criado:', usuario.uid);
      } else {
        // Verificar se precisa atualizar o último acesso (apenas se passou mais de 1 hora)
        const userData = userSnap.data();
        const lastAccess = userData.ultimoAcesso?.toDate?.() || new Date(0);
        const now = new Date();
        const hoursSinceLastAccess = (now - lastAccess) / (1000 * 60 * 60);
        
        if (hoursSinceLastAccess >= 1) {
          await setDoc(userRef, {
            ultimoAcesso: new Date()
          }, { merge: true });
          console.log('Último acesso atualizado para:', usuario.uid);
        }
      }
    } catch (error) {
      console.error('Erro ao criar/atualizar documento do usuário:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserDocumentCreated(false); // Reset para permitir criação de documento em novo login
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ usuarioAtual, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
