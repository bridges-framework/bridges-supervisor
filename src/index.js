import {Supervisor, Process} from 'domain-supervisor'
import requireAll            from 'require-all-to-camel'

class BridgesSupervisor {

  constructor({directory, inject} = {inject: []}) {
    this._supervisor = new Supervisor()
    this.processes   = requireAll(directory)
    this.inject      = inject
  }

  onError(error, restart, crash) {
    console.log('bridges:supervisor:error:message', error.message)
    console.log('bridges:supervisor:error:stack'  , error.stack)
    console.log('bridges:supervisor:restart')
    restart()
  }

  async start() {
    return Object.keys(this.processes).map(name => {
        var proc = new Process(() => {
            this.processes[name].apply(null, this.inject)
        })
        return this.supervisor.run(proc, this.onError)
    })
  }

}

module.exports = BridgesSupervisor

