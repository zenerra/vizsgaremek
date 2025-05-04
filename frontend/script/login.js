function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (!notification) {
        console.error('Notification div not found!');
        return;
    }
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
  
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

document.querySelector('.helptext').style.display = 'none';

document.querySelector('.help').addEventListener('mouseover', function() {
    document.querySelector('.helptext').style.display = 'block';
});

document.querySelector('.help').addEventListener('mouseout', function() {
    document.querySelector('.helptext').style.display = 'none';
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const aazon = form.querySelector('#userid').value;
        
        try {
            const response = await fetch(`/server/alkalmazott/belepes/web/${aazon}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (result.success) {
                window.location.href = '/web/main.html';
            } else {
                showNotification(result.message || 'Érvénytelen felhasználói azonosító!', 'warning');
            }
        } catch (error) {
            showNotification('Hálózati vagy szerver hiba!', 'warning');
        }
    });
});
