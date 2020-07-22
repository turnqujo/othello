import Scoreboard from './components/scoreboard/scoreboard.component'
import componentManager from './tooling/componentManager'

window.onload = () => {
  componentManager.register(new Scoreboard(document.querySelector('.scoreboard-container')))
  setTimeout(() => document.querySelector('.scoreboard').remove(), 3000)
}
