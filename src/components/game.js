import React, { useState, useEffect } from 'react';
import Board from './board';
import '../styles/Game.css';
import { calculateWinner, checkDraw } from '../utils/gameLogic';
import { getBestMove } from '../utils/minimax';

function Game() {
  // State: mảng 9 ô, ban đầu đều null
  const [squares, setSquares] = useState(Array(9).fill(null));
  
  // State: theo dõi lượt chơi (true = X, false = O)
  const [xIsNext, setXIsNext] = useState(true);
  
  // State: Chế độ chơi ('pvp' hoặc 'pvbot')
  const [gameMode, setGameMode] = useState('pvp');
  
  // State: Người chơi là X hay O (khi chơi với bot)
  const [humanSymbol, setHumanSymbol] = useState('X');
  const botSymbol = humanSymbol === 'X' ? 'O' : 'X';

  // Effect: Bot tự động đánh khi đến lượt
  useEffect(() => {
    // Điều kiện: Chế độ bot, lượt bot, chưa kết thúc
    const isBotTurn = (xIsNext && botSymbol === 'X') || (!xIsNext && botSymbol === 'O');
    const gameEnded = calculateWinner(squares) || checkDraw(squares);
    
    if (gameMode === 'pvbot' && isBotTurn && !gameEnded) {
      // Delay 500ms để tự nhiên hơn
      const timer = setTimeout(() => {
        const boardCopy = squares.slice();
        const bestMove = getBestMove(boardCopy, botSymbol, humanSymbol);
        
        if (bestMove !== null && bestMove !== undefined) {
          const newSquares = squares.slice();
          newSquares[bestMove] = botSymbol;
          setSquares(newSquares);
          setXIsNext(!xIsNext);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [squares, xIsNext, gameMode]);

  // Hàm xử lý khi click vào ô thứ i
  const handleClick = (i) => {
    // Tạo bản sao của mảng squares
    const newSquares = squares.slice();
    
    // Nếu đã có người thắng hoặc ô đã được đánh, return
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    
    // Nếu đang chơi với bot và đang là lượt bot, không cho click
    if (gameMode === 'pvbot' && 
        ((xIsNext && botSymbol === 'X') || (!xIsNext && botSymbol === 'O'))) {
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
  
  // Hàm chuyển đổi chế độ chơi
  const toggleGameMode = (mode) => {
    setGameMode(mode);
    resetGame();
  };
  
  // Hàm chọn ký hiệu cho người chơi
  const selectSymbol = (symbol) => {
    setHumanSymbol(symbol);
    setXIsNext(true);
    resetGame();
  };

  // Kiểm tra người thắng
  const winner = calculateWinner(squares);
  
  // Xác định status hiển thị
  let status;
  if (winner) {
    if (gameMode === 'pvbot') {
      status = winner === humanSymbol ? '🎉 Bạn thắng!' : '🤖 Bot thắng!';
    } else {
      status = `🏆 Người thắng: ${winner}`;
    }
  } else if (checkDraw(squares)) {
    status = '🤝 Hòa!';
  } else {
    if (gameMode === 'pvbot') {
      const isHumanTurn = (xIsNext && humanSymbol === 'X') || (!xIsNext && humanSymbol === 'O');
      status = isHumanTurn ? '👤 Lượt của bạn' : '🤖 Bot đang suy nghĩ...';
    } else {
      status = `Lượt tiếp theo: ${xIsNext ? 'X' : 'O'}`;
    }
  }

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      
      {/* Chọn chế độ chơi */}
      <div className="game-mode-selector">
        <button 
          className={`mode-button ${gameMode === 'pvp' ? 'active' : ''}`}
          onClick={() => toggleGameMode('pvp')}
        >
          👥 Người vs Người
        </button>
        <button 
          className={`mode-button ${gameMode === 'pvbot' ? 'active' : ''}`}
          onClick={() => toggleGameMode('pvbot')}
        >
          🤖 Người vs Bot
        </button>
      </div>
      
      {/* Chọn X hoặc O khi chơi với bot */}
      {gameMode === 'pvbot' && (
        <div className="symbol-selector">
          <span>Chọn ký hiệu của bạn:</span>
          <button 
            className={`symbol-button ${humanSymbol === 'X' ? 'active' : ''}`}
            onClick={() => selectSymbol('X')}
          >
            X
          </button>
          <button 
            className={`symbol-button ${humanSymbol === 'O' ? 'active' : ''}`}
            onClick={() => selectSymbol('O')}
          >
            O
          </button>
        </div>
      )}
      
      <div className="status">{status}</div>
      <Board squares={squares} onClick={handleClick} />
      <button className="reset-button" onClick={resetGame}>
        🔄 Chơi lại
      </button>
    </div>
  );
}

export default Game;