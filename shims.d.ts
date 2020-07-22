// Workaround to load HTML into TS
// From here: https://stackoverflow.com/a/47705264
declare module '*.html' {
  const value: string
  export default value
}

// From here: https://stackoverflow.com/a/41946697
// Added lazy style loading properties
declare module '*.scss' {
  const content: {
    [className: string]: string
  }
  export default content
}
