//for my project, I had to deviate a little from my original concept.
//I knew I wanted to keep the concept of the ocean and waves, however, I lacked the technical-coding ability to make an entire ocean out of little people.
//Instead, I chose to focus on purely what I already knew from this coding course and make a randomly generated wave motion.
//Additionally, by pressing, you can drop in a submarine!
//REFERENCED:
// https://editor.p5js.org/stavrosdidakis/sketches/xLcXTFvL3
// https://editor.p5js.org/stavrosdidakis/sketches/OF0B3qu3n
// https://editor.p5js.org/stavrosdidakis/sketches/ifGuf3898
//https://editor.p5js.org/stavrosdidakis/sketches/d3Zk2fAHj
// https://www.youtube.com/watch?v=vmhRlDyPHMQ&ab_channel=ColorfulCoding

//these variable set the array + introduce elements that will be used for color later
let chain = [];
let chainLength = 30;
let newColor;
let boats = [];
let rA = 0;
let gA = 0;
let bA = 0;
let stars = [];

function setup() {
  createCanvas(500, 400);
  //frameRate(18);
  //angleMode(DEGREES);

  //the begining of the universe!
  //this is the canvas for the stars in the night sky
  for (let j = 0; j < 2000; j++) {
    stars[j] = new star(random(width), random(height));
  }

  //the "chain" will be the wave in this image. I call it a chain because they are line-strokes connected together
  //the for-loop sets up the location for the waves to generate
  for (let x = 0; x < width; x += chainLength) {
    y = height / 2 - 20;
    chain.push(new ball(x, y, newColor));
  }

  // //noLoop();
}

//this function is similar (BUT ALSO VERY DIFFERENT) to the Plexus "clicked" example.
//whenever the mouse is pressed, a submarine will appear.
//the submarine is defined in its own class.
function mousePressed() {
  let boatSize = random(25);
  let xVel = random(-2, -1);
  let yVel = random(1, 2);
  boats.push(new boat(mouseX, mouseY, xVel, yVel));
}

function draw() {
  console.log(mouseX, mouseY);

  background(0, 80);

  //stars
  push();
  for (let j = 0; j < stars.length; j++) {
    stars[j].move();
    stars[j].display();
  }
  pop();
  
  push();
  noStroke();
  let x = frameCount % width
  
  let freq = frameCount * 0.04
  
  let amp = 400;
  let noiseValue = noise(freq) * amp;
  let yNoise = noiseValue;
  
  
  let freqSize = frameCount * 0.8;
  let sizeNoise = map(noise(freqSize), 0, 1, 10, 15);
  
  //saucer
  push();
  fill(100);
  ellipse(x, yNoise, sizeNoise * 2, sizeNoise);
  pop();
  //hood
  push();
  fill(255);
  ellipse(x, yNoise - 3, sizeNoise * 1.3, sizeNoise);
  pop();
  //alien
  push();
  fill("#DBF227");
  ellipse(x, yNoise - 3, sizeNoise -5, sizeNoise -5);
  pop();
  
  
  pop();

  //this is the day-time sky
  //the opacity is controlled by the mouse through the fill function
  push();
  mouseA = map(mouseX, 10, 400, 0, 255);
  fill(141, 241, 250, mouseA);
  rect(-1, -1, 505, 405);
  pop();

  //this is the sun!
  //it's controlled by the mouse-X, which corresponds to the   y-value
  push();
  noStroke();
  fill("#F2D95C");
  let r = map(mouseX, 0, 600, -100, 45);
  //console.log(r);
  translate(0, r);
  ellipse(400, 0, 100);
  pop();

  //this is the moon! It is similar to the sun.
  push();
  noStroke();
  fill(255);
  let v = map(mouseX, 0, 400, 50, -100);
  //console.log(v);
  translate(0, v);
  ellipse(0, 0, 100);
  pop();

  //each of the "waves" is translated slightly and recolored with a variable "newColor", which corresponds withing the class function
  
  
  

  push();
  translate(10, height / 2 - 30);
  newColor = 1;
  for (let i = 0; i < chain.length; i++) {
    chain[i].move();
    chain[i].display();
    chain[i].ballCheck(chain.slice(i));
  }
  pop();
  
  for (let i = 0; i < boats.length; i++) {
    boats[i].move();
    boats[i].display();
  }
  
  push();
  translate(10, height / 2);
  newColor = 0;
  for (let i = 0; i < chain.length; i++) {
    chain[i].move();
    chain[i].display();
    chain[i].ballCheck(chain.slice(i));
  }
  pop();

  push();
  translate(10, height / 2 + 30);
  newColor = 2;
  for (let i = 0; i < chain.length; i++) {
    chain[i].move();
    chain[i].display();
    chain[i].ballCheck(chain.slice(i));
  }
  pop();

  push();
  translate(10, height / 2 + 60);
  newColor = 3;
  for (let i = 0; i < chain.length; i++) {
    chain[i].move();
    chain[i].display();
    chain[i].ballCheck(chain.slice(i));
  }
  pop();

  

  //this is the beach!
  push();
  noStroke();
  fill("#FFEDB6");
  ellipse(width / 2, 400, 800, 200);
  pop();

  push();
  translate(10, height / 2 + 98);
  scale(1.5);
  newColor = 4;
  for (let i = 0; i < chain.length; i++) {
    chain[i].move();
    chain[i].display();
    chain[i].ballCheck(chain.slice(i));
  }
  pop();

  
}
class ball {
  constructor(x, y, newColor) {
    this.x = x;
    this.y = y;
    this.r = 40;
    this.sinY = random(-1, 1);
  }

  //this describes the random, yet sinosoidal motion of the waves!
  move() {
    this.sinY += 0.05;
    this.y = map(sin(noise(this.sinY) * 0.15), -1, 1, -100, 100);
  }

  //this checks the distance from each of the wave "segments"
  //because the distance between all the segments is less than 70, the gap between them is connected by a line segment
  ballCheck(objects) {
    objects.forEach((element) => {
      let dis = dist(this.x, this.y, element.x, element.y);
      if (dis < 70) {
        let aStroke = noise(0, 1);
        if (newColor === 0) stroke("#3BA7BF");
        else if (newColor === 1) stroke("#2D83A6");
        else if (newColor === 2) stroke("#63E4F2");
        else if (newColor === 3) stroke("#05DBF2");
        else if (newColor === 4) stroke(255);
        else if (newColor === 5) stroke("#F2D95C");
        //stroke(newColor);
        strokeWeight(this.r);
        line(this.x, this.y, element.x, element.y);
      }
    });
  }

  display() {
    noStroke();
    if (newColor === 0) fill("#3BA7BF");
    else if (newColor === 1) fill("#2D83A6");
    else if (newColor === 2) fill("#63E4F2");
    else if (newColor === 2) fill("#05DBF2");
    else if (newColor === 2) fill(255);
    else if (newColor === 5) fill("#F2D95C");
    //fill("#3BA7BF");
    ellipse(this.x, this.y, this.r);
  }
}

class boat {
  constructor(x, y, xVel, yVel) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
   
  }

  move() {
    this.x = this.x + this.xVel;
    this.y = this.y + this.yVel;

    
    if (this.x > width || this.x < 0) {
      this.xVel *= -1;
    }
    
    //if the submarine touches the bottom wave, it will      stop!
    if (this.y > height / 2 + 10) {
      this.yVel *= 0.5;
    }

    if (this.y < 50) {
      this.yVel *= -1;
    }
  }
  display() {
    push();
    noStroke();
    fill(50);
    rectMode(CENTER);
    rect(this.x, this.y - 20, 200, 40, 45);
    stroke(50);
    strokeWeight(20);
    line(this.x, this.y - 15, this.x, this.y - 75);
    line(this.x, this.y - 75, this.x + 12, this.y - 75);
    pop();

    push();
    noStroke();
    fill(255);
    ellipse(this.x, this.y - 20, 15);
    ellipse(this.x + 30, this.y - 20, 15);
    ellipse(this.x - 30, this.y - 20, 15);
    pop();
    push();
    noStroke();
    fill("#E8CC4E");
    ellipse(this.x + 12, this.y - 75, 15);
    pop();
  }
}

class star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.d = random(0.5, 4);
    this.xVel = random(-0.05, 0.2);
    this.yVel = random(-0.05, 0.1);
  }
  move() {
    this.x = this.x += this.xVel;
    this.y = this.y += this.yVel;
  }

  display() {
    noStroke();
    fill(220);
    ellipse(this.x, this.y, this.d);
  }
}

// function mousePressed() {
//   loop();
// }

// function mouseReleased() {
//   noLoop();
// }
