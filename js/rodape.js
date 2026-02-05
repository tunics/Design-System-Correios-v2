/* Toggle de conteúdo escondido no footer (mobile) */
function inicializarToggleFooter() {
  const isMobile = () => window.innerWidth <= 799;
  
  const titulosComEsconde = document.querySelectorAll('.titulo-rodape[data-esconde]');
  
  titulosComEsconde.forEach(titulo => {
    const escondValue = titulo.getAttribute('data-esconde');
    const esconde = document.querySelector(`div.esconde[data-esconde="${escondValue}"]`);
    
    if (!esconde) return;
    
    // Clicar no título
    titulo.addEventListener('click', (e) => {
      if (!isMobile()) return;
      
      e.preventDefault();
      toggleEsconde(esconde, titulo);
    });
    
    // Clicar em botão dentro do título
    const botaoNoTitulo = titulo.querySelector('button');
    if (botaoNoTitulo) {
      botaoNoTitulo.addEventListener('click', (e) => {
        if (!isMobile()) return;
        
        e.stopPropagation();
        toggleEsconde(esconde, titulo);
      });
    }
  });
}

function toggleEsconde(esconde, titulo) {
  const botaoNoTitulo = titulo.querySelector('button');
  
  if (esconde.classList.contains('aberto')) {
    // Fechando: animar e depois hide
    esconde.classList.remove('aberto');
    botaoNoTitulo?.classList.remove('ativo');
    
    // Esperar animação terminar para ocultar
    esconde.addEventListener('transitionend', function handleTransitionEnd() {
      esconde.style.display = 'none';
      esconde.removeEventListener('transitionend', handleTransitionEnd);
    }, { once: true });
  } else {
    // Abrindo: mostrar e depois animar
    esconde.style.display = 'flex';
    // Forçar reflow para aplicar display antes da animação
    esconde.offsetHeight;
    esconde.classList.add('aberto');
    botaoNoTitulo?.classList.add('ativo');
  }
}

function tratarResizeFooter() {
  const isMobile = window.innerWidth <= 799;
  const escondes = document.querySelectorAll('footer .esconde');
  const titulos = document.querySelectorAll('.titulo-rodape button');

  if (!isMobile) {
    // Desktop: tudo aberto, sem firula
    escondes.forEach(esconde => {
      esconde.style.display = 'flex';
      esconde.classList.remove('aberto');
      esconde.style.maxHeight = '';
      esconde.style.opacity = '';
    });

    titulos.forEach(btn => btn.classList.remove('ativo'));
  } else {
    // Mobile: deixa fechado por padrão
    escondes.forEach(esconde => {
      esconde.style.display = 'none';
      esconde.classList.remove('aberto');
    });
  }
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  inicializarToggleFooter();
  tratarResizeFooter();
});

// Readicionar listeners ao redimensionar (para detectar mudança mobile/desktop)
window.addEventListener('resize', tratarResizeFooter);
