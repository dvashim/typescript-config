/** The public version constant. */
export const VERSION: string = '1.0.0'

/** @internal */
export function secret(): number {
  return 42
}

/** Greets a person by name. */
export function greet(name: string): string {
  return `hello ${name}`
}
