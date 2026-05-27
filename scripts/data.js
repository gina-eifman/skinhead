// ---------- ОБЩИЕ ДАННЫЕ ----------
const products = {
    shoes: [
        { id: 1, name: "Ботинки JENI", category: "shoes", price: 6999, sale: true, new: false, img: "/skinhead/assets/shoes1.png" },
        { id: 2, name: "Казаки DANTE", category: "shoes", price: 8999, sale: true, new: true, img: "/skinhead/assets/shoes2.png" },
        { id: 3, name: "Туфли MIA", category: "shoes", price: 9999, sale: false, new: false, img: "/skinhead/assets/shoes3.png" },
        { id: 4, name: "Туфли XOMO", category: "shoes", price: 6999, sale: true, new: false, img: "/skinhead/assets/shoes4.png" },
        { id: 5, name: "Кроссовки RUN", category: "shoes", price: 7999, sale: false, new: true, img: "/skinhead/assets/shoes5.jpg" },
        { id: 6, name: "Лоферы LEO", category: "shoes", price: 8499, sale: true, new: false, img: "/skinhead/assets/shoes6.jpg" },
        { id: 7, name: "Сапоги WINTER", category: "shoes", price: 12999, sale: false, new: true, img: "/skinhead/assets/shoes7.jpg" },
        { id: 8, name: "Мокасины MOC", category: "shoes", price: 5999, sale: true, new: false, img: "/skinhead/assets/shoes8.jpg" },
    ],
    bags: [
        { id: 9, name: "Женская сумка IRIS", category: "bags", price: 19099, sale: true, new: false, img: "/skinhead/assets/bag1.png" },
        { id: 10, name: "Женская сумка NIVEL", category: "bags", price: 1999, sale: false, new: true, img: "/skinhead/assets/bag2.png" },
        { id: 11, name: "Сумка через плечо EVA", category: "bags", price: 2999, sale: true, new: false, img: "/skinhead/assets/bag3.png" },
        { id: 12, name: "Маленькая сумка CEBIA", category: "bags", price: 4999, sale: false, new: false, img: "/skinhead/assets/bag4.png" },
        { id: 13, name: "Рюкзак BACK", category: "bags", price: 8999, sale: true, new: true, img: "/skinhead/assets/bag5.jpg" },
        { id: 14, name: "Клатч NIGHT", category: "bags", price: 3499, sale: false, new: false, img: "/skinhead/assets/bag6.jpg" },
        { id: 15, name: "Шоппер SHOP", category: "bags", price: 2499, sale: true, new: true, img: "/skinhead/assets/bag7.jpg" },
        { id: 16, name: "Дорожная сумка TRAVEL", category: "bags", price: 15999, sale: false, new: false, img: "/skinhead/assets/bag8.jpg" },
    ],
    accessories: [
        { id: 17, name: "Ремень BELT", category: "accessories", price: 2499, sale: true, new: false, img: "/skinhead/assets/acc1.jpg" },
        { id: 18, name: "Кошелёк WALLET", category: "accessories", price: 1899, sale: false, new: true, img: "/skinhead/assets/acc2.jpg" },
        { id: 19, name: "Портмоне PORTO", category: "accessories", price: 2299, sale: true, new: false, img: "/skinhead/assets/acc3.jpg" },
        { id: 20, name: "Браслет BRACE", category: "accessories", price: 999, sale: false, new: true, img: "/skinhead/assets/acc4.jpg" },
        { id: 21, name: "Ключница KEY", category: "accessories", price: 1499, sale: true, new: false, img: "/skinhead/assets/acc5.jpg" },
        { id: 22, name: "Визитница CARD", category: "accessories", price: 1299, sale: false, new: false, img: "/skinhead/assets/acc6.jpg" },
        { id: 23, name: "Чехол для паспорта PASS", category: "accessories", price: 999, sale: true, new: true, img: "/skinhead/assets/acc7.jpg" },
        { id: 24, name: "Обложка для документов DOC", category: "accessories", price: 1799, sale: false, new: false, img: "/skinhead/assets/acc8.jpg" },
    ],
    jackets: [
        { id: 25, name: "Кожаная куртка LEATHER", category: "jackets", price: 24999, sale: true, new: false, img: "/skinhead/assets/jacket1.jpg" },
        { id: 26, name: "Бомбер BOMBER", category: "jackets", price: 18999, sale: false, new: true, img: "/skinhead/assets/jacket2.jpg" },
        { id: 27, name: "Мото-куртка MOTO", category: "jackets", price: 21999, sale: true, new: false, img: "/skinhead/assets/jacket3.jpg" },
        { id: 28, name: "Пиджак BLAZER", category: "jackets", price: 15999, sale: false, new: true, img: "/skinhead/assets/jacket4.jpg" },
        { id: 29, name: "Парка PARKA", category: "jackets", price: 13999, sale: true, new: false, img: "/skinhead/assets/jacket5.jpg" },
        { id: 30, name: "Косуха COSU", category: "jackets", price: 19999, sale: false, new: false, img: "/skinhead/assets/jacket6.jpg" },
        { id: 31, name: "Авиатор AVIATOR", category: "jackets", price: 22999, sale: true, new: true, img: "/skinhead/assets/jacket7.jpg" },
        { id: 32, name: "Джинсовка DENIM", category: "jackets", price: 9999, sale: false, new: true, img: "/skinhead/assets/jacket8.jpg" }
    ],
};

// Категории для фильтрации
const categories = [
    { id: "all", name: "Все" },
    { id: "shoes", name: "Обувь" },
    { id: "bags", name: "Сумки" },
    { id: "accessories", name: "Аксессуары" },
    { id: "jackets", name: "Куртки" }
];

// Отзывы (русифицированные)
const reviewsData = [
    { name: "Сара", service: "Качество изделия", text: "Невероятная кожа, сумка стала любимой!", stars: 5, avatar: "/skinhead/assets/avatar1.png" },
    { name: "Томми", service: "Обувь на заказ", text: "Ботинки сели идеально, ручная работа видна", stars: 4, avatar: "/skinhead/assets/avatar2.png" },
    { name: "Валя", service: "Ремень", text: "Отличный дизайн, прослужит долго", stars: 5, avatar: "/skinhead/assets/avatar3.png" },
    { name: "Алексей", service: "Сумка портфель", text: "Стильно и очень качественно", stars: 5, avatar: "/skinhead/assets/avatar2.png" },
    { name: "Мария", service: "Кошелек", text: "Мягкая кожа, аккуратные швы", stars: 4, avatar: "/skinhead/assets/avatar3.png" },
    { name: "Иван", service: "Рюкзак", text: "Вместительный, выглядит дорого", stars: 5, avatar: "/skinhead/assets/avatar1.png" }
];

function eduAlert() {
    alert("Это учебный проект. Функционал в разработке.");
}

function getAllProducts() {
    return [
        ...products.shoes,
        ...products.bags,
        ...products.accessories,
        ...products.jackets
    ];
}

// Функции для работы с корзиной
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const cart = getCart();
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    saveCart(cart);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item && quantity > 0) {
        item.quantity = quantity;
        saveCart(cart);
    } else if (quantity === 0) {
        removeFromCart(productId);
    }
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.id);
        return total + (product.price * item.quantity);
    }, 0);
}

function getCartCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}