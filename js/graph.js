const GRAPH_MODE = {
	NORMAL: 'BUILDER',
	BIPARTITE: 'BIPARTITE',
	DEGREES: 'DEGREES',
}

function Graph() {
	this.vertices = [];
	this.edges = []; // a bit redundant but makes it easier to store graphics information
	this.mode = GRAPH_MODE.NORMAL;

	this.circuit = null;
}

Graph.prototype.addVertex = function(vertex) {
	this.vertices.push(vertex);
}

Graph.prototype.addEdge = function(u, v) {
	if (u != null &&  v != null && u != v) {
		u.addNeighbor(v);
		v.addNeighbor(u);
		this.edges.push(new Edge(u, v));
	}
}


Graph.prototype.removeVertex = function(vertex) {
	for (let i = this.vertices.length - 1; i >= 0; i--) {
		if (this.vertices[i] == vertex) {
			this.vertices.splice(i, 1);
		} else {
			this.vertices[i].removeNeighbor(vertex);
		}		
	}

	// remove edges that contain this vertex
	for (let i = this.edges.length - 1; i >= 0; i--) {
		if (this.edges[i].contains(vertex)) {
			this.edges.splice(i, 1);
		}
	}
}

Graph.prototype.removeEdge = function(edge) {
	for (let i = this.edges.length - 1; i >= 0; --i) {
		if (this.edges[i] == edge) {
			this.edges.splice(i, 1);
		}
	}

	for (let i = 0; i < this.vertices.length; ++i) {
		if (this.vertices[i] == edge.u) {
			this.vertices[i].removeNeighbor(edge.v);
		} else if (this.vertices[i] == edge.v) {
			this.vertices[i].removeNeighbor(edge.u);
		}
	}
}

Graph.prototype.activeVertex = function() {
	for (let i = 0; i < this.vertices.length; ++i) {
		if (this.vertices[i].isActive()) {
			return this.vertices[i];
		}
	}

	return null;
}

Graph.prototype.activeEdge = function() {
	for (let i = 0; i < this.edges.length; ++i) {
		if (this.edges[i].isActive()) {
			return this.edges[i];
		}
	}

	return null;
}

Graph.prototype.disableVertices = function() {
	for (let i = 0; i < this.vertices.length; ++i) {
		this.vertices[i].disable();
	}
}

Graph.prototype.disableEdges = function() {
	for (let i = 0; i < this.edges.length; ++i) {
		this.edges[i].disable();
	}
}

Graph.prototype.numEdges = function() {
	let ret = 0;
	for (let i = 0; i < this.vertices.length; ++i) {
		ret += this.vertices[i].degrees();
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
	let visited = new Set();
	let components = [];

	function bfs(vertex, visited) {
		if (visited.has(vertex)) {
			return;
		}

		visited.add(vertex);

		for (let i = 0; i < vertex.neighbors.length; ++i) {
			bfs(vertex.neighbors[i], visited);
		}
	}

	for (let i = 0; i < this.vertices.length; ++i) {
		if (!visited.has(this.vertices[i])) {
			components.push(this.vertices[i]);
			bfs(this.vertices[i], visited);
		}
	}

	return components;
}

Graph.prototype.degrees = function() {
	this.mode = GRAPH_MODE.DEGREES;
}