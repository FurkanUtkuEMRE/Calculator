// Declare global variables to hold operation values.
let currentOperator = '';
let firstNumber = '';
let currentNumber = '';

// Selectors and event listeners.
const calculatorDisplay = document.querySelector('.display');
const numberButtons = document.querySelectorAll('[data-type="number"]');
const operatorButtons = document.querySelectorAll('[data-type="operator"]');
const equalsButton = document.querySelector('[data-type="equals"]');
const allClearButton = document.querySelector('[data-type="all-clear"]');
const clearButton = document.querySelector('[data-type="clear"]');
const decimalButton = document.querySelector('[data-type="decimal"]');
const warningText = document.querySelector('.warning');

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener('click', setCurrentNumber);
});

document.addEventListener('keypress', setCurrentNumberWithKeys);

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener('click', setOperator);
});

document.addEventListener('keypress', setOperatorWithKeys);

equalsButton.addEventListener('click', calculate);
allClearButton.addEventListener('click', resetCalculator);
clearButton.addEventListener('click', clearLastNumber);
decimalButton.addEventListener('click', setCurrentNumber);

// Set the current number according to the numbers which the user clicked.
function setCurrentNumber(event) {
  if (currentNumber.length >= 8) {
    warningText.textContent = 'Maximum length is 8.';
    return;
  }

  currentNumber += event.target.value;
  calculatorDisplay.textContent = currentNumber;
}

// Helper function for the setCurrentNumberWithKeys function.
function setCurrentNumberHelper(event) {
  currentNumber += event.key;
  calculatorDisplay.textContent = currentNumber;
}

// Set the current number according to the keys pressed.
function setCurrentNumberWithKeys(event) {
  if (currentNumber.length >= 8) {
    warningText.textContent = 'Maximum length is 8.';
    return;
  }

  if (
    event.key === '0' ||
    event.key === '1' ||
    event.key === '2' ||
    event.key === '3' ||
    event.key === '4' ||
    event.key === '5' ||
    event.key === '6' ||
    event.key === '7' ||
    event.key === '8' ||
    event.key === '9'
  ) {
    setCurrentNumberHelper(event);
  }
}

// Sets the current operator and calculates in case there is an ongoing calculation.
function setOperator(event) {
  resetWarningText();

  if (currentOperator !== '') {
    calculate();
    currentOperator = event.target.value;
    firstNumber = calculatorDisplay.textContent;
    currentNumber = '';
  } else {
    currentOperator = event.target.value;
    firstNumber = currentNumber;
    currentNumber = '';
  }
}

// Helper function for the setOperatorWithKeys function.
function setOperatorHelper(event) {
  if (currentOperator !== '') {
    calculate();
    currentOperator = event.key;
    firstNumber = calculatorDisplay.textContent;
    currentNumber = '';
  } else {
    currentOperator = event.key;
    firstNumber = currentNumber;
    currentNumber = '';
  }
}

// Sets the current operator and calculates in case there is an ongoing calculation according to the keys pressed.
function setOperatorWithKeys(event) {
  if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' || event.key === '%') {
    resetWarningText();
    setOperatorHelper(event);
  } else if (event.key === '=') {
    resetWarningText();
    calculate();
  }
}

// Uses the calculation functions depending on the operators.
function calculate() {
  if (currentOperator === '+') {
    calculatorDisplay.textContent = roundDecimals(add(firstNumber, currentNumber));
  } else if (currentOperator === '-') {
    calculatorDisplay.textContent = roundDecimals(subtract(firstNumber, currentNumber));
  } else if (currentOperator === '*') {
    calculatorDisplay.textContent = roundDecimals(multiply(firstNumber, currentNumber));
  } else if (currentOperator === '/') {
    calculatorDisplay.textContent = roundDecimals(divide(firstNumber, currentNumber));
  } else if (currentOperator === '%') {
    calculatorDisplay.textContent = roundDecimals(remainder(firstNumber, currentNumber));
  }
}

// Resets the calculator when AC button is used.
function resetCalculator() {
  currentOperator = '';
  firstNumber = '';
  currentNumber = '';
  calculatorDisplay.textContent = currentNumber;
  warningText.textContent = '';
}

// Deletes the last number given by the user.
function clearLastNumber() {
  currentNumber = '';
  calculatorDisplay.textContent = currentNumber;
  warningText.textContent = '';
}

function resetWarningText() {
  warningText.textContent = '';
}

// Helper function to check if a number is integer or not and round it accordingly.
function roundDecimals(number) {
  if (Number.isInteger(number) === true) {
    return number;
  } else {
    return parseFloat(number.toFixed(5));
  }
}

// Mathematical calculations.
function add(firstNumber, secondNumber) {
  return parseFloat(firstNumber) + parseFloat(secondNumber);
}

function subtract(firstNumber, secondNumber) {
  return parseFloat(firstNumber) - parseFloat(secondNumber);
}

function multiply(firstNumber, secondNumber) {
  return parseFloat(firstNumber) * parseFloat(secondNumber);
}

function divide(firstNumber, secondNumber) {
  return parseFloat(firstNumber) / parseFloat(secondNumber);
}

function remainder(firstNumber, secondNumber) {
  return parseFloat(firstNumber) % parseFloat(secondNumber);
}
