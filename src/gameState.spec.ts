import GameStateStore from './gameState'

describe('The Game State Class.', () => {
  it('Should provide the current state when asked.', () => {
    const subject = new GameStateStore()
    expect(subject.currentState).toEqual({
      hasWon: false,
      currentPlayer: 1,
      boardState: [
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1]
      ]
    })
  })

  it('Should accept options when creating a new game.', () => {
    const subject = new GameStateStore(4, 4, 4)

    expect(subject.currentState).toEqual({
      hasWon: false,
      currentPlayer: 1,
      playerCount: 4,
      boardState: [
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1]
      ]
    })
  })

  it('Should validate the custom options given.', () => {
    expect(() => new GameStateStore(-1, 4, 2)).toThrowError('Option "columns" is invalid: negative.')
    expect(() => new GameStateStore(Infinity, 4, 2)).toThrowError('Option "columns" is invalid: Infinity.')
    expect(() => new GameStateStore(NaN, 4, 2)).toThrowError('Option "columns" is invalid: NaN.')
    expect(() => new GameStateStore(4, -5, 2)).toThrowError('Option "rows" is invalid: negative.')
    expect(() => new GameStateStore(4, Infinity, 2)).toThrowError('rows "columns" is invalid: Infinity.')
    expect(() => new GameStateStore(4, NaN, 2)).toThrowError('Option "rows" is invalid: NaN.')
    expect(() => new GameStateStore(4, 4, -1)).toThrowError('Option "playerCount" is invalid: negative.')
    expect(() => new GameStateStore(4, 4, Infinity)).toThrowError('rows "playerCount" is invalid: Infinity.')
    expect(() => new GameStateStore(4, 4, NaN)).toThrowError('Option "playerCount" is invalid: NaN.')
  })

  it('Should accept and store updated state.', () => {
    const subject = new GameStateStore()

    subject.updateState({
      hasWon: true
    })

    expect(subject.currentState.hasWon).toBe(true)
  })

  it('Should register callbacks which will be called when the game state changes.', () => {
    const subject = new GameStateStore(1, 1, 2)
    const spyA = jest.fn()
    const spyB = jest.fn()
    subject.addUpdateListener(spyA)
    subject.addUpdateListener(spyB)

    subject.updateState({ currentPlayer: 2 })

    expect(spyA).toBeCalledWith({ hasWon: false, currentPlayer: 2, playerCount: 2, boardState: [[-1]] })
    expect(spyB).toBeCalledWith({ hasWon: false, currentPlayer: 2, playerCount: 2, boardState: [[-1]] })
  })

  it('Should deregister a callback when asked.', () => {
    const subject = new GameStateStore(1, 1, 2)
    const spyA = jest.fn()
    const spyB = jest.fn()
    subject.addUpdateListener(spyA)
    subject.addUpdateListener(spyB)

    subject.updateState({ currentPlayer: 2 })
    subject.removeUpdateListener(spyB)
    subject.updateState({ currentPlayer: 1 })

    expect(spyA).toBeCalledTimes(2)
    expect(spyB).toBeCalledTimes(1)
  })

  it('Should not allow unexpected mutations of game state.', async () => {
    const subject = new GameStateStore()
    subject.currentState.hasWon = true
    expect(subject.currentState.hasWon).toBe(false)

    // Add a new listener and force an update to mimic attempted
    // mutations on data received through a callback listener
    await new Promise((resolve) => {
      subject.addUpdateListener((newState) => {
        newState.currentPlayer = 2
        resolve()
      })

      subject.updateState({ hasWon: true })
    })

    expect(subject.currentState.currentPlayer).toBe(1)
  })
})
