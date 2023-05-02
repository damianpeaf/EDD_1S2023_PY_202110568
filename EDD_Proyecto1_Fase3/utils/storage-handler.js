import { Binnacle } from '../core/binnacle.js';
import { AVLTree, Student, DirectoryTree, FileDetail, File, Permission, PermissionDetail, HashTable } from '../core/index.js';

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


export const setCurrentDirectory = (directory = '/') => {
    localStorage.setItem('currentDirectory', directory);
}

export const getCurrentDirectory = () => {
    const dir = localStorage.getItem('currentDirectory');
    return dir ? dir : '/';
}

export const setStudentsBinnacles = (binnacles = { 2021: new Binnacle() }) => {

    const formatedBinnacles = {}

    Object.keys(binnacles).forEach(key => {

        let aux = binnacles[key].head;
        let i = 0;
        const nodes = [];

        while (i < binnacles[key].size) {
            nodes.push({
                data: aux.data,
                date: aux.date,
            });
            aux = aux.next;
            i++;
        }

        formatedBinnacles[key] = nodes;
    });

    localStorage.setItem('binnacles', JSON.stringify(formatedBinnacles));
}

export const getSessionBinacle = () => {

    const session = getSession();
    const serializeBinnacle = localStorage.getItem('binnacles');

    if (session && serializeBinnacle) {
        const binnacles = JSON.parse(serializeBinnacle);
        const nodes = binnacles[session.user.id].map(node => {
            return {
                data: node.data,
                date: new Date(Date.parse(node.date))
            }
        }).sort((a, b) => a.date - b.date);

        const binnacle = new Binnacle();

        nodes.forEach(node => {
            binnacle.add(node.data, node.date);
        });

        return binnacle;
    }

    return null;
}


export const saveSessionBinnacle = (binnacle) => {
    const session = getSession();
    const serializeBinnacle = localStorage.getItem('binnacles');

    if (session && serializeBinnacle) {
        const binnacles = JSON.parse(serializeBinnacle);
        binnacles[session.user.id] = binnacle;
        setStudentsBinnacles(binnacles);
    }
}

export const getStudentsHashTable = () => {
    const tree = getStudentTree();
    const hashTable = new HashTable();

    tree.inorder().forEach(student => {
        hashTable.insert(student.id, student.name, student.password);
    });

    return hashTable;
}


export const getPermissionData = () => {

    const students = getStudentsHashTable();
    const permissionData = []

    const formatDirectoryInformation = (student, directory, path) => {
        directory.filesDetails.forEach(fileDetail => {
            fileDetail.permisssionsDetails.forEach(permissionDetail => {
                permissionData.push({
                    owner: student.id,
                    destination: permissionDetail.student.id,
                    path,
                    file: fileDetail.file,
                    permission: permissionDetail.permission.name
                })
            })
        })

        // Recursion
        directory.children.forEach(child => {
            formatDirectoryInformation(student, child, (path == '/' ? path : path + '/') + child.name)
        })
    }
    students.elements().forEach(student => {
        const root = getDirectoryTree(student.id).root;
        formatDirectoryInformation(student, root, '/')
    })

    return permissionData;
}

export const getSharedFiles = (studentId) => {

    const permissions = getPermissionData();
    const sharedFiles = permissions.filter(permission => permission.destination == studentId);


    return sharedFiles;
}
