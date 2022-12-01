
document.querySelector('div.start').addEventListener('click', () => {
    document.querySelector('.page#intro').classList.remove('active');
    document.querySelector('.page#timer').classList.add('active');
    start(3);
});

let timer;
let score = 0;
const coinsPoints = [
    [5, 3],
    [5, 4],
    [5, 6],
    [5, 8],
    [5, 9],
    // [1, 1],
    // [1, 2],
    // [1, 3],
    // [1, 4],
    // [1, 5],

]
const bridgePoints = [
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
]

const state = {
    columnNumber: 10,
    rowNumber: 10,
    cells: [],
    direction: [-1, 0],
    duckCoord: {
        c: 1,
        r: 4

    }
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
    coinsPoints.forEach(([columnIndex, rowIndex]) => {
        state.cells[rowIndex * state.columnNumber + columnIndex].isCoins = true;
        state.cells.forEach((cell) => {
            if (cell.isCoins) {
                cell.element.classList.add('is-coins');
            }
        });
    })
}

const generateBridge = () => {

    bridgePoints.forEach(([columnIndex, rowIndex]) => {
        state.cells[rowIndex * state.columnNumber + columnIndex].isBridge = true;
    })
}

const render = () => {
    state.cells.forEach((cell) => {
        if (cell.isBridge) {
            cell.element.classList.add('is-bridge');
        }
    });
}

function duckCurrent() {
    return state.cells[state.duckCoord.r * 10 + state.duckCoord.c].element
}

const moveDuck = () => {
    if (state.duckCoord.c >= 0 && state.duckCoord.c <= 9 && state.duckCoord.r >= 0 && state.duckCoord.r <= 9) {
        duckCurrent().classList.remove('cell--active');
        state.duckCoord.r += state.direction[0]
        state.duckCoord.c += state.direction[1]
        // console.log(duckCurrent(), state.duckCoord);
        duckCurrent().classList.add('cell--active');
        duckDirection();
    }
    removeCoin();
    gameOver()
}


const duckDirection = () => {
    window.addEventListener('keydown', function (event) {
        if (event.key == 'ArrowLeft') {
            state.direction = [0, -1]
        } else if (event.key == 'ArrowUp') {
            state.direction = [-1, 0]
        }
        else if ( event.key == 'ArrowRight') {
            state.direction = [0, 1]
        }
        else if ( event.key == 'ArrowDown') {
            state.direction = [1, 0]
        }
    });

}

const removeCoin = () => {
    for (let i = 0 ; i < coinsPoints.length; i++) {
        const [coinC, coinR] = coinsPoints[i];
        if (state.duckCoord.c === coinC && state.duckCoord.r === coinR) {
            duckCurrent().classList.remove('is-coins');
            coinsPoints.splice(i, 1);
            score += 1;
            document.getElementById('score').innerHTML = score; 
        } 
       
    }
}
 const gameOver = () => {
    for (let b = 0 ; b < bridgePoints.length; b++) {
        const [bridgeC, bridgeR] = bridgePoints[b];
            if(state.duckCoord.c === bridgeC && state.duckCoord.r === bridgeR){
            console.log('f')
        // document.querySelector('.page#main').classList.remove('active');
        // document.querySelector('.page#game-over').classList.add('active');
    }
}}
const tick = () => {
    
    moveDuck();
    render();
    
     setTimeout(tick, 1000);
}

const initListeners = () => {

}

const startGame = () => {

    generateField();
    generateBridge();
    renderCoins();
    mountField();
    tick();
    duckDirection();
}

const main = () => {
    initListeners();
}

main();

