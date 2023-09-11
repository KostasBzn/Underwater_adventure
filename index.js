const prompt = require("prompt-sync")({ sigint: true });

function displayLife(playerLife) {
  return "* ".repeat(playerLife);
}

function clearConsole() {
  console.log('\x1Bc');
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

  return userChoice === correctChoice; // Return true if the user's choice is correct.
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
      nextQuestionIfCorrect: 1, 
      nextQuestionIfIncorrect: 2, 
    },
    {
      question: "Inside the door, you see a treasure chest. How do you proceed?",
      choices: ["Open the chest", "Walk away"],
      correctChoice: 0,
      nextQuestionIfCorrect: 3,
      nextQuestionIfIncorrect: 4,
    },
    {
      question: "You walk outside the path intended. You see another two doors, which one do you choose?",
      choices: ["Red doors", "Blue Doors"],
      correctChoice: 0,
      nextQuestionIfCorrect: 5,
      nextQuestionIfIncorrect: 6,
    },
    {
      question: "You unlock a secret passage. Where does it lead?",
      choices: ["A treasure room", "A dangerous trap"],
      correctChoice: 0,
      nextQuestionIfCorrect: 7,
      nextQuestionIfIncorrect: 8,
    },
    {
      question: "You fall into a dangerous trap. How do you escape?",
      choices: ["Use your wits", "Call for help"],
      correctChoice: 0,
      nextQuestionIfCorrect: 9,
      nextQuestionIfIncorrect: 10,
    },
  
  ];

  for (let currentQuestionIndex = 0; currentQuestionIndex < questions.length;) {
    const { question, choices, correctChoice, nextQuestionIfCorrect, nextQuestionIfIncorrect } = questions[currentQuestionIndex];

    clearConsole(); 

    console.log(`Breathe: ${displayLife(playerLife)}`);
    
    if (askQuestion(question, choices, correctChoice)) {
      console.log("Correct! You proceed.");
      currentQuestionIndex = nextQuestionIfCorrect;
    } else {
      console.log("Incorrect! You lose one life.");
      playerLife--;
      if (playerLife === 0) {
        clearConsole();
        console.log("Game over");
        return;
      }
      currentQuestionIndex = nextQuestionIfIncorrect;
    }
  }

  clearConsole();
  console.log("Congratulations! You've completed the game.");
}

playGame();


