import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  FaPenFancy, 
  FaUser, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes, 
  FaTrophy, 
  FaChartLine, 
  FaBookOpen, 
  FaRobot,
  FaHome,
  FaCrown,
  FaChevronDown,
  FaRocket
} from 'react-icons/fa';
import '../../styles/design-system.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userData] = useState(null);
  const { usuarioAtual, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    // Fechar menus quando clicar fora
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
      if (!event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const navigationItems = [
    { path: '/praticar', label: 'Praticar', icon: FaPenFancy, requiresAuth: true },
    { path: '/dashboard', label: 'Dashboard', icon: FaChartLine, requiresAuth: true },
    { path: '/minhasRedacoes', label: 'Minhas Redações', icon: FaBookOpen, requiresAuth: true },
    { path: '/forum', label: 'Fórum', icon: FaTrophy, requiresAuth: true },
    { path: '/news-agent', label: 'Temas IA', icon: FaRobot, requiresAuth: true },
  ];

  const publicNavigationItems = [
    { path: '/comofunciona', label: 'Como Funciona', icon: FaHome },
    { path: '/Plano', label: 'Planos', icon: FaCrown },
    { path: '/Contato', label: 'Contato', icon: FaUser },
  ];

  return (
    <motion.header 
      className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaRocket className="text-white text-lg" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Redação Smart
                </span>
                <div className="text-xs text-gray-500 -mt-1">IA para ENEM</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {usuarioAtual ? (
              <>
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary-50 text-primary-600 font-medium shadow-sm'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <item.icon className="text-sm" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </>
            ) : (
              <>
                {publicNavigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <item.icon className="text-sm" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {usuarioAtual ? (
              <div className="relative user-menu-container">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <FaUser className="text-white text-sm" />
                    </div>
                    {userData?.planoAtivo && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                        <FaCrown className="text-yellow-800 text-xs" />
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {usuarioAtual.displayName || 'Usuário'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {userData?.planoAtivo ? 'Premium' : 'Gratuito'}
                    </div>
                  </div>
                  <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-200 ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 fade-in">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900">
                        {usuarioAtual.displayName || 'Usuário'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {usuarioAtual.email}
                      </div>
                    </div>
                    
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FaChartLine className="text-sm text-primary-600" />
                      <span>Dashboard</span>
                    </Link>
                    
                    <Link
                      to="/minhasRedacoes"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FaBookOpen className="text-sm text-primary-600" />
                      <span>Minhas Redações</span>
                    </Link>
                    
                    {!userData?.planoAtivo && (
                      <Link
                        to="/Plano"
                        className="flex items-center space-x-3 px-4 py-3 text-yellow-700 hover:bg-yellow-50 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FaCrown className="text-sm text-yellow-600" />
                        <span>Fazer Upgrade</span>
                      </Link>
                    )}
                    
                    <div className="border-t border-gray-100 my-2"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                    >
                      <FaSignOutAlt className="text-sm" />
                      <span>Sair</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-200 font-medium"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Começar Agora
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 mobile-menu-container"
          >
            {isMenuOpen ? <FaTimes className="text-gray-600" /> : <FaBars className="text-gray-600" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 mobile-menu-container">
            <nav className="flex flex-col space-y-1">
              {usuarioAtual ? (
                <>
                  {/* User Info */}
                  <div className="px-4 py-3 bg-gray-50 rounded-lg mx-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                        <FaUser className="text-white text-sm" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {usuarioAtual.displayName || 'Usuário'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {userData?.planoAtivo ? 'Premium' : 'Gratuito'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {navigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg mx-4 transition-colors duration-200 ${
                        isActive(item.path)
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="text-sm" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  
                  {!userData?.planoAtivo && (
                    <Link
                      to="/Plano"
                      className="flex items-center space-x-3 px-4 py-3 text-yellow-700 hover:bg-yellow-50 transition-colors duration-200 mx-4 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaCrown className="text-sm text-yellow-600" />
                      <span>Fazer Upgrade</span>
                    </Link>
                  )}
                  
                  <div className="border-t border-gray-200 my-2 mx-4"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 text-left mx-4 rounded-lg"
                  >
                    <FaSignOutAlt className="text-sm" />
                    <span>Sair</span>
                  </button>
                </>
              ) : (
                <>
                  {publicNavigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg mx-4 transition-colors duration-200 ${
                        isActive(item.path)
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="text-sm" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  
                  <div className="border-t border-gray-200 my-2 mx-4"></div>
                  
                  <Link
                    to="/login"
                    className="px-4 py-3 text-gray-600 hover:text-primary-600 transition-colors duration-200 mx-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  
                  <Link
                    to="/cadastro"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl mx-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Começar Agora
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </motion.header>
  );
}

export default Header;