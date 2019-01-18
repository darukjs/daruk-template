import '@sina/daruk'
import utils from '../../src/utils/index'

declare module '@sina/daruk' {
  interface Util extends ReturnType<typeof utils> {}
}

