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
  // @ts-expect-error
  private state: GameState

  // @ts-expect-error
  private listeners: []

  constructor(columns: number = 8, rows: number = 8, playerCount: number = 2) {
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

  public updateState(newState: Partial<GameState>) {
    throw new Error('Method not implemented.')
  }

  public addUpdateListener(cb: (newState: GameState) => void) {
    throw new Error('Method not implemented.')
  }

  public removeUpdateListener(cb: (newState: GameState) => void) {
    throw new Error('Method not implemented.')
  }
}
