// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/Login/SignupPage';
import Dashboard from './components/Dashboard/Dashboard';
import PracticePage from './components/Practice/PracticePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header/Header';
import ComoFunciona from './components/ComoFunciona/ComoFunciona'; 
import MinhasRedacoes from './components/MinhasRedacoes/MinhasRedacoes';
import Plano from './components/PlanoPago/Plano';
import Contato from './components/Contato/Contato';
import CanceladoPage from './components/Cancelar/Cancelar';
import SucessoPage from './components/Sucesso/Sucesso';
import PrivacyPolicy from './components/Privacy/Privacy';
import TermsOfService from './components/Terms/Terms';
import Support from './components/Support/Support';
import FAQ from './components/FAQ/FAQ';
import Tutorial from './components/Tutorial/Tutorial';
import Legal from './components/Legal/Legal';
import Cookies from './components/Cookies/Cookies';
import Test from './components/Test/Test';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<SignupPage />} />
        <Route path="/comofunciona" element={<ComoFunciona />} />
        <Route path="/Contato" element={<Contato />} />
        <Route path="/cancelado" element={<CanceladoPage />} />
        <Route path="/sucesso" element={<SucessoPage />} />
        <Route path="/privacidade" element={<PrivacyPolicy />} />
        <Route path="/termos" element={<TermsOfService />} />
        <Route path="/suporte" element={<Support />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/teste" element={<Test />} />
      </Routes>
      
    </>
  );
}

export default App;
