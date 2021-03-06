// Y coordinates
var DISTANCE_BETWEEN_ROWS = 85;
var FIRST_ROW = 55;

// X coordinates
var DISTANCE_BETWEEN_COLUMNS = 100;
var LEFT_SCREEN = -100;
var RIGHT_SCREEN = 505;

// Speed
var MAX_SPEED = 300;
var MIN_SPEED = 50;

// Player
var STARTING_X = 200;
var STARTING_Y = 395;
var MAX_X = 400;
var MIN_X = 0;
var MAX_Y = 395;
var MIN_Y = 100;
var HITBOX = 50;

// Score
var SCORE_X = 20;
var SCORE_Y = 20;

// Enemy
var NUM_OF_ENEMIES = 3;

// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = Math.random() * (RIGHT_SCREEN - LEFT_SCREEN) + LEFT_SCREEN;
  this.y = FIRST_ROW + Math.floor(Math.random() * 3) * DISTANCE_BETWEEN_ROWS;
  this.speed = Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x > 505) {
    this.x = -100;
    this.y = FIRST_ROW + Math.floor(Math.random() * 3) * DISTANCE_BETWEEN_ROWS;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = STARTING_X;
  this.y = STARTING_Y;
  this.score = 0;
};

Player.prototype.update = function() {
  // Handle collision
  for (var i = 0; i < allEnemies.length; i++) {
    if (Math.abs(this.x - allEnemies[i].x) < HITBOX && this.y == allEnemies[i].y) {
      this.x = STARTING_X;
      this.y = STARTING_Y;
    }
  }
};
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.clearRect(SCORE_X - 20, SCORE_Y - 20, 50, 50);
  ctx.fillText(this.score, SCORE_X, SCORE_Y);
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keyCode) {
  switch (keyCode) {
    case "left":
      if (this.x > MIN_X) {
        this.x -= DISTANCE_BETWEEN_COLUMNS;
      }
      break;
    case "up":
      if (this.y > MIN_Y) {
        this.y -= DISTANCE_BETWEEN_ROWS;
      } else {
        // The player won!
        this.score++;
        this.y = STARTING_Y;
      }
      break;
    case "right":
      if (this.x < MAX_X) {
        this.x += DISTANCE_BETWEEN_COLUMNS;
      }
      break;
    case "down":
      if (this.y < MAX_Y) {
        this.y += DISTANCE_BETWEEN_ROWS;
      }
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];
for (var i = 0; i < NUM_OF_ENEMIES; i++) {
  allEnemies.push(new Enemy());
}
player = new Player();



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
