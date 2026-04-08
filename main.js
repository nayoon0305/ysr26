const menuDisplay = document.querySelector('.menu-display');
const recommendBtn = document.querySelector('#recommend-btn');
const themeToggle = document.querySelector('#theme-toggle');

const menus = [
    'Kimchi Jjigae 🥘',
    'Bibimbap 🥗',
    'Bulgogi 🥩',
    'Sushi 🍣',
    'Ramen 🍜',
    'Pizza 🍕',
    'Pasta 🍝',
    'Steak 🥩',
    'Tacos 🌮',
    'Burger 🍔',
    'Fried Chicken 🍗',
    'Phở 🥣',
    'Dim Sum 🥟',
    'Pad Thai 🍝',
    'Curry 🍛',
    'Jajangmyeon 🍜',
    'Tteokbokki 🥘',
    'Kebab 🥙',
    'Sashimi 🍱',
    'Donkatsu 🍛'
];

function recommendMenu() {
    let count = 0;
    const interval = setInterval(() => {
        const tempIndex = Math.floor(Math.random() * menus.length);
        displayMenu(menus[tempIndex], false);
        count++;
        if (count > 10) {
            clearInterval(interval);
            const finalIndex = Math.floor(Math.random() * menus.length);
            displayMenu(menus[finalIndex], true);
        }
    }, 50);
}

function displayMenu(menu, animate) {
    menuDisplay.innerHTML = '';
    const menuEl = document.createElement('div');
    menuEl.classList.add('menu-item');
    menuEl.textContent = menu;
    
    if (animate) {
        menuEl.style.transform = 'scale(0.8)';
        menuEl.style.opacity = '0';
        setTimeout(() => {
            menuEl.style.transform = 'scale(1)';
            menuEl.style.opacity = '1';
        }, 10);
    }
    
    menuDisplay.appendChild(menuEl);
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌞';
        localStorage.setItem('theme', 'light');
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '🌙';
}

recommendBtn.addEventListener('click', recommendMenu);
themeToggle.addEventListener('click', toggleTheme);

recommendMenu();
