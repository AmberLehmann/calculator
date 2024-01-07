let firstNumber = "";
let secondNumber = "";
let operator = "";
let displayValue = "";
let newEquation = false;

const buttons = document.querySelectorAll('.numbers > div > button');
const display = document.querySelector('.display');
const symbols = document.querySelectorAll('.symbols > button');
const equals = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');


buttons.forEach(function(elem) {
  elem.addEventListener('click',() => {
    populateDisplayNum(elem);
  })
})

symbols.forEach(function(elem) {
  elem.addEventListener('click', () => {
    populateDisplaySymbol(elem);
  })
})

equals.addEventListener('click', () => {
  if(!firstNumber.length == 0 && !secondNumber.length == 0) evaluate();
})

clear.addEventListener('click', () => {
  clearDisplay();
})

backspace.addEventListener('click', () => {
  removeDigit();
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
  return secondNum == 0 ? "You cannot divide by 0." : firstNum/secondNum;
}

function operate(operator, firstNum, secondNum) {
  firstNum = parseFloat(firstNum);
  secondNum = parseFloat(secondNum);
  switch (operator) {
    case '+':
      return add(firstNum, secondNum);
    case '-':
      return subtract(firstNum, secondNum);
    case '*':
      return multiply(firstNum, secondNum);
    case '/':
      return divide(firstNum, secondNum);
  }
}

function populateDisplayNum(button) {
  if(newEquation) {
    clearDisplay();
    newEquation = false;
  }
  if(button.textContent == ".") {
    populateDisplayDecimal();
  } 
  else if(firstNumber.length == 0) {
    displayValue += button.textContent;
    display.textContent = displayValue;
  }
  else {
    secondNumber += button.textContent;
    display.textContent += button.textContent;
  }
}

function populateDisplaySymbol(button) {
  if(operator.length == 1 && secondNumber != "") {
    evaluate();
  }
  else if(operator.length == 1) {
    operator = "";
    display.textContent = display.textContent.slice(0, -3);
  }
  operator = button.className;
  display.textContent += " " + operator + " ";
  firstNumber = displayValue;
  newEquation = false;
}

function populateDisplayDecimal() {
  if(!containsDecimal(displayValue) && operator == "") {
    displayValue += ".";
    display.textContent += ".";
  }
  if(!containsDecimal(secondNumber) && operator.length == 1) {
    secondNumber += ".";
    display.textContent += ".";
  }
  return;
}

function containsDecimal (str) {
  let newStr = str.split("").filter((x) => x != ".").join("");
  if(newStr.length == str.length) {
    return false;
  }
  return true;
}

function clearDisplay() {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  operator = "";
  displayValue = "";
}

function round(num) {
  return Math.round((num + Number.EPSILON) * 10000) / 10000;
}

function evaluate() {
  let result = operate(operator, firstNumber, secondNumber);
  clearDisplay();
  if(typeof result == "number") {
    display.textContent = round(result).toString();
    displayValue = result.toString();
  }
  if(typeof result == "string") display.textContent = result;
  firstNumber = "";
  operator = "";
  newEquation = true;
}

function removeDigit() {
  if(firstNumber == "" && !newEquation) {
    if(displayValue.length > 1) {
      displayValue = displayValue.slice(0, -1);
      display.textContent = displayValue;
    }
    else {
      clearDisplay();
    }
  }
  if(secondNumber != "") {
    secondNumber = secondNumber.slice(0, -1);
    display.textContent = display.textContent.slice(0, -1);
  }
}
