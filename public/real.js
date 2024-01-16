console.log("socket");

const socket = io();

socket.on("products", (data) => {
  const template = data
    .map(
      (each) => `  
      <div class="col md-4">
      <div class="card">
        <img src="${each.photo}" class="card-img-top" alt="product" height="250">
        <div class="card-body">
          <h5 class="card-title">${each.title}</h5>
          <p class="card-text">$ ${each.price}</p>
          <p class="card-text">En stock: ${each.stock}</p>
        </div>
      </div>
      </div>
    `
    )
    .join("");
  document.querySelector("#products").innerHTML = template;
});

document.querySelector("#newProduct").addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const photo = document.querySelector("#photo").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;
  const data = {};
  title && (data.title = title);
  photo && (data.photo = photo);
  price && (data.price = price);
  stock && (data.stock = stock);
  socket.emit("newProduct", data);
  resetForm();
});

const resetForm = () => {
  document.querySelector("#title").value = "";
  document.querySelector("#photo").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#stock").value = "";
};
