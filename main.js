const themeToggle = document.querySelector('#theme-toggle');
const langToggle = document.querySelector('#lang-toggle');
const computerChoiceEl = document.querySelector('#computer-choice');
const resultMessageEl = document.querySelector('#result-message');
const startBtn = document.querySelector('#start-btn');

const translations = {
    ko: {
        title: '가위바위보 게임',
        user_label: '나 (User)',
        computer_label: '컴퓨터 (CPU)',
        start_msg: '"Start"를 눌러 게임을 시작하세요!',
        loading_msg: '모델 로딩 중...',
        ready_msg: '준비... 가위, 바위, 보!',
        win: '이겼습니다! 🎉',
        lose: '졌습니다... 😢',
        draw: '비겼습니다! 🤝',
        start_btn: '게임 시작 (Start)',
        partnership_title: '제휴 문의',
        placeholder_name: '성함/업체명',
        placeholder_email: '이메일 주소',
        placeholder_message: '문의 내용',
        submit_btn: '문의하기',
        rock: '바위',
        paper: '보',
        scissors: '가위'
    },
    en: {
        title: 'Rock Paper Scissors',
        user_label: 'User',
        computer_label: 'Computer',
        start_msg: 'Press "Start" to play!',
        loading_msg: 'Loading model...',
        ready_msg: 'Ready... Rock, Paper, Scissors!',
        win: 'You Win! 🎉',
        lose: 'You Lose... 😢',
        draw: 'It\'s a Draw! 🤝',
        start_btn: 'Start Game',
        partnership_title: 'Partnership Inquiry',
        placeholder_name: 'Name/Company',
        placeholder_email: 'Email Address',
        placeholder_message: 'Inquiry details',
        submit_btn: 'Send Message',
        rock: 'Rock',
        paper: 'Paper',
        scissors: 'Scissors'
    }
};

let currentLang = localStorage.getItem('lang') || 'ko';
const URL = "https://teachablemachine.withgoogle.com/models/I51vD5K1W/"; // This is a placeholder, user should update it if they have a specific one.

let model, webcam, labelContainer, maxPredictions;
let isPlaying = false;

async function init() {
    startBtn.disabled = true;
    resultMessageEl.textContent = translations[currentLang].loading_msg;

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(250, 250, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").innerHTML = '';
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = '';
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
    
    playGame();
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

let lastPrediction = "";

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    let highestProb = 0;
    let bestMatch = "";

    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > highestProb) {
            highestProb = prediction[i].probability;
            bestMatch = prediction[i].className;
        }
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    lastPrediction = bestMatch;
}

function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function getEmoji(choice) {
    if (choice === 'Rock') return '✊';
    if (choice === 'Paper') return '✋';
    if (choice === 'Scissors') return '✌️';
    return '🤖';
}

async function playGame() {
    isPlaying = true;
    resultMessageEl.textContent = translations[currentLang].ready_msg;
    
    // 3 seconds delay before result
    let countdown = 3;
    const countInterval = setInterval(() => {
        if (countdown > 0) {
            resultMessageEl.textContent = countdown + "...";
            countdown--;
        } else {
            clearInterval(countInterval);
            showResult();
        }
    }, 1000);
}

function showResult() {
    const computerChoice = getComputerChoice();
    computerChoiceEl.textContent = getEmoji(computerChoice);
    
    const userChoice = lastPrediction; // Class names should be Rock, Paper, Scissors
    let result = "";

    if (userChoice === computerChoice) {
        result = translations[currentLang].draw;
    } else if (
        (userChoice === 'Rock' && computerChoice === 'Scissors') ||
        (userChoice === 'Paper' && computerChoice === 'Rock') ||
        (userChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
        result = translations[currentLang].win;
    } else {
        result = translations[currentLang].lose;
    }

    resultMessageEl.textContent = result;
    startBtn.disabled = false;
    isPlaying = false;
}

function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = translations[currentLang][key];
    });

    localStorage.setItem('lang', currentLang);
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

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', toggleTheme);
langToggle.addEventListener('click', toggleLang);

updateLanguage();
