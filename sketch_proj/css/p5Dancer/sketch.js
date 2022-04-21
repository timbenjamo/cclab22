/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 32).
  2. adjust line 19 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  createCanvas(windowWidth, windowHeight);
  // ...except to adjust the dancer's name on the next line:
  dancer = new Shrek(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  dancer.update();
  dancer.display();
  //dancer.turn();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. AliciaDancer.
class Shrek {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = random(30, 50);
    this.xSpd = random(0.5, 0.6);
    this.ySpd = random(0.5, 0.6);
    this.tX = 0;
    this.tY = 0;
    this.x1 = 0;
    this.y1 = 0;
    this.sinY = random(-1, 1);
    // add properties for your dancer here:
  }

  update() {
    this.tX += this.xSpd;
    this.tY += this.ySpd;
    this.sinY += 0.1;
    this.tZ = sin(this.sinY) * this.xSpd * this.xSpd;
    this.tV = cos(this.sinY) * this.xSpd * this.xSpd;
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    if (this.tX > 10) {
      this.xSpd = -this.xSpd;
    }
    if (this.tX < -10) {
      this.xSpd = -this.xSpd;
    }
    if (this.tY > 10) {
      this.ySpd = -this.ySpd;
    }
    if (this.tY < -10) {
      this.ySpd = -this.ySpd;
    }
  }

  display() {
    // the push and pop, along with the translate
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
   
    
    
    push();
    translate(this.tX * 0.5, this.tY * 0.5);
    strokeWeight(10);
    stroke("#C8FFE3");
    line(this.x, this.y + 10, this.x + 50, this.y + 50 * this.tZ);
    pop();

    
    
    push();
    translate(this.tX * 0.5, this.tY * 0.5);
    strokeWeight(10);
    stroke("#C8FFE3");
    line(this.x, this.y + 10, this.x - 50, this.y + 50 * this.tV);
    pop();
    
    push();
    translate(this.tX * 0.5, this.tY * 0.5);
    strokeWeight(6);
    stroke("#59504C");
    line(this.x - 50 , this.y - 30 + this.y +50 * this.tV -280, this.x - 50, this.y + 50 * this.tV);
    pop();
    
    push();
    translate(this.tX * 0.5, this.tY * 0.5);
    rectMode(CENTER);
    noStroke();
    fill("#ECEDE2");
    rect(this.x - 50 , this.y - 30 + this.y +50 * this.tV -280, 40, 30);
    pop();
    
    push()
    translate(this.tX * 0.5, this.tY * 0.5);
    textSize(9);
    text('PEACE!', this.x - 67, this.y - 30 + this.y +50 * this.tV -280);
    fill(0, 102, 153);
    pop()

    push();
    translate(this.tX * 0.4, this.tY * 0.4);
    strokeWeight(10);
    stroke("#A6B1AB");
    line(this.x + 10, this.y + 100 * this.tZ + 80, this.x + 10, this.y + 50);
    pop();

    push();
    translate(this.tX * 0.4, this.tY * 0.4);
    strokeWeight(10);
    stroke("#A6B1AB");
    line(this.x - 10, this.y + 100 * this.tV + 80, this.x - 10, this.y + 50);
    pop();

    push();
    translate(this.tX * 0.2, this.tY);
    noStroke();
    fill("#B28A85");
    rect(this.x - 22, this.y + 10, 40, 50, 5);
    pop();
    
//     push();
//     translate(this.tX * 0.2, this.tY);
//     noStroke();
//     fill("#FDFB8A");
//     rect(this.x - 11, this.y + 25, 20);
//     pop();
    
//     push();
//     translate(this.tX * 0.2, this.tY);
//     noStroke();
//     //fill("#5399FF");
//     rect(this.x - 11, this.y + 25, 20, 10);
//     pop();
    
    
    //head
    push();
    translate(this.tX, this.tY);
    noStroke();
    fill("#C8FFE3");
    ellipse(this.x, this.y, 40);
    pop();
    
    push();
    translate(this.tX , this.tY );
    strokeWeight(4);
    stroke("#C8FFE3");
    line(this.x+10, this.y-15, this.x + 15, this.y - 20);
    pop();
    
    push();
    translate(this.tX , this.tY );
    strokeWeight(4);
    stroke("#C8FFE3");
    line(this.x-10, this.y-15, this.x - 15, this.y - 20);
    pop();
    
  
    //eyes layer-1
    push();
    translate(this.tX, this.tY);
    noStroke();
    fill(0);
    ellipse(this.x - 10, this.y, 10);
    ellipse(this.x + 10, this.y, 10);
    pop();
    //eyes layer-2
    push();
    translate(this.tX, this.tY);
    for (let i = 0; i < 12; i += random(5)) {
      fill("#CEF09D");
      ellipse(this.x - 10, this.y, i);
      ellipse(this.x + 10, this.y, i);
    }
    pop();
    //mouth
    push();
    translate(this.tX, this.tY);
    fill(0);
    rect(this.x - 3, this.y + 7, 6);
    pop();
    
    //guides
    push();
    translate(this.x, this.y + 40);
    this.drawReferenceShapes();
    pop();
  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}

/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmomize once on the same canvas, please don't make your dancer bigger than 200x200 pixels.
*/
