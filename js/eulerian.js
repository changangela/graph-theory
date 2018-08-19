/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 function Eulerian(graph) {
    this.graph = graph;
}

Eulerian.prototype.solve = function () {
    const neighbors = this.graph.clone(), components = this.graph.components();
    let nonZeroVertexDegreeComponents = [];

    function unvisitedEdgeVertex(circuit) {
        for (let i = 0; i < circuit.length; ++i) {
            if (neighbors[circuit[i]].length > 0) {
                return [circuit[i]];
            }
        }
        return [];
    }

    function evenDegrees(graph) {
        for (let i = 0; i < graph.vertices.length; ++i) {
            if (graph.vertices[i].degrees() % 2 == 1) {
                return false;
            }
        }
        return true;
    }

    function removeEdge(u, v) {
        function removeNeighbor(x, y) {
            for (let i = neighbors[x].length - 1; i >= 0; --i) {
                if (neighbors[x][i] == y) {
                    neighbors[x].splice(i, 1);
                }
            }
        }
        removeNeighbor(u, v);
        removeNeighbor(v, u);
    }

    function findOddVertices(graph) {
        for (let i = 0; i < graph.vertices.length; ++i) {
            if (graph.vertices[i].neighbors.length % 2 == 1) {
                graph.vertices[i].color = GRAPH_COLORS.RED;
            }
        }
    }

    for (let i = 0; i < components.length; ++i) {
        if (components[i].neighbors.length > 0) {
            nonZeroVertexDegreeComponents.push(this.graph.idToIndex(components[i].id));
        }
    }

    if (nonZeroVertexDegreeComponents.length > 1 || !evenDegrees(this.graph)) {
        this.graph.setColor(GRAPH_COLORS.INVALID);
        findOddVertices(this.graph);
    } else {

        if (nonZeroVertexDegreeComponents.length == 0) {
            return;
        }

        const start = nonZeroVertexDegreeComponents[0];
        let circuit = [start], unvisited = [start];

        while (unvisited.length > 0) {
            let subStart = unvisited[0], current = unvisited[0], subCircuit = [];

            do {
                let newCurrent = neighbors[current][0];
                subCircuit.push(newCurrent);
                removeEdge(newCurrent, current);
                current = newCurrent;
            } while (current != subStart);

            let w = 0;

            while (circuit[w] != subStart) {
                w = w + 1;
            }

            circuit.splice(w + 1, 0, ...subCircuit);

            unvisited = unvisitedEdgeVertex(circuit);
        }

        const verticesOfCircuit = circuit.map(x => this.graph.vertices[x]);
        let edgesOfCircuit = [];

        for (let i = 0; i < verticesOfCircuit.length - 1; ++i) {
            edgesOfCircuit.push(this.graph.getEdge(verticesOfCircuit[i], verticesOfCircuit[i + 1]));
        }

        this.graph.setColor(GRAPH_COLORS.CYCLE);
        this.graph.setCircuit(new Circuit(edgesOfCircuit));
    }
}