import { updateRequiredInput } from "./inputs.js";

const chipsCheckboxList = document.querySelectorAll(".chip.chip-checkbox");
const filterChips = document.querySelectorAll(".filter-chip");

const toggleSelectedChip = (chip) => {
    ["click", "keypress"].forEach((ev) => {
        chip.addEventListener(
            ev,
            function (e) {
                if (this.hasAttribute("selected")) {
                    this.removeAttribute("selected");
                } else {
                    this.setAttribute("selected", "true");
                }
            },
            false
        );
    });
};

const getCheckboxChips = () => {
    chipsCheckboxList.forEach(function (e) {
        e.tabIndex = 0;
        toggleSelectedChip(e);
    });
};

const getFilter = (input, legenda, array) => {
    let inputTxt = input.value.trim();
    let error;

    if (array.includes(inputTxt)) {
        //adicioner ação caso palavra já existe
        error = "Já adicionado"
        input.setCustomValidity(error);
        legenda.innerHTML = error;
        updateRequiredInput(input);
    } else if (inputTxt !== "") {
        array.push(inputTxt);
        legenda.innerHTML = "";
        input.setCustomValidity("");
        updateRequiredInput(input);
    } else {
        error = "Campo vazio"
        legenda.innerHTML = error;
        input.setCustomValidity(error);
        updateRequiredInput(input);
    }
};

const showFilterChips = (chipsContainer, chipsArray) => {
    chipsContainer.innerHTML = ""; //Clean html

    chipsArray.forEach((chip) => {
        chipsContainer.innerHTML += `
            <div class="chip chip-filter">
                <div class="chip-txt">${chip}</div>
                <button class="btn-txt so-icone">
                    <i class="ic-excluir-circulo"></i>
                </button>
            </div>
        `;
    });
};

const excludeFilterChip = (btn, txt, container, array) => {
    btn.addEventListener("click", function () {
        const index = array.indexOf(txt);
        if (index > -1) {
            array.splice(index, 1);
        }

        uptdateFilterChips(container, array);
    })
}

export const uptdateFilterChips = (chipsContainer, chipsArray) => {
    showFilterChips(chipsContainer, chipsArray);

    const filterChips = document.querySelectorAll(".chip.chip-filter");

    filterChips.forEach((chip) => {
        let closeBtn = chip.querySelector("button");
        let chipTxt = chip.querySelector(".chip-txt").innerHTML;

        excludeFilterChip(closeBtn, chipTxt, chipsContainer, chipsArray);
    });
};

filterChips.forEach((e) => {
    const chipsArray = [];
    let input = e.querySelector("input");
    let addFilterBtn = e.querySelector(".input-btn");
    let chipsContainer = e.querySelector('.chips-container');
    let legenda = e.querySelector('.legenda');

    addFilterBtn.onclick = function () {
        getFilter(input, legenda, chipsArray);
        uptdateFilterChips(chipsContainer, chipsArray);
    };

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            getFilter(input, legenda, chipsArray);
            uptdateFilterChips(chipsContainer, chipsArray);
        }
    })

    uptdateFilterChips(chipsContainer, chipsArray);
});

getCheckboxChips();
