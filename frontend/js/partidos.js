// Equipos inventados para asignar a los partidos
const equiposPartidos = [
    // Fase de Grupos (anfitriones separados)
    'México vs Irán', 'México vs Egipto', 'México vs Túnez',
    'Canadá vs Japón', 'Canadá vs Corea del Sur', 'Canadá vs Australia',
    'Estados Unidos vs Marruecos', 'Estados Unidos vs Nueva Zelanda', 'Estados Unidos vs Ecuador',
    'Argentina vs Francia', 'Argentina vs Paraguay', 'Argentina vs Portugal',
    'Brasil vs España', 'Brasil vs Alemania', 'Brasil vs Uruguay',
    'Inglaterra vs Colombia', 'Inglaterra vs Japón', 'Inglaterra vs Irán',
    'Francia vs Corea del Sur', 'Alemania vs Marruecos', 'España vs Australia',
    'Portugal vs Uruguay', 'Colombia vs Egipto', 'Paraguay vs Túnez',
    // Eliminatorias
    'Argentina vs Australia', 'Brasil vs Corea del Sur', 'Francia vs México', 'España vs Marruecos',
    'Argentina vs Portugal', 'Brasil vs Francia', 'Alemania vs Inglaterra', 'España vs Colombia',
    'Argentina vs Brasil', 'España vs Alemania', 'Brasil vs Alemania', 'Argentina vs España'
];

document.addEventListener('DOMContentLoaded', () => {
    cargarPartidos();
});

async function cargarPartidos() {
    try {
        const token = sessionStorage.getItem('token');

        const respuesta = await fetch(`${URL_API}/api/partidos`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!respuesta.ok) {
            throw new Error('Error al cargar los partidos');
        }

        const partidos = await respuesta.json();
        
        // Ordenar partidos por fecha
        partidos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        
        mostrarPartidos(partidos);

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('partidosContainer').innerHTML = 
            '<p class="text-center text-danger">Error al cargar los partidos.</p>';
    }
}

function mostrarPartidos(partidos) {
    const container = document.getElementById('partidosContainer');

    if (partidos.length === 0) {
        container.innerHTML = '<p class="text-center">No hay partidos disponibles.</p>';
        return;
    }

    container.innerHTML = partidos.map((partido, index) => {
        // Asignar equipos inventados según el índice
        const equipos = equiposPartidos[index % equiposPartidos.length];
        
        // Asignar color de badge según la fase
        let badgeClass = 'bg-success';
        let esFinal = false;
        
        if (partido.fase === 'Grupos') {
            badgeClass = 'bg-success';
        } else if (partido.fase === 'Eliminatorias') {
            badgeClass = 'bg-warning text-dark';
        } else if (partido.fase === 'Final') {
            badgeClass = 'bg-danger';
            esFinal = true;
        }

        // Formatear la fecha
        const fechaFormateada = formatearFecha(partido.fecha);

        return `
            <div class="col-md-6 col-lg-4">
                <div class="card match-card h-100 ${esFinal ? 'final-match' : ''}">
                    <div class="card-body">
                        <div class="match-teams mb-3">
                            <h4 class="text-center mb-0">${esFinal ? '🏆 ' : ''}${equipos}</h4>
                        </div>
                        <div class="match-info">
                            <p class="mb-2"><strong>Fase:</strong> <span class="badge ${badgeClass}">${partido.fase}</span></p>
                            <p class="mb-2"><strong>Fecha:</strong> ${fechaFormateada}</p>
                            <p class="mb-2"><strong>Estadio:</strong> ${partido.estadio}</p>
                        </div>
                        <hr>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const opciones = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
    };
    return fecha.toLocaleDateString('es-ES', opciones);
}