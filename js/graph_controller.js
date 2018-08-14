function GraphController(graph) {
	this.graph = graph;
}

GraphController.prototype.addEdge = function(x, y) {
	const target = this.selectVertex(x, y);
	const active = this.graph.activeVertex();
	this.graph.addEdge(active, target);
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

GraphController.prototype.disableIfNotTarget = function(target) {
	const active = this.graph.activeVertex();
	if (active != null && !active.equals(target)) {
		active.disable();
	}
}

GraphController.prototype.addVertex = function(x, y) {
	this.graph.addVertex(new Vertex(x, y));
}

GraphController.prototype.toggleVertex = function(vertex) {
	vertex.toggle();
}

GraphController.prototype.removeVertex = function(vertex) {
	this.graph.removeVertex(vertex);
}

GraphController.prototype.moveVertex = function(x, y) {
	const target = this.graph.activeVertex();
	if (target != null) {
		target.x = x;
		target.y = y;
	}
}