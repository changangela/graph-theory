function Dijkstras(graph, src, dest) {
	this.graph = graph;
	this.src = src;
	this.dest = dest;
}

Dijkstras.prototype.solve = function() {
	function minDistVertex(distance, unexplored) {
		let minDist = Number.MAX_SAFE_INTEGER;
		let node = null;

		unexplored.forEach(x => {
			if (distance[x] <= minDist) {
				minDist = distance[x];
				node = x;
			}
		});

		return node;
	}

	this.graph.setColor(GRAPH_COLORS.INVALID);

	if (this.graph.pathExists(this.src, this.dest)) {
		const NODE = 0, WEIGHT = 1;


		const graph = this.graph.cloneWeighted();
		console.log(graph);

		// set each nodes position to infinity and parent to null
		let distance = [], parent = [], unexplored = new Set();
		for (let i = 0; i < graph.length; ++i) {
			distance.push(Number.MAX_SAFE_INTEGER);
			parent.push(null);
			unexplored.add(i);
		}

		distance[this.graph.idToIndex(this.src.id)] = 0;

		while (unexplored.size > 0) {
			let u = minDistVertex(distance, unexplored);
			unexplored.delete(u);

			for (let i = 0; i < graph[u].length; ++i) {
				if (unexplored.has(graph[u][i][NODE])) {
					const v = graph[u][i][NODE], alt = distance[u] + graph[u][i][WEIGHT];
					if (alt < distance[v]) {
						distance[v] = alt;
						parent[v] = u;	
					}
				}
			}
		}

		let edges = [], temp = this.graph.idToIndex(this.dest.id);
		while (parent[temp] != null) {
			const u = this.graph.vertices[temp], v = this.graph.vertices[parent[temp]];
			u.color = GRAPH_COLORS.CYCLE;
			v.color = GRAPH_COLORS.CYCLE;
			edges.unshift(this.graph.getEdge(u, v));
			temp = parent[temp];
		}

		this.src.color = GRAPH_COLORS.ACTIVE;
		this.dest.color = GRAPH_COLORS.RED;

		this.graph.setCircuit(new Circuit(edges));
	}

}