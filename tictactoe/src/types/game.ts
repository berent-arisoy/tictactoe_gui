/**
 * Type definitions for the Tic Tac Toe game
 * Provides type safety and clear contracts for game components
 */

/**
 * Represents the possible values in a game cell
 * null indicates an empty cell
 */
export type CellValue = 'X' | 'O' | null;

/**
 * Represents the two players in the game
 */
export type Player = 'X' | 'O';

/**
 * Represents the current state of the game
 * - playing: Game is in progress
 * - won: Game has been won by a player
 * - draw: Game ended in a draw
 */
export type GameState = 'playing' | 'won' | 'draw';

/**
 * Statistics tracking for multiple game rounds
 * Used for displaying win/loss records
 */
export interface GameStats {
  xWins: number;
  oWins: number;
  draws: number;
}

/**
 * Represents a winning combination pattern
 * Contains the three cell indices that form a winning line
 */
export interface WinPattern {
  cells: [number, number, number];
  type: 'horizontal' | 'vertical' | 'diagonal';
}
