class RecipeElements {
	constructor() {
		this._elements  = [];
	}
	
	get elements() {
		return this._elements;
	}

	add(newElement) {
		this._elements.push(newElement);
	}

	edit(index, newElement) {
		this._elements[index] = newElement;
	}

	delete(index) {
		this._elements.splice(index, 1);
	}
}

module.exports = RecipeElements;