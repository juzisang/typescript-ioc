import { CUSTOM } from "./inject";
import { store } from './store'

interface Constructor<T> {
  new(...parmes: any): T;
}

export function factory<T>(Target: Constructor<T>): T {
  const parames = getParames(Target)
  const target = new Target(...parames)
  setProperty(target as any)
  return target
}

function getParames<T>(Target: Constructor<T>): any[] {
  const parames: any[] = []
  const tags: Array<[string, number]> = Reflect.getMetadata(CUSTOM.PARAM, Target) || []
  tags.forEach(([id, index]) => {
    const parame = Reflect.get(store, id)
    if (parame) {
      parames[index] = Reflect.get(store, id)
    } else {
      throw new Error(`${String(id)} 不存在`)
    }
  })
  return parames.map(factory)
}

function setProperty<T extends object>(target: T) {
  const props: Array<[string, string]> = Reflect.getMetadata(CUSTOM.PROP, target) || []
  props.forEach(([id, key]) => {
    if (Reflect.has(store, id)) {
      const constructor: any = Reflect.get(store, id)
      const instance = factory(constructor)
      Reflect.defineProperty(target, key, { value: instance })
    } else {
      throw new Error(`${String(id)} 不存在`)
    }
  })
}