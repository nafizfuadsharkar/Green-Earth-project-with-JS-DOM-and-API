const cart = [];

// load trees
const loadTrees = fetch("https://openapi.programming-hero.com/api/plants")
  .then((res) => res.json())
  .then((json) => displayTrees(json.plants));

// display trees
const displayTrees = (trees) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  for (let tree of trees) {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
      <div class="card bg-base-100 w-full shadow-sm flex flex-col gap-3">
        <figure class="h-48">
          <img class="rounded-2xl p-2 h-full w-full object-cover object-center"
            src="${tree.image}"
            alt="Tree"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">${tree.name}</h2>
          <p class="h-32">${tree.description}</p>
          <div class="card-actions justify-between">
            <div class="badge rounded-full bg-[#DCFCE7] text-[#15803D]">${tree.category}</div>
            <div class="font-bold"><p>৳<span>${tree.price}</span></p></div>
          </div>
          <div>
            <button class="add-cart-btn btn bg-[#15803D] rounded-full text-white w-full py-2 text-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;

    cardContainer.append(cardDiv);

    // attach event to this card's button
    const btn = cardDiv.querySelector(".add-cart-btn");
    btn.addEventListener("click", () => {
      const data = {
        name: tree.name,
        price: tree.price,
      };
      cart.push(data);
      addToCart();
    });
  }
};

// add to cart
function addToCart() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  let totalPrice = 0;

  cart.forEach((data, index) => {
    totalPrice += Number(data.price); // accumulate total

    const div = document.createElement("div");
    div.innerHTML = `
      <div class="bg-[#f0fdf4] rounded-xl px-1 py-3 flex justify-between items-center mt-3 w-[95%] m-auto">
        <div>
          <h1>${data.name}</h1>
          <p>৳${data.price}</p>
        </div>
        <p class="delete-btn cursor-pointer text-red-500" data-index="${index}">
          <i class="fa-solid fa-xmark"></i>
        </p>
      </div>
    `;
    cartContainer.append(div);
  });

  // add total section at bottom
  const totalDiv = document.createElement("div");
  totalDiv.classList = "flex justify-between items-center p-2 border-t mt-3";
  totalDiv.innerHTML = `
    <h2 class="text-xl font-bold">Total</h2>
    <h2 class="text-xl font-bold">৳<span id="total">${totalPrice}</span></h2>
  `;
  cartContainer.append(totalDiv);

  // attach delete event
  const deleteButtons = cartContainer.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.getAttribute("data-index");
      cart.splice(index, 1); // remove item
      addToCart(); // re-render with updated total
    });
  });
}

loadTrees();
