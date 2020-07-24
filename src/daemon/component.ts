export default interface Component<Props> {
  readonly template: string
  readonly style: SCSSFileLazy
  container?: HTMLElement
  props?: Props
  events?: Record<string, Function>
  setUp?: () => void | Promise<void>
  tearDown?: () => void | Promise<void>
  render?: (newProps: Props) => void | Promise<void>
}
