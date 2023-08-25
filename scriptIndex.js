const AGENDA_URL = "https://striveschool-api.herokuapp.com/api/product/";
const getProduct = function () {
  fetch(AGENDA_URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTVkOWMwMzRmZjAwMTQwM2Y0ZGYiLCJpYXQiOjE2OTI5NDc5MjksImV4cCI6MTY5NDE1NzUyOX0.lUo4CRBp2w0fKL1UQB1Ht_4YwD1qU7JzmigvbHrJ2po",
    },
  })
    .then((res) => {
      console.log("RES", res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero dei prodotti!");
      }
    })
    .then((data) => {
      console.log("PRODOTTI IN DB", data);
      data.forEach((product) => {
        let colTemplate = `
              <div class="col-12 col-md-3 mb-3">
                <div class="card  p-3">
                    <img class=" imm" src=${product.imageUrl}>
                  <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text truncate">${product.description}</p>
                    <p class="card-text">${product.brand}</p>
                    <p>${product.price}€</p>
                    <a href="./backoffice.html?productID=${product._id}" class="btn btn-primary">Edit</a>
                    <a href="./details.html?productID=${product._id}" target="_blanc" class="btn btn-success">More info!</a>                    
                  </div>
                </div>
              </div>
              `;
        let rowReference = document.getElementById("products-container");
        rowReference.innerHTML += colTemplate;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

window.onload = () => {
  getProduct();
};
