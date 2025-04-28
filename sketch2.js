let sk5 = function (p) {
  let gameState = "intro";
  let questionIndex = 0;
  let score = 0;
  let currentQuestion = {};
  let feedbackText = "";
  let correctChoice = "";
  let playerChoice = "";

  let questions = [
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

  function drawMickey(x, y) {
    // Ears (with highlight)
    p.noStroke();
    p.fill(30);
    p.ellipse(x - 22, y - 22, 28, 28);
    p.ellipse(x + 22, y - 22, 28, 28);
    p.fill(60);
    p.ellipse(x - 18, y - 26, 10, 8);
    p.ellipse(x + 18, y - 26, 10, 8);
    // Head
    p.fill(30);
    p.ellipse(x, y, 46, 46);
    p.fill(70);
    p.ellipse(x - 10, y - 10, 10, 8);
    // Face
    p.fill(255, 220, 180);
    p.ellipse(x, y + 10, 32, 26);
    // Eyes
    p.fill(255);
    p.ellipse(x - 6, y + 6, 6, 10);
    p.ellipse(x + 6, y + 6, 6, 10);
    p.fill(0);
    p.ellipse(x - 6, y + 9, 2, 4);
    p.ellipse(x + 6, y + 9, 2, 4);
    // Nose
    p.fill(0);
    p.ellipse(x, y + 16, 8, 5);
    // Smile
    p.noFill();
    p.stroke(80, 40, 20);
    p.strokeWeight(2);
    p.arc(x, y + 18, 14, 8, 0, p.PI);
    p.noStroke();
  }

  function drawMinnie(x, y) {
    // Ears
    p.noStroke();
    p.fill(30);
    p.ellipse(x - 22, y - 22, 28, 28);
    p.ellipse(x + 22, y - 22, 28, 28);
    p.fill(60);
    p.ellipse(x - 18, y - 26, 10, 8);
    p.ellipse(x + 18, y - 26, 10, 8);
    // Head
    p.fill(30);
    p.ellipse(x, y, 46, 46);
    p.fill(70);
    p.ellipse(x - 10, y - 10, 10, 8);
    // Face
    p.fill(255, 220, 180);
    p.ellipse(x, y + 10, 32, 26);
    // Eyes
    p.fill(255);
    p.ellipse(x - 6, y + 6, 6, 10);
    p.ellipse(x + 6, y + 6, 6, 10);
    p.fill(0);
    p.ellipse(x - 6, y + 9, 2, 4);
    p.ellipse(x + 6, y + 9, 2, 4);
    // Bow
    p.fill(255, 60, 120);
    p.ellipse(x, y - 20, 20, 12);
    p.ellipse(x - 10, y - 20, 10, 12);
    p.ellipse(x + 10, y - 20, 10, 12);
    p.fill(255, 120, 180, 200);
    p.ellipse(x, y - 20, 7, 7);
    // Nose
    p.fill(0);
    p.ellipse(x, y + 16, 8, 5);
    // Smile
    p.noFill();
    p.stroke(80, 40, 20);
    p.strokeWeight(2);
    p.arc(x, y + 18, 14, 8, 0, p.PI);
    p.noStroke();
  }

  function drawDonald(x, y) {
    // Head
    p.noStroke();
    p.fill(255);
    p.ellipse(x, y, 38, 38);
    // Cheek shading
    p.fill(230, 240, 255, 90);
    p.ellipse(x + 8, y + 8, 16, 10);
    // Beak
    p.fill(255, 210, 60);
    p.ellipse(x, y + 17, 22, 12);
    p.fill(255, 180, 40);
    p.ellipse(x, y + 21, 18, 7);
    // Eyes
    p.fill(255);
    p.ellipse(x - 6, y - 2, 7, 12);
    p.ellipse(x + 6, y - 2, 7, 12);
    p.fill(0);
    p.ellipse(x - 6, y + 2, 2, 5);
    p.ellipse(x + 6, y + 2, 2, 5);
    // Hat
    p.fill(0, 100, 255);
    p.arc(x, y - 16, 22, 14, p.PI, 0);
    p.fill(0, 100, 255);
    p.rect(x - 7, y - 24, 14, 7, 3);
    p.fill(255);
    p.ellipse(x, y - 16, 6, 4);
  }

  function drawGoofy(x, y) {
    // Head
    p.noStroke();
    p.fill(110, 60, 20);
    p.ellipse(x, y, 36, 44);
    // Ears
    p.fill(30);
    p.ellipse(x - 20, y + 8, 10, 32);
    p.ellipse(x + 20, y + 8, 10, 32);
    // Snout
    p.fill(240, 200, 150);
    p.ellipse(x, y + 22, 22, 18);
    // Nose
    p.fill(0);
    p.ellipse(x, y + 28, 8, 6);
    // Eyes
    p.fill(255);
    p.ellipse(x - 6, y + 4, 8, 13);
    p.ellipse(x + 6, y + 4, 8, 13);
    p.fill(0);
    p.ellipse(x - 6, y + 8, 2, 4);
    p.ellipse(x + 6, y + 8, 2, 4);
    // Smile
    p.noFill();
    p.stroke(80, 40, 20);
    p.strokeWeight(2);
    p.arc(x, y + 22, 15, 8, 0, p.PI);
    p.noStroke();
    // Hat
    p.fill(140, 220, 80);
    p.rect(x - 8, y - 26, 16, 10, 4);
    p.fill(80, 180, 40);
    p.ellipse(x, y - 26, 16, 8);
  }

  function drawPluto(x, y) {
    // Head
    p.noStroke();
    p.fill(230, 180, 40);
    p.ellipse(x, y, 40, 32);
    // Ears
    p.fill(30);
    p.ellipse(x - 22, y, 12, 28);
    p.ellipse(x + 22, y, 12, 28);
    // Nose
    p.fill(0);
    p.ellipse(x, y + 14, 10, 7);
    // Eyes
    p.fill(255);
    p.ellipse(x - 7, y - 4, 8, 10);
    p.ellipse(x + 7, y - 4, 8, 10);
    p.fill(0);
    p.ellipse(x - 7, y - 1, 2, 4);
    p.ellipse(x + 7, y - 1, 2, 4);
    // Smile
    p.noFill();
    p.stroke(80, 40, 20);
    p.strokeWeight(2);
    p.arc(x, y + 10, 16, 8, 0, p.PI);
    p.noStroke();
    // Collar
    p.fill(40, 120, 200);
    p.rect(x - 14, y + 6, 28, 4, 2);
  }

  let disneyFacts = [
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

  p.preload = function () {};

  p.setup = function () {
    p.createCanvas(800, 500);
    p.textFont("Verdana");
    p.textSize(18);
    p.textAlign(p.CENTER, p.CENTER);
    resetGame();
  };

  p.draw = function () {
    drawBackground();

    p.fill(30);
    p.noStroke();

    if (gameState === "intro") {
      p.textSize(28);
      p.text("🌿 Welcome to Eco Quest! 🌎", p.width / 2, p.height / 2 - 40);
      p.textSize(18);
      p.text("Press ENTER to begin your adventure.", p.width / 2, p.height / 2);
    } else if (gameState === "question") {
      drawQuestion(currentQuestion);
      drawDisneyCorner(questionIndex % disneyFacts.length);
    } else if (gameState === "feedback") {
      p.textSize(22);
      p.text(feedbackText, p.width / 2, p.height / 2 - 30);
      p.textSize(16);
      p.text("Press ENTER to continue.", p.width / 2, p.height / 2 + 30);
      drawDisneyCorner(questionIndex % disneyFacts.length);
    } else if (gameState === "end") {
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
      let idx = p.floor(p.random(disneyFacts.length));
      drawDisneyCorner(idx);
    }
  };

  function drawRestartButton() {
    let btnX = p.width / 2 - 75;
    let btnY = p.height / 2 + 80;
    let btnW = 150;
    let btnH = 50;
    let hovered =
      p.mouseX > btnX &&
      p.mouseX < btnX + btnW &&
      p.mouseY > btnY &&
      p.mouseY < btnY + btnH;
    p.fill(hovered ? "#b3e6b3" : "#f0f0f0");
    p.stroke(100, 180, 100);
    p.strokeWeight(2);
    p.rect(btnX, btnY, btnW, btnH, 14);
    p.fill(30);
    p.noStroke();
    p.textSize(20);
    p.text("Restart", p.width / 2, btnY + btnH / 2);
  }

  p.mousePressed = function () {
    if (gameState === "question") {
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
    } else if (gameState === "end") {
      let btnX = p.width / 2 - 75;
      let btnY = p.height / 2 + 80;
      let btnW = 150;
      let btnH = 50;
      if (
        p.mouseX > btnX &&
        p.mouseX < btnX + btnW &&
        p.mouseY > btnY &&
        p.mouseY < btnY + btnH
      ) {
        resetGame();
        gameState = "intro";
      }
    }
  };

  p.keyPressed = function () {
    if (gameState === "intro" && p.keyCode === p.ENTER) {
      gameState = "question";
    } else if (gameState === "question") {
      let input = p.key.toUpperCase();
      if (input === "A" || input === "B") {
        handleAnswer(input);
      }
    } else if (gameState === "feedback" && p.keyCode === p.ENTER) {
      questionIndex++;
      if (questionIndex < questions.length) {
        currentQuestion = questions[questionIndex];
        gameState = "question";
      } else {
        gameState = "end";
      }
    } else if (gameState === "end" && (p.key === "r" || p.key === "R")) {
      resetGame();
      gameState = "intro";
    }
  };

  p.keyTyped = function () {
    if (gameState === "question") {
      let input = p.key.toLowerCase();
      if (input === "a" || input === "b") {
        handleAnswer(input.toUpperCase());
      } else {
        let normalized = input.trim().toLowerCase();
        for (let i = 0; i < currentQuestion.options.length; i++) {
          let answerText = currentQuestion.options[i].toLowerCase();
          if (answerText.includes(normalized)) {
            handleAnswer(currentQuestion.options[i][0].toUpperCase());
          }
        }
      }
    }
  };

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

  function resetGame() {
    questionIndex = 0;
    score = 0;
    currentQuestion = questions[questionIndex];
    feedbackText = "";
    correctChoice = "";
    playerChoice = "";
  }

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

  function drawCloud(x, y, scale = 1) {
    p.noStroke();
    p.fill(255, 255, 255, 230);
    p.ellipse(x, y, 60 * scale, 60 * scale);
    p.ellipse(x + 30 * scale, y - 10 * scale, 50 * scale, 50 * scale);
    p.ellipse(x + 60 * scale, y, 60 * scale, 60 * scale);
    p.ellipse(x + 30 * scale, y + 10 * scale, 70 * scale, 50 * scale);
  }

  function drawTree(x, y) {
    p.fill(101, 67, 33);
    p.rect(x - 7, y + 30, 14, 50, 5);
    p.fill(34, 139, 34);
    p.ellipse(x, y + 10, 60, 50);
    p.ellipse(x - 20, y + 25, 50, 40);
    p.ellipse(x + 20, y + 25, 50, 40);
  }

  function drawDisneyCorner(idx) {
    let cornerX = p.width - 150;
    let cornerY = p.height - 140;
    p.fill(255, 255, 255, 235);
    p.stroke(180);
    p.strokeWeight(2);
    p.rect(cornerX - 20, cornerY - 60, 170, 90, 18);
    p.triangle(
      cornerX + 20,
      cornerY + 30,
      cornerX + 40,
      cornerY + 30,
      cornerX + 30,
      cornerY + 60
    );
    p.noStroke();
    p.fill(40);
    p.textSize(13);
    p.text(disneyFacts[idx].fact, cornerX + 65, cornerY - 15, 120, 70);
    disneyFacts[idx].draw(cornerX, cornerY + 55);
  }
};

// Mount the sketch into the div with id "c3"
new p5(sk5, "c3");
