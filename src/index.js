import { Supervisor } from 'domain-supervisor'
import Processes from './processes'
import onError from './onError'

export default class BridgesSupervisor {

  constructor({directory, inject = []}) {
    this._supervisor = new Supervisor()
    this.processes   = new Processes({directory, inject})
  }

  start() {
    return this.processes.asDomains().map(proc => this._supervisor.run(proc, onError))
  }

}

