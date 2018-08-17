const VERTEX_RADIUS = 15;

function Vertex (x, y) {
	this.color = GRAPH_COLORS.NORMAL;
	this.radius = VERTEX_RADIUS;
	this.x = x;
	this.y = y;
	this.active = false;
	this.id = Vertex.uniqueId();
	this.label = null;

	this.neighbors = [];
}

Vertex.prototype.toggle = function() {
	if (this.active) {
		this.active = false;
		this.color = GRAPH_COLORS.NORMAL;
	} else {
		this.active = true;
		this.color = GRAPH_COLORS.ACTIVE;
	}
}

Vertex.prototype.disable = function() {
	this.active = false;
	this.color = GRAPH_COLORS.NORMAL;
}

Vertex.prototype.isActive = function() {
	return this.active;
}

Vertex.prototype.hasNeighbor = function(vertex) {
	for (let i = 0; i < this.neighbors.length; ++i) {
		if (this.neighbors[i] == vertex) {
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

Vertex.prototype.removeNeighbor = function(vertex) {
	for (let i = 0; i < this.neighbors.length; ++i) {
		if (this.neighbors[i] == vertex) {
			this.neighbors.splice(i, 1);
		}
	}
}

Vertex.prototype.degrees = function() {
	return this.neighbors.length;
}

Vertex.prototype.setLabel = function(text) {
	this.label = text;
}

function makeIdFactory() {
    let i = 0;
    return function() {
        return ++i;
    }
}

Vertex.uniqueId = makeIdFactory();