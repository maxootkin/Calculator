let numbers = document.querySelectorAll('.number'),
	operations = document.querySelectorAll('.operation'),
	decimalBtn = document.getElementById('decimal'),
	clearBtns = document.querySelectorAll('.clear_btn'),	
	resultBtn = document.getElementById('result'),
	piBtn = document.getElementById('pi'),
	display = document.getElementById('display'),
	MemoryCurrentNumber = 0,
	MemoryNewNumber = false,
	MemoryPendingOperation = '';

	

for (let i = 0; i < numbers.length; i++) {
 	let number = numbers[i];
 	number.addEventListener('click', function (e) {
 		numberPress(e.target.textContent);
 	})};
	
for (let i = 0; i < operations.length; i++) {
 	let operationBtn = operations[i];
 	operationBtn.addEventListener('click', function (e) {
 		operation(e.target.textContent);
 	})};

decimalBtn.addEventListener('click', decimal);

for (let i = 0; i < clearBtns.length; i++) {
 	let clearBtn = clearBtns[i];
 	clearBtn.addEventListener('click', function (e) {
 		clear(e.srcElement.id);		
	});
 };

resultBtn.addEventListener('click', result);
piBtn.addEventListener('click', piFunc);

function numberPress(number) {
	if (MemoryNewNumber) {
		display.value = number;
		MemoryNewNumber = false;
	} else {
		if (display.value === '0') {
			display.value = number;
		} else {
			display.value += number;
		}
	}		
};

function operation(symb) {
	let localOperationMemory = display.value;
	if (MemoryNewNumber && MemoryCurrentNumber != '=') {
		display.value = MemoryCurrentNumber;
	} else {
		MemoryNewNumber = true;
		if (MemoryPendingOperation === "+") {
			MemoryCurrentNumber = parseFloat((MemoryCurrentNumber*10 + localOperationMemory*10)/10);
		} else if (MemoryPendingOperation === "-") {
			MemoryCurrentNumber -= parseFloat(localOperationMemory);
		} else if (MemoryPendingOperation === "*") {
			MemoryCurrentNumber *= parseFloat(localOperationMemory);
		} else if (MemoryPendingOperation === "/") {
			MemoryCurrentNumber /= parseFloat(localOperationMemory);
		} else {
			MemoryCurrentNumber = parseFloat(localOperationMemory);
		};
		display.value = MemoryCurrentNumber;
		MemoryPendingOperation = symb;
	};
};

function clear(id) {
	if (id === 'ce') {
		display.value = '0';
		MemoryNewNumber = true;
	} else if (id === 'c') {
		display.value = '0';
		MemoryCurrentNumber = 0,
		MemoryNewNumber = true,
		MemoryPendingOperation = '';
	}
};

function decimal() {
	let localDecimalMemory = display.value;

	if (MemoryNewNumber) {
		localDecimalMemory = '0.';
		MemoryNewNumber = false;
	} else {
		if (localDecimalMemory.indexOf('.') === -1) {
			localDecimalMemory += '.';
		};		
	};

	display.value = localDecimalMemory;
};

function piFunc(x) {
	display.value = Math.PI;
	MemoryNewNumber = false;
}