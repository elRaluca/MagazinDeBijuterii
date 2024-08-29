export function mapProductToCard(product) {
  return `
     <div class="product-card flex-col gap-20 items-center justify-between">
      <h3 class="card-title">${product.name}</h3>
      <a href="../pages/details.html?id=${product.id}">
       <img src=${product.imageUrl} width="200px"/>
       </a>
      <p class="card-price">${product.price} ron</p>
      <div class="details">
      <a href="../pages/details.html?id=${product.id}">Details</a></div>     
      </div>
    `;
}

export function mapProductAdminTableRow(product) {
  return `
      <tr>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>
        <a href="details.html?id=${product.id}">
         <img src="../${product.imageUrl}" width="50px"/>
        </a>
      </td>
      <td>${product.details}</td>
      <td>${product.category}</td>
      <td><button id="icon-edit" class="edit-${product.id}">
      <i class="fa-regular fa-pen-to-square"></i>
      </button> </td>
      <td>
      <button id="icon-delete" class="delete-${product.id}">
      <i class="fa-solid fa-trash" id=" icon-delete"></i>
      </button>
      </td>
      </tr>      
      `;
}
