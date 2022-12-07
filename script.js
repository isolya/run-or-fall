import { LEVELS_INFO } from './script2.js';

window.addEventListener('load', () => {    
    initListeners();

})
const firstStart = () => {
    document.querySelector('.page#intro').classList.remove('active');
    document.querySelector('.page#timer').classList.add('active');
    setupLevel(state, 1);
    generateField();
    mountField();
    start(3);
    console.log(state.currentLevel)
}


const restart =  () => {
    document.querySelector('.page#game-over').classList.remove('active');
    document.querySelector('.page#main').classList.add('active');
    getCurrentCell().element.classList.remove('cell--active');
   
    state.direction = [-1, 0];
    setupLevel(state, state.currentLevel);
    state.score = 0;
    
   startGame();
}
   
    
 const nextLevel = () => {
    document.querySelector('.page#finish').classList.remove('active');
    document.querySelector('.page#main').classList.add('active');
    getCurrentCell().element.classList.remove('cell--active');
    state.direction = [-1, 0];
    setupLevel(state, state.currentLevel + 1);
   startGame();
    }
   
    
const copy = (o) => JSON.parse(JSON.stringify(o));
let timer;
const state = {
    columnNumber: 10,
    rowNumber: 10,
    cells: [],
    gameIsActive: true,
    direction: [-1, 0],
    score: 0,
    
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
        document.querySelector('.page#timer').classList.remove('active');
        document.querySelector('.page#main').classList.add('active');

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
    
    state.coinsPoints.forEach(([columnIndex, rowIndex]) => {
        state.cells[rowIndex * state.columnNumber + columnIndex].isCoins = true;
        
    })
    state.bridgePoints.forEach(([columnIndex, rowIndex]) => {
        state.cells[rowIndex * state.columnNumber + columnIndex].isBridge = true;
    })
    const [columnIndex,rowIndex] = state.finishPoint;
    state.cells[rowIndex * state.columnNumber + columnIndex].isFinish = true;
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
        if (event.key == 'ArrowLeft') {
            state.direction = [0, -1]
        } else if (event.key == 'ArrowUp') {
            state.direction = [-1, 0]
        }
        else if (event.key == 'ArrowRight') {
            state.direction = [0, 1]
        }
        else if (event.key == 'ArrowDown') {
            state.direction = [1, 0]
        }
        
    });
    document.querySelector('div.nextLevel').addEventListener('click', () => {
        nextLevel();
    });
    document.querySelector('div.restart').addEventListener('click', () => {
        restart(); 
 
    });
    document.querySelector('div.start').addEventListener('click', () => {
   firstStart();
    });
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
    document.querySelector('.page#main').classList.remove('active');
    document.querySelector('.page#finish').classList.add('active');

    state.gameIsActive = false;
}

const checkGameOver = () => {
    const duckInTheBounce = state.bridgePoints.some((point) => state.duckCoord[0] === point[0] && state.duckCoord[1] === point[1]);
    if (!duckInTheBounce) gameOver();
}

const gameOver = () => {
    document.querySelector('.page#main').classList.remove('active');
    document.querySelector('.page#game-over').classList.add('active');
    
    state.gameIsActive = false;
   
}

const tick = () => {
    moveDuck();
    checkFinish();
    checkGameOver();
    render();
    
    if (state.gameIsActive) setTimeout(tick, state.speed);
    
}

const startGame = () => {
    reloadField();
    generateEntity ();

    state.gameIsActive = true;
    tick();
    
}