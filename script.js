const displayText = document.querySelector('.display-text');
const buttons = document.querySelector('.buttons');
const btZero = document.querySelector('#zero');
const btOne = document.querySelector('#one');
const btTwo = document.querySelector('#two');
const btThree = document.querySelector('#three');
const btFour = document.querySelector('#four');
const btFive = document.querySelector('#five');
const btSix = document.querySelector('#six');
const btSeven = document.querySelector('#seven');
const btEight = document.querySelector('#eight');
const btNine = document.querySelector('#nine');
const btBackspace = document.querySelector('.backspace');
const btClear = document.querySelector('.clear');
const btDivide = document.querySelector('#bt-divide');
const btMult = document.querySelector('#bt-mult');
const btMinus = document.querySelector('#bt-minus');
const btPlus = document.querySelector('#bt-plus');
const btDecimal = document.querySelector('#point');
const btResult = document.querySelector('#result');

let num1 = null;
let operator = null;
let num2 = null;
let result = null;

let currentNum = ``;
let operatorInEval = false;
let lastPressedIsOp = false;
let lastPressedIsResult = false;
let lastPressedIsPoint = false;

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

function reset(){
	num1 = null;
	num2 = null;
	operator = null;
	result = null;
	currentNum = ``;
	displayText.innerText = ``;
	operatorInEval = false;
	lastPressedIsOp = false;
	lastPressedIsResult = false;
	lastPressedIsPoint = false;
}

function isItNumber(text){
	let testNumber = Number(text);
	if (Number.isNaN(testNumber)){
		return false;
	} else {
		return true;
	}
}

function displayLastDigit(text) {
	let lastDigit = text.charAt(text.length -1);
	let isItNum = isItNumber(lastDigit);

	if (isItNum) {
		return `number`;
	} else if (lastDigit === `.`) {
		return `.`;
	} else {
		return `operator`;
	}
}

function evalHasOperator(text){
	if (text.includes(`+`) || text.includes(`−`) || text.includes(`∗`) || text.includes(`÷`)){
		return true;
	} else {
		return false;
	}
}

function numIsDecimal(text){
	if (text.includes(`.`)){
		return true;
	} else {
		return false;
	}
}


buttons.addEventListener('click', (event) => {
	let target = event.target;

	if (target.className === 'number') {
		if (lastPressedIsResult) {
			reset();
		}
		lastPressedIsOp = false;
		switch (operatorInEval){
			case false:
				if (num1 === null) {
					num1 = Number(target.innerText);
					currentNum = `num1`;
				} else {
					num1 = Number(`${num1}${target.innerText}`);
					currentNum = `num1`;
				}
			break;
			case true:
				if (num2 === null){
					num2 = Number(target.innerText);
					result = operate(num1, operator, num2);
					console.log(result);
					currentNum = `num2`;
				} else if (lastPressedIsResult){
					num1 = Number(`${num1}${target.innerText}`)
					result = num1;
					currentNum = `num1`;
				} else {
					num2 = Number(`${num2}${target.innerText}`);
					result = operate(num1, operator, num2);
					currentNum= `num2`;
				}
			break;
		}
		displayText.innerText = `${displayText.innerText}${target.innerText}`;

	} else if (target.className === 'operator') {
		lastPressedIsPoint = false;
		lastPressedIsResult = false;
		if (lastPressedIsOp){
			// removes the operator pressed before this one from the display so it will be
			// replaced with the new operator pressed.
			displayText.innerText = displayText.innerText.slice(0, -1);
			operator = target.innerText;
		} else {
			if (evalHasOperator(displayText.innerText)){
				num1 = result;
				num2 = null;
			} else {
				operatorInEval = true;
			}
			operator = target.innerText;
			lastPressedIsOp = true;
		}

		if (result != null && evalHasOperator(displayText.innerText)){
			displayText.innerText = `${+result.toFixed(11)}${target.innerText}`;
		} else {
			displayText.innerText = `${displayText.innerText}${target.innerText}`;
		}

	} else if (target.className === 'result') {
		lastPressedIsPoint = false;
		if (result != null) {
			displayText.innerText = +result.toFixed(11);
			num1 = result;
			num2 = null;
			lastPressedIsResult = true;
		}

	} else if (target.className === 'clear') {
		reset();

	} else if (target.className === 'point') {
		if (lastPressedIsResult){
			reset();
			lastPressedIsResult = false;
		} else if (currentNum === `num1` && !numIsDecimal(`${num1}`) && displayLastDigit(displayText.innerText) === `number`){
			num1 = `${num1}${target.innerText}`;
			displayText.innerText = `${displayText.innerText}${target.innerText}`;
		} else if (currentNum === `num2` && !numIsDecimal(`${num2}`) && displayLastDigit(displayText.innerText) === `number`){
			num2 = `${num2}${target.innerText}`
			displayText.innerText = `${displayText.innerText}${target.innerText}`;
		}
		lastPressedIsPoint = true;

	} else if (target.className === 'backspace') {
		if (lastPressedIsResult){
			reset();
		} else if (displayLastDigit(displayText.innerText) === `operator`) {
			operator = null;
			currentNum = `num1`;
			operatorInEval = false;
		} else if (displayLastDigit(displayText.innerText) === `.` || displayLastDigit(displayText.innerText) === `number`) {
			if (currentNum === `num1`) {
				let stringNum1 = `${num1}`;
				stringNum1 = stringNum1.slice(0, -1);
				num1 = Number(stringNum1);
				result = operate(num1, operator, num2);
			} else if (currentNum === `num2`) {
				let stringNum2 = `${num2}`;
				stringNum2 = stringNum2.slice(0, -1);
				num2 = Number(stringNum2);
				result = operate(num1, operator, num2);
			}
			lastPressedIsPoint = false;
		}
		displayText.innerText = displayText.innerText.slice(0, -1);
	}
})

document.addEventListener(`keydown`, (e) => {
	switch (e.key){
		case `0`:
			btZero.click();
		break;

		case `1`:
			btOne.click();
		break;

		case `2`:
			btTwo.click();
		break;

		case `3`:
			btThree.click();
		break;

		case `4`:
			btFour.click();
		break;

		case `5`:
			btFive.click();
		break;

		case `6`:
			btSix.click();
		break;

		case `7`:
			btSeven.click();
		break;

		case `8`:
			btEight.click();
		break;

		case `9`:
			btNine.click();
		break;

		case `.`:
			btDecimal.click();
		break;

		case `+`:
			btPlus.click();
		break;

		case `-`:
			btMinus.click();
		break;

		case `/`:
			btDivide.click();
		break;

		case `*`:
			btMult.click();
		break;

		case `=`:
			btResult.click();
		break;

		case `Enter`:
			document.activeElement.blur();
			btResult.click();
		break;

		case `Backspace`:
			btBackspace.click();
		break;
	}
})
