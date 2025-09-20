// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/Login/SignupPage';
import Dashboard from './components/Dashboard/Dashboard';
import PracticePage from './components/Practice/PracticePage';
import Forum from './components/Forum/Forum';
import TopicDetail from './components/TopicDetail/TopicDetail';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header/Header';
import ComoFunciona from './components/ComoFunciona/ComoFunciona'; 
import MinhasRedacoes from './components/MinhasRedacoes/MinhasRedacoes';
import Plano from './components/PlanoPago/Plano';
import Contato from './components/Contato/Contato';
import CanceladoPage from './components/Cancelar/Cancelar';
import SucessoPage from './components/Sucesso/Sucesso';
import NewsAgent from './components/NewsAgent/NewsAgent';
import TestColors from './components/TestColors';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test-colors" element={<TestColors />} />
        <Route
          path="/praticar"
          element={
            <ProtectedRoute>
              <PracticePage />
            </ProtectedRoute>
          }
        />
        <Route path="/Plano" element={<Plano />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/minhasRedacoes"
          element={
            <ProtectedRoute>
              <MinhasRedacoes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forum"
          element={
            <ProtectedRoute>
              <Forum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forum/:id"
          element={
            <ProtectedRoute>
              <TopicDetail />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<SignupPage />} />
        <Route path="/comofunciona" element={<ComoFunciona />} />
        <Route path="/Contato" element={<Contato />} />
        <Route path="/cancelado" element={<CanceladoPage />} />
        <Route path="/sucesso" element={<SucessoPage />} />
        <Route
          path="/news-agent"
          element={
            <ProtectedRoute>
              <NewsAgent />
            </ProtectedRoute>
          }
        />
      </Routes>
      
    </>
  );
}

export default App;
