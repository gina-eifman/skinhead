// Рендер карточек товаров
function renderProducts(gridId, products) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            ${p.sale ? '<div class="product-card__sale">SALE</div>' : ''}
            <img class="product-card__img" src="${p.img}" alt="${p.name}">
            <p class="product-card__name">${p.name}</p>
            <p class="product-card__price">${p.price}₽</p>
            <button class="product-card__btn add-to-cart">Добавить в корзину</button>
        </div>
    `).join('');
    document.querySelectorAll(`#${gridId} .add-to-cart`).forEach(btn => btn.addEventListener('click', eduAlert));
}

// Карусель товаров на главной
const showcaseItems = [
    { img: shoes[0].img, name: shoes[0].name, price: shoes[0].price },
    { img: bags[0].img, name: bags[0].name, price: bags[0].price },
    { img: shoes[1].img, name: shoes[1].name, price: shoes[1].price }
];

let currentShow = 0;
const carouselImg = document.getElementById('carouselImage');
const carouselName = document.getElementById('carouselName');
const carouselPrice = document.getElementById('carouselPrice');
const dotsContainer = document.getElementById('carouselDots');

function updateCarousel() {
    const item = showcaseItems[currentShow];
    if (carouselImg) carouselImg.src = item.img;
    if (carouselName) carouselName.textContent = item.name;
    if (carouselPrice) carouselPrice.textContent = `${item.price}₽`;
    document.querySelectorAll('.dot').forEach((dot, idx) => {
        if (idx === currentShow) dot.classList.add('dot_active');
        else dot.classList.remove('dot_active');
    });
}

function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    showcaseItems.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === currentShow) dot.classList.add('dot_active');
        dot.addEventListener('click', () => { currentShow = idx; updateCarousel(); });
        dotsContainer.appendChild(dot);
    });
}

const prevBtn = document.getElementById('prevSlideBtn');
const nextBtn = document.getElementById('nextSlideBtn');
if (prevBtn) prevBtn.addEventListener('click', () => {
    currentShow = (currentShow - 1 + showcaseItems.length) % showcaseItems.length;
    updateCarousel();
});
if (nextBtn) nextBtn.addEventListener('click', () => {
    currentShow = (currentShow + 1) % showcaseItems.length;
    updateCarousel();
});
buildDots();
updateCarousel();

// Рендер товаров
renderProducts('shoesGrid', shoes);
renderProducts('bagsGrid', bags);

// Кнопки главной страницы
const readMoreBtn = document.getElementById('readMoreBtn');
if (readMoreBtn) readMoreBtn.addEventListener('click', eduAlert);
const categoriesBtn = document.getElementById('categoriesBtn');
if (categoriesBtn) categoriesBtn.addEventListener('click', () => {
    document.querySelector('.section').scrollIntoView({ behavior: 'smooth' });
});
const blurArrow = document.getElementById('blurArrow');
if (blurArrow) blurArrow.addEventListener('click', eduAlert);
const orderBtn = document.getElementById('orderBtn');
if (orderBtn) orderBtn.addEventListener('click', eduAlert);

// Инициализация общих компонентов
loadCommonComponents('home');