// Verificar autenticación al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    displayWelcomeMessage();
});

// Función para verificar autenticación
function checkAuth() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (!token) {
        // Crear sesión automática para desarrollo
        console.log('No hay sesión, creando sesión automática...');
        const demoUser = {
            nombre: 'Invitado',
            email: 'invitado@mundial2026.com'
        };
        localStorage.setItem('token', 'demo-token-auto');
        localStorage.setItem('user', JSON.stringify(demoUser));
    }
    
    console.log('Usuario autenticado');
}

// Función para mostrar mensaje de bienvenida personalizado
function displayWelcomeMessage() {
    const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
    const welcomeMessage = document.getElementById('welcomeMessage');
    
    if (!welcomeMessage) return;
    
    if (userString) {
        try {
            const user = JSON.parse(userString);
            const userName = user.nombre || user.name || user.email || 'Usuario';
            welcomeMessage.textContent = `Hola, ${userName}! Explora todo sobre el Mundial 2026`;
        } catch (error) {
            welcomeMessage.textContent = 'Explora todo sobre el Mundial 2026';
        }
    } else {
        welcomeMessage.textContent = 'Explora todo sobre el Mundial 2026';
    }
}

// Función para cerrar sesión
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            
            window.location.href = 'login.html';
        }
    });
}


