import { FileDetail } from './index.js';

export class Directory {
    constructor(name) {
        this.name = name;
        this.children = [];
        this.filesDetails = [];
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
            const subDirCopy = '[COPIA] ' + subDir;
            return this.addDirectory(subDirCopy);
        }

        const newDirectory = new Directory(subDir);

        this.children.push(newDirectory);

        return newDirectory;
    }

    addFile(file) {
        // Validate if file already exists
        const fileDetail = this.filesDetails.find((fileDetail) => fileDetail.file.name === file.name);

        if (fileDetail) {
            file.name = '[COPIA] ' + file.name;
            return this.addFile(file);
        }

        this.filesDetails.push(new FileDetail(file));

    }

    getFiles() {
        return this.filesDetails.map((fileDetail) => fileDetail.file);
    }
}

export class DirectoryTree {

    constructor(root) {
        this.root = new Directory(root.split('/').pop());
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
            currentDirectory = currentDirectory.searchDirectory(pathParts[i]);

            if (!currentDirectory) {
                return null;
            }
        }

        return currentDirectory;
    }

    deleteDirectory(path) {

        if (path.trim() === '/') {
            this.root = new Directory(path.split('/').pop());
        }

        let parentDirectorPath = path.split('/').slice(0, -1).join('/');
        parentDirectorPath = parentDirectorPath ? parentDirectorPath : '/';

        const parentDirectory = this.getDirectory(parentDirectorPath);

        if (!parentDirectory) {
            return;
        }

        const directoryName = path.split('/').pop();

        parentDirectory.children = parentDirectory.children.filter((child) => child.name !== directoryName);

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