var sk1 = function (p) {
  let aqi2020 = [],
    aqi2024 = [],
    months = [],
    characters = [],
    table;
  let show2020 = true,
    show2024 = true;

  p.preload = function () {
    table = p.loadTable("data/air_poll.csv", "csv", "header");
    const paths = [
      "cruella.png",
      "Facilier.webp",
      "gaston.webp",
      "gothel.webp",
      "Hans.webp",
      "Maleficent.webp",
      "mickeymouse.svg",
      "mike.png",
      "moana.png",
      "nick.webp",
      "olaf.png",
      "peter.webp",
      "scar.png",
      "snow.png",
      "stitch.webp",
      "ursula.png",
    ];
    for (let file of paths) {
      characters.push(p.loadImage(`characters/${file}`));
    }
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth * 0.95, p.windowHeight * 0.85);
    p.textFont("Helvetica");
    p.rectMode(p.CORNER);
    p.imageMode(p.CENTER);

    // Parse table for months and AQI values
    for (let i = 0; i < table.getRowCount(); i++) {
      let year = table.getString(i, "Year");
      let month = table.getString(i, "Month");
      let aqi = parseFloat(table.getString(i, "AQI"));
      if (!months.includes(month)) months.push(month);
      if (year === "2020") aqi2020.push(aqi);
      if (year === "2024") aqi2024.push(aqi);
    }
  };

  p.draw = function () {
    p.background("#f9f9f9");

    let margin = 80;
    let chartBottom = p.height - margin;
    let chartTop = 100;
    let maxAQI = Math.max(60, ...aqi2020, ...aqi2024);
    let scaleFactor = (chartBottom - chartTop) / maxAQI;
    let barW = 30;
    let spacing = (p.width - 2 * margin) / months.length;
    let charW = 40;

    // Y-Axis
    p.fill(70);
    p.textAlign(p.RIGHT);
    for (let i = 0; i <= maxAQI; i += 20) {
      let y = chartBottom - i * scaleFactor;
      p.stroke(200);
      p.line(margin, y, p.width - margin, y);
      p.noStroke();
      p.text(i, margin - 10, y + 5);
    }

    // Bars and character images
    for (let i = 0; i < months.length; i++) {
      // Center x for this month
      let x = margin + i * spacing + spacing / 2;

      // Draw 2020 bar (left)
      if (show2020) {
        let h2020 = aqi2020[i] * scaleFactor;
        drawBar(
          p,
          x - barW / 2 - 8, // left of center
          aqi2020[i],
          scaleFactor,
          chartBottom,
          "#ff9800",
          `2020: AQI ${aqi2020[i]}`
        );
      }

      // Draw 2024 bar (right)
      if (show2024) {
        let h2024 = aqi2024[i] * scaleFactor;
        drawBar(
          p,
          x + barW / 2 + 8, // right of center
          aqi2024[i],
          scaleFactor,
          chartBottom,
          "#2196f3",
          `2024: AQI ${aqi2024[i]}`
        );
      }

      // Draw character image centered between bars
      if (characters[i]) {
        // Place image above the taller bar for that month
        let h2020 = aqi2020[i] * scaleFactor;
        let h2024 = aqi2024[i] * scaleFactor;
        let tallest = Math.max(h2020, h2024);
        let imgY = chartBottom - tallest - 60;
        p.image(characters[i], x, imgY, charW * 1.9, charW * 3);
      }

      // Draw month label
      p.fill(50);
      p.textAlign(p.CENTER);
      p.text(months[i], x, chartBottom + 25);
    }

    // Y-Axis Label
    p.push();
    p.translate(30, p.height / 2);
    p.rotate(-p.HALF_PI);
    p.textAlign(p.CENTER);
    p.fill(80);
    p.text("Air Quality Index (AQI)", 0, 0);
    p.pop();

    drawLegend(p, p.width - 180, 30);
  };

  function drawBar(p, x, aqi, scale, bottom, color, tooltipText) {
    let h = aqi * scale;
    p.fill(color);
    p.rect(x - 15, bottom - h, 30, h, 10);

    // Always show sparkles
    addSparkles(p, x, bottom - h);

    // Show values only on hover
    if (
      p.mouseX > x - 15 &&
      p.mouseX < x + 15 &&
      p.mouseY > bottom - h &&
      p.mouseY < bottom
    ) {
      p.cursor(p.HAND);
      showTooltip(p, tooltipText, x, bottom - h - 10);
    }
  }

  function drawLegend(p, x, y) {
    p.textSize(18);
    p.textStyle(p.BOLD);
    p.fill("#d2691e");
    p.rect(x - 30, y, 15, 15, 5);
    p.fill(50);
    p.text("2020 AQI", x + 40, y + 12);
    p.fill("#4682b4");
    p.rect(x - 30, y + 25, 15, 15, 5);
    p.fill(50);
    p.text("2024 AQI", x + 40, y + 37);
    p.textStyle(p.NORMAL);
    p.textSize(12);
  }

  function showTooltip(p, txt, x, y) {
    p.fill(0, 200);
    let padding = 8;
    let w = p.textWidth(txt) + padding * 2;
    p.rect(x - w / 2, y - 20, w, 25, 6);
    p.fill(255);
    p.textAlign(p.CENTER);
    p.text(txt, x, y - 3);
  }

  function addSparkles(p, x, y) {
    if (!p.smokeParticles) p.smokeParticles = [];
    if (p.frameCount % 10 === 0) {
      p.smokeParticles.push({
        x: x + p.random(-8, 8),
        y: y + 70 + p.random(-8, 8),
        size: p.random(4, 12),
        alpha: 180,
        velocityY: -0.3,
        velocityX: p.random(-0.1, 0.1),
      });
    }
    for (let i = p.smokeParticles.length - 1; i >= 0; i--) {
      let sp = p.smokeParticles[i];
      p.fill(128, 128, 128, sp.alpha);
      p.ellipse(sp.x, sp.y, sp.size, sp.size);
      sp.x += sp.velocityX;
      sp.y += sp.velocityY;
      sp.alpha -= 0.5;
      if (sp.alpha <= 0) p.smokeParticles.splice(i, 1);
    }
  }
};

var myp5_1 = new p5(sk1, "c1");
