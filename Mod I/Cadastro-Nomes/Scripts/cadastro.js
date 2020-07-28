console.log("%cWelcome to my console. This is an exercise :)", "background-color: #FFDAC1; color: black");

let names = []; 
let inputName = null;
let isEditing = false; // boa pratica: boolean começa com is
let currentIndex = null;

window.addEventListener('load', () => {

	inputName = document.querySelector('#userInput'); 	
	// permite o acesso ao input para focar o usuário na escrita

	preventFormSubmit();
	activateInput();
});

const preventFormSubmit = () => {

	const handleFormSubmittion = (e) => {
		e.preventDefault();
		// previne recarregar a págin sem necessidade.
	}
	let form = document.querySelector('form');
	form.addEventListener('submit', handleFormSubmittion);
}

const activateInput = () => {
	
	const insertName = (newName) => {
		// names.push(newName);
		names = [...names, newName]; // estilo spread/rest 
		render();
	}

	const updateName = (newName) => {
		names[currentIndex] = newName;
		render();
	}

	const handleTyping = (e) => {

		let hasText = !!e.target.value
		&& e.target.value.trim() !== ''; // !!tem que ter valor

		if (!hasText){
			return; //nem avança
		}

		// assim que dá enter.. 
		if(e.key === 'Enter'){
			if(isEditing){
				console.log('editing..');
				updateName(event.target.value);
		} else {
			console.log('updating');
			insertName(e.target.value);	
		}
		isEditing = false;
		clearInput();
		}
	  }
		inputName.addEventListener('keyup', handleTyping);
		inputName.focus(); // coloca o cursor no input - um foco ao usuário
	}

const render = () => {

	const createCloseButton = (i) => {

		const deleteName = () => {
			names.splice(i, 1);	//remove elementos do vetor e retorna se for o caso elemento novo nesse local
			
			render();
		}

		let closeButton = document.createElement('button');
		closeButton.textContent = '\u00D7';
		closeButton.addEventListener('click', deleteName);
		return closeButton;
	}

	const createSpan = (nome, i) => {
		
		const editItem = () => {
			inputName.value = nome;
			inputName.focus();
			isEditing = true;	
			currentIndex = i;		
		}

		let span = document.createElement('span');
		span.classList.add('clickable');
		span.textContent = nome;
		span.addEventListener('click', editItem);	
		
		return span;
	}

	let divNames = document.querySelector('#nomes');
	divNames.innerHTML = '';

	let ul = document.createElement('ul');

	for(let i = 0; i < names.length; i++){
		let currentName = names[i];
		
		let li = document.createElement('li');
		let closeButton = createCloseButton(i);
		let span = createSpan(currentName, i);

		li.appendChild(closeButton);
		li.appendChild(span);
		ul.appendChild(li);
	}

	divNames.appendChild(ul);
	clearInput();
}

const clearInput = () => {

	inputName.value = '';
	inputName.focus();
}
