export default function () {
  return {
    name: 'fileService',
    export: function () {
      return {
        minus (a:number, b:number) {
          return a - b
        }
      }
    }
  }
}
