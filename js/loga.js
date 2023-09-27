function startGame() {
    let jogador1 = document.getElementById('jogador1').value;
    let jogador2 = document.getElementById('jogador2').value;

    if (jogador1.trim() === "" || jogador2.trim() === "") {
        alert("Por favor, insira os nomes dos jogadores.");
        return; 
    } else if (jogador1.trim() === jogador2.trim()) {
        alert("Os nomes dos jogadores não podem ser iguais.");
        return; 
    }

    localStorage.setItem('jogador1', jogador1);
    localStorage.setItem('jogador2', jogador2);

    window.location.href = 'game.html';
}
