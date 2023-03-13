
class MatrixNode {

    constructor(row, col, value = null) {
        this.row = row;
        this.col = col;
        this.value = value;

        this.left = null;
        this.right = null;
        this.down = null;
        this.up = null;
    }

}


class SpareMatrix {

    constructor() {
        // Corner Root
        this.cornerRoot = new MatrixNode(-1, -1, "Corner Root");
    }


    getRowHead(row = 0) {
        let pivot = this.cornerRoot;
        let prevPivot = this.cornerRoot;
        const newRowHead = new MatrixNode(row, -1, "Row Head " + row);

        if (row == 10) {
            console.log("10")
        }

        while (pivot.down) {

            if (row > pivot.row) {
                // Move down
                prevPivot = pivot;
                pivot = pivot.down;
            } else if (row == pivot.row) {
                // Row already exists
                return pivot;
            } else {
                // Insert new row between prevPivot and pivot
                newRowHead.down = pivot;
                newRowHead.up = prevPivot;
                prevPivot.down = newRowHead;
                pivot.up = newRowHead;
                return newRowHead;
            }
        }

        // Insert new row at the end
        if (pivot.row != row) {
            newRowHead.up = pivot;
            pivot.down = newRowHead;
            return newRowHead;
        } else {
            return pivot;
        }
    }

    getColHead(col = 0) {
        let pivot = this.cornerRoot;
        let prevPivot = this.cornerRoot;
        const newColHead = new MatrixNode(-1, col, "Col Head " + col);

        while (pivot.right) {

            if (col > pivot.col) {
                // Move right
                prevPivot = pivot;
                pivot = pivot.right;
            } else if (col == pivot.col) {
                // Col already exists
                return pivot;
            } else {
                // Insert new col between prevPivot and pivot
                newColHead.right = pivot;
                newColHead.left = prevPivot;
                prevPivot.right = newColHead;
                pivot.left = newColHead;
                return newColHead;
            }
        }

        // Insert new col at the end
        if (pivot.col != col) {
            newColHead.left = pivot;
            pivot.right = newColHead;
            return newColHead;
        } else {
            return pivot;
        }
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

    insert(row = 0, col = 0, value = null) {

        const rowHeader = this.getRowHead(row);
        const colHeader = this.getColHead(col);
        const newNode = new MatrixNode(row, col, value);

        this.insertNode(rowHeader, colHeader, newNode);

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
                    content += "nodo" + (aux1.col + 1) + (aux1.row + 1) + "[label=\"" + aux1.value + "\" ,group=" + (aux1.col + 1) + "]; \n";
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

const matrix = new SpareMatrix();

matrix.insert(4, 4, "4,4");
matrix.insert(6, 6, "6,6");
matrix.insert(8, 8, "8,8");
matrix.insert(5, 5, "5,5");
matrix.insert(10, 10, "10,10");
/* row y columna existen*/
matrix.insert(10, 8, "10,8");
matrix.insert(8, 5, "8,5");
/** row si, columna no */
matrix.insert(1, 8, "1,8");
matrix.insert(3, 8, "3,8");
/** row no, columna si */
matrix.insert(4, 1, "4,1");
matrix.insert(5, 11, "5,11");
console.log(matrix.graphviz());