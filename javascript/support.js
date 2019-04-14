// Validate support input
let supportButton = document.querySelector('.support_form_container button');
let supportInputs = document.querySelectorAll('input[required], textarea[required]');

for (let i = 0;i < supportInputs.length;i++) {
    supportInputs[i].addEventListener('keydown', () => {
        checkValid(supportInputs, supportButton);
    });
}

function support() {
    alert('Your message has been sent to our customer support team. We will get back to you promptly.');
    for (let i = 0;i < supportInputs.length;i++) {
        supportInputs[i].value = "";
    }
}