import { getStudentsHashTable } from '../utils/index.js'

const students = getStudentsHashTable();

const tableBody = document.getElementById('student-table-body');

for (let i = 0; i < students.capacity; i++) {
    if (students.table[i]) {
        const row = document.createElement('tr');

        const id = document.createElement('td');
        id.innerText = students.table[i].id;

        const name = document.createElement('td');
        name.innerText = students.table[i].name;

        const password = document.createElement('td');
        password.innerText = students.table[i].password;

        row.appendChild(id);
        row.appendChild(name);
        row.appendChild(password);

        tableBody.appendChild(row);
    }
}