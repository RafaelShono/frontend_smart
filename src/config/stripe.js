// Stripe configuration with environment detection
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const STRIPE_CONFIG = {
  // Use test keys for development, live keys for production
  publishableKey: isDevelopment 
    ? 'pk_test_51QRFxIJMbU7uvnrj4ntXZiEp8QN9o7TlONkhwR142XW5sdbUw6oPiDngmRlA0KAxyjawA3SXNRwJBLOz0ndDroin00P24GLQeB'
    : 'pk_live_51QRFxIJMbU7uvnrj4ntXZiEp8QN9o7TlONkhwR142XW5sdbUw6oPiDngmRlA0KAxyjawA3SXNRwJBLOz0ndDroin00P24GLQeB',
  
  // Environment info
  isDevelopment,
  isProduction: !isDevelopment
};

export default STRIPE_CONFIG;
