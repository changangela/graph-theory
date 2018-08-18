function MstPrim(graph) {
        this.graph = graph;
}

MstPrim.prototype.solve = function () {
    function initParentMap(parent) {
        for (let i = 0; i < graph.vertices.length; ++i) {
            parent.set(graph.vertices[i], null);
        }
    }

    let inMst = new Set(), parent = new Map();
    let pq = new BinaryHeap(
        function (element) {
            return element.weight;
        },
        function (element) {
            return element.vertex.id;
        },
        'weight'
    );
    
    initParentMap(parent);
    
    pq.push({weight: 0, vertex: this.graph.vertices[0]});
    
    while (pq.size() > 0) {
        let vertex = pq.pop().vertex;
        inMst.add(vertex.id);
        for (let i = 0; i < vertex.neighbors.length; ++i) {
                if (!inMst.has(vertex.neighbors[i].id)) {
                        let updateParent = pq.decreaseKeyOrPush(vertex.neighbors[i], parseInt(this.graph.getEdge(vertex, vertex.neighbors[i]).weight));
                        if (updateParent == 1) {
                                parent.set(vertex.neighbors[i], vertex);
                        }
                }
        }
    }
    
    let mst = [];
    
    for (let i = 1; i < this.graph.vertices.length; ++i) {
            mst.push(this.graph.getEdge(parent.get(this.graph.vertices[i]), this.graph.vertices[i]));
    }

    this.graph.setCircuit(new Tree(mst));
    this.graph.setColor(GRAPH_COLORS.TREE);
}