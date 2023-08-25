const AGENDA_URL = "https://striveschool-api.herokuapp.com/api/product/";

let productID = new URLSearchParams(window.location.search).get("productID");

const getDetails = function () {
  fetch(AGENDA_URL + `${productID}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTVkOWMwMzRmZjAwMTQwM2Y0ZGYiLCJpYXQiOjE2OTI5NDc5MjksImV4cCI6MTY5NDE1NzUyOX0.lUo4CRBp2w0fKL1UQB1Ht_4YwD1qU7JzmigvbHrJ2po",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero dei prodotti!");
      }
    })
    .then((product) => {
      console.log("PRODOTTO", product);
      let colTemplate = `
        <h2 class=" fs-1 text-center" >${product.name}-${product.brand}</h2>   
        <img class="imgSize"src=${product.imageUrl}>
        <p>${product.description}</p>
        `;
      let rowReference = document.getElementById("details-container");
      rowReference.innerHTML = colTemplate;
    })
    .catch((error) => {
      console.log(error);
    });
};
window.onload = () => {
  getDetails();
};
