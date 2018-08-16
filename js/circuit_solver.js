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
    console.log(nonZeroVertexDegreeComponents);
}