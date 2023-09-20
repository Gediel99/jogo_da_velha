document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const jogador1 = document.getElementById('jogador1').value;
        const jogador2 = document.getElementById('jogador2').value;

        console.log('Jogador 1:', jogador1);
        console.log('Jogador 2:', jogador2);
    });
});
