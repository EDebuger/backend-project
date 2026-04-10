const cartBtn = document.getElementById("cart"); // the div cart
if (!cartBtn) throw new Error("Missing #cart element"); // it exists, don't worry

window.items = window.items || []; // either there's something or it's an empty array
let cartState = { // where we will add the products
  // items keyed by productId: { id, title, price, discountPrice?, quantity, meta? }
  items: {} // initiated empty
};


//document.getElementsByClassName("plusButton").addEventListener('click', window.cartAddItem(this)); // it works according to console log

cartBtn.addEventListener('click', () => { // does not work
  // Toggle: if cart exists remove it, otherwise create
  const existing = document.getElementById("cartBody");
  if (existing) existing.remove(); // acts like a toggle
  else cartModule(); // launches it off
});

function cartModule() { // creates the module where everything is shown
  const body = document.createElement("div");
  body.id = "cartBody"; // main body

  // header
  const header = document.createElement("div");
  header.id = "cartHeader";
  const title = document.createElement("h3");
  title.textContent = "Din kundvagn";
  const closeBtn = document.createElement("button");
  closeBtn.id = "cartCloseBtn";
  closeBtn.textContent = "✕";
  closeBtn.addEventListener('click', () => body.remove());
  header.appendChild(title);
  header.appendChild(closeBtn);

  // product container
  const container = document.createElement("div");
  container.id = "productContainer";

  // footer with totals & checkout
  const footer = document.createElement("div");
  footer.id = "cartFooter";
  const totalsRow = document.createElement("div");
  totalsRow.classList.add("totalsRow");
  const totalLabel = document.createElement("div");
  totalLabel.textContent = "Totalt:";
  const totalValue = document.createElement("div");
  totalValue.id = "cartTotalValue";
  totalValue.textContent = "0.00 kr"; // initial value
  totalsRow.appendChild(totalLabel);
  totalsRow.appendChild(totalValue);

  const checkoutBtn = document.createElement("button");
  checkoutBtn.classList.add("checkoutBtn");
  checkoutBtn.textContent = "Betala";
  checkoutBtn.addEventListener('click', () => { // when the checkout button is pressed
    if (Object.keys(cartState.items).length === 0) { // Object is the common point between constructed objects, i think
      alert("Kundvagnen är tom.");// checks if any itmes were added, if zero- this outputs
      return; // returns what's in the code block
    }
    // placeholder checkout behavior
    alert("Checkout: " + totalValue.textContent);
    // After checkout, clear cart:
    cartState.items = {};
    renderProducts(container, totalValue);
  });

  footer.appendChild(totalsRow);
  footer.appendChild(checkoutBtn);

  body.appendChild(header);
  body.appendChild(container);
  body.appendChild(footer);

  document.body.appendChild(body);

  // initial render
  renderProducts(container, totalValue);
  // window-scope
  let totalQty = 0;

  // make it a global attribute that gets defined here
  const cartAddItem = function(item) { // can 'this' be recognised as an object
    // item: { id (string|number), title, price (number), discountPrice (optional number), meta (optional) }
    if (!item || !item.id || !item.title || typeof item.price !== 'number') { // if any property is not right
      console.warn("cartAddItem: invalid item", item);
      return;
    }
    const key = String(item.id); // read as string
    if (!cartState.items[key]) { // cartState is an object that contains only 'items: []'
      cartState.items[key] = { ...item, qty: 1 }; // products are recognised by id | if not then it's assumed to be the first
    } else {
      cartState.items[key].qty += 1; // its qty property increases everytime something's added
    }
    totalQty++; // counts for every product
    renderProducts(container, totalValue);
  };

  // Also expose removeAll for testing
  window.cartClear = function() {
    cartState.items = {}; // clear list when prompted
    renderProducts(container, totalValue);
  };

  if(totalQty>0) {
  const show = document.createElement("div");
  cartBtn.appendChild(show); // make it part of it
  show.style.zIndex = 800;
  show.style.display = sticky;
  show.style.width = 20;
  show.style.height = 10;
  show.style.borderRadius = 10;
  show.style.alignContent = center; 
  show.textContent = String(totalQty) // displays current value
    // since it runs every time cartAddItem fires off, it updates
  }
}

// how it gets displayed inside, call for each product
function renderProducts(containerEl, totalValueEl) {
  containerEl.innerHTML = '';
  const keys = Object.keys(cartState.items);
  if (keys.length === 0) {
    const empty = document.createElement("div");
    empty.classList.add("emptyMsg");
    empty.textContent = "Din kundvagn är tom.";
    containerEl.appendChild(empty);
    totalValueEl.textContent = "0.00 kr";
    return;
  }

  let grandTotal = 0; // total of all
  keys.forEach(key => {
    const item = cartState.items[key];
    const product = document.createElement("div");
    product.classList.add("product");

    const left = document.createElement("div");
    left.classList.add("productName");
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = item.title;
    left.appendChild(title);
    if (item.category) {
      const cateogry = document.createElement("div");
      cateogry.classList.add("category");
      cateogry.textContent = item.category;
      left.appendChild(cateogry);
    }

    const right = document.createElement("div");
    right.classList.add("priceContainer");

    const priceP = document.createElement("p");
    priceP.classList.add("productPrice");
    const priceToUse = (typeof item.discountPrice === 'number' && item.discountPrice < item.price) ? item.discountPrice : item.price;
    priceP.textContent = formatCurrency(priceToUse * item.qty);

    if (typeof it.discountPrice === 'number' && item.discountPrice < item.price) { // in retrospect, this is a needless hurdle
      const disc = document.createElement("p");
      disc.classList.add("priceDiscount");
      disc.textContent = formatCurrency(item.price * item.qty); // calculate total of all instances of the product
      right.appendChild(disc);
    }

    // manipulator
    const manip = document.createElement("div");
    manip.classList.add("productManipulate");

    const minus = document.createElement("div"); // minus button
    minus.classList.add("minusBtn");
    minus.textContent = "−";
    minus.addEventListener('click', () => {
      it.qty = Math.max(0, it.qty - 1);
      if (it.qty === 0) delete cartState.items[key]; // if there are none left, remove item container
      renderProducts(containerEl, totalValueEl);
    });

    const counter = document.createElement("div");
    counter.classList.add("productCounter");
    counter.textContent = String(it.qty); // qty is a attribute

    const plus = document.createElement("div"); // plus button
    plus.classList.add("plusBtn");
    plus.textContent = "+";
    plus.addEventListener('click', () => {
      item.qty += 1; // how many do you have
      renderProducts(containerEl, totalValueEl); // renders it over again with the new total
    });

    manip.appendChild(minus);
    manip.appendChild(counter);
    manip.appendChild(plus);

    right.appendChild(priceP);
    right.appendChild(manip);

    product.appendChild(left);
    product.appendChild(right);

    containerEl.appendChild(product);

    grandTotal += priceToUse * it.qty;
  });

  totalValueEl.textContent = formatCurrency(grandTotal);
}

// Utility: format currency (SEK)
function formatCurrency(num) {
  return num.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' });
}