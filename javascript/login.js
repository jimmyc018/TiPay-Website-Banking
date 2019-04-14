// LOGIN/REGISTER swap button
let signUpButton = document.querySelector('#signup_container_button');
let signInButton = document.querySelector('#signin_container_button');
let registerContainer = document.querySelector('#register_container');
let signUpSplash = document.getElementById('create_account');
let signInSplash = document.getElementById('sign_in');

signUpButton.addEventListener("click", function() {
    registerContainer.classList.add('signup_container_show');
    signUpSplash.classList.remove('none');
    signInSplash.classList.add('none');
});

signInButton.addEventListener('click', () => {
    registerContainer.classList.remove('signup_container_show');
    signUpSplash.classList.add('none');
    signInSplash.classList.remove('none');
});

// Login forms
const loginInputs = document.querySelectorAll('.login_container input');
const loginButton = document.querySelector('.login_container button');

for (let i = 0;i < loginInputs.length;i++) {
    loginInputs[i].addEventListener('keydown', () => {
        checkValid(loginInputs, loginButton);
    });
}

// Register forms
const registerInputs = document.querySelectorAll('.signup_container input');
const registerButton = document.querySelector('.signup_container button');

for (let i = 0;i < registerInputs.length;i++) {
    registerInputs[i].addEventListener('keydown', () => {
        checkValid(registerInputs, registerButton);
    });
}

function signUp() {
    alert('Your account has been created!');
    registerContainer.classList.remove('signup_container_show');
    signUpSplash.classList.add('none');
    signInSplash.classList.remove('none');
}