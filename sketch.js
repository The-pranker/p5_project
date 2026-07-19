let state = 'start';
let playerX = 400;
let playerY = 400;
let playerHealth;
let enemyArray = [];
let score = 0;
let highScore = 0;
let bulletSpeed = 10;
let bulletDamage = 10;
let bulletArray = [];

function setup() {
    createCanvas(800,800);
    background(0);
    rectMode(CENTER);
    textAlign(CENTER);

    setInterval(spawnEnemy, 1500);
}

function draw() {
    if (state == 'start') {
        background(0);
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
    else if (state == 'end') {
        background(0);
        fill(255);
        text("Final Score: " + score, 400, 200);
        text("High Score: " + highScore, 400, 300);
        fill('#22ff00');
        rect(400, 450, 400, 100);
        fill(0);
        text("Play Again", 400, 460);
    }
    else if (state == 'easy' || state == 'medium' || state == 'hard') { 
        background(0);
        fill(0, 0, 255);
        rect(playerX, playerY, 50, 50);
        fill(255);
        text("Score: " + score, 80, 50);
        text("Health: " + playerHealth, 700, 50);

        if (playerHealth <= 0) {
            state = 'end';
            if (score > highScore) {
                highScore = score;
            }
        }

        for (let i = enemyArray.length - 1; i >= 0; i--) {
            fill(255, 0, 0);
            rect(enemyArray[i].xPos, enemyArray[i].yPos, enemyArray[i].sizeValue, enemyArray[i].sizeValue);
        }

        for (let i = bulletArray.length - 1; i >= 0; i--) {
            fill(255, 255, 143);
            ellipse(bulletArray[i].xPos, bulletArray[i].yPos, bulletArray[i].sizeValue, bulletArray[i].sizeValue);
        }

        moveEnemy();
        movePlayer();
        moveBullet();
        checkCollision();


    }
}
    
function mouseClicked() {
    if (state == 'start') {
        if (mouseX > 200 && mouseX < 600) {
            if (mouseY > 250 && mouseY < 350) {
                state = 'easy';
                playerHealth = 100;
            }
            else if (mouseY > 400 && mouseY < 500) {
                state = 'medium';
                playerHealth = 80;
            }
            else if (mouseY > 550 && mouseY < 650) {
                state = 'hard';
                playerHealth = 50;
            }
        }
    }
    else if (state == 'easy' || state == 'medium' || state == 'hard') {
        spawnBullet();
    }
    else if (state == 'end') {
        if (mouseX > 200 && mouseX < 600 && mouseY > 350 && mouseY < 550) {
            state = 'start';
        }
    }
}

function spawnEnemy() {
    if (state !== 'easy' && state !== 'medium' && state !== 'hard') {
        return;
    }
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
        temp = new enemy(int(random(1, 4)), int(random(1,4)), tempX, tempY, 50, int(random(1, 5)));
    }
    else if (state == 'medium') {
        temp = new enemy(int(random(4, 10)), int(random(4, 10)), tempX, tempY, int(random(40, 50)), int(random(5, 10)));
    }
    else if (state == 'hard') {
        temp = new enemy(int(random(15, 20)), int(random(15,20)), tempX, tempY, int(random(30, 40)), int(random(10, 25)));
    }

    enemyArray.push(temp);

}

function spawnBullet() {
    let xDiff = mouseX - playerX;
    let yDiff = mouseY - playerY;
    let angle = atan2(yDiff, xDiff);
    
    let temp = new bullet(bulletSpeed, bulletDamage, playerX, playerY, 10, angle); 
    bulletArray.push(temp);
}

function moveEnemy() {
    for (let i = enemyArray.length - 1; i >= 0; i--) {
        let xDiff = playerX - enemyArray[i].xPos;
        let yDiff = playerY - enemyArray[i].yPos;

        let angle = atan2(yDiff, xDiff);

        enemyArray[i].xPos += cos(angle) * enemyArray[i].speedValue;
        enemyArray[i].yPos += sin(angle) * enemyArray[i].speedValue;
    }
}

function movePlayer() {
     if (keyIsDown(UP_ARROW) && playerY > 25) { 
            playerY -= 3; 
        } 
        if (keyIsDown(DOWN_ARROW) && playerY < height - 25) { 
            playerY += 3; 
        } 
        if (keyIsDown(LEFT_ARROW) && playerX > 25) { 
            playerX -= 3; 
        } 
        if (keyIsDown(RIGHT_ARROW) && playerX < width - 25) { 
            playerX += 3; 
        }
}

function moveBullet() {
    for (let i = bulletArray.length - 1; i >= 0; i--) {
        bulletArray[i].xPos += cos(bulletArray[i].targetAngle) * bulletArray[i].speedValue; 
        bulletArray[i].yPos += sin(bulletArray[i].targetAngle) * bulletArray[i].speedValue; 
        

        if (bulletArray[i].xPos < 0 || bulletArray[i].xPos > width || bulletArray[i].yPos < 0 || bulletArray[i].yPos > height) {
            bulletArray.splice(i, 1);
        }
    }
}
function checkCollision() {
    for (let i = enemyArray.length - 1; i >= 0; i--) {
        if (dist(playerX, playerY, enemyArray[i].xPos, enemyArray[i].yPos) < 25) {
            playerHealth -= enemyArray[i].damageValue;
            enemyArray.splice(i, 1);
        }
        for (let j = bulletArray.length - 1; j >= 0; j--) {
            if (dist(bulletArray[j].xPos, bulletArray[j].yPos, enemyArray[i].xPos, enemyArray[i].yPos) < enemyArray[i].sizeValue / 2) {
                if (bulletArray[j].damageValue >= enemyArray[i].healthValue) {
                    enemyArray.splice(i, 1);
                    bulletArray.splice(j, 1);
                    if (state == 'easy') {
                        score += 1;
                    }
                    else if (state == 'medium') {
                        score += 3;
                    }
                    else if (state == 'hard') {
                        score += 5;
                    }
                    break;
                }
                else if (bulletArray[j].damageValue < enemyArray[i].healthValue) {
                    enemyArray[i].healthValue -= bulletArray[j].damageValue;
                    bulletArray.splice(j, 1);
                }
            }
        }
    }
}

class enemy {
    constructor(speed, damage, x, y, size, health) {
        this.speedValue = speed;
        this.damageValue = damage;
        this.xPos = x;
        this.yPos = y;
        this.sizeValue = size;
        this.healthValue = health;
    }
}

class bullet {
    constructor(speed, damage, x, y, size, angle) {
        this.speedValue = speed;
        this.damageValue = damage;
        this.xPos = x;
        this.yPos = y;
        this.sizeValue = size;
        this.targetAngle = angle;
    }
}