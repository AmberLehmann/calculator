let firstNumber;
let secondNumber;
let operator;
let displayValue;

const buttons = document.querySelectorAll('.buttons');
buttons.forEach(function(elem) {
  elem.addEventListener('click', populateDisplay())
})


function add(firstNum, secondNum) {
  return firstNum + secondNum;
}

function subtract(firstNum, secondNum) {
  return firstNum - secondNum;
}

function multiply(firstNum, secondNum) {
  return firstNum * secondNum;
}

function divide (firstNum, secondNum) {
  return secondNum == 0 ? undefined : firstNum/secondNum;
}

function operate(operator, firstNum, secondNum) {
  switch (operator) {
    case 'add':
      add(firstNum, secondNum);
    case 'subtract':
      subtract(firstNum, secondNum);
    case 'multiply':
      multiply(firstNum, secondNum);
    case 'divide':
      divide(firstNum, secondNum);
  }
}

function populateDisplay() {

}


