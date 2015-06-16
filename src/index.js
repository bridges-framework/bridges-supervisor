import { Supervisor } from 'domain-supervisor'
import Processes from './processes'
import onError from './onError'

export default class BridgesSupervisor {

  constructor({directory, inject} = {inject: []}) {
    this._supervisor = new Supervisor()
    this.processes   = new Processes(directory)
    this.inject      = inject
  }

  start() {
    this.processes.asDomains().map(proc => this.supervisor.run(proc, onError))
  }

}

