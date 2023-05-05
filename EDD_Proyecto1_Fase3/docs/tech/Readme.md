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

Para la Vista Principal, se propone el uso de una matriz de adyacencia para almacenar la información de las carpetas del sistema y poder construir el árbol de recubrimiento, lo que permite visualizar las relaciones entre directorios y facilitar la navegación entre ellos. La matriz de adyacencia es una estructura de datos que se utiliza para representar grafos, donde las filas y columnas representan los nodos del grafo y las entradas de la matriz indican si hay una conexión (una arista) entre los nodos correspondientes.

Además, se menciona el uso de una barra de búsqueda para que el usuario pueda acceder a las carpetas del sistema, donde el usuario ingresará la ruta de la carpeta que desea acceder y se validará que la ruta exista. Si la carpeta no existe, se mostrará una alerta que indique que el directorio no es válido.

En cuanto al apartado de Compartidos Conmigo, se menciona el uso de diferentes elementos HTML para mostrar el contenido de los archivos compartidos, como el uso de un Iframe para los archivos PDF, la etiqueta img para las imágenes y un textarea para los archivos de texto.

Para el Sistema de Mensajería, se propone el uso del sistema de BlockChain para garantizar la seguridad e integridad de los mensajes. La estructura del bloque de la cadena de bloques consta de varios atributos como el índice (Index), que representa el número del bloque; el sello de tiempo (Timestamp), que indica la fecha y hora exacta de creación del bloque; el emisor (Transmitter) y el receptor (Receiver) del mensaje; el mensaje en sí (Message), que se cifrará mediante AES; y el hash anterior (PreviousHash) y el hash del bloque actual (Hash), que se cifrarán utilizando SHA256. La cadena de bloques también se representa como una lista doblemente enlazada de nodos, lo que permite validar la integridad de la cadena de bloques y proteger la información del mensaje.


# **Modulos**


## **Core**

Para esta fase, se han intercambiado las estructuras de datos. Se detallan estos cambios a continuación:

- Tabla Hash: Se utilizá la carga que previamente recaia sobre el arbol AVL para almacenar elementos en una tabla hash. Cabe mencionar que esta tabla hash como nueva funcionalidad guarda las contraseñas encriptadas de los usuarios.

- Grafo no dirigido: Por medio de un grafo no dirigido se trasladan los elementos del arbol n-ario para simular todo el sistema de archivos.

- Blockchain: Se implementa un sistema de blockchain para el manejo de mensajería, pudiendo los usuarios enviar mensajes a otros usuarios.


### **Tabla Hash**

`hash-table.js`

Como se mencionó anteriormente esta estructra de tabla hash es la encargada de almacenar a los usuarios. Es una tabla hash que utiliza la técnica de sondaje cuadrático para resolver colisiones. La tabla se implementa mediante dos clases: la clase `HashNode` que representa un nodo de la tabla y la clase HashTable que representa la propia tabla.

La clase `HashNode` tiene tres atributos: `id`, `name` y `password`, que representan la información que se almacena en la tabla para cada elemento. El constructor de esta clase se encarga de inicializar estos atributos.

La clase `HashTable` tiene cuatro atributos: capacity, table, utilization y elements. El atributo capacity indica la capacidad actual de la tabla, es decir, el número de elementos que puede almacenar. El atributo table es un arreglo que almacena los nodos de la tabla. El atributo utilization indica la cantidad de elementos que actualmente hay en la tabla. El atributo elements es un arreglo que almacena todos los elementos de la tabla.

El constructor de la clase `HashTable` inicializa la capacidad de la tabla en 7, crea un nuevo arreglo de tamaño capacity para almacenar los nodos y establece la utilización en cero.

El método `insert` se encarga de insertar un nuevo elemento en la tabla. Este método recibe tres parámetros: id, name y password, que representan la información del nuevo elemento. El método primero calcula el índice donde se almacenará el elemento utilizando la función de hash hashFunction. Si el índice está dentro de los límites de la tabla y el nodo en ese índice es nulo, entonces el nuevo nodo se inserta en ese índice. Si el nodo en ese índice no es nulo, entonces se produce una colisión y el método utiliza la técnica de sondaje cuadrático para buscar un nuevo índice para el nuevo nodo. Una vez encontrado un índice disponible, se inserta el nuevo nodo en la tabla y se actualiza la utilización y la capacidad de la tabla.

El método `hashFunction` calcula un valor de hash para un determinado id utilizando el método de suma de caracteres de la cadena de texto que representa el id. Este valor se reduce utilizando el operador módulo para obtener un índice dentro de los límites de la tabla.

El método `computeCapacity` comprueba si la tabla está sobrecargada, es decir, si la utilización supera el 75% de la capacidad actual. Si este es el caso, el método llama a computeNewCapacity para calcular una nueva capacidad para la tabla y luego llama a reHash para redimensionar la tabla y volver a insertar todos los elementos en la tabla.

El método `computeNewCapacity` calcula la próxima capacidad de la tabla como el siguiente número primo después de la capacidad actual.

El método `reHash` crea una nueva tabla con la nueva capacidad y vuelve a insertar todos los elementos de la tabla anterior en la nueva tabla.

El método `reComputeIndex` calcula un nuevo índice utilizando la técnica de sondaje cuadrático para resolver colisiones.

El método `newIndexEval` comprueba si el nuevo índice calculado está dentro de los límites de la tabla y, si no es así, lo ajusta a un índice dentro de los límites de la tabla.

El método `search` busca un elemento en la tabla utilizando su id. El método calcula el índice donde se espera que esté el elemento utilizando la función de hash y luego busca el elemento en ese índice. Si el elemento no está en ese índice, el método utiliza la técnica de sondaje cuadrático para buscar el elemento en otros índices. Si el elemento no se encuentra en la tabla, el método devuelve null.


```javascript

class HashNode {
    constructor(id, name, password) {
        this.id = id
        this.name = name
        this.password = password
    }
}

export class HashTable {
    constructor() {
        this.capacity = 7
        this.table = new Array(this.capacity)
        this.utilization = 0
    }

    insert(id, name, password) {

        let index = this.hashFunction(id)

        const newNode = new HashNode(id, name, password)

        if (index < this.capacity) {
            try {
                if (this.table[index] == null) {
                    this.table[index] = newNode
                    this.utilization++
                    this.computeCapacity()
                } else {
                    // Handle collision
                    let attempt = 1
                    while (this.table[index] != null) {
                        index = this.reComputeIndex(id, attempt)
                        attempt++
                    }
                    this.table[index] = newNode
                    this.utilization++
                    this.computeCapacity()
                }
            } catch (err) {
                console.log("Hubo un error en insercion")
            }
        }
    }

    hashFunction(id) {
        let idString = id.toString()
        let divisor = 0
        for (let i = 0; i < idString.length; i++) {
            divisor = divisor + idString.charCodeAt(i)
        }
        return divisor % this.capacity
    }

    computeCapacity() {
        let maxUtilization = this.capacity * 0.75
        if (this.utilization > maxUtilization) {
            this.capacity = this.computeNewCapacity()
            this.reHash()
        }
    }

    computeNewCapacity() {
        // Go to the next prime number
        let numero = this.capacity + 1;
        while (!this.isPrime(numero)) {
            numero++;
        }
        return numero;
    }

    reHash() {
        this.utilization = 0
        const auxTable = this.table
        this.table = new Array(this.capacity)
        auxTable.forEach((student) => {
            this.insert(student.id, student.name, student.password)
        })
    }

    reComputeIndex(id, attempt) {
        // cuadratic probing
        let newIndex = this.hashFunction(id) + attempt * attempt
        return this.newIndexEval(newIndex)
    }

    newIndexEval(newIndex) {
        if (newIndex < this.capacity) {
            return newIndex
        }
        return this.newIndexEval(newIndex - this.capacity) // out of bounds
    }

    search(id) {
        let index = this.hashFunction(id)
        if (index < this.capacity) {
            try {
                if (this.table[index] == null) {
                    // Not found
                    return null
                } else if (this.table[index] != null && this.table[index].id == id) {
                    // Found
                    return this.table[index]
                } else {
                    let attempt = 1
                    while (this.table[index] != null) {
                        index = this.reComputeIndex(id, attempt)
                        attempt++
                        if (this.table[index].id == id) {
                            return this.table[index]
                        }
                    }
                }
            } catch (err) {
                return null
            }
        }
        return null
    }

    isPrime(num) {
        if (num <= 1) { return false }
        if (num === 2) { return true }
        if (num % 2 === 0) { return false }
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) { return false };
        }
        return true;
    }

    elements() {
        let elements = []
        this.table.forEach((student) => {
            if (student != null) {
                elements.push(student)
            }
        })
        return elements
    }
}

```


### **Grafo no dirigido**

La clase `DirectoryGraph`, que representa un grafo de directorios, donde cada nodo del grafo es un directorio y cada borde del grafo representa una relación entre directorios (por ejemplo, que un directorio contiene a otro directorio). LA continuación se detalla el código:


```javascript	

import { Directory } from "./index.js";

export class DirectoryGraph {

    constructor() {
        this.root = new Directory('/'.split('/').pop());
        this.adjacencyMatrix = {};
    }

```

El constructor de la clase DirectoryGraph inicializa dos variables de instancia: this.root y this.adjacencyMatrix. this.root es un objeto de la clase Directory que representa la raíz del grafo, que se crea a partir de una cadena que contiene solo una barra ("/"). this.adjacencyMatrix es un objeto que se utiliza para almacenar los bordes del grafo. Este objeto es una matriz de adyacencia, donde las claves son los nombres de los nodos y los valores son los nodos adyacentes.

```javascript

    addVertex(adjNode) {
        if (adjNode.name.trim() == '') {
            this.root = adjNode;
        }
        this.adjacencyMatrix[adjNode.name] = [];
    }


``` 
El método addVertex(adjNode) se utiliza para agregar un nuevo nodo al grafo. Este método recibe como parámetro un objeto adjNode de la clase Directory. Si el nombre del directorio es una cadena vacía, el nodo se considera la raíz del grafo y se asigna a this.root. De lo contrario, se agrega un nuevo elemento a this.adjacencyMatrix con la clave adjNode.name y un valor de matriz vacía.

```javascript
    addEdge(adjNode1, adjNode2) {
        if (!this.adjacencyMatrix[adjNode1.name] || !this.adjacencyMatrix[adjNode2.name]) {
            return;
        }
        this.adjacencyMatrix[adjNode1.name].push(adjNode2);
    }

```


El método addEdge(adjNode1, adjNode2) se utiliza para agregar un borde entre dos nodos del grafo. Este método recibe como parámetros dos objetos adjNode1 y adjNode2 de la clase Directory. Si no se encuentra uno de los nodos en this.adjacencyMatrix, se devuelve inmediatamente. De lo contrario, se agrega un nuevo elemento a la matriz de adyacencia para adjNode1 con el valor adjNode2.

```javascript

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
            currentDirectory = this.adjacencyMatrix[currentDirectory.name].find((adjNode) => adjNode.name === pathParts[i]);
            if (!currentDirectory) {
                return null;
            }
        }
        return currentDirectory;
    }


```

El método getDirectory(path = '/') se utiliza para obtener un nodo del grafo a partir de una ruta. Este método recibe un parámetro path que es una cadena que representa la ruta


### BlockChain

Para realizar la implementación de una blockchain que servirá para mensajería se necesitan de 2 componentes que son el bloque y la cadena. Se detalla a continuación el código y propiedades de cada uno de ellos.


`Block` tiene un constructor que recibe los siguientes argumentos:

* `index`: número entero que representa el índice del bloque en la cadena.
* `date`: objeto Date que indica la fecha y hora de creación del bloque.
* `emiter`: cadena que representa al emisor del mensaje del bloque.
* `receptor`: cadena que representa al receptor del mensaje del bloque.
* `msg`: cadena que representa el mensaje del bloque.
* `previousHash`: cadena que representa el hash del bloque anterior.
* `hash`: cadena que representa el hash del bloque actual.

Como otras propiedades cuenta con:

* `next`: referencia al siguiente bloque en la cadena.
* `previous`: referencia al bloque anterior en la cadena.

Y cuenta con los siguientes métodos:

* `decryptMsg()`: utiliza la función aesDecryption() del módulo utils para desencriptar el mensaje del bloque.
* `formatDate()`: formatea la fecha del bloque en una cadena con el formato dd-mm-yyyy::hh:mm:ss.

```javascript


export class Block {
    constructor(index, date, emiter, receptor, msg, previousHash, hash) {
        this.data = {
            index,
            date,
            emiter,
            receptor,
            msg,
            previousHash,
            hash
        }
        this.next = null
        this.previous = null
    }

    decryptMsg() {
        return aesDecryption(this.data.msg)
    }

    formatDate() {
        let result = ''
        result += this.data.date.getDate() < 10 ? ("0" + this.data.date.getDate() + "-") : (this.data.date.getDate() + "-")
        result += this.data.date.getMonth() < 10 ? ("0" + (this.data.date.getMonth() + 1) + "-") : (this.data.date.getMonth() + "-")
        result += this.data.date.getFullYear() + "::"
        result += this.data.date.getHours() < 10 ? ("0" + this.data.date.getHours() + ":") : (this.data.date.getHours() + ":")
        result += this.data.date.getMinutes() < 10 ? ("0" + this.data.date.getMinutes() + ":") : (this.data.date.getMinutes() + ":")
        result += this.data.date.getSeconds() < 10 ? ("0" + this.data.date.getSeconds()) : (this.data.date.getSeconds())
        return result
    }
}
```

Para la blockchain se tiene la clase `BlockChain ` que tiene un constructor que recibe los siguientes argumentos:

* `start`: referencia al primer bloque en la cadena.
* `blockCounter`: número entero que representa la cantidad de bloques en la cadena.


Además, tiene los siguientes métodos:

* `insert(date, emiter, receptor, msg)`: crea un nuevo bloque con los argumentos recibidos y lo inserta en la cadena.
* Calcula el hash del bloque actual y el mensaje encriptado utilizando la función hashPassword() del módulo utils y la función aesEncryption() del mismo módulo, respectivamente. Si el bloque es el primero en la cadena, establece el hash del bloque anterior como '0000'. Si el bloque no es el primero en la cadena, busca el último bloque y establece su hash como el hash del bloque anterior.

* `insertBlock(block)`: inserta un bloque existente en la cadena. Si el bloque es el primero en la cadena, establece el hash del bloque anterior como '0000'. Si el bloque no es el primero en la cadena, busca el último bloque y establece su hash como el hash del bloque anterior.

* `sha256(msg)`: calcula el hash SHA-256 de la cadena recibida utilizando la API crypto.subtle.digest() del navegador.

* `graphviz()`: genera una cadena que representa el grafo de la cadena utilizando la sintaxis del lenguaje DOT de Graphviz.
* `graphvizNodes()`: genera una cadena que representa los nodos del grafo de la cadena.
* `graphvizEdges()`: genera una cadena que representa las aristas del grafo de la cadena.