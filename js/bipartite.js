GRAPH_COLORS = {
	RED: '#ffffcc',
	YELLOW: '#ffccff',
	INVALID: '#cccccc',
	CYCLE: '#ccffff',
}

function Bipartite(graph) {
	this.graph = graph;
}

Bipartite.prototype.solve = function() {
	this.graph.disableEdges();
	
	function impossible(u, v, parent, vertices) {
		for (var i = 0; i < vertices.length; ++i) {
			vertices[i].color = GRAPH_COLORS.INVALID;
		}

		while (u != v) {
			u.color = GRAPH_COLORS.CYCLE;
			v.color = GRAPH_COLORS.CYCLE;
			u = parent[u.id];
			v = parent[v.id];
		}
		u.color = GRAPH_COLORS.CYCLE;
		v.color = GRAPH_COLORS.CYCLE;

	}

	let setA = new Set(), setB = new Set();

	let queue = graph.components(), parent = {};
	
	for (let i = 0; i < queue.length; ++i) {
		setA.add(queue[i]);
		parent[queue[i].id] = null;
	}

	while (queue.length != 0) {
		let current = queue.shift();
		let thisSet = setA.has(current) ? setA : setB, otherSet = setA.has(current) ? setB : setA; 

		for (let i = 0; i < current.neighbors.length; ++i) {
			if (thisSet.has(current.neighbors[i])) {
				impossible(current.neighbors[i], current, parent, this.graph.vertices);
				return false;
			} else {
				if (!otherSet.has(current.neighbors[i])) {
					otherSet.add(current.neighbors[i]);
					queue.push(current.neighbors[i]);
					parent[current.neighbors[i].id] = current;
				}
			}
		}
	}


	// color the sets
	setA.forEach(function(vertex) {
		vertex.color = GRAPH_COLORS.RED;
	})

	setB.forEach(function(vertex) {
		vertex.color = GRAPH_COLORS.YELLOW;
	})
}
