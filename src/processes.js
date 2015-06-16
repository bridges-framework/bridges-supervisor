import { Process } from 'domain-supervisor'
import requireAll from 'require-all-to-camel'

export default class Processes {
  constructor({directory, inject}) {
    this._processes = requireAll(directory)
    this.inject = inject
  }

  asDomains() {
    return this.iterateWithBlock(this.wrapInDomain)
  }

  wrapInDomain(_, process, context = null) {
    return new Process(() => {
      process.apply(context, this.inject)
    })
  }

  iterateWithBlock(predicate) {
    return Object.keys(this._processes).map(key => {
      console.log('starting process: ', key)
      return predicate.call(this, key, this._processes[key])
    })
  }
}

