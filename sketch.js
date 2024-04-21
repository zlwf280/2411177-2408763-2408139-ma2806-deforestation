let visualisation;
let dataset;

let barWidth = 75;
let barHeight;
let margin;
let scaling = 150000;

let infoParagraph;
let infoHeader;

var xValues = [];
var yValues = [];

function preload() {
    dataset = loadTable("global-tc-loss-edited.csv", "csv", "header");
}

function setup() {
    visualisation = createCanvas(windowWidth, windowHeight);
    visualisation.position(width / 2, height / 1.5);
    visualisation.parent("canvas-tag"); //index.html

    infoHeader = createP("Click chart to display further information.");
    infoHeader.parent("context-tag");
    infoHeader.class("country");

    infoParagraph = createP();
    infoParagraph.parent("context-tag");

    //prepare data here
    //area = cleanData(dataset.getColumn());
    //let rowIndex = ;
    //let maxValue = getMaxValueInRow(dataset, rowIndex);
    //console.log('Maximum value in row ' + rowIndex + ': ' + maxValue);
}

//make data numbers not strings
//function cleanData(dataset) {
    //loop through all numbers in the array
    //for(let i=0; i<dataset.length; i++){
        //dataset[i] = Number(dataset[i]);
        //console.log(i+':'+dataset[i]);
    //}
    //return dataset; 
//}

//function getMaxValueInRow(dataset, rowIndex) {
    //let maxVal = -Infinity;
    //for (let i = 0; i < dataset.getRowCount(); i++) {
      //let value = parseFloat(dataset.getString(i, rowIndex)); // Assuming all values in the row are numeric
      //if (!isNaN(value) && value > maxVal) {
        //maxVal = value;
      //}
    //}
    //return maxVal;
//}

function draw() {
    background(255);
    fill(55);

    cursor(ARROW); 
    noStroke();
    for (let row = 0; row < dataset.getRowCount(); row++) {
        let country = dataset.getString(row, 0);
        let area = dataset.getNum(row, 28);

        let barX = row * (barWidth + 15);
        let barY = height - 100;
        let barHeight = area / scaling;

        if (
            mouseX > barX &&
            mouseX < barX + barWidth &&
            mouseY > barY - barHeight &&
            mouseY < barY
        ) {
            fill(102, 51, 0, 75);
            cursor("pointer");
            if (mouseIsPressed) {
                //let infoText = dataset.getString(row, 28);
                infoHeader.html(country);
                infoParagraph.html(area);
            }
        } else {
            fill(150);
        }

        rect(barX, barY, barWidth, - barHeight);

        textSize(15);
        textAlign(CENTER);
        text(country, barX + barWidth / 2, barY + 25);
        fill("#ffe100");
        textSize(15);
        text(area, barX + barWidth / 2, barY - barHeight - 10);
    }

    stroke(0);
    strokeWeight(2);
    //insert loop for concentric circles that nests another function for treeRings (imperfect circles)
    for (var r = 0; r < 500; r = r + 50){
        fill(102, 51, 0, 75);
        treeRings1(r, 200, width / 3, height / 2);
        //radius, steps, centerX, centerY
    }

    textAlign(CENTER);
}

//treeRings 1
function treeRings1(radius, steps, centerX, centerY) {
    for (var i = 0; i < steps; i++) {
        xValues[i] = centerX + radius * Math.cos(2 * Math.PI * i / steps);
        yValues[i] = centerY + radius * Math.sin(2 * Math.PI * i / steps);
    }
    //shapes = series of vertices, vertex specifies the coordinates, exclusively for the beginShape() and endShape() functions
    beginShape();
    for(let i = 0; i < steps; i++){
        vertex(xValues[i] + random(-4, 5), yValues[i] + random(-5, 6));
    }
    endShape();
}

//treeRings 2
//function treeRings2(noise = .1){
    //let vertices = [];
    //for (var i = 0; i < numVertices; i++) {
        //const rad = i * 2 * PI / numVertices;
        //const x = radius * cos(rad) * random(1 - noise, 1 + noise);
        //const y = radius * sin(rad) * random(1 - nouse, 1+ noise);

        //vertices.push({ x: canvasSide / 2 + x, y: canvasSide / 2 -y});
        //}
    //for (let i = 0; i < 3; i++) {
        //vertices.push(vertices[i]);
        //}
    //beginShape();
    //for (let i = 0; i < vertices.length; i++) {
        //curveVertex(vertices[i].x, vertices[i].y);
    //}
    //endShape();
//}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}