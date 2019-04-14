const selectAccount = document.querySelectorAll('.box_2');
const payButton = document.querySelector('#pay_button_container button');
const hiddenInput = document.querySelector('#pay_button_container input');
let accountDetails = [];
for (let i = 0;i < selectAccount.length;i++) {
    selectAccount[i].addEventListener('click', () => {
        for (let i = 0;i < selectAccount.length;i++) {
            for (let j = 0;j < selectAccount[i].children.length;j++) {
                selectAccount[i].children[j].classList.remove('selected');
            }
        }
        for (let j = 0;j < selectAccount[i].children.length;j++) {
            selectAccount[i].children[j].classList.add('selected');
            accountDetails[0] = selectAccount[i].children[0].querySelectorAll('p')[0].innerHTML;
            accountDetails[1] = selectAccount[i].children[0].querySelectorAll('p')[1].innerHTML;
            accountDetails[2] = parseFloat(selectAccount[i].children[1].querySelector('p:last-child span').innerHTML);
            sessionStorage.setItem("accountDetails", JSON.stringify(accountDetails));
            sessionStorage.setItem("otherDetails", document.querySelector(".balance_container:not(.selected) p:last-child").innerText);
            sessionStorage.setItem("otherBalance", document.querySelector(".balance_container:not(.selected):last-child span").innerText);
        }
        payButton.classList.add('valid');
        hiddenInput.removeAttribute('required');
    });
}

if (sessionStorage.getItem('savingsBalance')) {
    document.querySelector('#savingsBalance').innerText = round(sessionStorage.getItem('savingsBalance'));
}

if (sessionStorage.getItem('chequeBalance')) {
    document.querySelector('#chequeBalance').innerText = round(sessionStorage.getItem('chequeBalance'));
}

let newTransactions = JSON.parse(sessionStorage.getItem('newTransaction'));

if (newTransactions) {
    for (let i = 0;i < newTransactions.length / 3;i++) {
        let table = document.querySelector('table');
        let row = table.insertRow(0);
        row.classList.add('transaction_table');
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.classList.add('transaction_date');
        cell2.classList.add('transaction_description');
        cell3.classList.add('transaction_amount_out');

        let j = i * 3;
        cell1.innerHTML = newTransactions[j];
        cell2.innerHTML = newTransactions[j + 1];
        cell3.innerHTML = newTransactions[j + 2];
    }
}