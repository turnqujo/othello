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
  events: {
    onStart: function () {
      console.log(this.container)
      this.container.dispatchEvent(new CustomEvent('on-start'))
    },
    onReset: function () {
      console.log(this.container)
      this.container.dispatchEvent(new CustomEvent('on-reset'))
    }
  },
  setUp: function () {
    this.container.querySelector('.options__set-up button').addEventListener('click', this.events.onStart)
    this.container.querySelector('.options__reset').addEventListener('click', this.events.onReset)
  },
  tearDown: function () {
    this.container.querySelector('.options__set-up button').removeEventListener('click', this.events.onStart)
    this.container.querySelector('.options__reset').removeEventListener('click', this.events.onReset)
  },
  render: function (newProps: Props) {
    if (newProps.gameInProgress) {
      this.container.querySelector('.options__set-up').classList.add('hidden')
      this.container.querySelector('.options__reset').classList.remove('hidden')
    } else {
      this.container.querySelector('.options__set-up').classList.remove('hidden')
      this.container.querySelector('.options__reset').classList.add('hidden')
    }
  }
})
export default Options
