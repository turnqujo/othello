import ComponentManager from '../../daemon/componentManager'
import Options from './options.component'

describe('The Options Component', () => {
  it('Should display a set of options for starting a new game, if one is not in progress.', async () => {
    const container = document.createElement('div')
    container.dataset.gameInProgress = 'false'

    const subjectComponent = Options()

    const subject = new ComponentManager({ parent: container, component: subjectComponent })
    subject.onCreated()

    expect(subjectComponent.startButton.classList.contains('hidden')).toBe(false)
    expect(subjectComponent.resetButton.classList.contains('hidden')).toBe(true)

    container.dataset.gameInProgress = 'true'
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(subjectComponent.startButton.classList.contains('hidden')).toBe(true)
    expect(subjectComponent.resetButton.classList.contains('hidden')).toBe(false)
  })

  it('Should display a reset button, if a game is in progress.', async () => {
    const container = document.createElement('div')
    container.dataset.gameInProgress = 'false'

    const subject = new ComponentManager({ parent: container, component: Options() })
    subject.onCreated()

    expect(container.querySelector('.options__reset.hidden')).toBeTruthy()

    container.dataset.gameInProgress = 'true'
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(container.querySelector('.options__reset')).toBeTruthy()
  })
})
