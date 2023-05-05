import { Directory } from "./index.js";

export class DirectoryAdjacencyNode extends Directory {

}

export class DirectoryGraph {

    constructor() {

        this.root = new DirectoryAdjacencyNode('/'.split('/').pop());
        this.adjacencyMatrix = {};
    }

    addVertex(adjNode) {
        this.adjacencyMatrix[adjNode.name] = [];
    }

    addEdge(adjNode1, adjNode2) {

        if (!this.adjacencyMatrix[adjNode1.name] || !this.adjacencyMatrix[adjNode2.name]) {
            return;
        }

        this.adjacencyMatrix[adjNode1.name].push(adjNode2);
        // this.adjacencyMatrix[adjNode2.name].push(adjNode1);

    }

    getDirectory(path = '/') {

        if (path.trim() === '/') {
            return this.root;
        }

        let pathParts = path.split('/');

        let currentDirectory = null;

        if (pathParts[0] === this.root.name) {
            currentDirectory = this.root;
            pathParts = pathParts.slice(1); // Remove root
        }

        if (!currentDirectory) {
            return null;
        }

        for (let i = 0; i < pathParts.length; i++) {
            currentDirectory = this.adjacencyMatrix[currentDirectory.name].find((adjNode) => adjNode.name === pathParts[i]);

            if (!currentDirectory) {
                return null;
            }
        }

        return currentDirectory;

    }

    graphviz() {

        return `
        graph G {

            layout=neato;
            overlap = false;

            ${this.graphvizTraverse(this.root, 1)}
        }
        `

    }

    graphvizTraverse(adjNode, level) {

        const children = this.adjacencyMatrix[adjNode.name];
        const nextLevel = level + 1;

        if (!children) {
            return '';
        }

        // Node declaration
        let graph = `${adjNode.graphvizNodeName()} [label="${adjNode.graphvizNodeLabel()}" ${adjNode == this.root ? ', shape=box' : ''}];\n`

        children.forEach((child) => {
            graph += this.graphvizTraverse(child, nextLevel) + '\n';
            graph += `${adjNode.graphvizNodeName()} -- ${child.graphvizNodeName()} [label=${level}];\n`;
        });

        return graph;
    }

}