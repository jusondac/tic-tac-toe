import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tic-tac-toe"
export default class extends Controller {
  static targets = ["cell", "currentPlayer"];
  connect() {
    this.currentPlayer = "X"; // Mulai dengan pemain X
    this.board = ["", "", "", "", "", "", "", "", ""]; // Status awal papan permainan
    this.updateCurrentPlayerDisplay();
  }
  
  toggleCurrentPlayer() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  }

  updateCurrentPlayerDisplay() {
    this.currentPlayerTarget.textContent = `Current Player: ${this.currentPlayer}`;
  }

  resetButton(event) {
    this.board = ["","","","","","","","",""];
    // location.reload();
    this.cellTargets.forEach(cell => {
      cell.textContent = "";
    });
  }

  // Menangani klik pada sel papan permainan
  selectCell(event) {
    const index = event.target.dataset.index;
    if (this.board[index] === "") {
      this.board[index] = this.currentPlayer;
      event.target.textContent = this.currentPlayer;
      if (this.checkWinner()) {
        alert(`${this.currentPlayer} WIN!`);
      } else if (!this.board.includes("")) {
        alert("DRAW");
      } else {
        this.toggleCurrentPlayer();
        this.updateCurrentPlayerDisplay();
      }
    }
  }

  // Memeriksa apakah ada pemenang
  checkWinner() {
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikal
      [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        this.board[a] !== "" &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return true;
      }
    }
    return false;
  }
}
