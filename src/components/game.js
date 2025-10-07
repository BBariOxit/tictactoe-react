import React, { useState } from 'react';
import Board from './board';
import '../styles/Game.css';

function Game() {
  // State: mảng 9 ô, ban đầu đều null
  const [squares, setSquares] = useState(Array(9).fill(null));
  
  // State: theo dõi lượt chơi (true = X, false = O)
  const [xIsNext, setXIsNext] = useState(true);

  // Hàm xử lý khi click vào ô thứ i
  const handleClick = (i) => {
    // Tạo bản sao của mảng squares
    const newSquares = squares.slice();
    
    // Nếu đã có người thắng hoặc ô đã được đánh, return
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    
    // Đánh dấu X hoặc O
    newSquares[i] = xIsNext ? 'X' : 'O';
    
    // Cập nhật state
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  // Hàm reset game
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // Kiểm tra người thắng
  const winner = calculateWinner(squares);
  
  // Xác định status hiển thị
  let status;
  if (winner) {
    status = `Người thắng: ${winner}`;
  } else if (squares.every(square => square !== null)) {
    status = 'Hòa!';
  } else {
    status = `Lượt tiếp theo: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">{status}</div>
      <Board squares={squares} onClick={handleClick} />
      <button className="reset-button" onClick={resetGame}>
        Chơi lại
      </button>
    </div>
  );
}

// Hàm tính toán người thắng
function calculateWinner(squares) {
  // Tất cả các tổ hợp thắng có thể
  const lines = [
    [0, 1, 2], // Hàng 1
    [3, 4, 5], // Hàng 2
    [6, 7, 8], // Hàng 3
    [0, 3, 6], // Cột 1
    [1, 4, 7], // Cột 2
    [2, 5, 8], // Cột 3
    [0, 4, 8], // Chéo chính
    [2, 4, 6], // Chéo phụ
  ];

  // Duyệt qua từng tổ hợp
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Nếu 3 ô giống nhau và khác null => có người thắng
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;