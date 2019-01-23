declare module '{{name}}' {
  interface MyClass {
    map: any;
    get: (key: string) => any;
    set: (key: string, val: any) => any;
  }
}
