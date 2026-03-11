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



 // Fires off on launch
fetch('http://localhost:3009/productsAsc', {method:'GET',headers:{'Content-Type':'application/json; charset=utf-8'},}) // Adjust the endpoint as needed
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


    
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", function() { // 'input' tar första intypade karaktären - fixa sen
    
    const query = searchBar.value.trim();
    const eQuery = encodeURIComponent(query);
    if(eQuery) {
       search(eQuery); }
    
})


function search(searchQuery)  { //Detta är sökfunktionen
    const page = document.getElementById("productPage");
    page.innerHTML=''; //tömmer produktsidan först
    const filter = document.createElement("div"); filter.id='productFilters'; page.appendChild(filter);
    const alph = document.createElement("input"); alph.id='alphabet'; alph.type='button'; alph.value='A-Z';
    const pri = document.createElement("input"); pri.id='price'; pri.type='button'; pri.value='Price';
    const sea = document.createElement("input"); sea.id='searchBar'; sea.type='text'; sea.placeholder='Search...';
    filter.appendChild(alph); // Lägger tillbaka dessa element...
    filter.appendChild(pri); // för jag glömde att dessa går också bort
    filter.appendChild(sea); // oops
    if(!searchQuery) {
        alert("Actually type in something, thank you"); //om inget skrivs
        return;
    }
    else if(isNaN(searchQuery)) { //om något skrivs och är inte ett nummer
        const eSearch = encodeURIComponent(searchQuery);

fetch(`http://localhost:3009/productSearch/search?query=${eSearch}`, {method:'GET',headers:{'Content-Type':'application/json; charset=utf-8'},})
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

const ZA = document.getElementById("alphabet"); // Alphabet button

ZA.addEventListener("click", function() {
    nameDir(ZA.value);
});

function nameDir(direction) {
    const page = document.getElementById("productPage");
    page.innerHTML = ''; // Clear the product page first
    const filter = document.createElement("div"); 
    filter.id = 'productFilters'; 
    page.appendChild(filter);
    
    // Create and append elements
    const alph = document.createElement("input"); 
    alph.id = 'alphabet'; 
    alph.type = 'button'; 
    alph.value = (direction === "A-Z") ? "Z-A" : "A-Z"; // Toggle value between A-Z and Z-A

    const pri = document.createElement("input"); 
    pri.id = 'price'; 
    pri.type = 'button'; 
    pri.value = 'Price';

    const sea = document.createElement("input"); 
    sea.id = 'searchBar'; 
    sea.type = 'text'; 
    sea.placeholder = 'Search...';

    // Append newly created elements to filter
    filter.appendChild(alph); 
    filter.appendChild(pri); 
    filter.appendChild(sea); 

    // Determine the fetch URL based on current direction
    const fetchUrl = (direction === "A-Z") ? 'http://localhost:3009/productsDesc' : 'http://localhost:3009/productsAsc';

    // Perform the fetch operation
    fetch(fetchUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            new productPage(product.title, product.category, product.description, product.price);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
}


    /*----------------------------------------------------------------------------------------------------- */
    /*----------------------------------------------------------------------------------------------------- */
    /*----------------------------------------------------------------------------------------------------- */
    /*----------------------------------------------------------------------------------------------------- */
    /*----------------------------------------------------------------------------------------------------- */

    const price = document.getElementById("price"); //prisknappen
    price.addEventListener("click", function() {priceDir(price.value)});

function priceDir(direction) {
    if(direction === "Price") { // neutral by default. Ändra till ascending
    const page = document.getElementById("productPage");
    page.innerHTML=''; //tömmer produktsidan först
    const filter = document.createElement("div"); filter.id='productFilters'; page.appendChild(filter);
    const alph = document.createElement("input"); alph.id='alphabet'; alph.type='button'; alph.value='A-Z';
    const pri = document.createElement("input"); pri.id='price'; pri.type='button'; pri.value='Price';
    const sea = document.createElement("input"); sea.id='searchBar'; sea.type='text'; sea.placeholder='Search...';
    filter.appendChild(alph); // Lägger tillbaka dessa element...
    filter.appendChild(pri); // för jag glömde att dessa går också bort
    filter.appendChild(sea); // oops
    pri.value = "Price-asc"
fetch('http://localhost:3009/pricesAsc', {method:'GET',headers:{'Content-Type':'application/json; charset=utf-8'},}) //Produktrerna från billigast till dyraste
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            new productPage(product.title, product.category, product.description, product.price);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
       }

     else if(direction === "Price-asc") { // Ändra till descending
    const page = document.getElementById("productPage");
    page.innerHTML=''; //tömmer produktsidan först
    const filter = document.createElement("div"); filter.id='productFilters'; page.appendChild(filter);
    const alph = document.createElement("input"); alph.id='alphabet'; alph.type='button'; alph.value='A-Z';
    const pri = document.createElement("input"); pri.id='price'; pri.type='button'; pri.value='Price';
    const sea = document.createElement("input"); sea.id='searchBar'; sea.type='text'; sea.placeholder='Search...';
    filter.appendChild(alph); // Lägger tillbaka dessa element...
    filter.appendChild(pri); // för jag glömde att dessa går också bort
    filter.appendChild(sea); // oops
    pri.value = "Price-desc"
fetch('http://localhost:3009/productsDesc', {method:'GET',headers:{'Content-Type':'application/json; charset=utf-8'},}) //Produktrerna från högst till lägst
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
    auto?.addEventListener('click', function() {
    changeCategory(auto.innerText); });

    
    const bea = document.getElementById("beautyBtn");
    bea?.addEventListener('click', function() {
    changeCategory(bea.innerText); });
    
    const boo = document.getElementById("bookBtn");
    boo?.addEventListener('click', function() {
    changeCategory(boo.innerText); });
    
    const clo = document.getElementById("clothingBtn");
    clo?.addEventListener('click', function() {
    changeCategory(clo.innerText); });

    const ele = document.getElementById("electronicsBtn");
    ele?.addEventListener('click', function() {
    changeCategory(ele.innerText); });

    const gar = document.getElementById("gardenBtn");
    gar?.addEventListener('click', function() {
    changeCategory(gar.innerText); });

    const hea = document.getElementById("healthBtn");
    hea?.addEventListener('click', function() {
    changeCategory(hea.innerText); });

    const hom = document.getElementById("homeBtn");
    hom?.addEventListener('click', function() {
    changeCategory(hom.innerText); });

    const spo = document.getElementById("sportsBtn");
    spo?.addEventListener('click', function() {
    changeCategory(spo.innerText); });

    const toy = document.getElementById("toysBtn");
    toy?.addEventListener('click', function() {
    changeCategory(toy.innerText); });


    function changeCategory(category) {
        const page = document.getElementById("productPage");
    page.innerHTML=''; //tömmer produktsidan först
    const filter = document.createElement("div"); filter.id='productFilters'; page.appendChild(filter);
    const alph = document.createElement("input"); alph.id='alphabet'; alph.type='button'; alph.value='A-Z';
    const pri = document.createElement("input"); pri.id='price'; pri.type='button'; pri.value='Price';
    const sea = document.createElement("input"); sea.id='searchBar'; sea.type='text'; sea.placeholder='Search...';
    filter.appendChild(alph); // Lägger tillbaka dessa element...
    filter.appendChild(pri); // för jag glömde att dessa går också bort
    filter.appendChild(sea); // oops
        
     const eCategory = encodeURIComponent(category); //  säkerställer att speciella karaktärer inte skruvar till queryn
        fetch(`http://localhost:3009/productCategories/${eCategory}`, {method:'GET',headers:{'Content-Type':'application/json; charset=utf-8'},})
    .then(response => response.json()) // får tillbaka produkterna som matchar kategorin
.then(products => { 
            console.log('products', products);
        products.forEach(product => {
            new productPage(product.title, product.category, product.description, product.price);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
    }
    