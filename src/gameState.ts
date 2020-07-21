import { buildBoard } from './utility/board'

export interface GameState {
  hasWon: boolean
  currentPlayer: number
  playerCount: number
  boardState: BoardState
}

/**
 * Board State uses the player ID (simple integer) to mark which square belongs to whom.
 *  - If the square is owned by nobody, -1 is used.
 */
export type BoardState = number[][]

/**
 * Game State Manager
 * Responsible for holding and updating game state.
 * Also notifies when game state changes.
 */
export default class GameStateStore {
  private state: GameState
  private listeners: []

  constructor(columns = 8, rows = 8, playerCount = 2) {
    this.state = {
      hasWon: false,
      currentPlayer: 1,
      playerCount,
      boardState: buildBoard(columns, rows)
    }
  }

  public get currentState(): GameState {
    throw new Error('Method not implemented.')
  }

  public updateState(newState: Partial<GameState>): void {
    throw new Error('Method not implemented.')
  }

  public addUpdateListener(cb: (newState: GameState) => void): void {
    throw new Error('Method not implemented.')
  }

  public removeUpdateListener(cb: (newState: GameState) => void): void {
    throw new Error('Method not implemented.')
  }
}
