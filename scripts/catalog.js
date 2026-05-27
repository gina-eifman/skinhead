const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type') || 'catalog';
const searchQuery = urlParams.get('search') || '';

const pageTitles = {
    catalog: 'Каталог',
    new: 'Новинки',
    sale: 'Распродажа'
};
const pageTitleElement = document.getElementById('pageTitle');
if (pageTitleElement) {
    pageTitleElement.textContent = pageTitles[type] || 'Каталог';
}

const searchInput = document.getElementById('globalSearchInput');
if (searchInput && searchQuery) {
    searchInput.value = decodeURIComponent(searchQuery);
}

let currentCategory = 'all';
let currentLoadedCount = 0;
const itemsPerLoad = 4;
let totalFilteredProducts = [];
let currentSearchQuery = searchQuery;

function flattenProducts() {
    const allProducts = [];
    for (const category in products) {
        if (Array.isArray(products[category])) {
            products[category].forEach(product => {
                allProducts.push({ ...product, category: category });
            });
        }
    }
    return allProducts;
}

function applyFiltersAndSearch() {
    let filtered = flattenProducts();
    
    if (type === 'new') filtered = filtered.filter(p => p.new === true);
    else if (type === 'sale') filtered = filtered.filter(p => p.sale === true);
    
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    if (currentSearchQuery && currentSearchQuery.trim() !== '') {
        const query = currentSearchQuery.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
    }
    
    totalFilteredProducts = filtered;
    currentLoadedCount = Math.min(itemsPerLoad, totalFilteredProducts.length);
    renderProducts();
    
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    if (loadMoreContainer) {
        if (currentLoadedCount < totalFilteredProducts.length) {
            loadMoreContainer.style.display = 'block';
        } else {
            loadMoreContainer.style.display = 'none';
        }
    }
    
    const searchInfo = document.getElementById('searchInfo');
    if (searchInfo && currentSearchQuery && currentSearchQuery.trim() !== '') {
        searchInfo.textContent = `Результаты поиска по запросу "${currentSearchQuery}" (${totalFilteredProducts.length} товаров)`;
        searchInfo.style.display = 'block';
    } else if (searchInfo) {
        searchInfo.style.display = 'none';
    }
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    const productsToShow = totalFilteredProducts.slice(0, currentLoadedCount);
    
    if (productsToShow.length === 0) {
        grid.innerHTML = '<p class="catalog__empty">Товаров не найдено</p>';
        return;
    }
    
    grid.innerHTML = productsToShow.map(p => `
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

function loadMore() {
    const newCount = Math.min(currentLoadedCount + itemsPerLoad, totalFilteredProducts.length);
    if (newCount > currentLoadedCount) {
        currentLoadedCount = newCount;
        renderProducts();
        const loadMoreContainer = document.getElementById('loadMoreContainer');
        if (loadMoreContainer) {
            if (currentLoadedCount < totalFilteredProducts.length) {
                loadMoreContainer.style.display = 'block';
            } else {
                loadMoreContainer.style.display = 'none';
            }
        }
    }
}

function renderCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    if (!container) return;
    
    const categoriesList = [
        { id: "all", name: "Все" },
        { id: "shoes", name: "Обувь" },
        { id: "bags", name: "Сумки" },
        { id: "accessories", name: "Аксессуары" },
        { id: "jackets", name: "Куртки" }
    ];
    
    container.innerHTML = categoriesList.map(cat => `
        <button class="catalog__filter ${currentCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
            ${cat.name}
        </button>
    `).join('');
    
    document.querySelectorAll('.catalog__filter').forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.category;
            renderCategoryFilters();
            currentSearchQuery = '';
            if (searchInput) searchInput.value = '';
            const newUrl = `catalog.html?type=${type}`;
            window.history.pushState({}, '', newUrl);
            applyFiltersAndSearch();
        });
    });
}

function highlightNavLink() {
    const links = document.querySelectorAll('.nav__link');
    links.forEach(link => {
        link.classList.remove('nav__link_active');
        const dataLink = link.getAttribute('data-link');
        if (type === 'catalog' && dataLink === 'catalog') {
            link.classList.add('nav__link_active');
        } else if (type === 'new' && dataLink === 'new') {
            link.classList.add('nav__link_active');
        } else if (type === 'sale' && dataLink === 'sale') {
            link.classList.add('nav__link_active');
        }
    });
}

renderCategoryFilters();
applyFiltersAndSearch();

const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMore);
}

loadCommonComponents(type === 'catalog' ? 'catalog' : (type === 'new' ? 'new' : 'sale')).then(() => {
    highlightNavLink();
    updateAllCartButtons();
});