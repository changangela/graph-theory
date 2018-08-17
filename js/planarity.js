const K5 = 5, K33 = 6;

function Planarity(graph) {
	this.graph = graph;
}

Planarity.prototype.solve = function() {
	function removeEdge(graph, u, v) {
		let ret = [];

		for (let i = 0; i < graph.length; ++i) {
			ret.push([]);
			for (let j = 0; j < graph[i].length; ++j) {
				if (!(u == i && v == graph[i][j] || v == i && u == graph[i][j])) {
					ret[i].push(graph[i][j]);
				}
			}
		}

		return ret;
	}

	function removeVertex(graph, vertex) {
		let ret = [];

		for (let i = 0; i < graph.length; ++i) {
			if (i != vertex) {
				ret.push([]);
				for (let j = 0; j < graph[i].length; ++j) {
					if (graph[i][j] < vertex) {
						ret[ret.length - 1].push(graph[i][j]);
					} else if (graph[i][j] > vertex) {
						ret[ret.length - 1].push(graph[i][j] - 1);
					}
				}
			}
		}

		return ret;
	}

	function connectedBipartite(graph) {
		let setA = new Set(), setB = new Set();
		let queue = [];

		if (graph.length > 0) {
			queue.push(0);
		}

		while (queue.length != 0) {
			let current = queue.shift();
			let thisSet = setA.has(current) ? setA : setB, otherSet = setA.has(current) ? setB : setA; 

			for (let i = 0; i < current.length; ++i) {
				if (thisSet.has(current[i])) {
					return false;
				} else {
					if (!otherSet.has(current[i])) {
						otherSet.add(current[i]);
						queue.push(current[i]);
					}
				}
			}
		}

		return true;
	}

	function isKuratowskis(graph) {
		let kuratowskis = true;
		// check if K33
		if (graph.length == K33 && connectedBipartite(graph)) {
			for (let i = 0; i < graph.length; ++i) {
				if (graph[i].length != K33 / 2) {
					kuratowskis = false;
				}
			}
		} else if (graph.length == K5) {
			for (let i = 0; i < graph.length; ++i) {
				if (graph[i].length != K5 - 1) {
					kuratowskis = false;
				}
			}
		} else {
			kuratowskis = false;
		}

		return kuratowskis;
	}

	function eliminate(graph) {
		for (let i = graph.length - 1; i >= 0; --i) {
			if (graph[i].length <= 1) {
				for (let j = 0; j < graph[i].length; ++j) {
					console.log(graph, graph[i][j]);
					for (let n = graph[graph[i][j]].length - 1; n >= 0; --n) {
						if (graph[graph[i][j]][n] == i) {
							graph[graph[i][j]].splice(n, 1);
						}
					}
				}
				graph.splice(i, 1);
			}
		}

		if (graph.length < K5) {
			return true;
		}

		let edges = 0;
		for (let i = 0; i < graph.length; ++i) {
			edges += graph[i].length;
		}

		if (edges < K33 * 3 || edges < K5 * 4 && graph.length == K5) {
			return true;
		}

		let deg4 = 0, deg3 = 0;

		for (let i = 0; i < graph.length; ++i) {
			if (graph[i].length >= 4) {
				deg4++;
				deg3++;
			} else if (graph[i].length >= 3) {
				deg3++;
			}
		}

		if (deg4 < 5 && deg3 < 6) {
			return true;
		}

		return false;
	}

	function isPlanar(graph) {
		if (eliminate(graph)) {
			return true;
		} else if (isKuratowskis(graph)) {
			return false;
		} else {

			for (let i = 0; i < graph.length; ++i) {
				const temp = removeVertex(graph, i);
				if (!isPlanar(temp)) {
					return false;
				}
			}

			for (let i = 0; i < graph.length; ++i) {
				for (let j = 0; j < graph[i].length; ++j) {
					if (graph[i][j] > i) {
						const temp = removeEdge(graph, i, graph[i][j]);
						if (!isPlanar(temp)) {
							return false;
						}
					}
				}
			}

			return true;
		}
	}

	let idMap = {}
	let graph = []

	for (let i = 0; i < this.graph.vertices.length; ++i) {
		idMap[this.graph.vertices[i].id] = i;
	}

	for (let i = 0; i < this.graph.vertices.length; ++i) {
		graph.push([]);
		for (let j = 0; j < this.graph.vertices[i].neighbors.length; ++j) {
			graph[i].push(idMap[this.graph.vertices[i].neighbors[j].id]);
		}
	}

	return isPlanar(graph);
};

Planarity.combinations = function(array, m) {
	// generate all m element combinations of array elements
	let ret = [];

	function recur(index, depth, current) {		
		if (depth == m) {
			ret.push(current);
		} else {
			for (let i = index + 1; i < array.length - (m - depth) + 1; ++i) {
				let temp = current.slice();
				temp.push(array[i]);
				recur(i, depth + 1, temp);
			}
		}

	}

	recur(-1, 0, []);

	return ret;
}