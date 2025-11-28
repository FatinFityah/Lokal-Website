// ... (Keep all previous code for displayProducts, addToCart, etc.) ...

// --- FUNCTION: Checkout Page Logic ---
const checkoutList = document.getElementById('checkout-cart-list');
const checkoutTotal = document.getElementById('checkout-total');
const checkoutForm = document.getElementById('checkout-form');

function renderCheckout() {
    if (!checkoutList) return; // Stop if not on checkout page

    checkoutList.innerHTML = '';
    let grandTotal = 0;
    let totalQty = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        grandTotal += itemTotal;
        totalQty += item.qty;

        checkoutList.innerHTML += `
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">${item.name}</h6>
                    <small class="text-muted">Qty: ${item.qty}</small>
                </div>
                <span class="text-muted">RM ${itemTotal.toFixed(2)}</span>
            </li>
        `;
    });

    document.getElementById('cart-count').innerText = totalQty;
    checkoutTotal.innerText = 'RM ' + grandTotal.toFixed(2);
}

// Handle "Place Order" (Dummy Payment)
if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop form from reloading page

        // 1. Collect User Data
        const orderData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            payment: document.getElementById('payment-method').value,
            cart: cart,
            total: checkoutTotal.innerText,
            date: new Date().toISOString()
        };

        // 2. Simulate Payment Processing (Visual feedback)
        const btn = document.querySelector('button[type="submit"]');
        btn.innerHTML = 'Processing Payment...';
        btn.disabled = true;

        // 3. Wait 2 seconds, then "Success"
        setTimeout(() => {
            // SAVE ORDER to Local Storage (Temporary "Database" for Admin)
            let orders = JSON.parse(localStorage.getItem('lokalOrders')) || [];
            orders.push(orderData);
            localStorage.setItem('lokalOrders', JSON.stringify(orders));

            // Clear Cart
            localStorage.removeItem('lokalCart');
            
            // Redirect to Confirmation
            window.location.href = 'confirmation.html'; 
        }, 2000);
    });
}

// Update window.onload to include renderCheckout
window.onload = () => {
    displayProducts();
    renderCartPage();
    renderCheckout();
};
