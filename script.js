
const display = document.querySelector('.displayValue');
let displayValue = '0';

let state = {
    a: [],
    b: [],
    operator: '',
}

addBoxEvents()

function calculator(input) {
    if (input === 'clear') {
        state.a = [];
        state.b = [];
        state.operator = '';
    } else if (isOperator(input)) {
        if (state.operator === input) {
            state.operator = ''
        } else if (state.b.length === 0 && input === '=') {
            state.operator = ''
        } else if (state.b.length !== 0) {
            state.a = operate(state.operator, state.a, state.b)
            state.b = []
            if (input === '=') {
                state.operator = ''
            } else {
                state.operator = input;
            }
        } else {
            state.operator = input;
        }
    } else if (state.a.length !== 0 && state.operator === '=') {
        state.a = [input];
        state.b = [];
        state.operator = ''
    } else if (state.operator === '' || state.operator === '=') {
        if (!(state.a.includes('.') && input === '.')) {
            state.a.push(input);
        }
    } else {
        if (!(state.b.includes('.') && input === '.')) {
            state.b.push(input);
        }
    };
    display.textContent = populate()
};

function addBoxEvents() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const input = e.target.innerText;
            if (isOperator(input)) {
                if (e.target.classList.contains('marked')) {
                    e.target.classList.remove('marked')
                } else {
                    allMarked = document.querySelectorAll('.marked');
                    if (allMarked) {
                        allMarked.forEach((m) => m.classList.remove('marked'))
                    }
                    if (input !== '=') {
                        e.target.classList.add('marked')
                    }
                }
            } else {
                allMarked = document.querySelectorAll('.marked');
                if (allMarked) {
                    allMarked.forEach((m) => m.classList.remove('marked'))
                }
            }
            calculator(e.target.innerText);
        });
    });
}

const populate = function () {
    if (state.a.length === 0) {
        displayValue = '0';
    } else if (state.b.length !== 0) {
        displayValue = state.b.join("");
    } else {
        displayValue = state.a.join("");
    }
    return displayValue;
};

const isOperator = (i) => (['/', '*', '-', '+', '='].includes(i)) ? true : false;
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (operator, a, b) => {
    a = parseFloat(a.join(""))
    b = parseFloat(b.join(""))
    let out;
    if (operator === '+') {
        out = add(a, b);
    } else if (operator === '-') {
        out = subtract(a, b);
    } else if (operator === '*') {
        out = multiply(a, b);
    } else {
        out = divide(a, b);
    }
    return out.toString().split("")
}

