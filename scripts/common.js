// ---------- ЗАГРУЗКА И ВСТАВКА КОМПОНЕНТОВ ----------
async function loadComponent(placeholderId, filePath, callback = null) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        placeholder.innerHTML = html;
        if (callback) callback();
    } catch (error) {
        console.error(`Ошибка загрузки ${filePath}:`, error);
    }
}

// ---------- ИНИЦИАЛИЗАЦИЯ НАВИГАЦИИ ----------
function initNavigation(activePage) {
    const navContainer = document.querySelector('.nav');
    if (!navContainer) return;

    const navLinks = [
        { link: "home", name: "Главная", page: "index.html" },
        { link: "about", name: "О нас", page: "about.html" },
        { link: "catalog", name: "Каталог", page: "catalog.html?type=catalog" },
        { link: "new", name: "Новинки", page: "catalog.html?type=new" },
        { link: "sale", name: "Распродажа", page: "catalog.html?type=sale" }
    ];

    navContainer.innerHTML = navLinks.map(item => `
        <a href="${item.page}" class="nav__link ${activePage === item.link ? 'nav__link_active' : ''}" data-link="${item.link}">${item.name}</a>
    `).join('');

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', (e) => {
            const dataLink = link.getAttribute('data-link');
            if (link.classList.contains('nav__link_active')) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    const logoLink = document.getElementById('logoLink');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ---------- ИНИЦИАЛИЗАЦИЯ ИКОНОК КОРЗИНЫ И ПРОФИЛЯ ----------
function initUserActions() {
    const cartIcon = document.getElementById('cartIcon');
    const profileIcon = document.getElementById('profileIcon');

    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }
    if (profileIcon) {
        profileIcon.addEventListener('click', () => {
            window.location.href = 'profile.html';
        });
    }
}

// ---------- УНИВЕРСАЛЬНАЯ ЛОГИКА КОРЗИНЫ ДЛЯ КАРТОЧЕК ----------
// ---------- ОБНОВЛЕНИЕ СЧЁТЧИКА НА ИКОНКЕ КОРЗИНЫ ----------
function updateCartCounter() {
    const count = getCartCount();
    const cartIcon = document.getElementById('cartIcon');
    
    if (!cartIcon) return;
    
    // Удаляем старый счётчик, если он есть
    const oldCounter = cartIcon.querySelector('.cart-counter');
    if (oldCounter) oldCounter.remove();
    
    if (count > 0) {
        const counter = document.createElement('span');
        counter.className = 'cart-counter';
        counter.textContent = count;
        counter.style.cssText = 'position: absolute; top: -8px; right: -12px; background: #9A3636; color: white; font-size: 12px; border-radius: 50%; padding: 2px 6px; min-width: 18px; text-align: center;';
        cartIcon.style.position = 'relative';
        cartIcon.appendChild(counter);
    }
}
function updateAllCartButtons() {
    const cart = getCart();
    const cartIds = cart.map(item => item.id);
    
    document.querySelectorAll('.product__btn').forEach(btn => {
        const productId = parseInt(btn.dataset.id);
        const isInCart = cartIds.includes(productId);
        
        if (isInCart) {
            btn.textContent = 'В корзине';
            btn.classList.add('product__btn_added');
        } else {
            btn.textContent = 'Добавить в корзину';
            btn.classList.remove('product__btn_added');
        }
    });
}

function handleCartButtonClick(e) {
    e.stopPropagation();
    const btn = e.currentTarget;
    const productId = parseInt(btn.dataset.id);
    const cart = getCart();
    const isInCart = cart.some(item => item.id === productId);
    
    if (isInCart) {
        removeFromCart(productId);
        btn.textContent = 'Добавить в корзину';
        btn.classList.remove('product__btn_added');
    } else {
        addToCart(productId);
        btn.textContent = 'В корзине';
        btn.classList.add('product__btn_added');
    }
    updateCartCounter();
}

function bindCartButtons() {
    document.querySelectorAll('.product__btn').forEach(btn => {
        btn.removeEventListener('click', handleCartButtonClick);
        btn.addEventListener('click', handleCartButtonClick);
    });
}

// ---------- ИНИЦИАЛИЗАЦИЯ ПОИСКА ----------
function initGlobalSearch() {
    const searchInput = document.getElementById('globalSearchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (!searchInput) return;
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query.length >= 2) {
            window.location.href = `catalog.html?type=catalog&search=${encodeURIComponent(query)}`;
        } else if (query.length === 1) {
            eduAlert();
        }
    }
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
    
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
}

// ---------- ИНИЦИАЛИЗАЦИЯ ЧАТА ----------
function initChat() {
    const chatButton = document.getElementById('chatButton');
    const chatWidget = document.getElementById('chatWidget');
    const chatClose = document.getElementById('chatCloseBtn');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSendBtn');

    if (!chatButton || !chatWidget) return;

    function escapeHtml(str) {
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    function addMessage(text, sender, status = 'sent', timestamp = null) {
        const time = timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message_${sender}`;
        let statusIcon = '';
        if (sender === 'user') {
            if (status === 'read') statusIcon = '<i class="fas fa-check-double"></i>';
            else if (status === 'sent') statusIcon = '<i class="fas fa-check"></i>';
            else if (status === 'error') statusIcon = '<i class="fas fa-times-circle"></i>';
        }
        messageDiv.innerHTML = `
            <div class="message__text">${escapeHtml(text)}</div>
            <div class="message__meta">
                <span class="message__time">${time}</span>
                ${statusIcon ? `<span class="message__status">${statusIcon}</span>` : ''}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function loadDemoMessages() {
        addMessage('Minimum text check', 'bot', null, '7:20');
        addMessage('Hide check icon', 'user', 'read', '7:20');
        addMessage('Rapidly build stunning Web Apps with Frest ❌', 'bot', null, '7:21');
        addMessage('Developer friendly, Highly customizable & Carefully crafted HTML Admin Dashboard Template.', 'bot', null, '7:22');
        addMessage('More no. of lines text and showing complete list of features like time stamp + check icon READ', 'user', 'read', '7:23');
    }

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        addMessage(text, 'user', 'read', now);
        chatInput.value = '';
        setTimeout(() => {
            addMessage('Спасибо за сообщение! Мы ответим вам в ближайшее время.', 'bot', null, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }

    chatButton.addEventListener('click', () => {
        chatWidget.classList.toggle('chat_visible');
        if (chatWidget.classList.contains('chat_visible') && chatMessages.children.length === 0) {
            loadDemoMessages();
        }
    });
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatWidget.classList.remove('chat_visible');
        });
    }
    if (chatSend) chatSend.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
}

// ---------- ИНИЦИАЛИЗАЦИЯ КАРУСЕЛИ ОТЗЫВОВ ----------
function initReviews() {
    let reviewPage = 0;
    let pageSize = 3;
    let totalPages = Math.ceil(reviewsData.length / pageSize);
    const track = document.getElementById('reviewsTrack');
    const progressFill = document.getElementById('progressFill');
    const prevBtn = document.getElementById('revPrev');
    const nextBtn = document.getElementById('revNext');

    if (!track || !progressFill) return;

    function updatePageSize() {
        const width = window.innerWidth;
        if (width >= 1024) pageSize = 3;
        else if (width >= 768) pageSize = 2;
        else pageSize = 1;
        totalPages = Math.ceil(reviewsData.length / pageSize);
        if (reviewPage >= totalPages) reviewPage = 0;
        renderReviews();
        updateProgressFill();
    }

    function updateProgressFill() {
        progressFill.style.width = `${((reviewPage + 1) / totalPages) * 100}%`;
    }

    function renderReviews() {
        const start = reviewPage * pageSize;
        const pageItems = reviewsData.slice(start, start + pageSize);
        track.innerHTML = pageItems.map(r => `
            <div class="review">
                <div class="review__profile">
                    <img class="review__avatar" src="${r.avatar}" alt="${r.name}">
                    <div>
                        <div class="review__name">${r.name}</div>
                        <div class="review__service">${r.service}</div>
                    </div>
                </div>
                <p class="review__text">${r.text}</p>
                <div class="review__stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
            </div>
        `).join('');
        updateProgressFill();
    }

    function nextReviewPage() {
        reviewPage = (reviewPage + 1) % totalPages;
        renderReviews();
    }
    function prevReviewPage() {
        reviewPage = (reviewPage - 1 + totalPages) % totalPages;
        renderReviews();
    }

    if (prevBtn) prevBtn.addEventListener('click', prevReviewPage);
    if (nextBtn) nextBtn.addEventListener('click', nextReviewPage);
    window.addEventListener('resize', () => {
        const oldSize = pageSize;
        updatePageSize();
        if (oldSize !== pageSize) renderReviews();
    });
    updatePageSize();
}

// ---------- ОБЩАЯ ФУНКЦИЯ ЗАГРУЗКИ ВСЕХ КОМПОНЕНТОВ ----------
async function loadCommonComponents(activePage) {
    await loadComponent('header-placeholder', '/skinhead/components/header.html');
    initNavigation(activePage);
    initUserActions();
    initGlobalSearch();
    updateCartCounter(); // <-- счётчик обновляется после загрузки шапки
    
    await loadComponent('footer-placeholder', '/skinhead/components/footer.html');
    document.querySelectorAll('.footer__col-link, .social__icon').forEach(el => {
        el.addEventListener('click', eduAlert);
    });

    await loadComponent('chat-placeholder', '/skinhead/components/chat.html');
    initChat();

    await loadComponent('reviews-placeholder', '/skinhead/components/reviews.html');
    initReviews();
}