function renderProducts(containerId, categoryFilter = null, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let products = productsData;
    if (categoryFilter) {
        if (categoryFilter === 'popular') {
            products = productsData.filter(p => p.popular === true && !p.discount);
        } else if (categoryFilter === 'sale') {
            products = productsData.filter(p => p.discount);
        } else {
            products = productsData.filter(p => p.category === categoryFilter);
        }
    }

    if (limit) {
        products = products.slice(0, limit);
    }

    const isCarousel = containerId.toLowerCase().includes('carousel');

    container.innerHTML = products.map(p => {
        const productCard = document.createElement('div');
        productCard.className = isCarousel ? 'product-card' : 'col-4';
        
        const discountBadge = p.discount ? `<div class="discount-badge">${p.discount}</div>` : '';
        const priceHTML = p.oldPrice 
            ? `<p><span class="old-price">${p.oldPrice}</span> ${p.price}</p>` 
            : `<p>${p.price}</p>`;

        productCard.innerHTML = `
            ${discountBadge}
            <a href="product_details.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
            <a href="product_details.html?id=${p.id}"><h4>${p.name}</h4></a>
            <div class="rating">
                ${'<i class="fa fa-star"></i>'.repeat(Math.floor(p.rating || 5))}
                ${'<i class="fa fa-star-o"></i>'.repeat(5 - Math.floor(p.rating || 5))}
            </div>
            ${priceHTML}
            <button onclick="addToCart(${p.id})" class="add-to-cart-btn">В кошик</button>
        `;
        return productCard.outerHTML;
    }).join('');
}

function renderSingleProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = productsData.find(p => p.id === productId);

    if (product) {
        // Заповнюємо основні дані
        const nameEl = document.getElementById('ProductName');
        const priceEl = document.getElementById('ProductPrice');
        const imgEl = document.getElementById('ProductImg');
        const descEl = document.getElementById('ProductDesc');
        const catEl = document.getElementById('ProductCategory');

        if (nameEl) nameEl.innerText = product.name;
        if (priceEl) priceEl.innerText = product.price;
        if (imgEl) imgEl.src = product.image;
        if (descEl) descEl.innerText = product.description || "Опис скоро з'явиться...";
        if (catEl) catEl.innerText = "Головна / " + (product.category === 'popular' ? 'Популярні' : product.category);
        
        // Додаємо дію для кнопки кошика
        const cartBtn = document.querySelector('.single-product .btn');
        if (cartBtn) {
            cartBtn.setAttribute('onclick', `addToCart(${product.id}); return false;`);
        }
    }
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('hobbytCart')) || [];
    const product = productsData.find(p => p.id === productId);
    
    if (product) {
        cart.push({...product, quantity: 1});
        localStorage.setItem('hobbytCart', JSON.stringify(cart));
        updateCartBadge();
        alert('Товар додано до кошика!');
    }
}

function updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const cart = JSON.parse(localStorage.getItem('hobbytCart')) || [];
    const count = cart.length;

    badges.forEach(badge => {
        if (count > 0) {
            badge.innerText = count;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    });
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    let cart = JSON.parse(localStorage.getItem('hobbytCart')) || [];
    let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = '<tr><td colspan="3" style="text-align:center; padding: 50px;">Кошик порожній</td></tr>';
        document.getElementById('cart-subtotal').innerText = '0 ₴';
        document.getElementById('cart-tax').innerText = '0 ₴';
        document.getElementById('cart-total').innerText = '0 ₴';
        return;
    }

    container.innerHTML = cart.map((item, index) => {
        const price = parseInt(item.price.replace(/[^\d]/g, ''));
        subtotal += price * item.quantity;
        return `
            <tr>
                <td>
                    <div class="cart-info">
                        <img src="${item.image}">
                        <div>
                            <p>${item.name}</p>
                            <small>Ціна: ${item.price}</small>
                            <br>
                            <a href="#" onclick="removeFromCart(${index}); return false;" style="color: #ff523b;">Видалити</a>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="${item.quantity}" disabled></td>
                <td>${item.price}</td>
            </tr>
        `;
    }).join('');

    const tax = Math.round(subtotal * 0.2);
    const total = subtotal + tax;

    document.getElementById('cart-subtotal').innerText = subtotal.toLocaleString() + ' ₴';
    document.getElementById('cart-tax').innerText = tax.toLocaleString() + ' ₴';
    document.getElementById('cart-total').innerText = total.toLocaleString() + ' ₴';
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('hobbytCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('hobbytCart', JSON.stringify(cart));
    renderCart();
    updateCartBadge();
}

function renderSiteContent() {
    // Шукаємо всі елементи з атрибутом data-content
    // Формат: data-content="page.key" (наприклад: "index.heroTitle")
    const elements = document.querySelectorAll('[data-content]');
    elements.forEach(el => {
        const path = el.getAttribute('data-content').split('.');
        if (path.length === 2 && siteContent[path[0]] && siteContent[path[0]][path[1]]) {
            el.innerText = siteContent[path[0]][path[1]];
        }
    });
}

// Початковий запуск при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    // Перевіряємо чи є параметр категорії в URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');

    renderProducts('popularCarousel', 'popular');
    renderProducts('newProductsCarousel', 'sale', 10);
    
    // Якщо ми на сторінці продуктів, рендеримо або категорію, або все
    if (categoryFromUrl) {
        renderProducts('all-products-list', categoryFromUrl);
        const titleEl = document.querySelector('.row-2 h2');
        if (titleEl) {
            const catNames = {
                'handles': 'Ручки для тренувань',
                'sets': 'Сети для тренувань',
                'blocks': 'Блоки для тренувань',
                'tables': 'Столи для тренувань'
            };
            titleEl.innerText = catNames[categoryFromUrl] || 'Товари';
        }
    } else {
        renderProducts('all-products-list');
    }

    renderSiteContent();
    renderCart();
    updateCartBadge();
    renderSingleProduct();

    // Додаємо навігацію для нової каруселі
    const newCarousel = document.getElementById('newProductsCarousel');
    const newPrevBtn = document.getElementById('newPrevBtn');
    const newNextBtn = document.getElementById('newNextBtn');

    if (newCarousel && newPrevBtn && newNextBtn) {
        newPrevBtn.addEventListener('click', () => {
            newCarousel.scrollBy({ left: -270, behavior: 'smooth' });
        });
        newNextBtn.addEventListener('click', () => {
            newCarousel.scrollBy({ left: 270, behavior: 'smooth' });
        });
    }
});
