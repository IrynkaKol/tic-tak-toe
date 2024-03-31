const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let lastClickedCellIndex = null; // зберігає індекс останньої клітинки, на яку був здійснений клік
let lastPlayer = null; 

function renderBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        cell.innerText = gameBoard[i];
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        lastClickedCellIndex = index; // оновити індекс останньої клітинки
lastPlayer = currentPlayer; // зберегти гравця перед кліком
        renderBoard();
        if (checkWinner()) {
            showModal(`${currentPlayer} wins!`);
            gameActive = false;
        } else if (isBoardFull()) {
            showModal("It's a tie!");
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.innerText = `Current Player: ${currentPlayer}`;
        }
    } else if (index === lastClickedCellIndex && gameActive) {
        gameBoard[index] = ''; // зробити клітинку пустою, якщо на неї клікнули двічі
currentPlayer = lastPlayer; // повернути гравця до попереднього після відміни ходу
        renderBoard();
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    return !gameBoard.includes('');
}

function showModal(message) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <p>${message}</p>
            <button class="btn" onclick="resetGame()">New Game</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.innerText = 'Current Player: X';
    renderBoard();
    // Remove modal if exists
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// HTML код для кнопки "New Game"
resetBtn.addEventListener('click', resetGame);

// Initial setup
renderBoard();
status.innerText = 'Current Player: X';
