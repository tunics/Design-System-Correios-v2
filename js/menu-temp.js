/* Menu Temporário (MenuTemp)
 * HTML:
 *   <button class="btn-menu-temp" data-menu-temp="user" aria-expanded="false">...</button>
 *   <nav class="menu-temp" data-menu-temp="user" hidden>...</nav>
 */

(() => {
  const BTN = '.btn-menu-temp';
  const MENU = '.menu-temp';
  const OVERLAY_CLASS = 'overlay-menu-temp';

  let overlay = null;
  let openBtn = null;
  let openMenu = null;

  const getMenu = (key) =>
    document.querySelector(`${MENU}[data-menu-temp="${CSS.escape(key)}"]`);

  const ensureOverlay = () => {
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = OVERLAY_CLASS;
    overlay.addEventListener('click', closeAll);
    document.body.appendChild(overlay);
    return overlay;
  };

  const removeOverlay = () => {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
  };

  const position = (btn, menu) => {
    const gap = 16; // margem das bordas

    const rectBtn = btn.getBoundingClientRect();
    const parent = menu.offsetParent || document.body;
    const rectParent = parent.getBoundingClientRect();

    const containerLeft = rectParent.left + window.scrollX;
    const containerRight = rectParent.right + window.scrollX;

    // largura do menu (mais confiável que rect em alguns casos)
    const menuWidth = menu.offsetWidth;
    const menuheight = menu.offsetHeight;

    // posição base: alinhado à esquerda do botão
    let left = rectBtn.left - containerLeft;
    let top = rectBtn.bottom - rectParent.top;

    // se estourar à direita, empurra pra esquerda
    if (left + menuWidth + gap > containerRight) {
      left = containerRight - menuWidth - gap;
    }

    // se estourar à esquerda, trava
    if (left < containerLeft + gap) {
      left = containerLeft + gap;
    }

    // se estourar embaixo, abre pra cima
    if (top + menuheight > window.innerHeight + window.scrollY) {
      top = rectBtn.top - rectParent.top - menuheight;
    }

    // aplica em coordenadas do documento (scroll)
    menu.style.left = `${Math.round(left)}px`;
    menu.style.top = `${Math.round(top)}px`;
  };

  function closeAll() {
    if (openMenu) {
      openMenu.hidden = true;
      delete openMenu.dataset.open;
    }

    if (openBtn) {
      openBtn.setAttribute('aria-expanded', 'false');
      openBtn.focus();
    }

    openBtn = null;
    openMenu = null;
    removeOverlay();
  }

  function open(btn, menu) {
    // fecha o anterior
    if (openMenu && openMenu !== menu) closeAll();

    ensureOverlay();

    // acessibilidade básica
    const key = btn.dataset.menuTemp || '';
    if (!menu.id)
      menu.id = key ? `menu-temp-${key}` : `menu-temp-${Date.now()}`;
    btn.setAttribute('aria-controls', menu.id);

    menu.hidden = false;
    menu.dataset.open = 'true';
    position(btn, menu);
    btn.setAttribute('aria-expanded', 'true');

    menu.focus();

    openBtn = btn;
    openMenu = menu;
  }

  function toggle(btn, menu) {
    const isOpen = menu.dataset.open === 'true' && !menu.hidden;
    if (isOpen) closeAll();
    else open(btn, menu);
  }

  // Delegação: funciona até pra botões criados depois
  document.addEventListener('click', (e) => {
    const btn = e.target.closest(BTN);
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation(); // não deixa o clique “passar” pro overlay

    const key = btn.dataset.menuTemp;
    const menu = key ? getMenu(key) : null;
    if (!menu) return;

    toggle(btn, menu);
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest(MENU)) e.stopPropagation();
  });

  // ESC fecha (porque a gente tem educação)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });

  // Se quiser “API”, tá aqui:
  window.MenuTemp = { closeAll };
})();
