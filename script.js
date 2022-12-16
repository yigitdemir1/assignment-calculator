let displayValue = "0",
	first_number = null,
	second_number = null,
	first_operator = null,
	second_operator = null,
	result = null;
const buttons = document.querySelectorAll("button");

window.addEventListener("keydown", function(e) {
	const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
	key.click();
});

function display_update() {
	const display = document.getElementById("display");
	display.innerText = displayValue;
}
display_update();

function click_button() {
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", function() {
			if (buttons[i].classList.contains("operand")) {
				enter_number(buttons[i].value);
				display_update();
			}
			else if (buttons[i].classList.contains("operator")) {
				enter_operator(buttons[i].value);
			}
			else if (buttons[i].classList.contains("equals")) {
				enter_equal();
				display_update();
			}
			else if (buttons[i].classList.contains("decimal")) {
				enter_dot(buttons[i].value);
				display_update();
			}
			else if (buttons[i].classList.contains("percent")) {
				enter_percentage(displayValue);
				display_update();
			}
			else if (buttons[i].classList.contains("sign")) {
				enter_sign(displayValue);
				display_update();
			}
			else if (buttons[i].classList.contains("clear")) clear();
			display_update();
		})
	}
}
click_button();

function enter_number(operand) {
	if (first_operator === null) {
		if (displayValue === "0" || displayValue === 0) {
			displayValue = operand;
		}
		else if (displayValue === first_number) {
			displayValue = operand;
		}
		else {
			displayValue += operand;
		}
	}
	else {
		if (displayValue === first_number) {
			displayValue = operand;
		}
		else {
			displayValue += operand;
		}
	}
}

function enter_operator(operator) {
	if (first_operator != null && second_operator === null) {
		second_operator = operator;
		second_number = displayValue;
		result = operate(Number(first_number), Number(second_number), first_operator);
		displayValue = round_number(result, 15).toString();
		first_number = displayValue;
		result = null;
	}
	else if (first_operator != null && second_operator != null) {
		second_number = displayValue;
		result = operate(Number(first_number), Number(second_number), second_operator);
		second_operator = operator;
		displayValue = round_number(result, 15).toString();
		first_number = displayValue;
		result = null;
	}
	else {
		first_operator = operator;
		first_number = displayValue;
	}
}

function enter_equal() {
	if (first_operator === null) {
		displayValue = displayValue;
	}
	else if (second_operator != null) {
		second_number = displayValue;
		result = operate(Number(first_number), Number(second_number), second_operator);
		if (result === "infinity") {
			displayValue = "infinity";
		}
		else {
			displayValue = round_number(result, 15).toString();
			first_number = displayValue;
			second_number = null;
			first_operator = null;
			second_operator = null;
			result = null;
		}
	}
	else {
		second_number = displayValue;
		result = operate(Number(first_number), Number(second_number), first_operator);
		if (result === "infinity") {
			displayValue = "infinity";
		}
		else {
			displayValue = round_number(result, 15).toString();
			first_number = displayValue;
			second_number = null;
			first_operator = null;
			second_operator = null;
			result = null;
		}
	}
}

function enter_dot(dot) {
	if (displayValue === first_number || displayValue === second_number) {
		displayValue = "0";
		displayValue += dot;
	}
	else if (!displayValue.includes(dot)) {
		displayValue += dot;
	}
}

function enter_percentage(num) {
	displayValue = (num / 100).toString();
}

function enter_sign(num) {
	displayValue = (num * -1).toString();
}

function clear() {
	displayValue = "0";
	first_number = null;
	second_number = null;
	first_operator = null;
	second_operator = null;
	result = null;
}

function operate(a, b, oprtr) {
	if (oprtr === "+") {
		return a + b;
	}
	else if (oprtr === "-") {
		return a - b;
	}
	else if (oprtr === "*") {
		return a * b;
	}
	else if (oprtr === "/") {
		if (b === 0) {
			return "infinity";
		}
		else {
			return a / b;
		}
	}
}

function round_number(num, places) {
	return parseFloat(Math.round(num + "e" + places) + "e-" + places);
}