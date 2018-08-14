const EDGE_COLORS = {
	MAIN: '#99ccff',
}

function Edge(v1, v2) {
	this.v1 = v1;
	this.v2 = v2;
	this.color = EDGE_COLORS.MAIN;
}