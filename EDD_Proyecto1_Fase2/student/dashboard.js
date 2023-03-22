import { getSession } from '../utils/storage-handler.js';

const studentName = document.getElementById('student-name');
const studentId = document.getElementById('student-id');

const session = getSession();

studentName.innerText = session.user.name;
studentId.innerText = session.user.id;

const query = window.location.search;
const params = new URLSearchParams(query);

const dir = params.get('dir');

console.log(dir)