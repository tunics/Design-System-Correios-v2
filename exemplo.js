// Função para extrair variáveis CSS por prefixo
function obterCoresDoCSS(prefixo) {
  const cores = {};
  const variantes = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const root = getComputedStyle(document.documentElement);

  variantes.forEach((variante) => {
    const nomeVariavel = `--${prefixo}${variante}`;
    cores[variante] = root.getPropertyValue(nomeVariavel).trim();
  });

  return cores;
}

// Função para calcular luminância e retornar classe de contraste
function obterClasseContraste(corHex) {
  // Remove # se existir
  const cor = corHex.replace('#', '');

  // Converte hex para RGB
  const r = parseInt(cor.substring(0, 2), 16) / 255;
  const g = parseInt(cor.substring(2, 4), 16) / 255;
  const b = parseInt(cor.substring(4, 6), 16) / 255;

  // Calcula luminância relativa (WCAG)
  const luminancia = 0.299 * r + 0.587 * g + 0.114 * b;

  // Se luminância é alta (fundo claro), retorna texto escuro
  // Se luminância é baixa (fundo escuro), retorna texto claro
  return luminancia > 0.39 ? 'texto-escuro' : 'texto-claro';
}

// Função para renderizar paleta de cores
function renderizarPaleta(paleta, seletor, nomePaleta) {
  const divPaleta = document.querySelector(seletor);
  
  Object.entries(paleta).forEach(([variante, valor]) => {
    const div = document.createElement('div');
    div.className = 'cor';

    // Obtém a classe de contraste baseado na cor de fundo
    const classeContraste = obterClasseContraste(valor);

    div.innerHTML = `
      <div data-cor="${valor}" style="background-color: ${valor}" class="${classeContraste}">${variante}</div>
      <div class="titulo-cor">${valor}</div>
    `;
    divPaleta.appendChild(div);
  });
}

// Função auxiliar para encontrar o nome da variável CSS a partir da cor
function obterNomeVariavelCSS(cor, root) {
  // Converte rgb para hex se necessário
  const corHex = rgbParaHex(cor);
  
  // Percorre todas as variáveis CSS de cores
  const prefixos = ['primaria', 'secundaria', 'erro', 'neutra', 'neutra-var'];
  const variantes = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  
  for (let prefixo of prefixos) {
    for (let variante of variantes) {
      const nomeVariavel = `--${prefixo}${variante}`;
      const valorVariavel = root.getPropertyValue(nomeVariavel).trim();
      
      if (valorVariavel && rgbParaHex(valorVariavel) === corHex) {
        return nomeVariavel;
      }
    }
  }
  
  return 'variável desconhecida';
}

// Função auxiliar para converter RGB para HEX
function rgbParaHex(cor) {
  // Se já é hex, retorna como está
  if (cor.startsWith('#')) {
    return cor.toLowerCase();
  }
  
  // Se é rgb, converte para hex
  const match = cor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (match) {
    const r = parseInt(match[1]).toString(16).padStart(2, '0');
    const g = parseInt(match[2]).toString(16).padStart(2, '0');
    const b = parseInt(match[3]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`.toLowerCase();
  }
  
  return cor;
}

// Objetos com as variantes de cores do CSS
const corPrimaria = obterCoresDoCSS('primaria');
const corSecundaria = obterCoresDoCSS('secundaria');
const corErro = obterCoresDoCSS('erro');
const corNeutro = obterCoresDoCSS('neutra');
const corNeutroVar = obterCoresDoCSS('neutra-var');

// Somente um exemplo para mostrar o login
const btnEntrar = document.getElementById('btn-entrar');
const btnSair = document.getElementById('btn-sair');

btnEntrar.addEventListener('click', function () {
  definirAutenticacao('logado');
});

btnSair.addEventListener('click', function () {
  definirAutenticacao('deslogado');
  window.MenuTemp?.closeAll();
});

// Renderiza todas as paletas de cores
renderizarPaleta(corPrimaria, '#cor-primaria', 'Primária');
renderizarPaleta(corSecundaria, '#cor-secundaria', 'Secundária');
renderizarPaleta(corErro, '#cor-erro', 'Erro');
renderizarPaleta(corNeutro, '#cor-neutra', 'Neutro');
renderizarPaleta(corNeutroVar, '#cor-neutra-var', 'Neutro Variante');
