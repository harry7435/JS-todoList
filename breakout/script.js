(function () {
  'use strict';

  const get = (element) => document.querySelector(element);

  class BrickBreak {
    constructor(parent = 'body', data = {}) {
      this.parent = get(parent);
      this.canvas = document.createElement('canvas');
      this.canvas.setAttribute('width', 480);
      this.canvas.setAttribute('height', 340);
      this.ctx = this.canvas.getContext('2d');
      this.fontFamily =
        "20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
      this.score = 0;
      this.lives = data.lives;
      this.speed = data.speed;
      this.image = document.createElement('img');
      this.bg = data.bg;
      this.radius = 10;
      this.ballX = this.canvas.width / 2;
      this.ballY = this.canvas.height - 30;
      this.directX = data.speed;
      this.directY = -data.speed;
      this.paddleWidth = data.paddleWidth;
      this.paddleHeight = data.paddleHeight;
      this.rightPressed = false;
      this.leftPressed = false;
      this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
      this.brickRow = data.brickRow;
      this.brickCol = data.brickCol;
      this.brickWidth = data.brickWidth;
      this.brickHeight = data.brickHeight;
      this.brickPad = data.brickPad;
      this.brickPosX = data.brickPosX;
      this.brickPosY = data.brickPosY;
      this.ballColor = data.ballColor;
      this.paddleColor = data.paddleColor;
      this.fontColor = data.fontColor;
      this.brickStartColor = data.brickStartColor;
      this.brickEndColor = data.brickEndColor;
      this.image.setAttribute('src', this.bg);
      this.parent.appendChild(this.canvas);
      this.bricks = [];
    }

    init = () => {
      // 벽돌 배열 만들기
      for (let colIndex = 0; colIndex < this.brickCol; colIndex++) {
        this.bricks[colIndex] = [];
        for (let rowIndex = 0; rowIndex < this.brickRow; rowIndex++) {
          this.bricks[colIndex][rowIndex] = { x: 0, y: 0, status: 1 };
        }
      }
      // this.keyEvent()
      this.draw();
    };

    // 공 그리기
    drawBall = () => {
      this.ctx.beginPath();
      this.ctx.arc(this.ballX, this.ballY, this.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.ballColor;
      this.ctx.fill();
      this.ctx.closePath();
    };

    // 패들 막대기 그리기
    drawPaddle = () => {
      this.ctx.beginPath();
      this.ctx.rect(
        this.paddleX,
        this.canvas.height - this.paddleHeight,
        this.paddleWidth,
        this.paddleHeight
      );
      this.ctx.fillStyle = this.paddleColor;
      this.ctx.fill();
      this.ctx.closePath();
    };

    // 벽돌 그리기
    drawBricks = () => {
      let brickX = 0;
      let brickY = 0;
      let gradient = this.ctx.createLinearGradient(0, 0, 200, 0);
      gradient.addColorStop(0, this.brickStartColor);
      gradient.addColorStop(1, this.brickEndColor);

      for (let colIndex = 0; colIndex < this.brickCol; colIndex++) {
        for (let rowIndex = 0; rowIndex < this.brickRow; rowIndex++) {
          if (1 !== this.bricks[colIndex][rowIndex].status) {
            continue;
          }
          brickX =
            colIndex * (this.brickWidth + this.brickPad) + this.brickPosX;
          brickY =
            rowIndex * (this.brickHeight + this.brickPad) + this.brickPosY;

          this.bricks[colIndex][rowIndex].x = brickX;
          this.bricks[colIndex][rowIndex].y = brickY;

          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          this.ctx.fillStyle = gradient;
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    };

    // 점수 표시
    drawScore = () => {
      this.ctx.font = this.fontFamily;
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillText('점수 : ' + this.score, 10, 22);
    };

    // 목숨 표시
    drawLives = () => {
      this.ctx.font = this.fontFamily;
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillText('목숨 : ' + this.lives, this.canvas.width - 68, 22);
    };

    draw = () => {
      // 캔버스 초기화
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.drawImage(
        this.image,
        this.canvas.width / 2 - this.image.width / 2,
        this.canvas.height / 2 - this.image.height / 2
      );

      this.drawBall();
      this.drawPaddle();
      this.drawBricks();
      this.drawScore();
      this.drawLives();
      // this.detectCollision();

      this.ballX += this.directX;
      this.ballY += this.directY;

      requestAnimationFrame(this.draw);
    };

    // reset = () => {
    //   document.location.reload();
    // };
  }

  const data = {
    lives: 5,
    speed: 2,
    paddleHeight: 10,
    paddleWidth: 75,
    bg: './assets/bg.jpeg',
    ballColor: '#04bf55',
    paddleColor: '#05aff2',
    fontColor: '#f2bb16',
    brickStartColor: '#f29f05',
    brickEndColor: '#f21905',
    brickRow: 3,
    brickCol: 5,
    brickWidth: 75,
    brickHeight: 20,
    brickPad: 10,
    brickPosX: 30,
    brickPosY: 30,
  };

  const brickBreak = new BrickBreak('.canvas', data);
  brickBreak.init();
})();
