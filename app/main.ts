import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function nextQuestion() {
  rl.question("$ ", (answer) => {
    const literals = answer.split(" ")
    const command = literals[0]
    const status = Number(literals[1])
    if (command === "exit" && status === 0) {
      rl.close()
    } else {
      console.log(`${answer}: command not found`)
      nextQuestion() 
    }
  })
}

nextQuestion()
