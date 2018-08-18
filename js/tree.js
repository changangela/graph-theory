function Tree(edges) {
	this.edges = edges;
}

Tree.prototype.draw = function() {
	this.edges.forEach(e => {
		stroke(EDGE_COLORS.TREE).strokeWeight(HIGHLIGHT_STROKE);
		line(e.u.x, e.u.y, e.v.x, e.v.y);
	});
}