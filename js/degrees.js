function Degrees(graph) {
	this.graph = graph;
}

Degrees.prototype.solve = function() {
	for (let i = 0; i < this.graph.vertices.length; ++i) {
		this.graph.vertices[i].setLabel(this.graph.vertices[i].degrees())
	}
}