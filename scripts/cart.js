function getProductById(id) {
    const allProducts = getAllProducts();
    return allProducts.find(p => p.id === id);
}

function renderCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartContent = document.getElementById('cartContent');
    const cartTotalSpan = document.getElementById('cartTotal');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartContent.style.display = 'flex';
    
    let total = 0;
    
    cartItemsContainer.innerHTML = cart.map(item => {
        const product = getProductById(item.id);
        if (!product) return '';
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart__item" data-id="${item.id}">
                <img class="cart__item_img" src="${product.img}" alt="${product.name}">
                <div class="cart__item_info">
                    <p class="cart__item_name">${product.name}</p>
                    <p class="cart__item_price">${product.price} ₽</p>
                </div>
                <div class="cart__item_qty">
                    <button class="cart__item_qty_btn" data-action="decr" data-id="${item.id}">−</button>
                    <span class="cart__item_qty_val">${item.quantity}</span>
                    <button class="cart__item_qty_btn" data-action="incr" data-id="${item.id}">+</button>
                </div>
                <div class="cart__item_total">${itemTotal} ₽</div>
                <button class="cart__item_remove" data-action="remove" data-id="${item.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    }).join('');
    
    cartTotalSpan.textContent = total;
    
    document.querySelectorAll('.cart__item_qty_btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            const action = btn.dataset.action;
            const cart = getCart();
            const item = cart.find(i => i.id === id);
            if (item) {
                if (action === 'incr') {
                    item.quantity += 1;
                } else if (action === 'decr') {
                    item.quantity -= 1;
                    if (item.quantity <= 0) {
                        removeFromCart(id);
                    } else {
                        saveCart(cart);
                    }
                }
                if (item.quantity > 0) saveCart(cart);
                renderCart();
                updateCartCounter();
            }
        });
    });
    
    document.querySelectorAll('.cart__item_remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            removeFromCart(id);
            renderCart();
            updateCartCounter();
        });
    });
}

const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        const cart = getCart();
        if (cart.length === 0) {
            eduAlert();
            return;
        }
        alert('Спасибо за заказ! Это учебный проект, ваш заказ не будет обработан.');
        localStorage.removeItem('cart');
        renderCart();
        updateCartCounter();
    });
}

renderCart();
loadCommonComponents('cart').then(() => {
    updateCartCounter();
});