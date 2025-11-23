// Script para manejar el cierre de sesión con modal
document.addEventListener('DOMContentLoaded', () => {
    // Crear el modal dinámicamente
    const modalHTML = `
        <div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-warning">
                        <h5 class="modal-title" id="logoutModalLabel">🚪 Cerrar Sesión</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>¿Estás seguro que deseas cerrar sesión?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" id="confirmLogoutBtn">Sí, cerrar sesión</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Agregar el modal al body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Referencias
    const logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
    const botonCerrarSesion = document.getElementById('logoutBtn');
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');
    
    // Evento para mostrar modal
    if (botonCerrarSesion) {
        botonCerrarSesion.addEventListener('click', (e) => {
            e.preventDefault();
            logoutModal.show();
        });
    }
    
    // Evento para confirmar cierre de sesión
    if (confirmLogoutBtn) {
        confirmLogoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            window.location.href = 'login.html';
        });
    }
});