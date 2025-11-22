// URL base de la API
const URL_API = 'http://localhost:3000';

// Verificar si hay un error de token al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    
    const parametros = new URLSearchParams(window.location.search);
    const error = parametros.get('error');
    
    if (error === 'token_invalido') {
        alert('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
    } 
    else if (error === 'verificacion_fallida') {
        alert('Error al verificar tu sesión. Por favor inicia sesión nuevamente.');
    }
    
    // Limpiar la URL para que no vuelva a mostrar el error al recargar
    window.history.replaceState({}, document.title, window.location.pathname);
});

// Referencias a elementos del DOM
const formularioLogin = document.getElementById('loginForm');
const inputCorreo = document.getElementById('email');
const inputContrasena = document.getElementById('password');
const botonLogin = document.getElementById('loginBtn');
const textoBotonLogin = document.getElementById('loginBtnText');
const spinnerBotonLogin = document.getElementById('loginBtnSpinner');

// Evento de submit del formulario
formularioLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validar formulario
    if (!validarFormulario()) {
        return;
    }
    
    // Preparar datos del usuario
    const datosLogin = {
        correo: inputCorreo.value.trim().toLowerCase(),
        contrasena: inputContrasena.value
    };
    
    // Mostrar icono de carga
    mostrarCarga(true);
    
    try {
        // Autenticar usuario
        const resultado = await autenticarUsuario(datosLogin);
        
        // Guardar token y datos del usuario en sessionStorage
        sessionStorage.setItem('token', resultado.token);
        sessionStorage.setItem('user', JSON.stringify(resultado.usuario));
    

        // Redirigir al dashboard
        window.location.href = 'dashboard.html';
        
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert(error.message || 'Error al iniciar sesión. Por favor intenta nuevamente.');
    } finally {
        mostrarCarga(false);
    }
});

// Función para mostrar/ocultar el spinner de carga
function mostrarCarga(cargando) {
    if (cargando) {
        botonLogin.disabled = true;
        textoBotonLogin.classList.add('d-none');
        spinnerBotonLogin.classList.remove('d-none');
    } else {
        botonLogin.disabled = false;
        textoBotonLogin.classList.remove('d-none');
        spinnerBotonLogin.classList.add('d-none');
    }
}

// Función para validar el formulario
function validarFormulario() {
    const correo = inputCorreo.value.trim().toLowerCase();
    const contrasena = inputContrasena.value;
    
    // Validar que ambos campos no estén vacíos
    if (correo === '' || contrasena === '') {
        alert('Por favor completa todos los campos.');
        return false;
    }
    
    return true;
}

// Función para autenticar usuario
async function autenticarUsuario(datosLogin) {
    try {
        const respuesta = await fetch(`${URL_API}/api/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosLogin)
        });
        
        const datos = await respuesta.json();
        
        if (!respuesta.ok) {
            throw new Error(datos.mensaje || 'Error al iniciar sesión');
        }
        
        return datos;
        
    } catch (error) {
        throw error;
    }
}
