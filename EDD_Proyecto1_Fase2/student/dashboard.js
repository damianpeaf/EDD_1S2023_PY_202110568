import { getSession, getDirectoryTree, setDirectoryTree } from '../utils/storage-handler.js';


const studentName = document.getElementById('student-name');
const studentId = document.getElementById('student-id');
const pathSearch = document.getElementById('path-search');
const currentFolderSpan = document.getElementById('current-folder-span');
const newFolderForm = document.getElementById('new-folder-form');

const session = getSession();
const directoryTree = getDirectoryTree(session.user.id);

studentName.innerText = session.user.name;
studentId.innerText = session.user.id;

const query = window.location.search;
const params = new URLSearchParams(query);
let dir = params.get('dir');

dir = dir ? dir : directoryTree.root.graphvizNodeLabel();

pathSearch.value = dir;
currentFolderSpan.innerText = dir;

const currentDirectory = directoryTree.getDirectory(dir);
console.log(currentDirectory);

// TODO: Render the files and folders in the current directory

newFolderForm.addEventListener('submit', (event) => {
    const newFolderName = document.getElementById('new-folder-name').value;
    currentDirectory.addDirectory(newFolderName);
    setDirectoryTree(session.user.id, directoryTree);
});
