import { useState } from "react";
import TicTacToe from "./components/TicTacToe";
import Documentation from "./pages/documentation";
import { Button } from "./components/ui/button";
import { FileText, Play } from "lucide-react";

/**
 * Main application component for the Tic Tac Toe game
 * Serves as the root component that renders the game interface
 */
function App() {
  const [currentView, setCurrentView] = useState<'game' | 'documentation'>('game');

  const renderGameView = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Navigation */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          onClick={() => setCurrentView('documentation')}
          className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 font-semibold px-4 py-2"
        >
          <FileText className="w-4 h-4 mr-2" />
          View Documentation
        </Button>
      </div>
      
      <div className="w-full max-w-2xl relative z-10">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 animate-fade-in">
            Tic Tac Toe
          </h1>
          <p className="text-cyan-200 text-lg font-medium">
            Challenge your mind with this classic strategy game
          </p>
        </header>
        
        <TicTacToe />
        
        <footer className="text-center mt-8 text-sm text-cyan-300/70">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
          <p className="mt-1">
            Target Users: Students learning programming • Casual gamers
          </p>
        </footer>
      </div>
    </div>
  );

  if (currentView === 'documentation') {
    return (
      <div className="relative">
        {/* Navigation back to game */}
        <div className="fixed top-6 left-6 z-50">
          <Button
            onClick={() => setCurrentView('game')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2"
          >
            <Play className="w-4 h-4 mr-2" />
            Back to Game
          </Button>
        </div>
        <Documentation />
      </div>
    );
  }

  return renderGameView();
}

export default App;