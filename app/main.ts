import { createInterface } from 'readline'
import { handleCdCommand, handleCustomCommand, handleEchoCommand, handleExitCommand, handlePwdCommand, handleTypeCommand } from './commandHandlers';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

let closed = false

function nextQuestion() {
  rl.question('$ ', answer => {
    const literals = answer.split(' ')
    const command = literals[0]
    if (command === 'exit') {
      handleExitCommand(Number(literals[1]), (err) => {
        if(err) {
          console.log(`${err}`)
          return
        }
        rl.close()
        closed = true
      })
    } else if (command === 'echo') {
      handleEchoCommand(literals.slice(1))
    } else if (command === 'type') {
      handleTypeCommand(literals.slice(1))
    } else if (command.startsWith('custom_exe_')) {
      handleCustomCommand([answer])
    } else if (command === 'pwd') {
      handlePwdCommand()
    } else if (command === 'cd') {
      handleCdCommand(literals.slice(1), (err) => {
        if (err) {
          console.log(err)
        }
      })
    } else {
      console.log(`${command}: command not found`)
    }

    if (!closed) {
      nextQuestion()
    }
  })
}

nextQuestion()
