const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
    sidebar.classList.toggle("show")
}

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
