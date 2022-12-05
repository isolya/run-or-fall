
document.querySelector('div.start').addEventListener('click', () => {
    document.querySelector('.page#intro').classList.remove('active');
    document.querySelector('.page#timer').classList.add('active');
    start(3);
});

    document.querySelector('div.restart').addEventListener('click', () => {
        document.querySelector('.page#game-over').classList.remove('active');
        document.querySelector('.page#main').classList.add('active');
        duckCurrent().classList.remove('cell--active');
        state.coinsPoints = copy(COINS_POINTS_FOR_LEVEL_1);
        state.direction = [-1, 0];
        state.duckCoord = [1, 6];
        state.score = 0;
       startGame();
 
    });
    document.querySelector('div.nextLevel').addEventListener('click', () => {
        document.querySelector('.page#finish').classList.remove('active');
        document.querySelector('.page#main').classList.add('active');
        duckCurrent().classList.remove('cell--active');
        state.bridgePoints = 0;
        state.coinsPoints = copy(COINS_POINTS_FOR_LEVEL_2);
        state.bridgePoints = copy(BRIDGE_POINTS_FOR_LEVEL_2);
        state.direction = [-1, 0];
        state.duckCoord = copy(DUCK_COORD_LEVEL_2);
        state.speed = copy(SPEED_LEVEL_2);
        state.score = 0;

       startGame();

    });
const copy = (o) => JSON.parse(JSON.stringify(o));

const BRIDGE_POINTS_FOR_LEVEL_1 = [
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
    [7, 1],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [1, 8],
    [7, 2],
    [7, 3],
    [6, 3],
    [5, 3],
    [5, 4],
    [5, 5],
    [5, 6],
    [5, 7],
    [5, 8],
    [5, 9]
];
const COINS_POINTS_FOR_LEVEL_1 = [
    [5, 3],
    [5, 4],
    [5, 6],
    [5, 8],
    [1, 1],
    [1, 2], 
    [1, 3],
    [1, 4],
    [1, 5],

];
const COINS_POINTS_FOR_LEVEL_2 = [
    [7, 3],
    [7, 2],
    [5, 5],
    [4, 5],
    [3, 3],
    [2, 2], 
    [1, 3],
    [7, 4],
    [1, 5],
    [7, 7],
    [7, 8]

];
const BRIDGE_POINTS_FOR_LEVEL_2 = [
    [1, 8],
    [1, 7],
    [1, 6],
    [1, 5],
    [1, 4],
    [1, 3],
    [1, 2],
    [2, 2],
    [3, 3],
    [3, 2],
    [3, 4],
    [3, 5],
    [4, 5],
    [5, 5],
    [5, 4],
    [5, 3],
    [5, 2],
    [6, 2],
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
    [7, 6],
    [7, 7],
    [7, 8],
    [8, 8]
];
const FINISH_POINT_LEVEL_2 = [9, 8];
const DUCK_COORD_LEVEL_2 = [1, 8] ;
let timer;
let timer2;
const SPEED_LEVEL_1 = 1000;
const SPEED_LEVEL_2 = 500;
const SPEED_LEVEL_3 =300;
const state = {
    columnNumber: 10,
    rowNumber: 10,
    cells: [],
    gameIsActive: true,
    direction: [-1, 0],
    duckCoord: [1, 7],
    finishPoint:[5, 9],
    score: 0,
    bridgePoints: copy(BRIDGE_POINTS_FOR_LEVEL_1),
    coinsPoints: copy(COINS_POINTS_FOR_LEVEL_1),
    speed: copy(SPEED_LEVEL_1),
};

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
                rowIndex, columnIndex,
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
    let grid = document.getElementById("main")
    state.cells.forEach((cell) => {
        grid.appendChild(cell.element);
    });
}

const generateCoins = () => {
    state.coinsPoints.forEach(([columnIndex, rowIndex]) => {
    const  coinsCell = state.cells[rowIndex * state.columnNumber + columnIndex];
    coinsCell.isCoins = true; 
    coinsCell.element.classList.add('is-coins');
    })
}
const generateBridge = () => {
    state.bridgePoints.forEach(([columnIndex, rowIndex]) => {
    state.cells[rowIndex * state.columnNumber + columnIndex].isBridge = true;
    })
}

const generateFinish = () => {
    const [columnIndex,rowIndex] = state.finishPoint;
    state.cells[rowIndex * state.columnNumber + columnIndex].isFinish = true;

}

const render = () => {
    state.cells.forEach((cell) => {
        if (cell.isBridge) {
            cell.element.classList.add('is-bridge');
        }
        if (cell.isFinish) {
            cell.element.classList.add('is-finish');
            cell.element.innerHTML = 'Finish!';
        }
    });
}

function duckCurrent() {
    return state.cells[state.duckCoord[1] * 10 + state.duckCoord[0]].element
}

const moveDuck = () => {
    if (state.duckCoord[0] >= 0 && state.duckCoord[0] <= 9 && state.duckCoord[1] > 0 && state.duckCoord[1] <= 9) {
        duckCurrent().classList.remove('cell--active');
        state.duckCoord[1] += state.direction[0]
        state.duckCoord[0] += state.direction[1]
        duckCurrent().classList.add('cell--active');
       
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

}

const removeCoin = () => {
    for (let i = 0; i < state.coinsPoints.length; i++) {
        const [coinC, coinR] = state.coinsPoints[i];
        if (state.duckCoord[0] === coinC && state.duckCoord[1] === coinR) {
            duckCurrent().classList.remove('is-coins');
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
    state.gameIsActive = true;
    generateField();
    generateBridge();
    generateFinish();
    generateCoins();
    mountField();
    initListeners();
   
    tick();
    
}
// const main = () => {
//     initListeners();
// }
// main();