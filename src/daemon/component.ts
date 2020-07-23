export default interface Component<Static, Watched> {
  readonly template: string
  readonly style: any // TODO: How to type SCSS imports with use() / unuse()?
  staticProps?: Static
  watchedProps?: Watched
  setUp?: () => void
  tearDown?: () => void
  render?: (container: HTMLElement, staticProps: Static, watchedProps: Watched) => void
}
