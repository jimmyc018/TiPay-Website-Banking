// Validate support input
let supportButton = document.querySelector('.support_form_container form:last-child button');
let supportInputs = document.querySelectorAll('.support_form_container form:last-child input');
let date = document.querySelectorAll('.support_form_container form:last-child input')[2];

for (let i = 0;i < supportInputs.length;i++) {
    supportInputs[i].addEventListener('keydown', () => {
        checkValid(supportInputs, supportButton);
        setTimeout(() => {
            if (supportButton.classList.contains('valid')) {
                supportButton.removeAttribute('disabled');
            }
        }, 1);
    });
}

date.addEventListener('change', () => {
    checkValid(supportInputs, supportButton);
    setTimeout(() => {
        if (supportButton.classList.contains('valid')) {
            supportButton.removeAttribute('disabled');
        }
    }, 1);
});

function support() {
    alert('Your card has been activated!');
    for (let i = 0;i < supportInputs.length;i++) {
        supportInputs[i].value = "";
    }
}