const urlCatCategories = 'https://api.mercadolibre.com/categories/MLB1081';
const urlDogCategories = 'https://api.mercadolibre.com/categories/MLB1072';
const url = 'https://api.mercadolibre.com/sites/MLB/search?category=MLB1072';

const getDogCategories = async () => {
    const response = await fetch(urlDogCategories);
    const data = await response.json();
    return data.children_categories.slice(0, 3);
}

const getCatCategories = async () => {
    const response = await fetch(urlCatCategories);
    const data = await response.json();
    return data.children_categories.slice(5, 7);
}

const menuCategories = document.querySelector('.categories');
const createItemList = (text) => {
    const li = document.createElement('li');
    const a = document.createElement('a')
    a.innerText = text;
    a.href = '#';
    li.appendChild(a);
    return li;
}

const createListCategories = async () => {
    const cat = await getCatCategories();
    const dog = await getDogCategories();
    const categories = [...dog, ...cat];
    return categories
}

const displayCategories = async () => {
    const categories = await createListCategories();
    categories.forEach((category) => {
        menuCategories.appendChild(createItemList(category.name));
    })
}

displayCategories();

const cards = document.querySelector('.cards');
const createCard = (img, title, price) => {
    const div = document.createElement('div');
    const image = document.createElement('img')
    const h3 = document.createElement('h3');
    const span = document.createElement('span');
    image.src = img.replace('I', 'O');
    h3.innerText = title;
    span.innerText = `R$${price}`;
    div.appendChild(image);
    div.appendChild(h3);
    div.appendChild(span);
    return div; 
}

const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.slice(0, 3);
}

const displayProducts = async () => {
    const results = await getProducts();
    results.map(({ title, price, thumbnail }) => 
    cards.appendChild(createCard(thumbnail, title, price))
    );
}

displayProducts();
