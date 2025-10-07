import React from 'react';
import './square.css';

// Component Square nhận 2 props:
// - value: giá trị hiển thị ('X', 'O', hoặc null)
// - onClick: hàm xử lý khi click vào ô
function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;