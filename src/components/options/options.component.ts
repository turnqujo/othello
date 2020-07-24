import template from './options.template.html'
import style from './options.style.scss'
import Component from '../../daemon/component'

interface Props {
  gameInProgress: boolean
}

const Options: Component<Props> = {
  template,
  style,
  props: {
    gameInProgress: false
  },
  render: (parent: HTMLElement, newProps: Props) => {
    if (newProps.gameInProgress) {
      parent.querySelector('.options__set-up').classList.add('hidden')
    }
  }
}
export default Options
