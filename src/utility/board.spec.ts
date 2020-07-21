import { buildBoard } from './board'

describe('The Board Utility Functions', () => {
  it('Should build a standard board as expected.', () => {
    expect(buildBoard(8, 8)).toEqual([
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ])
  })

  it('Should throw if given invalid arguments.', () => {
    expect(() => buildBoard(0, 0)).toThrowError('Invalid Board Dimensions.')
    expect(() => buildBoard(-1, 4)).toThrowError('Invalid Board Dimensions.')
    expect(() => buildBoard(4, -4)).toThrowError('Invalid Board Dimensions.')
    expect(() => buildBoard(4, Infinity)).toThrowError('Invalid Board Dimensions.')
    expect(() => buildBoard(Infinity, 4)).toThrowError('Invalid Board Dimensions.')
    expect(() => buildBoard(4, NaN)).toThrowError('Invalid Board Dimensions.')
    expect(() => buildBoard(NaN, 4)).toThrowError('Invalid Board Dimensions.')
    expect(() => buildBoard(Infinity, NaN)).toThrowError('Invalid Board Dimensions.')
  })
})
