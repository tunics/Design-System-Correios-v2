const criaDialog = (titulo, mensagem, icone) => {
  const alerta = document.createElement('dialog');
  alerta.className = "bg-superficie elev5 alerta-dialog";

  alerta.innerHTML += `
      <div class="dialog-container">
        <div class="dialog-header">
          <img class="ic-traco" src="imgs/icones/traco/${icone}.svg" />
        </div>

        <div class="dialog-main">
          <h5>${titulo}</h5>
          <span class'pequeno'>${mensagem}</span>
        </div>

        <div class"dialog-footer">
          <button class="btn-txt btn-fecha-dialog">
            Ok
          </button>
        </div>
      </div>
    `;
  console.log(alerta);
  
  return alerta;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const abreAlertaDialog = (titulo, mensagem, icone) => {  
  const alerta = criaDialog(titulo, mensagem, icone);
  document.body.appendChild(alerta);
  
  const botaoFechar = alerta.querySelector('.btn-fecha-dialog');
  console.log(botaoFechar);
  alerta.showModal();
  botaoFechar.addEventListener('click', function () {
    alerta.close();
    sleep(1000).then(() => {alerta.remove();});
  });
}

