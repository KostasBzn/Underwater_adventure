const prompt = require("prompt-sync")({ sigint: true });
console.log("**WELCOME TO THE UNDERWATER STORY**");

let playerLife = 2;
console.log(`Breathe: ${"* ".repeat(playerLife)}`);

function lifeBar() {
  return playerLife;
}

function question() {
  lifeBar();

  let firstQuestion = prompt("How mutch is 1 + 1?");
  if (firstQuestion === "2") {
    playerLife++;
    console.log(
      `Correct! The answer is ${firstQuestion} Lets go to the next question!`
    );
  } else {
    playerLife--;
    console.log("Wrong answer");
  }

  console.clear();
  console.log(`Breathe: ${"* ".repeat(playerLife)}`);
  let secondQuestion = prompt("How mutch us 2 + 5?");
  if (secondQuestion === "7") {
    playerLife++;
    console.log(`Breathe: ${"* ".repeat(playerLife)}`);
    console.log(
      `Correct! The answer is ${secondQuestion} Lets go to the next question!`
    );
  } else {
    playerLife--;
    console.log(`Breathe: ${"* ".repeat(playerLife)}`);
    console.log("Wrong answer");
  }
  if (playerLife === 0) {
    console.clear();
    console.log("Game over");
    return;
  }
}

question();
