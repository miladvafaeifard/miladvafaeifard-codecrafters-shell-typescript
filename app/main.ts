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
        console.log(`${typeCommand}: not found`)
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
