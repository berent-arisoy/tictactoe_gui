import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CellValue } from "../types/game";

interface GameBoardProps {
  board: CellValue[];
  onCellClick: (index: number) => void;
  winningCells: number[];
  disabled: boolean;
}

/**
 * GameBoard component renders the 3x3 tic-tac-toe grid
 * Handles cell interactions and visual feedback for winning combinations
 * 
 * Features:
 * - 3x3 grid layout with responsive design
 * - Visual highlighting of winning cells
 * - Hover effects for better user experience
 * - Disabled state when game is over
 */
const GameBoard = ({ board, onCellClick, winningCells, disabled }: GameBoardProps) => {
  /**
   * Handles cell click events
   * Only allows moves on empty cells when game is active
   */
  const handleCellClick = (index: number) => {
    if (disabled || board[index] !== null) {
      return;
    }
    onCellClick(index);
  };

  /**
   * Determines the visual styling for each cell
   * Applies different styles for winning cells and cell states
   */
  const getCellStyling = (index: number, value: CellValue) => {
    const isWinningCell = winningCells.includes(index);
    const isEmpty = value === null;
    
    return cn(
      // Base cell styling
      "h-24 w-24 text-3xl font-bold border-2 rounded-xl",
      "transition-all duration-300 ease-in-out transform",
      "flex items-center justify-center shadow-lg",
      "bg-white/10 backdrop-blur-sm border-white/30",
      
      // Interactive styling for empty cells
      !disabled && isEmpty && "hover:bg-white/20 hover:border-white/50 hover:scale-105 cursor-pointer hover:shadow-xl",
      
      // Winning cell highlighting
      isWinningCell && "bg-gradient-to-br from-green-400/30 to-emerald-500/30 border-green-400 text-green-300 animate-pulse shadow-green-400/25",
      
      // Player-specific text colors with enhanced styling
      value === 'X' && !isWinningCell && "text-blue-400 bg-blue-500/10 border-blue-400/50 shadow-blue-400/25",
      value === 'O' && !isWinningCell && "text-red-400 bg-red-500/10 border-red-400/50 shadow-red-400/25",
      
      // Disabled state styling
      disabled && isEmpty && "cursor-not-allowed opacity-50",
      
      // Cell content animation
      value && "animate-in zoom-in-50 duration-300"
    );
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-2 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl">
        {board.map((cell, index) => (
          <Button
            key={index}
            variant="ghost"
            className={getCellStyling(index, cell)}
            onClick={() => handleCellClick(index)}
            disabled={disabled || cell !== null}
            aria-label={`Cell ${index + 1}${cell ? `, occupied by ${cell}` : ', empty'}`}
          >
            {cell}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
