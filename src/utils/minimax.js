// ========================================
// THUẬT TOÁN MINIMAX - AI CHO TIC-TAC-TOE
// ========================================

import { calculateWinner, getAvailableMoves } from './gameLogic';

/**
 * Thuật toán Minimax - Tìm nước đi tối ưu cho Bot
 * @param {Array} squares - Mảng 9 ô hiện tại
 * @param {boolean} isMaximizing - true = Bot đang tìm nước tốt nhất, false = đối thủ
 * @param {string} botSymbol - Ký hiệu của Bot ('X' hoặc 'O')
 * @param {string} humanSymbol - Ký hiệu của người chơi
 * @returns {number} - Điểm số của trạng thái bàn cờ
 */
function minimax(squares, isMaximizing, botSymbol, humanSymbol) {
  // ĐIỀU KIỆN DỪNG: Kiểm tra kết thúc game
  const winner = calculateWinner(squares);
  
  // Bot thắng → Trả về điểm cao (+10)
  if (winner === botSymbol) {
    return 10;
  }
  
  // Người chơi thắng → Trả về điểm thấp (-10)
  if (winner === humanSymbol) {
    return -10;
  }
  
  // Hòa (hết ô) → Trả về 0
  const availableMoves = getAvailableMoves(squares);
  if (availableMoves.length === 0) {
    return 0;
  }

  // ===== PHẦN ĐỆ QUY =====
  
  if (isMaximizing) {
    // Lượt Bot: Tìm điểm cao nhất
    let bestScore = -Infinity;
    
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      
      // TẠO BẢN SAO mới để tránh mutate
      const newSquares = squares.slice();
      newSquares[move] = botSymbol;
      
      // Gọi đệ quy cho lượt đối thủ
      const score = minimax(newSquares, false, botSymbol, humanSymbol);
      
      // Lấy điểm cao nhất
      bestScore = Math.max(score, bestScore);
    }
    
    return bestScore;
    
  } else {
    // Lượt người chơi: Tìm điểm thấp nhất
    let bestScore = Infinity;
    
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      
      // TẠO BẢN SAO mới để tránh mutate
      const newSquares = squares.slice();
      newSquares[move] = humanSymbol;
      
      // Gọi đệ quy cho lượt Bot
      const score = minimax(newSquares, true, botSymbol, humanSymbol);
      
      // Lấy điểm thấp nhất
      bestScore = Math.min(score, bestScore);
    }
    
    return bestScore;
  }
}

/**
 * Tìm nước đi tốt nhất cho Bot
 * @param {Array} squares - Mảng 9 ô hiện tại
 * @param {string} botSymbol - Ký hiệu của Bot
 * @param {string} humanSymbol - Ký hiệu của người chơi
 * @returns {number} - Index của ô tốt nhất (0-8)
 */
export function getBestMove(squares, botSymbol, humanSymbol) {
  console.log('🤖 Bot bắt đầu tính toán...');
  const startTime = Date.now();
  
  let bestScore = -Infinity;
  let bestMove = null;
  
  const availableMoves = getAvailableMoves(squares);
  console.log('📋 Số nước đi khả dụng:', availableMoves.length);
  
  // Tối ưu: Nếu bàn cờ trống, chọn ô giữa
  if (availableMoves.length === 9) {
    console.log('✅ Bàn cờ trống, chọn ô giữa (4)');
    return 4;
  }
  
  // Duyệt qua tất cả nước đi có thể
  for (let i = 0; i < availableMoves.length; i++) {
    const move = availableMoves[i];
    
    // TẠO BẢN SAO để tránh mutate
    const newSquares = squares.slice();
    newSquares[move] = botSymbol;
    
    // Tính điểm của nước đi này
    const score = minimax(newSquares, false, botSymbol, humanSymbol);
    
    console.log(`  Ô ${move}: điểm = ${score}`);
    
    // Cập nhật nước đi tốt nhất
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  
  const endTime = Date.now();
  console.log(`✅ Bot chọn ô ${bestMove} (điểm: ${bestScore}) - Thời gian: ${endTime - startTime}ms`);
  
  return bestMove;
}
