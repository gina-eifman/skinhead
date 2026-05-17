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

// ---------- ИНИЦИАЛИЗАЦИЯ НАВИГАЦИИ (вызывается после загрузки шапки) ----------
function initNavigation(activePage) {
    const navContainer = document.querySelector('.nav');
    if (!navContainer) return;

    const navLinks = [
        { link: "home", name: "Главная", page: "index.html" },
        { link: "new", name: "Новинки", page: "#" },
        { link: "sale", name: "Распродажа", page: "#" },
        { link: "catalog", name: "Каталог", page: "#" },
        { link: "about", name: "О нас", page: "about.html" },
        { link: "contacts", name: "Контакты", page: "#" }
    ];

    navContainer.innerHTML = navLinks.map(item => `
        <a href="${item.page}" class="nav__link ${activePage === item.link ? 'nav__link_active' : ''}" data-link="${item.link}">${item.name}</a>
    `).join('');

    // Обработчики кликов
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', (e) => {
            const dataLink = link.getAttribute('data-link');
            if (link.classList.contains('nav__link_active')) {
                e.preventDefault();
                return;
            }
            if (dataLink === 'home') {
                if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    window.location.href = '/skinhead/index.html';
                }
            } else if (dataLink === 'about') {
                if (window.location.pathname.endsWith('about.html')) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    window.location.href = '/skinhead/about.html';
                }
            } else {
                e.preventDefault();
                eduAlert();
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

    // Общие обработчики для иконок и ссылок в футере (появятся после загрузки футера)
    document.querySelectorAll('.footer__col-link, .social__icon, .search__filter, .user-actions__icon').forEach(el => {
        el.addEventListener('click', eduAlert);
    });
}

// ---------- ИНИЦИАЛИЗАЦИЯ ЧАТА (после загрузки chat.html) ----------
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
        messageDiv.className = `chat-message chat-message_${sender}`;
        let statusIcon = '';
        if (sender === 'user') {
            if (status === 'read') statusIcon = '<i class="fas fa-check-double"></i>';
            else if (status === 'sent') statusIcon = '<i class="fas fa-check"></i>';
            else if (status === 'error') statusIcon = '<i class="fas fa-times-circle"></i>';
        }
        messageDiv.innerHTML = `
            <div class="chat-message__text">${escapeHtml(text)}</div>
            <div class="chat-message__meta">
                <span class="chat-message__time">${time}</span>
                ${statusIcon ? `<span class="chat-message__status">${statusIcon}</span>` : ''}
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

// ---------- ИНИЦИАЛИЗАЦИЯ КАРУСЕЛИ ОТЗЫВОВ (после загрузки reviews.html) ----------
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
            <div class="review-card">
                <div class="review-card__profile">
                    <img class="review-card__avatar" src="${r.avatar}" alt="${r.name}">
                    <div>
                        <div class="review-card__name">${r.name}</div>
                        <div class="review-card__service">${r.service}</div>
                    </div>
                </div>
                <p class="review-card__text">${r.text}</p>
                <div class="review-card__stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
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

    await loadComponent('footer-placeholder', '/skinhead/components/footer.html');
    // Повторно привязываем обработчики для ссылок в футере (они могли перезаписаться)
    document.querySelectorAll('.footer__col-link, .social__icon, .search__filter, .user-actions__icon').forEach(el => {
        el.addEventListener('click', eduAlert);
    });

    await loadComponent('chat-placeholder', '/skinhead/components/chat.html');
    initChat();

    await loadComponent('reviews-placeholder', '/skinhead/components/reviews.html');
    initReviews();
}