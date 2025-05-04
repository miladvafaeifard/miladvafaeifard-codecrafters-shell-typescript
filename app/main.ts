import { createInterface } from 'readline'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

let closed = false
const commands = [
  'echo',
  'exit',
  'type'
]

function nextQuestion() {
  rl.question('$ ', answer => {
    const literals = answer.split(' ')
    const command = literals[0]
    if (command === 'exit') {
      const status = Number(literals[1])
      if (status === 0) {
        rl.close()
        closed = true
      } else {
        console.log(`exit: ${status}: invalid status`)
      }
    } else if (command === 'echo') {
      console.log(`${literals.slice(1).join(' ')}`)
    } else if (command === 'type') {
      const typeCommand = literals[1]
      if (commands.includes(typeCommand)) {
        console.log(`${typeCommand} is a shell builtin`)
      } else {
        const foundCommand = process.env.PATH?.split(':').find(path => {
          return path.endsWith(typeCommand)
        })
        console.log(foundCommand? `${typeCommand} is /usr/bin/${typeCommand}` : `${typeCommand} not found`)
      }
    } else {
      console.log(`${command}: command not found`)
    }

    if (!closed) {
      nextQuestion()
    }
  })
}

nextQuestion()
