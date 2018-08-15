const GRAPH_MODE = {
	NORMAL: 'BUILDER',
	BIPARTITE: 'BIPARTITE',
}

function Graph() {
	this.vertices = [];
	this.mode = GRAPH_MODE.NORMAL;
}

Graph.prototype.addVertex = function(vertex) {
	this.vertices.push(vertex);
}

Graph.prototype.addEdge = function(v1, v2) {
	if (v1 != null &&  v2 != null && !v1.equals(v2)) {
		v1.addNeighbor(v2);
		v2.addNeighbor(v1);
	}
}


Graph.prototype.removeVertex = function(vertex) {
	for (var i = this.vertices.length - 1; i >= 0; i--) {
		if (this.vertices[i].equals(vertex)) {
			this.vertices.splice(i, 1);
		} else {
			this.vertices[i].removeNeighbors(vertex);
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

Graph.prototype.numEdges = function() {
	var ret = 0;
	for (var i = 0; i < this.vertices.length; i++) {
		ret += this.vertices[i].numNeighbors();
	}
	return ret / 2;
}

Graph.prototype.numVertices = function() {
	return this.vertices.length;
}

Graph.prototype.bipartite = function() {
	this.mode = GRAPH_MODE.BIPARTITE;
	const bipartiteSolver = new Bipartite(graph);
	bipartiteSolver.solve();
}

Graph.prototype.normal = function() {
	this.mode = GRAPH_MODE.NORMAL;
	this.disableVertices();
}

Graph.prototype.components = function() {
	// returns a list of vertices, one from each component of the graph
	var visited = new Set();
	var components = [];

	function bfs(vertex, visited) {
		if (visited.has(vertex)) {
			return;
		}

		visited.add(vertex);

		for (var i = 0; i < vertex.neighbors.length; i++) {
			bfs(vertex.neighbors[i], visited);
		}
	}

	for (var i = 0; i < this.vertices.length; i++) {
		if (!visited.has(this.vertices[i])) {
			components.push(this.vertices[i]);
			bfs(this.vertices[i], visited);
		}
	}

	return components;
}