import '@sina/daruk'

declare module '@sina/daruk' {
  interface Context {
    render: (tpl:string) => Promise<any>
  }
}
