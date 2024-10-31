const fullName = document.querySelector('.input-name');
const number = document.querySelector('.number');
const email = document.querySelector('.email');
const bornData = document.querySelector('.data');
const cpf = document.querySelector('.cpf');
const avenue = document.querySelector('.street');
const cep = document.querySelector('.cep');
const citty = document.querySelector('.citty');
const state = document.querySelector('.state');
const enter = document.querySelector('.enter');
const socialName = document.querySelector('.social-name');
const hood = document.querySelector('.hood');
const homeNumber = document.querySelector('.homeNumber');
const complementsBox = document.querySelector('.complements-box') 
const getInputs = document.querySelectorAll('input'); 

const saveButton = document.getElementById('savedButton'); 
const delButton = document.getElementById('delButton');

const regexNumber = /^\+?(\d{2}|\d{3})?\s?\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/;
const regexFullName = /^[a-zA-Zà-ú ]{1,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexBornData = /^\d{2}\/\d{2}\/\d{4}$/;
const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const regexAvenue = /^[A-Za-zÀ-ú\s\d\.\-\']+$/;
const cepRegex = /\d{5}-\d{3}/;

delButton.addEventListener('click', function(event){
	cleanInputs(); 
})

enter.addEventListener('keypress', function(event) {
	let keyCodeEvent = event.keyCode === 13;
	if (keyCodeEvent) {
		saveButton.click(); 
	}
}); 

function cleanInputs() {
	const inputs = [fullName, number, email, bornData, cpf, avenue, citty, state, socialName, cep, hood, homeNumber, complementsBox];

	inputs.forEach(input => input.value = '');
}

function validateInputs() {
	let validForm = true;

	if (state.value.trim() === '') {
		state.style.borderColor = 'red';
		validForm = false;
	};

	if (fullName.value.trim() === '' || !regexFullName.test(fullName.value)) {
		fullName.value = '';
		fullName.style.borderColor = 'red';
		validForm = false;
	};

	if (number.value.trim() === '' || !regexNumber.test(number.value)) {
		number.value = '';
		number.style.borderColor = 'red'; 
		validForm = false;
	};

	if (email.value.trim() === '' || !emailRegex.test(email.value)) {
		email.value = '';
		email.style.borderColor = 'red'; 
		validForm = false;
	};

	if (bornData.value.trim()=== '' || !regexBornData.test(bornData.value)) {
		bornData.value = '';
		bornData.style.borderColor = 'red';
		validForm = false;
	};

	if (citty.value.trim() === '') {
		citty.style.borderColor = 'red';
		validForm = false;
	}

	if (cep.value.trim() === '' || !cepRegex.test(cep.value)) {
		cep.value = '';
		cep.style.borderColor = 'red';
		validForm = false;
	}

	if (cpf.value.trim() === '' || !regexCpf.test(cpf.value)) {
		cpf.value = '';
		cpf.style.borderColor = 'red';
		validForm = false;
	}

	if(avenue.value.trim() === '' || !regexAvenue.test(avenue.value)) {
		avenue.value = '';
		avenue.style.borderColor = 'red';
		validForm = false;
	}
	
	if(cep.value.trim() === '' || !cepRegex.test(cep.value)) {
		cep.value = '';
		cep.style.borderColor = 'red';
		validForm = false;
	}

	return validForm;
}

function localSave() {
	const validForm = validateInputs();

	if (!validForm) {
		alert('Preencha os campos obrigatórios!')
	}
	else {
		const inputs = getInputs;
		const formData = [];

		for (const input of inputs) {
			console.log(input, 'input')
			if (input.value) {
				formData.push(input.value);
			}
		}

		const dataJSON = JSON.stringify(formData);

		localStorage.setItem('userData', dataJSON);
	}
}

function formatData(input) {
	input.value = input.value.replace(/\D/g, '');

	if (input.value.length > 2) {
		input.value = input.value.slice(0, 2) + '/' + input.value.slice(2);
	}
	if (input.value.length > 5) {
		input.value = input.value.slice(0, 5) + '/' + input.value.slice(5);
	}

	if (input.value.length > 10) {
		input.value = input.value.slice(0, 10);
	}
}

function formatNumber(input) {
	input.value = input.value.replace(/\D/g, '');
	console.log(input.value.length);
	if (input.value.length > 3) {
		input.value = '(' + input.value.slice(0, 2) + ') ' + input.value.slice(2);
	}

	if (input.value.length > 10) {
		input.value = input.value.slice(0, 10) + '-' + input.value.slice(10);
	}

	if (input.value.length > 15) {
		input.value = input.value.slice(0, 15);
	}
}

function formatCpf(input) {
	input.value = input.value.replace(/\D/g, '');

	let i = 0;
	while (i < input.value.length) {
		if (i === 3 || i === 7) {
	
			input.value = input.value.slice(0, i) + '.' + input.value.slice(i);
		}
		if (i === 11) {
			input.value = input.value.slice(0, i) + '-' + input.value.slice(i);

		}
		i++;
	}

	if (input.value.length > 14) {
		input.value = input.value.slice(0, 14);
	};
};

function formatCep(input) {
	input.value = input.value.replace(/\D/g, '');

	let i = 0;
	while (i < input.value.length) {
		if (i === 5) {
	
			input.value = input.value.slice(0, i) + '-' + input.value.slice(i);
		};
		i++;
	};

	if (input.value.length > 9) {
		input.value = input.value.slice(0, 9);
	};
};

function onlyLetters(input) {
	input.value = input.value.replace(/[^a-zA-Z ]/g, '');
	if (input.value.length > 20) {
		input.value = input.value.slice(0, 20);
	};
};

function onlyNumbers(input) {
	input.value = input.value.replace(/\D/g, '');
	if (input.value.length > 5) {
		input.value = input.value.slice(0, 5);
	};
};

function limiteOfChars(input) {
	if (input.value.length > 20) {
		input.value = input.value.slice(0, 20);
	};
};

function limiteOfCharsComplementsBox(input) {
	if (input.value.length > 150) {
		input.value = input.value.slice(0, 150);
	};
};

