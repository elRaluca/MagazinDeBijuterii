import { getProductById } from "../api/product.js";

document.addEventListener("DOMContentLoaded", async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotalContainer = document.querySelector(".cart-total");

  async function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    for (let id in cart) {
      const product = await getProductById(id);
      product.quantity = cart[id].quantity;

      const productCard = document.createElement("div");
      productCard.setAttribute("data-id", id);
      productCard.innerHTML = `
      <div class="cart-items">
      <div class="cart">
      <div class="product-card">
         <a href="../pages/details.html?id=${product.id}">
          <span>${product.name}</span>
       </a>
     
        <img src="../${product.imageUrl}" width="100px" />
        </div>
        <div class="change-item">
          <button class="decrease" data-id="${id}">-</button>
          <span class="quantity">${product.quantity}</span>
          <button class="increase" data-id="${id}">+</button>
        </div>
          <button class="remove" data-id="${id}">Remove</button>
        </div>
        </div>
      `;

      cartItemsContainer.appendChild(productCard);

      total += product.price * product.quantity;
    }

    cartTotalContainer.innerHTML = `<div class="total-price">Pret Total: ${total} RON</div>`;

    document.querySelectorAll(".increase").forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        cart[productId].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateProductDisplay(productId);
        updateTotalDisplay();
      });
    });

    document.querySelectorAll(".decrease").forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        if (cart[productId].quantity > 1) {
          cart[productId].quantity -= 1;
        } else {
          delete cart[productId];
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        if (cart[productId]) {
          updateProductDisplay(productId);
        } else {
          document.querySelector(`div[data-id="${productId}"]`).remove();
        }
        updateTotalDisplay();
      });
    });

    document.querySelectorAll(".remove").forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        delete cart[productId];
        localStorage.setItem("cart", JSON.stringify(cart));
        document.querySelector(`div[data-id="${productId}"]`).remove();
        updateTotalDisplay();
      });
    });
  }

  async function updateProductDisplay(productId) {
    const product = await getProductById(productId);
    product.quantity = cart[productId].quantity;

    const productCard = document.querySelector(`div[data-id="${productId}"]`);

    productCard.querySelector(".quantity").textContent = product.quantity;
  }

  async function updateTotalDisplay() {
    let total = 0;
    for (let id in cart) {
      const product = await getProductById(id);
      total += cart[id].quantity * product.price;
    }
    cartTotalContainer.innerHTML = `<div class="total-price">Pret Total: ${total} RON</div>`;
  }

  await updateCart();
});
