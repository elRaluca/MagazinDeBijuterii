import { getAllProducts } from "../api/product.js";
import { getProductById } from "../api/product.js";
import { mapProductAdminTableRow } from "../utils/layout.js";
import { updateProduct } from "../api/product.js";
import { addNewProduct } from "../api/product.js";
import { deleteProduct } from "../api/product.js";

const showFormButton = document.getElementById("show-form-btn");
const formContainer = document.getElementById("form-container");

showFormButton.addEventListener("click", () => {
  if (
    formContainer.style.display === "none" ||
    formContainer.style.display === ""
  ) {
    formContainer.style.display = "block";
    showFormButton.style.display = "none";
  } else {
    formContainer.style.display = "none";
  }
});

const productsTableBody = document
  .getElementById("products-table")
  .querySelector("tbody");

document.addEventListener("DOMContentLoaded", displayAllProducts);

async function displayAllProducts() {
  const products = await getAllProducts();
  productsTableBody.innerHTML = products.map(mapProductAdminTableRow).join("");
}

const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imageUrlInput = document.getElementById("image-url");
const detailsInput = document.getElementById("details");
const categoryInput = document.getElementById("category");
const saveProductButton = document.getElementById("save-btn");
const form = document.getElementById("product-form");
saveProductButton.addEventListener("click", saveProduct);

let editMode = false;
let currentEditableProductId;

async function saveProduct(event) {
  event.preventDefault();

  const product = {
    name: nameInput.value,
    price: Number(priceInput.value),
    imageUrl: imageUrlInput.value,
    details: detailsInput.value,
    category: categoryInput.value,
  };

  if (editMode) {
    const editedProduct = await updateProduct(
      product,
      currentEditableProductId
    );
    if (editedProduct !== null) {
      form.reset();
      displayAllProducts();
      editMode = false;
    }
  } else {
    const newProduct = await addNewProduct(product);
    if (newProduct !== null) {
      form.reset();
      displayAllProducts();
    }
  }
}

productsTableBody.addEventListener("click", handleActions);
async function handleActions(event) {
  console.log(event.target.parentElement.className);
  const className = event.target.parentElement.className;
  if (className.includes("edit")) {
    const productId = className.split("-")[1];
    editProduct(productId);
  } else if (className.includes("delete")) {
    const productId = className.split("-")[1];
    await deleteProduct(productId);
    await displayAllProducts();
  }
}

function editProduct(id) {
  getProductById(id).then((product) => {
    editMode = true;
    nameInput.value = product.name;
    priceInput.value = product.price;
    detailsInput.value = product.details;
    categoryInput.value = product.category;
    imageUrlInput.value = product.imageUrl;

    currentEditableProductId = product.id;
  });
}
