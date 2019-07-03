import { store } from './store'

export const enum DESIGN {
  TYPE = 'design:type',
  PARAMTYPES = 'design:paramtypes',
  RETURNTYPE = 'design:returntype',
}

export const enum CUSTOM {
  PARAM = '@@param',
  PROP = '@@prop'
}

export function Injectable(id?: PropertyKey): ClassDecorator {
  return (target) => {
    const key = id || target.name
    if (Reflect.has(store, key)) {
      throw new Error(`${String(key)} 已经存在`)
    } else {
      Reflect.set(store, key, target)
    }
  }
}

export function Inject(id: PropertyKey): ParameterDecorator {
  return (target, key, index) => {
    const parames = Reflect.getMetadata(CUSTOM.PARAM, target) || []
    parames.push([id, index])
    Reflect.defineMetadata(CUSTOM.PARAM, parames, target)
  }
}

export function InjectProp(id: PropertyKey): PropertyDecorator {
  return (target, key) => {
    const token = id || key
    const props = Reflect.getMetadata(CUSTOM.PROP, target) || []
    props.push([token, key])
    Reflect.defineMetadata(CUSTOM.PROP, props, target)
  }
}