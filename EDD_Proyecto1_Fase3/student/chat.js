
import { getBlockChain, getSession, getStudentsHashTable, setBlockChain } from "../utils/index.js";

const session = getSession();
const studentHashTable = getStudentsHashTable();
const blockChain = getBlockChain();
console.log(blockChain)

// Chat tabs
const chatTabs = document.getElementById('chat-tabs');
studentHashTable.elements().filter(s => s.id != session.user.id).forEach((student) => {

    const chatTab = document.createElement('div');
    chatTab.classList.add('card');
    chatTab.style.cursor = 'pointer';

    const chatTabBody = document.createElement('div');
    chatTabBody.classList.add('card-body');

    const chatTabTitle = document.createElement('h5');
    chatTabTitle.classList.add('card-title');
    chatTabTitle.innerText = student.name;

    const chatTabText = document.createElement('p');
    chatTabText.classList.add('card-text');
    chatTabText.innerText = `Carnet: ${student.id}`;

    chatTabBody.appendChild(chatTabTitle);
    chatTabBody.appendChild(chatTabText);
    chatTab.appendChild(chatTabBody);
    chatTabs.appendChild(chatTab);

    chatTab.addEventListener('click', () => {
        renderCharWindow(student.id);
    });

});

const chatWindow = document.getElementById('chat-window');
const recieverInput = document.getElementById('student-id-input');
const studentInfoSpan = document.getElementById('student-info');

const renderCharWindow = async (studentId) => {

    // Get messages from blockChain
    recieverInput.value = studentId;
    studentInfoSpan.innerText = studentId;

    // Clear chat window
    chatWindow.innerHTML = '';

    let aux = blockChain.start;
    while (aux != null) {
        if ((aux.data.emiter == session.user.id && aux.data.receptor == studentId) || (aux.data.emiter == studentId && aux.data.receptor == session.user.id)) {
            const message = document.createElement('p');
            message.style.textAlign = aux.data.emiter == session.user.id ? 'right' : 'left';
            message.classList.add('card-text');
            message.innerText = await aux.decryptMsg();
            chatWindow.appendChild(message);
        }
        aux = aux.next;
    }
}

// Send message
const messageForm = document.getElementById('message-form');

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = messageForm.message.value;
    await blockChain.insert(new Date(), session.user.id, Number(recieverInput.value), message);

    console.log(blockChain);
    renderCharWindow(recieverInput.value);
    setBlockChain(blockChain);
});

// Select initial chat
renderCharWindow(studentHashTable.elements().filter(s => s.id != session.user.id)[0].id);