
document.querySelector('.helptext').style.display = 'none';

document.querySelector('.help').addEventListener('mouseover', function() {
  document.querySelector('.helptext').style.display = 'block';
});

document.querySelector('.help').addEventListener('mouseout', function() {
  document.querySelector('.helptext').style.display = 'none';
});



console.log("Test");