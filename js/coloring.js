function Coloring(graph) {
	this.graph = graph;
}

Coloring.prototype.solve = function() {
	let sets = [], colors = new Set();

	function add(vertex) {
		for (let i = 0; i < sets.length; ++i) {
			let valid = true;
			for (let j = 0; j < vertex.neighbors.length; ++j) {
				if (sets[i].has(vertex.neighbors[j])) {
					valid = false;
				}
			}

			if (valid) {
				sets[i].add(vertex);
				return;
			}
		}

		sets.push(new Set([vertex]));
	};

	function contains(vertex) {
		for (let i = 0; i < sets.length; ++i) {
			if (sets[i].has(vertex)) {
				return true;
			}
		}
		return false;
	}

	function unusedColor() {
		function randomHex() {
			const HEX = 'cf';
			return HEX.charAt(Math.floor(Math.random() * HEX.length)).repeat(2);
		}

		while (true) {
			const r = randomHex(), g = randomHex(), b = randomHex();
			const color = '#' + r + g + b;
			if (!colors.has(color)) {
				colors.add(color);
				return color;
			}
		}
	}

	let queue = this.graph.components();

	for (let i = 0; i < queue.length; ++i) {
		add(queue[i]);
	}

	while (queue.length > 0) {
		let current = queue.shift();
		for (let i = 0; i < current.neighbors.length; ++i) {
			if (!contains(current.neighbors[i])) {
				add(current.neighbors[i]);
				queue.push(current.neighbors[i]);
			}
		}
	}

	console.log(sets);

	for (let i = 0; i < sets.length; ++i) {
		const color = unusedColor();
		sets[i].forEach(vertex => {
			vertex.color = color;
			vertex.setLabel(String.fromCharCode(65 + i));
		});
	}
}