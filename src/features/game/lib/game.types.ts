export type GameResponse = "red" | "blue" | "green" | "yellow";

export type BaseTurn = {
  correctButton: GameResponse;
  correctImage: string;
  timestamp: number;
  turnNumber: number;
  turnTime?: number;
};

export type PlayerChoiceTurn = BaseTurn & {
  playerChoice: GameResponse;
  wasCorrect: boolean;
  passed: false;
};

export type PassTurn = BaseTurn & {
  passed: true;
};

export function isPlayerChoiceTurn(turn: GameTurn): turn is PlayerChoiceTurn {
  return !turn.passed;
}

export function isPassTurn(turn: GameTurn): turn is PassTurn {
  return turn.passed;
}

export type GameTurn = PlayerChoiceTurn | PassTurn;

export type GameStats = {
  averageTurnTime: number;
  correctGuesses: number;
  incorrectGuesses: number;
  passes: number;
  score: number;
  totalGameTime: number;
  totalTurns: number;
  turns: GameTurn[];
};

export type GameStatus = "ready" | "playing" | "completed";

export type GameMode = "default" | "blind";
