import ReactDOM from 'react-dom/client'
import React from 'react';
import Hello from './page/hello';
const Game = ()=> {
    return (
      <div className="game">
        <div className="game-board">
        </div>
        <div className="game-info">
          <div>1{/* status */}</div>
          <ol>4{/* TODO */}</ol>
          <Hello name="hello 廖龙飞"></Hello>
        </div>
      </div>
    );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
