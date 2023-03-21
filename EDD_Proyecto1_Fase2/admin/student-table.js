import { getStudentTree } from '../utils/storage-handler.js';

const studentTree = getStudentTree();
const orderSelect = document.getElementById('order-select');

orderSelect.addEventListener('change', (event) => {

    const order = event.target.value;
    createBody(order);

});

const tableBody = document.getElementById('student-table-body');

const createBody = (order) => {

    let students;

    switch (order) {
        case 'preorder':
            students = studentTree.preorder();
            break;

        case 'inorder':
            students = studentTree.inorder();
            break;

        case 'postorder':
            students = studentTree.postorder();
            break;

        default:
            students = studentTree.inorder();
            break;
    }

    tableBody.innerHTML = '';

    students.forEach((student) => {

        const row = document.createElement('tr');

        const id = document.createElement('td');
        id.innerText = student.id;

        const name = document.createElement('td');
        name.innerText = student.name;


        row.appendChild(id);
        row.appendChild(name);

        tableBody.appendChild(row);

    });

}

createBody();