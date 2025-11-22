// URL base de la API
const URL_API = 'http://localhost:3000';

// Referencias a elementos del DOOM
const formularioRegistro = document.getElementById('signupForm');
const inputCorreo = document.getElementById('email');
const inputContrasena = document.getElementById('password');
const inputConfirmarContrasena = document.getElementById('confirmPassword');
const selectSeleccion = document.getElementById('seleccion');
const selectEstadio = document.getElementById('estadio');
const botonRegistro = document.getElementById('signupBtn');
const textoBotonRegistro = document.getElementById('signupBtnText');
const spinnerBotonRegistro = document.getElementById('signupBtnSpinner');

// Cargar datos de selecciones y estadios al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarSelecciones();
    cargarEstadios();
});

// Evento de submit del formulario
formularioRegistro.addEventListener('submit', async (e) => {
    e.preventDefault();
    
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
        alert('¡Cuenta creada exitosamente!');
        
        // Limpiar formulario
        formularioRegistro.reset();
        
        // Redirigir al login
        window.location.href = 'login.html';
        
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert(error.message || 'Error al crear la cuenta. Por favor intenta nuevamente.');
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
        
        // Crear optgroups (grupos de opciones) por confederación
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
        alert('Error al cargar las selecciones. Por favor recarga la página.');
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
        
        // Crear optgroups (grupos de opciones) por país
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
        alert('Error al cargar los estadios. Por favor recarga la página.');
    }
}

// Función para validar el formulario
function validarFormulario() {
    const correo = inputCorreo.value.trim();
    const contrasena = inputContrasena.value;
    const confirmarContrasena = inputConfirmarContrasena.value;
    const seleccion = selectSeleccion.value;
    const estadio = selectEstadio.value;

    // Validar formato de correo
    if (!validarCorreo(correo)) {
        alert('Por favor ingresa un correo electrónico válido');
        return false;
    }
    
    // Validar que la selección no esté vacía
    if (!seleccion) {
        alert('Por favor selecciona una selección');
        return false;
    }
    
    // Validar que el estadio no esté vacío
    if (!estadio) {
        alert('Por favor selecciona un estadio');
        return false;
    }
    
    // Validar longitud de contraseña
    if (contrasena.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres');
        return false;
    }

    // Validar complejidad de contraseña
    if (!validarContrasena(contrasena)) {
        alert('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial');
        return false;
    }
    
    // Validar que las contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden');
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

function validarContrasena(contrasena) {
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regexContrasena.test(contrasena);
}