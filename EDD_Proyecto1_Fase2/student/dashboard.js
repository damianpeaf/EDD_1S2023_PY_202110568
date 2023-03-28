import { renderCards } from './cards.js';
import { getSession, getDirectoryTree, setDirectoryTree, getStudentTree } from '../utils/storage-handler.js';
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

const session = getSession();
const directoryTree = getDirectoryTree(session.user.id);
const studentTree = getStudentTree();



studentName.innerText = session.user.name;
studentId.innerText = session.user.id;

const query = window.location.search;
const params = new URLSearchParams(query);
let dir = params.get('dir');

dir = dir ? dir : directoryTree.root.graphvizNodeLabel();

pathSearch.value = dir;
currentFolderSpan.innerText = dir;

const currentDirectory = directoryTree.getDirectory(dir);

// * ----------------- Render ----------------- * //

directoryName.innerText = "Carpeta actual: " + dir + "";

renderCards(currentDirectory.children, dir);

renderCards(currentDirectory.getFiles());

// Fill student select
studentTree.inorder().filter(s => s.id != session.user.id).forEach((student) => {
    const option = document.createElement('option');
    option.value = student.id;
    option.innerText = student.name + " - " + student.id;
    studentSelect.appendChild(option);
});

// * ----------------- Forms ----------------- * //

newFolderForm.addEventListener('submit', (event) => {
    const newFolderName = document.getElementById('new-folder-name').value;
    currentDirectory.addDirectory(newFolderName);
    setDirectoryTree(session.user.id, directoryTree);
});

uploadFileForm.addEventListener('submit', (event) => {
    const file = document.getElementById('upload-file').files[0];
    const reader = new FileReader();

    // Codificate to base64
    reader.readAsDataURL(file);

    reader.onload = (e) => {
        const content = btoa(reader.result);
        const createdFile = new CustomFile(file.name, content);
        currentDirectory.addFile(createdFile);
        console.log('File uploaded')
        console.log(currentDirectory)
        setDirectoryTree(session.user.id, directoryTree);
    }

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
    const fileDetail = currentDirectory.filesDetails.find((detail) => detail.file.name === fileNameInput.value);

    if (!fileDetail) {
        alert('El archivo no existe');
        return;
    }

    // Search user
    const user = studentTree.inorder().find((student) => student.id == studentId);

    if (!user) {
        alert('El usuario no existe');
        return;
    }

    // Add permission
    const permission = new Permission(permissionName)
    fileDetail.addPermission(user, permission);
    setDirectoryTree(session.user.id, directoryTree);
    alert('Permiso agregado exitosamente');

});

filesReportsButton.addEventListener('click', (event) => {
    window.location.href = `files-reports.html?dir=${dir}`;
});