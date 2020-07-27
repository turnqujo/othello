import template from './options.template.html'
import style from './options.style.scss'
import Component from '../../daemon/component'

interface Props {
  gameInProgress: boolean
}

class OptionsComponent implements Component<Props> {
  readonly template = template
  readonly style = style
  public readonly container!: HTMLElement

  props: Props = {
    gameInProgress: false
  }

  // State
  private playerCount = 2
  private boardWidth = 8
  private boardHeight = 8

  // Events
  onSubmit = (e: any) => {
    e.preventDefault()

    // Very likely a much better way to handle this
    if ((e.submitter as HTMLButtonElement).isSameNode(this.resetButton)) {
      this.container.dispatchEvent(new CustomEvent('on-reset'))
      return
    }

    this.container.dispatchEvent(
      new CustomEvent('on-submit', {
        detail: {
          playerCount: this.playerCount,
          boardWidth: this.boardWidth,
          boardHeight: this.boardHeight
        }
      })
    )
  }

  onStart = () => {
    this.container.dispatchEvent(new CustomEvent('on-start'))
  }

  onReset = () => {
    this.container.dispatchEvent(new CustomEvent('on-reset'))
  }

  onPlayerCountChange = (e: Event) => {
    this.playerCount = (e.target as HTMLInputElement).valueAsNumber
  }

  onBoardHeightChange = (e: Event) => {
    this.boardHeight = (e.target as HTMLInputElement).valueAsNumber
  }

  onBoardWidthChange = (e: Event) => {
    this.boardWidth = (e.target as HTMLInputElement).valueAsNumber
  }

  // Element Handles
  get form(): HTMLFormElement {
    return this.container.querySelector('.options')
  }

  get playerCountInput(): HTMLInputElement {
    return this.container.querySelector('.options__player-count .form-control__input')
  }

  get boardWidthInput(): HTMLInputElement {
    return this.container.querySelector('.options__board-width .form-control__input')
  }

  get boardHeightInput(): HTMLInputElement {
    return this.container.querySelector('.options__board-height .form-control__input')
  }

  get newGameControls(): HTMLButtonElement {
    return this.container.querySelector('.options__new-game-controls')
  }

  get startButton(): HTMLButtonElement {
    return this.container.querySelector('.options__start-game')
  }

  get resetButton(): HTMLButtonElement {
    return this.container.querySelector('.options__reset-game')
  }

  // Lifecycle methods
  setUp() {
    this.playerCountInput.value = String(this.playerCount)
    this.boardHeightInput.value = String(this.boardHeight)
    this.boardWidthInput.value = String(this.boardWidth)

    this.form.addEventListener('submit', this.onSubmit)
    this.startButton.addEventListener('click', this.onStart)
    this.resetButton.addEventListener('click', this.onReset)
    this.playerCountInput.addEventListener('change', this.onPlayerCountChange)
    this.boardHeightInput.addEventListener('change', this.onBoardHeightChange)
    this.boardWidthInput.addEventListener('change', this.onBoardWidthChange)
  }

  tearDown() {
    this.form.removeEventListener('submit', this.onSubmit)
    this.startButton.removeEventListener('click', this.onStart)
    this.resetButton.removeEventListener('click', this.onReset)
    this.playerCountInput.removeEventListener('change', this.onPlayerCountChange)
    this.boardHeightInput.removeEventListener('change', this.onBoardHeightChange)
    this.boardWidthInput.removeEventListener('change', this.onBoardWidthChange)
  }

  // Update
  onPropsChanged(newProps: Props, oldProps: Props) {
    if (newProps.gameInProgress) {
      this.newGameControls.classList.add('hidden')
      this.resetButton.classList.remove('hidden')
    } else {
      this.newGameControls.classList.remove('hidden')
      this.resetButton.classList.add('hidden')
    }
  }
}

export default () => new OptionsComponent()
