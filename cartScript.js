const cartBtn = document.getElementById("cart");
if (!cartBtn) throw new Error("Missing #cart element");

window.items = window.items || [];
let cartState = {
  // items keyed by productId: { id, title, price, discountPrice?, quantity, meta? }
  items: {} // initiated empty
};

document.getElementsByClassName("plusButton").addEventListener('click', addItem());

cartBtn.addEventListener('click', () => {
  // Toggle: if cart exists remove it, otherwise create
  const existing = document.getElementById("cartBody");
  if (existing) existing.remove(); // acts like a toggle
  else cartModule();
});

function cartModule() {
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
  checkoutBtn.addEventListener('click', () => {
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

  // Expose a helper to window so other scripts can add items
  window.cartAddItem = function(item) {
    // item: { id (string|number), title, price (number), discountPrice (optional number), meta (optional) }
    if (!item || !item.id || !item.title || typeof item.price !== 'number') { // if any property is not right
      console.warn("cartAddItem: invalid item", item);
      return;
    }
    const key = String(item.id); //
    if (!cartState.items[key]) {
      cartState.items[key] = { ...item, qty: 1 };
    } else {
      cartState.items[key].qty += 1;
    }
    renderProducts(container, totalValue);
  };

  // Also expose removeAll for testing
  window.cartClear = function() {
    cartState.items = {};
    renderProducts(container, totalValue);
  };
}

// Render logic: builds product nodes from cartState.items
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
    const it = cartState.items[key];
    const product = document.createElement("div");
    product.classList.add("product");

    const left = document.createElement("div");
    left.classList.add("productName");
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = it.title;
    left.appendChild(title);
    if (it.meta) {
      const meta = document.createElement("div");
      meta.classList.add("meta");
      meta.textContent = it.meta;
      left.appendChild(meta);
    }

    const right = document.createElement("div");
    right.classList.add("priceContainer");

    const priceP = document.createElement("p");
    priceP.classList.add("productPrice");
    const priceToUse = (typeof it.discountPrice === 'number' && it.discountPrice < it.price) ? it.discountPrice : it.price;
    priceP.textContent = formatCurrency(priceToUse * it.qty);

    if (typeof it.discountPrice === 'number' && it.discountPrice < it.price) {
      const disc = document.createElement("p");
      disc.classList.add("priceDiscount");
      disc.textContent = formatCurrency(it.price * it.qty);
      right.appendChild(disc);
    }

    // manipulator
    const manip = document.createElement("div");
    manip.classList.add("productManipulate");

    const minus = document.createElement("div");
    minus.classList.add("minusBtn");
    minus.textContent = "−";
    minus.addEventListener('click', () => {
      it.qty = Math.max(0, it.qty - 1);
      if (it.qty === 0) delete cartState.items[key];
      renderProducts(containerEl, totalValueEl);
    });

    const counter = document.createElement("div");
    counter.classList.add("productCounter");
    counter.textContent = String(it.qty); // qty is a attribute

    const plus = document.createElement("div");
    plus.classList.add("plusBtn");
    plus.textContent = "+";
    plus.addEventListener('click', () => {
      it.qty += 1;
      renderProducts(containerEl, totalValueEl);
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