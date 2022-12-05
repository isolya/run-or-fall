
document.querySelector('div.start').addEventListener('click', () => {
    document.querySelector('.page#intro').classList.remove('active');
    document.querySelector('.page#timer').classList.add('active');
    start(3);
});

// document.querySelector('div.restart').addEventListener('click', () => {
//     document.querySelector('.page#game-over').classList.remove('active');
//     document.querySelector('.page#main').classList.add('active');
//     duckCurrent().classList.remove('cell--active');
//     start(3);
    
//     state.duckCoord = [1,6];
//     state.score = 0;
//     document.getElementById('score').innerHTML = state.score;
    
//     renderCoins();
//     mountField();
//     tick();
//     duckDirection();
// });

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

let timer;
let timer2;

const state = {
    columnNumber: 10,
    rowNumber: 10,
    cells: [],
    gameIsActive: true,
    direction: [-1, 0],
    duckCoord: [5, 8],
    finishPoint:[5,9],
    score: 0,
    coinsPoints: [
        [5, 3],
        [5, 4],
        [5, 6],
        [5, 8],
        [1, 1],
        [1, 2], 
        [1, 3],
        [1, 4],
        [1, 5],
    
    ],
    bridgePoints: copy(BRIDGE_POINTS_FOR_LEVEL_1),
    
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

const renderCoins = () => {
    state.coinsPoints.forEach(([columnIndex, rowIndex]) => {
        state.cells[rowIndex * state.columnNumber + columnIndex].isCoins = true;
        state.cells.forEach((cell) => {
            if (cell.isCoins) {
                cell.element.classList.add('is-coins');
            }
        });
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
        
    });
    state.cells.forEach((cell) => {
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

        duckDirection();
    }
    removeCoin();
}

const duckDirection = () => {
    window.addEventListener('keydown', function (event) {
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
    console.log(state.duckCoord);
    if (columnIndex === state.duckCoord[0] && rowIndex === state.duckCoord[1]) finish(); 
}

const checkGameOver = () => {
    const duckInTheBounce = state.bridgePoints.some((point) => state.duckCoord[0] === point[0] && state.duckCoord[1] === point[1]);
    if (!duckInTheBounce) gameOver();
}

const finish = () => {
    document.querySelector('.page#main').classList.remove('active');
    document.querySelector('.page#finish').classList.add('active');
    // clearTimeout(timer2);
    state.gameIsActive = false;
}

const gameOver = () => {
    document.querySelector('.page#main').classList.remove('active');
    document.querySelector('.page#game-over').classList.add('active');
    
    // clearTimeout(timer2);
    state.gameIsActive = false;
   
}

const tick = () => {
    moveDuck();
    checkFinish();
    checkGameOver();
    render();
    
    if (state.gameIsActive) setTimeout(tick, 500);
    
}

// const initListeners = () => {

// }

const startGame = () => {
    state.gameIsActive = true;
    generateField();
    generateBridge();
    generateFinish();
    renderCoins();
    mountField();
    duckDirection();

    tick();
    
}

// const main = () => {
//     initListeners();
// }

// main();

