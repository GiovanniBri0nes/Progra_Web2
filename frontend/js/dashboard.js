// URL base de la API
const URL_API = 'http://localhost:3000';

// Verificar autenticación cuando carga el DOM
window.addEventListener('DOMContentLoaded', async () => {
    // Primero verificar autenticación
    const autenticado = await verificarAutenticacion();
    if (!autenticado) {
        return; // Detener ejecución si no está autenticado
    }
    
    // Si está autenticado, continuar mostrando el mensaje de bienvenida
    mostrarMensajeBienvenida();
});

// Función para verificar autenticación
async function verificarAutenticacion() {
    const token = sessionStorage.getItem('token');
    
    // Verificar que exista el token, si no existe redirigir al login
    if (!token) {
        window.location.href = 'login.html?error=token_invalido';
        return false;
    }
    
    // Verificar que el token sea válido con el del servidor
    try {
        const respuesta = await fetch(`${URL_API}/api/auth/verificar`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        // Si el token no es válido, redirigir al login
        if (!respuesta.ok) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            window.location.href = 'login.html?error=token_invalido';
            return false;
        }
        
        return true; // Autenticación exitosa
        
    } catch (error) {
        console.error('Error verificando token:', error);
        // En caso de error, también redirigir al login
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = 'login.html?error=verificacion_fallida';
        return false;
    }
}

// Función para mostrar mensaje de bienvenida personalizado
function mostrarMensajeBienvenida() {
    const usuarioString = sessionStorage.getItem('user');
    const mensajeBienvenida = document.getElementById('welcomeMessage');
    
    if (!mensajeBienvenida) return;
    
    if (usuarioString) {
        try {
            const usuario = JSON.parse(usuarioString);
            const nombreUsuario = usuario.correo || 'Usuario';
            mensajeBienvenida.textContent = `Hola, ${nombreUsuario}! Explora todo sobre el Mundial 2026`;
        } catch (error) {
            mensajeBienvenida.textContent = 'Explora todo sobre el Mundial 2026';
        }
    } else {
        mensajeBienvenida.textContent = 'Explora todo sobre el Mundial 2026';
    }
}

// Función para cerrar sesión
const botonCerrarSesion = document.getElementById('logoutBtn');
if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            window.location.href = 'login.html';
        }
    });
}
