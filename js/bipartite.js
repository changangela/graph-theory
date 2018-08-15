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
	function impossible(u, v, parent, graph) {
		let cycle = [graph.getEdge(u, v)];

		for (var i = 0; i < graph.vertices.length; ++i) {
			graph.vertices[i].color = GRAPH_COLORS.INVALID;
		}

		while (u != v) {
			u.color = GRAPH_COLORS.CYCLE;
			v.color = GRAPH_COLORS.CYCLE;

			cycle.push(graph.getEdge(u, parent[u.id]));
			cycle.unshift(graph.getEdge(v, parent[v.id]));

			u = parent[u.id];
			v = parent[v.id];
		}
		u.color = GRAPH_COLORS.CYCLE;
		v.color = GRAPH_COLORS.CYCLE;

		graph.setCircuit(new Circuit(cycle));
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
				impossible(current.neighbors[i], current, parent, this.graph);
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
