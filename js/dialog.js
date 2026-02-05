export const abreDialog = (id) => {
    let dialog = document.getElementById(id);
    dialog.show();
};

export const abreModal = (id) => {
    let dialog = document.getElementById(id);
    dialog.showModal();
};

export const fechaDialog = (id) => {
    let dialog = document.getElementById(id);
    dialog.close();
};

/* Verifica os botões que possuem classe .btn-fecha-dialog e adiciona 
propriedade para fechar o dialog */
export const getBtnFechaDialog = () => {
    let btnsFechaDialog = document.querySelectorAll('.btn-fecha-dialog');

    Array.prototype.forEach.call(btnsFechaDialog, function (btn) {
        let dialog = btn.closest('DIALOG');

        btn.addEventListener('click', function () {
            dialog.close();
        });
    });
};

export const fechaModalClicandoFora = () => {
    let dialogs = document.querySelectorAll('DIALOG');

    Array.prototype.forEach.call(dialogs, function (dialog) {
        dialog.addEventListener('click', (e) => {
            if (!e.target.closest('div')) {
                e.target.close();
            }
        });
    });
};

getBtnFechaDialog();
// fechaModalClicandoFora();
