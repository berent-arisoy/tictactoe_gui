import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import GameBoard from "./GameBoard";
import GameStatus from "./GameStatus";
import { useGameLogic } from "../hooks/useGameLogic";

/**
 * Main Tic Tac Toe game component
 * Manages the overall game interface and coordinates between game logic and UI components
 * 
 * Functional Requirements fulfilled:
 * 1. Game board creation with 3x3 grid interface
 * 2. Player turn management (X and O alternating turns) 
 * 3. Win condition detection (horizontal, vertical, diagonal)
 * 4. Game reset functionality for new games
 * 5. Game state display showing current player and game status
 */
const TicTacToe = () => {
  const {
    board,
    currentPlayer,
    gameState,
    winner,
    winningCells,
    makeMove,
    resetGame,
    getGameStats
  } = useGameLogic();

  const stats = getGameStats();

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl bg-white/10 backdrop-blur-lg border-white/20 border-2">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-3xl font-bold text-white mb-4">
          Game Board
        </CardTitle>
        
        {/* Game statistics display */}
        <div className="flex justify-center gap-6 text-sm font-semibold mt-2">
          <div className="bg-blue-500/20 px-3 py-2 rounded-lg border border-blue-400/30">
            <span className="text-blue-300">X Wins: {stats.xWins}</span>
          </div>
          <div className="bg-red-500/20 px-3 py-2 rounded-lg border border-red-400/30">
            <span className="text-red-300">O Wins: {stats.oWins}</span>
          </div>
          <div className="bg-yellow-500/20 px-3 py-2 rounded-lg border border-yellow-400/30">
            <span className="text-yellow-300">Draws: {stats.draws}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Game status component - shows current player and game state */}
        <GameStatus 
          currentPlayer={currentPlayer}
          gameState={gameState}
          winner={winner}
        />

        {/* Game board component - 3x3 grid interface */}
        <GameBoard
          board={board}
          onCellClick={makeMove}
          winningCells={winningCells}
          disabled={gameState !== 'playing'}
        />

        {/* Game reset functionality */}
        <div className="flex justify-center">
          <Button
            onClick={resetGame}
            variant={gameState !== 'playing' ? 'default' : 'outline'}
            className={`flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
              gameState !== 'playing' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-3 text-lg shadow-lg shadow-purple-500/25' 
                : 'bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 font-semibold px-6 py-2'
            }`}
          >
            <RefreshCw className={`${gameState !== 'playing' ? 'w-5 h-5' : 'w-4 h-4'}`} />
            {gameState !== 'playing' ? 'Play Again' : 'New Game'}
          </Button>
        </div>

        {/* Instructions for players */}
        <div className="text-sm text-cyan-200/80 text-center space-y-1 bg-white/5 p-3 rounded-lg border border-white/10">
          <p className="font-medium">Click on any empty cell to make your move</p>
          <p className="text-xs">First to get three in a row wins!</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicTacToe;
