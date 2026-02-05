const slide = document.querySelector('.slide');
const imagens = Array.from(slide.querySelectorAll('.img-produto'));
const nav = document.querySelector('.nav');
const btnAnterior = document.querySelector('button[title="anterior"]');
const btnProximo = document.querySelector('button[title="próximo"]');

let indexAtual = 0;

// Cria bolinhas dinamicamente
const pontosContainer = nav.querySelector('.pontos');
pontosContainer.innerHTML = '';
const pontos = imagens.map((_, i) => {
  const pontoBtn = document.createElement('div');
  const botao = document.createElement('span');
  pontoBtn.appendChild(botao);
  pontoBtn.classList.add('ponto');
  pontosContainer.appendChild(pontoBtn);
  pontoBtn.addEventListener('click', () => trocarSlide(i));
  return pontoBtn;
});

// Atualiza bolinhas
function atualizarBolinhas() {
  pontos.forEach((ponto, i) => {
    ponto.classList.toggle('ativo', i === indexAtual);
  });
}

// Centraliza bolinhas
function centralizarBolinhas() {
  const pontoAtivo = pontos[indexAtual];
  const container = pontosContainer;

  const containerWidth = container.offsetWidth;
  const containerCenter = container.scrollLeft + containerWidth / 2;
  const pontoCenter = pontoAtivo.offsetLeft + (pontoAtivo.offsetWidth / 2);

  const limite = containerWidth / 2; // limite pra considerar como "fora do centro"

  const distancia = pontoCenter - containerCenter;

  // Só scrolla se a bolinha estiver fora do centro
  if (Math.abs(distancia) > limite || Math.abs(distancia) < limite / 2) {
    const scrollLeft = pontoCenter - (containerWidth / 2);
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  }
}

// Faz o slide andar
function atualizarSlide() {
  const offset = indexAtual * -100;
  slide.style.transform = `translateX(${offset}%)`;
  atualizarBolinhas();
  centralizarBolinhas();
}

function trocarSlide(novoIndex) {
  indexAtual = (novoIndex + imagens.length) % imagens.length;
  atualizarSlide();
}

// Botões
btnAnterior.addEventListener('click', () => {
  trocarSlide(indexAtual - 1);
});

btnProximo.addEventListener('click', () => {
  trocarSlide(indexAtual + 1);
});

// Swipe touch
let startX = 0;
slide.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slide.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;
  if (Math.abs(diff) > 50) {
    if (diff < 0) {
      trocarSlide(indexAtual + 1);
    } else {
      trocarSlide(indexAtual - 1);
    }
  }
});

// Zoom
function ativarZoom() {
  imagens.forEach((img) => {
    img.onclick = () => {
      const overlay = document.createElement('div');
      overlay.className = 'overlay-zoom';
      const imgZoom = document.createElement('img');
      imgZoom.src = img.src;
      overlay.appendChild(imgZoom);
      document.body.appendChild(overlay);
      overlay.onclick = () => overlay.remove();
    };
  });
}

ativarZoom();
atualizarSlide();
