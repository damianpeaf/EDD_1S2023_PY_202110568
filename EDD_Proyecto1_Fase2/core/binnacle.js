
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