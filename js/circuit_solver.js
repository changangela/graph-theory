/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function CircuitSolver(graph) {
    this.graph = graph;
}

CircuitSolver.prototype.solve = function() {
    let vertices = this.graph.vertices.slice(0);
    let component = graph.components().slice(0);
    let nonZeroVertexDegreeComponents = [];
    
    while(component.length != 0) {
        let currComp = component.shift();
        if(currComp.neighbors.length > 0) {
            nonZeroVertexDegreeComponents.push(currComp);
        }
    }
    
    if(nonZeroVertexDegreeComponents.length > 1) {
        return [];
    }
    else if (nonZeroVertexDegreeComponents.length == 0) {
        return [];
    }
    
    else {
        function unvisitedEdgeVertex(circuit) {
            for(let i = 0; i< circuit.length; ++i) {
                if(circuit[i].neighbors.length > 0) {
                    return [circuit[i]];
                }
            }
            return [];
        }
        let start = nonZeroVertexDegreeComponents[0];
        let circuit = [start];
        for(let x = 0; x<vertices.length; ++x) {
            console.log(vertices[x].degrees());
            if(vertices[x].degrees() % 2 == 1) {
                return [];
            }
        }
        
        unvisited = [start];
        while(unvisited.length > 0) {
            let subStart = unvisited[0];
            let current = unvisited[0];
            let subCircuit = [];
            do {
                newCurrent = current.neighbors[0];
                subCircuit.push(newCurrent);
                newCurrent.removeNeighbor(current);
                current.removeNeighbor(newCurrent);
                current = newCurrent;
            }
            while(current != subStart);
            let w = 0;
            while(true) {
                if(circuit[w].id == subStart.id) {
                    break;
                }
                w = w+1;
            }
            circuit.splice(w+1, 0, ...subCircuit);
            unvisited = unvisitedEdgeVertex(circuit);
        }
        return circuit;
    }
}