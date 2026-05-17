// ---------- ОБЩИЕ ДАННЫЕ ----------
const shoes = [
    { name: "Ботинки JENI", price: 6999, sale: true, img: "/skinhead/assets/shoes1.png" },
    { name: "Казаки DANTE", price: 8999, sale: true, img: "/skinhead/assets/shoes2.png" },
    { name: "Туфли MIA", price: 9999, sale: false, img: "/skinhead/assets/shoes3.png" },
    { name: "Туфли XOMO", price: 6999, sale: true, img: "/skinhead/assets/shoes4.png" }
];

const bags = [
    { name: "Женская сумка IRIS", price: 19099, sale: true, img: "/skinhead/assets/bag1.png" },
    { name: "Женская сумка NIVEL", price: 1999, sale: false, img: "/skinhead/assets/bag2.png" },
    { name: "Сумка через плечо EVA", price: 2999, sale: true, img: "/skinhead/assets/bag3.png" },
    { name: "Маленькая сумка CEBIA", price: 4999, sale: false, img: "/skinhead/assets/bag4.png" }
];

const reviewsData = [
    { name: "Sarah", service: "Качество изделия", text: "Невероятная кожа, сумка стала любимой!", stars: 5, avatar: "/skinhead/assets/avatar1.png" },
    { name: "Tommy", service: "Обувь на заказ", text: "Ботинки сели идеально, ручная работа видна", stars: 4, avatar: "/skinhead/assets/avatar2.png" },
    { name: "Valia", service: "Ремень", text: "Отличный дизайн, прослужит долго", stars: 5, avatar: "/skinhead/assets/avatar3.png" },
    { name: "Alex", service: "Сумка портфель", text: "Стильно и очень качественно", stars: 5, avatar: "/skinhead/assets/avatar2.png" },
    { name: "Maria", service: "Кошелек", text: "Мягкая кожа, аккуратные швы", stars: 4, avatar: "/skinhead/assets/avatar3.png" },
    { name: "John", service: "Рюкзак", text: "Вместительный, выглядит дорого", stars: 5, avatar: "/skinhead/assets/avatar1.png" }
];

function eduAlert() {
    alert("Это учебный проект. Функционал в разработке.");
}