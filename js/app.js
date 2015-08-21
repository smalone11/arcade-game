// Enemies our player must avoid
var Enemy = function(locX, locY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //Starting Location of Enemy
    // Row 1 = 60, Row 2 = 140, Row 3 = 220
    this.x = locX;
    this.y = locY;

    //Speed of Enemy
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //If statement to determine if the enemy should start over
    if (this.x > 700) {
      //Start over
      this.x = -600;
      //Move enemy to next row
      if (this.y === 60) {
        this.y = 140;
      }else if (this.y === 140) {
        this.y = 220;
      } else {
        this.y = 60;
      }
    }else {
      //continue path
      this.x = this.x + (dt * this.speed);
      this.y = this.y + 0;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  //Starting location of player
  this.x = 200;
  this.y = 380;

  //Token for player
  this.sprite = ['images/char-boy.png',
                'images/char-cat-girl.png',
                'images/char-horn-girl.png',
                'images/char-pink-girl.png',
                'images/char-princess-girl.png'];
  this.char = 0;
}

Player.prototype.update = function(scores) {
  //For statement to determine if player runs into enemy
  for (e = 0; e < allEnemies.length; e++) {
    //Checks to see if an enemy is on the same row as the player
    if (allEnemies[e].y === this.y) {
      //Checks to see if an enemy is in the same column as the player
      if ((allEnemies[e].x + 41) >= this.x && this.x >= (allEnemies[e].x - 41)) {
        //Sends player back to start
        this.x = 200;
        this.y = 380;
        //Checks to see if player beat previous high score and returns the scores
        if (scores[1] < scores[0]) {
          scores[1] = scores[0];
          scores[0] = 0;
          return scores;
        }else {
          scores[0] = 0;
          return scores;
        }
      }
    }
  }
  //Checks to see if the player reached the end and returns scores
  if (this.y !== -20) {
    return scores;
  }else {
    //Returns player to starting point
    this.x = 200;
    this.y = 380;

    //Increases score by 1
    scores[0] = scores[0] + 1;
    return scores
  }
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite[this.char]), this.x, this.y);
}

//Moves character based on key pressed
Player.prototype.handleInput = function(input) {
  if (input === 'up') {
    if ((this.y - 80) > -21) {
      this.y = this.y - 80;
    }
  }else if (input === 'down') {
    if ((this.y + 80) < 460) {
      this.y = this.y + 80;
    }else if (this.x === 200) {
      this.char = (this.char + 1) % 5;
    }
  }else if (input === 'left') {
    if ((this.x - 101) > -3) {
      this.x = this.x - 101;
    }
  }else if (input === 'right'){
    if ((this.x + 101) < 403) {
      this.x = this.x + 101;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(-125, 60, 100), new Enemy(-125, 140, 200), new Enemy(-300, 220, 300),
new Enemy(-600, 60, 400), new Enemy(-600, 220, 200), new Enemy(-600, 140, 300)];

var player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    //Checks to see if appropriate key was pressed
    if (allowedKeys[e.keyCode] != 'undefined') {
      player.handleInput(allowedKeys[e.keyCode]);
    }
});
