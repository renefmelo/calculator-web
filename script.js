const displayText = document.querySelector('.display-text');
const buttons = document.querySelector('.buttons');


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

let num1 = null;
let operator = null;
let num2 = null;

function operate(num1, operator, num2){
	switch(operator) {
		case `+`:
			return add(num1, num2);
		break;
		case `−`:
			return subtract(num1, num2);
		break;
		case `∗`:
			return multiply(num1, num2);
		break;
		case `÷`:
			return divide(num1, num2);
		break;
	}
}

let result = null;
let pressedOperatorOnce = false;
let lastPressedIsOp = false;
let pressedResult = false;
let broken = false;

function reset(){
	displayText.innerText = ``;
	num1 = null;
	num2 = null;
	operator = null;
	result = null;
	pressedOperatorOnce = false;
	lastPressedIsOp = false;
	pressedResult = false;
}

buttons.addEventListener('click', (event) => {
	let target = event.target;

	if (broken){
		reset();
		broken = false;
	}

	if (operator === '÷' && target.innerText === '0'){
		displayText.innerText = `don't start`;
		broken = true;
	} else if(target.className === 'number') {
		if (pressedResult) {
			reset();
		}
		lastPressedIsOp = false;
		switch (pressedOperatorOnce){
			case false:
				if (num1 === null) {
					num1 = Number(target.innerText);
					console.log(num1);
				} else {
					num1 = Number(`${num1}${target.innerText}`);
					console.log(num1);
				}
			break;
			default:
				if (num2 === null){
					num2 = Number(target.innerText);
					result = operate(num1, operator, num2);
					console.log(num2);
					console.log(`result: ${result}`);
				} else if (pressedResult){
					num1 = Number(`${num1}${target.innerText}`)
					result = num1;
					console.log(num1);
				} else {
					num2 = Number(`${num2}${target.innerText}`);
					result = operate(num1, operator, num2);
					console.log(num2);
					console.log(`result: ${result}`);
				}
			break;
		}
		displayText.innerText = `${displayText.innerText}${target.innerText}`;
	} else if (target.className === 'operator') {
		pressedResult = false;
		if (lastPressedIsOp){
			// removes the operator pressed before this one from the display so it will be
			// replaced with the new operator pressed.
			displayText.innerText = displayText.innerText.slice(0, -1);
			operator = target.innerText;
		} else {
			if (pressedOperatorOnce){
				num1 = result;
				console.log(num1);
				num2 = null;
			} else {
				pressedOperatorOnce = true;
			}
			console.log(target.innerText);
			operator = target.innerText;
			lastPressedIsOp = true;
		}

		if (result != null){
			displayText.innerText = `${+result.toFixed(2)}${target.innerText}`;
		} else {
			displayText.innerText = `${displayText.innerText}${target.innerText}`;
		}
	} else if (target.className === 'result') {
		console.log(result);
		displayText.innerText = +result.toFixed(2);
		num1 = result;
		num2 = null;
		pressedResult = true;
	} else if (target.className === 'clear') {
		reset();
	}
})
//ideia: refazer pegando string do display e dando split com o operador p pegar os numeros e calcular.
