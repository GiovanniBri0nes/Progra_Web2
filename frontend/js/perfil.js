// URL base de la API
const URL_API = 'http://localhost:3000';

// Referencias a elementos del DOM
const tituloPerfil = document.getElementById('profileTitle');
const selectSeleccion = document.getElementById('seleccion');
const selectEstadio = document.getElementById('estadio');
const inputContrasena = document.getElementById('userPassword');
const botonGuardar = document.getElementById('saveProfileBtn');
const botonEliminar = document.getElementById('deleteAccountBtn');
const avatarSpinner = document.getElementById('avatarSpinner');
const avatarIcon = document.getElementById('avatarIcon');
const alertContainer = document.getElementById('alertContainer');

// Variables globales
let usuarioActual = null;
let datosOriginales = null;

// Cargar datos al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const autenticado = await verificarAutenticacion();
    if (!autenticado) return;
    
    await cargarSelecciones();
    await cargarEstadios();
    await cargarDatosUsuario();
    configurarDeteccionCambios();
});

// Función para mostrar alertas con estilo
function mostrarAlerta(mensaje, tipo = 'danger') {
    alertContainer.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
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

// Función para limpiar errores
function limpiarErrores() {
    selectSeleccion.classList.remove('is-invalid');
    selectEstadio.classList.remove('is-invalid');
    inputContrasena.classList.remove('is-invalid');
}

// Función para verificar autenticación
async function verificarAutenticacion() {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
        window.location.href = 'login.html?error=token_invalido';
        return false;
    }
    
    try {
        const respuesta = await fetch(`${URL_API}/api/auth/verificar`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!respuesta.ok) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            window.location.href = 'login.html?error=token_invalido';
            return false;
        }
        
        return true;
        
    } catch (error) {
        console.error('Error verificando token:', error);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = 'login.html?error=verificacion_fallida';
        return false;
    }
}

// Función para cargar datos del usuario actual
async function cargarDatosUsuario() {
    try {
        mostrarSpinnerAvatar(true);
        
        const usuarioString = sessionStorage.getItem('user');
        
        if (!usuarioString) {
            mostrarAlerta('Error: No se encontró información del usuario', 'danger');
            window.location.href = 'login.html';
            return;
        }
        
        usuarioActual = JSON.parse(usuarioString);
        const token = sessionStorage.getItem('token');
        
        const respuesta = await fetch(`${URL_API}/api/usuarios/${usuarioActual.correo}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!respuesta.ok) {
            throw new Error('Error al obtener datos del usuario');
        }
        
        const usuario = await respuesta.json();
        usuarioActual = usuario;
        
        tituloPerfil.textContent = usuario.correo || 'Mi Perfil';
        selectSeleccion.value = usuario.seleccionFav || '';
        selectEstadio.value = usuario.estadioFav || '';
        inputContrasena.value = '';
        
        datosOriginales = {
            seleccionFav: usuario.seleccionFav || '',
            estadioFav: usuario.estadioFav || '',
            contrasena: ''
        };
        
        botonGuardar.disabled = true;
        mostrarSpinnerAvatar(false);
        
    } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
        mostrarAlerta('Error al cargar tu perfil. Por favor intenta nuevamente.', 'danger');
        mostrarSpinnerAvatar(false);
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
        
        const seleccionesPorConfederacion = {};
        selecciones.forEach(seleccion => {
            if (!seleccionesPorConfederacion[seleccion.confederacion]) {
                seleccionesPorConfederacion[seleccion.confederacion] = [];
            }
            seleccionesPorConfederacion[seleccion.confederacion].push(seleccion);
        });
        
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
        
        const estadiosPorPais = {};
        estadios.forEach(estadio => {
            if (!estadiosPorPais[estadio.pais]) {
                estadiosPorPais[estadio.pais] = [];
            }
            estadiosPorPais[estadio.pais].push(estadio);
        });
        
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

// Función para configurar la detección de cambios
function configurarDeteccionCambios() {
    selectSeleccion.addEventListener('change', () => {
        selectSeleccion.classList.remove('is-invalid');
        verificarCambios();
    });
    selectEstadio.addEventListener('change', () => {
        selectEstadio.classList.remove('is-invalid');
        verificarCambios();
    });
    inputContrasena.addEventListener('input', () => {
        inputContrasena.classList.remove('is-invalid');
        verificarCambios();
    });
}

// Función para verificar si hay cambios
function verificarCambios() {
    if (!datosOriginales) return;
    
    const haySeleccionCambiada = selectSeleccion.value !== datosOriginales.seleccionFav;
    const hayEstadioCambiado = selectEstadio.value !== datosOriginales.estadioFav;
    const hayContrasenaNueva = inputContrasena.value.trim() !== '';
    
    const hayCambios = haySeleccionCambiada || hayEstadioCambiado || hayContrasenaNueva;
    botonGuardar.disabled = !hayCambios;
}

// Evento para guardar cambios del perfil
botonGuardar.addEventListener('click', async (e) => {
    e.preventDefault();
    
    limpiarErrores();
    limpiarAlerta();
    
    if (!validarCambios()) {
        mostrarAlerta('No hay cambios para guardar.', 'warning');
        return;
    }
    
    const datosActualizados = {};
    
    // Validar contraseña si se ingresó una nueva
    if (inputContrasena.value.trim() !== '') {
        if (inputContrasena.value.length < 8) {
            marcarError(inputContrasena);
            mostrarAlerta('La contraseña debe tener al menos 8 caracteres.', 'danger');
            return;
        }
        
        if (!validarContrasenaRegex(inputContrasena.value)) {
            marcarError(inputContrasena);
            mostrarAlerta('La contraseña debe contener al menos: 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.', 'danger');
            return;
        }
        
        datosActualizados.contrasena = inputContrasena.value;
    }
    
    if (selectSeleccion.value !== datosOriginales.seleccionFav) {
        datosActualizados.seleccionFav = selectSeleccion.value;
    }
    
    if (selectEstadio.value !== datosOriginales.estadioFav) {
        datosActualizados.estadioFav = selectEstadio.value;
    }
    
    mostrarCargaGuardar(true);
    
    try {
        const resultado = await actualizarUsuario(datosActualizados);
        
        usuarioActual = resultado.usuario;
        sessionStorage.setItem('user', JSON.stringify(usuarioActual));
        
        datosOriginales = {
            seleccionFav: resultado.usuario.seleccionFav || '',
            estadioFav: resultado.usuario.estadioFav || '',
            contrasena: ''
        };
        
        mostrarAlerta('¡Perfil actualizado exitosamente!', 'success');
        
        inputContrasena.value = '';
        botonGuardar.disabled = true;
        
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        mostrarAlerta(error.message || 'Error al actualizar el perfil. Por favor intenta nuevamente.', 'danger');
    } finally {
        mostrarCargaGuardar(false);
    }
});

// Modal de confirmación para eliminar cuenta
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

// Evento para mostrar modal de eliminar cuenta
botonEliminar.addEventListener('click', (e) => {
    e.preventDefault();
    deleteModal.show();
});

// Evento para confirmar eliminación de cuenta
confirmDeleteBtn.addEventListener('click', async () => {
    deleteModal.hide();
    mostrarCargaEliminar(true);
    
    try {
        await eliminarUsuario();
        
        mostrarAlerta('Cuenta eliminada exitosamente. Redirigiendo...', 'success');
        
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        
    } catch (error) {
        console.error('Error al eliminar cuenta:', error);
        mostrarAlerta(error.message || 'Error al eliminar la cuenta. Por favor intenta nuevamente.', 'danger');
        mostrarCargaEliminar(false);
    }
});

// Función para mostrar/ocultar spinner en el avatar
function mostrarSpinnerAvatar(mostrar) {
    if (mostrar) {
        avatarSpinner.style.display = 'inline-block';
        avatarIcon.style.display = 'none';
    } else {
        avatarSpinner.style.display = 'none';
        avatarIcon.style.display = 'inline-block';
    }
}

// Función para mostrar/ocultar spinner en botón guardar
function mostrarCargaGuardar(cargando) {
    if (cargando) {
        botonGuardar.disabled = true;
        botonGuardar.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Guardando...';
    } else {
        botonGuardar.innerHTML = 'Guardar Cambios';
    }
}

// Función para mostrar/ocultar spinner en botón eliminar
function mostrarCargaEliminar(cargando) {
    if (cargando) {
        botonEliminar.disabled = true;
        botonEliminar.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Eliminando...';
    } else {
        botonEliminar.disabled = false;
        botonEliminar.innerHTML = 'Eliminar Cuenta';
    }
}

// Función para validar que hay cambios
function validarCambios() {
    if (!datosOriginales) return false;
    
    const haySeleccionCambiada = selectSeleccion.value !== datosOriginales.seleccionFav;
    const hayEstadioCambiado = selectEstadio.value !== datosOriginales.estadioFav;
    const hayContrasenaNueva = inputContrasena.value.trim() !== '';
    
    return haySeleccionCambiada || hayEstadioCambiado || hayContrasenaNueva;
}

// Función para actualizar usuario
async function actualizarUsuario(datosActualizados) {
    try {
        const token = sessionStorage.getItem('token');
        
        const respuesta = await fetch(`${URL_API}/api/usuarios/${usuarioActual.correo}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosActualizados)
        });
        
        const datos = await respuesta.json();
        
        if (!respuesta.ok) {
            throw new Error(datos.mensaje || 'Error al actualizar usuario');
        }
        
        return datos;
        
    } catch (error) {
        throw error;
    }
}

// Función para eliminar usuario
async function eliminarUsuario() {
    try {
        const token = sessionStorage.getItem('token');
        
        const respuesta = await fetch(`${URL_API}/api/usuarios/${usuarioActual.correo}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const datos = await respuesta.json();
        
        if (!respuesta.ok) {
            throw new Error(datos.mensaje || 'Error al eliminar usuario');
        }
        
        return datos;
        
    } catch (error) {
        throw error;
    }
}

// Función para validar contraseña
function validarContrasenaRegex(contrasena) {
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regexContrasena.test(contrasena);
}