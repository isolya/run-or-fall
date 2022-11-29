
document.querySelector('div.start').addEventListener('click', () => {
    document.querySelector('.page#intro').classList.remove('active');
    document.querySelector('.page#timer').classList.add('active');
    start(3);
});

let timer;
let duckCoord = {
    r: 0,
    c: 0

};
const coinsPoints = [
    [5, 4], [5, 6], [5, 8], [5, 9], [5, 3]
]
const state = {
    columnNumber: 10,
    rowNumber: 10,
    cells: [],

};

function start(x) {
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

function creatDiv() {
    let div = document.createElement("div");
    div.classList.add("bigblock")
    return div
}

function generateField() {
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
function renderCoins() {


    coinsPoints.forEach(([columnIndex, rowIndex]) => {
        state.cells[rowIndex * state.columnNumber + columnIndex].isCoins = true;

    })

}
function generateBridge() {
    const bridgePoints = [
        [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
        [7, 2], [7, 3],
    ]

    bridgePoints.forEach(([columnIndex, rowIndex]) => {
        state.cells[rowIndex * state.columnNumber + columnIndex].isBridge = true;

    })

}
const render = () => {

    state.cells.forEach((cell) => {

        if (cell.isBridge) {
            cell.element.classList.add('is-bridge');
        }
        if (cell.isCoins) {
            cell.element.classList.add('is-coins');
        }
        
    });
    
}
const duckMovement = () => {
    function duck() {
        return state.cells[duckCoord.r * 10 + duckCoord.c].element
    }



    duck().classList.remove('bigblock--active');




    duck().classList.add('bigblock--active');

    window.addEventListener('keydown', function (event) {
        switch (event.key) {


            case 'ArrowLeft':
                if (duckCoord !== null && duckCoord.c > 0) {

                    duck().classList.remove('bigblock--active');

                    duckCoord.c -= 1;

                    duck().classList.add('bigblock--active');
                };
                break;
            case 'ArrowUp':
                if (duckCoord !== null && duckCoord.r > 0) {
                    duck().classList.remove('bigblock--active');

                    duckCoord.r -= 1;

                    duck().classList.add('bigblock--active');
                };
                break;
            case 'ArrowRight':
                if (duckCoord !== null && duckCoord.c < 9) {
                    duck().classList.remove('bigblock--active');

                    duckCoord.c += 1;

                    duck().classList.add('bigblock--active');
                };
                break;
            case 'ArrowDown':
                if (duckCoord !== null && duckCoord.r < 9) {
                    duck().classList.remove('bigblock--active');

                    duckCoord.r += 1;

                    duck().classList.add('bigblock--active');
                };
                break;
        }
        let coinIndex = -1;
        for (let index = 0; index < coinsPoints.length; index++) {
            const coin = coinsPoints[index];
            let coinR = coin[1];
            let coinC = coin[0];
            if (duckCoord.r === coinR && duckCoord.c === coinC) {
                coinIndex = true;

            }

        }
        if (coinIndex !== -1) {
            coinsPoints.splice(coinIndex, 1);
            console.log('remove')
            duck().classList.remove('is-coins')
        }


    });
}



const tick = () => {

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
    duckMovement();
}

const main = () => {
    initListeners();
}

main();
/////////////////////////////////////////////////////////////////////
