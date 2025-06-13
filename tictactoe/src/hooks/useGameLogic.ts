import { useState, useCallback } from 'react';
import { GameState, Player, CellValue, GameStats } from '../types/game';
import { checkWinner, checkDraw, getWinningCells } from '../utils/gameUtils';

/**
 * Custom hook for managing tic-tac-toe game logic
 * Implements complete game state management with separation of concerns
 * 
 * Features:
 * - Turn-based player management
 * - Win condition detection
 * - Game statistics tracking
 * - Reset functionality
 * - Immutable state updates
 */
export const useGameLogic = () => {
  // Core game state
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameState, setGameState] = useState<GameState>('playing');
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningCells, setWinningCells] = useState<number[]>([]);
  
  // Game statistics for tracking multiple rounds
  const [gameStats, setGameStats] = useState<GameStats>({
    xWins: 0,
    oWins: 0,
    draws: 0
  });

  /**
   * Handles player moves with comprehensive validation
   * Requirement: Player turn management (X and O alternating turns)
   */
  const makeMove = useCallback((cellIndex: number) => {
    // Validate move conditions
    if (gameState !== 'playing' || board[cellIndex] !== null) {
      return;
    }

    // Create new board state with move
    const newBoard = [...board];
    newBoard[cellIndex] = currentPlayer;
    setBoard(newBoard);

    // Check for win condition
    // Requirement: Win condition detection (horizontal, vertical, diagonal)
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameState('won');
      setWinningCells(getWinningCells(newBoard, gameWinner));
      
      // Update statistics
      setGameStats(prev => ({
        ...prev,
        [gameWinner === 'X' ? 'xWins' : 'oWins']: prev[gameWinner === 'X' ? 'xWins' : 'oWins'] + 1
      }));
      return;
    }

    // Check for draw condition
    if (checkDraw(newBoard)) {
      setGameState('draw');
      setGameStats(prev => ({ ...prev, draws: prev.draws + 1 }));
      return;
    }

    // Switch to next player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }, [board, currentPlayer, gameState]);

  /**
   * Resets the game to initial state
   * Requirement: Game reset functionality for new games
   */
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameState('playing');
    setWinner(null);
    setWinningCells([]);
  }, []);

  /**
   * Returns current game statistics
   * Requirement: Game state display showing current player and game status
   */
  const getGameStats = useCallback(() => gameStats, [gameStats]);

  return {
    // Game state
    board,
    currentPlayer,
    gameState,
    winner,
    winningCells,
    
    // Actions
    makeMove,
    resetGame,
    getGameStats
  };
};
