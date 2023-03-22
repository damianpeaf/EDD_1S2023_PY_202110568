class Directory {
    constructor(name) {
        this.name = name;
        this.children = [];
        this.files = [];

        // TODO: Spare matrix for file permissions
    }

    searchDirectory(subDir) {
        return this.children.find((child) => child.name === subDir);
    }

    graphvizNodeName() {
        return this.name == '' ? 'root' : this.name;
    }

    graphvizNodeLabel() {
        return this.name == '' ? '/' : this.name;
    }
}

class DirectoryTree {

    constructor(root) {
        this.root = new Directory(root.split('/').pop());
    }

    addDirectory(path) {
        let pathArray = path.split('/');

        let current = null;
        if (pathArray[0] === this.root.name) {
            current = this.root;
            pathArray = pathArray.slice(1); // Remove root
        }

        if (!current) {
            return null;
        }

        pathArray.forEach((subDir) => {

            const child = current.searchDirectory(subDir);

            if (child) {
                current = child;
            } else {
                const newChild = new Directory(subDir);
                current.children.push(newChild);
                current = newChild;
            }

        });

    }



    addFile(path, fileName) {
        const directory = this.searchDirectory(path);

        if (directory) {
            directory.files.push(fileName);
        }

        return directory;
    }


    graphviz() {

        let graph = 'digraph G {\n';

        graph += 'node [shape=record];\n';

        graph += this.graphvizHelper(this.root);

        graph += '}';

        return graph;
    }

    graphvizHelper(node) {
        let graph = '';

        // Node Name
        graph += `${node.graphvizNodeName()} [label="${node.graphvizNodeLabel()}"];\n`;

        // Children
        node.children.forEach((child) => {
            graph += `${node.graphvizNodeName()} -> ${child.graphvizNodeName()};\n`;
            graph += this.graphvizHelper(child);
        });

        return graph;
    }

}

const tree = new DirectoryTree('/');

tree.addDirectory('/home');
tree.addDirectory('/home/usuario');
tree.addDirectory('/docs');
console.log(tree.graphviz());