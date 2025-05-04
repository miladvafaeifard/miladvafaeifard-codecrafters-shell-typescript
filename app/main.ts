import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Uncomment this block to pass the first stage
rl.question("$ ", (answer) => {
  console.log(`${answer}: command not found`);
  // if (answer === "ls") {
  //   console.log("app");
  // } else if (answer === "cd app") {
  //   console.log("app");
  // } else if (answer === "cd ..") {
  //   console.log("home");
  // } else if (answer === "cd home") {
  //   console.log("home");
  // } else if (answer === "cd /") {
  //   console.log("/");
  // } else if (answer === "cd /home") {
  //   console.log("/home");
  // } else if (answer === "cd /app") {
  //   console.log("/app");
  // } else if (answer === "cd /home/user") {
  //   console.log("/home/user");
  // } else {
  //   console.log("Command not found");
  // }
  rl.close();
});
