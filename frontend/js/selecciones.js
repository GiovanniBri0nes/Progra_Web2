// Base de datos de jugadores por selección
const playersData = {
    "Argentina": [
        { nombre: "Emiliano Martínez", posicion: "Portero", numero: 23 },
        { nombre: "Lionel Messi", posicion: "Delantero", numero: 10 },
        { nombre: "Ángel Di María", posicion: "Centrocampista", numero: 11 },
        { nombre: "Lautaro Martínez", posicion: "Delantero", numero: 22 },
        { nombre: "Rodrigo De Paul", posicion: "Centrocampista", numero: 7 },
        { nombre: "Cristian Romero", posicion: "Defensa", numero: 13 },
        { nombre: "Nicolás Otamendi", posicion: "Defensa", numero: 19 },
        { nombre: "Julián Álvarez", posicion: "Delantero", numero: 9 },
        { nombre: "Leandro Paredes", posicion: "Centrocampista", numero: 5 },
        { nombre: "Enzo Fernández", posicion: "Centrocampista", numero: 24 },
        { nombre: "Alexis Mac Allister", posicion: "Centrocampista", numero: 20 }
    ],
    "Brasil": [
        { nombre: "Alisson Becker", posicion: "Portero", numero: 1 },
        { nombre: "Neymar Jr", posicion: "Delantero", numero: 10 },
        { nombre: "Vinícius Jr", posicion: "Delantero", numero: 20 },
        { nombre: "Casemiro", posicion: "Centrocampista", numero: 5 },
        { nombre: "Marquinhos", posicion: "Defensa", numero: 4 },
        { nombre: "Thiago Silva", posicion: "Defensa", numero: 3 },
        { nombre: "Raphinha", posicion: "Centrocampista", numero: 19 },
        { nombre: "Richarlison", posicion: "Delantero", numero: 9 },
        { nombre: "Lucas Paquetá", posicion: "Centrocampista", numero: 8 },
        { nombre: "Éder Militão", posicion: "Defensa", numero: 14 },
        { nombre: "Rodrygo", posicion: "Delantero", numero: 21 }
    ],
    "México": [
        { nombre: "Guillermo Ochoa", posicion: "Portero", numero: 13 },
        { nombre: "Hirving Lozano", posicion: "Delantero", numero: 11 },
        { nombre: "Raúl Jiménez", posicion: "Delantero", numero: 9 },
        { nombre: "Héctor Herrera", posicion: "Centrocampista", numero: 16 },
        { nombre: "Jesús Corona", posicion: "Defensa", numero: 2 },
        { nombre: "Edson Álvarez", posicion: "Centrocampista", numero: 4 },
        { nombre: "César Montes", posicion: "Defensa", numero: 3 },
        { nombre: "Alexis Vega", posicion: "Delantero", numero: 10 },
        { nombre: "Luis Romo", posicion: "Centrocampista", numero: 7 },
        { nombre: "Johan Vásquez", posicion: "Defensa", numero: 5 },
        { nombre: "Santiago Giménez", posicion: "Delantero", numero: 19 }
    ],
    "España": [
        { nombre: "Unai Simón", posicion: "Portero", numero: 23 },
        { nombre: "Pedri", posicion: "Centrocampista", numero: 26 },
        { nombre: "Gavi", posicion: "Centrocampista", numero: 9 },
        { nombre: "Álvaro Morata", posicion: "Delantero", numero: 7 },
        { nombre: "Sergio Busquets", posicion: "Centrocampista", numero: 5 },
        { nombre: "Dani Carvajal", posicion: "Defensa", numero: 2 },
        { nombre: "Aymeric Laporte", posicion: "Defensa", numero: 24 },
        { nombre: "Ferran Torres", posicion: "Delantero", numero: 11 },
        { nombre: "Rodri", posicion: "Centrocampista", numero: 16 },
        { nombre: "Ansu Fati", posicion: "Delantero", numero: 10 },
        { nombre: "Pau Torres", posicion: "Defensa", numero: 4 }
    ],
    "Alemania": [
        { nombre: "Manuel Neuer", posicion: "Portero", numero: 1 },
        { nombre: "Thomas Müller", posicion: "Delantero", numero: 25 },
        { nombre: "Joshua Kimmich", posicion: "Centrocampista", numero: 6 },
        { nombre: "Serge Gnabry", posicion: "Delantero", numero: 10 },
        { nombre: "Leroy Sané", posicion: "Delantero", numero: 19 },
        { nombre: "Antonio Rüdiger", posicion: "Defensa", numero: 2 },
        { nombre: "İlkay Gündoğan", posicion: "Centrocampista", numero: 21 },
        { nombre: "Kai Havertz", posicion: "Delantero", numero: 7 },
        { nombre: "Niklas Süle", posicion: "Defensa", numero: 15 },
        { nombre: "Jamal Musiala", posicion: "Centrocampista", numero: 14 },
        { nombre: "Leon Goretzka", posicion: "Centrocampista", numero: 8 }
    ],
    "Francia": [
        { nombre: "Hugo Lloris", posicion: "Portero", numero: 1 },
        { nombre: "Kylian Mbappé", posicion: "Delantero", numero: 10 },
        { nombre: "Antoine Griezmann", posicion: "Delantero", numero: 7 },
        { nombre: "Paul Pogba", posicion: "Centrocampista", numero: 6 },
        { nombre: "N'Golo Kanté", posicion: "Centrocampista", numero: 13 },
        { nombre: "Raphaël Varane", posicion: "Defensa", numero: 4 },
        { nombre: "Karim Benzema", posicion: "Delantero", numero: 19 },
        { nombre: "Aurélien Tchouaméni", posicion: "Centrocampista", numero: 8 },
        { nombre: "Theo Hernández", posicion: "Defensa", numero: 22 },
        { nombre: "Ousmane Dembélé", posicion: "Delantero", numero: 11 },
        { nombre: "Jules Koundé", posicion: "Defensa", numero: 5 }
    ]
};

// Event listeners para los botones de Ver Jugadores
document.addEventListener('DOMContentLoaded', function() {
    const viewPlayersButtons = document.querySelectorAll('.view-players-btn');
    const playersModal = new bootstrap.Modal(document.getElementById('playersModal'));
    
    viewPlayersButtons.forEach(button => {
        button.addEventListener('click', function() {
            const teamName = this.getAttribute('data-team');
            showPlayers(teamName, playersModal);
        });
    });
});

// Función para mostrar jugadores en el modal
function showPlayers(teamName, modal) {
    const players = playersData[teamName];
    const modalTitle = document.getElementById('playersModalLabel');
    const playersContainer = document.getElementById('playersListContainer');
    
    // Actualizar título del modal
    modalTitle.textContent = `Jugadores de ${teamName}`;
    
    if (players && players.length > 0) {
        // Crear lista de jugadores con estilo de tabla
        let html = '<div class="table-responsive"><table class="table table-hover align-middle text-center">';
        html += '<thead><tr><th class="text-center">Nombre</th></tr></thead>';
        html += '<tbody>';
        
        players.forEach(player => {
            html += `
                <tr>
                    <td><strong>${player.nombre}</strong></td>
                </tr>
            `;
        });
        
        html += '</tbody></table></div>';
        playersContainer.innerHTML = html;
    } else {
        playersContainer.innerHTML = '<p class="text-center text-muted">No hay información de jugadores disponible.</p>';
    }
    
    // Mostrar el modal
    modal.show();
}

