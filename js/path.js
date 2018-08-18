function Path(vertices, graph) {
	this.vertices = vertices;
	this.graph = graph;
	this.index = 0;
	this.timer = 0;
}


Path.prototype.draw = function() {
	const target = this.vertices[this.index];
	if (this.timer >= ANIMATE_TIME) {
		this.index = (this.index + 1) % (this.vertices.length - 1);
		this.timer = 0;
	}


	for (let i = 0; i < this.vertices.length - 1; ++i) {
		const edge = this.graph.getEdge(this.vertices[i], this.vertices[i + 1]);
		stroke(EDGE_COLORS.PATH).strokeWeight(HIGHLIGHT_STROKE);
		line(edge.u.x, edge.u.y, edge.v.x, edge.v.y);
	}

	stroke(EDGE_COLORS.ELECTRON).strokeWeight(HIGHLIGHT_STROKE);

	if (this.vertices.length > 1) {
		let begin = target, end = this.vertices[this.index + 1];

		line(
			begin.x + (end.x - begin.x) / ANIMATE_TIME * this.timer,
			begin.y + (end.y - begin.y) / ANIMATE_TIME * this.timer,
			begin.x + (end.x - begin.x) / ANIMATE_TIME * (this.timer + 1),
			begin.y + (end.y - begin.y) / ANIMATE_TIME * (this.timer + 1)
		);
		
	}

	this.timer++;

}