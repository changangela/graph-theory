const CANVAS_X = 750;
const CANVAS_Y = 500;
const FRAME_RATE = 10;
const BACKGROUND_COLOR = '#f2f2f2';

const KEY_MAPPING = {
	BIPARTITE: 66, // 'b'
	NORMAL: 78, // 'n'
}

let graph = new Graph();
let graphController = new GraphController(graph);
let messageObj = document.getElementById("message");

function setup() {
	// messageObj.innerHTML = MESSAGE;
    let canvas = createCanvas(CANVAS_X, CANVAS_Y);
    canvas.parent('playground');
    ellipseMode(RADIUS);
    textFont('Ubuntu', 16);
}

function drawEdge(v1, v2) {
    line(v1.x, v1.y, v2.x, v2.y);
}

function drawVertex(vertex) {
	fill(vertex.color);
	ellipse(vertex.x, vertex.y, vertex.radius, vertex.radius);
}

function drawMode() {
	fill('#000000');
	text(graph.mode, 10, 10, 100, 120);
}
function draw() {
	background(BACKGROUND_COLOR);
	drawMode();

    // draw edges

    for (let i = 0; i < graph.vertices.length; i++) {
    	for (let j = 0; j < graph.vertices[i].neighbors.length; j++) {
    		drawEdge(graph.vertices[i], graph.vertices[i].neighbors[j]);
    	}
    }

    // draw vertices
	for (let i = 0; i < graph.vertices.length; i++) {
		drawVertex(graph.vertices[i]);
	}
}

function keyPressed() {
	if (keyCode == KEY_MAPPING.BIPARTITE) {
		graphController.bipartite();
	} else if (keyCode == KEY_MAPPING.NORMAL) {
		graphController.normal();
	}

}

function mousePressed() {
	if (graph.mode === GRAPH_MODE.NORMAL) {
		if (keyIsPressed && keyCode == SHIFT) {
			const target = graphController.addEdge(mouseX, mouseY);
			graphController.disableIfNotTarget(null);
			if (target != null) {
				target.toggle();
			}
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
	}

  	return false;
}

function mouseDragged() {
	if (graph.mode === GRAPH_MODE.NORMAL) {
		if (mouseButton == LEFT) {
			graphController.moveVertex(mouseX, mouseY);
		}
	}

	return false;
}