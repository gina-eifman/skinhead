// Кнопки контактного блока
const contactBtn1 = document.getElementById('contactBtn1');
const contactBtn2 = document.getElementById('contactBtn2');
if (contactBtn1) contactBtn1.addEventListener('click', eduAlert);
if (contactBtn2) contactBtn2.addEventListener('click', eduAlert);

// Инициализация общих компонентов
loadCommonComponents('about');