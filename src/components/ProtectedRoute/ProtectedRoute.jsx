// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { usuarioAtual } = useAuth();
  return usuarioAtual ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
