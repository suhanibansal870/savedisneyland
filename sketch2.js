let sk5 = function (p) {
  // --- State variables ---
  let gameState,
    questionIndex,
    score,
    currentQuestion,
    feedbackText,
    correctChoice,
    playerChoice;

  // --- Questions array ---
  const questions = [
    {
      text: "🌍 What exactly *is* climate change?",
      options: [
        "A) A weather app",
        "B) A long-term shift in Earth's climate patterns",
      ],
      correct: "B",
    },
    {
      text: "🔥 What human activity heats up our planet?",
      options: ["A) Taking naps", "B) Burning fossil fuels like gas"],
      correct: "B",
    },
    {
      text: "🌲 What happens when forests disappear?",
      options: ["A) More greenhouse gases", "B) Fresher smelling air"],
      correct: "A",
    },
    {
      text: "🦊 How does climate change affect animals?",
      options: ["A) They fly faster!", "B) It's harder for them to survive"],
      correct: "B",
    },
    {
      text: "😷 What's really in polluted air?",
      options: ["A) Harmful stuff", "B) Just fluffy clouds"],
      correct: "A",
    },
    {
      text: "🚗 Why is air pollution near Disneyland a thing?",
      options: ["A) Magic shows", "B) Cars and buses zooming around"],
      correct: "B",
    },
    {
      text: "👧 Why are kids more affected by bad air?",
      options: ["A) Smaller lungs", "B) They're too tall?"],
      correct: "A",
    },
    {
      text: "🔌 How is Disneyland going greener?",
      options: ["A) Switching to electric rides!", "B) More balloon giveaways"],
      correct: "A",
    },
    {
      text: "🏁 Which ride is getting electric cars?",
      options: ["A) Autopia", "B) Jungle Cruise"],
      correct: "A",
    },
    {
      text: "🗑️ How can *you* help Disneyland stay clean?",
      options: ["A) Toss trash in bins", "B) Feed churros to ducks"],
      correct: "A",
    },
    {
      text: "🌟 You spot trash at the park. What now?",
      options: ["A) Pick it up like a hero!", "B) Walk past it"],
      correct: "A",
    },
    {
      text: "🌱 A green club starts at school. Do you...",
      options: ["A) Join and make change!", "B) Keep gaming all day"],
      correct: "A",
    },
  ];

  // --- Disney facts with character drawing functions ---
  const disneyFacts = [
    {
      character: "Mickey",
      fact: "Mickey Mouse debuted in 1928!",
      draw: drawMickey,
    },
    {
      character: "Donald",
      fact: "Donald Duck has starred in more films than any other Disney character.",
      draw: drawDonald,
    },
    {
      character: "Goofy",
      fact: "Goofy's original name was Dippy Dawg.",
      draw: drawGoofy,
    },
    {
      character: "Minnie",
      fact: "Minnie Mouse's full name is Minerva Mouse.",
      draw: drawMinnie,
    },
    {
      character: "Pluto",
      fact: "Pluto is Mickey's loyal pet dog.",
      draw: drawPluto,
    },
  ];

  // --- Setup ---
  p.setup = function () {
    p.createCanvas(800, 500);
    p.textFont("Verdana");
    p.textSize(18);
    p.textAlign(p.CENTER, p.CENTER);
    resetGame();
  };

  // --- Draw Loop ---
  p.draw = function () {
    drawBackground();

    p.fill(30);
    p.noStroke();

    switch (gameState) {
      case "intro":
        p.textSize(28);
        p.text("🌿 Welcome to Eco Quest! 🌎", p.width / 2, p.height / 2 - 40);
        p.textSize(18);
        p.text(
          "Press ENTER or tap/click anywhere to begin.",
          p.width / 2,
          p.height / 2
        );
        break;

      case "question":
        drawQuestion(currentQuestion);
        drawDisneyCorner(questionIndex % disneyFacts.length);
        break;

      case "feedback":
        p.textSize(22);
        p.text(feedbackText, p.width / 2, p.height / 2 - 30);
        p.textSize(16);
        p.text(
          "Press ENTER or tap/click to continue.",
          p.width / 2,
          p.height / 2 + 30
        );
        drawDisneyCorner(questionIndex % disneyFacts.length);
        break;

      case "end":
        p.textSize(28);
        p.text("🎉 Adventure Complete!", p.width / 2, p.height / 2 - 30);
        p.textSize(20);
        p.text(
          `Your eco score: ${score}/${questions.length}`,
          p.width / 2,
          p.height / 2
        );
        p.textSize(16);
        p.text(
          "Thanks for helping the planet! 🌎",
          p.width / 2,
          p.height / 2 + 40
        );
        drawRestartButton();
        drawDisneyCorner(1);
        break;
    }
  };

  // --- Mouse Interaction ---
  p.mousePressed = function () {
    if (gameState === "intro") {
      gameState = "question";
    } else if (gameState === "question") {
      for (let i = 0; i < currentQuestion.options.length; i++) {
        let y = 260 + i * 90;
        if (
          p.mouseX > 150 &&
          p.mouseX < 650 &&
          p.mouseY > y - 40 &&
          p.mouseY < y + 40
        ) {
          let selected = currentQuestion.options[i].charAt(0).toUpperCase();
          handleAnswer(selected);
        }
      }
    } else if (gameState === "feedback") {
      nextQuestionOrEnd();
    } else if (gameState === "end") {
      // Restart on any click
      resetGame();
      gameState = "intro";
    }
  };

  // --- Keyboard Interaction ---
  p.keyPressed = function () {
    if (gameState === "intro" && p.keyCode === p.ENTER) {
      gameState = "question";
    } else if (gameState === "question") {
      let input = p.key.toUpperCase();
      if (input === "A" || input === "B") {
        handleAnswer(input);
      }
    } else if (gameState === "feedback" && p.keyCode === p.ENTER) {
      nextQuestionOrEnd();
    } else if (gameState === "end" && (p.key === "r" || p.key === "R")) {
      resetGame();
      gameState = "intro";
    }
  };

  // --- Handle answer logic ---
  function handleAnswer(choice) {
    playerChoice = choice;
    correctChoice = currentQuestion.correct;
    if (choice === correctChoice) {
      feedbackText = "✅ Correct! Great job!";
      score++;
    } else {
      feedbackText = `❌ Not quite. The correct answer was: ${correctChoice})`;
    }
    gameState = "feedback";
  }

  // --- Move to next question or end game ---
  function nextQuestionOrEnd() {
    questionIndex++;
    if (questionIndex < questions.length) {
      currentQuestion = questions[questionIndex];
      gameState = "question";
    } else {
      gameState = "end";
    }
  }

  // --- Reset game state ---
  function resetGame() {
    gameState = "intro";
    questionIndex = 0;
    score = 0;
    currentQuestion = questions[questionIndex];
    feedbackText = "";
    correctChoice = "";
    playerChoice = "";
  }

  // --- Draw question and options ---
  function drawQuestion(q) {
    p.fill(40);
    p.textSize(20);
    p.text(
      `Question ${questionIndex + 1} of ${questions.length}`,
      p.width / 2,
      50
    );

    p.textSize(18);
    p.text(q.text, p.width / 2, 110);
    for (let i = 0; i < q.options.length; i++) {
      let y = 260 + i * 90;
      let isHovered =
        p.mouseX > 150 &&
        p.mouseX < 650 &&
        p.mouseY > y - 40 &&
        p.mouseY < y + 40;
      p.fill(isHovered ? "#b3e6b3" : "#f0f0f0");
      p.stroke(180);
      p.strokeWeight(2);
      p.rect(150, y - 40, 500, 80, 20);
      p.fill(20);
      p.noStroke();
      p.text(q.options[i], p.width / 2, y);
    }
  }

  // --- Draw restart button ---
  function drawRestartButton() {
    let btnX = p.width / 2 - 75;
    let btnY = p.height / 2 + 80;
    let btnW = 150;
    let btnH = 50;
    p.fill("#b3e6b3");
    p.stroke(180);
    p.strokeWeight(2);
    p.rect(btnX, btnY, btnW, btnH, 20);
    p.fill(30);
    p.noStroke();
    p.textSize(20);
    p.text("Restart", p.width / 2, btnY + btnH / 2);
  }

  // --- Draw background based on question theme ---
  function drawBackground() {
    let theme = "default";
    if (gameState === "question") {
      if (currentQuestion.text.includes("air")) theme = "pollution";
      else if (currentQuestion.text.includes("forest")) theme = "forest";
      else if (currentQuestion.text.includes("animal")) theme = "wildlife";
      else if (currentQuestion.text.includes("Disneyland")) theme = "disney";
    }

    if (theme === "pollution") {
      p.background(180);
      p.fill(120);
      p.ellipse(120, 90, 70);
      p.ellipse(160, 80, 90);
    } else if (theme === "forest") {
      p.background(180, 220, 180);
      drawTree(100, 370);
      drawTree(700, 370);
      drawTree(400, 360);
    } else if (theme === "wildlife") {
      p.background(210, 255, 240);
      p.fill(100, 200, 100);
      p.rect(0, 450, p.width, 50);
      p.ellipse(400, 300, 60, 30);
    } else if (theme === "disney") {
      p.background(255, 245, 200);
      p.fill(200, 100, 255);
      p.textSize(14);
      p.text("🎠 Disneyland!", 400, 30);
    } else {
      // Default: sky gradient, clouds, grass, trees
      for (let y = 0; y < p.height; y++) {
        let inter = p.map(y, 0, p.height, 0, 1);
        let c = p.lerpColor(
          p.color(135, 206, 235),
          p.color(255, 255, 255),
          inter
        );
        p.stroke(c);
        p.line(0, y, p.width, y);
      }
      drawCloud(120, 80, 1.3);
      drawCloud(300, 60, 1.6);
      drawCloud(600, 90, 1.2);
      p.fill(120, 200, 100);
      p.rect(0, 450, p.width, 50);
      drawTree(100, 370);
      drawTree(700, 370);
    }
  }

  // --- Draw a cloud ---
  function drawCloud(x, y, scale = 1) {
    p.noStroke();
    p.fill(255, 255, 255, 230);
    p.ellipse(x, y, 60 * scale, 60 * scale);
    p.ellipse(x + 30 * scale, y - 10 * scale, 50 * scale, 50 * scale);
    p.ellipse(x + 60 * scale, y, 60 * scale, 60 * scale);
    p.ellipse(x + 30 * scale, y + 10 * scale, 70 * scale, 50 * scale);
  }

  // --- Draw a tree ---
  function drawTree(x, y) {
    p.fill(101, 67, 33);
    p.rect(x - 7, y + 30, 14, 50, 5);
    p.fill(34, 139, 34);
    p.ellipse(x, y + 10, 60, 50);
    p.ellipse(x - 20, y + 25, 50, 40);
    p.ellipse(x + 20, y + 25, 50, 40);
  }

  // --- Draw Disney character and fact bubble ---
  function drawDisneyCorner(index) {
    let fact = disneyFacts[index % disneyFacts.length];
    let textX = p.width - 160;
    let textY = p.height - 60;
    let bubbleWidth = 180;
    let bubbleHeight = 90;
    p.fill(255);
    p.stroke(180);
    p.strokeWeight(2);
    p.rect(
      textX + 70 - bubbleWidth / 2,
      textY - bubbleHeight,
      bubbleWidth,
      bubbleHeight,
      15
    );
    p.noStroke();
    p.fill(255);
    p.triangle(
      textX + 70 - 10,
      textY,
      textX + 70 + 10,
      textY,
      textX + 70,
      textY + 15
    );

    // Draw character
    fact.draw(textX + 40, textY + 40);

    // Draw fact text
    p.fill(30);
    p.textSize(13);
    p.textAlign(p.CENTER, p.CENTER);
    p.textWrap(p.WORD);
    p.text(
      fact.fact,
      textX,
      textY - bubbleHeight / 2 + bubbleHeight / 4,
      bubbleWidth - 20
    );
  }

  // --- Cartoon character drawing placeholders ---
  function drawMickey(x, y) {
    // Simple Mickey Mouse head
    p.fill(0);
    p.ellipse(x, y, 36, 36);
    p.ellipse(x - 18, y - 18, 18, 18);
    p.ellipse(x + 18, y - 18, 18, 18);
  }
  function drawDonald(x, y) {
    // Simple Donald Duck head
    p.fill(255);
    p.ellipse(x, y, 36, 36);
    p.fill(255, 204, 0);
    p.ellipse(x, y + 18, 24, 10);
    p.fill(0, 153, 255);
    p.rect(x - 12, y - 18, 24, 8, 4);
  }
  function drawGoofy(x, y) {
    // Simple Goofy head
    p.fill(80, 50, 20);
    p.ellipse(x, y, 36, 36);
    p.fill(0, 180, 0);
    p.rect(x - 8, y - 28, 16, 10, 4);
    p.ellipse(x, y - 24, 16, 8);
  }
  function drawMinnie(x, y) {
    // Simple Minnie Mouse head with bow
    p.fill(0);
    p.ellipse(x, y, 36, 36);
    p.ellipse(x - 18, y - 18, 18, 18);
    p.ellipse(x + 18, y - 18, 18, 18);
    p.fill(255, 0, 120);
    p.ellipse(x, y - 20, 16, 10);
    p.rect(x - 8, y - 25, 16, 8, 4);
  }
  function drawPluto(x, y) {
    // Simple Pluto head
    p.fill(255, 220, 80);
    p.ellipse(x, y, 36, 36);
    p.fill(0);
    p.ellipse(x - 16, y + 10, 10, 20);
    p.ellipse(x + 16, y + 10, 10, 20);
  }
};

new p5(sk5, "c3");
