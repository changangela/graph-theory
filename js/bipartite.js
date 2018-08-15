GRAPH_COLORS = {
	RED: '#ffffcc',
	BLUE: '#ffccff',
}

function Bipartite(graph) {
	this.graph = graph;
}

Bipartite.prototype.solve = function() {
	var setA = new Set(), setB = new Set();

	var queue = [];
	if (graph.numVertices() > 0) {
		setA.add(graph.vertices[0]);
		queue.push(graph.vertices[0]);
	}

	while (queue.length != 0) {
		var current  = queue.shift();
		var thisSet = setA.has(current) ? setA : setB, otherSet = setA.has(current) ? setB : setA; 

		for (var i = 0; i < current.numNeighbors(); i++) {
			if (thisSet.has(current.neighbors[i])) {
				return false;
			} else {
				if (!otherSet.has(current.neighbors[i])) {
					otherSet.add(current.neighbors[i]);
					queue.push(current.neighbors[i]);
				}
			}
		}
	}


	// color the sets
	setA.forEach(function(vertex) {
		vertex.color = GRAPH_COLORS.RED;
	})

	setB.forEach(function(vertex) {
		vertex.color = GRAPH_COLORS.BLUE;
	})
}