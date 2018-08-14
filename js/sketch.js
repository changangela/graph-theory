const CANVAS_X = 750;
const CANVAS_Y = 500;
const FRAME_RATE = 10;
const BACKGROUND_COLOR = 240;

var graph = new Graph();
var graphController = new GraphController(graph);

function setup() {
    createCanvas(CANVAS_X, CANVAS_Y);
    ellipseMode(RADIUS);
}

function drawEdge(edge) {
    line(edge.v1.x, edge.v1.y, edge.v2.x, edge.v2.y);
}

function drawVertex(vertex) {
	fill(vertex.color);
	ellipse(vertex.x, vertex.y, vertex.radius, vertex.radius);
}

function draw() {
    background(BACKGROUND_COLOR);

    // draw edges

    for (var i = 0; i < graph.edges.length; i++) {
    	drawEdge(graph.edges[i]);
    }

    // draw vertices
	for (var i = 0; i < graph.vertices.length; i++) {
		drawVertex(graph.vertices[i]);
	}
}

function mousePressed() {

	if (keyIsPressed && keyCode == SHIFT) {
		graphController.addEdge(mouseX, mouseY);
	} else {
		const target = graphController.selectVertex(mouseX, mouseY);
				
		if (mouseButton == LEFT) {
			if (target != null) {
				graphController.toggleVertex(target);
			} else {
				graphController.addVertex(mouseX, mouseY);
			}

	  	} else if (mouseButton == RIGHT) {
	  		if (target != null) {
	  			graphController.removeVertex(target);
	  		}
	  	}
	}

  	return false;
}

function mouseDragged() {
	if (mouseButton == LEFT) {
		graphController.moveVertex(mouseX, mouseY);
	}

	return false;
}