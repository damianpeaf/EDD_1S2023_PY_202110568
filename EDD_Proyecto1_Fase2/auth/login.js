import { validateUser } from './auth.js';


const form = document.getElementById('login-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = validateUser(username, password);

    if (user) {
        window.location.href = 'admin/dashboard.html';
    } else {
        const errorContainer = document.getElementById('error-container');

        errorContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Usuario o contraseña incorrectos
            </div>
        `;

        setTimeout(() => {
            errorContainer.innerHTML = '';
        }, 3000);
    }
});
