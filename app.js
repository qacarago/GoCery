
// Sidebar Nav
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
    sidebar.classList.toggle("show")
}


// Sidebar links
let home_page = document.querySelector('#home-page');
let snacks_page = document.querySelector('#snacks-page');
let beverages_page = document.querySelector('#beverages-page');
let ready_to_eat_page = document.querySelector('#readytoeat-page');
let user_page = document.querySelector('#user-page');
let about_us_page = document.querySelector('#about-us-page');
let cart_page = document.querySelector('#cart-page');

const pageElements = [
    home_page,
    user_page,
    ready_to_eat_page,
    beverages_page,
    snacks_page,
    about_us_page,
    cart_page
];

// Shows and hides pages
function showPage(pageToShow) {
    pageElements.forEach(page => {
        page.style.display = 'none';
    });

    pageToShow.style.display = 'block';
}

// Sign in
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const sign_in_btn = document.querySelector('#sign-in-btn');
const welcome = document.querySelector('.welcome');

sign_in_btn.addEventListener('click', () => {
    const inputValue = username.value;
    welcome.textContent = `Hello, @${inputValue}. Welcome Back!`;
    alert(`@${inputValue} Sucessfully Signed In!`);
});

// Register an account
const registers = document.querySelector('#register-container');

function register() {
    registers.style.display = 'flex';
}

const register_username = document.querySelector('#register-username');
const register_email = document.querySelector('#register-email');
const register_password = document.querySelector('#register-password');

function registerSubmit() {
    const welcome = document.querySelector('.welcome');
    const inputValue = register_username.value;
    welcome.textContent = `Hello, @${inputValue}. Welcome Back!`;
    alert(`@${inputValue} Account Sucessfully Created`);

    registers.style.display = 'none';
}

function registerCancel() {
    registers.style.display = 'none';    
}


// Modal pop ups
const modal = document.getElementById("productModal");

function openModal(name, imageSrc, price, description, weight) {
    document.getElementById("modalProductName").textContent = name;
    document.getElementById("modalProductImage").src = imageSrc;
    document.getElementById("modalProductImage").alt = name;
    document.getElementById("modalProductPrice").textContent = price;
    document.getElementById("modalProductDescription").textContent = description;
    document.getElementById("modalProductWeight").textContent = weight;

    modal.style.display = "block";
    
    document.body.classList.add('modal-open');
}

function closeModal() {
    modal.style.display = "none";
    
    document.body.classList.remove('modal-open');
}

window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}
