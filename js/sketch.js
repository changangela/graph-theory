const CANVAS_X = 750;
const CANVAS_Y = 500;
const FRAME_RATE = 10;
const BACKGROUND_COLOR = '#f2f2f2';

const LIGHT_STROKE = 1, HIGHLIGHT_STROKE = 10, HEAVY_STROKE = 2;
const TEXT_COLOR = '#000000';

const KEY_MAPPING = {
	BIPARTITE: 66, // 'b'
	NORMAL: 78, // 'n'
	DEGREES: 68, // 'd'
}

let graph = new Graph();
let graphController = new GraphController(graph);
let messageObj = document.getElementById("message");

function setup() {
	// messageObj.innerHTML = MESSAGE;
    let canvas = createCanvas(CANVAS_X, CANVAS_Y);
    canvas.parent('playground');
    ellipseMode(RADIUS);

    textFont('Ubuntu', 16, 20);
}

function drawEdge(edge) {
	if (edge.active) {
		strokeWeight(HIGHLIGHT_STROKE);
		stroke(EDGE_COLORS.ACTIVE);
	    line(edge.u.x, edge.u.y, edge.v.x, edge.v.y);
	}

	strokeWeight(LIGHT_STROKE);
	stroke(EDGE_COLORS.NORMAL);
    line(edge.u.x, edge.u.y, edge.v.x, edge.v.y);
}

function drawVertex(vertex) {
	fill(vertex.color).stroke(TEXT_COLOR).strokeWeight(LIGHT_STROKE);
	ellipse(vertex.x, vertex.y, vertex.radius, vertex.radius);

	if (graph.mode == GRAPH_MODE.DEGREES) {
	    textAlign(CENTER, CENTER);
		fill(TEXT_COLOR).noStroke();
		text(vertex.degrees(), vertex.x, vertex.y);
	}
}

function drawMode() {
	fill(TEXT_COLOR).stroke(TEXT_COLOR).strokeWeight(LIGHT_STROKE / 5);
    textAlign(LEFT, TOP);
	text(graph.mode, 10, 10, 70, 20);
}
function draw() {
	background(BACKGROUND_COLOR);
	drawMode();

    // draw edges
    for (let i = 0; i < graph.edges.length; ++i) {
    	drawEdge(graph.edges[i]);
    }

    // draw vertices
	for (let i = 0; i < graph.vertices.length; ++i) {
		drawVertex(graph.vertices[i]);
	}
}

function keyPressed() {
	if (keyCode == KEY_MAPPING.BIPARTITE) {
		graphController.bipartite();
	} else if (keyCode == KEY_MAPPING.NORMAL) {
		graphController.normal();
	} else if (keyCode == KEY_MAPPING.DEGREES) {
		graphController.degrees();
	} else if (keyCode == DELETE) {
		graphController.removeVertex(graph.activeVertex());
		graphController.removeEdge(graph.activeEdge());
	}

}

function mousePressed() {
	if (graph.mode != GRAPH_MODE.NORMAL) {	
		graphController.normal();
	}
	
	if (keyIsPressed && keyCode == SHIFT) {
		const target = graphController.addEdge(mouseX, mouseY);
		graphController.disableVertices(null);
		graphController.disableEdges(null);
		
		if (target != null) {
			target.toggle();
		}
	
	} else {
		const targetVertex = graphController.selectVertex(mouseX, mouseY);
		const targetEdge = (targetVertex != null) ? null : graphController.selectedEdge(mouseX, mouseY);
		graphController.disableVertices(targetVertex);
		graphController.disableEdges(targetEdge);

		if (mouseButton == LEFT) {
			if (targetVertex != null) {
				graphController.toggleVertex(targetVertex);
			} else {
				if (targetEdge == null) {
					graphController.addVertex(mouseX, mouseY);
				} else {
					graphController.toggleEdge(targetEdge);
				}
			}

	  	} else if (mouseButton == RIGHT) {
  			// legacy code for deleting vertices
	  		if (targetVertex != null) {
	  			graphController.removeVertex(targetVertex);
	  		} else {
	  			if (targetEdge != null) {
	  				graphController.removeEdge(targetEdge);
	  			}
	  		}
	  	}
	}

  	return false;
}

function mouseDragged() {
	if (graph.mode != GRAPH_MODE.NORMAL) {	
		graphController.normal();
	}

	if (mouseButton == LEFT) {
		graphController.moveVertex(mouseX, mouseY);
	}

	return false;
}