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




fetch('http://localhost:3009/productsAsc') // Adjust the endpoint as needed
    .then(response => response.json()) //Response är vad vi får tillbaka och blir en parameter
    .then(products => { // products blir json objekten
        products.forEach(product => {
            new productPage(product.title, product.category, product.description, product.price);
        });
    })
    .catch(error => console.error('Error fetching products:', error));

/*------------------------------------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------- */


    const query = document.getElementById("searchBar").innerText;
const eQuery = encodeURIComponent(query);
const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("oninput", search(Equery))

const search = (searchQuery) => { //Detta är sökfunktionen
    document.getElementById("productPage").innerHTML=''; //tommar produktsidan först
    if(!searchQuery) {
        alert("Actually type in something, thank you"); //om inget skrivs
        return;
    }
    else if(NaN(searchQuery)) { //om något skrivs och är inte ett nummer

fetch(`http://localhost:3009/productSearch/search?query=${eQuery}`,)
    .then(response => response.json()) // får tillbaka en produkt
    .then(products => { //Enda produkten vi får tillbaka är den som någorlunda matchar queryn
        products.forEach(product => {
            new productPage(product.title, product.category, product.description, product.price);
        });
    })
    .catch(error => console.error('Error fetching product:', error));
    }
}

/*------------------------------------------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------- */

const ZA = document.getElementById("price"); //Bokstavsknappen
ZA.addEventListener('onClick', nameDir(ZA.innerText));

function nameDir(direction) {
    if(direction === "A-Z") { // Vänder om alfabetsordningen
        document.getElementById("productPage").innerHTML='';
    direction = "Z-A"
fetch('http://localhost:3009/productsDesc') //Produktrerna från högst till lägst
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            new productPage(product.title, product.category, product.description, product.price);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
       }

     else if(direction === "Z-A") { // Ändrar tillbaka
        document.getElementById("productPage").innerHTML='';
    direction = "A-Z"
fetch('http://localhost:3009/productsAsc') //Produktrerna från högst till lägst
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            new productPage(product.title, product.category, product.description, product.price);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
       } 
    }

    /*----------------------------------------------------------------------------------------------------- */
    /*----------------------------------------------------------------------------------------------------- */
    /*----------------------------------------------------------------------------------------------------- */
    /*----------------------------------------------------------------------------------------------------- */
    /*----------------------------------------------------------------------------------------------------- */

    const price = document.getElementById("price"); //prisknappen
price.addEventListener('onClick', priceDir(price.innerText));

function priceDir(direction) {
    if(direction === "Price") { // neutral by default. Ändra till ascending
        document.getElementById("productPage").innerHTML='';
    direction = "Price-asc"
fetch('http://localhost:3009/pricesAsc') //Produktrerna från billigast till dyraste
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            new productPage(product.title, product.category, product.description, product.price);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
       }

     else if(direction === "Price-asc") { // Ändra till descending
        document.getElementById("productPage").innerHTML='';
    direction = "Price-desc"
fetch('http://localhost:3009/productsDesc') //Produktrerna från högst till lägst
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            new productPage(product.title, product.category, product.description, product.price);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
       } 
    }

    /*------------------------------------------------------------------------------------------------ */
    /*------------------------------------------------------------------------------------------------ */
    /*------------------------------------------------------------------------------------------------ */
    /*------------------------------------------------------------------------------------------------ */
    /*------------------------------------------------------------------------------------------------ */

    // Här ska kategoriVäljarna vara

    const auto = document.getElementById("automativeBtn");// Om denna trycks blir den query
    auto.addEventListener('onclick', changeCategory(auto.innerText) );
    
    const bea = document.getElementById("beautyBtn");
    bea.addEventListener('onclick', changeCategory(bea.innerText) );
    
    const boo = document.getElementById("booksBtn");
    boo.addEventListener('onclick', changeCategory(boo.innerText) );
    
    const clo = document.getElementById("clothingBtn");
    clo.addEventListener('onclick', changeCategory(clo.innerText) );

    const ele = document.getElementById("electronicsBtn");
    ele.addEventListener('onclick', changeCategory(ele.innerText) );

    const gar = document.getElementById("gardenBtn");
    gar.addEventListener('onclick', changeCategory(gar.innerText) );

    const hea = document.getElementById("healthBtn");
    hea.addEventListener('onclick', changeCategory(hea.innerText) );

    const hom = document.getElementById("homeBtn");
    hom.addEventListener('onclick', changeCategory(hom.innerText) );

    const spo = document.getElementById("sportsBtn");
    spo.addEventListener('onclick', changeCategory(spo.innerText) );
    
    const toy = document.getElementById("toysBtn");
    toy.addEventListener('onclick', changeCategory(toy.innerText) );


    function changeCategory(category) {
        document.getElementById("productPage").innerHTML='';
        fetch(`http://localhost:3009/productCategories/category?query=${category}`,)
    .then(response => response.json()) // får tillbaka produkterna som matchar kategorin
    .then(products => { 
        products.forEach(product => {
            new productPage(product.title, product.category, product.description, product.price);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
    }
    