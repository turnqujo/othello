import ComponentManager from '../../daemon/componentManager'
import Options from './options.component'

describe('The Options Component', () => {
  it('Should display a set of options for starting a new game, if one is not in progress.', async () => {
    const container = document.createElement('div')
    container.dataset.gameInProgress = 'false'
    const subject = new ComponentManager({ parent: container, component: Options })
    subject.onCreated()

    expect(container.querySelector('.options__set-up')).toBeTruthy()
    expect(container.querySelector('.options__set-up.hidden')).toBeFalsy()

    container.dataset.gameInProgress = 'true'
    // TODO: How to avoid needing this?
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(container.querySelector('.options__set-up.hidden')).toBeTruthy()
  })
})
