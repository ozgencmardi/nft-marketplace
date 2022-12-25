const COLLECTIONS_DUMP = COLLECTIONS;

const createCategories = () => {

const filterCategoriesEl = document.querySelector(".filter__categories");
let categories = ["all"];
COLLECTIONS.forEach((item) => {
    if (categories.findIndex((c) => c == item.category) == -1)
    categories.push(item.category);   
}); 

const categorySwitcher = {
    all: "All",
    sport: "Sport",
    collectibles: "Collectibles",
    art: "Art",
    photography: "Photography",
    music: "Music",
};

categories.forEach((category) => {
    let categoryHTML = `<li class="${category == "all" ? "active" : "" }" onclick="filterCategories(this)" data-category="${category}">${categorySwitcher[category]}</li>`;
    filterCategoriesEl.insertAdjacentHTML("beforeend", categoryHTML);
});

};

const filterCategories = (categoryEl) => {
    const lastActiveEl = document.querySelector("li.active");
    lastActiveEl.classList.remove("active");
    categoryEl.classList.add("active");
    if (categoryEl.dataset.category == "all") {
        COLLECTIONS = COLLECTIONS_DUMP;
    } else {
        COLLECTIONS = COLLECTIONS_DUMP.filter(collection => collection.category == categoryEl.dataset.category);
    }

    listCollections();
};

const listCollections = () => {
    const collectionsEl = document.querySelector(".collections");
    collectionsEl.innerHTML = "";
    COLLECTIONS.forEach((collection) => {
        let collectionsItemHTML = `<div class="collections__item">
        <a class="collections__container" href="${collection.link}">
        <img src="${collection.img}" class="collections__img">
        <div>
          <strong>${collection.name}</strong><br>
          <span>${collection.author}</span>
        </div>
        <div class="collections__price">
          <strong>${collection.price} ETH</strong>
          <img src="./images/ethereum-logo.png" width="24" height="24">
        </div>
        <button>Details</button>
        </a>
      </div>`;
        collectionsEl.insertAdjacentHTML("beforeend", collectionsItemHTML);

    });
};

const searchCollections = (searchkey) => {
    if (searchkey.length > 1) {       
        COLLECTIONS = COLLECTIONS_DUMP.filter((c) => c.name.toLowerCase().includes(searchkey.toLowerCase()));  
    } else {
        COLLECTIONS = COLLECTIONS_DUMP
    }
    listCollections();
};


createCategories();
listCollections();

