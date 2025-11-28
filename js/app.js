// js/app.js

// 1. Initialize Cart from "Backpack" (Local Storage)
let cart = JSON.parse(localStorage.getItem('lokalCart')) || [];

// 2. Select Elements (These might not exist on every page, so we check)
const productContainer = document.getElementById('product-list');
const cartContainer = document.getElementById('cart-items');
const totalContainer = document.getElementById('cart-total');

// --- FUNCTION: Display Products (Only for Index Page) ---
function displayProducts() {
    if (!productContainer) return; // Stop if we are not on the homepage
    
    productContainer.innerHTML = ''; 
    products.forEach(product => {
        const cardHTML = `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-muted">RM ${product.price.toFixed(2)}</p>
                        <button class="btn btn-warning mt-auto text-white" onclick="addToCart('${product.id}')">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        productContainer.innerHTML += cardHTML;
    });
}

// --- FUNCTION: Add to Cart ---
function addToCart(id) {
    // Check if item is already in cart
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.qty += 1; // Increase quantity
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, qty: 1 }); // Add new item with qty 1
    }

    updateCart();
    alert("Item added to cart!");
}

// --- FUNCTION: Remove from Cart ---
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// --- FUNCTION: Update Cart in Storage & Display ---
function updateCart() {
    localStorage.setItem('lokalCart', JSON.stringify(cart));
    renderCartPage(); // Refresh the view if we are on the cart page
}

// --- FUNCTION: Render Cart Page (Only for Cart Page) ---
function renderCartPage() {
    if (!cartContainer) return; // Stop if we are not on cart page

    cartContainer.innerHTML = '';
    let grandTotal = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty!</td></tr>';
        totalContainer.innerText = '0.00';
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        grandTotal += itemTotal;

        cartContainer.innerHTML += `
            <tr>
                <td><img src="${item.img}" width="50"></td>
                <td>${item.name}</td>
                <td>RM ${item.price.toFixed(2)}</td>
                <td>${item.qty}</td>
                <td>RM ${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.id}')">X</button>
                </td>
            </tr>
        `;
    });

    totalContainer.innerText = grandTotal.toFixed(2);
}

// Initialize
window.onload = () => {
    displayProducts();
    renderCartPage();
};
