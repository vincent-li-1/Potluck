const deleteBtn = document.querySelectorAll('.deleteRecipe');

Array.from(deleteBtn).forEach(el => el.addEventListener('click', deleteRecipe));

async function deleteRecipe() {
	const deleteTarget = this.parentNode.dataset.id;
	try {
		const res = await fetch('/deleteRecipe', {
			method: 'delete',
			headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'recipeIdToDelete': deleteTarget
            })
		});
		const data = await res.json();
		console.log(data);
		location.reload();
	}
	catch (err) {
		console.error(err);
	}
}