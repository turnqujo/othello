export default interface Component<Props> {
  readonly template: string
  readonly style: SCSSFileLazy

  // Set automatically - don't include
  container?: HTMLElement

  // Set by implementation
  elements?: Record<string, () => HTMLElement>
  props?: Props
  state?: Record<string, Serializable>
  events?: Record<string, Function>
  setUp?: () => void | Promise<void>
  tearDown?: () => void | Promise<void>
  update?: (newProps: Props) => void | Promise<void>
}
