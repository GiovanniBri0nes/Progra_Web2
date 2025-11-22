document.addEventListener('DOMContentLoaded', () => {
    cargarEstadios();
});

async function cargarEstadios() {
    try {
        const token = sessionStorage.getItem('token');

        const respuesta = await fetch(`${URL_API}/api/estadios`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!respuesta.ok) {
            throw new Error('Error al cargar los estadios');
        }

        const estadios = await respuesta.json();
        mostrarEstadios(estadios);

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('estadiosContainer').innerHTML = 
            '<p class="text-center text-danger">Error al cargar los estadios.</p>';
    }
}

function mostrarEstadios(estadios) {
    const container = document.getElementById('estadiosContainer');

    if (estadios.length === 0) {
        container.innerHTML = '<p class="text-center">No hay estadios disponibles.</p>';
        return;
    }

    container.innerHTML = estadios.map(estadio => {
        // Asignar color de badge según el país
        let badgeClass = 'bg-primary';
        let bandera = '🏟️';
        
        if (estadio.pais === 'México') {
            badgeClass = 'bg-success';
            bandera = '🇲🇽';
        } else if (estadio.pais === 'Estados Unidos') {
            badgeClass = 'bg-primary';
            bandera = '🇺🇸';
        } else if (estadio.pais === 'Canadá') {
            badgeClass = 'bg-danger';
            bandera = '🇨🇦';
        }

        return `
            <div class="col-md-6 col-lg-4">
                <div class="card stadium-card h-100">
                    <div class="card-body">
                        <h3 class="card-title mb-3">${estadio.nombreEstadio}</h3>
                        <div class="stadium-info">
                            <p class="mb-2"><strong>País:</strong> <span class="badge ${badgeClass}">${bandera} ${estadio.pais}</span></p>
                            <p class="mb-2"><strong>Ciudad:</strong> ${estadio.ciudad}</p>
                            <p class="mb-2"><strong>Capacidad:</strong> <span class="capacity-badge">${estadio.capacidad.toLocaleString()} personas</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}