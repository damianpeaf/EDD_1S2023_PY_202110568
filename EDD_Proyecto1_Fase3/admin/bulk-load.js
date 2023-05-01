import { Student, AVLTree, DirectoryTree, Binnacle } from '../core/index.js';
import { setStudentTree, hashPassword, setStudentsBinnacles, setStudentsDirectoryTrees } from '../utils/index.js';




const form = document.getElementById('bulk-load-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const file = document.getElementById('bulk-load-file').files[0];
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = async (e) => {
        try {
            const data = JSON.parse(reader.result);

            // Create student AVL tree
            const newTree = new AVLTree();
            const insertionPromises = data.alumnos.map(async (student) => {
                const passwordHash = await hashPassword(student.password);

                const newStudent = new Student(
                    student.nombre,
                    student.carnet,
                    passwordHash,
                    student.Carpeta_Raiz,
                );

                newTree.insert(newStudent);
            });

            await Promise.all(insertionPromises)

            const errorContainer = document.getElementById('error-container');
            errorContainer.innerHTML = `
                <div class="alert alert-success" role="alert">
                    Archivo cargado correctamente
                </div>
            `;

            setTimeout(() => {
                errorContainer.innerHTML = '';
            }, 3000);

            // Save student AVL tree
            setStudentTree(newTree);

            // Create students directory trees
            const directoryTrees = {};
            data.alumnos.forEach((student) => {
                directoryTrees[student.carnet] = new DirectoryTree(student.Carpeta_Raiz);
            });
            setStudentsDirectoryTrees(directoryTrees);

            // Create students binnacles
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