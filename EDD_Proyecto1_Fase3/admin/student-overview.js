import { getPermissionData, getStudentsHashTable } from '../utils/index.js'

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

const permissionData = getPermissionData();
const permissionBody = document.getElementById('permission-table-body');

permissionData.forEach(permission => {

    const row = document.createElement('tr');

    const owner = document.createElement('td');
    owner.innerText = permission.owner;

    const destination = document.createElement('td');
    destination.innerText = permission.destination;

    const path = document.createElement('td');
    path.innerText = permission.path;

    const file = document.createElement('td');
    file.innerText = permission.file.name;

    const permissionName = document.createElement('td');
    permissionName.innerText = permission.permission;

    row.appendChild(owner);
    row.appendChild(destination);
    row.appendChild(path);
    row.appendChild(file);
    row.appendChild(permissionName);

    permissionBody.appendChild(row);
})
