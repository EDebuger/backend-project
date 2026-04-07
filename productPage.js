class productPage {
    constructor(id,title, category, description, price) {
        this.id = id;
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
        plusButton.addEventListener('click', () => {
            const itemData = {
            id: this.title,              // use unique id in real app
            title: this.title,
            price: Number(this.price),
            category: this.category
        };
         window.items.push(itemData); //
        console.log(`Added ${this.title} to cart`);

        if (typeof window.cartAddItem === 'function') {
    window.cartAddItem(itemData);
  } else {
    console.warn('cartAddItem not available');
  }

  console.log(`Added ${this.title} to items array`);
;
    })
    
    // Append all elements to the product card
    page.appendChild(titleElement);
    page.appendChild(descriptionElement);
    page.appendChild(priceElement);
    page.appendChild(plusButton);
    
    console.log(`Product ${this.id}: ${this.title} is now displayed.`);
};
}




 // Fires off on launch
fetch('http://localhost:3009/productsAsc', {method:'GET',headers:{'Content-Type':'application/json; charset=utf-8'},}) // Adjust the endpoint as needed
    .then(response => response.json()) //Response är vad vi får tillbaka och blir en parameter
    .then(products => { // products blir json objekten
        products.forEach(product => {
            new productPage(product.id, product.name, product.category, product.description, product.price);
        });
    })
    .catch(error => console.error('Error fetching products:', error));

/*------------------------------------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------- */


    
const searchBar = document.getElementById("searchBar");


// Trigger search only when Enter is pressed
searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchBar.value.trim();
    search(query);
  }
});

// AI suggested this:
// If you also want an immediate live-search (after typing stops), uncomment:
// searchBar.addEventListener("input", debounce(() => {
//   const q = searchBar.value.trim();
//   if (q) search(q);
// }, 400));

function search(searchQuery) {
  const page = document.getElementById("productPage");
  page.innerHTML = ''; // clear product area first

  // recreate filter UI (but do NOT recreate the searchBar input with same id)
  const filter = document.createElement("div");
  filter.id = 'productFilters';
  page.appendChild(filter);

  const alph = document.createElement("input");
  alph.id = 'alphabet';
  alph.type = 'button';
  alph.value = 'A-Z';

  const pri = document.createElement("input");
  pri.id = 'price';
  pri.type = 'button';
  pri.value = 'Price';

  // Instead of creating another input with id="searchBar", reuse the existing one:
  const existingSearchBar = document.getElementById("searchBar");
  // Move it into the filter so it remains the same element and keeps its listeners/state
  filter.appendChild(alph);
  filter.appendChild(pri);
  if (existingSearchBar) filter.appendChild(existingSearchBar);

  if (!searchQuery) {
    alert("Actually type in something, thank you");
    return;
  }

  // If the query is numeric and you want to treat it differently, handle here.
  // Otherwise just perform the GET with encoded query.
  if (isNaN(searchQuery) || typeof searchQuery === 'string') {
    const eSearch = encodeURIComponent(searchQuery);
    fetch(`http://localhost:3009/productSearch/search?query=${eSearch}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(products => {
        // Ensure products is an array
        if (!products) return;
        if (!Array.isArray(products)) products = [products];

        products.forEach(product => {
          // Adjust constructor args to match your productPage signature
          // Earlier you used (title, category, description, price)
          new productPage(product.id, product.name, product.category, product.description, product.price);
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
            new productPage(product.id, product.name, product.category, product.description, product.price);
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
            new productPage(product.id, product.name, product.category, product.description, product.price);
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
            new productPage(product.id, product.name, product.category, product.description, product.price);
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
            new productPage(product.id, product.name, product.category, product.description, product.price);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
    }
    