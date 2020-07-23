import Gameboard from './gameboard.component'

describe('The Gameboard Component.', () => {
  it('Should exist.', async () => {
    const parent = document.createElement('div')
    const subject = new Gameboard(parent)
    subject.onCreated()

    expect(parent.querySelector('.gameboard h2').innerHTML).toBe('Gameboard')
  })
})
