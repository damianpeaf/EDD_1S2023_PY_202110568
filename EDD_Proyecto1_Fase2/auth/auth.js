
import { getAdminUser, setSession, setAdminUser, getSession, clearSession, getStudentTree } from '../utils/storage-handler.js'

const tree = getStudentTree();
const users = tree.inorder().map(student => ({ ...student, role: 'student' }));

export const validateUser = (username = '', password = '') => {

    setAdminUser();

    if (username === 'Admin' && password === 'Admin') {
        const user = getAdminUser();
        setSession(user, true);
        return user;
    } else {

        const user = users.find(user => user.id === Number(username) && user.password === password);

        if (user) {
            setSession(user, true);
            return user;
        }

        return null;

    }

}

export const checkSession = () => {

    const session = getSession();

    if (session) {
        console.log(session)
        switch (session.user.role) {
            case 'admin':
                window.location.href = 'admin/dashboard.html';
                break;

            case 'student':
                window.location.href = 'student/dashboard.html';
                break;

            default:
                clearSession();
                break;
        }
    }
}

checkSession();
