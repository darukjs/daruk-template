declare module '{{name}}' {
  class MyClass {
    public constructor(initData?: any);
    public map: any;
    public get(key: string): any;
    public set(key: string, val: any): any;
  }
  export = MyClass;
}
