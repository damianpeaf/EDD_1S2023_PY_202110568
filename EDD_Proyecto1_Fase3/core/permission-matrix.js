import { File as CustomFile } from "./index.js";

class MatrixNode {

    constructor(row, col, data = null) {
        this.row = row;
        this.col = col;
        this.data = data;

        this.left = null;
        this.right = null;
        this.down = null;
        this.up = null;
    }

}


export class PermissionMatrix {

    constructor() {
        // Corner Root
        this.cornerRoot = new MatrixNode(-1, -1, new CustomFile("Documentos", "Documentos"));
    }

    searchRowHead(file) {

        let pivot = this.cornerRoot;

        while (pivot.down) {
            pivot = pivot.down; // Skip corner root
            if (pivot.data.getValue() == file.getValue()) {
                return pivot;
            }
        }

        return null;
    }

    getRowHead(file) {

        let rowHead = this.searchRowHead(file);

        if (rowHead) {
            return rowHead;
        }

        // Insert new row at the end

        let pivot = this.cornerRoot;

        while (pivot.down) {
            pivot = pivot.down;
        }

        rowHead = new MatrixNode(pivot.row + 1, -1, file);
        rowHead.up = pivot;
        pivot.down = rowHead;
        return rowHead;
    }

    searchColHead(student) {

        let pivot = this.cornerRoot;

        while (pivot.right) {
            pivot = pivot.right; // Skip corner root
            if (pivot.data.getValue() == student.getValue()) {
                return pivot;
            }
        }
        return null;
    }

    getColHead(student) {

        let newColHead = this.searchColHead(student);

        if (newColHead) {
            return newColHead;
        }

        // Insert the col in order

        let pivot = this.cornerRoot;
        let prevPivot = this.cornerRoot;

        while (pivot) {

            if (pivot.col == -1 && pivot.row == -1) {
                pivot = pivot.right;
                continue;
            }

            if (student.getValue() > pivot.data.getValue()) {
                // Move right
                prevPivot = pivot;
                pivot = pivot.right;
            } else {
                // Insert new col between prevPivot and pivot
                newColHead = new MatrixNode(-1, pivot.col, student);
                pivot.col += 1;
                newColHead.right = pivot;
                newColHead.left = prevPivot;
                prevPivot.right = newColHead;
                pivot.left = newColHead;

                // Update col of the down nodes

                let downNode = pivot.down;
                while (downNode) {
                    downNode.col += 1;
                    downNode = downNode.down;
                }

                return newColHead;
            }
        }

        // Insert new col at the end
        newColHead = new MatrixNode(-1, prevPivot.col + 1, student);
        newColHead.left = prevPivot;
        prevPivot.right = newColHead;
        return newColHead;
    }

    insertNode(rowHeader, colHeader, newNode) {

        // Move across row
        let rowAux = colHeader;
        while (true) {

            if (rowAux.row === newNode.row) {
                // Already exists
                break;
            } else if (rowAux.down != null && rowAux.down.row > newNode.row) {
                // Insert new node between rowAux and rowAux.down
                newNode.down = rowAux.down;
                newNode.up = rowAux;
                rowAux.down = newNode;
                break;
            } else if (rowAux.down == null) {
                // Insert new node at the end
                newNode.up = rowAux;
                rowAux.down = newNode;
                break;
            } else {
                // Move down
                rowAux = rowAux.down;
            }

        }

        // Move across cols
        let colAux = rowHeader;
        while (true) {

            if (colAux.col === newNode.col) {
                // Already exists
                break;
            } else if (colAux.right != null && colAux.right.col > newNode.col) {
                // Insert new node between colAux and colAux.right
                newNode.right = colAux.right;
                newNode.left = colAux;
                colAux.right = newNode;
                break;
            } else if (colAux.right == null) {
                // Insert new node at the end
                newNode.left = colAux;
                colAux.right = newNode;
                break;
            } else {
                // Move right
                colAux = colAux.right;
            }
        }
    }

    insertPermission(file, student, permission) {

        const rowHeader = this.getRowHead(file);
        const colHeader = this.getColHead(student);
        const newNode = new MatrixNode(rowHeader.row, colHeader.col, permission);

        this.insertNode(rowHeader, colHeader, newNode);

    }

    insertFile(file) {

        const files = this.getFiles();

        // Check if file already exists
        const fileExists = files.find(f => f.getValue() === file.getValue());

        if (fileExists) {
            file.name = file.name + " [COPIA]"
        };

        this.getRowHead(file);
    }

    getFiles() {
        let files = [];
        let pivot = this.cornerRoot;

        while (pivot.down) {
            pivot = pivot.down;
            files.push(pivot.data);
        }

        return files;
    }

    graphviz() {
        let content = "";
        let aux1 = this.cornerRoot;
        let aux2 = this.cornerRoot;
        let aux3 = this.cornerRoot;
        if (aux1 !== null) {
            content = "digraph Matrix { \n node[shape=box] \n rankdir=UD; \n ";

            while (aux2) {
                aux1 = aux2;
                content += "{rank=same; \n";
                while (aux1) {
                    content += "nodo" + (aux1.col + 1) + (aux1.row + 1) + "[label=\"" + aux1.data.getValue() + "\" ,group=" + (aux1.col + 1) + "]; \n";
                    aux1 = aux1.right;
                }
                content += "}";
                aux2 = aux2.down;
            }

            /** Conexiones entre los nodos de la matriz */
            aux2 = aux3;
            while (aux2) {
                aux1 = aux2;
                while (aux1.right) {
                    content += "nodo" + (aux1.col + 1) + (aux1.row + 1) + " -> " + "nodo" + (aux1.right.col + 1) + (aux1.right.row + 1) + " [dir=both];\n"
                    aux1 = aux1.right
                }
                aux2 = aux2.down;
            }
            aux2 = aux3;
            while (aux2) {
                aux1 = aux2;
                while (aux1.down) {
                    content += "nodo" + (aux1.col + 1) + (aux1.row + 1) + " -> " + "nodo" + (aux1.down.col + 1) + (aux1.down.row + 1) + " [dir=both];\n"
                    aux1 = aux1.down
                }
                aux2 = aux2.right;
            }
            content += "}";
        } else {
            content = "No hay elementos en la matriz"
        }
        return content;

    }
}