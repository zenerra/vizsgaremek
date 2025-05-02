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
            console.log(`Fetching /server/alkalmazott/belepes/web/${aazon}`);
            const response = await fetch(`/server/alkalmazott/belepes/web/${aazon}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log(`Response status: ${response.status}`);
            const result = await response.json();
            console.log('RESULT:', result);
            
            if (response.ok && result.success) {
                console.log("Beleptel!");
                window.location.href = '/web/main.html';
            } else {
                console.log('Login failed:', { status: response.status, result });
                showNotification(result.message || 'Érvénytelen felhasználói azonosító!', 'warning');
            }
        } catch (error) {
            console.error('Bejelentkezési hiba:', error);
            showNotification('Hálózati vagy szerver hiba!', 'warning');
        }
    });
});