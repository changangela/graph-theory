function Normal(graph) {
	this.graph = graph;
}

Normal.prototype.solve = function() {
	this.graph.disableVertices();
}