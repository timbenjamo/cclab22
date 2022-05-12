
let myBoat;
let img;

let boatArray = [];


function preload(){
  img = loadImage("assets/Ship.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  myBoat = new boat(random(30, windowWidth/2), 0);
  myBoat2 = new boat(random(30, windowWidth/2), 0);
  myBoat3 = new boat(random(30, windowWidth/2), 0);
  // noLoop();

  
}

// function mousePressed() {
//   loop();
  
//   boatArray.push(new boat(width/4, 0));
  
// }

// function mouseReleased() {
//   noLoop();
// }

function draw() {
  
  push();
  fill("#83E4DD");
  strokeWeight(0);
  rect(0, 0, windowWidth/2, windowHeight);
  
  
  fill("#BAD6BC");
  strokeWeight(0);
  rect(width/2, 0, windowWidth/2, windowHeight);
  
  fill("#FFF6D0")
  ellipse(-54, windowHeight/2, 200);
  ellipse(-24, windowHeight/2 + 85, 90);
  
  fill("#BAD6BC");
  ellipse(10, windowHeight/2 + 85, 10);
  ellipse(20, windowHeight/2, 10);
  ellipse(10, windowHeight/2 + 14, 10);
  pop();
  
  
  myBoat.move();
  myBoat.display();

  myBoat2.move();
  myBoat2.display();

  myBoat3.move();
  myBoat3.display();

}

class boat {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = 30;
    // this.xSpeed = random(-0.05, 0.05);
    this.ySpd = random(3, 5);
    this.xSpd = 0;
    this.sinY = random(-0.05, 0.05);
  }
  
  move() {
    // this.xSpeed += 0.05;
    // this.x = noise(this.sinY);
    this.sinY += 0.05;
    this.x += sin(noise(this.sinY)) *0.15
    this.y += this.ySpd
    
    
    
    if (this.y > height) {
        this.y = 0;
      }
    
  }
  display() {
    image(img, this.x, this.y, 20, 60);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
