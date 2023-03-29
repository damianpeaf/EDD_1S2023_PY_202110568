import { Student, AVLTree, DirectoryTree, Binnacle } from '../core/index.js';
import { setStudentTree, setStudentsDirectoryTrees, setStudentsBinnacles } from '../utils/storage-handler.js';

const form = document.getElementById('bulk-load-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const file = document.getElementById('bulk-load-file').files[0];
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = (e) => {
        try {
            const data = JSON.parse(reader.result);

            const newTree = new AVLTree();

            data.alumnos.forEach((student) => {

                const newStudent = new Student(
                    student.nombre,
                    student.carnet,
                    student.password,
                    student.Carpeta_Raiz,
                );

                newTree.insert(newStudent);

            });

            const errorContainer = document.getElementById('error-container');

            errorContainer.innerHTML = `
                <div class="alert alert-success" role="alert">
                    Archivo cargado correctamente
                </div>
            `;

            setTimeout(() => {
                errorContainer.innerHTML = '';
            }, 3000);

            setStudentTree(newTree);

            // Create directory trees

            const directoryTrees = {};

            data.alumnos.forEach((student) => {
                directoryTrees[student.carnet] = new DirectoryTree(student.Carpeta_Raiz);
            });

            setStudentsDirectoryTrees(directoryTrees);

            const studentsBinnacles = {};

            data.alumnos.forEach((student) => {
                studentsBinnacles[student.carnet] = new Binnacle();
            });

            setStudentsBinnacles(studentsBinnacles);

        } catch (error) {
            console.log(error)
            const errorContainer = document.getElementById('error-container');

            errorContainer.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Error al cargar el archivo
                </div>
            `;

            setTimeout(() => {
                errorContainer.innerHTML = '';
            }, 3000);
        }
    }

});