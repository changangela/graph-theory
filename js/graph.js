function Graph() {
	this.vertices = []
	this.edges = []
}

Graph.prototype.addVertex = function(vertex) {
	this.vertices.push(vertex)
}

Graph.prototype.addEdge = function(edge) {
	this.edges.push(edge);
}


Graph.prototype.removeVertex = function(vertex) {
	for (var i = 0; i < this.vertices.length; i++) {
		if (this.vertices[i].equals(vertex)) {
			this.vertices.splice(i, 1);
			return;
		}
	}
}

Graph.prototype.activeVertex = function() {
	for (var i = 0; i < this.vertices.length; i++) {
		if (this.vertices[i].isActive()) {
			return this.vertices[i];
		}
	}

	return null;
}

Graph.prototype.disableVertices = function() {
	for (var i = 0; i < this.vertices.length; i++) {
		this.vertices[i].disable();
	}
}
