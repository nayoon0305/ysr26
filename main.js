const menuDisplay = document.querySelector('.menu-display');
const recommendBtn = document.querySelector('#recommend-btn');
const themeToggle = document.querySelector('#theme-toggle');
const langToggle = document.querySelector('#lang-toggle');

const translations = {
    ko: {
        title: '오늘의 저녁 메뉴 추천',
        recommend_btn: '메뉴 추천받기',
        partnership_title: '제휴 문의',
        placeholder_name: '성함/업체명',
        placeholder_email: '이메일 주소',
        placeholder_message: '문의 내용',
        submit_btn: '문의하기',
        menus: [
            '김치찌개 🥘', '비빔밥 🥗', '불고기 🥩', '스시 🍣', '라면 🍜',
            '피자 🍕', '파스타 🍝', '스테이크 🥩', '타코 🌮', '버거 🍔',
            '치킨 🍗', '쌀국수 🥣', '딤섬 🥟', '팟타이 🍝', '카레 🍛',
            '짜장면 🍜', '떡볶이 🥘', '케밥 🥙', '사시미 🍱', '돈까스 🍛'
        ]
    },
    en: {
        title: 'Dinner Recommendation',
        recommend_btn: 'Recommend Menu',
        partnership_title: 'Partnership Inquiry',
        placeholder_name: 'Name/Company',
        placeholder_email: 'Email Address',
        placeholder_message: 'Inquiry details',
        submit_btn: 'Send Message',
        menus: [
            'Kimchi Jjigae 🥘', 'Bibimbap 🥗', 'Bulgogi 🥩', 'Sushi 🍣', 'Ramen 🍜',
            'Pizza 🍕', 'Pasta 🍝', 'Steak 🥩', 'Tacos 🌮', 'Burger 🍔',
            'Fried Chicken 🍗', 'Pho 🥣', 'Dim Sum 🥟', 'Pad Thai 🍝', 'Curry 🍛',
            'Jajangmyeon 🍜', 'Tteokbokki 🥘', 'Kebab 🥙', 'Sashimi 🍱', 'Donkatsu 🍛'
        ]
    }
};

let currentLang = localStorage.getItem('lang') || 'ko';

function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[currentLang][key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = translations[currentLang][key];
    });

    localStorage.setItem('lang', currentLang);
    recommendMenu(); // Update menu display when language changes
}

function recommendMenu() {
    const menus = translations[currentLang].menus;
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

function toggleLang() {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    updateLanguage();
}

// Initial theme setup
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '🌙';
}

// Event Listeners
recommendBtn.addEventListener('click', recommendMenu);
themeToggle.addEventListener('click', toggleTheme);
langToggle.addEventListener('click', toggleLang);

// Initial language setup
updateLanguage();
