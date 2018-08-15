const VERTEX_RADIUS = 15;

const VERTEX_COLORS = {
	NORMAL: '#ccccff',
	ACTIVE: '#ccffcc',
	// ACTIVE: '#ffcccc',
}

function Vertex (x, y) {
	this.color = VERTEX_COLORS.NORMAL;
	this.radius = VERTEX_RADIUS;
	this.x = x;
	this.y = y;
	this.active = false;

	this.neighbors = [];
}

Vertex.prototype.toggle = function() {
	if (this.active) {
		this.active = false;
		this.color = VERTEX_COLORS.NORMAL;
	} else {
		this.active = true;
		this.color = VERTEX_COLORS.ACTIVE;
	}
}

Vertex.prototype.disable = function() {
	this.active = false;
	this.color = VERTEX_COLORS.NORMAL;
}

Vertex.prototype.equals = function(vertex) {
	return this == vertex;
}

Vertex.prototype.isActive = function() {
	return this.active;
}

Vertex.prototype.hasNeighbor = function(vertex) {
	for (var i = 0; i < this.neighbors.length; i++) {
		if (this.neighbors[i].equals(vertex)) {
			return true;
		}
	}
	return false;
}

Vertex.prototype.addNeighbor = function(vertex) {
	if (!this.hasNeighbor(vertex)) {
		this.neighbors.push(vertex);
	}
}

Vertex.prototype.removeNeighbors = function(vertex) {
	for (var i = 0; i < this.neighbors.length; i++) {
		if (this.neighbors[i].equals(vertex)) {
			this.neighbors.splice(i, 1);
		}
	}
}

Vertex.prototype.numNeighbors = function() {
	return this.neighbors.length;
}