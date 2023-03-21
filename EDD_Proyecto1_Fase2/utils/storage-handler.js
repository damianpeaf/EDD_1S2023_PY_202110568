import { AVLTree, Student } from '../core/index.js';

const adminUser = {
    username: 'Admin',
    password: 'Admin',
    role: 'admin',
    // ? Logs
}

export const setAdminUser = () => {
    if (getAdminUser() == null) {
        localStorage.setItem('adminUser', JSON.stringify(adminUser))
    }
}

export const getAdminUser = () => {
    const adminUser = localStorage.getItem('adminUser');
    return adminUser ? JSON.parse(adminUser) : null;
}

export const setSession = (user, isLogged) => {
    localStorage.setItem('session', JSON.stringify({
        isLogged,
        user
    }));
}

export const clearSession = () => {
    localStorage.removeItem('session');
}

export const getSession = () => {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
}

export const setStudentTree = (studentTree) => {
    localStorage.setItem('studentTree', JSON.stringify(studentTree));
}

export const getStudentTree = () => {
    const serializeStudentTree = localStorage.getItem('studentTree');
    const parsedStudentTree = serializeStudentTree ? JSON.parse(serializeStudentTree) : null;

    const studentTree = new AVLTree();

    if (parsedStudentTree && parsedStudentTree.root) {
        // inorder insert
        const insert = (node) => {
            if (node.left) {
                insert(node.left);
            }

            studentTree.insert(transformToStudent(node.data));

            if (node.right) {
                insert(node.right);
            }
        }

        insert(parsedStudentTree.root);
    }

    return studentTree;
}

const transformToStudent = (data) => {
    return new Student(
        data.name,
        data.id,
        data.password,
        data.rootFolder,
    );
}

