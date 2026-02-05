(() => {
  const catalogUrl = 'icones/ic-traco.catalog.json';
  const overridesUrl = 'icones/ic-traco.overrides.json';
  const spriteUrl = 'icones/cds-ic-traco.sprite.svg';
  const downloadBaseUrl = 'icones/traco/';

  const normalizeText = (value) =>
    (value || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const createEl = (tag, className) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    return el;
  };

  const updateHighlight = (codeEl) => {
    if (!codeEl) return;
    if (window.hljs && typeof window.hljs.highlightElement === 'function') {
      window.hljs.highlightElement(codeEl);
    }
  };

  const fetchJson = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Falhou ${url} (${res.status})`);
    return res.json();
  };

  const fetchText = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Falhou ${url} (${res.status})`);
    return res.text();
  };

  // injeta a sprite no DOM (inline), pra <use href="#id">
  function mountInlineSprite(svgText) {
    if (document.getElementById('inline-sprite-traco')) return;

    const wrap = document.createElement('div');
    wrap.id = 'inline-sprite-traco';
    wrap.style.position = 'absolute';
    wrap.style.width = '0';
    wrap.style.height = '0';
    wrap.style.overflow = 'hidden';
    wrap.setAttribute('aria-hidden', 'true');

    // spriteText deve conter <svg><defs><symbol id="...">...
    wrap.innerHTML = svgText;

    document.body.prepend(wrap);
  }

  const parseSprite = (spriteText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(spriteText, 'image/svg+xml');
    const map = new Map();
    doc.querySelectorAll('symbol[id]').forEach((symbol) => {
      map.set(symbol.id, {
        id: symbol.id,
        viewBox: symbol.getAttribute('viewBox') || '0 0 48 48',
        content: symbol.innerHTML.trim(),
      });
    });
    return map;
  };

  const buildInlineSvg = (symbol) => {
    if (!symbol) return '';
    return `<svg class="ic-traco" role="img" viewBox="${symbol.viewBox}" xmlns="http://www.w3.org/2000/svg">${symbol.content}</svg>`;
  };

  const toDisplayName = (iconId) => {
    if (!iconId) return '';
    const trimmed = iconId.replace(/^ic-/, '').replace(/-stroke$/, '');
    const withSpaces = trimmed.replace(/[-_]+/g, ' ');
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.icones-traco');
    const searchInput = document.querySelector('#txt-input-ic');
    const tagsContainer = document.querySelector('#busca-tags');
    const legendEl = document.querySelector('.legenda');

    const aside = document.querySelector('aside');
    const asideIconUse = aside?.querySelector('use');
    const asideName = aside?.querySelector('h5');
    const asideFile = aside?.querySelector('small');
    const asideUseCode = document.querySelector('#codebox-codigo-use code');
    const closeAsideBtn = aside?.querySelector('.aside-topo .btn-txt');
    const downloadBtn = aside?.querySelector('.btn-pre');

    if (!container || !searchInput || !tagsContainer) {
      console.warn(
        'Não achei .icones-traco, #txt-input-ic ou #busca-tags. Confere teu HTML.',
      );
      return;
    }

    if (aside) {
      aside.classList.remove('ativo');
      if (!aside.hasAttribute('tabindex')) aside.setAttribute('tabindex', '-1');
    }

    let catalog, overrides, spriteText;
    try {
      [catalog, overrides, spriteText] = await Promise.all([
        fetchJson(catalogUrl),
        fetchJson(overridesUrl),
        fetchText(spriteUrl),
      ]);
    } catch (err) {
      console.error(err);
      if (legendEl)
        legendEl.textContent = 'Deu ruim carregando arquivos (F12 😅)';
      return;
    }

    // 🔥 joga a sprite inline ANTES de renderizar qualquer coisa
    mountInlineSprite(spriteText);

    const spriteMap = parseSprite(spriteText);
    const iconIndex = new Map();
    const iconEls = [];
    const categorySections = new Map();

    container.querySelectorAll('.categoria').forEach((el) => el.remove());

    const totalIcons = (catalog?.categories || []).reduce(
      (acc, category) => acc + (category?.icons?.length || 0),
      0,
    );

    // tags (top 6 + Todos)
    const allTags = new Map();
    (catalog?.categories || []).forEach((category) => {
      (category?.icons || []).forEach((icon) => {
        const override = overrides?.[icon.id];
        (override?.tags || []).forEach((tag) => {
          const key = tag.toString();
          allTags.set(key, (allTags.get(key) || 0) + 1);
        });
      });
    });

    const buildTagChip = (label, count, checked) => {
      const chip = createEl('label', 'chip chip-radio');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'chip-radio';
      input.value = label;
      if (checked) input.checked = true;

      const spanLabel = document.createElement('span');
      spanLabel.textContent = label;

      const spanCount = createEl('span', 'mini');
      spanCount.textContent = `(${count})`;

      chip.appendChild(input);
      chip.appendChild(spanLabel);
      chip.appendChild(spanCount);
      return chip;
    };

    tagsContainer.innerHTML = '';
    const tagsTitle = document.createElement('p');
    tagsTitle.textContent = 'Tags:';
    tagsContainer.appendChild(tagsTitle);
    tagsContainer.appendChild(buildTagChip('Todos', totalIcons, true));

    Array.from(allTags.entries())
      .sort((a, b) => {
        const diff = b[1] - a[1];
        return diff !== 0 ? diff : a[0].localeCompare(b[0], 'pt-BR');
      })
      .slice(0, 6)
      .forEach(([tag, count]) => {
        tagsContainer.appendChild(buildTagChip(tag, count, false));
      });

    // render categorias + cards
    (catalog?.categories || []).forEach((category) => {
      const section = createEl('section', 'categoria');
      section.dataset.categoryKey = category.key;

      const title = createEl('h5', 'titulo');
      const titleName = document.createElement('span');
      titleName.textContent = category.name;

      const titleCount = createEl('span', 'mini');
      titleCount.textContent = (category?.icons || []).length;

      title.appendChild(titleName);
      title.appendChild(titleCount);

      const iconsGrid = createEl('div', 'icones');

      (category?.icons || []).forEach((icon) => {
        const override = overrides?.[icon.id] || { tags: [], aliases: [] };
        const spriteId = `ic-${icon.id}`; // precisa existir na sprite

        const searchTokens = [
          icon.id,
          spriteId,
          icon.name,
          icon.file,
          icon.category_name,
          icon.category_key,
          ...(icon.keywords || []),
          ...(override.tags || []),
          ...(override.aliases || []),
        ].filter(Boolean);

        const card = createEl('div', 'icone card-clicavel');
        card.dataset.iconId = icon.id;
        card.dataset.search = normalizeText(searchTokens.join(' '));
        card.dataset.tags = (override.tags || []).join('|');

        const svg = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'svg',
        );
        svg.setAttribute('class', 'ic-traco');
        svg.setAttribute('role', 'img');

        const use = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'use',
        );
        // ✅ agora é referência interna (sprite inline)
        use.setAttribute('href', `#${spriteId}`);
        use.setAttributeNS(
          'http://www.w3.org/1999/xlink',
          'xlink:href',
          `#${spriteId}`,
        );
        svg.appendChild(use);

        const label = createEl('p', 'mini');
        label.textContent = toDisplayName(spriteId);

        const button = document.createElement('button');
        button.type = 'button';
        button.title = 'abrir icone';
        button.dataset.iconId = icon.id;

        card.appendChild(svg);
        card.appendChild(label);
        card.appendChild(button);
        iconsGrid.appendChild(card);

        iconIndex.set(icon.id, {
          ...icon,
          spriteId,
          tags: override.tags || [],
          aliases: override.aliases || [],
        });

        iconEls.push(card);
      });

      section.appendChild(title);
      section.appendChild(iconsGrid);
      container.appendChild(section);
      categorySections.set(category.key, { section, countEl: titleCount });
    });

    let selectedTag = 'Todos';
    let currentIconId = null;
    let lastTriggerButton = null;

    const applyFilters = () => {
      const query = normalizeText(searchInput.value.trim());
      const visibleByCategory = new Map();

      iconEls.forEach((card) => {
        const matchesText = !query || card.dataset.search.includes(query);
        const tags = card.dataset.tags ? card.dataset.tags.split('|') : [];
        const matchesTag =
          !selectedTag || selectedTag === 'Todos' || tags.includes(selectedTag);

        const isVisible = matchesText && matchesTag;
        card.style.display = isVisible ? '' : 'none';

        const categoryKey =
          card.closest('.categoria')?.dataset.categoryKey || '';
        if (categoryKey) {
          visibleByCategory.set(
            categoryKey,
            (visibleByCategory.get(categoryKey) || 0) + (isVisible ? 1 : 0),
          );
        }
      });

      categorySections.forEach(({ section, countEl }, key) => {
        const visibleCount = visibleByCategory.get(key) || 0;
        countEl.textContent = visibleCount;
        section.style.display = visibleCount > 0 ? '' : 'none';
      });

      if (legendEl) {
        const totalVisible = Array.from(visibleByCategory.values()).reduce(
          (acc, count) => acc + count,
          0,
        );
        legendEl.textContent = `${totalVisible} ícone${totalVisible === 1 ? '' : 's'} encontrados`;
      }
    };

    const openAside = (iconId) => {
      const icon = iconIndex.get(iconId);
      if (!icon || !aside) return;

      currentIconId = iconId;

      if (asideIconUse) {
        // ✅ interno também
        asideIconUse.setAttribute('href', `#${icon.spriteId}`);
        asideIconUse.setAttributeNS(
          'http://www.w3.org/1999/xlink',
          'xlink:href',
          `#${icon.spriteId}`,
        );
      }

      if (asideName) asideName.textContent = toDisplayName(icon.spriteId);
      if (asideFile) asideFile.textContent = icon.file || '';

      // snippet pra copiar (interno)
      const useCode = `<svg class="ic-traco" role="img"><use xlink:href="#${icon.spriteId}"></use></svg>`;
      if (asideUseCode) {
        asideUseCode.textContent = useCode;
        updateHighlight(asideUseCode);
      }

      aside.classList.add('ativo');
      if (closeAsideBtn) closeAsideBtn.focus();
      else aside.focus();
    };

    const downloadCurrentSvg = () => {
      if (!currentIconId) return;
      const icon = iconIndex.get(currentIconId);
      if (!icon) return;

      // ideal: usar o "file" do catalog (já vem com caminho/nome certinho)
      // ex: "acoes/alerta-stroke.svg"
      const relativeFile = icon.file || `${icon.id}-stroke.svg`;

      const url = `${downloadBaseUrl}${relativeFile}`;

      const a = document.createElement('a');
      a.href = url;
      a.download = relativeFile.split('/').pop(); // nome do arquivo
      document.body.appendChild(a);
      a.click();
      a.remove();
    };

    tagsContainer.addEventListener('change', (event) => {
      const target = event.target;
      if (target && target.matches('input[type="radio"]')) {
        selectedTag = target.value;
        applyFilters();
      }
    });

    searchInput.addEventListener('input', applyFilters);

    container.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-icon-id]');
      if (!button) return;
      lastTriggerButton = button;
      openAside(button.dataset.iconId);
    });

    if (closeAsideBtn) {
      closeAsideBtn.addEventListener('click', () => {
        aside.classList.remove('ativo');
        if (lastTriggerButton) lastTriggerButton.focus();
      });
    }

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (!aside || !aside.classList.contains('ativo')) return;
      aside.classList.remove('ativo');
      if (lastTriggerButton) lastTriggerButton.focus();
      event.preventDefault();
    });

    if (downloadBtn) downloadBtn.addEventListener('click', downloadCurrentSvg);

    applyFilters();
  });
})();
