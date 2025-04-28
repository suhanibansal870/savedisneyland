budgetValues = [];

function preload() {
  table = loadTable("data/pollution.csv", "csv", "header");

  mike = loadImage("assets/Mike_Wazowski.png");
  moana = loadImage("assets/Moana_(character).png");
  peter = loadImage("assets/PeterPan.webp");
  ursula = loadImage("assets/Ursula(TheLittleMermaid)character.png");
  mali = loadImage("assets/Maleficent.webp");
  doc = loadImage("assets/Facilier.webp");
  olaf = loadImage("assets/Olaf_from_Disney's_Frozen.png");
}

function setup() {
  createCanvas(windowWidth / 1.5, windowHeight);
  numberOfRows = table.getRowCount();
  numberOfColumns = table.getColumnCount();
}

function draw() {
  background(220);
  fill(0);

  for (var i = 0; i < numberOfRows; i++) {
    //place years
    fill(0);
    text(table.getString(i, 0), i * 100 + 100, 700);
    //pull numbers
    budgetValues[i] = table.getString(i, 1);
    //draw graph

    fill(0);
    rect(i * 100 + 100, 650 - budgetValues[i] * 100, 50, budgetValues[i] * 100);

    fill(255, i, 0);
    noStroke();
    image(mike, 575, 370, 100, 150);
    image(moana, 480, 315, 100, 180);
    image(peter, 380, 290, 100, 180);
    image(ursula, 63, 0, 100, 150);
    image(mali, 180, 0, 100, 150);
    image(doc, 260, 162, 100, 170);
    image(olaf, 687, 375, 70, 150);

    ellipse(i * 100 + 125, 650 - budgetValues[i] * 100, 50);

    fill(0);
  }
  //determine highest value
  maxValue = max(budgetValues);
  for (var k = 0; k < 7; k = k + 0.5) {
    if (Number.isInteger(k)) {
      text(k, 20, 650 - 100 * k);
    }
  }
}
