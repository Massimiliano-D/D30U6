const AGENDA_URL = "https://striveschool-api.herokuapp.com/api/product/";

let addressBarContent = new URLSearchParams(window.location.search);

let productID = addressBarContent.get("productID");

console.log("PRODUCTID", productID);

if (productID) {
  document.getElementsByTagName("h2")[0].innerText = "Backoffice page - Edit product";
  document.getElementById("save-button").innerText = "Edit Product";
  document.getElementById("cambioNome").innerText = "Delete Product";
  document.getElementById("nameDelete").innerText = "Delete";
  let deleteButton = document.querySelector(".topperia");
  deleteButton.classList.remove("d-none");
  deleteButton.addEventListener("click", () => {
    fetch(AGENDA_URL + productID, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTVkOWMwMzRmZjAwMTQwM2Y0ZGYiLCJpYXQiOjE2OTI5NDc5MjksImV4cCI6MTY5NDE1NzUyOX0.lUo4CRBp2w0fKL1UQB1Ht_4YwD1qU7JzmigvbHrJ2po",
      },
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          location.assign("index.html");
        } else {
          throw new Error("Problema nell'eliminazione del prodotto");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  fetch(AGENDA_URL + "/" + productID, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTVkOWMwMzRmZjAwMTQwM2Y0ZGYiLCJpYXQiOjE2OTI5NDc5MjksImV4cCI6MTY5NDE1NzUyOX0.lUo4CRBp2w0fKL1UQB1Ht_4YwD1qU7JzmigvbHrJ2po",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero del prodotto");
      }
    })
    .then((product) => {
      console.log("DATI DEL SINGOLO PRODOTTO, RECUPERATO TRAMITE GET SINGOLA", product);
      document.getElementById("name").value = product.name;
      document.getElementById("description").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("price").value = product.price;
      document.getElementById("imageUrl").value = product.imageUrl;
    })
    .catch((error) => {
      console.log(error);
    });
}

const eventForm = document.getElementById("product-form");
eventForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("invio i dati");

  let nameInput = document.getElementById("name");
  let descriptionInput = document.getElementById("description");
  let brandInput = document.getElementById("brand");
  let priceInput = document.getElementById("price");
  let imageURLInput = document.getElementById("imageUrl");

  let newEvent = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    price: priceInput.value,
    imageUrl: imageURLInput.value,
  };
  console.log("prodotto pronto da inviare alle API", newEvent);

  fetch(productID ? AGENDA_URL + productID : AGENDA_URL, {
    method: productID ? "PUT" : "POST",
    body: JSON.stringify(newEvent),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTVkOWMwMzRmZjAwMTQwM2Y0ZGYiLCJpYXQiOjE2OTI5NDc5MjksImV4cCI6MTY5NDE1NzUyOX0.lUo4CRBp2w0fKL1UQB1Ht_4YwD1qU7JzmigvbHrJ2po",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("RESPONSE DELLA CHIAMATA POST", res);
      if (res.ok) {
        alert(productID ? "PRODOTTO MODIFICATO!" : "PRODOTTO CREATO!");
        location.assign("index.html");
      } else {
        alert("ERRORE NEL SALVATAGGIO");
        throw new Error("ERRORE NEL SALVATAGGIO");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

const resetBtn = document.querySelector(".topperia");

resetBtn.addEventListener("click", () => {
  eventForm.reset();
});
