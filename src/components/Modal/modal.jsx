// src/components/Modal.jsx

import React from 'react';
import { FaTimes } from 'react-icons/fa';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-full overflow-y-auto relative">
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
