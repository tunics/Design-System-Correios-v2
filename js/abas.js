document.addEventListener('DOMContentLoaded', function () {
  const abas = document.querySelectorAll('.aba');
  const conteudos = document.querySelectorAll('.aba-conteudo');

  function ativarAba(alvo) {
    // Remove 'ativa' de todas
    abas.forEach((a) => a.classList.remove('ativa'));
    conteudos.forEach((c) => {
      c.classList.remove('ativa');
      c.style.display = 'none';
    });

    // Ativa a aba
    const novaAba = document.querySelector(`.aba[data-aba="${alvo}"]`);
    const novoConteudo = document.querySelector(
      `.aba-conteudo[data-aba="${alvo}"]`
    );

    novaAba?.classList.add('ativa');

    if (novoConteudo) {
      novoConteudo.style.display = 'flex';
      requestAnimationFrame(() => {
        novoConteudo.classList.add('ativa');
      });
    }
  }

  abas.forEach((aba, index) => {
    aba.addEventListener('click', () => ativarAba(aba.dataset.aba));

    aba.addEventListener('keydown', (event) => {
      const tecla = event.key;

      if (tecla === 'Enter' || tecla === ' ') {
        event.preventDefault();
        ativarAba(aba.dataset.aba);
      }

      if (tecla === 'ArrowRight') {
        event.preventDefault();
        const proxima = abas[(index + 1) % abas.length];
        proxima.focus();
      }

      if (tecla === 'ArrowLeft') {
        event.preventDefault();
        const anterior = abas[(index - 1 + abas.length) % abas.length];
        anterior.focus();
      }
    });
  });
});
