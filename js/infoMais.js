// Altura é o numero de linhas que serão mostrados
export const compactarInfo = (altura) => {
  let divsInfoMais = document.querySelectorAll('.info-mais');

  Array.prototype.forEach.call(divsInfoMais, function (info) {
    // Cria botão mais
    let linkMais = document.createElement('button');
    linkMais.classList.add('btn-txt');
    linkMais.classList.add('como-link');

    // Coloca conteudo da div dentro de um span
    let span = document.createElement('span');
    span.innerHTML = info.innerHTML;
    info.innerHTML = '';
    info.appendChild(span);

    setHeight(info, altura);

    if (verificaOverflow(info, span) == true) {
      info.appendChild(linkMais);
      info.classList.remove('sem-overflow');
    } else {
      info.style.height = '';
      info.classList.add('sem-overflow');
    }

    linkMais.addEventListener('click', () => {
      info.classList.toggle('expandido');
      setHeight(info, altura);
    });
  });
};

const setHeight = (info, altura) => {
  if (info.classList.contains('expandido')) {
    info.style.height = '';
  } else {
    // Ajusta a altura da div pela altura da linha do texto
    let infoHeight = getComputedStyle(info).getPropertyValue('line-height');
    infoHeight = infoHeight.replace(/[^0-9]/g, '') * altura + 'px';
    info.style.height = infoHeight;
  }
};

const verificaOverflow = (info, span) => {
  return span.scrollHeight > info.clientHeight;
};

compactarInfo(1);
