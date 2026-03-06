class productPage {
    constructor(title, category, description, price) {
        this.title = title;
        this.category = category;
        this.description = description;
        this.price = price;

        this.createPage();
    }

    createPage() {
        const page = document.createElement("div"); 
        page.classList.add("product"); // Den går med i klassen
        document.getElementById("productPage").appendChild(page); // Skapar en produktflik inuti 'productPage' sectionen

        const titleElement = document.createElement("div"); // Create title element
        titleElement.classList.add("productTitle"); // Add class
        titleElement.textContent = this.title; // Set title text

        const descriptionElement = document.createElement("div"); // Create description element
        descriptionElement.classList.add("productDescription"); // Add class
        descriptionElement.textContent = this.description; // Set description text

        const priceElement = document.createElement("div"); // Create price element
        priceElement.classList.add("productPrice"); // Add class
        priceElement.textContent = `$${this.price}`; // Set price text and format

        const plusButton = document.createElement("button"); // Create button
        plusButton.classList.add("plusButton"); // Add class
        plusButton.textContent = "+"; // Set button text
        plusButton.onclick = () => {
            // Logic to add the product to the cart can be implemented here
            console.log(`Added ${this.title} to cart`);
        };

        // Append all elements to the product card
        page.appendChild(titleElement);
        page.appendChild(descriptionElement);
        page.appendChild(priceElement);
        page.appendChild(plusButton);

        console.log(`Product ${this.title} is now displayed.`);
    }
}




fetch('http://localhost:3009/productInfo') // Adjust the endpoint as needed
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            new productPage(product.title, product.category, product.description, product.price);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
