import React, { useState, useEffect } from 'react';

const RedacaoAnalyzer = ({ redacao, analise }) => {
  const [textoMarcado, setTextoMarcado] = useState('');
  const [marcacaoSelecionada, setMarcacaoSelecionada] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [problemasResolvidos, setProblemasResolvidos] = useState(new Set());
  const [analiseDetalhada, setAnaliseDetalhada] = useState(null);

  const categorias = {
    ortografia: { cor: '#ff4757', icone: '🔴', titulo: 'Ortografia/Gramática' },
    conectivos: { cor: '#ff6348', icone: '🟠', titulo: 'Conectivos/Coesão' },
    repeticoes: { cor: '#feca57', icone: '🟡', titulo: 'Repetições' },
    vocabulario: { cor: '#3742fa', icone: '🔵', titulo: 'Vocabulário' },
    estrutura: { cor: '#5f27cd', icone: '🟣', titulo: 'Estrutura' },
    pontoForte: { cor: '#00d2d3', icone: '🟢', titulo: 'Pontos Fortes' }
  };

  // Função para analisar o texto e identificar problemas
  const analisarTexto = (texto) => {
    if (!texto) return { marcacoes: [], estatisticas: { totalProblemas: 0, problemasResolvidos: 0, pontosFortesIdentificados: 0 } };

    const marcacoes = [];
    let id = 1;

    // Padrões de erros comuns - baseados no texto real
    const errosOrtografia = [
      { padrao: /\bagriculae\b/g, correcao: 'agrícola', problema: 'Erro de ortografia: "agriculae" → "agrícola"' },
      { padrao: /\bmedidades\b/g, correcao: 'medidas', problema: 'Erro de ortografia: "medidades" → "medidas"' },
      { padrao: /\bfamilhiar\b/g, correcao: 'familiar', problema: 'Erro de ortografia: "familhiar" → "familiar"' },
      { padrao: /\bsaudavéis\b/g, correcao: 'saudáveis', problema: 'Erro de ortografia: "saudavéis" → "saudáveis"' },
      { padrao: /\bregião\b/g, correcao: 'regiões', problema: 'Concordância: "região" → "regiões"' },
      { padrao: /\bpopulassão\b/g, correcao: 'população', problema: 'Erro de ortografia: "populassão" → "população"' },
      { padrao: /\bmedo\b/g, correcao: 'meio', problema: 'Erro de ortografia: "medo" → "meio"' },
      { padrao: /\bpodera\b/g, correcao: 'poderá', problema: 'Falta acento: "podera" → "poderá"' },
      { padrao: /\bgarante\b/g, correcao: 'garantir', problema: 'Conjugação: "garante" → "garantir"' },
      { padrao: /\bvaria\w*\b/g, correcao: 'vários', problema: 'Erro de ortografia: "varia" → "vários"' },
      { padrao: /\borganiza\b/g, correcao: 'organizem', problema: 'Concordância: "organiza" → "organizem"' },
      { padrao: /\bpasse\b/g, correcao: 'passem', problema: 'Concordância: "passe" → "passem"' },
      { padrao: /\bprejudica\b/g, correcao: 'prejudique', problema: 'Concordância: "prejudica" → "prejudique"' },
      { padrao: /\bnecessario\b/g, correcao: 'necessário', problema: 'Falta acento: "necessario" → "necessário"' },
      { padrao: /\bmelhora\b/g, correcao: 'melhorar', problema: 'Conjugação: "melhora" → "melhorar"' },
      { padrao: /\bsaude\b/g, correcao: 'saúde', problema: 'Falta acento: "saude" → "saúde"' },
      { padrao: /\brecebe\b/g, correcao: 'recebem', problema: 'Concordância: "recebe" → "recebem"' },
      { padrao: /\bpobre\b/g, correcao: 'pobres', problema: 'Concordância: "pobre" → "pobres"' },
      { padrao: /\bsofre\b/g, correcao: 'sofrem', problema: 'Concordância: "sofre" → "sofrem"' },
      { padrao: /\bpodia\b/g, correcao: 'poderiam', problema: 'Conjugação: "podia" → "poderiam"' },
      { padrao: /\bajuda\b/g, correcao: 'ajudar', problema: 'Conjugação: "ajuda" → "ajudar"' },
      { padrao: /\bpopulação\b/g, correcao: 'populações', problema: 'Concordância: "população" → "populações"' },
      { padrao: /\bfaz\b/g, correcao: 'faça', problema: 'Concordância: "faz" → "faça"' },
      { padrao: /\bcompreenda\b/g, correcao: 'compreendam', problema: 'Concordância: "compreenda" → "compreendam"' },
      { padrao: /\balimenta\b/g, correcao: 'alimentar', problema: 'Conjugação: "alimenta" → "alimentar"' },
      { padrao: /\binvista\b/g, correcao: 'invista', problema: 'Conjugação: "invista" → "invista"' },
      { padrao: /\bregulamente\b/g, correcao: 'regulamente', problema: 'Conjugação: "regulamente" → "regulamente"' },
      { padrao: /\bsaudavél\b/g, correcao: 'saudável', problema: 'Erro de ortografia: "saudavél" → "saudável"' },
      { padrao: /\btenha\b/g, correcao: 'tenham', problema: 'Concordância: "tenha" → "tenham"' }
    ];

    // Padrões de repetições - mais específicos
    const repeticoes = [
      { padrao: /\balimentos?\b/gi, problema: 'Palavra "alimento(s)" repetida muitas vezes', limite: 4 },
      { padrao: /\bprodução\b/gi, problema: 'Palavra "produção" repetida muitas vezes', limite: 3 },
      { padrao: /\bgoverno\b/gi, problema: 'Palavra "governo" repetida muitas vezes', limite: 3 },
      { padrao: /\bpopulação\b/gi, problema: 'Palavra "população" repetida muitas vezes', limite: 3 }
    ];

    // Padrões de conectivos - mais específicos
    const conectivos = [
      { padrao: /\bPor isso\b/g, problema: 'Conectivo "Por isso" pode ser variado', sugestao: 'Use "Dessa forma", "Nesse sentido" ou "Assim"' },
      { padrao: /\bAlém disso\b/g, problema: 'Conectivo "Além disso" pode ser variado', sugestao: 'Use "Ademais", "Outrossim" ou "Também"' },
      { padrao: /\bPortanto\b/g, problema: 'Conectivo "Portanto" pode ser variado', sugestao: 'Use "Dessa forma", "Assim sendo" ou "Logo"' }
    ];

    // Analisar erros ortográficos
    errosOrtografia.forEach(erro => {
      let match;
      while ((match = erro.padrao.exec(texto)) !== null) {
        marcacoes.push({
          id: id++,
          inicio: match.index,
          fim: match.index + match[0].length,
          trechoOriginal: match[0],
          categoria: 'ortografia',
          problema: erro.problema,
          sugestao: `Use "${erro.correcao}" no lugar de "${match[0]}"`,
          gravidade: 'alta'
        });
      }
    });

    // Analisar repetições
    repeticoes.forEach(rep => {
      const matches = [...texto.matchAll(rep.padrao)];
      if (matches.length > (rep.limite || 3)) {
        matches.forEach(match => {
          marcacoes.push({
            id: id++,
            inicio: match.index,
            fim: match.index + match[0].length,
            trechoOriginal: match[0],
            categoria: 'repeticoes',
            problema: rep.problema,
            sugestao: 'Use sinônimos para variar o vocabulário',
            gravidade: 'media'
          });
        });
      }
    });

    // Analisar conectivos
    conectivos.forEach(conectivo => {
      let match;
      while ((match = conectivo.padrao.exec(texto)) !== null) {
        marcacoes.push({
          id: id++,
          inicio: match.index,
          fim: match.index + match[0].length,
          trechoOriginal: match[0],
          categoria: 'conectivos',
          problema: conectivo.problema,
          sugestao: conectivo.sugestao,
          gravidade: 'baixa'
        });
      }
    });

    // Identificar pontos fortes
    const pontosFortes = [
      { padrao: /\bIntrodução:\s*[^.]*\./g, problema: 'Boa estrutura com introdução clara' },
      { padrao: /\bDesenvolvimento \d+:/g, problema: 'Boa organização em parágrafos de desenvolvimento' },
      { padrao: /\bConclusão e proposta de intervenção:/g, problema: 'Excelente conclusão com proposta de intervenção' }
    ];

    pontosFortes.forEach(ponto => {
      let match;
      while ((match = ponto.padrao.exec(texto)) !== null) {
        marcacoes.push({
          id: id++,
          inicio: match.index,
          fim: match.index + match[0].length,
          trechoOriginal: match[0],
          categoria: 'pontoForte',
          problema: ponto.problema,
          sugestao: 'Continue mantendo essa estrutura!',
          gravidade: 'baixa'
        });
      }
    });

    return {
      marcacoes,
      estatisticas: {
        totalProblemas: marcacoes.filter(m => m.categoria !== 'pontoForte').length,
        problemasResolvidos: 0,
        pontosFortesIdentificados: marcacoes.filter(m => m.categoria === 'pontoForte').length
      }
    };
  };

  useEffect(() => {
    if (redacao) {
      const analiseReal = analisarTexto(redacao);
      setAnaliseDetalhada(analiseReal);
    }
  }, [redacao]);

  useEffect(() => {
    aplicarMarcacoes();
  }, [filtroCategoria, problemasResolvidos, analiseDetalhada]);

  const aplicarMarcacoes = () => {
    if (!redacao || !analiseDetalhada) return;
    
    let texto = redacao;
    let offset = 0;
    
    const marcacoesFiltradas = analiseDetalhada.marcacoes?.filter(m => 
      filtroCategoria === 'todos' || m.categoria === filtroCategoria
    ) || [];

    const marcacoesOrdenadas = [...marcacoesFiltradas].sort((a, b) => a.inicio - b.inicio);

    marcacoesOrdenadas.forEach(marcacao => {
      if (problemasResolvidos.has(marcacao.id)) return;

      const inicio = marcacao.inicio + offset;
      const fim = marcacao.fim + offset;
      const cor = categorias[marcacao.categoria]?.cor || '#000';
      
      const spanInicio = `<span 
        class="marcacao" 
        data-id="${marcacao.id}"
        data-categoria="${marcacao.categoria}"
        style="background-color: ${cor}40; border-bottom: 2px solid ${cor}; cursor: pointer; position: relative;"
        onmouseover="this.style.backgroundColor='${cor}60'"
        onmouseout="this.style.backgroundColor='${cor}40'"
      >`;
      const spanFim = '</span>';

      texto = texto.slice(0, inicio) + spanInicio + texto.slice(inicio, fim) + spanFim + texto.slice(fim);
      offset += spanInicio.length + spanFim.length;
    });

    setTextoMarcado(texto);
  };

  const resolverProblema = (id) => {
    setProblemasResolvidos(prev => new Set([...prev, id]));
    setMarcacaoSelecionada(null);
  };

  const getMarcacoesPorCategoria = (categoria) => {
    return analiseDetalhada?.marcacoes?.filter(m => 
      m.categoria === categoria && !problemasResolvidos.has(m.id)
    ) || [];
  };

  const handleTextoClick = (e) => {
    const marcacao = e.target.closest('.marcacao');
    if (marcacao) {
      const id = parseInt(marcacao.dataset.id);
      const marcacaoData = analiseDetalhada?.marcacoes?.find(m => m.id === id);
      setMarcacaoSelecionada(marcacaoData);
    }
  };

  if (!redacao || !analiseDetalhada) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Analisando redação...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Área principal - Texto com marcações */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">📝 Redação com Marcações</h2>
              <p className="text-gray-600 text-sm">Clique nas marcações coloridas para ver detalhes e sugestões</p>
            </div>
            <div className="flex gap-3">
              <select 
                value={filtroCategoria} 
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">🔍 Todos os problemas</option>
                <option value="ortografia">🔴 Ortografia</option>
                <option value="conectivos">🟠 Conectivos</option>
                <option value="repeticoes">🟡 Repetições</option>
                <option value="vocabulario">🔵 Vocabulário</option>
                <option value="estrutura">🟣 Estrutura</option>
                <option value="pontoForte">🟢 Pontos Fortes</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                👁️ Visualizar
              </button>
            </div>
          </div>
          
          <div 
            className="prose max-w-none leading-relaxed text-gray-800 text-base whitespace-pre-wrap"
            onClick={handleTextoClick}
            dangerouslySetInnerHTML={{ __html: textoMarcado }}
            style={{ 
              lineHeight: '1.8',
              fontSize: '16px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              padding: '20px',
              backgroundColor: '#fafafa',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}
          />

          {marcacaoSelecionada && (
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{categorias[marcacaoSelecionada.categoria]?.icone}</span>
                    <span className="font-semibold text-gray-800">
                      {categorias[marcacaoSelecionada.categoria]?.titulo}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      marcacaoSelecionada.gravidade === 'alta' ? 'bg-red-100 text-red-700' :
                      marcacaoSelecionada.gravidade === 'media' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {marcacaoSelecionada.gravidade}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-1">
                    <strong>Trecho:</strong> "{marcacaoSelecionada.trechoOriginal}"
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Problema:</strong> {marcacaoSelecionada.problema}
                  </p>
                  <p className="text-green-700">
                    <strong>Sugestão:</strong> {marcacaoSelecionada.sugestao}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  {marcacaoSelecionada.categoria !== 'pontoForte' && (
                    <button 
                      onClick={() => resolverProblema(marcacaoSelecionada.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                      ✅ Resolver
                    </button>
                  )}
                  <button 
                    onClick={() => setMarcacaoSelecionada(null)}
                    className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Painel lateral - Feedback */}
      <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-xl font-bold text-gray-800 mb-3">📊 Análise Detalhada</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {(analiseDetalhada.estatisticas?.totalProblemas || 0) - problemasResolvidos.size}
              </div>
              <div className="text-sm font-medium text-red-700">Problemas</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{problemasResolvidos.size}</div>
              <div className="text-sm font-medium text-green-700">Resolvidos</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {analiseDetalhada.estatisticas?.pontosFortesIdentificados || 0}
              </div>
              <div className="text-sm font-medium text-blue-700">Acertos</div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {Object.entries(categorias).map(([categoria, config]) => {
            const itens = getMarcacoesPorCategoria(categoria);
            if (itens.length === 0) return null;

            return (
              <div key={categoria} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div 
                  className="p-4 cursor-pointer"
                  style={{ backgroundColor: `${config.cor}10` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{config.icone}</span>
                      <span className="font-semibold text-gray-800 text-base">{config.titulo}</span>
                      <span className="bg-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                        {itens.length}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="space-y-4">
                    {itens.map(item => (
                      <div 
                        key={item.id} 
                        className="cursor-pointer hover:bg-gray-50 p-4 rounded-lg border border-gray-100 transition-colors"
                        onClick={() => setMarcacaoSelecionada(item)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-mono text-sm text-gray-600 mb-2 p-2 bg-gray-100 rounded border-l-2 border-gray-300">
                              "{item.trechoOriginal}"
                            </div>
                            <div className="text-sm text-gray-800 mb-2 font-medium">
                              {item.problema}
                            </div>
                            <div className="text-sm text-green-700 bg-green-50 p-2 rounded border-l-2 border-green-300">
                              💡 {item.sugestao}
                            </div>
                          </div>
                          <div className="ml-3">
                            {categoria !== 'pontoForte' && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  resolverProblema(item.id);
                                }}
                                className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-full transition-colors"
                                title="Marcar como resolvido"
                              >
                                ✅
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t">
          <div className="text-base font-semibold text-gray-700 mb-3">💡 Dicas de Uso:</div>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Clique nas marcações coloridas para ver detalhes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Use o filtro para focar em tipos específicos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Marque problemas como resolvidos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span>Pontos verdes destacam seus acertos!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RedacaoAnalyzer;
