// BREATHE - text-based terminal horror game brought to you by Kostas & Tyhe

const prompt = require("prompt-sync")({ sigint: true });

// Player's life
function displayLife(playerLife) {
  return "* ".repeat(playerLife);
}

function clearConsole() {
  console.log("\x1Bc");
}

function gameIntro() {
  console.log(`\nDive into an epic underwater adventure filled with mysteries and challenges that waiting you in the depths of the ocean. You are a brave explorer seeking hidden treasures and secrets of the deep, but be careful your oxygen is limited! \nYou start your journey with 5 precious breaths lives. Each wrong decision will cost you a breath. Can you make the right choices and complete your underwater odyssey before your breath runs out? \nChoose wisely and discover the riches of the deep sea. Your choices will shape your destiny in this thrilling underwater game. \nAre you ready to plunge into the unknown?\n\nPress ENTER to start your underwater adventure.......`);
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
    const userChoice = parseInt(prompt("\nYour choice: "));

    if (isNaN(userChoice) || userChoice < 1 || userChoice > choices.length) {
      process.stdout.write("\r               *Please enter a valid choice*\r");
    } else return userChoice === correctChoice; // Return true if the user's choice is correct.
  }
}

// Displayed on the console in the beginning
async function playGame() {
  clearConsole();

  await loadingBar(5000, 100);

  console.log(" *.       *                        *.")
  console.log("       *.                              .*.*")
  console.log("           *.*.*.* BREATHE *.*.*.*");
  console.log("An interactive horror story about Thalassophobia");
  console.log(" ");
  gameIntro();

  let playerLife = 5; // Player's life

  // Choose between day and night storyline
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
    // Define questions and choices for the day storyline
    const dayQuestions = [
      {
        // 0
        question:
          "\nAround noon, his tongue still feels prickly upon the tip from an accident with the tea Clarisse served. He should've known better, instead of rushing towards his favorite destination around the ruins of an alleged shipwreck Tempus Ansae. He hadn't been pondering beyond the surface levels of the waters, where he used to go as a child. For the first time, he felt rather innermost somersaults about his newly refreshing experience. He wanted to dive in deeper. This time go for the ruins.\nWith himself he takes his closed circuit rebreather, expecting a long dive for today, yet somehow:\n",
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
          "\n10m into the sea, nothing specific occurs. Nathan can feel his lungs in balance, breathing is stable, and his venture seems to have proven fruitful. Upon first glance, he notices a coral reef leading towards a muddier visage of wooden planks floating nearby. He assumes this might be his way to the shipwreck. However, he also wants to make sure his tank is properly filled, since he forgot.\n",
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
          "\n15m deeper, he is closer than ever to the shipwreck and he enjoys the silence of the breather. Around him, the slow marine crustaceans follow their own paths, seaweed stretches around the remains of the ship. He notices sturdy planks closing a good chunk of the entrance in front of him. Dark mahogany reminds him of home.",
        choices: ["Break the planks", "Go for a round around the ship\n"],
        correctChoice: 1,
        nextQuestionIfCorrect: 3,
        nextQuestionIfIncorrect: 6,
      },
      {
        // 3
        question:
          "\nNathan breaks the planks, managing to squirm himself inside the ship, where he swims deeper into the unknown. Clearly, he can notice the human touch mingled now with Nature's favor. Several items strike his attention as he rotates his body to lighten them up with his flashlight. A chandelier diamonds gleam across. He is mesmerized, yet his head is throbbing strangely.",
        choices: ["He decides to go out", "He wants to observe the ship more\n"],
        correctChoice: 1,
        nextQuestionIfCorrect: 9,
        nextQuestionIfIncorrect: 4,
      },
      {
        // 4
        question:
          "\nThe brilliant hue of lights from the objects he highlights start to seep through his mind as a colorful display of agony. His headache worsens, his breath becomes raggedy as his body strangely starts to wobble one side of the ship to another. In the confined space which he cannot escape from, suddenly he enters an altered state of being. A near coma suffocation ensues.\n",
        choices: ["Continue suffocating silently", "Call for help"],
        correctChoice: 1,
        nextQuestionIfCorrect: 5,
        nextQuestionIfIncorrect: 8,
      },
      {
        // 5
        question:
          "\nAs he continues to suffocate, feeling a strained pain bulging his eyes out, Nathan collapses into coma as his vision completely fades.\nHe wakes up in a hospital room. Clarisse quietly holds onto his hand, trembling small. He realizes it was all but a dream, a manifestation during his heart surgery that had to be performed and he has never been a professional diver to begin with. A coincidental fantasy he created makes him smile strained, happy he is alive...Though the strange prickle on his tongue from the tea remains.\n",
        choices: ["You've reached JACOB'S LADDER ENDING"],
      },
      {
        // 6
        question:
          "\n5m into the waters, nothing specific occurs. Today he feels confident for some reason, so he continues to play around, swimming aimlessly like a child to fullfil an inner spark of joy. The sunlight shines through, he observes the nearby ruins.\n",
        choices: [
          "His inner curiosity makes him go towards it",
          "He stays for a bit longer",
        ],
        correctChoice: 1,
        nextQuestionIfCorrect: 2,
        nextQuestionIfIncorrect: 9,
      },
      {
        // 7
        question:
          "\nFor a short period of time, Nathan decides to resurface back. However, swimming back proves to be quite a task as of a sudden he starts noticing he has been going around in circles. Was his tank compromised? Could he have gone into induced pulmonary edema? As he begins to descend into an abyss of thoughts, he sees a light shining in the shipwreck nearby.\n",
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
          "\nNothing could've prepared Nathan for what was about to ensue. Slowly he started to suffocate from nitrogen narcosis, which causes his vision to blur, ataxia following. Years of preparation, makes him wonder in the back of his mind how did this happen? The last thought before he drowns completely bring him to Clarisse, his twin sister smiling at the shore. Perhaps he should've listened to her long time ago, and become a lawyer instead...Then again, life would've been less worth living.\n",
        choices: ["You've reached THE UNEVENTFUL END"],
      },
      {
        // 9
        question:
          "\nEventually some time passes. The marine life soothes the lungs of a passionate diver, distantly turning a beautiful pristine color of the sea even clearer. Nathan feels peace, fulfillment like no other, which in turn makes his choices sharper.\n",
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

      console.log(`|Breathe: ${displayLife(playerLife)}|`);

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
    const nightQuestions = [
      {
        // 0
        question:
          "\nDiving at night was always considerably more exciting than during the day. Many of the nocturnal creatures would venture out from their slumbering abodes, humbly resting on the reefs or the comfortable ocean floor, playing with the waves. The primordial soup of mimicry would ensue, certain colors of radiant green or blue happened to be their favorite choice of entertainment, warming them cosy from the above moon. Nathan enjoyed such display the most and usually he'd take a friend or two just for a precautionary safety, yet somehow today he felt frisky. There was certainly a risk he wanted to take and prove his sister Clarisse he was capable of even such bold moves. Nevertheless, he picked his diving gear.\nAnd he was faced with a dilemma.\n",
        choices: [
          "Should he take his rebreather",
          "Go without one",
        ],
        correctChoice: 1,
        nextQuestionIfCorrect: 1,
        nextQuestionIfIncorrect: 7,
      },
      {
        // 1
        question:
          "\nJust in case to be sure he could traverse the waters for a longer period and also stay deeper, he decided to go with his closed circuit rebreather. He chuckled, it was an obvious choice to make after all. He clapped with his hands and dived in. Not long after, the cold water embraced his body, sending slight pleasant shiver throughout his spine and skin. He swam longer and then...\n",
        choices: [
          "Choose to go for a 30m dive",
          "Stay on the shallow waters",
        ],
        correctChoice: 1,
        nextQuestionIfCorrect: 2,
        nextQuestionIfIncorrect: 8,
      },
      {
        // 2
        question:
          "\nWhenever he had to go for such a feat of a dive, Nathan liked to remember a memory from his childhood. His favorite book was Twenty Thousand Leagues Under the Sea by Jules Verne. A fantastical voyage of a so called 'monster' of a submarine menacingly cruising the depths. He'd wonder how would it feel if he was the same explorer as the almighty Captain Nemo. Such sentiments held him for a long time.\n",
        choices: ["His body led him astray", "He swayed to the nearby cavern"],
        correctChoice: 1,
        nextQuestionIfCorrect: 7,
        nextQuestionIfIncorrect: 3,
      },
      {
        // 3
        question:
          "\nAs his body followed his instincts, he found himself inside a longitudinal cavern seemingly without an end. The darkness engulfed him. For a mere recreational diver this would've been an alarm to go out, however Nathan was confident about his skills which soon proved to be his faulty lack of judgement. His flashlight turned a haste left when he noticed milky thin what seemed to be human like fingers.\n",
        choices: ["He decides to touch them", "Turn around and swim away"],
        correctChoice: 1,
        nextQuestionIfCorrect: 9,
        nextQuestionIfIncorrect: 4,
      },
      {
        // 4
        question:
          "\nHe swims away in a vigorous pace. Fighting with his willpower to turn around, his breath fills the mask with oxygen, leaving a bit of space to delirium. He can sense that something chasing him, the currents swish beside him sharp. Alert, he goes for another dark muddy area of water in order to lose his own tracks. Suddenly he loses breath. His eyes transfix to strange lights behind him.\n",
        choices: ["Try to swim more up", "Breathe in a face of the threat"],
        correctChoice: 1,
        nextQuestionIfCorrect: 5,
        nextQuestionIfIncorrect: 9,
      },
      {
        // 5
        question:
          "\nBubbles of air comfort his way as the body of water envelop his tiredness. His hands barely reach forward, leading him closer to the surface. However, there is as much one can do in amidst the dark vast sea, faintly lit by the moonlight. The urge to survive clings him to set a choice again\n",
        choices: [
          "Turn around to check for any threat",
          "Keep going up",
        ],
        correctChoice: 1,
        nextQuestionIfCorrect: 9,
        nextQuestionIfIncorrect: 6,
      },
      {
        // 6
        question:
          "\nHe keeps going up, which ultimately proves to be his hopeful demise. Finally on the surface, Nathan takes the mask off, jumping onto the edge of his boat. His hands are trembling. Once more, he points his flashlight towards the deep darkness, but nothing is there tk be seen. He sighs of relief. Did he just hallucinate or was there actually somewhere in the bottom of 30m? He might never know. Sometimes it's best to never ponder deeper upon such thoughts. Lastly, he calms down\n",
        choices: [
          "Tonight, he feels victorious. The Moon smiles. You've reached the MEMENTO MORI ENDING",
        ],
        
      },
      {
        // 7
        question:
          "\nTaking a risk such a this, Nathan knew he would have to go by his instincts. And oftentimes he loved a good challenge. There was a time where he thought if he didn't risk to become a professional diver, his life would lose any meaning, and he'd rather choose to go all in or nothing for the sake of a passionate pursuit. Something his twin sister would never understand. Thus, he began to confidently dive deeper.\n",
        choices: ["He went for 15m", "A certain coral reef catches his interest"],
        correctChoice: 1,
        nextQuestionIfCorrect: 2,
        nextQuestionIfIncorrect: 8,
      },
      {
        // 8
        question:
          "\nAs he continued to traverse the shallow but safer parts of the night marine seabed, he noticed a beautiful octopus swarming around. He comes closer to observe it and soon enough finds himself fully mesmerized by its patterns and texture. Perhaps he should just stay here forever, and enjoy the show but as time passes, he realizes the story must somehow move on...\n",
        choices: ["Go to the surface", "Dive deeper"],
        correctChoice: 1,
        nextQuestionIfCorrect: 10,
        nextQuestionIfIncorrect: 2,
      },
      {
        // 9
        question:
          "\nThe moment lasted for perhaps a second and a half before he was caught by an unexplained human like creature with long fingers, bulgy high eyes and sharp teeth. He knows he cannot escape anymore, calling for help seems futile.\nThe creature wraps him around its body, slowly suffocating him and piercing their teeth through his diving suit, reaching his skin. The water fills with blood. Nathan never saw it coming, and now no one will ever know what happened...In the deepest corners of the sea.\n",
        choices: ["You've reached THE GORY ENDING"],
      },
      {
        // 10
        question:
          "\nHe keeps going up, which ultimately proves to be his hopeful demise. Finally on the surface, Nathan takes the mask off, jumping onto the edge of his boat. He sighs of relief. Tonight perhaps he hadn't had the most intriguing exploration, and somehow that just happens to be what he was looking for.\n",
        choices: [
          "Tonight, he feels victorious. The Moon smiles. You've reached the MEMENTO MORI ENDING",
        ],
      },
    ];

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

      console.log(`|Breathe: ${displayLife(playerLife)}|`);

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
