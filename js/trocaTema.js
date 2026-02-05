const contrasteBtn = document.getElementById("btn-altocontraste");
const temaBtn = document.getElementById("btn-tema");
const icTema = temaBtn.querySelector("i");
const temaPadrao = "light";
let temaAtual = temaPadrao;

const checkBrowserPreferColorScheme = () => {
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        addDarkTheme();
    } else {
        removeDarkTheme();
    }
};

const addDarkTheme = () => {
    document.body.classList.add("tema-escuro");
    icTema.className = "ic-sol";
    temaAtual = "dark";
};

const removeDarkTheme = () => {
    document.body.classList.remove("tema-escuro");
    icTema.className = "ic-lua";
    temaAtual = temaPadrao;
};

contrasteBtn.addEventListener("click", function () {
    document.body.classList.toggle("alto-contraste");
    removeDarkTheme();
});

temaBtn.addEventListener("click", function () {
    if (temaAtual === temaPadrao) {
        addDarkTheme();
    } else {
        removeDarkTheme();
    }
});

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
        checkBrowserPreferColorScheme();
    });

checkBrowserPreferColorScheme();
