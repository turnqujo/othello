import WatcherDaemon from './daemon/watcher'
import Scoreboard from './components/scoreboard/scoreboard.component'
import Gameboard from './components/gameboard/gameboard.component'
import Options from './components/options/options.component'
import appStyle from './theme/index.scss'

window.onload = () => {
  appStyle.use()

  new WatcherDaemon(document.querySelector('#othello-app'), {
    components: {
      Scoreboard,
      Gameboard,
      Options
    }
  })

  // TODO: Remove, only for demonstration
  document.querySelector('.options__container').addEventListener('on-reset', () => {
    const optionsContainer = document.querySelector('.options__container') as HTMLElement
    optionsContainer.dataset.gameInProgress = 'false'
  })

  document.querySelector('.options__container').addEventListener('on-start', () => {
    const optionsContainer = document.querySelector('.options__container') as HTMLElement
    optionsContainer.dataset.gameInProgress = 'true'
  })
}
