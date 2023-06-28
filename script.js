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
  return num1 / num2;
}

let num1;
let num2;
let operator;

function operate(num1, num2, operator) {
  if (operator = '+') {
    return add(num1, num2);
  } else if (operator = '-') {
    return subtract(num1, num2);
  } else if (operator = '*') {
    return multiply(num1, num2);
  } else if (operator = '/') {
    return divide(num1, num2);
  }
}

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
let displayValue = '';

let arr = [one, two, three, four, five, six, seven, eight, nine, addButton, subtractButton, multiplyButton, divideButton, equals, clear];

for (let i = 0; i < 9; i++) {
  arr[i].addEventListener('click', () => {
    let span = document.createElement('span');
    span.textContent = i + 1;
    display.appendChild(span);
    displayValue += i + 1;
  })
}

addButton.addEventListener('click', () => {
  let span = document.createElement('span');
  span.textContent = '+';
  display.appendChild(span);
  displayValue += '+';
})

subtractButton.addEventListener('click', () => {
  let span = document.createElement('span');
  span.textContent = '-';
  display.appendChild(span);
  displayValue += '-';
})

multiplyButton.addEventListener('click', () => {
  let span = document.createElement('span');
  span.textContent = '*';
  display.appendChild(span);
  displayValue += '*';
})

divideButton.addEventListener('click', () => {
  let span = document.createElement('span');
  span.textContent = '/';
  display.appendChild(span);
  displayValue += '/';
})

equals.addEventListener('click', () => {
  let displayArr = displayValue.split('');
  num1 = Number(displayArr[0]);
  operator = displayArr[1];
  num2 = Number(displayArr[2]);
  let result = operate(num1, num2, operator)
  display.innerHTML = '';
  let span = document.createElement('span');
  span.textContent = result;
  display.appendChild(span);
})

clear.addEventListener('click', () => {
  display.innerHTML = '';
  displayValue = '';
})
