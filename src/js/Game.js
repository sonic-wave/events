export default class Game {
    constructor () {
        this.goblin = document.querySelectorAll('.cell');
        this.scoreText = document.querySelector('.score');
        this.healthText = document.querySelector('.health')
        this.newGameBtn = document.querySelector('.newGame')
        this.stopGameBtn = document.querySelector('.stopGame')
        this.health = 5;
        this.score = 0;
        this.numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        this.randomNum = 0;
        this.temp = 0;
    }

    init() {
        this.goblinImage = this.goblinImageCreate();
        this.restart = false;
        this.hammerSmash();      
        this.bindButtons();
        this.startGame();
    }

    bindButtons() {
        this.newGameBtn.addEventListener('click', () => {
            this.restart = true;
            this.startGame()
        });       
        this.stopGameBtn.addEventListener('click', () => {
            this.stopGame();
        });  
    }

    startGame() {
        if (this.restart) {
            this.stopGame();
            this.restart = true;
        }
        this.health = 5;
        this.score = 0;
        this.numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        this.randomNum = 0;
        this.temp = 0;
        this.scoreText.textContent = this.score;
        this.healthText.textContent = this.health;

        this.interval = setInterval(() => {
            if (!this.numArray.length) {
              this.numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            }
            this.random();
            this.temp = this.numArray[this.randomNum];
            this.numArray = this.numArray.filter((element) => element !== this.temp);
            this.goblin[this.temp].appendChild(this.goblinImage);
            this.checkListener();
            this.checkHealth();
          }, 1000);
    }

    random() {
        this.randomNum = Math.floor(Math.random() * this.numArray.length);
    }

    removeGoblin() {
        if(this.goblin[this.temp]) {
            this.goblin[this.temp].removeChild(this.goblinImage);
        }
    }

    goblinImageCreate() {
        const goblinImage = document.createElement('img');
        goblinImage.src = '/src/img/goblin.png';
        return goblinImage;
    }

    hammerSmash() {
        this.goblin.forEach(element => element.addEventListener('click', () => {
            if (this.health < 1) {
                this.stopGame();
                alert('Игра окончена');
              }

            if (element.contains(this.goblinImage)) {
                this.score += 1;
                this.scoreText.textContent = this.score;
                this.listener = true;
              } 
            else {
              this.health -= 1;
              this.healthText.textContent = this.health;
            }
          }))
    }

    checkListener() {
        if (this.listener === false) {
            this.health -= 1;
            this.healthText.textContent = this.health;
        }
        this.listener = false;
    }

    checkHealth() {
        if (this.health < 1) {
              this.stopGame();
              alert('Игра окончена');
            }
    }

    stopGame() {
        clearInterval(this.interval);
        this.removeGoblin();
        this.restart = false;
    }
}
