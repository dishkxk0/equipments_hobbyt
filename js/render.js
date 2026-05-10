function renderProducts(containerId, categoryFilter = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let products = productsData;
    if (categoryFilter) {
        products = productsData.filter(p => p.category === categoryFilter);
    }

    container.innerHTML = products.map(product => `
        <div class="col-4">
            <a href="product_details.html?id=${product.id}"><img src="${product.image}"></a>
            <h4>${product.name}</h4>
            <div class="rating">
                ${Array(5).fill(0).map((_, i) => `<i class="fa fa-star${i < product.rating ? '' : '-o'}"></i>`).join('')}
            </div>
            <p>${product.price}</p>
        </div>
    `).join('');
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
    renderProducts('popular-products', 'popular');
    renderProducts('new-products');
    renderProducts('all-products-list');
    renderSiteContent();
});
