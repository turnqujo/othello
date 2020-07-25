import template from './gameboard.template.html'
import style from './gameboard.style.scss'
import Component from '../../daemon/component'

const Gameboard: () => Component<unknown> = () => ({
  template,
  style
})
export default Gameboard
