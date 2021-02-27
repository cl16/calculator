
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
var operator = add;
var initialOperation = true;

var operand1 = {
    name: "operand1",
    value: 0,
    set: function (val) {
        this.value = val;
    },
    get: function () {
        return this.value;
    },
}

var operand2 = {
    name: "operand2:",
    value: undefined,
    set: function (val) {
        this.value = val;
    },
    get: function () {
        return this.value;
    },
}

var overwrite = true;
var dataPointer = operand2;

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

function performOperation() {
    dataPointer = operand1;
    let result = operate(operator, operand1.get(), operand2.get());
    overwrite = true;
    updateValue(dataPointer, result);

}

function updateValue(data, val) {
    // update variable "data" with value "val", with either append or overwrite depending
    // on the state of global variable "overwrite"
    if (overwrite == false && data.get() != 0) {
        newValueAsString = data.get().toString() + val.toString();
        data.set(parseInt(newValueAsString));
    }
    else {
        data.set(parseInt(val)); // val should already be non-string
    }

    // then update display accordingly:
    updateDisplay(data.get());
}

function updateDisplay(val) {
    let valAsString = val.toString();
    display.textContent = valAsString;
}

function setOperator(symbol) {
    // we are done with setting the first operand:
    operator = operatorMap[symbol];
    overwrite = true;
}

// DOM variables:
const display = document.querySelector("#display");


// Event Listeners:
const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach((btn) => {
    btn.addEventListener('click', function(e) {
        let btnValue = e.target.dataset.value;
        // set data value to update
        
        updateValue(dataPointer, btnValue);
        overwrite = false;

    })
})

const functionButtons = document.querySelectorAll(".function-button");
functionButtons.forEach((btn) => {
    btn.addEventListener('click', function(e) {
        let btnValue = e.target.dataset.value;
        setOperator(btnValue);
        performOperation();
        initialOperation = false;       // at this point could repeatedly hit "=", all necessary data
        dataPointer = operand2;
    })
})

const equalsButton = document.querySelector(".equals-button");
equalsButton.addEventListener('click', function () {
    if (initialOperation == false) {
        performOperation();
    }
});