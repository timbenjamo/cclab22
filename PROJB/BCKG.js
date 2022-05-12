let noiseScale=0.02;

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(0, 60);
  stroke("#93BF50");
  strokeWeight(2);
  for (let x=0; x < width; x++) {
    let noiseVal = noise((mouseX+x)*noiseScale, mouseY*noiseScale);
   
    line(x, mouseY+noiseVal*80, x, height);
  }
}