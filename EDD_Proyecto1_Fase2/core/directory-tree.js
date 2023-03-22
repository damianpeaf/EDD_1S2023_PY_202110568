export class Directory {
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
        return this.name == '' ? 'root' : this.name.replace(/ /g, '_');
    }

    graphvizNodeLabel() {
        return this.name == '' ? '/' : this.name;
    }

    addDirectory(subDir) {
        const directory = this.searchDirectory(subDir);

        if (directory) {
            const subDirCopy = "Copia " + subDir;
            return this.addDirectory(subDirCopy);
        }

        const newDirectory = new Directory(subDir);

        this.children.push(newDirectory);

        return newDirectory;
    }

    addFile(file) {
        // TODO: Check if file already exists
        this.files.push(file);
    }
}

export class DirectoryTree {

    constructor(root) {
        // TODO: 
        this.root = new Directory(root.split('/').pop());
    }

    getDirectory(path) {
        let pathParts = path.split('/');

        let currentDirectory = null;

        if (pathParts[0] === this.root.name) {
            currentDirectory = this.root;
            pathParts = pathParts.slice(1); // Remove root
        }

        if (!currentDirectory) {
            return null;
        }

        for (let i = 1; i < pathParts.length; i++) {
            currentDirectory = currentDirectory.searchDirectory(pathParts[i]);

            if (!currentDirectory) {
                return null;
            }
        }

        return currentDirectory;
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