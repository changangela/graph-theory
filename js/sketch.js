const CANVAS_X = 750;
const CANVAS_Y = 500;
const FRAME_RATE = 10;
const BACKGROUND_COLOR = 240;

var vertices = []

function setup() {
    createCanvas(CANVAS_X, CANVAS_Y);
    ellipseMode(RADIUS);
}

function draw() {
    background(BACKGROUND_COLOR);
	for (var i = 0; i < vertices.length; i++) {
		// might not want to draw vertices in here
		const vertex = vertices[i];
		fill(vertex.color);
		ellipse(vertex.x, vertex.y, vertex.radius, vertex.radius);
	}
}

function keyPressed() {
}

function mousePressed() {
	var target = null;
	var minDistance = CANVAS_X * CANVAS_Y;

	for (var i = 0; i < vertices.length; i++) {
		const vertex = vertices[i], distance = dist(mouseX, mouseY, vertex.x, vertex.y);
		if (distance < vertex.radius && distance < minDistance) {
			minDistance = distance;
			target = i;
		}
		vertex.disable();
	}

	if (mouseButton == LEFT) {
		if (target != null) {
			vertices[target].toggle();
		} else {
			vertices.push(new Vertex(mouseX, mouseY));	
		}

  	} else if (mouseButton == RIGHT) {
  		if (target != null) {
  			vertices.splice(target, 1);
  		}
  	}

  	return false;
}

function mouseDragged() {
	if (mouseButton == LEFT) {
		for (var i = 0; i < vertices.length; i++) {
			var vertex = vertices[i];
			if (vertex.active) {
				vertex.x = mouseX;
				vertex.y = mouseY;
				break;
			}
		}
	}
}