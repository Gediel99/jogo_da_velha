let player1Wins = 0;
let player2Wins = 0;
back();

document.addEventListener('DOMContentLoaded', function() {
    // Configure os nomes dos jogadores
    document.getElementById('player1Name').textContent = localStorage.getItem('jogador1');
    document.getElementById('player2Name').textContent = localStorage.getItem('jogador2');

    // Adicione event listeners para os elementos
    const elementos = document.getElementsByClassName('element');
    for (const elemento of elementos) {
        elemento.addEventListener('click', function() {
            realizarJogada(elemento);
        });
    }

    const resetJogo = document.getElementById('resetJogo');
    resetJogo.addEventListener('click', function() {
        reiniciarJogo();
    });

    startGame();
});


function back() {
    const back = document.getElementById('trocarNick');
    back.addEventListener('click', function() {
        window.location.href = 'login.html';
    });
}

function realizarJogada(elemento) {
    if (elemento.innerHTML === "" && elemento.dataset.clicado !== "true" && !document.vencedor) {
        const divImagem = document.createElement('div');
        divImagem.classList.add('imagem');

        const imagemElement = document.createElement('img');
        imagemElement.src = `../img/${document.turn}.svg`;
        imagemElement.alt = document.turn;

        divImagem.appendChild(imagemElement);

        elemento.innerHTML = '';
        elemento.appendChild(divImagem);
        elemento.dataset.clicado = "true";

        changePlayer();

        const resultado = verificarVencedor();
        if (resultado) {
            document.vencedor = resultado;
            exibirMensagemVitoria(resultado);
        }
    }
}


function changePlayer() {
    const player1Turn = document.getElementById('player1Turn');
    const player2Turn = document.getElementById('player2Turn');

    if (document.turn === 'X') {
        document.turn = 'O';
    } else {
        document.turn = 'X';
    }

    player1Turn.textContent = document.turn === 'X' ? 'Sua vez' : '';
    player2Turn.textContent = document.turn === 'O' ? 'Sua vez' : '';
}


function atribuirSimbolos() {
    const jogadores = ["player1", "player2"];
    const simbolos = ["X", "O"];

    const imagemElementPlayer1 = document.getElementById(jogadores[0] + "Turn").querySelector('.imagem img');
    const imagemElementPlayer2 = document.getElementById(jogadores[1] + "Turn").querySelector('.imagem img');
}



function verificarVencedor() {
    const vitorias = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]             // Diagonal
    ];

    for (const vitoria of vitorias) {
        const [a, b, c] = vitoria;

        const elementoA = document.getElementById(`element-${a}`);
        const elementoB = document.getElementById(`element-${b}`);
        const elementoC = document.getElementById(`element-${c}`);

        const imagemA = elementoA.querySelector('.imagem img');
        const imagemB = elementoB.querySelector('.imagem img');
        const imagemC = elementoC.querySelector('.imagem img');
        

        if (imagemA && imagemB && imagemC) {
            const altA = imagemA.getAttribute('alt');
            const altB = imagemB.getAttribute('alt');
            const altC = imagemC.getAttribute('alt');

            if (altA === altB && altB === altC) {
                return altA;
            }
        }
    }

    const todosPreenchidos = Array.from(document.getElementsByClassName('element')).every(element => {
        const imagem = element.querySelector('.imagem img');
        return imagem && imagem.getAttribute('alt') !== "";
    });

    if (todosPreenchidos) {
        return "empate";
    }

    return null;
}



function exibirMensagemVitoria(resultado) {
    const overlay = document.getElementById('overlay');
    const mensagemTitulo = document.getElementById('mensagemTitulo');
    const fecharMensagem = document.getElementById('fecharMensagem');
    let vencedorNome;

    if (resultado === "empate") {
        mensagemTitulo.innerHTML = "Empate!";
        vencedorNome = "Empate";
    } else {
        vencedorNome = resultado === "X" ? localStorage.getItem('jogador1') : localStorage.getItem('jogador2');
        mensagemTitulo.innerHTML = `${vencedorNome} venceu!`;
        
        if(resultado === "X") {
            player1Wins = player1Wins + 1;
            document.getElementById('player1Wins').textContent = player1Wins;
        } else {
            player2Wins = player2Wins + 1;
            document.getElementById('player2Wins').textContent = player2Wins;
        }
    }

    overlay.style.display = 'flex';

    fecharMensagem.addEventListener('click', function() {
        overlay.style.display = 'none';
        jogarNovamente();
    });
}

function reiniciarPontuacao() {
    player1Wins = 0;
    player2Wins = 0;
    document.getElementById('player1Wins').textContent = player1Wins;
    document.getElementById('player2Wins').textContent = player2Wins;
}

function jogarNovamente() {
    reiniciarTabuleiro();
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

function reiniciarTabuleiro() {
    const elementos = document.getElementsByClassName('element');
    for (const elemento of elementos) {
        elemento.textContent = "";
        elemento.dataset.clicado = "false"; // Resetar o atributo 'clicado'
    }

    document.turn = 'X';
    atribuirSimbolos();

    const player1Turn = document.getElementById('player1Turn');
    const player2Turn = document.getElementById('player2Turn');
    player1Turn.textContent = 'Sua vez';
    player2Turn.textContent = '';

    document.vencedor = null;
}

function reiniciarJogo() {
    const elementos = document.getElementsByClassName('element');
    for (const elemento of elementos) {
        elemento.textContent = "";
        elemento.dataset.clicado = "false"; // Resetar o atributo 'clicado'
    }

    document.turn = 'X';
    atribuirSimbolos();

    const player1Turn = document.getElementById('player1Turn');
    const player2Turn = document.getElementById('player2Turn');
    player1Turn.textContent = 'Sua vez';
    player2Turn.textContent = '';

    document.vencedor = null;

    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    
    //Reseta a pontuação
    reiniciarPontuacao();
}

window.onload = function() {
    startGame();
};

function startGame() {
    reiniciarTabuleiro();
    document.turn = 'X';
    atribuirSimbolos();
    document.vencedor = null;
    const divVencedor = document.getElementById('vencedor');
}

startGame();
