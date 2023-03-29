# **EDD Go Drive**
### Universidad de San Carlos de Guatemala
### Facultad de Ingeniería
### Escuela de Ciencias y Sistemas
### Estructuras de Datos
### Sección C
<br></br>

## **Manual Técnico**
<br></br>

| Nombre | Carnet | 
| --- | --- |
| Damián Ignacio Peña Afre | 202110568 |
----

# **Descripción General**

La Facultad de Ingeniería de la Universidad de San Carlos de Guatemala requiere un sistema para almacenar archivos importantes que se ajuste a sus necesidades. Ante la falta de opciones adecuadas, se ha planteado la creación de un sistema propio llamado EDD GoDrive. La aplicación debe tener la capacidad de ser utilizada en cualquier sistema operativo, y se está considerando la opción de crearla como un sitio web utilizando Github Pages.

El objetivo del proyecto es crear un sistema similar a Google Drive, pero con la particularidad de que la Universidad de San Carlos de Guatemala será el propietario del mismo. La aplicación debe contar con características específicas que permitan el almacenamiento, creación y eliminación de carpetas y archivos, así como la modificación de nombres de archivos y carpetas ya creados. Además, se debe llevar un control de usuarios, donde cada curso de la carrera de ingeniería en sistemas tendrá un espacio de almacenamiento propio.

Como estudiante de ingeniería en sistemas, se le encomienda la tarea de desarrollar esta aplicación para la Facultad de Ingeniería. La aplicación debe ser responsiva y amigable para el usuario, de manera que sea fácil de usar y accesible desde cualquier dispositivo. En la siguiente sección, se proporcionarán detalles adicionales sobre los requisitos y funcionalidades esperados del sistema EDD GoDrive.

# **Descripción de la solución**

Para el desarrollo de esta aplicación se optó por el uso de tecnologías web. Particularmente la utilización de javascript como lenguaje principal. Para el diseño se utilizó un framework de css llamado bootstrap.

Para el almacenamiento de las estructuras se utilizó el almacenamiento local del navegador para almacenar los distintos objetos serializados en formato JSON.


# **Modulos**


## **Core**

Dentro de este módulo se encuentran las estructuras de datos fundamentales para el funcionamiento de la aplicación. Estas estructuras son:

 - Árbol AVL para almacenar a los estudiantes.
 - Árbol n-ario para el sistema de carpetas.
 - Matriz dispersa para la descripción de permisos de los archivos.
 - Lista doblemente enlazada para el manejo de los logs de la bitácora.

Se explicará cada una de las estructuras de datos utilizadas:

`Arbol AVL`

El código es una implementación de un árbol AVL, una estructura de datos en árbol binario de búsqueda auto-equilibrado. La clase AVLNode representa un nodo en el árbol AVL, que contiene una referencia a un objeto data, un nodo hijo izquierdo y un nodo hijo derecho, y un valor de altura. La clase AVLTree es la implementación del árbol AVL, que contiene una referencia a la raíz del árbol y varios métodos para manipular el árbol, como la inserción de nodos, la rotación de nodos y la obtención de datos en diferentes órdenes.

El método insert inserta un nuevo nodo en el árbol AVL y garantiza que el árbol sigue siendo auto-equilibrado después de la inserción. La rotación de nodos se realiza en caso de que el factor de equilibrio del nodo sea mayor que 1 o menor que -1. El método getHeight devuelve la altura de un nodo, el método computeHeight actualiza la altura de un nodo, el método getBalanceFactor devuelve el factor de equilibrio de un nodo y el método graphviz devuelve una representación en formato DOT del árbol AVL que se puede usar para visualizar el árbol.

Los métodos inorder, postorder y preorder devuelven los nodos del árbol AVL en los tres órdenes posibles: orden ascendente (inorder), postorden y preorden. El método graphvizNode se utiliza para generar la representación DOT del árbol AVL en formato de cadena.

```javascript



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

```	


`Arbol N-ario`

El árbol se representa mediante una clase DirectoryTree, que contiene nodos de la clase Directory. Cada nodo de Directory tiene un nombre, una lista de hijos (directorios y archivos) y una lista de detalles de archivos. La clase Directory también tiene varios métodos, como searchDirectory para buscar un directorio en su lista de hijos, addDirectory para agregar un nuevo directorio como hijo, addFile para agregar un archivo a la lista de detalles de archivos y getFiles para obtener una lista de los archivos dentro del directorio.

La clase DirectoryTree tiene varios métodos para trabajar con el árbol, como getDirectory para buscar un directorio específico en el árbol a partir de su ruta, deleteDirectory para eliminar un directorio y graphviz para generar una representación visual del árbol utilizando el lenguaje de descripción de gráficos Graphviz. También hay dos métodos en la clase Directory para generar los nombres y etiquetas de nodos que se utilizan en el método graphviz de DirectoryTree.

En resumen, este código describe una estructura de árbol de directorios en JavaScript con métodos para agregar y eliminar nodos, buscar nodos por ruta y generar una representación visual del árbol.

```javascript

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

```	

`Matriz dispersa`

Este es un código que implementa una matriz dispersa, la cual es una estructura de datos que permite almacenar una gran cantidad de datos con muchos valores nulos de manera eficiente. Esta implementación se usa para almacenar permisos de acceso a archivos de una forma eficiente.

La clase MatrixNode representa un nodo de la matriz, y almacena su fila, columna y un dato. Además, tiene cuatro punteros a otros nodos: left, right, up y down, que se usan para recorrer la matriz.

La clase PermissionMatrix es la matriz dispersa en sí. En el constructor, se crea un nodo especial que sirve como la esquina superior izquierda de la matriz.

La función searchRowHead busca el encabezado de fila correspondiente a un archivo dado. Se recorre la matriz por la columna correspondiente a los encabezados de fila hasta encontrar el archivo deseado, y se devuelve el nodo correspondiente. Si no se encuentra el archivo, se devuelve null.

La función getRowHead obtiene el encabezado de fila correspondiente a un archivo dado. Si este encabezado ya existe, se devuelve el nodo correspondiente. De lo contrario, se inserta un nuevo nodo al final de la columna de encabezados de fila, y se devuelve el nodo correspondiente.

La función searchColHead busca el encabezado de columna correspondiente a un estudiante dado. Se recorre la matriz por la fila correspondiente a los encabezados de columna hasta encontrar el estudiante deseado, y se devuelve el nodo correspondiente. Si no se encuentra el estudiante, se devuelve null.

La función getColHead obtiene el encabezado de columna correspondiente a un estudiante dado. Si este encabezado ya existe, se devuelve el nodo correspondiente. De lo contrario, se inserta un nuevo nodo en orden en la fila de encabezados de columna, y se devuelve el nodo correspondiente.

La función insertNode inserta un nuevo nodo en la matriz. Dado el encabezado de fila y columna correspondientes, se mueve por la fila hasta encontrar la posición correcta, y se mueve por la columna hasta encontrar la posición correcta. Luego, se inserta el nuevo nodo en la posición correcta.

La función insertPermission inserta un nuevo permiso de acceso en la matriz. Se obtienen los encabezados de fila y columna correspondientes al archivo y al estudiante, respectivamente. Luego, se crea un nuevo nodo con la fila y columna correspondientes, y se inserta en la matriz usando la función insertNode.

La función insertFile inserta un nuevo archivo en la matriz. Si el archivo ya existe, se le añade el texto "[COPIA]" al nombre. Luego, se obtiene el encabezado de fila correspondiente al archivo usando la función getRowHead.

La función getFiles devuelve una lista con todos los archivos en la matriz.

La función graphviz devuelve un string que representa la matriz en formato Graphviz, que es un lenguaje de descripción de gráficos. Esta representación se puede usar para visualizar la matriz de manera gráfica.


```javascript	
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

```

`Lista circular simplmente enlazada`

Este código describe una lista circular simplemente enlazada llamada "Binnacle". La clase "Node" representa cada nodo de la lista y tiene tres atributos: "data", que almacena los datos del nodo; "next", que apunta al siguiente nodo de la lista; y "date", que almacena la fecha en que se creó el nodo.

La clase "Binnacle" tiene tres atributos: "head", que apunta al primer nodo de la lista; "tail", que apunta al último nodo de la lista; y "size", que almacena el número de nodos en la lista.

El método "add" agrega un nuevo nodo al principio de la lista. Si la lista está vacía, el nuevo nodo se convierte tanto en la cabeza como en la cola de la lista y su propiedad "next" apunta a sí mismo. Si la lista no está vacía, el nuevo nodo se convierte en la cabeza de la lista y su propiedad "next" apunta a la cabeza anterior. La propiedad "next" de la cola de la lista también se actualiza para que apunte a la cabeza de la lista.

El método "graphviz" devuelve una representación en formato DOT de la lista circular para poder visualizarla. Se utiliza un bucle para recorrer la lista y construir la cadena de la representación. Cada nodo se representa como un nodo en el gráfico DOT con su etiqueta que incluye la acción que almacena el nodo y la fecha en que se creó. Luego se utiliza la propiedad "next" de cada nodo para crear las conexiones entre los nodos. Finalmente, se establece que todos los nodos tienen el mismo rango para que se muestren en una línea horizontal.

```javascript


// Circular simlpy linked list

class Node {

    constructor(data = null, date = undefined) {
        this.data = data;
        this.next = null;
        this.date = date ? date : new Date();
    }

    getGraphizLabel() {
        return `Acción: ${this.data} \\n Fecha: ${this.date.getDay()}/${this.date.getMonth()}/${this.date.getFullYear()}  \\n Hora: ${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`
    }

}

export class Binnacle {

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Add node to the start of the list
    add(data, date = undefined) {

        const node = new Node(data, date);

        if (this.head === null) {
            this.head = node;
            this.tail = node;
            this.tail.next = this.head;
        } else {
            node.next = this.head;
            this.head = node;
            this.tail.next = this.head;
        }

        this.size++;
    }

    graphviz() {
        let graph = "digraph G {";
        graph += "node [shape=record];\n";
        graph += "rankdir=LR;\n";
        let current = this.head;
        let i = 0;

        while (i < this.size) {
            graph += `node${i} [label="${current.getGraphizLabel()}"];\n`;
            graph += `node${i} -> node${i + 1 >= this.size ? 0 + ' [constraint=false]' : i + 1} ;\n`;
            current = current.next;
            i++;
        }

        graph += "rank = same;";

        graph += "}";
        return graph;
    }
}

```