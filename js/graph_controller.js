
function GraphController(graph) {
	this.graph = graph;
	this.mode = GRAPH_MODE.NORMAL;
}

GraphController.prototype.addEdge = function(x, y) {
	const target = this.selectVertex(x, y);
	const active = this.graph.activeVertex();
	this.graph.addEdge(active, target);
	return target;
}

GraphController.prototype.selectVertex = function(x, y) {
	let minDistance = Number.MAX_SAFE_INTEGER;
	let target = null;

	for (let i = 0; i < this.graph.vertices.length; ++i) {
		const vertex = this.graph.vertices[i], distance = dist(x, y, vertex.x, vertex.y);
		if (distance < vertex.radius && distance < minDistance) {
			minDistance = distance;
			target = vertex;
		}
	}

	return target;
}

GraphController.prototype.selectedEdge = function(x, y) {
	function isOnSegment(ux, uy, vx, vy, px, py) {
		const epsilon = 2500;
		const delta = Math.abs((py - uy)  * (vx - ux) - (vy - uy) * (px - ux));
	    return delta < epsilon && (px >= Math.min(ux, vx) - VERTEX_RADIUS / 2 && px <= Math.max(ux, vx) + VERTEX_RADIUS / 2);
	}

	function distance(ux, uy, vx, vy, px, py) {
		return Math.abs((py - uy)  * (vx - ux) - (vy - uy) * (px - ux));
	}


	let minDistance = Number.MAX_SAFE_INTEGER, target = null;

	for (let i = 0; i < this.graph.edges.length; ++i) {
		 const edge = this.graph.edges[i];
		 if (isOnSegment(edge.u.x, edge.u.y, edge.v.x, edge.v.y, x, y)) {
		 	const dist = distance(edge.u.x, edge.u.y, edge.v.x, edge.v.y, x, y);
		 	if (dist < minDistance) {
		 		minDistance = dist;
		 		target = edge;
		 	}
		 }
	}

	return target;
}

GraphController.prototype.disableVertices = function(target) {
	const active = this.graph.activeVertex();
	if (active != null && active != target) {
		active.disable();
	}
}

GraphController.prototype.disableEdges = function(target) {
	const active = this.graph.activeEdge();
	if (active != null && active != target) {
		active.disable();
	}
}

GraphController.prototype.addVertex = function(x, y) {
	this.graph.addVertex(new Vertex(x, y));
}

GraphController.prototype.toggleVertex = function(vertex) {
	vertex.toggle();
}

GraphController.prototype.toggleEdge = function(edge) {
	edge.toggle();
}

GraphController.prototype.removeVertex = function(vertex) {
	if (vertex != null) {
		this.graph.removeVertex(vertex);
	}
}

GraphController.prototype.removeEdge = function(edge) {
	if (edge != null) {
		this.graph.removeEdge(edge);
	}
}

GraphController.prototype.moveVertex = function(x, y) {
	const target = this.graph.activeVertex();
	if (target != null) {
		target.x = x;
		target.y = y;
	}
}

GraphController.prototype.bipartite = function() {
	this.graph.bipartite();
}

GraphController.prototype.eulerian = function() {
    this.graph.eulerian();
}

GraphController.prototype.normal = function() {
	this.graph.normal();
}

GraphController.prototype.degrees = function() {
	this.graph.degrees();
}

GraphController.prototype.coloring = function() {
	this.graph.coloring();
}

GraphController.prototype.mst = function() {
    this.graph.mst();
}

GraphController.prototype.weighted = function() {
	this.graph.toggleWeighted();
}

GraphController.prototype.setWeight = function() {
    const target = this.graph.activeEdge();
	if (target != null) {
    	const weight = parseInt(prompt("Edge weight?", target.weight));
    	if (!isNaN(weight)) {
			target.setWeight(parseInt(weight));
    	}
	}
}

GraphController.prototype.dijkstras = function(x, y) {
	const target = this.selectVertex(x, y);
	const active = this.graph.activeVertex();
	if (target != null && active != null && target != active) {
		this.graph.dijkstras(target, active);
	}
}