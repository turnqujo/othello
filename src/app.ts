import WatcherDaemon from './daemon/watcher'
import Scoreboard from './components/scoreboard/scoreboard.component'
import Gameboard from './components/gameboard/gameboard.component'
import Options from './components/options/options.component'

import './theme/index.scss'

window.onload = () => {
  new WatcherDaemon(document.querySelector('#othello-app'), {
    components: {
      Scoreboard,
      Gameboard,
      Options
    }
  })
}
