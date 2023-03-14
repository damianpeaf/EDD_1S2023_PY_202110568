
import { getAdminUser, setSession, setAdminUser, getSession, clearSession } from '../utils/storage-handler.js'


export const validateUser = (username = '', password = '') => {

    setAdminUser();

    if (username === 'Admin' && password === 'Admin') {
        const user = getAdminUser();
        setSession(user, true);
        return user;
    } else {
        // Search in AVL tree
    }

}

const checkSession = () => {

    const session = getSession();

    if (session) {
        console.log(session)
        switch (session.user.role) {
            case 'admin':
                window.location.href = 'admin-dashboard.html';
                break;

            default:
                clearSession();
                break;
        }
    }
}

checkSession();
