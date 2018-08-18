const ANIMATE_TIME = 20;

function Circuit(edges) {
	this.edges = edges;
	this.index = 0;
	this.timer = 0;
}

Circuit.prototype.draw = function() {
	const target = this.edges[this.index];
	if (this.timer >= ANIMATE_TIME) {
		this.index = (this.index + 1) % this.edges.length;
		this.timer = 0;
	}


	for (let i = 0; i < this.edges.length; ++i) {
		const edge = this.edges[i];
		stroke(EDGE_COLORS.CIRCUIT).strokeWeight(HIGHLIGHT_STROKE);
		line(edge.u.x, edge.u.y, edge.v.x, edge.v.y);
	}

	stroke(EDGE_COLORS.ELECTRON).strokeWeight(HIGHLIGHT_STROKE);

	let begin = null, end = null;
	if ((this.index < this.edges.length - 1 && this.edges[(this.index + 1)].contains(target.u)) || (this.index > 0 && this.edges[(this.index - 1)].contains(target.v))) {
		begin = target.v;
		end = target.u;
	} else {
		begin = target.u;
		end = target.v;
	}

	line(
		begin.x + (end.x - begin.x) / ANIMATE_TIME * this.timer,
		begin.y + (end.y - begin.y) / ANIMATE_TIME * this.timer,
		begin.x + (end.x - begin.x) / ANIMATE_TIME * (this.timer + 1),
		begin.y + (end.y - begin.y) / ANIMATE_TIME * (this.timer + 1)
	);

	this.timer++;

}