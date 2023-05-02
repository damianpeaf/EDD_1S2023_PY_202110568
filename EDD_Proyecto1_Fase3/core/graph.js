

class AdjacencyNode {
    constructor(id, value) {
        this.id = value
        this.value = value
        this.next = []
    }
}

export class Graph {

    constructor() {
        this.main = new AdjacencyNode(this.nodeCount, '/')
        this.nodeCount++
    }

    addNode(parent, children) {
        const newNode = new AdjacencyNode(this.nodeCount, parent)
        const nexts = childre.map(child => {
            const childNode = new AdjacencyNode(this.nodeCount, child)
            this.nodeCount++
            return childNode
        })

        newNode.next = nexts

    }
}