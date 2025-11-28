// js/app.js
const productContainer = document.getElementById('product-list');

function displayProducts() {
    productContainer.innerHTML = ''; // Clear existing content
    
    products.forEach(product => {
        // Create the HTML card for each product
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

// Simple Add to Cart function (We will expand this later)
function addToCart(id) {
    alert("Added product ID: " + id + " to cart!");
    // Later: Save this to localStorage
}

// Run the function when page loads
window.onload = displayProducts;
