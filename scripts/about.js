const contactBtn1 = document.getElementById('contactBtn1');
const contactBtn2 = document.getElementById('contactBtn2');
if (contactBtn1) contactBtn1.addEventListener('click', () => {
    window.location.href = 'catalog.html?type=catalog';
});
if (contactBtn2) contactBtn2.addEventListener('click', eduAlert);

loadCommonComponents('about');