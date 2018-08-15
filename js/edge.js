const EDGE_COLORS = {
	NORMAL: '#000000',
	ACTIVE: '#ffffcc',
}

function Edge(u, v) {
	this.u = u;
	this.v = v;
	this.active = false;
}

Edge.prototype.contains = function(vertex) {
	return this.u == vertex || this.v == vertex;
}

Edge.prototype.toggle = function() {
	if (!this.active) {
		this.active = true;
	} else {
		this.active = false;
	}
}

Edge.prototype.disable = function() {
	this.active = false;
}

Edge.prototype.isActive = function() {
	return this.active;
}