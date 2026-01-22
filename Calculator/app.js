const calculatorEl = document.querySelector(".calculator");
const Workspace = document.createElement("div");

Workspace.classList.add("work_space");
Workspace.innerHTML = `
<div class ='calc_input'>
<input type ='text' class ='calc_input__input'>
</div>
<div class ='clear'>
<button class ='AC btn'><span>AC</span></button>
<button class ='plus-minus btn'><span>+/-</span></button>
<button class ='percent btn'><span>%</span></button>
</div>
<div class ='calc_numb'>

<button class ='number btn'><span>1</span></button>
<button class ='number btn'><span>2</span></button>
<button class ='number btn'><span>3</span></button>
<button class ='number btn'><span>4</span></button>

<div class ='calc_calculation'>
  <button class ='division btn oper'><span>/</span></button>
  <button class ='multiplication btn oper'><span>*</span></button>
  <button class ='minus btn oper'><span>-</span></button>
  <button class ='plus btn oper'><span>+</span></button>
  <button class ='equals btn'><span>=</span></button>
</div>

<button class ='number btn'><span>5</span></button>
<button class ='number btn'><span>6</span></button>
<button class ='number btn'><span>7</span></button>
<button class ='number btn'><span>8</span></button>
<button class ='number btn'><span>9</span></button>
<button class ='number btn'><span>0</span></button>
<button class ='number btn'><span>.</span></button>
</div>
`;

let currentValue = "0"; //! что сейчас вводим
let storedValue = null; //! первое число
let operator = null; //! '+', '-', '*', '/'
let isNewInput = true; //! ввод нового числа или дописываем?
let lastOperand = null; //! второе число

calculatorEl.appendChild(Workspace);

const inputEl = document.querySelector(".calc_input__input");
inputEl.value = "0";

const numberButtons = document.querySelectorAll(".number");

numberButtons.forEach((button) => {
  button.addEventListener("click", onNumberClick);
});

function onNumberClick(event) {
  const digit = event.target.textContent;

  if(digit ==='.'){
    if(currentValue.includes('.')) return

  if(isNewInput){
    currentValue = '0.';
    isNewInput = false
  }else{
    currentValue += '.'
  }
  
  inputEl.value = currentValue;
  return
  }


  if (isNewInput) {
    currentValue = digit;
    isNewInput = false;
  } else {
    currentValue += digit;
  }
  inputEl.value = currentValue;
}

const calculationEl = document.querySelector(".calc_calculation");
calculatorEl.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  // AC
  if (button.classList.contains("AC")) {
    resetCalculator();
    return;
  }

  // +/-
  if (button.classList.contains("plus-minus")) {
    toggleSign();
    return;
  }

  // %
  if (button.classList.contains("percent")) {
    handlePercent();
    return;
  }

  // операторы
  if (button.classList.contains("plus")) {
    setOperator("+");
    return;
  }

  if (button.classList.contains("minus")) {
    setOperator("-");
    return;
  }

  if (button.classList.contains("multiplication")) {
    setOperator("*");
    return;
  }

  if (button.classList.contains("division")) {
    setOperator("/");
    return;
  }

  // =
  if (button.classList.contains("equals")) {
    calculateResult();
    return;
  }
});

function resetCalculator() {
  inputEl.value = "0";
  currentValue = "0";
  storedValue = null;
  operator = null;
  isNewInput = true;
}

function toggleSign() {
  if (currentValue === "0") return;

  if (currentValue.startsWith("-")) {
    currentValue = currentValue.slice(1);
  } else {
    currentValue = "-" + currentValue;
  }
  inputEl.value = currentValue;
}

function handlePercent() {
  let value = Number(currentValue);

  if (operator && storedValue !== null) {
    value = storedValue * (value / 100);
  } else {
    value = value / 100;
  }

  currentValue = String(value);
  inputEl.value = currentValue;
  isNewInput = true;
}

function setOperator(op) {
  storedValue = Number(currentValue);
  operator = op;
  lastOperand = null;
  isNewInput = true;
}

function calculateResult() {
  if (!operator) return;

  if (lastOperand === null) {
    lastOperand = Number(currentValue);
  }

  let result;

  switch (operator) {
    case "+":
      result = storedValue + lastOperand;
      break;
    case "-":
      result = storedValue - lastOperand;
      break;
    case "*":
      result = storedValue * lastOperand;
      break;
    case "/":
      result = storedValue / lastOperand;
      break;
  }

  currentValue = String(result);
  inputEl.value = currentValue;
  storedValue = result;
  isNewInput = true;
}

calculatorEl.addEventListener("click", (event) => {
  const button = event.target.closest(".btn");
  if (!button) return;

  button.classList.add("active");

  setTimeout(() => {
    button.classList.remove("active");
  }, 150);
});

calculatorEl.addEventListener("click", (event) => {
  const button = event.target.closest(".equals");
  if (!button) return;

  button.classList.add("active");

    setTimeout(() => {
    button.classList.remove("active");
  }, 150);
});
