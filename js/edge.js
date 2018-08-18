const EDGE_COLORS = {
	NORMAL: '#000000',
	ACTIVE: '#ffffcc',
	CIRCUIT: '#ccccff',
	ELECTRON: '#ffffcc',
	PATH: '#ffcccc',
}

function Edge(u, v) {
	this.u = u;
	this.v = v;
	this.active = false;
	this.weight = 1;
	this.id = Edge.uniqueId();
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

Edge.prototype.setWeight = function(weight) {
	this.weight = weight;
}

function makeIdFactory() {
    let i = 0;
    return function() {
        return ++i;
    }
}

Edge.uniqueId = makeIdFactory();