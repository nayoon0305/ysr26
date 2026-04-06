const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const generateBtn = document.querySelector('#generate-btn');

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

generateBtn.addEventListener('click', generateNumbers);

// Initial generation
generateNumbers();
