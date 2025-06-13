import { Badge } from "@/components/ui/badge";
import { Crown, Users } from "lucide-react";
import { GameState, Player } from "../types/game";

interface GameStatusProps {
  currentPlayer: Player;
  gameState: GameState;
  winner: Player | null;
}

/**
 * GameStatus component displays the current game state and player information
 * Provides clear visual feedback about game progress and outcomes
 * 
 * Features:
 * - Current player indicator
 * - Game outcome display (win/draw)
 * - Visual icons for better UX
 * - Color-coded status messages
 */
const GameStatus = ({ currentPlayer, gameState, winner }: GameStatusProps) => {
  /**
   * Renders the appropriate status message based on game state
   */
  const renderStatusMessage = () => {
    switch (gameState) {
      case 'playing':
        return (
          <div className="flex items-center justify-center gap-3">
            <Users className="w-5 h-5 text-cyan-300" />
            <span className="text-xl font-semibold text-white">
              Current Player: 
              <Badge 
                variant={currentPlayer === 'X' ? 'default' : 'secondary'}
                className={`ml-3 text-xl px-4 py-2 font-bold ${
                  currentPlayer === 'X' 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25'
                }`}
              >
                {currentPlayer}
              </Badge>
            </span>
          </div>
        );
        
      case 'won':
        return (
          <div className="flex items-center justify-center gap-3 animate-bounce">
            <Crown className="w-6 h-6 text-yellow-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Player {winner} Wins! 🎉
            </span>
            <Crown className="w-6 h-6 text-yellow-400" />
          </div>
        );
        
      case 'draw':
        return (
          <div className="text-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              It's a Draw! 🤝
            </span>
            <p className="text-cyan-200 mt-2">No more moves available</p>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
      {renderStatusMessage()}
    </div>
  );
};

export default GameStatus;
