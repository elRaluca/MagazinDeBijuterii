document.addEventListener("DOMContentLoaded", showProductDetails);
const url = "https://66ae0c1bb18f3614e3b69d6b.mockapi.io/products";

if (!document.querySelector(".message-container")) {
  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";
  document.body.prepend(messageContainer);
}

async function showProductDetails() {
  const urlSerchParam = new URLSearchParams(window.location.search);
  const productId = urlSerchParam.get("id");
  const response = await fetch(`${url}/${productId}`);
  const product = await response.json();

  document.querySelector(".main").innerHTML = `
    <div class="container-details">
      <div class="card-details">
        <div class="card-details-leftSide">
          <img src="../${product.imageUrl}" width="200px" />
        </div>
        <div class="card-details-rightSide">
          <div class="card-details-title">
            <h1>${product.name}</h1>
          </div>
          <div class="card-details-productDetails">
            <p>${product.details}</p>
            <p>Stoc: <span class="product-stock">${product.stoc}</span></p>
          </div>
          <div class="price-add">
            <h2>${product.price} RON</h2>
            <button class="add-to-cart" data-id=${product.id}>Adauga in cos</button>
          </div>
        </div>
      </div>
      <div class="diamond-container">
        <img src="../images/diamond.png" class="diamond" />
      </div>
    </div>
  `;

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      let cart = JSON.parse(localStorage.getItem("cart")) || {};
      let currentStock = parseInt(
        document.querySelector(".product-stock").textContent
      );

      if (currentStock > 0) {
        if (cart[productId]) {
          cart[productId].quantity += 1;
        } else {
          cart[productId] = { quantity: 1 };
        }

        currentStock -= 1;
        document.querySelector(".product-stock").textContent = currentStock;

        localStorage.setItem("cart", JSON.stringify(cart));
        showMessage("Produsul a fost adăugat în coș!");
      } else {
        showMessage("Stoc insuficient!");
      }
    });
  });
}

async function updateProductStock(productId, newStock) {
  await fetch(`${url}/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stoc: newStock }),
  });
}

function showMessage(message) {
  const messageContainer = document.querySelector(".message-container");
  messageContainer.textContent = message;
  messageContainer.classList.add("show");

  setTimeout(() => {
    messageContainer.classList.remove("show");
  }, 500);
}
