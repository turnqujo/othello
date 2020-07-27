import WatcherDaemon from './daemon/watcher'
import Scoreboard from './components/scoreboard/scoreboard.component'
import Gameboard from './components/gameboard/gameboard.component'
import Options from './components/options/options.component'
import appStyle from './theme/index.scss'

window.onload = () => {
  appStyle.use()

  new WatcherDaemon(document.getElementById('othello-app'), {
    components: {
      Scoreboard,
      Gameboard,
      Options
    }
  })

  // TODO: Remove, only for demonstration
  document.querySelector('.options__container').addEventListener('on-submit', (e: CustomEvent) => {
    console.log(e.detail)
  })

  document.querySelector('.options__container').addEventListener('on-reset', (e: CustomEvent) => {
    const optionsContainer = document.querySelector('.options__container') as HTMLElement
    optionsContainer.dataset.gameInProgress = 'false'
  })
}
