class MyClass {
  public map: any;
  public constructor(initData = {}) {
    this.map = initData;
  }
  public get(key: string) {
    return this.map[key];
  }
  public set(key: string, val: any) {
    return (this.map[key] = val);
  }
}

export default MyClass;
