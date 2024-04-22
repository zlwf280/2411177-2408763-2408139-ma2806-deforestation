let myFont;  

let visualisation;
let dataset;
let size = 1000;

let barWidth = 30;
let barHeight;
let margin;
let scaling = 175000;

let infoParagraph;
let infoHeader;

var xValues = [];
var yValues = [];

function preload() {
    dataset = loadTable("global-tc-loss-adjusted.csv", "csv", "header");
    myFont = loadFont('Maitree-Regular.ttf');  
}

function setup() {
    colorMode(RGB);
    //createCanvas(size, size);
    textFont(myFont)

    visualisation = createCanvas(size, size);
    visualisation.position(380, 1850); 
    visualisation.parent("canvas-tag"); //index.html




    infoHeader = createP(); // !!!!! if anyone wants to add interactive text for the graph, just make sure to create new column in .csv file then un-comment line 91, put text in quotes in bracket !!!!! 
    infoHeader.parent("context-tag");
    infoHeader.position(size / 1.45, size / 2.5);
    infoHeader.class("country");

    infoParagraph = createP(); // !!!!! same here, new column, un-comment line 92 !!!!!
    infoParagraph.position(size / 1.45, size / 2.35);
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
    background(255, 0, 0, 0);
    fill(55);
    strokeWeight(1);

    cursor(ARROW); 
    for (let row = 13; row < 22; row++) {
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
            fill(102, 51, 0, 150);
            cursor("pointer");
            if (mouseIsPressed) {
                //infoHeader.html(); // !!!!! get String first, e.g., line 75 and 76 !!!!!
                //infoParagraph.html(); // !!!!! get String first !!!!!
            }
        } else {
            fill(102, 51, 0, 70);
        }

        rect(barX, barY, barWidth, - barHeight);

        fill(0);
        textSize(8);
        textAlign(CENTER);
        text(country, barX + barWidth / 2, barY + 25);
        text(area, barX + barWidth / 2, barY - barHeight - 10);
    }

    noStroke();
    //insert loop for concentric circles that nests a function for treeRings (imperfect circles)
    for (var r = 0; r < 250; r = r + 25){
        fill(102, 51, 0, 45);
        treeRings1(r, 50, size / 3, size / 1.5);
        //radius, steps, centerX, centerY
    }

    noLoop(); // !!!!! unactivate if want animation and bar chart interactivity !!!!!
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
        vertex(xValues[i] + random(-2, 3), yValues[i] + random(-2, 3));
    }
    endShape();

    fill(0);
    textSize(10);
    text('Russia', size / 3, size / 2.195);
    text('Brazil', size / 3, size / 2.065);
    text('Canada', size / 3, size / 1.965);
    text('United States', size / 3, size / 1.865);
    text('Indonesia', size / 3, size / 1.785);
    text('D. R. of Congo', size / 3, size / 1.710);
    text('China', size / 3, size / 1.645);
    text('Malaysia', size / 3, size / 1.575);
    text('Australia', size / 3, size / 1.5);
    text('Total Area (ha) of Tree Cover Loss from 2001-2022', size / 3, size / 1.075);
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

//abandoned as couldn't get texts to move correctly in the y-dimension but x was fine 
//function windowResized() {
    //resizeCanvas(windowWidth, windowHeight);
//}