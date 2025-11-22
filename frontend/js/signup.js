// URL base de la API
const URL_API = 'http://localhost:3000';

// Referencias a elementos del DOM
const formularioRegistro = document.getElementById('signupForm');
const inputCorreo = document.getElementById('email');
const inputContrasena = document.getElementById('password');
const inputConfirmarContrasena = document.getElementById('confirmPassword');
const selectSeleccion = document.getElementById('seleccion');
const selectEstadio = document.getElementById('estadio');
const botonRegistro = document.getElementById('signupBtn');
const textoBotonRegistro = document.getElementById('signupBtnText');
const spinnerBotonRegistro = document.getElementById('signupBtnSpinner');
const alertContainer = document.getElementById('alertContainer');

// Cargar datos de selecciones y estadios al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarSelecciones();
    cargarEstadios();
});

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
    inputConfirmarContrasena.classList.remove('is-invalid');
    selectSeleccion.classList.remove('is-invalid');
    selectEstadio.classList.remove('is-invalid');
}

// Evento de submit del formulario
formularioRegistro.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Limpiar errores anteriores
    limpiarErrores();
    limpiarAlerta();
    
    // Validar formulario
    if (!validarFormulario()) {
        return;
    }
    
    // Preparar datos del usuario
    const datosUsuario = {
        correo: inputCorreo.value.trim().toLowerCase(),
        contrasena: inputContrasena.value,
        seleccionFav: selectSeleccion.value,
        estadioFav: selectEstadio.value
    };
    
    // Mostrar icono de carga
    mostrarCarga(true);
    
    try {
        // Registrar usuario
        const resultado = await registrarUsuario(datosUsuario);
        
        // Mostrar mensaje de éxito
        mostrarAlerta('¡Cuenta creada exitosamente! Redirigiendo...', 'success');
        
        // Limpiar formulario
        formularioRegistro.reset();
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        mostrarAlerta(error.message || 'Error al crear la cuenta. Por favor intenta nuevamente.', 'danger');
    } finally {
        mostrarCarga(false);
    }
});

// Función para mostrar/ocultar el spinner de carga
function mostrarCarga(cargando) {
    if (cargando) {
        botonRegistro.disabled = true;
        textoBotonRegistro.classList.add('d-none');
        spinnerBotonRegistro.classList.remove('d-none');
    } else {
        botonRegistro.disabled = false;
        textoBotonRegistro.classList.remove('d-none');
        spinnerBotonRegistro.classList.add('d-none');
    }
}

// Función para cargar selecciones desde la API
async function cargarSelecciones() {
    try {
        const respuesta = await fetch(`${URL_API}/api/selecciones`);
        
        if (!respuesta.ok) {
            throw new Error('Error al cargar las selecciones');
        }
        
        const selecciones = await respuesta.json();
        
        // Agrupar selecciones por confederación
        const seleccionesPorConfederacion = {};
        selecciones.forEach(seleccion => {
            if (!seleccionesPorConfederacion[seleccion.confederacion]) {
                seleccionesPorConfederacion[seleccion.confederacion] = [];
            }
            seleccionesPorConfederacion[seleccion.confederacion].push(seleccion);
        });
        
        // Crear optgroups por confederación
        Object.keys(seleccionesPorConfederacion).forEach(confederacion => {
            const grupo = document.createElement('optgroup');
            grupo.label = confederacion;
            
            seleccionesPorConfederacion[confederacion].forEach(seleccion => {
                const opcion = document.createElement('option');
                opcion.value = seleccion.nombreSeleccion;
                opcion.textContent = seleccion.nombreSeleccion;
                grupo.appendChild(opcion);
            });
            
            selectSeleccion.appendChild(grupo);
        });
        
    } catch (error) {
        console.error('Error al cargar selecciones:', error);
        mostrarAlerta('Error al cargar las selecciones. Por favor recarga la página.', 'warning');
    }
}

// Función para cargar estadios desde la API
async function cargarEstadios() {
    try {
        const respuesta = await fetch(`${URL_API}/api/estadios`);
        
        if (!respuesta.ok) {
            throw new Error('Error al cargar los estadios');
        }
        
        const estadios = await respuesta.json();
        
        // Agrupar estadios por país
        const estadiosPorPais = {};
        estadios.forEach(estadio => {
            if (!estadiosPorPais[estadio.pais]) {
                estadiosPorPais[estadio.pais] = [];
            }
            estadiosPorPais[estadio.pais].push(estadio);
        });
        
        // Crear optgroups por país
        Object.keys(estadiosPorPais).forEach(pais => {
            const grupo = document.createElement('optgroup');
            grupo.label = pais;
            
            estadiosPorPais[pais].forEach(estadio => {
                const opcion = document.createElement('option');
                opcion.value = estadio.nombreEstadio;
                opcion.textContent = `${estadio.nombreEstadio} - ${estadio.ciudad}`;
                grupo.appendChild(opcion);
            });
            
            selectEstadio.appendChild(grupo);
        });
        
    } catch (error) {
        console.error('Error al cargar estadios:', error);
        mostrarAlerta('Error al cargar los estadios. Por favor recarga la página.', 'warning');
    }
}

// Función para validar el formulario
function validarFormulario() {
    const correo = inputCorreo.value.trim();
    const contrasena = inputContrasena.value;
    const confirmarContrasena = inputConfirmarContrasena.value;
    const seleccion = selectSeleccion.value;
    const estadio = selectEstadio.value;

    // Validar que el correo no esté vacío
    if (correo === '') {
        marcarError(inputCorreo);
        mostrarAlerta('Por favor ingresa tu correo electrónico.', 'danger');
        return false;
    }

    // Validar formato de correo
    if (!validarCorreo(correo)) {
        marcarError(inputCorreo);
        mostrarAlerta('Por favor ingresa un correo electrónico válido.', 'danger');
        return false;
    }
    
    // Validar que la contraseña no esté vacía
    if (contrasena === '') {
        marcarError(inputContrasena);
        mostrarAlerta('Por favor ingresa una contraseña.', 'danger');
        return false;
    }
    
    // Validar longitud de contraseña
    if (contrasena.length < 8) {
        marcarError(inputContrasena);
        mostrarAlerta('La contraseña debe tener al menos 8 caracteres.', 'danger');
        return false;
    }

    // Validar complejidad de contraseña
    if (!validarContrasenaRegex(contrasena)) {
        marcarError(inputContrasena);
        mostrarAlerta('La contraseña debe contener al menos: 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.', 'danger');
        return false;
    }
    
    // Validar que las contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
        marcarError(inputConfirmarContrasena);
        mostrarAlerta('Las contraseñas no coinciden.', 'danger');
        return false;
    }
    
    // Validar que la selección no esté vacía
    if (!seleccion) {
        marcarError(selectSeleccion);
        mostrarAlerta('Por favor selecciona una selección favorita.', 'danger');
        return false;
    }
    
    // Validar que el estadio no esté vacío
    if (!estadio) {
        marcarError(selectEstadio);
        mostrarAlerta('Por favor selecciona un estadio favorito.', 'danger');
        return false;
    }
    
    return true;
}

// Función para registrar usuario
async function registrarUsuario(datosUsuario) {
    try {
        const respuesta = await fetch(`${URL_API}/api/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        });
        
        const datos = await respuesta.json();
        
        if (!respuesta.ok) {
            throw new Error(datos.mensaje || 'Error al registrar usuario');
        }
        
        return datos;
        
    } catch (error) {
        throw error;
    }
}

// Función para validar formato de correo electrónico
function validarCorreo(correo) {
    const regexCorreo = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexCorreo.test(correo);
}

// Función para validar complejidad de contraseña
function validarContrasenaRegex(contrasena) {
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regexContrasena.test(contrasena);
}

// Limpiar errores al escribir en los campos
inputCorreo.addEventListener('input', () => {
    inputCorreo.classList.remove('is-invalid');
});

inputContrasena.addEventListener('input', () => {
    inputContrasena.classList.remove('is-invalid');
});

inputConfirmarContrasena.addEventListener('input', () => {
    inputConfirmarContrasena.classList.remove('is-invalid');
});

selectSeleccion.addEventListener('change', () => {
    selectSeleccion.classList.remove('is-invalid');
});

selectEstadio.addEventListener('change', () => {
    selectEstadio.classList.remove('is-invalid');
});