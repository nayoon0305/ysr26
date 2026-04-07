const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const generateBtn = document.querySelector('#generate-btn');
const themeToggle = document.querySelector('#theme-toggle');

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    lottoNumbersContainer.innerHTML = '';

    for (const number of numbers) {
        const numberEl = document.createElement('div');
        numberEl.classList.add('lotto-number');
        numberEl.textContent = number;
        lottoNumbersContainer.appendChild(numberEl);
    }
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

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '🌙';
}

generateBtn.addEventListener('click', generateNumbers);
themeToggle.addEventListener('click', toggleTheme);

// Initial generation
generateNumbers();
