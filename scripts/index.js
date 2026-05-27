function renderProducts(gridId, productArray) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = productArray.map(p => `
        <div class="product" data-id="${p.id}">
            ${p.sale ? '<div class="product__sale">SALE</div>' : ''}
            ${p.new ? '<div class="product__new">NEW</div>' : ''}
            <img class="product__img" src="${p.img}" alt="${p.name}">
            <p class="product__name">${p.name}</p>
            <p class="product__price">${p.price}₽</p>
            <button class="product__btn" data-id="${p.id}">Добавить в корзину</button>
        </div>
    `).join('');
    
    bindCartButtons();
    updateAllCartButtons();
}

const showcaseItems = [
    { img: products.shoes[0].img, name: products.shoes[0].name, price: products.shoes[0].price },
    { img: products.bags[0].img, name: products.bags[0].name, price: products.bags[0].price },
    { img: products.shoes[1].img, name: products.shoes[1].name, price: products.shoes[1].price }
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

renderProducts('shoesGrid', products.shoes);
renderProducts('bagsGrid', products.bags);
renderProducts('accessoriesGrid', products.accessories);
renderProducts('jacketsGrid', products.jackets);

const readMoreBtn = document.getElementById('readMoreBtn');
if (readMoreBtn) readMoreBtn.addEventListener('click', () => {
    window.location.href = 'about.html';
});
const categoriesBtn = document.getElementById('categoriesBtn');
if (categoriesBtn) categoriesBtn.addEventListener('click', () => {
    window.location.href = 'catalog.html?type=catalog';
});
const blurArrow = document.getElementById('blurArrow');
if (blurArrow) blurArrow.addEventListener('click', () => {
    window.location.href = 'about.html';
});
const orderBtn = document.getElementById('orderBtn');
if (orderBtn) orderBtn.addEventListener('click', eduAlert);

loadCommonComponents('home').then(() => {
    updateAllCartButtons();
});