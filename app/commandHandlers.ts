import { execSync } from 'child_process'
import fs from 'fs'
import { cwd } from 'process'

export function handleExitCommand(status: number, fn: (err: string | null) => void): void {
  if (status === 0) {
    fn(null)
  } else {
    fn(`exit: ${status}: invalid status`)
  }
}

export function handleEchoCommand(args: string[]): void {
  console.log(args.join(' '))
}

const commands = [
  'echo',
  'exit',
  'type',
  'pwd',
  'cd'
] as const

export type TypeCommand = typeof commands[number]

export function handleTypeCommand(args: string[]): void {
  const typeCommand = args[0]
  
  if (commands.includes(typeCommand as TypeCommand)) {
    console.log(`${typeCommand} is a shell builtin`)
  } else {
    const foundCommand = process.env.PATH?.split(':').find(path => {
      return fs.existsSync(`${path}/${typeCommand}`)
    })
    
    console.log(foundCommand? `${typeCommand} is ${foundCommand}/${typeCommand}` : `${typeCommand} not found`)
  }
}

export function handleCustomCommand(args: string[]): void {
  execSync(args[0], { stdio: 'inherit'})
}

export function handlePwdCommand(): void {
  console.log(cwd())
}

export function handleCdCommand(args: string[], fn: (err: string | null) => void): void {
  if (args.length === 0) {
    fn('cd: missing argument')
    return
  }

  const [path] = args
  try {
    process.chdir(path)
    fn(null)
  } catch (err) {
    fn(`cd: ${path}: No such file or directory`)
  }
}
