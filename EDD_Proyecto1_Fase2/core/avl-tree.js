

class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {

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

    insertNode(node, value) {

        if (node == null) {
            return new AVLNode(value);
        }

        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        } else {
            return node;
        }

        this.computeHeight(node);
        const balanceFactor = this.getBalanceFactor(node);

        if (balanceFactor > 1) {
            if (value < node.left.value) {
                return this.rightRotation(node);
            } else if (value > node.left.value) {
                node.left = this.leftRotation(node.left);
                return this.rightRotation(node);
            }
        }

        if (balanceFactor < -1) {
            if (value > node.right.value) {
                return this.leftRotation(node);
            } else if (value < node.right.value) {
                node.right = this.rightRotation(node.right);
                return this.leftRotation(node);
            }
        }

        return node;
    }

    insert(value) {
        this.root = this.insertNode(this.root, value);
    }

    graphviz() {
        let graph = "digraph G {\n";
        graph += "node [shape=record]\n";
        graph += this.graphvizNode(this.root);
        graph += "}";
        return graph;
    }

    graphvizNode(node) {

        if (node == null) {
            return "";
        }

        let graph = "";

        if (node.left != null) {
            graph += node.value + " -> " + node.left.value + "\n";
        }

        if (node.right != null) {
            graph += node.value + " -> " + node.right.value + "\n";
        }

        graph += this.graphvizNode(node.left);
        graph += this.graphvizNode(node.right);

        return graph;
    }

}


const tree = new AVLTree();

tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
tree.insert(6);
tree.insert(7);

console.log(tree.graphviz());
