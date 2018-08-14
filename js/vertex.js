const VERTEX_RADIUS = 15;

const VERTEX_COLORS = {
	MAIN: '#ccccff',
	ACTIVE: '#ccffcc',
	// '#ffffcc',
	// '#ffccff',
	// ACTIVE: '#ffcccc',
}

function Vertex (x, y) {
	this.color = VERTEX_COLORS.MAIN;
	this.radius = VERTEX_RADIUS;
	this.x = x;
	this.y = y;
	this.active = false;
}

Vertex.prototype.toggle = function() {
	if (this.active) {
		this.active = false;
		this.color = VERTEX_COLORS.MAIN;
	} else {
		this.active = true;
		this.color = VERTEX_COLORS.ACTIVE;
	}
}

Vertex.prototype.disable = function() {
	if (this.active) {
		this.toggle();
	}
}