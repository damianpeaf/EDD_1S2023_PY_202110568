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

}