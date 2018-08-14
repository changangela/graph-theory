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

function drawEdge(v1, v2) {
    line(v1.x, v1.y, v2.x, v2.y);
}

function drawVertex(vertex) {
	fill(vertex.color);
	ellipse(vertex.x, vertex.y, vertex.radius, vertex.radius);
}

function draw() {
    background(BACKGROUND_COLOR);
    // draw edges

    for (var i = 0; i < graph.vertices.length; i++) {
    	for (var j = 0; j < graph.vertices[i].neighbors.length; j++) {
    		drawEdge(graph.vertices[i], graph.vertices[i].neighbors[j]);
    	}
    }

    // draw vertices
	for (var i = 0; i < graph.vertices.length; i++) {
		drawVertex(graph.vertices[i]);
	}
}

function mousePressed() {

	if (keyIsPressed && keyCode == SHIFT) {
		graphController.addEdge(mouseX, mouseY);
		graphController.disableIfNotTarget(null);
	} else {
		const target = graphController.selectVertex(mouseX, mouseY);
		
		graphController.disableIfNotTarget(target);

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