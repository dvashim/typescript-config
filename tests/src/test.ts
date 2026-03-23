export function add(a: number, b: number): number {
  return a + b
}

export interface Config {
  name: string
  value?: string
}

function check(config: Config): void {
  const items: string[] = ['a', 'b']
  const first: string | undefined = items[0]
  if (first !== undefined) {
    console.log(first)
  }
  console.log(config.name)
}

check({ name: 'test' })
