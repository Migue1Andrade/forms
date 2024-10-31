const fullName = document.querySelector('.input-name');
const number = document.querySelector('.number');
const email = document.querySelector('.email');
const bornData = document.querySelector('.data');
const cpf = document.querySelector('.cpf');
const adress = document.querySelector('.street');
const cep = document.querySelector('.cep');
const citty = document.querySelector('.citty');
const state = document.querySelector('.state');
const enter = document.querySelector('.enter');
const socialName = document.querySelector('.social-name');
const hood = document.querySelector('.hood');
const homeNumber = document.querySelector('.homeNumber');
const complementsBox = document.querySelector('.complements-box') 
const getInputs = document.querySelectorAll('input'); 
const dataInput = document.querySelector('.data');

const saveButton = document.getElementById('savedButton'); 
const delButton = document.getElementById('delButton');

const regexNumber = /^\+?(\d{2}|\d{3})?\s?\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/;
const regexFullName = /^[a-zA-Zà-ú ]{1,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const regexAdress = /^[A-Za-zÀ-ú\s\d\.\-\']+$/;
const cepRegex = /\d{5}-\d{3}/;

dataInput.min = '1900-01-01';
dataInput.max = '2024-12-31';
dataInput.innerHTML.display = 'none';

delButton.addEventListener('click', function(event) {
	cleanInputs(); 
});

enter.addEventListener('keypress', function(event) {
	let keyCodeEvent = event.keyCode === 13;
	if (keyCodeEvent) {
		saveButton.click();
	};
});

const cleanInputs = () => {
	const inputs = [fullName, number, email, bornData, cpf, adress, citty, state, socialName, cep, hood, homeNumber, complementsBox];

	inputs.forEach(input => input.value = '');
};

const isValidadeData = () => {
	let isValidateForm = true;

	if (fullName.value.trim() === '' || !regexFullName.test(fullName.value)) {
		isValidateForm = false;
		alert('preencha seu nome completo por favor');
		fullName.focus();
		return;	
	};

	if (number.value.trim() === '' || !regexNumber.test(number.value)) {
		isValidateForm = false;
		alert('preencha seu telefone por favor');
		number.focus();
		return;	
	};

	if (bornData.value.trim() === ''|| bornData.value < '1900-01-01' || bornData.value > '2024-10-31' ) {
		isValidateForm = false;
		alert('preencha sua data de nascimento por favor');
		bornData.focus();
		return;	
	};

	if (cpf.value.trim() === '' || !regexCpf.test(cpf.value)) {
		isValidateForm = false;
		alert('preencha seu cpf por favor');
		cpf.focus();
		return;	
	};

	if (email.value.trim() === '' || !emailRegex.test(email.value)) {
		isValidateForm = false;
		alert('preencha seu email por favor');
		email.focus();
		return;	
	};

	if (adress.value.trim() === '' || !regexAdress.test(adress.value)) {
		isValidateForm = false;
		alert('preencha seu endereco por favor');
		adress.focus();
		return;	
	};

	if (cep.value.trim() === '' || !cepRegex.test(cep.value)) {
		isValidateForm = false;
		alert('preencha seu CEP por favor');
		cep.focus();
		return;	
	};

	if (citty.value.trim() === '') {
		isValidateForm = false;
		alert('preencha sua cidade por favor');
		citty.focus();
		return;	
	};

	if (state.value.trim() === '') {
		isValidateForm = false;
		alert('preencha seu estado por favor');
		state.focus();
		return;		
	};

	return isValidateForm;
};

const localSave = () => {
	const validForm = isValidadeData();

	if (!validForm) return;

	else {
		const inputs = getInputs;
		const formData = [];

		for (const input of inputs) {

			if (input.value) {
				formData.push(input.value);
			};
		};

		const dataJSON = JSON.stringify(formData);

		localStorage.setItem('userData', dataJSON);
		alert('cadastro feito com sucesso');
	};
};

const formatNumber = input => {
	input.value = input.value.replace(/\D/g, '');

	if (input.value.length > 3) {
		input.value = '(' + input.value.slice(0, 2) + ') ' + input.value.slice(2);
	};

	if (input.value.length > 10) {
		input.value = input.value.slice(0, 10) + '-' + input.value.slice(10);
	};

	if (input.value.length > 15) {
		input.value = input.value.slice(0, 15);
	};
}

const formatCpf = (input) => {
	input.value = input.value.replace(/\D/g, '');

	let i = 0;
	
	while (i < input.value.length) {
		if (i === 3 || i === 7) {
			input.value = input.value.slice(0, i) + '.' + input.value.slice(i);
		};

		if (i === 11) {
			input.value = input.value.slice(0, i) + '-' + input.value.slice(i);
		};

		i++;
	};

	if (input.value.length > 14) {
		input.value = input.value.slice(0, 14);
	};
};

const formatCep = input => {
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

const onlyLetters = input => {
	input.value = input.value.replace(/[^a-zA-Z ]/g, '');
	if (input.value.length > 20) {
		input.value = input.value.slice(0, 20);
	};
};

const onlyNumbers = input => {
	input.value = input.value.replace(/\D/g, '');
	if (input.value.length > 4) {
		input.value = input.value.slice(0, 5);
	};
};

const limiteOfChars = input => {
	if (input.value.length > 70) {
		input.value = input.value.slice(0, 60);
	};
};

const limiteOfCharsName = input => {
	input.value = input.value.replace(/[^a-zA-Z ]/g, '');
	if (input.value.length > 40) {
		input.value = input.value.slice(0, 40);
	};
};
