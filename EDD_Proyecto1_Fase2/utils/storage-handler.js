import { AVLTree, Student, DirectoryTree, FileDetail, File, Permission, PermissionDetail } from '../core/index.js';

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

export const setStudentsDirectoryTrees = (directoryTree) => {
    localStorage.setItem('directoryTree', JSON.stringify(directoryTree));
}

export const getDirectoryTree = (studentId) => {

    const serializeDirectoryTree = localStorage.getItem('directoryTree');
    const parsedDirectoryTree = serializeDirectoryTree ? JSON.parse(serializeDirectoryTree) : null;

    if (parsedDirectoryTree) {
        return parseDirectoryTree(parsedDirectoryTree[studentId]);
    }

    return null;
}

export const setDirectoryTree = (studentId, directoryTree) => {
    const serializeDirectoryTree = localStorage.getItem('directoryTree');
    const parsedDirectoryTree = serializeDirectoryTree ? JSON.parse(serializeDirectoryTree) : null;

    if (parsedDirectoryTree) {
        parsedDirectoryTree[studentId] = directoryTree;
        localStorage.setItem('directoryTree', JSON.stringify(parsedDirectoryTree));
    }
}

const parseDirectoryTree = (directoryTree) => {

    const tree = new DirectoryTree(directoryTree.root.name);

    const parse = (node, currentDirectory) => {
        node.children.forEach(child => {
            const newDirectory = currentDirectory.addDirectory(child.name);
            parse(child, newDirectory);
        });

        currentDirectory.filesDetails = parseFilesDetails(node.filesDetails);
    }

    parse(directoryTree.root, tree.root);
    return tree;
}

const parseFilesDetails = (filesDetails) => {

    const details = [];

    filesDetails.forEach(fileDetail => {
        const newFileDetail = new FileDetail(new File(fileDetail.file.name, fileDetail.file.content));
        newFileDetail.permisssionsDetails = parsePermissions(fileDetail.permisssionsDetails);
        details.push(newFileDetail);

    });

    return details;

}

const parsePermissions = (permissionsDetail) => {
    const parsedPermissions = [];

    permissionsDetail.forEach(permission => {
        const newPermission = new PermissionDetail(new Permission(permission.permission.name), new Student(permission.student.name, permission.student.id, permission.student.password, permission.student.rootFolder));
        parsedPermissions.push(newPermission);
    });

    return parsedPermissions;
}