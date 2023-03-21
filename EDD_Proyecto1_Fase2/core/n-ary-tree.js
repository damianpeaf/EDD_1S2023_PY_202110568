class NaryNode {
    constructor(value) {
        this.value = value;
        this.children = [];
        this.depth = 0;
    }
}

class NaryTree {

    constructor() {
        this.root = null;
    }

    insert(value) {
        if (this.root == null) {
            this.root = new NaryNode(value);
        } else {
            this.insertNode(this.root, value);
        }
    }

    insertNode(node, value) {
    }
}
