function preload(){
    sound = loadSound("X2Download.com - Neruda Theodorakis   La United Fruit Co CANTO GENERAL (128 kbps).mp3");
  }
  
  //by creating a cnv variable - a canvas - I am able to better manipulate how the canvas is positioned within the html frame
  function setup(){
    let cnv = createCanvas(windowWidth/2,windowHeight/2);
   //this is a specific canvas function that uses a .mouseclicked function to toggle the mouse clicking
    cnv.mouseClicked(togglePlay);
    cnv.position(windowWidth/4, windowHeight/3);
   //fft essentially takes the audio frequencies and turns them into amplitude data that can then be used with certain functions to illicit certain animations or values 
    fft = new p5.FFT();
    //this multiplies our sound amplitude so the music is louder/easier to analyze
    sound.amp(0.5);
  
    textSize(width / 5);
    textAlign(CENTER, CENTER);
  }
  
  function draw(){
    background(0, 50);
    //this text below will show up middle of the screen
    text('Click Me!', width/2, height/2);
    fill("#F1E58C");
    
    //"computes amplitude values along the frequency domain. The array indices correspond to frequencies (i.e. pitches), from the lowest to the highest that humans can hear. Each value represents amplitude at that slice of the frequency spectrum."
    let wave = fft.analyze();
    
    push();
    noStroke();
    fill("#F1E58C");
    //by creating a forloop, I have taken the fft data - which turns audio frequencies into amplitude data - and I have asked p5js to read that data and find the "wave length". That wavelength is then used as the max value for our forloop
    for (let i = 0; i< wave.length; i++){
      let x = map(i, 0, wave.length / 6, 0, width);
      let h = -height + map(wave[i], 0, 255, height, 0);
      rect(x, height, width / wave.length * 10, h * 1.2 )
    }
    pop();
    
    push();
    noStroke();
    fill("#F6F6F6");
    for (let i = 0; i< wave.length; i++){
      let x = map(i, 0, wave.length / 6, 0, width);
      let h = -height + map(wave[i], 0, 255, height, 0);
      rect(x, height, width / wave.length * 10, h )
    }
    pop();
    
    push();
    noStroke();
    fill("#BEBEBD");
    for (let i = 0; i< wave.length; i++){
      let x = map(i, 0, wave.length / 6, 0, width);
      let h = -height + map(wave[i], 0, 255, height, 0);
      rect(x, height, width / wave.length * 10, h * 0.8 )
    }
    pop();
    
    push();
    noStroke();
    fill("#99776B");
    for (let i = 0; i< wave.length; i++){
      let x = map(i, 0, wave.length / 6, 0, width);
      let h = -height + map(wave[i], 0, 255, height, 0);
      rect(x, height, width / wave.length * 10, h * 0.5 )
    }
    pop();
  
   
  
   
  }
  
  //our function "togglePlay" takes the function we defined above and says, if the mouse clicks, then we should play music. If it is clicked again, the music will stop
  function togglePlay() {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.loop();
    }
  }