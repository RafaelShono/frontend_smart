// Configuração da API
const API_CONFIG = {
  // Detectar ambiente
  isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
  
  // URLs base
  get baseURL() {
    return this.isDevelopment 
      ? 'http://localhost:5000' 
      : 'https://backend-smart-ys4l.onrender.com';
  },
  
  // Endpoints
  endpoints: {
    generateTheme: '/api/generate-theme-ai',
    analyze: '/analyze',
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
