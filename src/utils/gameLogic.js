// ========================================
// GAME LOGIC - CÁC HÀM TIỆN ÍCH
// ========================================

/**
 * Kiểm tra người thắng
 * @param {Array} squares - Mảng 9 ô
 * @returns {string|null} - 'X', 'O', hoặc null
 */
export function calculateWinner(squares) {
  // 8 trường hợp thắng có thể
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * Lấy danh sách các ô trống (có thể đánh)
 * @param {Array} squares - Mảng 9 ô
 * @returns {Array} - Mảng index các ô trống
 */
export function getAvailableMoves(squares) {
  const moves = [];
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

/**
 * Kiểm tra game có hòa không
 * @param {Array} squares - Mảng 9 ô
 * @returns {boolean} - true nếu hòa
 */
export function checkDraw(squares) {
  return squares.every(square => square !== null) && !calculateWinner(squares);
}
