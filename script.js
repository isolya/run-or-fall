import { LEVELS_INFO } from './script2.js';

const pageIntro = document.querySelector('.page#intro');
const pageTimer = document.querySelector('.page#timer');
const pageGameOver = document.querySelector('.page#game-over');
const pageMain = document.querySelector('.page#main');
const pageFinish = document.querySelector('.page#finish');
const pageEndOfTheGame = document.querySelector('.page#end-of-the-game');
const clickNextLevel = document.querySelector('div.nextLevel');
const clickRestart = document.querySelector('div.restart') ;
const clickStart = document.querySelector('div.start');
const clickRestartGame = document.querySelector('div.restartGame');

window.addEventListener('load', () => {    
    initListeners();

})

const firstStart = () => {
    pageIntro.classList.remove('active');
    pageTimer.classList.add('active');
    setupLevel(state, 1);
    generateField();
    mountField();
    start(3);
    
}


const restart =  () => {
    pageGameOver.classList.remove('active');
    pageMain.classList.add('active');
    getCurrentCell().element.classList.remove('cell--active');
    state.direction = [-1, 0];
    setupLevel(state, state.currentLevel);
    state.score = 0;
    
   startGame();
}
      
const nextLevel = () => {
    pageFinish.classList.remove('active');
    pageMain.classList.add('active');
    getCurrentCell().element.classList.remove('cell--active');
    state.direction = [-1, 0];
    setupLevel(state, state.currentLevel + 1);
    startGame();
}

const copy = (o) => JSON.parse(JSON.stringify(o));
let timer;
let timerTick;

const state = {
    columnNumber: 10,
    rowNumber: 10,
    cells: [],
    gameIsActive: true,
    direction: [-1, 0],
    score: 0,
    gamePause: false,
};

const setupLevel = (state, levelNumber) => {
    const currentLevelInfo = LEVELS_INFO[levelNumber - 1];
    console.log(currentLevelInfo);
    state.duckCoord = copy(currentLevelInfo.DUCK_COORD);
    state.finishPoint = copy(currentLevelInfo.FINISH_POINT);
    state.bridgePoints = copy(currentLevelInfo.BRIDGE_POINTS);
    state.coinsPoints = copy(currentLevelInfo.COINS_POINTS);
    state.speed = copy(currentLevelInfo.SPEED);
    state.currentLevel = copy(currentLevelInfo.CURRENT_LEVEL);
}

const reloadField = () => {
    state.cells.forEach((cell) => {
        cell.isBridge = false;
        cell.isFinish = false;
        cell.isCoins = false;
        cell.isDuckling = false;
        cell.element.innerHTML = '';
        
    });
}

const start = (x) => {
    document.getElementById('time').innerHTML = x;
    if (x <= 0) {
        clearTimeout(timer);
        document.getElementById('time').innerHTML = "Поехали!";
        pageTimer.classList.remove('active');
        pageMain.classList.add('active');

        startGame();
    }
    else {
        timer = setTimeout(start, 1000, x - 1);
    }
}

const creatDiv = () => {
    let div = document.createElement("div");
    div.classList.add("cell")
    return div
}

const generateField = () => {
    for (let rowIndex = 0; rowIndex < state.rowNumber; rowIndex += 1) {
        for (let columnIndex = 0; columnIndex < state.columnNumber; columnIndex += 1) {

            let div = creatDiv()
            const cell = {
                element: div,
                rowIndex, 
                columnIndex,
                isBridge: false,
                isCoins: false,
                isDuckling: false,
                isFinish: false,
            }
            state.cells.push(cell);
        }
    }
}

const mountField = () => {
    const grid = document.getElementById("main")
    state.cells.forEach((cell) => {
        grid.appendChild(cell.element);
    });
}

const generateEntity = () => {
    const [columnIndex,rowIndex] = state.finishPoint;
    state.cells[rowIndex * state.columnNumber + columnIndex].isFinish = true;

    state.coinsPoints.forEach(([columnIndex, rowIndex]) => {
        state.cells[rowIndex * state.columnNumber + columnIndex].isCoins = true;
        
    })

    state.bridgePoints.forEach(([columnIndex, rowIndex]) => {
        state.cells[rowIndex * state.columnNumber + columnIndex].isBridge = true;
    })
}

const render = () => {
    state.cells.forEach((cell) => {
        cell.element.className = 'cell';
        if (cell.isBridge) {
            cell.element.classList.add('is-bridge');
        }
        if (cell.isFinish) {
            cell.element.classList.add('is-finish');
            cell.element.innerHTML = 'Finish!';
        }
        if (cell.isCoins) {
            cell.element.classList.add('is-coins');
        }
    });
    getCurrentCell().element.classList.add('cell--active');
}

const getCurrentCell = () => {
    return state.cells[state.duckCoord[1] * 10 + state.duckCoord[0]];
}

const moveDuck = () => {
    if (state.duckCoord[0] >= 0 && state.duckCoord[0] <= 9 && state.duckCoord[1] >= 0 && state.duckCoord[1] <= 9) {
        state.duckCoord[1] += state.direction[0]
        state.duckCoord[0] += state.direction[1]
    }
    removeCoin();
}

const initListeners  = () => {
    window.addEventListener('keydown',  (event) => {
        if (event.code == 'ArrowLeft') {
            state.direction = [0, -1]
        } 
        else if (event.code == 'ArrowUp') {
            state.direction = [-1, 0]
        }
        else if (event.code == 'ArrowRight') {
            state.direction = [0, 1]
        }
        else if (event.code == 'ArrowDown') {
            state.direction = [1, 0]
        }
        else if (event.code == 'Space'){
           if(state.gamePause === false){
             clearTimeout(timerTick);
             state.gamePause = true;
           }
           else if(state.gamePause === true){
             timerTick = setTimeout(tick, state.speed);
             state.gamePause = false;
           }
        }
    });

    clickNextLevel.addEventListener('click', () => {
     nextLevel();
    });

    clickRestart.addEventListener('click', () => {
     restart(); 
 
    });

    clickStart.addEventListener('click', () => {
     firstStart();
    });

    clickRestartGame.addEventListener('click', () => {
     restartGame(); 
    });
}

const restartGame = () => {
    pageEndOfTheGame.classList.remove('active');
    pageTimer.classList.add('active');
    getCurrentCell().element.classList.remove('cell--active');
    state.direction = [-1, 0];
    setupLevel(state, 1);
    generateField();
    mountField();
    start(3);
}
const removeCoin = () => {
    for (let i = 0; i < state.coinsPoints.length; i++) {
        const [coinC, coinR] = state.coinsPoints[i];
        if (state.duckCoord[0] === coinC && state.duckCoord[1] === coinR) {
            const cell = getCurrentCell();
            cell.element.classList.remove('is-coins');
            cell.isCoins = false
            state.coinsPoints.splice(i, 1);
            state.score += 1;
            document.getElementById('score').innerHTML = state.score;
        }

    }
}

const checkFinish = () => {
    const [columnIndex, rowIndex] = state.finishPoint;
    if (columnIndex === state.duckCoord[0] && rowIndex === state.duckCoord[1]) finish(); 
}

const finish = () => {
    pageMain.classList.remove('active');

    if (state.currentLevel === 3) {
        pageEndOfTheGame.classList.add('active');
        state.score = 0;
        document.getElementById('score').innerHTML = state.score;
    } else {
        pageFinish.classList.add('active');
    }

    state.gameIsActive = false;
}

const checkGameOver = () => {
    const duckInTheBounce = state.bridgePoints.some((point) => state.duckCoord[0] === point[0] && state.duckCoord[1] === point[1]);
    if (!duckInTheBounce) gameOver();
}

const gameOver = () => {
    pageMain.classList.remove('active');
    pageGameOver.classList.add('active');
    state.gameIsActive = false;
}

const tick = () => {
    moveDuck();
    checkFinish();
    checkGameOver();
    render();
    
    if (state.gameIsActive) 
    timerTick = setTimeout(tick, state.speed);
    
}

const startGame = () => {
    reloadField();
    generateEntity ();
    state.gameIsActive = true;
    tick();
    
}