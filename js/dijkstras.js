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

		let vertices = [], temp = this.graph.idToIndex(this.dest.id);
		
		while (temp != null) {
			const u = this.graph.vertices[temp];
			u.color = GRAPH_COLORS.RED;
			vertices.unshift(u);
			temp = parent[temp];
		}

		this.src.color = GRAPH_COLORS.SOURCE;
		this.dest.color = GRAPH_COLORS.DESTINATION;

		this.graph.setCircuit(new Path(vertices, this.graph));
	}

}