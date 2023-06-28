function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 == 0) {
    return 'Impossible...';
  } else {
    return num1 / num2;
  }
}

let num1;
let num2;
let operator;

function operate(num1, num2, operator) {
  if (operator == '+') {
    return Math.round(add(num1, num2) * 1000) / 1000;
  } else if (operator == '-') {
    return Math.round(subtract(num1, num2) * 1000) / 1000;
  } else if (operator == '*') {
    return Math.round(multiply(num1, num2) * 1000) / 1000;
  } else if (operator == '/' && num2 !== 0) {
    return Math.round(divide(num1, num2) * 1000) / 1000;
  } else if (operator == '/' && num2 == 0) {
    return divide(num1, num2);
  }
}

function checkResult(result) {
  if (result) {
    display.innerHTML = '';
    let span = document.createElement('span');
    span.textContent = result;
    display.appendChild(span);
    displayValue = result.toString();
  }
}

const zero = document.querySelector('#zero');
const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const four = document.querySelector('#four');
const five = document.querySelector('#five');
const six = document.querySelector('#six');
const seven = document.querySelector('#seven');
const eight = document.querySelector('#eight');
const nine = document.querySelector('#nine');
const addButton = document.querySelector('#add');
const subtractButton = document.querySelector('#subtract');
const multiplyButton = document.querySelector('#multiply');
const divideButton = document.querySelector('#divide');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const display = document.querySelector('#display');
const calculator = document.querySelector('#calculator');
const decimal = document.querySelector('#decimal');
const allButtons = document.querySelectorAll('button');

let displayValue = '';
let result = 0;
let operatorIndex;

allButtons.forEach(item => item.addEventListener('click', () => {
  if (displayValue == 'Impossible...') {
    display.innerHTML = '';
    displayValue = '';
  }
}))

allButtons.forEach(item => item.addEventListener('click', () => {
  if (displayValue[0] == '-') {
    operatorIndex = displayValue.slice(1).search(/[^0-9^.]/g) + 1;
  } else {
    operatorIndex = displayValue.search(/[^0-9^.]/g);
  }
  num1 = Number(displayValue.slice(0, operatorIndex));
  num2 = Number(displayValue.slice(operatorIndex + 1, displayValue.length + 1));
  operator = displayValue[operatorIndex];
  result = operate(num1, num2, operator);
}))

let arr = [zero, one, two, three, four, five, six, seven, eight, nine, addButton, subtractButton, multiplyButton, divideButton, equals, clear];

for (let i = 0; i < 10; i++) {
  arr[i].addEventListener('click', () => {
    let span = document.createElement('span');
    span.textContent = i;
    display.appendChild(span);
    displayValue += i;
  })
}

addButton.addEventListener('click', () => {
  checkResult(result);
  let span = document.createElement('p');
  span.textContent = ' + ';
  display.appendChild(span);
  displayValue += '+';
})

subtractButton.addEventListener('click', () => {
  checkResult(result);
  let span = document.createElement('p');
  span.textContent = '-';
  display.appendChild(span);
  displayValue += '-';
})

multiplyButton.addEventListener('click', () => {
  checkResult(result);
  let span = document.createElement('p');
  span.textContent = 'x';
  display.appendChild(span);
  displayValue += '*';
})

divideButton.addEventListener('click', () => {
  checkResult(result);
  let span = document.createElement('p');
  span.textContent = '÷';
  display.appendChild(span);
  displayValue += '/';
})

equals.addEventListener('click', () => {
  display.innerHTML = '';
  let span = document.createElement('span');
  if (result == undefined) {
    span.textContent = 'Error';
    display.appendChild(span);
    displayValue = '';
  } else {
    span.textContent = result;
    display.appendChild(span);
    displayValue = result.toString();
  }
})

decimal.addEventListener('click', () => {
  let span = document.createElement('p');
  span.textContent = '.';
  display.appendChild(span);
  displayValue += '.';
})

clear.addEventListener('click', () => {
  display.innerHTML = '';
  displayValue = '';
})



