/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/


*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var clouds;
var mountains;
var trees_x;
var collectables;
var canyons;
var flagpole;
var lives;

var game_score;


var jumpSound;
var coinSound;
var losingSound;
var hurtSound;
var winSound;

var backgroundSound;

var enemies;

var platforms;

var stone;




function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    
    backgroundSound = loadSound('assets/background.mp3');
    backgroundSound.setVolume(0.2);
    
    
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    
    coinSound = loadSound('assets/coin.wav');
    coinSound.setVolume(0.1);
    
    losingSound = loadSound('assets/losing.wav');
    losingSound.setVolume(0.1);

    winSound = loadSound('assets/win.wav');
    winSound.setVolume(0.3);
 
    hurtSound = loadSound('assets/hurt.wav');
    hurtSound.setVolume(0.2);
    
    stone = loadImage('assets/stone.png');
 
    
    
}


function setup()
{
	createCanvas(1024, 576);
    
    lives = 6;
    textSize(35);
    textStyle(ITALIC);
    
    backgroundSound.loop();
    
    
    startGame();

}

function startGame()
{
	
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
   
    treePos_y = floorPos_y + 20;
    
   
    

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects.
    
    trees_x = [-3200,
               -2300,
               -1700,
               -1350,
               -1100,
               -500,
               50,
               600,
               1200,
               1700,
               2600,
               3000
    ];
    
    
    clouds = [
        {pos_x : -3000, pos_y : 90, width: 20, height : 10},
        {pos_x : -2200, pos_y : 120, width : 10, height : 10},
        {pos_x : -1700, pos_y : 150, width: 20, height: 5},
        {pos_x : -1200, pos_y : 90, width: 20, height : 10},
        {pos_x : -750, pos_y : 120, width : 10, height : 10},
        {pos_x : -450, pos_y : 150, width: 20, height: 5},
        {pos_x : 0, pos_y : 90, width: 20, height : 10},
        {pos_x : 450, pos_y : 120, width : 10, height : 10},
        {pos_x : 800, pos_y : 150, width: 20, height: 5},
        {pos_x : 1200, pos_y : 90, width: 20, height : 10},
        {pos_x : 1800, pos_y : 120, width : 10, height : 10},
        {pos_x : 2200, pos_y : 150, width: 20, height: 5},
        {pos_x : 3000, pos_y : 150, width: 20, height: 5}
    ];
    
    mountains = [
        {pos_x : -3000},
        {pos_x : -1700},
        {pos_x : -700},
        {pos_x : 220},
        {pos_x : 1000},
        {pos_x : 1700},
        {pos_x : 3000}
    ];
    
    
    collectables = [
        {pos_x : -2000, pos_y: 25, size: 50, isFound : false},
        {pos_x : -950, pos_y: 30, size: 50, isFound : false},
        {pos_x : -900, pos_y: 30, size: 50, isFound : false},
        {pos_x : -2500, pos_y: 100, size: 50, isFound : false},
        {pos_x : -600, pos_y: 100, size: 50, isFound : false},
        {pos_x : -1000, pos_y: 30, size: 50, isFound : false},
        {pos_x : -250, pos_y: 30, size: 50, isFound : false},
        {pos_x : 500, pos_y: 30, size: 50, isFound : false},
        {pos_x : 550, pos_y: 20, size: 50, isFound : false},
        {pos_x : 600, pos_y: 30, size: 50, isFound : false},
        {pos_x : 2000, pos_y: 100, size: 50, isFound : false},
        {pos_x : 2500, pos_y: 20, size: 50, isFound : false},
        {pos_x : 2550, pos_y: 30, size: 50, isFound : false},
        {pos_x : 3900, pos_y: 20, size: 50, isFound : false},
        {pos_x : (random(-4000,-2000)), pos_y: (random(20,50)), size: 50, isFound : false},
        {pos_x : (random(-2000,700)), pos_y: (random(20,50)), size: 50, isFound : false},
        {pos_x : (random(-4000,3000)), pos_y: (random(20,50)), size: 50, isFound : false},
        {pos_x : (random(-3000,500)), pos_y: (random(20,50)), size: 50, isFound : false},
        {pos_x : (random(700,3000)), pos_y: (random(20,50)), size: 50, isFound : false},
        {pos_x : (random(1000,1500)), pos_y: (random(20,50)), size: 50, isFound : false},
        {pos_x : (random(400,2000)), pos_y: (random(20,50)), size: 50, isFound : false},
        {pos_x : (random(100,900)), pos_y: (random(20,50)), size: 50, isFound : false},
        {pos_x : (random(0,100)), pos_y: (random(20,50)), size: 50, isFound : false},
        

    ];
    
    
    canyons = [
        {pos_x: -3200,width_1 :10, width_2: 10},
        {pos_x: -1700,width_1 :10, width_2: 10},
        {pos_x: -980,width_1 :10, width_2: 10},
        {pos_x: -900,width_1 :10, width_2: 10},
        {pos_x: 60,width_1 :10, width_2: 10},
        {pos_x: 1700,width_1 :10, width_2: 10},
        {pos_x: 3100,width_1 :10, width_2: 10},
        {pos_x: 4000,width_1 :10, width_2: 10}
    ];
    
    
    enemies = [];
    enemies.push (new Enemy(-300,floorPos_y,200));
    enemies.push (new Enemy(1000,floorPos_y,200));
    enemies.push (new Enemy(random(2000,2500),floorPos_y,random(50,300)));
    enemies.push (new Enemy(random(3000,3500),floorPos_y,0));
    enemies.push (new Enemy(random(-3000,3000),floorPos_y,0));
    enemies.push (new Enemy(random(-3000,-2000),floorPos_y,0));
    enemies.push (new Enemy(random(-3000,-1500),floorPos_y,random(50,300)));
    enemies.push (new Enemy(random(1600,2000),floorPos_y,0));
    enemies.push (new Enemy(random(-3000,-2000),floorPos_y,random(50,300)));
    
    enemies.push (new Enemy (3900,floorPos_y, 100));
    
    game_score = 0;
    
    flagpole = {pos_x: 4500, isReached: false, height:200};
    
    lives -=1;
    
    platforms = [];
    
    platforms.push(createPlatform(800,floorPos_y - 110,115));
    platforms.push(createPlatform(-700,floorPos_y - 100,90));
    platforms.push(createPlatform(-870,floorPos_y - 100,90));
    platforms.push(createPlatform(1700,floorPos_y - 100,130));
    
    platforms.push(createPlatform(3100,floorPos_y - 120,120));
    platforms.push(createPlatform(2900,floorPos_y - 250,90));
    platforms.push(createPlatform(2700,floorPos_y - 200,100));
    platforms.push(createPlatform(2600,floorPos_y - 150,90));
    platforms.push(createPlatform(2400,floorPos_y - 100,120));
    
    platforms.push(createPlatform(-1900,floorPos_y - 100,150));
    platforms.push(createPlatform(-2700,floorPos_y - 100,100));
    
}

function draw()
{
	background(153,224,255); // fill the sky blue

    
    
	noStroke();
	fill(139, 93, 45,210);
	rect(0, floorPos_y, width, height/4);
    

	fill(91,178,76);
	rect(0, floorPos_y, width, height/11); 


    
    

    push();
    translate(scrollPos, 0);
    drawClouds();    
    drawMountains();
    drawTrees();
    

	// Draw canyons
    for (var i = 0; i < canyons.length; i++)
    {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
            
    }


	// Draw collectable items.
    for (var i = 0; i < collectables.length; i++)
    {
        if(!collectables[i].isFound)
            
    {
        drawCollectable(collectables[i]);
        checkCollectable(collectables[i]);

    };
                 
       
    }
    
    if(!checkFlagpole.isReached)
    {
        checkFlagpole(flagpole);
            
    }
    drawFlagpole(flagpole);
    
    for (var i = 0; i < enemies.length; i++)
        {
            enemies[i].update();
            enemies[i].draw();
            if(enemies[i].isContact(gameChar_world_x,gameChar_y))
            {
                hurtSound.play();
                startGame();
                break;
            }
        }
    
    for(var i = 0; i < platforms.length; i++)
        {
            platforms[i].draw();
}

    pop();
 
	// Draw game character.
	
	drawGameChar();
    
    fill(214,8,247);
    text("Rubies: " + game_score + "/23", 20, 40);
    text("Lives:" + lives, 850, 40);
    
    if(lives <= 0)
    {
            text("GAME OVER! Press CTRL + R to restart...",
            width/2 - 400,height/2 - 100);
            return;
       
    }
    else if(flagpole.isReached)
    {
            fill(255,85,0);
            text("LEVEL COMPLETE!",
            width/2 + 100, height/2 - 150);
        
            fill(214,8,247);
            text("Press CTRL + R to restart...",
            width/2 , height/2 - 100);
            winSound.play();
        
        //Win sound keeps looping.
            delay();
          
         
            return;            
    }
    
    if(gameChar_y > height)
        {
            if(lives > 0)startGame();
        }

            

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}


	// Logic to make the game character rise and fall.
    

    if (gameChar_y < floorPos_y)
    {
        
            var isContact = false;
        
            for (var i = 0; i < platforms.length; i++)
                {
                    if(platforms[i].checkContact(gameChar_world_x, gameChar_y)
                    ) 
                    {
                        isContact = true;
                        break;
                    }
                }
        
            if (isContact == false)
            {
            gameChar_y += 2.5;
            isFalling = true;
            }
        else 
        {
            isFalling = false;
        }
    }
    else
    {
            isFalling = false;
    }

    if (isPlummeting)
    {
            gameChar_y += 7;
            losingSound.play();
            
    }

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

}

// ---------------------
// Key control functions
// ---------------------

function keyPressed(){
    
    if(flagpole.isReached && key == ' ')
        {
            startGame();
        }


    if(keyCode == 65) // the key is A
    {
            isLeft = true;
      
    }
    
    if(keyCode == 68) // key is D
    {
            isRight = true;
    }
    
    if (keyCode == 87) // key is W
    {   
        if(!isFalling)
        {    
        gameChar_y -= 150;
        jumpSound.play();
        }
    }

}

function keyReleased()
{

    if (keyCode == 65) // the key is A
    {
            isLeft = false;
    }
    if (keyCode == 68) // key is D
    {
            isRight = false;
    }
//    if (keyCode == 87) // key is W
//    {
//            isFalling = false;
//    }


}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
    if(isLeft && isFalling )
	{
		
    // jumping-left code
        
    //HEAD
        stroke(2);
        fill(0);
        fill(253,230,133);
        rect (gameChar_x - 10,
              gameChar_y - 62,
              17,20,
              3.5);

        line(gameChar_x,gameChar_y - 70,
             gameChar_x,gameChar_y - 62);

        fill(0);
        ellipse (gameChar_x - 5,
                 gameChar_y - 54,
                 3,3);

        fill (255,128,205);
        ellipse (gameChar_x - 5,
                 gameChar_y - 47,
                 4,5);


    //FEET
        fill (169,127,55);
        ellipse (gameChar_x +10,
                 gameChar_y - 12,
                 16,8);

    //BODY

        fill (175,246,177);
        triangle (gameChar_x,gameChar_y - 42,
                  gameChar_x - 12,gameChar_y - 12,
                  gameChar_x + 12,gameChar_y - 12);

        fill (195,145,60);
        ellipse (gameChar_x - 10, gameChar_y - 17,
                 18,10);


    //ARMS

        fill(138,213,255);
        rect(gameChar_x - 10,
             gameChar_y - 32,
             12,
             7,
             3);


	}
    
	else if(isRight && isFalling )
	{
		
    // jumping-right code    
        
    //HEAD
        stroke(2);
        fill(253,230,133);
        rect (gameChar_x - 7
              ,gameChar_y - 62,
              17,
              20,
              3.5);

        line(gameChar_x,gameChar_y - 70,
             gameChar_x,gameChar_y - 62);

        fill(0);
        ellipse (gameChar_x + 5,
                 gameChar_y - 54,
                 3,3);

        fill (255,128,205);
        ellipse (gameChar_x + 5,
                 gameChar_y - 47,
                 4,5);


    //FEET
        fill  (169,127,55);
        ellipse (gameChar_x - 10,
                 gameChar_y - 12,
                 16,8);

    //BODY

        fill (175,246,177);
        triangle (gameChar_x,gameChar_y - 42,
                  gameChar_x - 12,gameChar_y - 12,
                  gameChar_x + 12,gameChar_y - 12);

        fill (195,145,60);
        ellipse (gameChar_x + 10,
                 gameChar_y - 17,
                 18,10);


    //ARMS

        fill(138,213,255);
        rect(gameChar_x - 2,
             gameChar_y - 32,
             12,
             7,
             3);

	}
	else if(isLeft)
	{
        
    // walking left code
        
    //HEAD
        stroke(2);
        fill(0);
        fill(253,230,133);
        rect (gameChar_x - 10,
              gameChar_y - 62,
              17,20,
              3.5);

        line(gameChar_x, gameChar_y - 70,gameChar_x,gameChar_y - 62);

        fill(0);
        ellipse (gameChar_x - 5,
                 gameChar_y - 54,
                 3,3);


    //BODY

        fill (175,246,177);
        triangle (gameChar_x,gameChar_y - 42, 
                  gameChar_x - 12,gameChar_y - 12, 
                  gameChar_x + 12,gameChar_y - 12);

    //FEET
        fill (195,145,60);
        ellipse (gameChar_x - 5, 
                 gameChar_y - 7, 
                 18,10);


    //ARMS

        fill(138,213,255);
        rect(gameChar_x - 2,
             gameChar_y - 32,
             7,12,
             3);
    

	}
	else if(isRight)
	{
        
    //walking right code
        
    //HEAD
        stroke(2);
        fill(0);
        fill(253,230,133);
        rect (gameChar_x - 7,
              gameChar_y - 62,
              17,20,
              3.5);

        line(gameChar_x,gameChar_y - 70, 
             gameChar_x,gameChar_y - 62);

        fill(0);
        ellipse (gameChar_x + 5,
                 gameChar_y - 54,
                 3,3);


    //BODY

        fill (175,246,177);
        triangle (gameChar_x,gameChar_y - 42, 
                  gameChar_x - 12,gameChar_y - 12, 
                  gameChar_x + 12,gameChar_y - 12);

    //FEET
        fill (195,145,60);
        ellipse (gameChar_x + 5, 
                 gameChar_y - 7, 
                 18,10);


    //ARMS

        fill(138,213,255);
        rect(gameChar_x - 5,
             gameChar_y - 32,
             7,
             12,
             3);

	}
	else if(isFalling || isPlummeting)
	{
        
    //jumping facing forwards code
        
    //HEAD
        stroke(2);
        fill(0);
        fill(253,230,133);
        rect (gameChar_x - 12,
              gameChar_y - 62,
              24,
              20,
              3.5);

        line(gameChar_x - 10,gameChar_y - 70,
             gameChar_x,gameChar_y - 62);
        
        fill (0);
        line(gameChar_x + 10,gameChar_y  - 70,
             gameChar_x,gameChar_y - 62);

        fill(0);
        ellipse (gameChar_x - 5,
                 gameChar_y - 54,
                 3,3);
        ellipse (gameChar_x + 5,
                 gameChar_y - 54,
                 3,3);


        fill(255,128,205);
        ellipse (gameChar_x,
                 gameChar_y - 47,
                 5,3);

    //ARMS

        fill(138,213,255);
        rect(gameChar_x - 16,
             gameChar_y - 37,
             12,
             7,
             3);

        fill(138,213,255);
        rect(gameChar_x + 4,
             gameChar_y - 37,
             12,
             7,
             3);

    //BODY

        fill (175,246,177);
        triangle (gameChar_x, gameChar_y - 42,
                  gameChar_x - 16,gameChar_y - 12,
                  gameChar_x + 16,gameChar_y - 12);

    //FEET
        fill (195,145,60);
        ellipse (gameChar_x - 10,
                 gameChar_y - 19, 
                 14,10);

        fill (169,127,55);
        ellipse (gameChar_x + 10, 
                 gameChar_y - 11,
                 11,8);

	}
	else
	{
        
    //standing front facing code

    //HEAD
        stroke(2);
        fill(0);
        fill(253,230,133);
        rect (gameChar_x - 12,
              gameChar_y - 62,
              24,
              20,
              3.5);

        line(gameChar_x - 10 ,gameChar_y - 70,
             gameChar_x,gameChar_y - 62);
        
        fill (0);
        line(gameChar_x + 10,gameChar_y - 70,
             gameChar_x,gameChar_y - 62);

        fill(0);
        ellipse (gameChar_x - 5,
                 gameChar_y - 54,
                 3,3);
        ellipse (gameChar_x + 5,
                 gameChar_y - 54,
                 3,3);


    //BODY

        fill (175,246,177);
        triangle (gameChar_x,gameChar_y - 42,
                  gameChar_x - 16,gameChar_y - 12,
                  gameChar_x + 16,gameChar_y - 12);

    //FEET
        fill (195,145,60);
        ellipse (gameChar_x - 10,
                 gameChar_y - 7,
                 13,10);

        fill (195,145,60);
        ellipse (gameChar_x + 10, 
                 gameChar_y - 7,
                 13,10);

    //ARMS

        fill(138,213,255);
        rect(gameChar_x - 11,
             gameChar_y - 32 ,
             7, 
             12,
             3);

        fill(138,213,255);
        rect(gameChar_x + 5,
             gameChar_y - 32,
             7,
             12,
             3);

	}
 

}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.


function drawClouds()

 {   
    for (var i = 0; i < clouds.length; i++)
    {
        noStroke();
        fill(255,255,255,250);
        
        ellipse(clouds[i].pos_x + 450, 
                clouds[i].pos_y + 15,
                clouds[i].width + 70,
                clouds[i].height + 60);

        ellipse(clouds[i].pos_x + 410,
                clouds[i].pos_y + 25,
                clouds[i].width + 50,
                clouds[i].height + 35);

        ellipse(clouds[i].pos_x + 378,
                clouds[i].pos_y + 25,
                clouds[i].width + 20,
                clouds[i].height + 10);

        ellipse(clouds[i].pos_x + 490,
                clouds[i].pos_y + 25,
                clouds[i].width + 40,
                clouds[i].height + 25);
            
    }
 }
    


// Function to draw mountains objects.

function drawMountains()
{
    
    for (var i = 0; i < mountains.length; i++)
        
    {   noStroke();
        fill(77, 122, 137);
        triangle(mountains[i].pos_x + 500,floorPos_y,
                 mountains[i].pos_x + 650,floorPos_y - 332,
                 mountains[i].pos_x + 800,floorPos_y);

        fill(127, 184, 204);
        triangle(mountains[i].pos_x + 650,floorPos_y,
                 mountains[i].pos_x + 720,floorPos_y - 272,
                 mountains[i].pos_x + 800,floorPos_y);
    }

}

// Function to draw trees objects.

function drawTrees()
{
    
    for (var i = 0; i < trees_x.length; i++)
    {
        noStroke();
        fill(102, 52, 0);
        rect(trees_x[i] - 17.5, treePos_y - 72,35,floorPos_y - 360);

        fill(15, 76, 0);
        rect(trees_x[i] - 57.5,treePos_y - 132,115,floorPos_y-372,9);

        fill(86, 127, 76);
        rect(trees_x[i] - 37.5,treePos_y - 182,75,floorPos_y-382,9);
            
    }
}


// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

function drawCollectable(t_collectable)
{
        stroke(127, 0, 24);
        strokeWeight(2);
        fill(204, 0, 38);
        ellipse(t_collectable.pos_x + 550, 
                t_collectable.pos_y + 317,
                t_collectable.size - 20);

        stroke(127, 0, 24);
        strokeWeight(1.5);
        fill(255, 76, 110,150);
        rect(t_collectable.pos_x + 545,
             t_collectable.pos_y + 312,
             11,
             11,
             0.5);
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    var d = dist(gameChar_world_x, gameChar_y, 
                 t_collectable.pos_x + 550, t_collectable.pos_y + 317);
    
    if ( d < 50)
    {
        t_collectable.isFound = true;
        game_score +=1;
        coinSound.play();
        
    }

}



// ---------------------------------
// Canyon render and check functions
// ---------------------------------


function drawCanyon(t_canyon)
{

    fill(153,224,255);
    quad(t_canyon.pos_x + 140 - t_canyon.width_1,
        432,
        t_canyon.pos_x + 320 + t_canyon.width_2,
        432,
        t_canyon.pos_x + 290,
        576,
        t_canyon.pos_x + 170,
        576);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    
    if (gameChar_world_x > t_canyon.pos_x + 150 && gameChar_world_x 
        < t_canyon.pos_x + 330 && gameChar_y >= floorPos_y) 
    {
            isPlummeting = true;

    } 
    
}

function drawFlagpole(t_flagpole)
{
    push();
    strokeWeight(10);
    stroke(119,136,153);
    line(t_flagpole.pos_x , floorPos_y, 
         t_flagpole.pos_x, floorPos_y - flagpole.height);
    noStroke();
    fill(139,69,19);
    ellipse(t_flagpole.pos_x, floorPos_y - flagpole.height ,20,20);
    pop();
    
    if(t_flagpole.isReached)
        {

                                
            noStroke();
            fill(255,215,0);
            triangle(t_flagpole.pos_x, floorPos_y - flagpole.height +20, 
                    t_flagpole.pos_x+70,floorPos_y-flagpole.height + 45,
                     t_flagpole.pos_x, floorPos_y - flagpole.height +70
                    );
             
             
        }
}

function checkFlagpole(t_flagpole)
{
    if(dist(gameChar_world_x, 0, flagpole.pos_x, 0) < 20)
    {
        t_flagpole.isReached = true;  
         
    }
    

}


function createPlatform (x,y,length)
{
        var p = {
            x: x ,
            y: y ,
            length: length,
            draw: function()
            {
               
            image(stone,this.x,this.y,this.length, 30,5);
            
            noStroke();
            fill (105,105,105);
            rect(this.x,this.y-10,this.length, 15);
            },
            
            checkContact: function(gc_x, gc_y)
            {
                //checks game char in contact with platform
                
                if (gc_x > this.x && gc_x < this.x + this.length)
                    {
                        var d = this.y - gc_y;
                        if (d >= 0 && d < 5)
                         {  
                           return true;
                         }
                 
                    }
                return false;
            }
     }
    return p;
}

function Enemy(x,y,range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    this.current_x = x;
    this.incr = 1;
    
    this.draw = function()
    {
        strokeWeight(2);
        stroke(0);
        fill(78,78,78);
        ellipse(this.current_x,this.y -40 ,30);
        
        
        fill(255,69,0);
        triangle(this.current_x - 4, this.y - 60,
                this.current_x + 3, this.y - 80,
                this.current_x + 8 , this.y - 60);
            
        triangle(this.current_x - 4, this.y -20 ,
                this.current_x + 3, this.y,
                this.current_x + 8 , this.y -20);

        
        triangle( this.current_x - 40, this.y - 40,           
                this.current_x - 20 , this.y -30,
                this.current_x - 20 , this.y -50 );   
        
        triangle( this.current_x + 40, this.y - 40,           
                this.current_x + 20 , this.y -30,
                this.current_x + 20 , this.y -50 );
    }
    
    this.update = function()
    {
       this.current_x += this.incr;
        
        if(this.current_x < this.x)
            {
                this.incr = 2;
            }
        else if (this.current_x> this.x + this.range)
            {
                this.incr =- 2;
            }
    }
    
    this.isContact = function(gameChar_x, gameChar_y)
    
    {
        var d = dist(gameChar_x,gameChar_y,this.current_x,this.y);
        
        if (d < 50)
            {
                return true;
            }
        return false;
        
    }
    
    


    
}

