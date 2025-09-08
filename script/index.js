const cart = [];

const manageSpiner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("category-container").classList.add("hidden");
  } else {
    document.getElementById("category-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
// category load
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategory(json.categories));
};

const displayCategory = (plants) => {
  const categoryContainer = document.getElementById("category-container");
  console.log(plants);
  for (let plant of plants) {
    const btnCat = document.createElement("div");
    btnCat.innerHTML = `
    <button id="category-btn-${plant.id}" onclick="loadCategoryPlant(${plant.id})" class="text-lg cat-btn">${plant.category_name}</button>
    `;
    categoryContainer.append(btnCat);
  }
};

const removeActive = () => {
  const catBtn = document.querySelectorAll(".cat-btn");
  catBtn.forEach((btn) => btn.classList.remove("active"));
};

const loadCategoryPlant = (id) => {
  // spinner
  manageSpiner(true);
  // load trees
  const loadTrees = fetch(
    `https://openapi.programming-hero.com/api/category/${id}`
  )
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const clickBtn = document.getElementById(`category-btn-${id}`);
      clickBtn.classList.add("active");
      displayTrees(json.plants);
    });
};
loadCategory();

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
          <h2 onclick="loadWordDetail(${tree.id})" class="card-title">${tree.name}</h2>
          <p class="min-h-32">${tree.description}</p>
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
  manageSpiner(false);
};

// modal showing
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.plants);
};

const displayWordDetails = (tree) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <div class="bg-base-100 w-full">
      <h2 class="card-title">${tree.name}</h2>
      <img
        class="rounded-2xl h-64 w-full object-cover object-center"
        src="${tree.image}"
        alt="${tree.name}"
      />
      <div>
        <b>Category: </b>${tree.category}</div>
      <div class="font-bold">
        <p><b>Price:</b> ৳<span>${tree.price}</span></p>
      </div>
      <div><p class=""><b>Description:</b>${tree.description}</p></div>
    </div>
  `;
  document.getElementById("plant_modal").showModal();
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
