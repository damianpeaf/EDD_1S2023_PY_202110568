

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