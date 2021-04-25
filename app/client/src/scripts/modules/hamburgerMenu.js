const toggleMenu = () => {
    const menu = document.getElementById('navbar');
    if (!menu) {
        return;
    }

    if (menu.classList.contains('collapse')) {
        menu.classList.remove('collapse');
        return;
    }
    menu.classList.add('collapse');
};

$(document).ready(() => {
    const button = document.getElementById('menuToggle');
    if (button) {
        button.addEventListener('click', toggleMenu);
    }
});
