
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

function showPage(pageToShow) {
    // 1. Hide all pages
    pageElements.forEach(page => {
        page.style.display = 'none';
    });

    // 2. Show the specific page passed to the function
    pageToShow.style.display = 'block';
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
