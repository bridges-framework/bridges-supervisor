import {Supervisor, Process} from 'domain-supervisor'
import requireAll            from 'require-all-to-camel'

export default class BridgesSupervisor {

  constructor({directory, inject} = {inject: []}) {
    this._supervisor = new Supervisor()
    this.processes   = requireAll(directory)
    this.inject      = inject
  }

  start() {
    Object.keys(this.processes).forEach(name => {
      const proc = new Process(() => {
        this.processes[name].apply(null, this.inject)
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



