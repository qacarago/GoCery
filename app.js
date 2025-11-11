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

// Cart
let cart = [];

let productInModal = {};

const productModal = document.getElementById('productModal');
const modalQuantityInput = document.getElementById('quantity');
const modalAddToCartButton = productModal.querySelector('.modal-add-to-cart');
const cartContentWrapper = document.getElementById('cart-page').querySelector('section');

// Modal Functions

function openModal(name, image, price, description, weight) {
    const numericPrice = parseFloat(price.replace('₱ ', '').replace(',', ''));
    
    productInModal = {
        name: name,
        image: image,
        price: numericPrice,
        weight: weight,
        description: description
    };


    document.getElementById('modalProductName').textContent = name;
    document.getElementById('modalProductPrice').textContent = price;
    document.getElementById('modalProductWeight').textContent = weight;
    document.getElementById('modalProductDescription').textContent = description;
    document.getElementById('modalProductImage').src = image;
    modalQuantityInput.value = 1;
    
    productModal.style.display = 'block';
}

function closeModal() {
    productModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == productModal) {
        closeModal();
    }
}

// Cart Logic

modalAddToCartButton.addEventListener('click', () => {
    const quantity = parseInt(modalQuantityInput.value);
    
    if (quantity < 1 || isNaN(quantity)) {
        alert('Please enter a valid quantity.');
        return;
    }

    const existingItem = cart.find(item => item.name === productInModal.name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...productInModal, 
            quantity: quantity
        });
    }

    alert(`${quantity} x ${productInModal.name} added to cart!`);
    closeModal();
    updateCartDisplay();
});

function changeQuantity(productName, newQuantity) {
    const quantity = parseInt(newQuantity);
    const item = cart.find(item => item.name === productName);
    
    if (item) {
        if (quantity > 0) {
            item.quantity = quantity;
        } else {
            removeItem(productName);
            return;
        }
    }
    updateCartDisplay();
}


function removeItem(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
}

document.addEventListener('DOMContentLoaded', updateCartDisplay);


// Streak System
window.streak_counter = document.querySelector('#streak-no');
window.counter = 0; 

function calculateDiscountPercentage(streak) {
    const card = document.querySelector('#file-upload').value;
    if (streak >= 12 && card) {
        return 0.27; // 27% off
    } else if (streak >= 12) {
        return 0.07; // 7% off
    } else if (streak >= 10 && card) {
        return 0.26; // 26% off
    } else if (streak >= 10) {
        return 0.06; // 6% off
    } else if (streak >= 8 && card) {
        return 0.25; // 25% off
    } else if (streak >= 8) {
        return 0.05; // 5% off
    } else if (streak >= 6 && card) {
        return 0.24; // 24% off
    } else if (streak >= 6) {
        return 0.04; // 4% off
    } else if (streak >= 4 && card) {
        return 0.23; // 23% off
    } else if (streak >= 4) {
        return 0.03; // 3% off
    }  else if (streak >= 2 && card) {
        return 0.22; // 22% off
    }  else if (streak >= 2) {
        return 0.02; // 2% off
    }  else if (card) {
        return 0.20; // 20% off
    } else {
        return 0.00; // 0% off
    } 
}


// Cart Page Rendering and Calculation

function updateCartDisplay() {
    let cartContent = cartContentWrapper.querySelector('.dynamic-cart-content');
    if (!cartContent) {
        cartContent = document.createElement('div');
        cartContent.className = 'dynamic-cart-content';
        cartContentWrapper.appendChild(cartContent);
    }
    cartContent.innerHTML = '';

    if (cart.length === 0) {
        cartContent.innerHTML = '<p class="empty-cart-message">Empty cart</p>';
        return;
    }

    let subtotal = 0;
    
    const cartListHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

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
    }).join('');


    const discountPercentage = calculateDiscountPercentage(window.counter);
    const discountAmount = subtotal * discountPercentage;
    const finalTotal = subtotal - discountAmount;
    

    const discountPercentageDisplay = (discountPercentage * 100).toFixed(0);

    let discountHTML = '';
    if (discountAmount > 0) {
        discountHTML = `
            <p class="discount-label">Streak Discount (${discountPercentageDisplay}% off): <span class="discount-amount">- ₱ ${discountAmount.toFixed(2)}</span></p>
        `;
    }


    cartContent.innerHTML = `
        <ul class="cart-items-list" style="color">${cartListHTML}</ul>
        <div class="cart-summary">
            <h3>Order Summary</h3>
            <p>Subtotal: ₱ ${subtotal.toFixed(2)}</p>
            ${discountHTML}
            <p class="final-total">Grand Total: ₱ ${finalTotal.toFixed(2)}</p>
            <button class="checkout-button" onclick="checkout()">Proceed to Checkout</button>
        </div>
    `;
}


function checkout() {
    if (window.usernameValue) {
        const order_container = document.querySelector('#payment-container');
        order_container.style.display = 'flex';
    } else {
        alert('Sign in or register first!');
    }
}

function placeOrder() {
    const order_container = document.querySelector('#payment-container');
    order_container.style.display = 'none';
    const  streak = document.querySelector('#streak');
    
    if (cart.length === 0) {
        alert("The cart is empty. Cannot place order.");
        return;
    }

    alert(`Payment Sucessful`);


    cart = [];
    updateCartDisplay();

    streak.style.display = 'flex';
    window.counter++;
    window.streak_counter.textContent = window.counter;
}

function paymentCancel() {
    const order_container = document.querySelector('#payment-container');
    order_container.style.display = 'none';
}


// Slide Show
const ad_img = ['Category/AD1.png', 'Category/AD2.png', 'Category/AD3.png'];
let ad_container = document.querySelector('#adImage');
let currentIndex = 0; 


if (ad_container) {

    function changeImage() {

        ad_container.setAttribute('src', ad_img[currentIndex]);

        currentIndex++;

        if (currentIndex >= ad_img.length) {
            currentIndex = 0;
        }
    }
    setInterval(changeImage, 4000); 

} else {
    console.error("Image container with ID 'adImage' not found.");
}
