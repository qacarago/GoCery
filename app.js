
// Sidebar Button
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
    sidebar.classList.toggle("show")
}


// Sidebar Links
let home_page = document.querySelector('#home-page');
let snacks_page = document.querySelector('#snacks-page');
let beverages_page = document.querySelector('#beverages-page');
let ready_to_eat_page = document.querySelector('#readytoeat-page');
let user_page = document.querySelector('#user-page');

function home() {
    home_page.style.display = 'block';
    user_page.style.display = 'none';
    ready_to_eat_page.style.display = 'none';
    beverages_page.style.display = 'none';
    snacks_page.style.display = 'none';
}

function user() {
    home_page.style.display = 'none';
    user_page.style.display = 'block';
    ready_to_eat_page.style.display = 'none';
    beverages_page.style.display = 'none';
    snacks_page.style.display = 'none';
}

function readyToEat() {
    home_page.style.display = 'none';
    user_page.style.display = 'none';
    ready_to_eat_page.style.display = 'block';
    beverages_page.style.display = 'none';
    snacks_page.style.display = 'none';
}

function beverages() {
    home_page.style.display = 'none';
    user_page.style.display = 'none';
    ready_to_eat_page.style.display = 'none';
    beverages_page.style.display = 'block';
    snacks_page.style.display = 'none';
}

function snacks () {
    home_page.style.display = 'none';
    user_page.style.display = 'none';
    ready_to_eat_page.style.display = 'none';
    beverages_page.style.display = 'none';
    snacks_page.style.display = 'block';
}


// Modal Pop Ups
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
