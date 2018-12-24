const imgBug = 'images/enemy-bug.png';
const imgBoy = 'images/char-boy.png';
// random speed
function enemyRandomSpeed(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  class Enemy {
    constructor(speed, x, y, width, height, sprite = imgBug) {
      this.speed = speed;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.sprite = sprite;
    }
  }

  Enemy.prototype.update = function (dt) {
    if (this.x < 505) {
      this.x += (this.speed * dt);
    } else {
      this.x = 0;
    }
  };

  Enemy.prototype.render = function () {
    let XColl = false;
    let YColl = false;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);

    if (((this.x + 10) + (this.width - 50) >= (player.x + 10)) && ((this.x + 10) <= (player.x + 10) + (player.width - 50))) XColl = true;
    if (((this.y + 20) + (this.height - 120) >= player.y + 10) && ((this.y + 10) <= (player.y + 10) + player.height - 120)) YColl = true;

  // back to the start point
    if (XColl && YColl) {
      player.x = 200;
      player.y = 380;
    };
  };

  class Player {
    constructor(x, y, width, height, sprite = imgBoy) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.sprite = sprite;
    }
  }

  Player.prototype.update = function () {
    if (this.y <= 40) {
      this.x = 200;
      this.y = 380;
    };
  };

  Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
  };

  Player.prototype.handleInput = function (key) {
    if (key === 'left' && this.x > 0) {
      this.x -= 100;
    } else if (key === 'right' && this.x<400) {
      this.x += 100;
    } else if (key === 'up' && this.y > 0) {
      this.y -= 80;
    } else if (key === 'down' && this.y < 380) {
      this.y += 80;
    }
  };
  //------------------------------------------------------
  const enemy = new Enemy(enemyRandomSpeed(70, 200), 0, 63, 101, 171);
  const enemyJack = new Enemy(enemyRandomSpeed(90, 200), 0, 145, 101, 171);
  const enemyMarty = new Enemy(enemyRandomSpeed(40, 250), 0, 228, 101, 171);
  const enemyBuba = new Enemy(enemyRandomSpeed(68, 150), 0, 63, 101, 171);

  const player = new Player(200, 380, 101, 171);
  //------------------------------------------------------
  const allEnemies = [enemy, enemyJack, enemyMarty, enemyBuba];
  //------------------------------------------------------
  document.addEventListener('keyup', function(e) {
    const allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
   };

      player.handleInput(allowedKeys[e.keyCode]);
  });
