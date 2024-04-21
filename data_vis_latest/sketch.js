//let font; !!!!! just un-note this when font is loaded !!!!!

let visualisation;
let dataset;

let barWidth = 75;
let barHeight;
let margin;
let scaling = 92500;

let infoParagraph;
let infoHeader;

var xValues = [];
var yValues = [];

function preload() {
    dataset = loadTable("global-tc-loss-adjusted.csv", "csv", "header");
    //font = loadFont(); !!!!! link to font in brackets, online or from local file
}

function setup() {
    colorMode(RGB);

    visualisation = createCanvas(windowWidth, windowHeight);
    visualisation.parent("canvas-tag"); //index.html

    //textFont(font); !!!!! just un-note this when font is loaded !!!!!

    infoHeader = createP(); // !!!!! if anyone wants to add interactive text for the graph, just make sure to create new column in .csv file then un-note line 89 !!!!! 
    infoHeader.parent("context-tag");
    infoHeader.position(windowWidth / 1.45, windowHeight / 2.5);
    infoHeader.class("country");

    infoParagraph = createP(); // !!!!! same here, new column, un-note line 90 !!!!!
    infoParagraph.position(windowWidth / 1.45, windowHeight / 2.35);
    infoParagraph.parent("context-tag");

    //prepare data here
    area = cleanData(dataset.getColumn());
    //let rowIndex = ;
    //let maxValue = getMaxValueInRow(dataset, rowIndex);
    //console.log('Maximum value in row ' + rowIndex + ': ' + maxValue);
}

//make data numbers not strings
function cleanData(dataset) {
    //loop through all numbers in the array
    for(let i=0; i<dataset.length; i++){
        dataset[i] = Number(dataset[i]);
        console.log(i+':'+dataset[i]);
    }
    return dataset; 
}

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
    for (let row = 17; row < 26; row++) {
        let country = dataset.getString(row, 0);
        let area = dataset.getNum(row, 28);

        let barX = row * (barWidth + 20);
        let barY = height - 100;
        let barHeight = area / scaling;

        if (
            mouseX > barX &&
            mouseX < barX + barWidth &&
            mouseY > barY - barHeight &&
            mouseY < barY
        ) {
            fill(102, 51, 0, 150);
            cursor("pointer");
            if (mouseIsPressed) {
                //infoHeader.html(); !!!!! get String first, e.g., line 73 and 74 !!!!!
                //infoParagraph.html(); // !!!!! get String first !!!!!
            }
        } else {
            fill(102, 51, 0, 75);
        }

        rect(barX, barY, barWidth, - barHeight);

        fill(0);
        textSize(17);
        textAlign(CENTER);
        text(country, barX + barWidth / 2, barY + 25);
        textSize(17);
        text(area, barX + barWidth / 2, barY - barHeight - 10);
    }

    strokeWeight(2);
    //insert loop for concentric circles that nests a function for treeRings (imperfect circles)
    for (var r = 0; r < 500; r = r + 50){
        fill(102, 51, 0, 75);
        treeRings1(r, 200, width / 3, height / 1.5);
        //radius, steps, centerX, centerY
    }
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
    fill(0);
    textSize(20);
    text('Russia', windowWidth / 3, windowHeight / 2.375);
    text('Brazil', windowWidth / 3, windowHeight / 2.225);
    text('Canada', windowWidth / 3, windowHeight / 2.085);
    text('United States', windowWidth / 3, windowHeight / 1.965);
    text('Indonesia', windowWidth / 3, windowHeight / 1.855);
    text('D. R. of Congo', windowWidth / 3, windowHeight / 1.755);
    text('China', windowWidth / 3, windowHeight / 1.670);
    text('Malaysia', windowWidth / 3, windowHeight / 1.590);
    text('Australia', windowWidth / 3, windowHeight / 1.525);
    text('Total Area (ha) of Tree Cover Loss from 2001-2022', windowWidth / 3, windowHeight / 1.045);
}

//treeRings 2 _ does not work due to numVertices
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