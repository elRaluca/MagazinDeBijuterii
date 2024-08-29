import { mapProductToCard } from "./utils/layout.js";
import { getAllProducts } from "/api/product.js";

document.addEventListener("DOMContentLoaded", displayAllProducts);
const mainContainer = document.querySelector(".main-second-page");

async function displayAllProducts() {
  const products = await getAllProducts();

  mainContainer.innerHTML = products.map(mapProductToCard).join(" ");
}
