import { getSession, getSharedFiles } from "../utils/storage-handler.js";

const session = getSession();
const sharedFiles = getSharedFiles(session.user.id);

const sharedContainer = document.getElementById('shared-files-section');

sharedFiles.forEach(sharedFile => {

    const card = document.createElement('div');
    card.classList.add('card', 'my-3');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = sharedFile.file.name;

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.innerText = `Compartido por: ${sharedFile.owner}`;

    // Posible extensions .txt .pdf .jpg .png .mp3 .mp4
    const extension = sharedFile.file.name.split('.').pop();

    if (extension === 'txt') {
        const content = atob(atob(sharedFile.file.content).split(',')[1]);
        // Render text area
        const textArea = document.createElement('textarea');
        textArea.classList.add('form-control');
        textArea.value = content;
        textArea.readOnly = true;
        cardBody.appendChild(textArea);

    } else if (extension === 'pdf') {
        // Render iframe
        const content = atob(sharedFile.file.content);
        const iframe = document.createElement('iframe');
        iframe.classList.add('embed-responsive-item');
        iframe.style.width = '100%';
        iframe.style.height = '100vh'
        iframe.src = content;

        cardBody.appendChild(iframe);

    } else if (extension === 'jpg' || extension === 'png') {
        // Render img
        const content = atob(sharedFile.file.content);

        const img = document.createElement('img');
        img.classList.add('img-fluid', 'card-img-top');

        // max-width: 20rem;
        // max-height: 20rem;
        img.style.maxWidth = '20rem';
        img.style.maxHeight = '20rem';

        img.src = content;

        cardBody.appendChild(img);
    }

    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(cardText);
    card.appendChild(cardHeader);

    card.appendChild(cardBody);
    sharedContainer.appendChild(card);

});
