

class AVLNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 1;
    }


    getValue() {
        return this.data.getValue();
    }

    getGraphvizLabel() {
        return this.data.getGraphvizLabel() + "\\n" + "Altura: " + this.height;
    }

    getGraphvizNode() {
        return "N" + this.getValue();
    }
}

export class AVLTree {

    constructor() {
        this.root = null;
    }


    getHeight(node) {
        return node == null ? 0 : node.height;
    }

    computeHeight(node) {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    rightRotation(node) {

        let aux = node.left; // R -> l subtree
        let aux2 = aux.right; // R -> l -> r subtree

        aux.right = node; // R as right child of R -> l
        node.left = aux2; // R -> l -> r as left child of R

        this.computeHeight(node);
        this.computeHeight(aux);
        return aux;
    }


    leftRotation(node) {

        let aux = node.right; // R -> r subtree
        let aux2 = aux.left; // R -> r -> l subtree

        aux.left = node; // R as left child of R -> r
        node.right = aux2; // R -> r -> l as right child of R

        this.computeHeight(node);
        this.computeHeight(aux);
        return aux;
    }


    getBalanceFactor(node) {
        return node == null ? 0 : this.getHeight(node.left) - this.getHeight(node.right);
    }

    insertNode(node, data) {

        if (node == null) {
            return new AVLNode(data);
        }

        if (data.getValue() < node.getValue()) {
            node.left = this.insertNode(node.left, data);
        } else if (data.getValue() > node.getValue()) {
            node.right = this.insertNode(node.right, data);
        } else {
            return node;
        }

        this.computeHeight(node);
        const balanceFactor = this.getBalanceFactor(node);

        if (balanceFactor > 1) {
            if (data.getValue() < node.left.getValue()) {
                return this.rightRotation(node);
            } else if (data.getValue() > node.left.getValue()) {
                node.left = this.leftRotation(node.left);
                return this.rightRotation(node);
            }
        }

        if (balanceFactor < -1) {
            if (data.getValue() > node.right.getValue()) {
                return this.leftRotation(node);
            } else if (data.getValue() < node.right.getValue()) {
                node.right = this.rightRotation(node.right);
                return this.leftRotation(node);
            }
        }

        return node;
    }

    insert(data) {
        this.root = this.insertNode(this.root, data);
    }

    graphviz() {
        let graph = "digraph G { ";
        graph += "node[shape=record]; ";
        graph += this.graphvizNode(this.root);
        graph += " }";
        return graph;
    }

    inorder() {
        const data = [];

        const traverse = (node) => {
            if (node == null) {
                return;
            }

            traverse(node.left);
            data.push(node.data);
            traverse(node.right);
        }

        traverse(this.root);
        return data;
    }

    postorder() {
        const data = [];

        const traverse = (node) => {
            if (node == null) {
                return;
            }

            traverse(node.left);
            traverse(node.right);
            data.push(node.data);
        }

        traverse(this.root);
        return data;
    }

    preorder() {
        const data = [];

        const traverse = (node) => {
            if (node == null) {
                return;
            }

            data.push(node.data);
            traverse(node.left);
            traverse(node.right);
        }

        traverse(this.root);
        return data;
    }

    graphvizNode(node) {

        if (node == null) {
            return "";
        }

        let graph = "";

        // Declare node

        graph += node.getGraphvizNode() + " [label=\"{" + node.getGraphvizLabel() + "}\"];";

        // Declare edges

        if (node.left != null) {
            graph += node.getGraphvizNode() + " -> " + node.left.getGraphvizNode() + ";";
        }

        if (node.right != null) {
            graph += node.getGraphvizNode() + " -> " + node.right.getGraphvizNode() + ";";
        }

        graph += this.graphvizNode(node.left);
        graph += this.graphvizNode(node.right);

        return graph;
    }

}