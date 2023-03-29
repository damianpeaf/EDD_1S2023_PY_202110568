import { getSession, getDirectoryTree } from '../utils/storage-handler.js';
import { PermissionMatrix } from '../core/index.js';

const session = getSession();
const directoryTree = getDirectoryTree(session.user.id);
const query = window.location.search;
const params = new URLSearchParams(query);
let dir = params.get('dir');

dir = dir ? dir : directoryTree.root.graphvizNodeLabel();

const currentDirectory = directoryTree.getDirectory(dir);


const setGraphvizImage = () => {

    const image = document.getElementById('permission-matrix');


    const matrix = new PermissionMatrix();

    if (currentDirectory.filesDetails.length == 0) {
        const container = document.getElementById('container');

        const alert = document.createElement('div');
        alert.setAttribute('class', 'alert alert-warning');
        alert.setAttribute('role', 'alert');
        alert.innerHTML = 'No hay archivos en este directorio';

        container.appendChild(alert);

        // Hide image
        image.style.display = 'none';

        return;
    }

    currentDirectory.filesDetails.forEach(fileDetail => {

        matrix.insertFile(fileDetail.file);

        fileDetail.permisssionsDetails.forEach(permissionDetail => {

            matrix.insertPermission(fileDetail.file, permissionDetail.student, permissionDetail.permission);
        });

    });

    console.log(matrix)


    const url = 'https://quickchart.io/graphviz?graph=' + matrix.graphviz();

    image.setAttribute('src', url);

}

setGraphvizImage();