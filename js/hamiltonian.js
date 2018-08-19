function Hamiltonian(graph) {
	this.graph = graph;
}

Hamiltonian.prototype.solve = function() {
	let graph = this.graph.clone(), path = [];

	function findBridges(vertices) {
		vertices.forEach(v => {
			if (v.degrees() == 1) {
				v.color = GRAPH_COLORS.RED;
			}
		});
	}

	function isEdge(v, u) {
		for (let i = 0; i < graph[v].length; ++i) {
			if (graph[v][i] == u) {
				return true;
			}
		}
		return false;
	}

	function isSafe(v, pos) {
		if (!isEdge(v, path[pos - 1])) {
			return false;
		}

		for (let i = 0; i < pos; ++i) {
			if (path[i] == v) {
				return false;
			}
		}

		return true;
	}

	function recur(pos) {
		if (pos == graph.length) {
			// if there is an edge from the last vertex to first
			return isEdge(0, path[pos - 1]);		
		}

		for (let i = 0; i < graph.length; ++i) {
			if (isSafe(i, pos)) {
				path[pos] = i;

				if (recur(pos + 1)) {
					return true;
				}

				// if adding vertex doens't lead to a solution, then remove it
				path[pos] = null;
			}
		}
		return false;
	}

	for (let i = 0; i < this.graph.vertices.length; ++i) {
		path.push(null);
	}

	if (graph.length > 0) {
		path[0] = 0;

		if (recur(1)) {
			const vertices = [...path, 0].map(x => this.graph.vertices[x]);			
			this.graph.setCircuit(new Path(vertices, this.graph));
			this.graph.setColor(GRAPH_COLORS.RED);
		} else {
			this.graph.setColor(GRAPH_COLORS.INVALID);
			findBridges(this.graph.vertices);
		}
	}


}