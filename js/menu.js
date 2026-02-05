const menuBtn = document.getElementById("btn-menu");
const menuBtnDentro = document.getElementById("btn-menu-dentro");
const menu = document.getElementById("menu");

let overlayMenu = null;

const criarOverlay = () => {
  if (overlayMenu) return overlayMenu;
  overlayMenu = document.createElement("div");
  overlayMenu.className = "overlay-menu";
  overlayMenu.addEventListener("click", fecharMenu);
  menu.appendChild(overlayMenu);
  return overlayMenu;
};

function destruirOverlay() {
  if (!overlayMenu) return;
  overlayMenu.removeEventListener("click", fecharMenu);
  overlayMenu.remove();
  overlayMenu = null;
}

function abrirMenu() {
  criarOverlay();
  menu.classList.add("menu-aberto");
  overlayMenu.classList.add("is-on");
  menuBtnDentro?.focus();
}

function fecharMenu() {
  menu.classList.remove("menu-aberto");
  overlayMenu?.classList.remove("is-on");
  menuBtn?.focus();
}

function toggleMenu() {
  if (menu.classList.contains("menu-aberto")) fecharMenu();
  else abrirMenu();
}

menuBtn?.addEventListener("click", toggleMenu);
menuBtnDentro?.addEventListener("click", toggleMenu);

/* Aplicar o estado inicial do menu */
function aplicarEstadoInicial() {
  const isMobile = window.innerWidth <= 899;
  const estadoInicial = menu.getAttribute('data-menu-inicial');
  
  // No mobile, sempre fechado
  if (isMobile) {
    fecharMenu();
    return;
  }
  
  // No desktop, aplicar o estado sinalizado (padrão: fechado)
  if (estadoInicial === 'aberto') {
    abrirMenu();
  } else {
    fecharMenu();
  }
}

// Aplicar estado inicial ao carregar
window.addEventListener('DOMContentLoaded', aplicarEstadoInicial);

// Reaplicar estado inicial quando redimensionar (para ajustar entre mobile/desktop)
window.addEventListener('resize', aplicarEstadoInicial);

/* Toggle de subitens do menu */
function inicializarToggleSub() {
  const botoesComSub = document.querySelectorAll('button[data-sub]');
  
  botoesComSub.forEach(botao => {
    const subValue = botao.getAttribute('data-sub');
    const secao = document.querySelector(`section[data-sub="${subValue}"]`);
    
    if (secao) {
      // Aplicar estado inicial do HTML
      const isAberto = secao.classList.contains('aberto');
      botao.setAttribute('aria-expanded', isAberto);
      
      // Listener para toggle
      botao.addEventListener('click', (e) => {
        e.preventDefault();
        secao.classList.toggle('aberto');
        botao.setAttribute('aria-expanded', secao.classList.contains('aberto'));
      });
    }
  });
}

/* Marcar o item do menu ativo */
function ativarMenuAtivo() {
  const currentPath = window.location.pathname.replace(/\/$/, '');
  const currentHash = window.location.hash;
  const linksMenu = document.querySelectorAll('#menu a[href]');
  
  linksMenu.forEach(link => {
    try {
      const linkUrl = new URL(link.href, window.location.href);
      const linkPath = linkUrl.pathname.replace(/\/$/, '');
      const linkHash = linkUrl.hash; // inclui '#' ou '' se vazio
      
      // Comparar pathname
      const samePath = linkPath === currentPath;
      
      // Se tem hash na URL atual, comparar com hash do link
      if (currentHash) {
        if (samePath && linkHash === currentHash) {
          link.classList.add('ativo');
          abrirSectionPai(link);
        } else {
          link.classList.remove('ativo');
        }
      } else {
        // Se não tem hash, ativar se o caminho for igual
        if (samePath && !linkHash) {
          link.classList.add('ativo');
          abrirSectionPai(link);
        } else {
          link.classList.remove('ativo');
        }
      }
    } catch (e) {
      // Fallback para links com hash puro
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#') && href === currentHash) {
        link.classList.add('ativo');
        abrirSectionPai(link);
      } else {
        link.classList.remove('ativo');
      }
    }
  });
}

/* Abrir a section pai se o link estiver dentro de subitens */
function abrirSectionPai(link) {
  const sectionPai = link.closest('section.subitens');
  if (!sectionPai) return;
  
  sectionPai.classList.add('aberto');
  
  // Atualizar o botão correspondente
  const dataSubValue = sectionPai.getAttribute('data-sub');
  const botao = document.querySelector(`button[data-sub="${dataSubValue}"]`);
  if (botao) {
    botao.setAttribute('aria-expanded', 'true');
  }
}

function ativarMenuPorAncora() {
  // Pegar todos os links do menu que têm hash (incluindo links com pathname + hash)
  const todosLinks = document.querySelectorAll('#menu a[href]');
  const linksComHash = Array.from(todosLinks).filter(link => {
    const href = link.getAttribute('href') || '';
    return href.includes('#');
  });
  
  const secoes = [];

  linksComHash.forEach(link => {
    try {
      const linkUrl = new URL(link.href, window.location.href);
      const hash = linkUrl.hash.slice(1); // remove #
      const secao = document.getElementById(hash);
      
      if (secao) {
        secoes.push({ link, secao, hash });
      }
    } catch (e) {
      // Fallback para hash puro
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        const hash = href.slice(1);
        const secao = document.getElementById(hash);
        if (secao) {
          secoes.push({ link, secao, hash });
        }
      }
    }

    // Clique manual (feedback imediato)
    link.addEventListener('click', () => {
      linksComHash.forEach(l => l.classList.remove('ativo'));
      link.classList.add('ativo');
      abrirSectionPai(link);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const item = secoes.find(s => s.secao === entry.target);
        if (!item) return;

        linksComHash.forEach(l => l.classList.remove('ativo'));
        item.link.classList.add('ativo');
        abrirSectionPai(item.link);
      });
    },
    {
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0
    }
  );

  secoes.forEach(({ secao }) => observer.observe(secao));
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  ativarMenuAtivo();
  inicializarToggleSub();
  ativarMenuPorAncora();
});

// Atualizar quando o hash muda (navegação por âncora)
window.addEventListener('hashchange', ativarMenuAtivo);