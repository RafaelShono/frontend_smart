// Configuração da API
const API_CONFIG = {
  // Detectar ambiente
  isDevelopment: typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'),
  
  // URLs base
  get baseURL() {
    // Fallback para produção se window não estiver disponível
    if (typeof window === 'undefined') {
      return 'https://backend-smart-ys4l.onrender.com';
    }
    
    // Verificar se estamos em desenvolvimento
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    const url = isDev 
      ? 'http://localhost:5001' 
      : 'https://backend-smart-ys4l.onrender.com';
    
    return url;
  },
  
  // Método para construir URLs completas de forma segura
  buildURL(endpoint) {
    const base = this.baseURL;
    if (!base || base === 'undefined') {
      console.error('API_CONFIG.baseURL is undefined, using fallback');
      return `https://backend-smart-ys4l.onrender.com${endpoint}`;
    }
    return `${base}${endpoint}`;
  },
  
  // Endpoints
  endpoints: {
    generateTheme: '/api/generate-theme-ai',
    analyze: '/api/analyze',
    generateThemes: '/api/generate-themes',
    themes: '/api/themes'
  },
  
  // URLs completas
  get urls() {
    return {
      generateTheme: `${this.baseURL}${this.endpoints.generateTheme}`,
      analyze: `${this.baseURL}${this.endpoints.analyze}`,
      generateThemes: `${this.baseURL}${this.endpoints.generateThemes}`,
      themes: `${this.baseURL}${this.endpoints.themes}`
    };
  }
};

export default API_CONFIG;
