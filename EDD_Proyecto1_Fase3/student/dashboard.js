import { renderCards } from './cards.js';
import { getSession, getDirectoryTree, setDirectoryTree, getStudentsHashTable, setCurrentDirectory, getCurrentDirectory, getSessionBinacle, getSharedFiles, getDirectoryGraph, saveSessionBinnacle } from '../utils/storage-handler.js';
import { File as CustomFile, Permission } from '../core/index.js';


const studentName = document.getElementById('student-name');
const studentId = document.getElementById('student-id');
const pathSearch = document.getElementById('path-search');
const currentFolderSpan = document.getElementById('current-folder-span');
const newFolderForm = document.getElementById('new-folder-form');
const uploadFileForm = document.getElementById('upload-file-form');
const searchButton = document.getElementById('path-seach-button');
const directoryName = document.getElementById('directory-name');
const studentSelect = document.getElementById('student-select');
const addPermissionForm = document.getElementById('add-permission-form');
const filesReportsButton = document.getElementById('files-reports-button');
const deleteDirectoryButton = document.getElementById('delete-directory-button');

const session = getSession();
const directoryTree = getDirectoryTree(session.user.id);
const directoryGraph = getDirectoryGraph()
const studentHashTable = getStudentsHashTable();
const binnacle = getSessionBinacle()


studentName.innerText = session.user.name;
studentId.innerText = session.user.id;

const query = window.location.search;
const params = new URLSearchParams(query);
let dir = params.get('dir');

dir = dir ? dir : getCurrentDirectory();

pathSearch.value = dir;
currentFolderSpan.innerText = dir;

const treeDirectory = directoryTree.getDirectory(dir); // * From the tree, used to add new files and folders
console.log(directoryGraph)
const graphDirectory = directoryGraph.getDirectory(dir) // * From the graph, use to navigate


if (!graphDirectory) {
    alert('La carpeta no existe');
    window.location.href = `dashboard.html?dir=${getCurrentDirectory()}`;
}

setCurrentDirectory(dir);

// * ----------------- Render ----------------- * //

directoryName.innerText = "Carpeta actual: " + dir + ""; // ? Breadcumb

renderCards(graphDirectory.children, dir);
renderCards(graphDirectory.getFiles());

// Fill student select
studentHashTable.elements().filter(s => s.id != session.user.id).forEach((student) => {
    const option = document.createElement('option');
    option.value = student.id;
    option.innerText = student.name + " - " + student.id;
    studentSelect.appendChild(option);
});

// * ----------------- Forms ----------------- * //

newFolderForm.addEventListener('submit', (event) => {

    const newFolderName = document.getElementById('new-folder-name').value;
    treeDirectory.addDirectory(newFolderName);
    setDirectoryTree(session.user.id, directoryTree);


    binnacle.add(`Se creo la carpeta ${newFolderName} en la carpeta ${dir}`);
    saveSessionBinnacle(binnacle);

});

uploadFileForm.addEventListener('submit', (event) => {
    const file = document.getElementById('upload-file').files[0];
    const reader = new FileReader();

    // Codificate to base64
    reader.readAsDataURL(file);

    reader.onload = (e) => {
        const content = btoa(reader.result);
        const createdFile = new CustomFile(file.name, content);
        treeDirectory.addFile(createdFile);
        console.log('File uploaded')
        console.log(treeDirectory)
        setDirectoryTree(session.user.id, directoryTree);

    }

    binnacle.add(`Se subio el archivo ${file.name} en la carpeta ${dir}`);
    saveSessionBinnacle(binnacle);

    alert('Archivo subido exitosamente');

});

searchButton.addEventListener('click', (event) => {
    const path = pathSearch.value;
    window.location.href = `dashboard.html?dir=${path}`;
});

addPermissionForm.addEventListener('submit', (event) => {
    const studentId = studentSelect.value;
    const permissionName = document.getElementById('permission-select').value;
    const fileNameInput = document.getElementById('file-name-input');

    // Search file
    const fileDetail = treeDirectory.filesDetails.find((detail) => detail.file.name === fileNameInput.value);

    if (!fileDetail) {
        alert('El archivo no existe');
        return;
    }

    // Search user
    const user = studentHashTable.search(Number(studentId));

    if (!user) {
        alert('El usuario no existe');
        return;
    }

    // Add permission
    const permission = new Permission(permissionName)
    fileDetail.addPermission(user, permission);
    setDirectoryTree(session.user.id, directoryTree);


    binnacle.add(`Se agrego el permiso ${permissionName} al archivo ${fileNameInput.value} para el usuario ${user.name} - ${user.id}`);
    saveSessionBinnacle(binnacle);

    alert('Permiso agregado exitosamente');

});

filesReportsButton.addEventListener('click', (event) => {
    window.location.href = `files-reports.html?dir=${dir}`;
});

deleteDirectoryButton.addEventListener('click', (event) => {
    let parentDirectory = getCurrentDirectory().split('/').slice(0, -1).join('/');
    parentDirectory = parentDirectory ? parentDirectory : '/';

    directoryTree.deleteDirectory(dir);
    setDirectoryTree(session.user.id, directoryTree);


    binnacle.add(`Se elimino la carpeta ${dir}`);
    saveSessionBinnacle(binnacle);

    window.location.href = `dashboard.html?dir=${parentDirectory}`;
});
