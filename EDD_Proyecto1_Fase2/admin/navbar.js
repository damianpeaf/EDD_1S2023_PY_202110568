import { clearSession } from '../utils/storage-handler.js'

const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", () => {
    clearSession();
    window.location.href = "../index.html";
}); 