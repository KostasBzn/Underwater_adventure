const prompt = require("prompt-sync")({ sigint: true });

function displayLife(playerLife) {
  return "* ".repeat(playerLife);
}

function askQuestion(question, choices, correctChoice) {
  console.log(question);
  for (let i = 0; i < choices.length; i++) {
    console.log(`${i + 1}. ${choices[i]}`);
  }

  const userChoice = parseInt(prompt("Your choice: "));

  if (isNaN(userChoice) || userChoice < 1 || userChoice > choices.length) {
    console.log("Please enter a valid choice.");
    return false;
  }

  if (userChoice === correctChoice) {
    console.log(`Correct!`);
    return true;
  } else {
    console.log("Wrong choice.");
    return false;
  }
}

function playGame() {
  console.log("**WELCOME TO THE UNDERWATER STORY**");

  let playerLife = 4;
  console.log(`Breathe: ${displayLife(playerLife)}`);

  const questions = [
    {
      question: "You find a mysterious door. What do you do?",
      choices: ["Open it", "Leave it alone"],
      correctChoice: 1, 
    },
    {
      question: "Inside the door, you see a treasure chest. How do you proceed?",
      choices: ["Open the chest", "Walk away"],
      correctChoice: 0, 
    },
    {

    }
  ];

  for (const { question, choices, correctChoice } of questions) {
    if (!askQuestion(question, choices, correctChoice)) {
      playerLife--;
      console.log(`Breathe: ${displayLife(playerLife)}`);
      if (playerLife === 0) {
        console.clear();
        console.log("Game over");
        return;
      }
    }
  }

  console.clear();
  console.log("Congratulations! You've completed the game.");
}

playGame();

