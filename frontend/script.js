console.log('A szerver aktiv a http://localhost:3000 porton.');

document.querySelector('.helptext').style.display = 'none';

document.querySelector('.help').addEventListener('mouseover', function() {
  document.querySelector('.helptext').style.display = 'block';
});

document.querySelector('.help').addEventListener('mouseout', function() {
  document.querySelector('.helptext').style.display = 'none';
});


