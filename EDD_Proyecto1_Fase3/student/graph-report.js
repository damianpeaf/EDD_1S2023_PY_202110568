import { DirectoryGraph } from '../core/index.js'
import { getDirectoryTree, getSession } from '../utils/index.js';

const graph = new DirectoryGraph();

// Create from directory tree
const session = getSession()
const directoryTree = getDirectoryTree(session.user.id);

const traverse = (directory) => {

    if (!directory) return

    // Add vertex
    graph.addVertex(directory);

    // Add edges
    directory.children.forEach((child) => {
        traverse(child);
        graph.addEdge(directory, child);
    });
}

traverse(directoryTree.root);

console.log(graph.graphviz())