var sk2 = function (p) {
  let table;
  let years = [],
    temps = [],
    disneyChars = [];

  // Scaling factor for character size
  const scaleFactor = 2;

  p.preload = function () {
    table = p.loadTable("data/rising_temps.csv", "csv", "header");
    let filenames = [
      "cruella.png",
      "scar.png",
      "Hans.webp",
      "gothel.webp",
      "gaston.webp",
      "stitch.webp",
      "mickeymouse.svg",
      "snow.png",
    ];
    for (let file of filenames) {
      disneyChars.push(p.loadImage("characters/" + file));
    }
  };

  p.setup = function () {
    for (let r = 0; r < table.getRowCount(); r++) {
      years[r] = table.getNum(r, 0);
      temps[r] = table.getNum(r, 1);
    }
    p.createCanvas(p.windowWidth * 0.9, p.windowHeight * 0.9);
    p.textFont("Helvetica");
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function () {
    p.background("#f9f9fb");
    drawThermometer();
    drawSparkles();
    drawTemperatureLegend(p, 40, 40);
  };

  function drawThermometer() {
    let cx = p.width / 2;
    let cy = p.height / 2;
    let tWidth = p.width * 0.75;
    let tHeight = 50;

    // Shadow
    p.push();
    p.noStroke();
    p.fill(0, 20);
    p.ellipse(p.width * 0.87 + 8, cy + 8, 80, 80);
    p.pop();

    // Gradient fill
    let ctx = p.drawingContext;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(
      cx - tWidth / 2 + 6,
      cy - (tHeight / 2 - 6),
      tWidth - 12,
      tHeight - 12,
      20
    );
    ctx.clip();

    let gradient = ctx.createLinearGradient(
      cx - tWidth / 2,
      cy,
      cx + tWidth / 2,
      cy
    );
    gradient.addColorStop(0, "#1f77d9");
    gradient.addColorStop(1, "#d91f4e");
    ctx.fillStyle = gradient;
    ctx.fillRect(
      cx - tWidth / 2 + 6,
      cy - (tHeight / 2 - 6),
      tWidth - 12,
      tHeight - 12
    );
    ctx.restore();

    // Thermometer outline
    p.push();
    p.stroke("#333");
    p.strokeWeight(5);
    p.noFill();
    p.rectMode(p.CENTER);
    p.rect(cx, cy, tWidth, tHeight, 25);
    p.pop();

    // Bulb
    p.fill("#d91f4e");
    p.ellipse(p.width * 0.87, cy, 80, 80);
    p.fill(255, 100);
    p.ellipse(p.width * 0.87 - 10, cy - 15, 20, 15);

    let topOffset = -120;
    let bottomOffset = 120;
    let yOffset;
    let displayTop;

    for (let i = 0; i < years.length; i++) {
      let xVal = p.map(temps[i], 64, 76, p.width * 0.15, p.width * 0.85);

      //let yOffset = i % 2 == 0 ? topOffset : bottomOffset;

      if (i % 2 == 0) {
        yOffset = topOffset;
        displayTop = true;
      } else {
        yOffset = bottomOffset;
        displayTop = false;
      }

      // draw the line from character to the thermometer
      p.stroke("#aaa");
      if (displayTop) {
        p.line(xVal, cy - 25, xVal, cy + yOffset);
      } else {
        p.line(xVal, cy + 25, xVal, cy + yOffset);
      }

      p.noStroke();
      p.fill("#222");
      p.textSize(16);
      if (displayTop) {
        p.text(`${years[i]}, ${temps[i]}°`, xVal - 40, cy + yOffset - 50);
      } else {
        p.text(
          `${years[i]}, ${temps[i]}°`,
          xVal - 40,
          cy + yOffset + 40 * scaleFactor
        );
      }

      p.image(
        disneyChars[i],
        xVal - 40,
        cy + yOffset - 35,
        40 * scaleFactor,
        40 * scaleFactor
      );
    }

    // Title
    p.push();
    p.textSize(24);
    p.fill(0);
    p.textFont("Verdana");
    p.text("Yearly Temperature Rise", p.width / 2.5, p.height * 0.05);
    p.pop();

    // Description
    p.push();
    p.textSize(14);
    p.fill(0);
    p.textFont("Verdana");
    p.text(
      "This graph shows the rise in temperature over the years.",
      p.width / 2.75,
      p.height * 0.1
    );
    p.pop();
  }

  function drawSparkles() {
    for (let i = 0; i < temps.length; i++) {
      let xVal = p.map(temps[i], 64, 76, p.width * 0.15, p.width * 0.85);
      let cy = p.height / 2;
      let sparkleY = cy + (i % 2 === 0 ? 120 : -120);

      if (p.dist(p.mouseX, p.mouseY, xVal, sparkleY) < 40) {
        p.push();
        for (let j = 0; j < 10; j++) {
          let angle = p.radians(j * 36);
          let r2 = 20 + p.sin(p.frameCount * 0.2 + j) * 5;
          let x2 = xVal + r2 * p.cos(angle);
          let y2 = sparkleY + r2 * p.sin(angle);
          p.stroke("#fff700");
          p.strokeWeight(2);
          p.line(xVal, sparkleY, x2, y2);
        }
        p.pop();
      }
    }

    // Sparkles on thermometer body
    let bulbX = p.width * 0.85;
    let tubeLeftX = p.width * 0.15;
    let mouseX = p.mouseX;
    let mouseY = p.mouseY;

    if (
      mouseX > tubeLeftX &&
      mouseX < bulbX + 40 &&
      mouseY > p.height / 2 - 25 &&
      mouseY < p.height / 2 + 25
    ) {
      let sparkleX = mouseX;
      p.push();
      p.stroke("#ffe866");
      p.strokeWeight(2);
      for (let j = 0; j < 12; j++) {
        let angle = p.radians(j * 30);
        let r2 = 20 + p.random(5);
        let x2 = sparkleX + r2 * p.cos(angle);
        let y2 = p.height / 2 + r2 * p.sin(angle);
        p.line(sparkleX, p.height / 2, x2, y2);
      }
      p.pop();
    }
  }

  function drawTemperatureLegend(p, x, y) {
    p.textSize(18);
    p.textStyle(p.BOLD);
    // Red: High Temperature
    p.fill("#e53935"); // Bright red
    p.rect(x, y, 24, 24, 5);
    p.fill(50);
    p.textAlign(p.LEFT, p.CENTER);
    p.text("High Temperature", x + 36, y + 12);

    // Blue: Low Temperature
    p.fill("#1e88e5"); // Bright blue
    p.rect(x, y + 36, 24, 24, 5);
    p.fill(50);
    p.text("Low Temperature", x + 36, y + 48);

    // // Legend title
    // p.textSize(16);
    // p.textStyle(p.NORMAL);
    // p.fill(80);
    // p.text("Temperature", x, y - 10);
  }
};

new p5(sk2, "c2");
