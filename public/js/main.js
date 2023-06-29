const addIngredientBtn = document.querySelector('.addIngredient');
const addStepBtn = document.querySelector('.addStep');
const submitBtn = document.querySelector('.submit');
const deleteBtns = document.querySelectorAll('.delete');
const deleteFromMainPageBtns = document.querySelectorAll('.deleteRecipe');
const deleteFromViewBtn = document.querySelector('.deleteFromView');
const addIngredientInput = document.querySelector('.ingredientInput');
const addStepInput = document.querySelector('.stepInput');
const showLikesBtns = document.querySelectorAll('.likes');
const likeBtns = document.querySelectorAll('.like.icon');
const submitCommentBtn = document.querySelector('.submitComment');
const addCommentInput = document.querySelector('input.comment');
const likeCommentBtns = document.querySelectorAll('.likeComment.icon');
const deleteCommentBtns = document.querySelectorAll('.deleteComment.icon');

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
Array.from(showLikesBtns).forEach(el => el.addEventListener('click', toggleLikesList));
Array.from(likeBtns).forEach(el => el.addEventListener('click', likeRecipe));
submitCommentBtn && submitCommentBtn.addEventListener('click', submitComment);
Array.from(likeCommentBtns).forEach(el => el.addEventListener('click', likeComment));
Array.from(deleteCommentBtns).forEach(el => el.addEventListener('click', deleteComment));
addCommentInput && addCommentInput.addEventListener('keydown', (e) => {
	if (e.repeat) return;
	if (e.code === 'Enter') {
		submitComment();
	}
})


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
	}
	catch (err) {
		console.error(err);
	}
}

function toggleLikesList() {
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

async function submitComment() {
	document.querySelector('.submitComment').disabled = true;
	try {
		const comment = document.querySelector('input.comment').value;
		const recipe = document.querySelector('div.createComment').dataset.id;
		const res = await fetch(`/comments/createComment/${recipe}`, {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				comment: comment,
				recipe: recipe
			})
		});
		const data = await res.json();
		const li = document.createElement('li');
		const span = document.createElement('span');
		const iconsDiv = document.createElement('div');
		const infoDiv = document.createElement('div');
		const bylineSpan = document.createElement('span');
		const likeCommentSpan = document.createElement('span');
		const deleteCommentSpan = document.createElement('span');
		const numLikesSpan = document.createElement('span');
		numLikesSpan.classList.add('commentLikes');
		numLikesSpan.textContent = '0';
		likeCommentSpan.classList.add('likeComment', 'icon', 'fa-solid', 'fa-fire', 'unclicked');
		deleteCommentSpan.classList.add('icon', 'fa-solid', 'fa-trash', 'deleteComment');
		likeCommentSpan.addEventListener('click', likeComment);
		deleteCommentSpan.addEventListener('click', deleteComment);
		bylineSpan.classList.add('commentByline');
		bylineSpan.textContent = document.querySelector('body').dataset.user;
		infoDiv.classList.add('commentInfo');
		infoDiv.appendChild(bylineSpan);
		infoDiv.appendChild(span);
		iconsDiv.classList.add('commentIcons');
		iconsDiv.appendChild(numLikesSpan);
		iconsDiv.appendChild(likeCommentSpan);
		iconsDiv.appendChild(deleteCommentSpan);
		span.classList.add('commentText');
		span.textContent = document.querySelector('input.comment').value;
		li.appendChild(infoDiv);
		li.appendChild(iconsDiv);
		li.classList.add('comment');
		li.dataset.id = data.id;
		document.querySelector('ul.commentsList').appendChild(li);
		document.querySelector('input.comment').value = '';
		document.querySelector('.submitComment').disabled = false;

	}
	catch (err) {
		console.error(err);
		document.querySelector('.submitComment').disabled = false;
	}
}

async function likeComment() {
	if (this.classList.contains('clicked')) {
		this.classList.replace('clicked', 'unclicked');
		const likesNode = this.parentNode.querySelector('.commentLikes');
		let numLikes = Number(likesNode.innerText) - 1;
		likesNode.innerText = numLikes;
	}
	else {
		this.classList.replace('unclicked', 'clicked');
		const likesNode = this.parentNode.querySelector('.commentLikes');
		let numLikes = Number(likesNode.innerText) + 1;
		likesNode.innerText = numLikes;
		likesNode.innerText = numLikes;
	}
	try {
		const likedComment = this.parentNode.parentNode.dataset.id;
		const res = await fetch(`/comments/likeComment/${likedComment}`, {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
		})
	}
	catch (err) {
		console.error(err);
	}
}

async function deleteComment() {
	const deleteTarget = this.parentNode.parentNode;
	const deleteTargetId = deleteTarget.dataset.id;
	deleteTarget.remove();
	try {
		const res = await fetch(`/comments/deleteComment/${deleteTargetId}`, {
			method: 'delete',
			headers: {'Content-Type': 'application/json'},
		})
	}
	catch (err) {
		console.error(err);
	}
}