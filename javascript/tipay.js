// Default today's date
const element = document.getElementById('date-input');
element.valueAsNumber = Date.now() - (new Date()).getTimezoneOffset() * 60000;

// Dynamic character limit
const yours = document.getElementById('yours');
const theirs = document.getElementById('theirs');
const yoursInput = document.getElementById('yours_input');
const theirsInput = document.getElementById('theirs_input');
yoursInput.addEventListener('input', () => {
    yours.innerText = (20 - yoursInput.value.length);
});
theirsInput.addEventListener('input', () => {
    theirs.innerText = (20 - theirsInput.value.length);
});


// Select payee
const payees = document.getElementsByClassName('payee');
let removeTick = () => {
    for (let j = 0; j < payees.length; j++) {
        payees[j].querySelector('i').classList.remove('clicked');
    }
}
// Add tick when clicked
let addTick = () => {
    for (let i = 0; i < payees.length; i++) {
        payees[i].addEventListener('click', function (e) {
            checkValid(payInputs, payButton);
            removeTick();
            e.currentTarget.querySelector('i')
                .classList.add('clicked');
        });
    }
}
addTick();

let payeeContainer = document.querySelector('.payees_container');

function checkInvalid(inputs) {
    setTimeout(function () {
        if (inputs.checkValidity() == false && inputs.value != "") {
            inputs.classList.add('invalid');
        } else {
            inputs.classList.remove('invalid');
        }
    }, 1)
}

function checkAmountInvalid(inputs) {
    setTimeout(function () {
        if (inputs.checkValidity() == false && inputs.value != "" || inputs.value > Number(accountDetails[2])) {
            inputs.classList.add('invalid');
        } else {
            inputs.classList.remove('invalid');
        }
    }, 1)
}

// PAY forms
const payInputs = document.querySelectorAll('.payment input');
const payButton = document.querySelector('.payment button');

payInputs[0].addEventListener('keydown', () => {
    if (isPicked()) checkValid(payInputs, payButton);
    checkAmountInvalid(payInputs[0]);
});

for (let i = 1; i < payInputs.length; i++) {
    payInputs[i].addEventListener('keydown', () => {
        if (isPicked()) checkValid(payInputs, payButton);
        checkInvalid(payInputs[i]);
    });
}

// Clear inputs
const payForm = document.getElementById('pay_form');
const success = document.getElementById('success_content');
const successContainer = document.getElementById('success');
const freq = document.querySelector('select');
let clearInputs = (inputs) => {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute('type') != 'date') {
            inputs[i].value = "";
        } else {
            yours.innerText = 20;
            theirs.innerText = 20;
            freq.selectedIndex = 0;
            payForm.classList.add('hide');
            success.classList.remove('hide');
            successContainer.classList.add('z');
        }
    }
}

// Automatically select new citizen
let addTickToEnd = () => {
    removeTick();
    payees[payees.length - 1].querySelector('i').classList.add('clicked');
}

// Mobile OR Account
const mobileContainer = document.getElementById('mobile_container');
const accountContainer = document.getElementById('account_container');
const mobileInput = document.querySelector('input[name="mobile"');
const bsbInput = document.querySelector('input[name="bsb"');
const accInput = document.querySelector('input[name="accnum"');
const nameInput = document.querySelector('input[name="name"');
let hideInput = (e, container, input, input2) => {
    setTimeout(() => {
        if (e.target.value != "") {
            container.classList.add('hideInput');
            input.classList.add('shown');
            if (input2) input2.classList.add('shown');
        } else {
            if (input2) {
                if (e.target.value == "" && input2.value == "") {
                    input.classList.remove('shown');
                    input2.classList.remove('shown');
                    container.classList.remove('hideInput');
                }
            } else {
                container.classList.remove('hideInput');
                input.classList.remove('shown');
            }
        }
    }, 1)
}
let removeHidden = () => {
    mobileInput.classList.remove('shown');
    bsbInput.classList.remove('shown');
    accInput.classList.remove('shown');
    accountContainer.classList.remove('hideInput');
    mobileContainer.classList.remove('hideInput');
}

let addInputs;
const addButton = document.querySelector('.add button');

// ADD forms
mobileInput.addEventListener('keydown', (e) => {
    hideInput(e, accountContainer, e.target);
    addInputs = document.querySelectorAll('.add input.shown');
    checkValid(addInputs, addButton);
    checkInvalid(mobileInput);
});

bsbInput.addEventListener('keydown', (e) => {
    hideInput(e, mobileContainer, e.target, accInput);
    addInputs = document.querySelectorAll('.add input.shown');
    checkValid(addInputs, addButton);
    checkInvalid(bsbInput);
});
accInput.addEventListener('keydown', (e) => {
    hideInput(e, mobileContainer, e.target, bsbInput);
    addInputs = document.querySelectorAll('.add input.shown');
    checkValid(addInputs, addButton);
    checkInvalid(accInput);
});

nameInput.addEventListener('keydown', () => {
    addInputs = document.querySelectorAll('.add input.shown');
    checkValid(addInputs, addButton);
    checkInvalid(nameInput);
});

// ADD citizen
addButton.addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains('valid')) {
        let payeeDiv = document.createElement('div');
        let payeeName = document.createElement('h3');
        let accountNum = document.createElement('p');
        let tick = '<i class="far fa-check-circle"></i>';
        payeeDiv.classList.add('payee');
        payeeName.innerHTML = document.querySelector('input[name="name"').value;
        if (!accountContainer.classList.contains('hideInput')) {
            let bsb = document.querySelector('input[name="bsb"').value.substr(0, 3) + "-" + document.querySelector('input[name="bsb"').value.substr(3, 5);
            accountNum.innerHTML = bsb + " " + document.querySelector('input[name="accnum"').value;
        } else {
            accountNum.innerHTML = document.querySelector('input[name="mobile"').value.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        }
        payeeDiv.appendChild(payeeName);
        payeeDiv.appendChild(accountNum);
        payeeDiv.innerHTML += tick;
        payeeContainer.appendChild(payeeDiv);
        clearInputs(addInputs);
        removeHidden();
        checkValid(addInputs, addButton);
        addTickToEnd();
        addTick();
    }
});

// COMPLETE TRANSACTION
payButton.addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains('valid')) {
        getPicked();
        removeTick();
        clearInputs(payInputs);
        init();
    }
});

// Check if citizen is picked
function isPicked() {
    for (let i = 0;i < payees.length;i++) {
        if (payees[i].querySelector('i').classList.contains('clicked')) {
            return true;
        }
    }
    return false;
}

// Update balance
let accountDetails = JSON.parse(sessionStorage.getItem('accountDetails'));
document.querySelector('#balance').innerHTML = accountDetails[2];

// Cheque or savings
let accountDiv = document.createElement('div');
let accountName = document.createElement('h3');
let accountNums = document.createElement('p');
let tick = '<i class="far fa-check-circle"></i>';
accountDiv.classList.add('payee');

if (accountDetails[0] == 'Savings Account') {
    accountName.innerHTML = 'Cheque Account';
} else {
    accountName.innerHTML = 'Savings Account';
}
accountNums.innerHTML = sessionStorage.getItem('otherDetails');

accountDiv.appendChild(accountName);
accountDiv.appendChild(accountNums);
accountDiv.innerHTML += tick;

payeeContainer.insertBefore(accountDiv, document.querySelector('.payee'));
addTick();

let newTransaction = [];
// Get info of picked citizen
function getPicked() {
    for (let i = 0; i < payees.length; i++) {
        if (payees[i].querySelector('i').classList.contains('clicked')) {
            document.querySelector('#fromName').innerHTML = accountDetails[0];
            document.querySelector('#fromAccNum').innerHTML = accountDetails[1];
            document.querySelector('#sentName').innerText = payees[i].querySelector('h3').innerHTML;
            document.querySelector('#accNum').innerText = payees[i].querySelector('p').innerHTML;
            document.querySelector('#sentAmount').innerText = '$' + payInputs[0].value;
            document.querySelector('#sentDate').innerText = payInputs[1].value;
            document.querySelector('#sentFreq').innerText = document.querySelector('select').value;

            // Update new balance
            let balance = document.querySelector('#balance').innerHTML - payInputs[0].value;
            document.querySelector('#balance').innerHTML = Number(round(balance));
            accountDetails[2] -= payInputs[0].value;
            if (accountDetails[0] == 'Savings Account') {
                sessionStorage.setItem("savingsBalance", accountDetails[2]);
            } else {
                sessionStorage.setItem("chequeBalance", accountDetails[2]);
            }

            // Update new transaction
            let oldTransaction = [];
            if (sessionStorage.getItem('newTransaction')) {
                oldTransaction = JSON.parse(sessionStorage.getItem('newTransaction'));
            }
            oldTransaction.push(formatDate(document.querySelector('#date-input').value.replace(/-/g, "/")));
            oldTransaction.push(document.querySelector('#yours_input').value);
            oldTransaction.push('-$' + document.querySelector('input[name="amount"').value);
            sessionStorage.setItem("newTransaction", JSON.stringify(oldTransaction));

            // Update account
            if (payees[i].querySelector('h3').innerHTML == 'Savings Account') {
                let balance = parseFloat(sessionStorage.getItem('otherBalance')) + parseFloat(payInputs[0].value);
                sessionStorage.setItem('savingsBalance', balance);
            }
            if (payees[i].querySelector('h3').innerHTML == 'Cheque Account') {
                let balance = parseFloat(sessionStorage.getItem('otherBalance')) + parseFloat(payInputs[0].value);
                sessionStorage.setItem('chequeBalance', balance);
            }
        }
    }
}

function formatDate(input) {
    var datePart = input.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits
        month = datePart[1],
        day = datePart[2];

    return day + '/' + month + '/' + year;
}

// Close transaction receipt
const close = document.getElementById('close');
close.addEventListener('click', () => {
    payForm.classList.remove('hide');
    success.classList.add('hide');
    successContainer.classList.remove('z');
    payButton.classList.remove('valid');
});

// Tick animation
const {
    tween,
    physics,
    styler,
    easing,
    value
} = window.popmotion;

function init() {
    const circleStyler = styler(document.getElementById('tick-outline-path'));
    const tickStyler = styler(document.getElementById('tick-path'));

    function showTick() {
        // Complete outline
        tween({
            from: circleStyler.get('pathLength'),
            to: 100
        }).start(circleStyler.set('pathLength'));

        tween().start((v) => tickStyler.set({
            opacity: v,
            pathLength: v * 100
        }));
    }

    tween({
        ease: easing.easeIn
    }).start({
        update: (v) => circleStyler.set({
            opacity: v,
            pathLength: v * 45
        }),
        complete: () => physics({
                velocity: -400
            })
            .start(circleStyler.set('rotate'))
    });

    // Emulate data received after delay
    setTimeout(showTick, 2000);
}