import WatcherDaemon from './daemon/watcher'
import Scoreboard from './components/scoreboard/scoreboard.component'

window.onload = () => {
  new WatcherDaemon(document.querySelector('#othello-app'), {
    components: {
      Scoreboard
    }
  })
}
