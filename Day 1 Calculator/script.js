let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const display = document.getElementById('display');
const keys = document.getElementById('keys');

function updateDisplay() {
    display.textContent = displayValue;
}

function inputDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal() {
    if (waitingForSecondOperand) {
        displayValue = '0.';
        waitingForSecondOperand = false;
        return;
    }
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

function calculate(first, second, op) {
    switch(op) {
        case '+': return first + second;
        case '-': return first - second;
        case '×': return first * second;
        case '÷': return first / second;
        default: return second;
    }
}

function resetCalculator() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

function handlePercentage() {
    const currentValue = parseFloat(displayValue);
    displayValue = (currentValue / 100).toString();
}

function toggleSign() {
    displayValue = (parseFloat(displayValue) * -1).toString();
}

keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) return;

    if (target.classList.contains('operator')) {
        handleOperator(target.textContent);
        updateDisplay();
        return;
    }

    if (target.classList.contains('top')) {
        if (target.textContent === 'C') {
            resetCalculator();
        } else if (target.textContent === '±') {
            toggleSign();
        } else if (target.textContent === '%') {
            handlePercentage();
        }
        updateDisplay();
        return;
    }

    if (target.textContent === '.') {
        inputDecimal();
        updateDisplay();
        return;
    }

    inputDigit(target.textContent);
    updateDisplay();
});