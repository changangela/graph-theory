const ANIMATE_TIME = 20;

function Circuit(edges) {
	this.edges = edges;
	this.index = 0;
	this.timer = 0;
}

Circuit.prototype.highlightedEdge = function() {
	if (this.timer >= ANIMATE_TIME) {
		this.index = (this.index + 1) % this.edges.length;
		this.timer = 0;
	}

	this.timer++;

	return this.edges[this.index];
}