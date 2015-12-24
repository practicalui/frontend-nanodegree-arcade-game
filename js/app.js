var ROWSIZE = 83;
var COLSIZE = 101;

// Enemies our player must avoid
// takes a number between 1 and 3 to indicate which row
// in the road that the enemy should appear on.
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    var start = Math.floor(Math.random() * 5); // initial appearance is random x
    this.x = getColPixels(start);
    this.y = getRowPixels(row);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var speed = Math.floor((Math.random() * 100) + 50);
    this.x+=1*dt*speed;
    if (this.x>getColPixels(5)) { //when the bug gets to the end, send it back to the start
      this.x=getColPixels(0);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// player always starts at column 2 row 5

var Player = function() {
  this.sprite = 'images/char-horn-girl.png';
  this.x = getColPixels(2);
  this.y = getRowPixels(5);
  //console.log(getRow(this.y));
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

// respond to arrow keys the user clicks

Player.prototype.handleInput = function(thekey) {
  //console.log(thekey);
  var numRows = 6;
  var numCols = 5;

  if (thekey==='up' && getRow(this.y)> 0) {
    this.y-=ROWSIZE;
  } else if (thekey==='down' && getRow(this.y)<numRows-1) {
    this.y+=ROWSIZE;
  } else if (thekey==='right' && getCol(this.x)<numCols-1) {
    this.x+=COLSIZE;
  } else if (thekey==='left' && getCol(this.x)>0) {
    this.x-=COLSIZE;
  }
  //console.log(getRow(this.y));

  this.render();
};
// send the player back to the start
Player.prototype.reset = function() {
  this.x = getColPixels(2);
  this.y = getRowPixels(5);
};

// checks for collisions between the player and each enemy
  function checkCollisions() {
    for (i=0; allEnemies.length>i; i++) {
      if (player.x >= allEnemies[i].x-50 && player.x <= allEnemies[i].x+50 && player.y===allEnemies[i].y) {
        $('#error').removeClass('hidden'); //unhide the error div from index.html
        setTimeout(function(){
          $('#error').addClass('hidden');
        }, 2000);
        player.reset();
      }
    }
  }

// check whether the player reached the end
  function checkWinner() {
    if (player.y===getRowPixels(0)) {
      $('#win').removeClass('hidden');
      setTimeout(function(){
        $('#win').addClass('hidden');
      }, 2000);
      player.reset();
    }
  }

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies[0] = new Enemy(1);
allEnemies[1] = new Enemy(2);
allEnemies[2] = new Enemy(3);

var player = new Player();


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


// convenience methods for switching between pixels and columns/rows
function getColPixels(c) {
  return c*COLSIZE;
}

function getRowPixels(r) {
  return r*ROWSIZE;
}

function getCol(x) {
  return x/COLSIZE;
}

function getRow(y) {
  return y/ROWSIZE;
}
