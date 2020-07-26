export default interface Component<Props> {
  readonly template: string
  readonly style: SCSSFileLazy

  // Set automatically - don't include
  container?: HTMLElement

  // Set by implementation
  elements?: Record<string, HTMLElement>
  events?: Record<string, () => void>
  props?: Props
  onPropsChanged?: (newProps: Props, oldProps?: Props) => void | Promise<void>
  setUp?: () => void | Promise<void>
  tearDown?: () => void | Promise<void>
}
