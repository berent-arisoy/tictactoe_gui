import { CellValue, Player, WinPattern } from '../types/game';

/**
 * Game utility functions for tic-tac-toe logic
 * Implements core game mechanics with pure functions for testability
 */

/**
 * All possible winning combinations in tic-tac-toe
 * Covers horizontal, vertical, and diagonal patterns
 */
const WIN_PATTERNS: WinPattern[] = [
  // Horizontal rows
  { cells: [0, 1, 2], type: 'horizontal' },
  { cells: [3, 4, 5], type: 'horizontal' },
  { cells: [6, 7, 8], type: 'horizontal' },
  
  // Vertical columns
  { cells: [0, 3, 6], type: 'vertical' },
  { cells: [1, 4, 7], type: 'vertical' },
  { cells: [2, 5, 8], type: 'vertical' },
  
  // Diagonal lines
  { cells: [0, 4, 8], type: 'diagonal' },
  { cells: [2, 4, 6], type: 'diagonal' },
];

/**
 * Checks if there is a winner on the current board
 * Requirement: Win condition detection (horizontal, vertical, diagonal)
 * 
 * @param board - Current game board state
 * @returns The winning player ('X' or 'O') or null if no winner
 */
export const checkWinner = (board: CellValue[]): Player | null => {
  // Check each winning pattern
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern.cells;
    
    // Check if all three cells in pattern have the same non-null value
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }
  
  return null;
};

/**
 * Checks if the game is a draw (board full with no winner)
 * 
 * @param board - Current game board state
 * @returns True if the game is a draw, false otherwise
 */
export const checkDraw = (board: CellValue[]): boolean => {
  // Game is a draw if all cells are filled and there's no winner
  return board.every(cell => cell !== null) && !checkWinner(board);
};

/**
 * Gets the indices of cells that form the winning combination
 * Used for highlighting winning cells in the UI
 * 
 * @param board - Current game board state
 * @param winner - The winning player
 * @returns Array of cell indices that form the winning line
 */
export const getWinningCells = (board: CellValue[], winner: Player): number[] => {
  // Find the pattern that resulted in the win
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern.cells;
    
    if (board[a] === winner && board[b] === winner && board[c] === winner) {
      return pattern.cells;
    }
  }
  
  return [];
};

/**
 * Calculates the current game progress as a percentage
 * Useful for progress indicators or analytics
 * 
 * @param board - Current game board state
 * @returns Percentage of board filled (0-100)
 */
export const getGameProgress = (board: CellValue[]): number => {
  const filledCells = board.filter(cell => cell !== null).length;
  return Math.round((filledCells / 9) * 100);
};

/**
 * Gets all empty cell indices on the board
 * Useful for AI implementations or move validation
 * 
 * @param board - Current game board state
 * @returns Array of indices representing empty cells
 */
export const getEmptyCells = (board: CellValue[]): number[] => {
  return board
    .map((cell, index) => cell === null ? index : -1)
    .filter(index => index !== -1);
};

/**
 * Validates if a move is legal
 * 
 * @param board - Current game board state
 * @param cellIndex - The cell index to validate
 * @returns True if the move is valid, false otherwise
 */
export const isValidMove = (board: CellValue[], cellIndex: number): boolean => {
  return cellIndex >= 0 && cellIndex < 9 && board[cellIndex] === null;
};
