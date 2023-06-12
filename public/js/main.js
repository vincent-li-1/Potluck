let ingredientsToAdd = [];
let stepsToAdd = [];
const ingredientInputSelector = document.querySelector('.ingredientInput');
const stepInputSelector = document.querySelector('.stepInput');

document.querySelector('.addIngredient').addEventListener('click', addIngredientToList);
document.querySelector('.addStep').addEventListener('click', addStepToList);
document.querySelector('.submit').addEventListener('click', submitRecipe);

function addIngredientToList() {
	ingredientsToAdd.push(ingredientInputSelector.value);
	const li = document.createElement('li');
	li.innerText = ingredientInputSelector.value;
	document.querySelector('.ingredientsList').appendChild(li);
	ingredientInputSelector.value = '';
}

function addStepToList() {
	stepsToAdd.push(stepInputSelector.value);
	const li = document.createElement('li');
	li.innerText = stepInputSelector.value;
	document.querySelector('.stepsList').appendChild(li);
	stepInputSelector.value = '';
}

async function submitRecipe() {
	const recipeName = document.querySelector('.recipeName').value;
	let recipe = {
		name: recipeName,
		ingredients: ingredientsToAdd,
		steps: stepsToAdd
	}
	try {
		const res = await fetch('/submitRecipe', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(recipe)
		})
		location.href = '/';
	}
	catch(err) {
		console.error(err);
	}
}

