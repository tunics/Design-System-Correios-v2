const acessBtn = document.getElementById("btn-acess");
const menuAcess = document.getElementById("menu-acessibilidade");
const fecharAcessBtn = document.getElementById("btn-fechar-acess");
const loginArea = document.getElementById("login-usuario");

acessBtn.addEventListener("click", function () {
  menuAcess.classList.toggle("abrir");
  acessBtn.classList.toggle("ativo");
});

fecharAcessBtn.addEventListener("click", function () {
  menuAcess.classList.remove("abrir");
  acessBtn.classList.remove("ativo");
});

function definirAutenticacao(state) {
  loginArea.setAttribute('data-aut', state);
}

