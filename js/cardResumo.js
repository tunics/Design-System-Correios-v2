function setupResumoToggle() {
  const resumoContainer = document.querySelector('.resumo-container');
  const produtosResumo = resumoContainer?.querySelector(
    '.resumo-produtos-container'
  );

  if (!resumoContainer || !produtosResumo) return;

  // Remove event listener anterior (prevenção de múltiplos binds)
  resumoContainer.onclick = null;

  if (window.innerWidth <= 599) {
    resumoContainer.onclick = function (event) {
      const target = event.target;

      if (
        target.closest('.btn-cont') || // Pix
        target.closest('.btn-pre') // Cartão
      ) {
        return;
      }

      produtosResumo.classList.toggle('esconde');
    };
  }
}

document.addEventListener('DOMContentLoaded', function () {
  setupResumoToggle();
  window.addEventListener('resize', setupResumoToggle);
});
