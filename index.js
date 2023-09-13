// BREATHE - text-based terminal horror game brought to you by Kostas & Tyhe
// For uncommon diving words, refer to small_dictionary_of_diving.md

const prompt = require("prompt-sync")({ sigint: true });

// Player's life
function displayLife(playerLife) {
  return "* ".repeat(playerLife);
}

function clearConsole() {
  console.log("\x1Bc");
}

function gameIntro() {
  console.log(`\nDive into an epic underwater adventure filled with mysteries and challenges that waiting you in the depths of the ocean. You are a brave explorer seeking hidden treasures and secrets of the deep, but be careful your oxygen is limited! \n
  You start your journey with 5 precious breaths lives. Each wrong decision will cost you a breath. Can you make the right choices and complete your underwater odyssey before your breath runs out? \n
  Unlock secret passages and discover the riches of the deep sea. Your choices will shape your destiny in this thrilling underwater game. \n
  Are you ready to plunge into the unknown?\n
  Press ENTER to start your underwater adventure.......`);
  const enter = prompt();
  if (enter === "") {
    clearConsole();
  } else {
    gameIntro();
  }
}

// Loading bar
function loadingBar(duration, steps) {
  return new Promise((resolve) => {
    let step = 0;

    function updateBar() {
      process.stdout.clearLine("");
      process.stdout.cursorTo(0);
      process.stdout.write("[");
      for (let i = 0; i < steps; i++) {
        if (i < step) {
          process.stdout.write("|");
        } else {
          process.stdout.write(" ");
        }
      }
      process.stdout.write(`] ${step}%`);
      step++;

      if (step <= steps) {
        setTimeout(updateBar, duration / steps);
      } else {
        process.stdout.write("\nLoading complete!\n\n");
        resolve();
      }
    }

    updateBar();
  });
}

// Section that implies questions and choices of the Player
function askQuestion(question, choices, correctChoice) {
  console.log(question);
  for (let i = 0; i < choices.length; i++) {
    console.log(`${i + 1}. ${choices[i]}`);
  }

  while (true) {
    const userChoice = parseInt(prompt("Your choice: "));

    if (isNaN(userChoice) || userChoice < 1 || userChoice > choices.length) {
      process.stdout.write("\r               *Please enter a valid choice*\r");
    } else return userChoice === correctChoice; // Return true if the user's choice is correct.
  }
}

// Displayed on the console in the beginning
async function playGame() {
  clearConsole();

  await loadingBar(5000, 100);

  console.log("           *.*.*.* BREATHE *.*.*.*");
  console.log("An interactive horror story about Thalassophobia");
  console.log(" ");
  gameIntro();

  let playerLife = 5; // Player's life

  // Choose between easy and hard storyline
  console.log(
    "Nathan is an advanced PADI deep diver. His day is nothing but ordinary. Somewhat, one would ask as of how could a focus fall into such a character of mundane leadings, following strawberry jam on a toast in the morning quarrel with his twin sibling. The refreshing scent of citrus in their kitchen, tea brewing on the stove. His sister Clarisse tells him of her previous near death encounter with a crazy patient at the clinic, handling the cups. Everything passes linear until he picks up his scuba diving gear and exits the introduction."
  );
  console.log(" ");
  console.log("Choose your preferred type of adventure:\n1. Day\n2. Night");

  const difficultyChoice = prompt(
    "Enter your choice (1 for Day, 2 for Night): "
  );
  console.log("*each choice leads to a complete different story line*");

  if (difficultyChoice === "1") {
    // Define questions and choices for the easy storyline
    const dayQuestions = [
      {
        // 0
        question:
          "Around noon, his tongue still feels prickly upon the tip from an accident with the tea Clarisse served. He should've known better, instead of rushing towards his favorite destination around the ruins of an alleged shipwreck Tempus Ansae. He hadn't been pondering beyond the surface levels of the waters, where he used to go as a child. For the first time, he felt rather innermost somersaults about his newly refreshing experience. He wanted to dive in deeper. This time go for the ruins.\nWith himself he takes his closed circuit rebreather, expecting a long dive for today, yet somehow:",
        choices: [
          "He forgets to check the tanks capacity",
          "He forgets to do the stretches",
        ],
        correctChoice: 1,
        nextQuestionIfCorrect: 1,
        nextQuestionIfIncorrect: 6,
      },
      {
        // 1
        question:
          "10m into the sea, nothing specific occurs. Nathan can feel his lungs in balance, breathing is stable, and his venture seems to have proven fruitful. Upon first glance, he notices a coral reef leading towards a muddier visage of wooden planks floating nearby. He assumes this might be his way to the shipwreck. However, he also wants to make sure his tank is properly filled, since he forgot.",
        choices: [
          "He ventures deeper anyways",
          "He decides to check his reservoir",
        ],
        correctChoice: 0,
        nextQuestionIfCorrect: 0,
        nextQuestionIfIncorrect: 2,
      },
      {
        // 2
        question:
          "15m deeper, he is closer than ever to the shipwreck and he can taste the nitrogen filling his lungs mixed with oxygen from the breather. Around him, the slow marine crustaceans follow their own paths, seaweed stretches around the remains of the ship. He notices sturdy planks closing a good chunk of the entrance in front of him. Dark mahogany reminds him of home.",
        choices: ["Break the planks", "Go for a round around the ship"],
        correctChoice: 1,
        nextQuestionIfCorrect: 3,
        nextQuestionIfIncorrect: 6,
      },
      {
        //
        // 3
        question:
          "Nathan breaks the planks, managing to squirm himself inside the ship, where he swims a deeper into the unknown. Clearly, he can notice the human touch mingled now with Nature's favor. Several items strike his attention as he rotates his body to lighten them up with his flashlight. A chandelier diamonds gleam across. He is mesmerized, yet his head is throbbing strangely.",
        choices: ["He decides to go out", "He wants to observe the ship more"],
        correctChoice: 1,
        nextQuestionIfCorrect: 6,
        nextQuestionIfIncorrect: 4,
      },
      {
        // 4
        question:
          "The brilliant hue of lights from the objects he highlights start to seep through his mind as a colorful display of agony. His headache worsens, his breath becomes raggedy as his body strangely starts to wobble one side of the ship to another. In the confined space which he cannot escape from, suddenly he enters an altered state of being. A near coma suffocation ensues.",
        choices: ["Continue suffocating silently", "Call for help"],
        correctChoice: 1,
        nextQuestionIfCorrect: 5,
        nextQuestionIfIncorrect: 8,
      },
      {
        // 5
        question:
          "As he continues to suffocate, feeling a strained pain bulging his eyes out, Nathan collapses into coma as his vision completely fades.\nHe wakes up in a hospital room. Clarisse quietly holds onto his hand, trembling small. He realizes it was all but a dream, a manifestation during his heart surgery that had to be performed and he has never been a professional diver to begin with. A coincidental fantasy he created makes him smile strained, happy he is alive...Though the strange prickle on his tongue from the tea remains.",
        choices: ["You've reached JACOB'S LADDER ENDING"],
      },
      {
        //
        // 6
        question:
          "12m into the waters, nothing specific occurs. Today he feels confident for some reason, so he continues to play around, swimming aimlessly like a child to fullfil an inner spark of joy. The sunlight shines through, he observes the nearby ruins.",
        choices: [
          "His inner curiosity makes him go towards it",
          "He stays for a bit longer",
        ],
        correctChoice: 1,
        nextQuestionIfCorrect: 2,
        nextQuestionIfIncorrect: 9,
      },
      {
        //
        // 7
        question:
          "For a short period of time, Nathan decides to resurface back. However, swimming back proves to be quite a task as of a sudden he starts noticing he has been going around in circles. Was his tank compromised? Could he have gone into induced pulmonary edema? As he begins to descend into an abyss of thoughts, he sees a light shining in the shipwreck nearby.",
        choices: [
          "He decides to follow the light",
          "Silently tries to calm down",
        ],
        correctChoice: 1,
        nextQuestionIfCorrect: 2,
        nextQuestionIfIncorrect: 8,
      },
      {
        // 8
        question:
          "Nothing could've prepared Nathan for what was about to ensue. Slowly he started to suffocate from nitrogen narcosis, which causes his vision to blur, ataxia following. Years of preparation, makes him wonder in the back of his mind how did this happen? The last thought before he drowns completely bring him to Clarisse, his twin sister smiling at the shore. Perhaps he should've listened to her long time ago, and become a lawyer instead...Then again, life would've been less worth living.",
        choices: ["You've reached THE UNEVENTFUL END"],
      },
      {
        // 9
        question:
          "Eventually some time passes. The marine life soothes the lungs of a passionate diver, distantly turning a beautiful pristine color of the sea even clearer. Nathan feels peace, fulfillment like no other, which in turn makes his choices sharper.",
        choices: ["His soul tells him to follow the ship"],
        correctChoice: 1,
        nextQuestionIfCorrect: 2,
      },
    ];

    for (
      let currentQuestionIndex = 0;
      currentQuestionIndex < dayQuestions.length;

    ) {
      const {
        question,
        choices,
        correctChoice,
        nextQuestionIfCorrect,
        nextQuestionIfIncorrect,
      } = dayQuestions[currentQuestionIndex];

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
          console.log("Nathan has lost his life. Game over");
          return;
        }
        currentQuestionIndex = nextQuestionIfIncorrect;
      }
    }
  } else if (difficultyChoice === "2") {
    // Define questions and choices for the hard storyline

    for (
      let currentQuestionIndex = 0;
      currentQuestionIndex < nightQuestions.length;

    ) {
      const {
        question,
        choices,
        correctChoice,
        nextQuestionIfCorrect,
        nextQuestionIfIncorrect,
      } = nightQuestions[currentQuestionIndex];

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
          console.log("Nathan has lost his life. Game over");
          return;
        }
        currentQuestionIndex = nextQuestionIfIncorrect;
      }
    }
  }

  clearConsole();
  console.log("Congratulations! You've completed the game.");
}

playGame();
