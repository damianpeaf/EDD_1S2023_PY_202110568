
import { getAdminUser, setSession, setAdminUser, getSession, clearSession, getStudentsHashTable, hashPassword } from '../utils/index.js'

const users = getStudentsHashTable()

export const validateUser = async (username = '', password = '') => {

    setAdminUser();

    if (username === 'Admin' && password === 'Admin') {
        const user = getAdminUser();
        setSession(user, true);
        return user;
    } else {
        const user = users.search(username);


        // ! remove this
        const passwordHash = await hashPassword(password);
        if (user && user.password === passwordHash) {
            const formatedUser = {
                ...user,
                role: 'student'
            }
            setSession(formatedUser, false);
            return formatedUser;
        }

        console.log(users)
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
