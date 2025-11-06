const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
    sidebar.classList.toggle("show")

}

// Modal Logic
const modal = document.getElementById('productModal');
const closeBtn = document.getElementsByClassName('close-btn')[0];

function openProductModal(name, price, imageSrc, weight) {
    // 1. Populate the modal with the product data
    document.getElementById('modal-name').textContent = name;
    document.getElementById('modal-price').textContent = price;
    document.getElementById('modal-image').src = imageSrc;
    document.getElementById('modal-weight').textContent = weight;

    // 2. Display the modal
    modal.style.display = "block";
}

// Function to close the modal
function closeProductModal() {
    modal.style.display = "none";
}

// When the user clicks on (x), close the modal
closeBtn.onclick = function() {
    closeProductModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        closeProductModal();
    }
}

// Optional: Add functionality to the 'Add to Cart' button (currently just an alert)
document.getElementById('add-to-cart-btn').onclick = function() {
    const productName = document.getElementById('modal-name').textContent;
    alert(`${productName} added to cart!`);
    // In a real application, this would call a function to update the cart object
    closeProductModal();
}
