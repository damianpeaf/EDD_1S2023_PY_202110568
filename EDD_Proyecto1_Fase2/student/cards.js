import { Directory, File } from "../core/index.js";

export function renderCards(data, dir = "/") {
    const folderContentContainer = document.getElementById('folder-content-container');

    data.forEach((item) => {

        const card = document.createElement('div'); // Crear el elemento card
        card.classList.add('card', 'mb-3');

        // Cursor pointer
        card.style.cursor = 'pointer';

        const row = document.createElement('div'); // Crear el elemento row
        row.classList.add('row', 'g-0');

        const col1 = document.createElement('div'); // Crear el primer elemento col-md-4
        col1.classList.add('col-md-4', 'd-flex', 'justify-content-center', 'align-items-center');

        const icon = document.createElement('i'); // Crear el ícono

        if (item instanceof File) {

            icon.classList.add('fa-solid', 'fa-file');
        } else if (item instanceof Directory) {
            icon.classList.add('fa-solid', 'fa-folder');
        }

        icon.style.fontSize = '2em';

        col1.appendChild(icon); // Agregar el ícono a la columna

        const col2 = document.createElement('div'); // Crear el segundo elemento col-md-8
        col2.classList.add('col-md-8');

        const body = document.createElement('div'); // Crear el elemento card-body
        body.classList.add('card-body', 'd-flex', 'align-items-center');

        const title = document.createElement('h5'); // Crear el título
        title.classList.add('card-title');
        title.textContent = item.name;

        body.appendChild(title); // Agregar el título al body

        col2.appendChild(body); // Agregar el body a la columna

        row.appendChild(col1); // Agregar la primera columna a la fila
        row.appendChild(col2); // Agregar la segunda columna a la fila

        card.appendChild(row); // Agregar la fila a la card

        folderContentContainer.appendChild(card); // Agregar la card al contenedor

        // * ----------------- Events ----------------- * //

        card.addEventListener('click', () => {
            if (item instanceof File) {
                // data-bs-toggle="modal" and data-bs-target="#addPermissionModal"
                card.setAttribute('data-bs-toggle', 'modal');
                card.setAttribute('data-bs-target', '#addPermissionModal');

                const fileNameInput = document.getElementById('file-name-input');
                fileNameInput.value = item.name;
            } else if (item instanceof Directory) {
                // Change path

                const pathSearch = document.getElementById('path-search');

                dir === "/" ? pathSearch.value = dir + item.name : pathSearch.value = dir + "/" + item.name;
            }
        });

    });
}
