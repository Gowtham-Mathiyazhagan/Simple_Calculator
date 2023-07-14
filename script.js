const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.querySelector('#clear-btn');
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': secondNumber => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let waitNextValue = false;
sendNumberValue = number => {
  
  if (waitNextValue) {
    calculatorDisplay.textContent = number;
    waitNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
};


addDecimal = () => {
  
  if (waitNextValue) return;
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
};


useOperator = operator => {
  const currentValue = Number(calculatorDisplay.textContent);
  
  if (operatorValue && waitNextValue) {
    
    operatorValue = operator;
    return;
  }
 
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  
  waitNextValue = true;
  operatorValue = operator;
};


resetAll = () => {
  firstValue = 0;
  operatorValue = '';
  waitNextValue = false;
  calculatorDisplay.textContent = '0';
};


inputBtns.forEach(inputBtn => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', addDecimal);
  }
});


clearBtn.addEventListener('click', resetAll);