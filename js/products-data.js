const productsData = [
    {
        id: 1,
        name: "Ручка для армрестлінгу PRO",
        price: "1 200 ₴",
        image: "images/4.png",
        rating: 5,
        category: "popular",
        description: "Професійна ручка з високоякісного композиту для тренування хвату."
    },
    {
        id: 2,
        name: "Ексцентрик для зап'ястя",
        price: "1 100 ₴",
        image: "images/4.png",
        rating: 5,
        category: "popular",
        description: "Ідеальний інструмент для розвитку сили зап'ястя та пальців."
    },
    {
        id: 3,
        name: "Ручка-конус",
        price: "950 ₴",
        image: "images/4.png",
        rating: 4,
        category: "popular",
        description: "Конусна ручка для специфічних вправ на пронацію."
    },
    {
        id: 4,
        name: "Набір для тренувань хвату",
        price: "2 500 ₴",
        image: "images/4.png",
        rating: 5,
        category: "popular",
        description: "Комплексне рішення для професійних рукоборців."
    }
];

const bannerData = {
    slides: [
        {
            image: "images/golovnyj baner.png",
            title: "Потужний хват – твоя перевага",
            text: "Розвивай силу пальців, кистей та передпліч за допомогою професійних ручок."
        },
        {
            image: "images/golovnyj baner 1.png",
            title: "Міцні та надійні матеріали",
            text: "3D-друк з високоякісного пластику витримує інтенсивні навантаження."
        },
        {
            image: "images/golovnyj baner 3.png",
            title: "Компактні та зручні",
            text: "Легкі, портативні та ідеально підходять для тренувань будь-де: в залі чи вдома."
        }
    ]
};

const siteContent = {
    index: {
        heroTitle: "Ми створюємо інструменти для перемоги",
        heroText: "Hobbyt Equipment — це не просто бренд, це спільнота армрестлерів, які прагнуть до досконалості.",
        popularTitle: "Категорії товарів",
        newProductsTitle: "Нові товари"
    },
    about: {
        heroTitle: "Ми створюємо інструменти для перемоги",
        heroText: "Hobbyt Equipment — це не просто бренд, це спільнота армрестлерів, які прагнуть до досконалості.",
        historyTitle: "Наша історія",
        historyText: "Ласкаво просимо до Hobbyt Equipment — виробника професійного обладнання для армреслінгу! Ми розпочали свій шлях у 2025 році...",
        qualityTitle: "Якість понад усе",
        qualityText: "Наші ручки для тренування пронації та супінації розроблені так, щоб мінімізувати травматизм..."
    }
};

// Експортуємо дані для використання в інших скриптах
if (typeof module !== 'undefined') {
    module.exports = { productsData, bannerData, siteContent };
}
