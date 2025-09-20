import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Componente Sidebar reutilizável para barras laterais
 * @param {string} position - Posição da sidebar: 'left', 'right'
 * @param {boolean} sticky - Se a sidebar deve ser sticky
 * @param {React.ReactNode} children - Conteúdo da sidebar
 */
function Sidebar({ 
  position = 'right', 
  sticky = true,
  children, 
  className = '',
  ...props 
}) {
  const baseClasses = 'bg-white border border-gray-200 rounded-2xl shadow-lg';
  const positionClasses = position === 'left' ? 'lg:order-first' : 'lg:order-last';
  const stickyClasses = sticky ? 'lg:sticky lg:top-6' : '';

  return (
    <motion.aside
      className={`${baseClasses} ${positionClasses} ${stickyClasses} ${className}`}
      initial={{ opacity: 0, x: position === 'right' ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      {...props}
    >
      {children}
    </motion.aside>
  );
}

/**
 * Componente SidebarHeader para cabeçalhos de sidebars
 */
function SidebarHeader({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Componente SidebarBody para corpo das sidebars
 */
function SidebarBody({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Componente SidebarFooter para rodapés das sidebars
 */
function SidebarFooter({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 border-t border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Componente SidebarSection para seções dentro da sidebar
 */
function SidebarSection({ title, children, className = '', ...props }) {
  return (
    <div className={`mb-6 ${className}`} {...props}>
      {title && (
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

Sidebar.Header = SidebarHeader;
Sidebar.Body = SidebarBody;
Sidebar.Footer = SidebarFooter;
Sidebar.Section = SidebarSection;

Sidebar.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  sticky: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

SidebarHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

SidebarBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

SidebarFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

SidebarSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Sidebar;
