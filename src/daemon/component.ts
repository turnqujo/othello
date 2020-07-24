export default interface Component<Props> {
  readonly template: string
  readonly style: SCSSFileLazy
  props?: Props
  setUp?: () => void
  tearDown?: () => void
  render?: (container: HTMLElement, newProps: Props) => void
}
