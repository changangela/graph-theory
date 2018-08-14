function GraphController(graph) {
	this.graph = graph;
}

GraphController.prototype.addEdge = function(x, y) {
	const target = this.selectVertex(x, y);
	if (target != null) {
		const active = this.graph.activeVertex();
		if (active != null) {
			this.graph.addEdge(new Edge(active, target));
		}
	}

	this.disableVertices();
}

GraphController.prototype.selectVertex = function(x, y) {
	var minDistance = Number.MAX_SAFE_INTEGER;
	var target = null;

	for (var i = 0; i < this.graph.vertices.length; i++) {
		const vertex = this.graph.vertices[i], distance = dist(x, y, vertex.x, vertex.y);
		if (distance < vertex.radius && distance < minDistance) {
			minDistance = distance;
			target = vertex;
		}
	}

	return target;
}

GraphController.prototype.disableVertices = function(x, y) {
	this.graph.disableVertices();
}

GraphController.prototype.addVertex = function(x, y) {
	this.disableVertices();
	this.graph.addVertex(new Vertex(x, y));
}

GraphController.prototype.toggleVertex = function(vertex) {
	vertex.toggle();
}

GraphController.prototype.removeVertex = function(vertex) {
	this.disableVertices();
	this.graph.removeVertex(vertex);
}

GraphController.prototype.moveVertex = function(x, y) {
	const target = this.graph.activeVertex();
	if (target != null) {
		target.x = x;
		target.y = y;
	}
}