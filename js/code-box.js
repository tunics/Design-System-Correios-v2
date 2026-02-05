document.querySelectorAll('.codebox').forEach(box => {
  const btn = box.querySelector('.codebox-copy');
  const code = box.querySelector('code');

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent);
      btn.innerHTML = '<i class="ic-visto-simples"></i>Copiado';
      setTimeout(()=> btn.innerHTML='<i class="ic-copiar"></i>Copiar',1200);
    } catch {
      btn.textContent = 'Erro 😢';
      setTimeout(()=> btn.innerHTML='<i class="ic-copiar"></i>Copiar',1200);
    }
  });
});
