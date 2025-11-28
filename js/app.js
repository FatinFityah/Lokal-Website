// At the VERY TOP of app.js, add this line:
import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ... (Keep your existing displayProducts, addToCart, renderCartPage functions) ...

// --- UPDATED: Handle "Place Order" (Send to Firebase) ---
if (checkoutForm) {
    checkoutForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const btn = document.querySelector('button[type="submit"]');
        btn.innerHTML = 'Processing...';
        btn.disabled = true;

        // 1. Prepare Data
        const orderData = {
            customer_name: document.getElementById('name').value,
            customer_email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            payment_method: document.getElementById('payment-method').value,
            items: cart, // The array of food items
            total_price: checkoutTotal.innerText,
            status: "New", // Default status for Admin
            timestamp: new Date()
        };

        try {
            // 2. Send to Firebase Collection named "orders"
            const docRef = await addDoc(collection(db, "orders"), orderData);
            console.log("Order written with ID: ", docRef.id);

            // 3. Clear Cart & Redirect
            localStorage.removeItem('lokalCart');
            window.location.href = 'confirmation.html';
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error placing order. Check console.");
            btn.innerHTML = 'Place Order';
            btn.disabled = false;
        }
    });
}

// ... (Keep window.onload) ...
