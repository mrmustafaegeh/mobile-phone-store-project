const products = [
  { id: 1, name: "iPhone 13", price: 799, image: "./iphone.webp" },
  { id: 2, name: "Samsung Galaxy S21", price: 699, image: "./samsung.jpeg" },
  { id: 3, name: "OnePlus 9", price: 729, image: "./OnePlus.webp" },
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".product-list");

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="details">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    productList.appendChild(card);
  });
});

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const alreadyInCart = cart.find((item) => item.id === productId);

  if (product && !alreadyInCart) {
    cart.push(product);
    updateCartUI();
    alert(`${product.name} added to cart!`);
  } else {
    alert(`${product.name} is already in your cart.`);
  }
}

function updateCartUI() {
  document.getElementById("cart-count").textContent = cart.length;

  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  document.getElementById("cart-total").textContent = total.toFixed(2);
}

function toggleCart() {
  document.getElementById("cart-view").classList.toggle("hidden");
}

// Close cart when clicking outside of it
document.addEventListener("click", (event) => {
  const cartView = document.getElementById("cart-view");
  const cartButton = document.querySelector(".cart button");

  // Only close if cart is visible and the click was outside
  if (
    !cartView.classList.contains("hidden") &&
    !cartView.contains(event.target) &&
    !cartButton.contains(event.target)
  ) {
    cartView.classList.add("hidden");
  }
});
