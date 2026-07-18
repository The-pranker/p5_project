let state = 'start';
let myX = 400;
let myY = 400;
let enemyArray = [];

function setup() {
    createCanvas(800,800);
    background(0);
    rectMode(CENTER);
    textAlign(CENTER);

    setInterval(spawn, 1500);
}

function draw() {
    if (state == 'start') {
        fill(255);
        textSize(32);
        text("Name here", 400, 200);
        fill('#A8E6CF');
        rect(400, 300, 400, 100);
        fill(0);
        text("Easy", 400, 310);
        fill('#FFD3B6');
        rect(400, 450, 400, 100);
        fill(0);
        text("Medium", 400, 460);
        fill('#FF8B94');
        rect(400, 600, 400, 100);
        fill(0);
        text("Hard", 400, 610);
    }
    else if (state == 'end') {}

    else if (state == 'easy' || state == 'medium' || state == 'hard') { 
        background(0);
        fill(0, 0, 255);
        rect(myX, myY, 50, 50);

        for (let i = enemyArray.length - 1; i >= 0; i--) {
            fill(255, 0, 0);
            rect(enemyArray[i].xPos, enemyArray[i].yPos, enemyArray[i].sizeValue / 2, enemyArray[i].sizeValue / 2);
        }

        moveEnem();
        
        if (keyIsDown(UP_ARROW) && myY > 25) { 
            myY -= 3; 
        } 
        if (keyIsDown(DOWN_ARROW) && myY < height - 25) { 
            myY += 3; 
        } 
        if (keyIsDown(LEFT_ARROW) && myX > 25) { 
            myX -= 3; 
        } 
        if (keyIsDown(RIGHT_ARROW) && myX < width - 25) { 
            myX += 3; 
        }
    }
}
    
function mouseClicked() {
    if (state == 'start') {
        if (mouseX > 200 && mouseX < 600) {
            if (mouseY > 250 && mouseY < 350) {
                state = 'easy';
            }
            else if (mouseY > 400 && mouseY < 500) {
                state = 'medium';
            }
            else if (mouseY > 550 && mouseY < 650) {
                state = 'hard';
            }
        }
    }
}

function spawn() {
    let edge = int(random(4));
    let tempX, tempY, temp;

    if (edge === 0) {
        tempX = random(width);
        tempY = 0;
    } else if (edge === 1) {
        tempX = width;
        tempY = random(height);
    } else if (edge === 2) {
        tempX = random(width);
        tempY = height;
    } else {
        tempX = 0;
        tempY = random(height);
    }

    if (state == 'easy') {
        temp = new enemy(random(1, 4), random(1,4), tempX, tempY, 50);
    }
    else if (state == 'medium') {
        temp = new enemy(random(4, 10), random(4, 10), tempX, tempY, random(40, 50));
    }
    else if (state == 'hard') {
        temp = new enemy(random(15, 20), random (15,20), tempX, tempY, random(30, 40));
    }

    enemyArray.push(temp);
    
}

function moveEnem() {
    for (let i = enemyArray.length - 1; i >= 0; i--) {
        let xDiff = myX - enemyArray[i].xPos;
        let yDiff = myY - enemyArray[i].yPos;

        let angle = atan2(yDiff, xDiff);

        enemyArray[i].xPos += cos(angle) * enemyArray[i].speedValue;
        enemyArray[i].yPos += sin(angle) * enemyArray[i].speedValue;
    }
}

class enemy {
    constructor(speed, damage, x, y, size) {
        this.speedValue = speed;
        this.damageValue = damage;
        this.xPos = x;
        this.yPos = y;
        this.sizeValue = size;
    }
}

    //Scoreboard making
    /*

    let Splayer1 = 0;
    let Splayer2 = 0;
    let isCatch = true;
    let player1Caught = isCatch;
    let player2Caught = isCatch;

   if(player1Caught && !player2Caught)
   {
    Splayer1 += 5;
   }
   else if(player2Caught && !player1Caught)
   {
    Splayer2 += 5;
   }
   else if(player1Caught && player2Caught)
   {
    Splayer1 += 5;
    SPlayer2 += 5;
   }
   else{
    console.log("Keep trying to catch the ball.");
   }

   
    
    
    */
  
