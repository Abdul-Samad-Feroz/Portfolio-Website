//var input = prompt("Enter your name")
//console.log(input)

window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('main-portfolio').style.display = 'block';
    }, 3000); // 4500 milliseconds = 4.5 seconds
});