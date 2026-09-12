export function add(a: number, b: number): number {
  return a + b
}

export interface Config {
  name: string
  value?: string
}

export function describe(config: Config): string {
  const items: string[] = ['a', 'b']
  const first: string | undefined = items[0]
  return first === undefined ? config.name : `${first}:${config.name}`
}

export const result: string = describe({ name: 'test' })
