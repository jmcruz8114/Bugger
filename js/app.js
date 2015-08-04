// Enemies our player must avoid
var allY = [60, 143, 226, 311];
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = allY[Math.floor(Math.random() * 4)];
    this.speed = Math.floor(100 + (Math.random() * 300));
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < ctx.canvas.width){
        this.x += this.speed * dt;
    }
    // If the enemy is off the screen, reset position
    else{
        this.x = -100;
        this.y = allY[Math.floor(Math.random() * 4)];
        this.speed = Math.floor(100 + (Math.random() * 300));
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
var Player = function(x,y){
    this.sprite ='images/char-boy.png';
    this.x = x;
    this.y = y;
}

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt){
    // If player reaches top row, reset back to start
    if(this.y < 50){
        player.reset();
    }
    // Defines player's area
    playerPosition = {
        'left':   this.x,
        'top':    this.y,
        'right':  this.x + 50,
        'bottom': this.y + 70,
    }
    // Iterate through allEnemies and define enemy area
    for(e = 0; e < allEnemies.length; e++){
        bugPosition = {
            'left':   allEnemies[e].x,
            'top':    allEnemies[e].y,
            'right':  allEnemies[e].x + 70,
            'bottom': allEnemies[e].y + 70,
        }
    // Collision detection
    if(playerPosition.left < bugPosition.right &&
        playerPosition.top < bugPosition.bottom &&
        playerPosition.right > bugPosition.left &&
        playerPosition.bottom > bugPosition.top){
        player.reset(); }
    }
}

// Reset player back to starting position.
Player.prototype.reset = function(){
    this.x = 303;
    this.y = 400;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if(key === 'left' && this.x > 25){
        this.x -= 101;
    }
    if(key === 'up' && this.y > 0){
        this.y -= 83;
    }
    if(key === 'right' && this.x < 600){
        this.x += 101;
    }
    if(key === 'down' && this.y < 400){
        this.y += 83;
    }
}

// Now instantiate your objects.
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

var player = new Player(303, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});