import { getBlockChain } from '../utils/index.js'

const blockchain = getBlockChain()


const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");


let currentBlock = blockchain.start

const actualBlockTextarea = document.getElementById("actual-block-textarea")
const decryptMessageTextArea = document.getElementById("decrypt-message-textarea")


const renderCurrentBlock = async () => {

    if (!currentBlock) {
        actualBlockTextarea.value = "No hay mensajes"
        return
    }

    actualBlockTextarea.value = `
    Index: ${currentBlock.data.index}
    Fecha: ${currentBlock.formatDate()}
    Emisor: ${currentBlock.data.emiter}
    Receptor: ${currentBlock.data.receptor}
    Mensaje: ${currentBlock.data.msg}
    Previous Hash: ${currentBlock.data.previousHash}
    Hash: ${currentBlock.data.hash}
    `


    const decryptedMsg = await currentBlock.decryptMsg()
    decryptMessageTextArea.value = decryptedMsg
}

nextButton.addEventListener("click", () => {
    if (currentBlock.next) {
        currentBlock = currentBlock.next
        renderCurrentBlock()
    }
})

prevButton.addEventListener("click", () => {
    if (currentBlock.previous) {
        currentBlock = currentBlock.previous
        renderCurrentBlock()
    }
})



renderCurrentBlock()
