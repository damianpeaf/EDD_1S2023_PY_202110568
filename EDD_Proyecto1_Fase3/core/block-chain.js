import { aesDecryption, aesEncryption, hashPassword } from "../utils/index.js"

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

export class BlockChain {
    constructor() {
        this.start = null
        this.blockCounter = 0
    }

    async insert(date, emiter, receptor, msg) {

        const seed = this.blockCounter + date + emiter + receptor + msg
        const hash = await hashPassword(seed)
        const encryptedMsg = await aesEncryption(msg)

        if (this.start === null) {
            const newBlock = new Block(this.blockCounter, date, emiter, receptor, encryptedMsg, '0000', hash)
            this.start = newBlock
            this.blockCounter++
        } else {

            // Search the last block
            let aux = this.start
            while (aux.next) {
                aux = aux.next
            }

            const newBlock = new Block(this.blockCounter, date, emiter, receptor, encryptedMsg, aux.data.hash, hash)
            newBlock.previous = aux
            aux.next = newBlock
            this.blockCounter++
        }
    }

    insertBlock(block) {
        if (this.start === null) {
            block.data.previousHash = '0000'
            this.start = block
            this.blockCounter++
        } else {

            // Search the last block
            let aux = this.start
            while (aux.next) {
                aux = aux.next
            }
            block.previous = aux
            block.data.previousHash = aux.data.hash
            aux.next = block
            this.blockCounter++
        }
    }

    async sha256(msg) {
        let result
        const enconder = new TextEncoder();
        const encryptedMsg = enconder.encode(msg)
        await crypto.subtle.digest("SHA-256", encryptedMsg)
            .then(result => {
                const hashArray = Array.from(new Uint8Array(result))
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
                result = hashHex
            })
            .catch(error => console.log(error))
        return result
    }
}