// Dynamic colour nav bar
const nav = document.getElementById('nav');
const img = document.querySelector('img');
const links = document.querySelectorAll('#nav a');

const runOnScroll = () => {
    if (window.innerWidth < 1024) {
        if (document.body.scrollTop >= 10) {
            nav.classList.add('scrolled');
            for (let i = 0;i < links.length;i++) {
                links[i].classList.add('scrolled_link');
            }
            img.src = 'TiPay2.png';
        } else {
            nav.classList.remove('scrolled');
            for (let i = 0;i < links.length;i++) {
                links[i].classList.remove('scrolled_link');
            }
            img.src = 'TiPay.png';
        }
    } else {
        nav.classList.remove('scrolled');
        for (let i = 0;i < links.length;i++) {
            links[i].classList.remove('scrolled_link');
        }
        img.src = 'TiPay.png';
    }
}; 
window.addEventListener("scroll", runOnScroll);
window.addEventListener("resize", runOnScroll);

// Remove drop down menu at tablet size
let x = window.matchMedia('(min-width: 768px)');
const dropDownMenu = (x) => {
        if (x.matches) {
                nav.classList.remove('header');
        } else {
                nav.classList.add('header');
        }
}
dropDownMenu(x);
x.addListener(dropDownMenu);

// Validate inputs
function checkValid(inputs, button) {
    setTimeout(() => {
        for (let i = 0;i < inputs.length; i++) {
            if (inputs[i].getAttribute('name') == 'amount' && inputs[i].value > Number(accountDetails[2])) {
                button.classList.remove('valid');
                return false;
            }
            if (inputs[i].checkValidity() == false) {
                button.classList.remove('valid');
                return false;
            } else {
                inputs[i].classList.remove('invalid');
            }
        }
        button.classList.add('valid');
        return true;
    }, 1)
}

// Round numbers to 2 decimal places
function round(value) {
    return Number(Math.round(value+'e'+2)+'e-'+2);
}