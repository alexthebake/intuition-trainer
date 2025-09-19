export type GameResponse = "red" | "blue" | "green" | "yellow";

export type GameTurn = {
  turnNumber: number;
  correctButton: GameResponse;
  correctImage: string;
  playerChoice?: GameResponse;
  wasCorrect?: boolean;
  passed: boolean;
  turnTime?: number; // Time taken for this turn in milliseconds
  timestamp?: number; // When this turn was completed
};

export type GameStats = {
  score: number;
  totalTurns: number;
  correctGuesses: number;
  incorrectGuesses: number;
  passes: number;
  totalGameTime?: number; // Total game time in milliseconds
  averageTurnTime?: number; // Average time per turn in milliseconds (excluding first turn)
};

export type GameStatus = "ready" | "playing" | "completed";
