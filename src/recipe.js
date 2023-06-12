class Recipe {
	constructor(name, ingredients, steps) {
		this._recipeName = name;
		this._ingredients = ingredients;
		this._steps = steps;
		this._likes = [];
	}

	get recipeName() {
		return this._recipeName;
	}

	get ingredients() {
		return this._ingredients;
	}

	get steps() {
		return this._steps;
	}

	get likes() {
		return this._likes;
	}

	rename(newName) {
		this._recipeName = newName;
	}

	addIngredient(ingredient) {
		this._ingredients.push(ingredient);
	}

	setIngredients(newIngredients) {
		this._ingredients = newIngredients;
	}

	editIngredient(index, newIngredient) {
		this._ingredients[index] = newIngredient;
	}

	deleteIngredient(index) {
		this._ingredients.splice(index, 1);
	}

	addStep(step) {
		this._steps.push(step);
	}

	setSteps(newSteps) {
		this._steps = newSteps;
	}

	editStep(index, newStep) {
		this._steps[index] = newStep;
	}

	deleteStep(index) {
		this._steps.splice(index, 1);
	}
}

module.exports = Recipe;