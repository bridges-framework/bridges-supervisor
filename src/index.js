import {Supervisor, Process} from 'domain-supervisor'
import requireAll            from 'require-all-to-camel'

export default class BridgesSupervisor {

  constructor({directory, inject} = {inject: []}) {
    this._supervisor = new Supervisor()
    this.processes   = requireAll(directory)
    this.inject      = inject

    Object.defineProperty(this.processes, 'each', {
      get() {
        return objectEach
      }
    })
  }

  // Use functional iteration in place of for-in
  // to allow anonymous process definition
  start() {
    this.processes.each(_, process => {
      const proc = new Process(() => {
        process.apply(null, this.inject)
      })
      return this.supervisor.run(proc, onError)
    })
  }

}

function onError(error, restart, crash) {
  console.log('bridges:supervisor:error:message', error.message)
  console.log('bridges:supervisor:error:stack'  , error.stack)
  console.log('bridges:supervisor:restart')
  restart()
}

function objectEach(predicate) {
  Object.keys(this).forEach(key => {
    predicate(key, this[key])
  })
}

