import type { Opts } from './types.ts'
import { greet, VERSION } from './util.ts'

export class Greeter {
  readonly prefix: string

  constructor(opts: Opts) {
    this.prefix = opts.name
  }

  greet(name: string): string {
    return `${this.prefix} ${greet(name)} ${VERSION}`
  }
}
