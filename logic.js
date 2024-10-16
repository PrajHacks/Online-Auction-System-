// Sample product data
let products = [
    { id: '1', title: 'Vintage Clock', description: 'A beautiful vintage clock', startingBid: 50, currentBid: 50, endTime: new Date(Date.now() + 3600000) }, // 1 hour from now
    { id: '2', title: 'Antique Vase', description: 'An exquisite antique vase', startingBid: 100, currentBid: 100, endTime: new Date(Date.now() + 7200000) }  // 2 hours from now
];

// Display top products on the home page
if (document.getElementById('product-items')) {
    function displayTopProducts() {
        const productItems = document.getElementById('product-items');
        productItems.innerHTML = '';

        products.slice(0, 3).forEach(product => { // Display top 3 products
            const productElement = document.createElement('li');
            productElement.innerHTML = `
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p><strong>Current Bid:</strong> $${product.currentBid.toFixed(2)}</p>
                <p><strong>End Time:</strong> ${new Date(product.endTime).toLocaleString()}</p>
                <a href="bid.html?product=${product.id}" class="bid-button">Place a Bid</a>
            `;
            productItems.appendChild(productElement);
        });
    }

    // Initial display of top products
    displayTopProducts();
}

// Handle listing a product (list-product.html)
if (document.getElementById('list-product-form')) {
    document.getElementById('list-product-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('product-title').value;
        const description = document.getElementById('product-description').value;
        const startingBid = parseFloat(document.getElementById('starting-bid').value);
        const endTime = new Date(document.getElementById('end-time').value);

        const newProduct = {
            id: (products.length + 1).toString(),
            title,
            description,
            startingBid,
            currentBid: startingBid,
            endTime
        };

        products.push(newProduct);
        alert('Product listed successfully!');
        
        // Clear form fields
        document.getElementById('list-product-form').reset();
        
        // Optionally, you can redirect to the home page to see the new product in the list
        // window.location.href = 'index.html';
    });
}

// Handle viewing all products (all-products.html)
if (document.getElementById('product-list')) {
    function displayAllProducts() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        products.forEach(product => {
            const productItem = document.createElement('li');
            productItem.className = 'product-item';
            
            productItem.innerHTML = `
                <h3>${product.title}</h3>
                <p><strong>Description:</strong> ${product.description}</p>
                <p><strong>Starting Bid:</strong> $${product.startingBid}</p>
                <p><strong>End Date:</strong> ${new Date(product.endTime).toLocaleDateString()}</p>
                <a href="bid.html?product=${product.id}" class="bid-button">Place a Bid</a>
            `;
            
            productList.appendChild(productItem);
        });
    }

    // Initial display of all products
    displayAllProducts();
}

// Handle product bidding (bid.html)
// Check if we are on the bid.html page
if (window.location.href.includes('bid.html')) {
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    // Find the product by ID
    const selectedProduct = products.find(product => product.id === productId); // Use singular "product" here

    // Display the product details for bidding
    if (selectedProduct) {
        // Ensure HTML elements for displaying the product data are present
        document.getElementById('product-title').textContent = selectedProduct.title;
        document.getElementById('product-description').textContent = selectedProduct.description;
        document.getElementById('starting-bid').textContent = `$${selectedProduct.startingBid.toFixed(2)}`;
        document.getElementById('current-bid').textContent = `$${selectedProduct.currentBid.toFixed(2)}`;
        document.getElementById('end-time').textContent = new Date(selectedProduct.endTime).toLocaleString();

        // Handle the bid form submission
        document.getElementById('bid-form').addEventListener('submit', function (event) {
            event.preventDefault();
            const bidAmount = parseFloat(document.getElementById('bid-amount').value);

            if (bidAmount > selectedProduct.currentBid) {
                selectedProduct.currentBid = bidAmount;
                alert(`Your bid of $${bidAmount.toFixed(2)} has been placed successfully!`);
                
                // Update current bid on the page
                document.getElementById('current-bid').textContent = `$${selectedProduct.currentBid.toFixed(2)}`;
            } else {
                alert('Your bid must be higher than the current bid.');
            }
        });
    } else {
        alert('Product not found.');
    }
}
