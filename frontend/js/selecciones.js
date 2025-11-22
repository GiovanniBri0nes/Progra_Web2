document.addEventListener('DOMContentLoaded',()=>{
    cargarSelecciones();
});

// Función para cargar las selecciones desde la API
async function cargarSelecciones(){
    try{
        const token = sessionStorage.getItem('token');
        const respuesta = await fetch(`${URL_API}/api/selecciones`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if(!respuesta.ok){
            throw new Error('Error al cargar las selecciones');
        }

        const selecciones = await respuesta.json();

        selecciones.sort((a, b) => a.nombreSeleccion.localeCompare(b.nombreSeleccion));

        mostrarSelecciones(selecciones);
    } catch(error){
        console.error('Error:', error);
        document.getElementById('seleccionesContainer').innerHTML = '<p class="text-center text-danger">Error al cargar las selecciones.</p>';
    }
}

// Función para mostrar las selecciones
function mostrarSelecciones(selecciones){
    const container = document.getElementById('seleccionesContainer');

    if(selecciones.length === 0){
        container.innerHTML = '<p class="text-center">No hay selecciones disponibles.</p>';
        return;
    }

    container.innerHTML= selecciones.map(seleccion => `
        <div class="col-md-6 col-lg-4">
            <div class="card team-card h-100">
                <div class="card-body">
                    <h3 class="card-title mb-3">${seleccion.nombreSeleccion}</h3>
                    <div class="team-info mb-3">
                        <p class="mb-2"><strong>Confederación:</strong> ${seleccion.confederacion}</p>
                    </div>
                    <hr>
                    <div class="d-grid">
                        <button class="btn btn-alt view-players-btn" data-team="${seleccion.nombreSeleccion}">Ver Jugadores</button>
                    </div>
                </div>
            </div>
        </div>`).join('');

    // Agregar los eventos a los botones de ver jugadores
    document.querySelectorAll('.view-players-btn').forEach(boton =>{
        boton.addEventListener('click', ()=>{
            const nombreSeleccion = boton.getAttribute('data-team');
            cargarJugadores(nombreSeleccion);
        });
    });
}

// Función para cargar los jugadores 
async function cargarJugadores(nombreSeleccion){
    try{
        const token = sessionStorage.getItem('token');
        const container = document.getElementById('playersListContainer');

        // Mostrar loading en el modal
        document.getElementById('playersModalLabel').textContent = `Jugadores de ${nombreSeleccion}`;
        container.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
            </div>
        `;

        // Abrir el modal mientras se cargan los datos
        const modal = new bootstrap.Modal(document.getElementById('playersModal'));
        modal.show();

        const respuesta = await fetch(`${URL_API}/api/selecciones/${encodeURIComponent(nombreSeleccion)}/jugadores`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if(!respuesta.ok){
            throw new Error('Error al cargar los jugadores');
        }

        const jugadores = await respuesta.json();
        mostrarJugadoresEnModal(jugadores);
    } catch(error){
        console.error('Error:', error);
        document.getElementById('playersListContainer').innerHTML = '<p class="text-danger">Error al cargar los jugadores.</p>';
    }
}

// Función para mostrar los jugadores en el modal
function mostrarJugadoresEnModal(jugadores){
    const container = document.getElementById('playersListContainer');

    if(jugadores.length === 0){
        container.innerHTML = '<p class="text-muted">No hay jugadores disponibles para esta selección.</p>';
        return;
    }

    container.innerHTML = `
        <ul class="list-group">
            ${jugadores.map(jugador => `
                <li class="list-group-item">${jugador.nombreJugador}</li>
            `).join('')}
        </ul>
    `;
}