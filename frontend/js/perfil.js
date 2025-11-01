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

// Variables globales
let usuarioActual = null;
let datosOriginales = null;

// Cargar datos al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    // Primero verificar autenticación
    const autenticado = await verificarAutenticacion();
    if (!autenticado) {
        return; // Detener ejecución si no está autenticado
    }
    
    // Si está autenticado, continuar cargando datos
    await cargarSelecciones();
    await cargarEstadios();
    await cargarDatosUsuario();
    configurarDeteccionCambios();
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

// Función para cargar datos del usuario actual
async function cargarDatosUsuario() {
    try {
        // Mostrar spinner de carga
        mostrarSpinnerAvatar(true);
        
        const usuarioString = sessionStorage.getItem('user');
        
        if (!usuarioString) {
            alert('Error: No se encontró información del usuario');
            window.location.href = 'login.html';
            return;
        }
        
        usuarioActual = JSON.parse(usuarioString);
        const token = sessionStorage.getItem('token');
        
        // Obtener datos del usuario desde la API
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
        
        // Llenar formulario con datos actuales
        tituloPerfil.textContent = usuario.correo || 'Mi Perfil';
        selectSeleccion.value = usuario.seleccionFav || '';
        selectEstadio.value = usuario.estadioFav || '';
        // El campo de contraseña se deja vacío para que el usuario ingrese una nueva
        inputContrasena.value = '';
        
        // Guardar datos originales para comparar cambios
        datosOriginales = {
            seleccionFav: usuario.seleccionFav || '',
            estadioFav: usuario.estadioFav || '',
            contrasena: '' // La contraseña siempre empieza vacía
        };
        
        // Deshabilitar el botón de guardar inicialmente
        botonGuardar.disabled = true;
        
        // Ocultar spinner y mostrar icono
        mostrarSpinnerAvatar(false);
        
    } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
        alert('Error al cargar tu perfil. Por favor intenta nuevamente.');
        // Ocultar spinner incluso si hay error
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

// Función para configurar la detección de cambios en el formulario
function configurarDeteccionCambios() {
    // Detectar cambios en selección favorita
    selectSeleccion.addEventListener('change', verificarCambios);
    
    // Detectar cambios en estadio favorito
    selectEstadio.addEventListener('change', verificarCambios);
    
    // Detectar cambios en contraseña
    inputContrasena.addEventListener('input', verificarCambios);
}

// Función para verificar si hay cambios en el formulario
function verificarCambios() {
    if (!datosOriginales) return;
    
    const haySeleccionCambiada = selectSeleccion.value !== datosOriginales.seleccionFav;
    const hayEstadioCambiado = selectEstadio.value !== datosOriginales.estadioFav;
    const hayContrasenaNueva = inputContrasena.value.trim() !== '';
    
    // Habilitar botón si hay al menos un cambio
    const hayCambios = haySeleccionCambiada || hayEstadioCambiado || hayContrasenaNueva;
    botonGuardar.disabled = !hayCambios;
}

// Evento para guardar cambios del perfil
botonGuardar.addEventListener('click', async (e) => {
    e.preventDefault();
    
    // Validar que haya cambios
    if (!validarCambios()) {
        alert('No hay cambios para guardar');
        return;
    }
    
    // Preparar solo los datos que cambiaron
    const datosActualizados = {};
    
    // Solo incluir contraseña si se ingresó una nueva
    if (inputContrasena.value.trim() !== '') {

        // Validar longitud de contraseña
        if (inputContrasena.value.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        datosActualizados.contrasena = inputContrasena.value;
    }
    
    // Solo incluir selección si cambió
    if (selectSeleccion.value !== datosOriginales.seleccionFav) {
        datosActualizados.seleccionFav = selectSeleccion.value;
    }
    
    // Solo incluir estadio si cambió
    if (selectEstadio.value !== datosOriginales.estadioFav) {
        datosActualizados.estadioFav = selectEstadio.value;
    }
    
    // Mostrar icono de carga
    mostrarCargaGuardar(true);
    
    try {
        // Actualizar usuario
        const resultado = await actualizarUsuario(datosActualizados);
        
        // Actualizar datos en sessionStorage
        usuarioActual = resultado.usuario;
        sessionStorage.setItem('user', JSON.stringify(usuarioActual));
        
        // Actualizar datos originales con los nuevos valores
        datosOriginales = {
            seleccionFav: resultado.usuario.seleccionFav || '',
            estadioFav: resultado.usuario.estadioFav || '',
            contrasena: ''
        };
        
        // Mostrar mensaje de éxito
        alert('¡Perfil actualizado exitosamente!');
        
        // Limpiar campo de contraseña
        inputContrasena.value = '';
        
        // Deshabilitar botón de guardar
        botonGuardar.disabled = true;
        
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        alert(error.message || 'Error al actualizar el perfil. Por favor intenta nuevamente.');
    } finally {
        mostrarCargaGuardar(false);
    }
});

// Evento para eliminar cuenta
botonEliminar.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if (!confirm('¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
        return;
    }
    
    // Mostrar icono de carga
    mostrarCargaEliminar(true);
    
    try {
        // Eliminar usuario
        await eliminarUsuario();
        
        // Mostrar mensaje de éxito
        alert('Cuenta eliminada exitosamente.');
        
        // Limpiar sessionStorage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        
        // Redirigir al login
        window.location.href = 'login.html';
        
    } catch (error) {
        console.error('Error al eliminar cuenta:', error);
        alert(error.message || 'Error al eliminar la cuenta. Por favor intenta nuevamente.');
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

// Función para mostrar/ocultar spinner de carga en botón guardar
function mostrarCargaGuardar(cargando) {
    if (cargando) {
        botonGuardar.disabled = true;
        botonGuardar.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Guardando...';
    } else {
        botonGuardar.innerHTML = 'Guardar Cambios';
    }
}

// Función para mostrar/ocultar spinner de carga en botón eliminar
function mostrarCargaEliminar(cargando) {
    if (cargando) {
        botonEliminar.disabled = true;
        botonEliminar.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Eliminando...';
    } else {
        botonEliminar.disabled = false;
        botonEliminar.innerHTML = 'Darse de Baja';
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
