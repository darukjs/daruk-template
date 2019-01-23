class MyClass {
  constructor() {
    this.map = {};
  }
  get(key) {
    return this.map[key];
  }
  set(key, val) {
    return (this.map[key] = val);
  }
}

export default MyClass;
