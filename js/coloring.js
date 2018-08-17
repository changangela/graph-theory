function Coloring(graph) {
	this.sets = [];
}

Coloring.prototype.solve = function(vertices) {
	this.sets = [];

	let queue = Graph.components(vertices);

	for (let i = 0; i < queue.length; ++i) {
		this.add(queue[i]);
	}

	while (queue.length > 0) {
		let current = queue.shift();
		for (let i = 0; i < current.neighbors.length; ++i) {
			if (!this.contains(current.neighbors[i])) {
				this.add(current.neighbors[i]);
				queue.push(current.neighbors[i]);
			}
		}
	}
}

Coloring.prototype.add = function(vertex) {
	for (let i = 0; i < this.sets.length; ++i) {
		let valid = true;
		for (let j = 0; j < vertex.neighbors.length; ++j) {
			if (this.sets[i].has(vertex.neighbors[j])) {
				valid = false;
			}
		}

		if (valid) {
			this.sets[i].add(vertex);
			return;
		}
	}

	this.sets.push(new Set([vertex]));
};

Coloring.prototype.contains = function(vertex) {
	for (let i = 0; i < this.sets.length; ++i) {
		if (this.sets[i].has(vertex)) {
			return true;
		}
	}
	return false;
}

Coloring.prototype.colors = function() {
	return this.sets.length;
}