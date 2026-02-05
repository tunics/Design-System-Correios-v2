// Mudas a cor da legenda para mostrar o erro em campos invalidos
export const changeInvalidInputColor = () => {
    let campos = document.querySelectorAll('.campo-txt');
    let camposArray = [...campos];

    camposArray.forEach(function (campo) {
        let input = campo.querySelector('input');

        input.addEventListener('blur', function () {
            updateRequiredInput(input);
        });
    });
};

export const updateRequiredInput = (input) => {
    let campoTxt = input.parentElement.parentElement;
    if (input.checkValidity() == false) {
        campoTxt.classList.add('erro');
    } else {
        campoTxt.classList.remove('erro');
    }
};

// Mudas a cor da legenda para mostrar o erro em áreas de texto invalidos
export const changeInvalidTextareaColor = () => {
    let textAreas = document.querySelectorAll('.area-txt');
    let textAreasArray = [...textAreas];

    textAreasArray.forEach(function (textAreaContainer) {
        let textarea = textAreaContainer
            .getElementsByTagName('textarea')
            .item(0);

        textarea.addEventListener('focusout', function () {
            if (textarea.checkValidity() == false) {
                textAreaContainer.classList.add('erro');
            } else {
                textAreaContainer.classList.remove('erro');
            }
        });
    });
};

/* Verifica os campos desabilitados e deixa o botão dentro do campo 
desabilitado, caso exista */
function checkDisabledInputs() {
    let inputs = document.querySelectorAll('input');
    let inputsArray = [...inputs];

    inputsArray.forEach(function (input) {
        let campoBtn = input.parentElement.querySelector('.input-btn');

        if (campoBtn != null && input.disabled == true) {
            campoBtn.setAttribute('disabled', '');
        } else if (campoBtn != null && input.disabled == false) {
            campoBtn.removeAttribute('disabled', '');
        }
    });
}

const changeInputFileName = () => {
    var fileInputs = document.querySelectorAll('.inputfile');

    Array.prototype.forEach.call(fileInputs, function (input) {
        var label = input.parentElement.querySelector('.inputfile-label');
        var legenda = input.parentElement.querySelector('.inputfile-name');

        input.addEventListener('change', function (e) {
            var fileName = '';

            if (this.files && this.files.length > 1) {
                fileName = (
                    this.getAttribute('data-multiple-caption') || ''
                ).replace('{count}', this.files.length);
            } else {
                fileName = e.target.value.split('\\').pop();
            }

            if (fileName && label && legenda) {
                legenda.innerHTML = fileName;
            }
        });
    });
};

const showHidePassword = () => {
    let btnsShowHide = document.querySelectorAll('.btn-show-hide');

    Array.prototype.forEach.call(btnsShowHide, function (btn) {
        let iconeVisualizar = btn.querySelector('i');
        let input = btn.previousElementSibling;

        btn.onclick = function () {
            if (input.type === 'password') {
                input.type = 'text';
                iconeVisualizar.className = 'ic-visualizar';
            } else {
                input.type = 'password';
                iconeVisualizar.className = 'ic-nao-visualizar';
            }
        };
    });
};

export const mascaraCpf = (input) => {
    input.addEventListener('input', function () {
        input.value = input.value.replace(/[^0-9.-]/g, '');
    });

    input.addEventListener('keydown', function (event) {
        const key = event.key;

        if (key !== 'Backspace' && key !== 'Delete') {
            //verifica se a tecla precionada nao e um backspace e delete
            var i = input.value.length; //aqui pega o tamanho do input
            if (i === 3 || i === 7)
                //aqui faz a divisoes colocando um ponto no terceiro e setimo indice
                input.value = input.value + '.';
            else if (i === 11)
                //aqui faz a divisao colocando o tracinho no decimo primeiro indice
                input.value = input.value + '-';
        }
    });
};

export const mascaraNomeCompleto = (input) => {
    var regexp = new RegExp(
        /^\s*([a-zA-ZÀ-ÿ\u00f1\u00d1]{1,}([\.,] |[-']| ))+[a-zA-ZÀ-ÿ\u00f1\u00d1]+\.?\s*$/i
    );

    input.addEventListener('input', function () {
        input.value = input.value.replace(
            /[^a-zA-ZÀ-ÿ\u00f1\u00d1\-'. ]*$/g,
            ''
        );
    });

    input.addEventListener('keyup', function (event) {
        if (regexp.test(input.value)) {
            input.setCustomValidity('');
        } else {
            input.setCustomValidity('Informe o nome completo');
        }
    });
};

export const mascaraCelular = (input) => {
    input.addEventListener('paste', (event) => {
        let celularCopiado = event.clipboardData.getData('Text');

        if (celularCopiado.length <= 15) {
            celularCopiado = celularCopiado.replace(/\D/g, '');
            console.log(celularCopiado);
            input.value = celularCopiado.replace(
                /^(\d{2})(\d{5})(\d{4})/gi,
                '($1) $2-$3'
            );
        }
    });

    input.addEventListener('input', function () {
        input.value = input.value.replace(/[^0-9() -]/g, '');
    });

    input.addEventListener('keydown', function (e) {
        let invalidChar = ['(', ')',' ','-'];

        const key = e.key;

        if (invalidChar.includes(key)) {
            e.preventDefault();
        }
        
        if (key !== 'Backspace' && key !== 'Delete') {
            var i = input.value.length;

            if (i === 0)
                input.value = e.target.value + '(';
            else if (i === 3)
                input.value = e.target.value + ') ';
            else if (i === 4) 
                input.value = e.target.value + ' ';
            else if (i === 10)
                input.value = e.target.value + '-';
        }
        // if (!input.value) return '';
        // input.value = input.value.replace(/\D/g, '');
        // input.value = input.value.replace(/(\d{2})(\d)/, '($1) $2');
        // input.value = input.value.replace(/(\d)(\d{4})$/, '$1-$2');

        // console.log(input.value);
        // return input.value;
    });

    input.addEventListener('focusout', function (event) {
        if (input.value.length < 15) {
            input.setCustomValidity('Informe um telefone válido');
        } else {
            input.setCustomValidity('');
        }
    });
};

export const mascaraCelularEstrangeiro = (input) => {
    input.addEventListener('input', function () {
        input.value = input.value.replace(/[^0-9()-]/g, '');
    });
};

export const mascaraLetrasNumerosMaiusculo = (input) => {
    input.addEventListener('input', function () {
        input.value = input.value.toUpperCase();
        input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
    });
};

checkDisabledInputs();
changeInputFileName();
showHidePassword();
changeInvalidInputColor();
changeInvalidTextareaColor();
