import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Componente Card reutilizável com animações e variantes
 * @param {string} variant - Variante do card: 'default', 'elevated', 'outlined', 'glass'
 * @param {boolean} hoverable - Se o card deve ter efeito hover
 * @param {React.ReactNode} children - Conteúdo do card
 * @param {object} motionProps - Props do Framer Motion
 */
function Card({ 
  variant = 'default', 
  hoverable = true,
  children, 
  className = '',
  motionProps = {},
  ...props 
}) {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white border border-gray-200 shadow-sm',
    elevated: 'bg-white border border-gray-200 shadow-lg',
    outlined: 'bg-white border-2 border-gray-300 shadow-none',
    glass: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-lg'
  };

  const hoverClasses = hoverable ? 'hover:shadow-xl hover:-translate-y-1' : '';

  const defaultMotionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const combinedMotionProps = { ...defaultMotionProps, ...motionProps };

  return (
    <motion.div
      className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`}
      {...combinedMotionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Componente CardHeader para cabeçalhos de cards
 */
function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Componente CardBody para corpo dos cards
 */
function CardBody({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Componente CardFooter para rodapés dos cards
 */
function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 border-t border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

Card.propTypes = {
  variant: PropTypes.oneOf(['default', 'elevated', 'outlined', 'glass']),
  hoverable: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  motionProps: PropTypes.object
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Card;
