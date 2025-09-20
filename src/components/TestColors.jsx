import React from 'react';

function TestColors() {
  return (
    <div className="p-8 space-y-4 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Teste de Cores</h1>
      
      {/* Teste de background */}
      <div className="p-4 bg-blue-500 text-white rounded-lg mb-4">
        Background azul básico (deve funcionar)
      </div>
      
      <div className="p-4 bg-primary-500 text-white rounded-lg mb-4">
        Background primary-500 (Tailwind)
      </div>
      
      <div className="p-4 test-bg-primary text-white rounded-lg mb-4">
        Background primary (CSS direto)
      </div>
      
      <div className="p-4 test-bg-secondary text-white rounded-lg mb-4">
        Background secondary (CSS direto)
      </div>
      
      <div className="p-4 test-gradient text-white rounded-lg mb-4">
        Background gradiente (CSS direto)
      </div>
      
      <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg mb-4">
        Background gradiente Tailwind (deve funcionar agora)
      </div>
      
      {/* Teste das cores primárias */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">Cores Primárias (Azul)</h2>
        <div className="flex space-x-2">
          <div className="w-16 h-16 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">500</div>
          <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">600</div>
          <div className="w-16 h-16 bg-primary-700 rounded-lg flex items-center justify-center text-white font-bold">700</div>
        </div>
      </div>

      {/* Teste das cores secundárias */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">Cores Secundárias (Lilás)</h2>
        <div className="flex space-x-2">
          <div className="w-16 h-16 bg-secondary-500 rounded-lg flex items-center justify-center text-white font-bold">500</div>
          <div className="w-16 h-16 bg-secondary-600 rounded-lg flex items-center justify-center text-white font-bold">600</div>
          <div className="w-16 h-16 bg-secondary-700 rounded-lg flex items-center justify-center text-white font-bold">700</div>
        </div>
      </div>

      {/* Teste das cores de sucesso */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">Cores de Sucesso (Verde)</h2>
        <div className="flex space-x-2">
          <div className="w-16 h-16 bg-success-500 rounded-lg flex items-center justify-center text-white font-bold">500</div>
          <div className="w-16 h-16 bg-success-600 rounded-lg flex items-center justify-center text-white font-bold">600</div>
          <div className="w-16 h-16 bg-success-700 rounded-lg flex items-center justify-center text-white font-bold">700</div>
        </div>
      </div>

      {/* Teste dos gradientes */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">Gradientes</h2>
        <div className="flex space-x-2">
          <div className="w-32 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold">Primary</div>
          <div className="w-32 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center text-white font-bold">Secondary</div>
          <div className="w-32 h-16 bg-gradient-to-r from-success-500 to-success-600 rounded-lg flex items-center justify-center text-white font-bold">Success</div>
        </div>
      </div>

      {/* Teste dos botões */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">Botões</h2>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300">
            Botão Primário
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl font-medium hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300">
            Botão Secundário
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-success-500 to-success-600 text-white rounded-xl font-medium hover:from-success-600 hover:to-success-700 transition-all duration-300">
            Botão Sucesso
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestColors;
