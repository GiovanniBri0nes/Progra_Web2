// URL base de la API
const URL_API = 'http://localhost:3000';

// Verificar si hay un error de token al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    
    const parametros = new URLSearchParams(window.location.search);
    const error = parametros.get('error');
    
    if (error === 'token_invalido') {
        mostrarAlerta('Tu sesión ha expirado. Por favor inicia sesión nuevamente.', 'warning');
    } 
    else if (error === 'verificacion_fallida') {
        mostrarAlerta('Error al verificar tu sesión. Por favor inicia sesión nuevamente.', 'danger');
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
const alertContainer = document.getElementById('alertContainer');

// Función para mostrar alertas con estilo
function mostrarAlerta(mensaje, tipo = 'danger') {
    alertContainer.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        const alerta = alertContainer.querySelector('.alert');
        if (alerta) {
            alerta.classList.remove('show');
            setTimeout(() => alertContainer.innerHTML = '', 150);
        }
    }, 5000);
}

// Función para limpiar alertas
function limpiarAlerta() {
    alertContainer.innerHTML = '';
}

// Función para marcar campo con error
function marcarError(input) {
    input.classList.add('is-invalid');
}

// Función para limpiar errores de campos
function limpiarErrores() {
    inputCorreo.classList.remove('is-invalid');
    inputContrasena.classList.remove('is-invalid');
}

// Evento de submit del formulario
formularioLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Limpiar errores anteriores
    limpiarErrores();
    limpiarAlerta();
    
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
        mostrarAlerta(error.message || 'Error al iniciar sesión. Por favor intenta nuevamente.', 'danger');
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
    const correo = inputCorreo.value.trim();
    const contrasena = inputContrasena.value;
    let esValido = true;
    
    // Validar que el correo no esté vacío
    if (correo === '') {
        marcarError(inputCorreo);
        mostrarAlerta('Por favor ingresa tu correo electrónico.', 'danger');
        return false;
    }
    
    // Validar formato de correo
    const regexCorreo = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexCorreo.test(correo)) {
        marcarError(inputCorreo);
        mostrarAlerta('Por favor ingresa un correo electrónico válido.', 'danger');
        return false;
    }
    
    // Validar que la contraseña no esté vacía
    if (contrasena === '') {
        marcarError(inputContrasena);
        mostrarAlerta('Por favor ingresa tu contraseña.', 'danger');
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

// Limpiar errores al escribir en los campos
inputCorreo.addEventListener('input', () => {
    inputCorreo.classList.remove('is-invalid');
});

inputContrasena.addEventListener('input', () => {
    inputContrasena.classList.remove('is-invalid');
});