import React from 'react';
import Square from './square';
import '../styles/Board.css';

// Component Board nhận 2 props:
// - squares: mảng 9 phần tử chứa trạng thái của bàn cờ
// - onClick: hàm xử lý khi click vào ô
function Board({ squares, onClick }) {
  
  // Hàm render 1 ô vuông với index i
  const renderSquare = (i) => {
    return (
      <Square 
        value={squares[i]} 
        onClick={() => onClick(i)} 
      />
    );
  };

  return (
    <div className="board">
      {/* Hàng 1 */}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      {/* Hàng 2 */}
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      {/* Hàng 3 */}
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default Board;