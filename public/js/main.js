const addIngredientBtn = document.querySelector('.addIngredient');
const addStepBtn = document.querySelector('.addStep');
const submitBtn = document.querySelector('.submit');
const deleteBtns = document.querySelectorAll('.delete');
const deleteFromMainPageBtns = document.querySelectorAll('.deleteRecipe');
const deleteFromViewBtn = document.querySelector('.deleteFromView');
const addIngredientInput = document.querySelector('.ingredientInput');
const addStepInput = document.querySelector('.stepInput');
const showLikeBtns = document.querySelectorAll('.likes');
const likeBtns = document.querySelectorAll('.like.icon');

addIngredientBtn && addIngredientBtn.addEventListener('click', addIngredientToList);
addStepBtn && addStepBtn.addEventListener('click', addStepToList);
submitBtn && submitBtn.addEventListener('click', submitRecipe);
Array.from(deleteBtns).forEach(el => el.addEventListener('click', deleteElement));
Array.from(deleteFromMainPageBtns).forEach(el => el.addEventListener('click', deleteRecipe));
deleteFromViewBtn && deleteFromViewBtn.addEventListener('click', async (click) => {
	await deleteRecipe(click);
	location.href="/recipes/myRecipes";
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
Array.from(likeBtns).forEach(el => el.addEventListener('click', likeRecipe));

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
		const res = await fetch('/recipes/submitRecipe', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
				recipeIdToUpdate: updateTarget,
				name: recipeName,
				ingredients: ingredientsFromInputs,
				steps: stepsFromInputs
			})
		});
		location.href = '/recipes/myRecipes';
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
		const res = await fetch('/recipes/deleteRecipe', {
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
	if (this.parentNode.querySelector('.likesList').childElementCount === 0) {
		return;
	}
	this.parentNode.querySelector('.likesList').classList.toggle('hidden');
}

async function likeRecipe() {
	if (this.classList.contains('clicked')) {
		this.classList.replace('clicked', 'unclicked');
		const likesNode = this.parentNode.querySelector('.likes');
		let numLikes = Number(likesNode.dataset.num) - 1;
		console.log(numLikes);
		likesNode.dataset.num = numLikes;
		likesNode.innerText = `Likes: ${numLikes}`;
		const likerInList = this.parentNode.dataset.user;
		this.parentNode.querySelector('.likesList').querySelector(`.${likerInList}`).remove();
	}
	else {
		this.classList.replace('unclicked', 'clicked');
		const likesNode = this.parentNode.querySelector('.likes');
		let numLikes = Number(likesNode.dataset.num) + 1;
		likesNode.dataset.num = numLikes;
		likesNode.innerText = `Likes: ${numLikes}`;
		const likerInList = this.parentNode.dataset.user;
		const liToAdd = document.createElement('li');
		liToAdd.classList.add('likeUser');
		liToAdd.classList.add(likerInList);
		const spanToAdd = document.createElement('span');
		spanToAdd.innerText = likerInList;
		liToAdd.appendChild(spanToAdd);
		this.parentNode.querySelector('.likesList').appendChild(liToAdd);
	}
	try {
		const res = await fetch('/recipes/likeRecipe', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
				recipeId: this.parentNode.dataset.id
			})
		})
	}
	catch (err) {
		console.error(err);
	}
}