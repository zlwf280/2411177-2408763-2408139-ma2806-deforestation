let dataset;

var xValues = [];
var yValues = [];

function preload(){
    dataset = loadTable("data.csv");
}

function setup(){
    createCanvas(1000, 1000);
    noLoop();
    //prepare data here for each column
}

//make data are numbers not strings
function cleanData(data){

}

function draw(){
    background(0, 0);
    //insert loop for concentric circles that nests another function for treeRings (imperfect circles)
    for (var r = 0; r < 350; r = r + 50){
        fill(102, 51, 0, 75);
        treeRings1(r, 150, 500, 500);
        //radius, steps, centerX, centerY
    }
}

//treeRings style 1 test
function treeRings1(radius, steps, centerX, centerY){
    for (var i = 0; i < steps; i++) {
        xValues[i] = centerX + radius * Math.cos(2 * Math.PI * i / steps);
        yValues[i] = centerY + radius * Math.sin(2 * Math.PI * i / steps);
    }
    //shapes = series of vertices, vertex specifies the coordinates, exclusively for the beginShape() and endShape() functions
    beginShape();
    for(let i = 0; i < steps; i++){
        vertex(xValues[i] + random(-2, 3), yValues[i] + random(-3, 4));
    }
    endShape();
}

//treeRings style 2 test
//function treeRings2(noise = .1){
    //for (var i = 0; )
//}