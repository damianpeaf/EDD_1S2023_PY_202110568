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

    console.log(currentDirectory);

    const matrix = new PermissionMatrix();

    currentDirectory.filesDetails.forEach(fileDetail => {

        matrix.insertFile(fileDetail.file);

        fileDetail.permisssionsDetails.forEach(permissionDetail => {

            matrix.insertPermission(fileDetail.file, permissionDetail.student, permissionDetail.permission);
        });

    });

    console.log(matrix)

    const image = document.getElementById('permission-matrix');

    const url = 'https://quickchart.io/graphviz?graph=' + matrix.graphviz();

    image.setAttribute('src', url);

}

setGraphvizImage();