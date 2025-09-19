import { MersenneTwister19937, Random } from "random-js";
import { GameResponse, GameStats, GameStatus, GameTurn } from "./game.types";

export type SerializedGameState = ReturnType<Game["getGameStateSnapshot"]>;

export type GameOptions = {
  onStateChange?: (state: SerializedGameState) => void;
  images?: string[];
};

export class Game {
  private static readonly TOTAL_TURNS = 24;
  private static readonly BUTTON_COLORS: GameResponse[] = [
    "red",
    "blue",
    "green",
    "yellow",
  ];

  private _currentTurn: number = 0;
  private _score: number = 0;
  private _status: GameStatus = "playing";
  private _turns: GameTurn[] = [];
  private _currentCorrectButton: GameResponse | null = null;
  private _currentCorrectImage: string | null = null;
  private _showCorrectChoice: boolean = false;
  private _onStateChange?: (state: SerializedGameState) => void;
  private _images: string[];
  private _gameStartTime: number | null = null;
  private _turnStartTime: number | null = null;
  private _totalGameTime: number = 0;

  constructor(options: GameOptions = {}) {
    this._onStateChange = options.onStateChange;

    // Validate and set images
    if (options.images) {
      if (options.images.length !== Game.TOTAL_TURNS) {
        throw new Error(
          `Images array must contain exactly ${Game.TOTAL_TURNS} images, but received ${options.images.length}`
        );
      }
      this._images = this.shuffleArray([...options.images]);
    } else {
      // Generate default images if none provided
      this._images = this.shuffleArray(this.generateDefaultImages());
    }

    // Start timing first turn
    this._turnStartTime = Date.now();
    this.generateNewTurn();
    this.emitStateChange();
  }

  // Public getters
  get currentTurn(): number {
    return this._currentTurn;
  }

  get score(): number {
    return this._score;
  }

  get status(): GameStatus {
    return this._status;
  }

  get isGameComplete(): boolean {
    return this._currentTurn >= Game.TOTAL_TURNS;
  }

  get currentCorrectButton(): GameResponse | null {
    return this._currentCorrectButton;
  }

  get currentCorrectImage(): string | null {
    return this._currentCorrectImage;
  }

  get showCorrectChoice(): boolean {
    return this._showCorrectChoice;
  }

  get buttonColors(): GameResponse[] {
    return [...Game.BUTTON_COLORS];
  }

  get gameStats(): GameStats {
    const correctGuesses = this._turns.filter(
      (turn) => turn.wasCorrect === true
    ).length;
    const incorrectGuesses = this._turns.filter(
      (turn) => turn.wasCorrect === false
    ).length;
    const passes = this._turns.filter((turn) => turn.passed).length;

    // Calculate average turn time (excluding first turn)
    const timedTurns = this._turns.filter(
      (turn) => turn.turnTime !== undefined
    );
    const averageTurnTime =
      timedTurns.length > 0
        ? timedTurns.reduce((sum, turn) => sum + (turn.turnTime || 0), 0) /
          timedTurns.length
        : undefined;

    return {
      score: this._score,
      totalTurns: this._currentTurn,
      correctGuesses,
      incorrectGuesses,
      passes,
      totalGameTime: this._totalGameTime > 0 ? this._totalGameTime : undefined,
      averageTurnTime,
    };
  }

  get turnHistory(): GameTurn[] {
    return [...this._turns];
  }

  // Game control methods
  startGame(): void {
    this._status = "playing";
    this._currentTurn = 0;
    this._score = 0;
    this._turns = [];
    this._showCorrectChoice = false;
    this._gameStartTime = null; // Will be set after first turn
    this._turnStartTime = Date.now(); // Start timing first turn
    this._totalGameTime = 0;
    // Shuffle images for new game
    this._images = this.shuffleArray(this._images);
    this.generateNewTurn();
    this.emitStateChange();
  }

  makeChoice(buttonColor: GameResponse): {
    wasCorrect: boolean;
    shouldShowImage: boolean;
    shouldPlayChime: boolean;
    gameComplete: boolean;
  } {
    if (this._status !== "playing" || this.isGameComplete) {
      throw new Error("Game is not in a playable state");
    }

    const wasCorrect = buttonColor === this._currentCorrectButton;
    const turnEndTime = Date.now();

    // Calculate turn time (skip timing for first turn)
    let turnTime: number | undefined;
    if (this._currentTurn > 0 && this._turnStartTime) {
      turnTime = turnEndTime - this._turnStartTime;
    }

    // Set game start time after first turn
    if (this._currentTurn === 0) {
      this._gameStartTime = turnEndTime;
    }

    // Record the turn
    const turn: GameTurn = {
      turnNumber: this._currentTurn + 1,
      correctButton: this._currentCorrectButton!,
      correctImage: this._currentCorrectImage!,
      playerChoice: buttonColor,
      wasCorrect,
      passed: false,
      turnTime,
      timestamp: turnEndTime,
    };

    this._turns.push(turn);

    // Update score if correct
    if (wasCorrect) {
      this._score += 1;
    }

    // Show correct choice if player was wrong
    this._showCorrectChoice = !wasCorrect;

    // Advance to next turn
    this._currentTurn += 1;

    // Check if game is complete
    const gameComplete = this.isGameComplete;
    if (gameComplete) {
      this._status = "completed";
      // Calculate total game time
      if (this._gameStartTime) {
        this._totalGameTime = turnEndTime - this._gameStartTime;
      }
    }

    // Emit state change immediately
    this.emitStateChange();

    if (!gameComplete) {
      // Generate next turn after showing the correct choice for 1 second
      setTimeout(() => {
        this._showCorrectChoice = false;
        this.generateNewTurn();
        // Start timing next turn
        this._turnStartTime = Date.now();
        this.emitStateChange();
      }, 1000);
    }

    return {
      wasCorrect,
      shouldShowImage: wasCorrect,
      shouldPlayChime: wasCorrect,
      gameComplete,
    };
  }

  pass(): void {
    if (this._status !== "playing" || this.isGameComplete) {
      throw new Error("Game is not in a playable state");
    }

    // Show the correct choice briefly
    this._showCorrectChoice = true;

    const passTime = Date.now();

    // Calculate turn time for passes (skip timing for first turn)
    let turnTime: number | undefined;
    if (this._currentTurn > 0 && this._turnStartTime) {
      turnTime = passTime - this._turnStartTime;
    }

    // Set game start time after first turn
    if (this._currentTurn === 0) {
      this._gameStartTime = passTime;
    }

    // Record the pass (but don't increment turn)
    const passTurn: GameTurn = {
      turnNumber: this._currentTurn + 1, // This represents what would have been the turn number
      correctButton: this._currentCorrectButton!,
      correctImage: this._currentCorrectImage!,
      passed: true,
      turnTime,
      timestamp: passTime,
    };

    // Add to history but don't increment current turn
    this._turns.push(passTurn);

    // Emit state change immediately
    this.emitStateChange();

    // Generate new turn after showing correct choice
    setTimeout(() => {
      this._showCorrectChoice = false;
      this.generateNewTurn();
      // Start timing next turn
      this._turnStartTime = Date.now();
      this.emitStateChange();
    }, 1500); // Show correct choice longer for passes
  }

  hideCorrectChoice(): void {
    this._showCorrectChoice = false;
    this.emitStateChange();
  }

  reset(): void {
    this._currentTurn = 0;
    this._score = 0;
    this._status = "playing";
    this._turns = [];
    this._showCorrectChoice = false;
    this._gameStartTime = null;
    this._turnStartTime = Date.now(); // Start timing first turn
    this._totalGameTime = 0;
    this._images = this.shuffleArray(this._images);
    this.generateNewTurn();
    this.emitStateChange();
  }

  // Private methods
  private generateNewTurn(): void {
    // Randomly select correct button
    const randomIndex = new Random(MersenneTwister19937.autoSeed()).integer(
      0,
      Game.BUTTON_COLORS.length - 1
    );
    this._currentCorrectButton = Game.BUTTON_COLORS[randomIndex];

    // Use the image for this turn from the images array
    this._currentCorrectImage = this._images[this._currentTurn];
  }

  private generateDefaultImages(): string[] {
    const images: string[] = [];
    for (let i = 0; i < Game.TOTAL_TURNS; i++) {
      // Generate default image paths cycling through colors and numbers
      const colorIndex = i % Game.BUTTON_COLORS.length;
      const imageNumber = Math.floor(i / Game.BUTTON_COLORS.length) + 1;
      const color = Game.BUTTON_COLORS[colorIndex];
      images.push(`/images/${color}-${imageNumber}.jpg`);
    }
    return images;
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Utility methods for React integration
  getProgressPercentage(): number {
    return (this._currentTurn / Game.TOTAL_TURNS) * 100;
  }

  getRemainingTurns(): number {
    return Math.max(0, Game.TOTAL_TURNS - this._currentTurn);
  }

  // Method to get current game state for React components
  getGameStateSnapshot() {
    return {
      currentTurn: this._currentTurn,
      score: this._score,
      status: this._status,
      isGameComplete: this.isGameComplete,
      currentCorrectButton: this._currentCorrectButton,
      currentCorrectImage: this._currentCorrectImage,
      showCorrectChoice: this._showCorrectChoice,
      buttonColors: this.buttonColors,
      gameStats: this.gameStats,
      progressPercentage: this.getProgressPercentage(),
      remainingTurns: this.getRemainingTurns(),
    };
  }

  // Private method to emit state changes
  private emitStateChange(): void {
    if (this._onStateChange) {
      this._onStateChange(this.getGameStateSnapshot());
    }
  }
}
