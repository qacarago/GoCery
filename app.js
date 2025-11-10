

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


// Register an account
const registers = document.querySelector('#register-container');

function register() {
    registers.style.display = 'flex';
}

const register_username = document.querySelector('#register-username');
const register_email = document.querySelector('#register-email');
const register_password = document.querySelector('#register-password');
window.register_user = register_username.value;
window.register_pass = register_password.value;

function registerSubmit() {
    window.register_user = register_username.value;
    window.register_pass = register_password.value;
    if (window.register_user != '' && window.register_pass != '') {
        alert(`Account @${register_user} is sucessfully created. Please log in!`);
    } else {
        alert('Please enter a valid username and password! Try again!')
    }

    registers.style.display = 'none';
}

function registerCancel() {
    registers.style.display = 'none';    
}


// Sign in
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const sign_in_btn = document.querySelector('#sign-in-btn');
const welcome = document.querySelector('.welcome');
window.usernameValue = username.value;
window.passwordValue = password.value;

sign_in_btn.addEventListener('click', () => {
    window.usernameValue = username.value;
    window.passwordValue = password.value;
    if (window.usernameValue == window.register_user && window.passwordValue == window.register_pass && window.usernameValue && window.passwordValue) {
        welcome.textContent = `Hello, @${window.usernameValue}. Welcome Back!`;
        alert(`@${window.usernameValue} Sucessfully Signed In!`);
    } else {
        alert('Account is not yet created! Please register an account!');
    }
});


// Subscribe
function subscribe (){
    const email_input = document.querySelector('#email-input').value;

    if (email_input != '' && email_input.endsWith('@gmail.com')) {
        alert('You have successfully subscribed!');
    } else {
        alert('Please enter your email address!');
    }
}


// 🛒 The main array to hold all products in the shopping cart
let cart = [];

// Store the details of the product currently being viewed in the modal
let productInModal = {};

// --- Element References (for easier access) ---
const productModal = document.getElementById('productModal');
const modalQuantityInput = document.getElementById('quantity');
const modalAddToCartButton = productModal.querySelector('.modal-add-to-cart');
const cartContentWrapper = document.getElementById('cart-page').querySelector('section');

// --- Modal Functions ---

function openModal(name, image, price, description, weight) {
    // 1. Convert price string "₱ 21.00" to a number (21.00)
    const numericPrice = parseFloat(price.replace('₱ ', '').replace(',', ''));
    
    // 2. Store the product details globally for when the final "Add to Cart" is clicked
    productInModal = {
        name: name,
        image: image,
        price: numericPrice,
        weight: weight,
        description: description // Keep description just in case
    };

    // 3. Populate the modal with the details
    document.getElementById('modalProductName').textContent = name;
    document.getElementById('modalProductPrice').textContent = price;
    document.getElementById('modalProductWeight').textContent = weight;
    document.getElementById('modalProductDescription').textContent = description;
    document.getElementById('modalProductImage').src = image;
    modalQuantityInput.value = 1; // Always start quantity at 1
    
    // 4. Show the modal
    productModal.style.display = 'block';
}

function closeModal() {
    productModal.style.display = 'none';
}

// Close the modal when clicking outside (standard functionality)
window.onclick = function(event) {
    if (event.target == productModal) {
        closeModal();
    }
}

// --- Core Cart Logic ---

modalAddToCartButton.addEventListener('click', () => {
    const quantity = parseInt(modalQuantityInput.value);
    
    if (quantity < 1 || isNaN(quantity)) {
        alert('Please enter a valid quantity.');
        return;
    }

    // 1. Check if the product is ALREADY in the cart
    const existingItem = cart.find(item => item.name === productInModal.name);

    if (existingItem) {
        // If found, just increase the quantity
        existingItem.quantity += quantity;
    } else {
        // If not found, add a NEW item object to the cart array
        cart.push({
            ...productInModal, // Copy all details from productInModal
            quantity: quantity  // Add the quantity property
        });
    }

    alert(`${quantity} x ${productInModal.name} added to cart!`);
    closeModal();
    updateCartDisplay(); // Always update the cart page after a change
});

// --- Cart Page Rendering and Calculation ---

function updateCartDisplay() {
    // Clear any previous cart list (except for the heading structure)
    let cartContent = cartContentWrapper.querySelector('.dynamic-cart-content');
    if (!cartContent) {
        // Create the container if it doesn't exist
        cartContent = document.createElement('div');
        cartContent.className = 'dynamic-cart-content';
        cartContentWrapper.appendChild(cartContent);
    }
    cartContent.innerHTML = ''; 

    // If the cart is empty
    if (cart.length === 0) {
        cartContent.innerHTML = '<p class="empty-cart-message">Empty cart</p>';
        return;
    }

    let subtotal = 0;
    
    // 1. Build the list of items
    const cartListHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal; // Add to subtotal

        // Use a unique name for a stable 'id' for quantity/remove controls
        const itemIdentifier = item.name.replace(/[^a-zA-Z0-9]/g, '');

        return `
            <li class="cart-item" id="item-${itemIdentifier}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">₱ ${item.price.toFixed(2)}</p>
                    
                    <div class="cart-item-controls">
                        <input type="number" 
                               value="${item.quantity}" 
                               min="1" 
                               id="qty-${itemIdentifier}"
                               onchange="changeQuantity('${item.name}', this.value)">
                        <button onclick="removeItem('${item.name}')">Remove</button>
                    </div>
                </div>
                <p class="cart-item-total">Total: ₱ ${itemTotal.toFixed(2)}</p>
            </li>
        `;
    }).join(''); // Join the array of HTML strings into one big string

    // 2. Build the final summary
    cartContent.innerHTML = `
        <ul class="cart-items-list" style="color">${cartListHTML}</ul>
        <div class="cart-summary">
            <h3>Order Summary</h3>
            <p>Subtotal: ₱ ${subtotal.toFixed(2)}</p>
            <button class="checkout-button">Proceed to Checkout</button>
        </div>
    `;
}

// Function to handle quantity change directly in the cart list
function changeQuantity(productName, newQuantity) {
    const quantity = parseInt(newQuantity);
    const item = cart.find(item => item.name === productName);
    
    if (item) {
        if (quantity > 0) {
            item.quantity = quantity;
        } else {
            // If quantity goes to 0 or less, remove the item
            removeItem(productName);
            return; // Exit early since removeItem will call updateCartDisplay
        }
    }
    updateCartDisplay();
}

// Function to remove an item by its name
function removeItem(productName) {
    // Filter the cart to keep only items whose names DO NOT match the one we want to remove
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
}

// Initial call to ensure the cart page shows "empty" on load
document.addEventListener('DOMContentLoaded', updateCartDisplay);
