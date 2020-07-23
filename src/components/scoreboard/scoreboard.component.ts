import template from './scoreboard.template.html'
import style from './scoreboard.style.scss'
import Component from '../../daemon/component'

interface Static {
  example: string
}

interface Watched {
  playerCount: string
  hasWon: boolean
}

const Scoreboard: Component<Static, Watched> = {
  template,
  style,
  staticProps: {
    example: 'WOO HOO!'
  },
  watchedProps: {
    playerCount: 'N/A',
    hasWon: false
  },
  render: (container: HTMLElement, staticProps: Static, watchedProps: Watched) => {
    container.querySelector('.scoreboard__player-count').innerHTML = `${watchedProps.playerCount} Players`
    container.querySelector('.scoreboard__has-won').innerHTML = watchedProps.hasWon ? 'Finished!' : 'In Progress'
  }
}
export default Scoreboard
