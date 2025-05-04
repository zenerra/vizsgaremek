function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
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
            
            if (Array.isArray(result) && result.length === 1 && result[0].awebjog === 1) {
                window.location.href = '/web/main.html';
            } else {
                showNotification('Unrecognized user ID!', 'warning');
            }
        } catch (error) {
            showNotification('Server Error!', 'warning');
        }
    });
});