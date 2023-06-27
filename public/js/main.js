const addIngredientBtn = document.querySelector('.addIngredient');
const addStepBtn = document.querySelector('.addStep');
const submitBtn = document.querySelector('.submit');
const deleteBtns = document.querySelectorAll('.delete');
const deleteFromMainPageBtns = document.querySelectorAll('.deleteRecipe');
const deleteFromViewBtn = document.querySelector('.deleteFromView');
const addIngredientInput = document.querySelector('.ingredientInput');
const addStepInput = document.querySelector('.stepInput');
const showLikeBtns = document.querySelectorAll('.likes');

addIngredientBtn && addIngredientBtn.addEventListener('click', addIngredientToList);
addStepBtn && addStepBtn.addEventListener('click', addStepToList);
submitBtn && submitBtn.addEventListener('click', submitRecipe);
Array.from(deleteBtns).forEach(el => el.addEventListener('click', deleteElement));
Array.from(deleteFromMainPageBtns).forEach(el => el.addEventListener('click', deleteRecipe));
deleteFromViewBtn && deleteFromViewBtn.addEventListener('click', async (click) => {
	await deleteRecipe(click);
	location.href="/myRecipes";
});
addIngredientInput && addIngredientInput.addEventListener('keydown', (e) => {
	if (e.repeat) return;
	if (e.code === 'Enter') {
		addIngredientToList();
	}
})
addStepInput && addStepInput.addEventListener('keydown', (e) => {
	if (e.repeat) return;
	if (e.code === 'Enter') {
		addStepToList();
	}
})
Array.from(showLikeBtns).forEach(el => el.addEventListener('click', hideList));

let perfEntries = performance.getEntriesByType('navigation');
if (perfEntries[0].type === 'back_forward') {
	location.reload();
}

function addIngredientToList() {
	const li = document.createElement('li');
	const input = document.createElement('input');
	input.type = 'text';
	input.classList.add('ingredient');
	input.value = document.querySelector('.ingredientInput').value;
	const deleteBtn = document.createElement('span');
	deleteBtn.classList.add('fa-solid', 'fa-trash', 'delete');
	deleteBtn.addEventListener('click', deleteElement);
	li.appendChild(input);
	li.appendChild(deleteBtn);
	document.querySelector('.ingredientsList').appendChild(li);
	document.querySelector('.ingredientInput').value = '';
}

function addStepToList() {
	const li = document.createElement('li');
	const input = document.createElement('input');
	input.type = 'text';
	input.classList.add('step');
	input.value = document.querySelector('.stepInput').value;
	const deleteBtn = document.createElement('span');
	deleteBtn.classList.add('fa-solid', 'fa-trash', 'delete');
	deleteBtn.addEventListener('click', deleteElement);
	li.appendChild(input);
	li.appendChild(deleteBtn);
	document.querySelector('.stepsList').appendChild(li);
	document.querySelector('.stepInput').value = '';
}

async function submitRecipe() {
	document.querySelector('.submit').disabled = true;
	const recipeName = document.querySelector('.recipeName').value;
	const ingredientsFromInputs = Array.from(document.querySelectorAll('input.ingredient')).map(el => el.value);
	const stepsFromInputs = Array.from(document.querySelectorAll('input.step')).map(el => el.value);
	if (!recipeName) {
		alert('Recipe name is required!');
		document.querySelector('.submit').disabled = false;
		return;
	}
	const updateTarget = this.dataset.id;
	try {
		const res = await fetch('/myRecipes/submitRecipe', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
				recipeIdToUpdate: updateTarget,
				name: recipeName,
				ingredients: ingredientsFromInputs,
				steps: stepsFromInputs
			})
		});
		location.href = '/myRecipes';
	}
	catch(err) {
		console.error(err);
		document.querySelector('.submit').disabled = false;
	}
}

function deleteElement() {
	const deleteTarget = this.parentNode;
	deleteTarget.remove();
}

async function deleteRecipe(click) {
	const deleteTarget = click.target.parentNode;
	const deleteTargetId = deleteTarget.dataset.id;
	deleteTarget.remove();
	try {
		const res = await fetch('/myRecipes/deleteRecipe', {
			method: 'delete',
			headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'recipeIdToDelete': deleteTargetId
            })
		});
		const data = await res.json();
		console.log(data);
	}
	catch (err) {
		console.error(err);
	}
}

function hideList() {
	console.log(this.nextSibling.nextSibling.childElementCount);
	if (this.nextSibling.nextSibling.childElementCount === 0) {
		return;
	}
	this.nextSibling.nextSibling.classList.toggle('hidden');
}