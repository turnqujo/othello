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

  get startButton(): HTMLElement {
    return this.container.querySelector('.options__set-up button')
  }

  get resetButton(): HTMLElement {
    return this.container.querySelector('.options__reset')
  }

  get counter(): HTMLElement {
    return this.container.querySelector('.options__counter')
  }

  onStart = () => {
    this.container.dispatchEvent(new CustomEvent('on-start'))
  }

  onReset = () => {
    this.container.dispatchEvent(new CustomEvent('on-reset'))
  }

  setUp() {
    this.startButton.addEventListener('click', this.onStart)
    this.resetButton.addEventListener('click', this.onReset)
  }

  tearDown() {
    this.startButton.removeEventListener('click', this.onStart)
    this.resetButton.removeEventListener('click', this.onReset)
  }

  async onPropsChanged(newProps: Props, oldProps: Props) {
    if (this.props.gameInProgress) {
      this.startButton.classList.add('hidden')
      this.resetButton.classList.remove('hidden')
    } else {
      this.startButton.classList.remove('hidden')
      this.resetButton.classList.add('hidden')
    }
  }
}

export default () => new OptionsComponent()
