
// Math functions:
function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

// Back-end consts and variables:
var fieldValue = "0";           // initial value
var operand1 = 0;               // initial value
var operator = undefined;
var operand2 = undefined;

var overwrite = true;

const operatorMap = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
    "=": equals,
}

// Back-end functions:
function operate(func, a, b) {
    return func(a, b);
}

function equals() {
    operand1 = operate(operator, operand1, operand2);
    updateDisplay(operand1);
    operator = undefined;
    operand2 = undefined;
}

function updateDisplay(val) {
    let valAsString = val.toString();

    // if overwrite is set to false, append digits:
    if (overwrite == false) {
        fieldValue = fieldValue + valAsString;
    }

    // if overwrite is set to true, reset field for number input:
    else {
        fieldValue = valAsString;
        overwrite = false;
    }

    display.textContent = valAsString;
}

function setOperand1(val) {
    // convert val to number (will come from display as string), and store value:
    // converts all to int for now, add float later:
    operand1 = parseInt(val);
}

function setOperand2(val) {
    // convert val to number (will come from display as string), and store value:
    // converts all to int for now, add float later:
    operand2 = parseInt(val);
}

function setOperator(symbol) {
    // we are done with setting the first operand:
    setOperand1(fieldValue);
    operator = operatorMap[symbol];
}

// DOM variables:
const display = document.querySelector("#display");


// Event Listeners:
const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach((btn) => {
    btn.addEventListener('click', function(e) {
        let btnValue = e.target.dataset.value;
        updateDisplay(btnValue);
    })
})

const functionButtons = document.querySelectorAll(".function-button");
functionButtons.forEach((btn) => {
    btn.addEventListener('click', function(e) {
        let btnValue = e.target.dataset.value;
        setOperator(btnValue);
    })
})

const equalsButton = document.querySelector(".equals-button");
equalsButton.addEventListener('click', equals);