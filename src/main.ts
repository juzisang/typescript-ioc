import "reflect-metadata"
import { Injectable, Inject, InjectProp } from './lib/inject'
import { factory } from './lib/factory'

@Injectable('metaServce')
class MetaServce { }

@Injectable('tagServce')
class TagServce {

  @InjectProp('metaServce')
  readonly metaServce!: MetaServce;

}

class Controller {
  @InjectProp('tagServce')
  readonly tagServce!: TagServce;

  constructor(@Inject('metaServce') private readonly metaServce: MetaServce) {
  }
}

const controller = factory(Controller)
console.log(controller.tagServce.metaServce)