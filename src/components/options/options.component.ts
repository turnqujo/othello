import template from './options.template.html'
import style from './options.style.scss'
import Component from '../../daemon/component'

interface Props {
  gameInProgress: boolean
}

const Options: () => Component<Props> = () => ({
  template,
  style,
  props: {
    gameInProgress: true
  },
  state: {
    numUpdates: 0
  },
  events: {
    onStart: function () {
      this.container.dispatchEvent(new CustomEvent('on-start', { detail: this.state.numUpdates }))
    },
    onReset: function () {
      this.container.dispatchEvent(new CustomEvent('on-reset'))
    }
  },
  elements: {
    get startButton() {
      return this.container.querySelector('.options__set-up button')
    },
    get resetButton() {
      return this.container.querySelector('.options__reset')
    },
    get counter() {
      return this.container.querySelector('.options__counter')
    }
  },
  setUp: function () {
    this.elements.startButton.addEventListener('click', this.events.onStart)
    this.elements.resetButton.addEventListener('click', this.events.onReset)
  },
  tearDown: function () {
    this.elements.startButton.removeEventListener('click', this.events.onStart)
    this.elements.resetButton.removeEventListener('click', this.events.onReset)
  },
  update: function (newProps: Props) {
    this.state.numUpdates++
    this.elements.counter.innerText = this.state.numUpdates

    if (newProps.gameInProgress) {
      this.elements.startButton.classList.add('hidden')
      this.elements.resetButton.classList.remove('hidden')
    } else {
      this.elements.startButton.classList.remove('hidden')
      this.elements.resetButton.classList.add('hidden')
    }
  }
})

export default Options
