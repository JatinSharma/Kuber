const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (board[index] !== '') return;
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} Wins!`);
        resetGame();
        return;
    }

    if (board.every(cell => cell !== '')) {
        alert('Draw!');
        resetGame();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (currentPlayer === 'O') {
        makeRandomMove();
    }
}

function makeRandomMove() {
    let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (availableCells.length === 0) return;

    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].innerText = 'O';

    if (checkWin('O')) {
        alert('O Wins!');
        resetGame();
        return;
    }

    currentPlayer = 'X';
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

function resetGame() {
    board.fill('');
    cells.forEach(cell => {
        cell.innerText = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    currentPlayer = 'X';
}

restartButton.addEventListener('click', resetGame);
