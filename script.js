
document.querySelector('div.start').addEventListener('click', () => {
    document.querySelector('.page#intro').classList.remove('active');
    document.querySelector('.page#timer').classList.add('active');
    start(3);
});

let timer;

const coinsPoints = [
    [5, 4], [5, 6], [5, 8], [5, 9], [5, 3]
]
const state = {
    columnNumber: 10,
    rowNumber: 10,
    cells: [],
     direction:[0, 1],
     duckCoord :{
        c: 5,
        r: 5
    
    }

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
        [7, 2], [7, 3],[6,3],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9]
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

const moveDuck = () => {

    function duck() {
        return state.cells[state.duckCoord.r * 10 + state.duckCoord.c].element
    }
    duck().classList.remove('bigblock--active');
    duck().classList.add('bigblock--active');

    state.duckCoord.r += state.direction[0]
    state.duckCoord.c += state.direction[1]

    duck().classList.remove('bigblock--active');
    duck().classList.add('bigblock--active');
}
const duckMovement = () => {
    function duck() {
        return state.cells[state.duckCoord.r * 10 + state.duckCoord.c].element
    }
    duck().classList.remove('bigblock--active');
    duck().classList.add('bigblock--active');

    window.addEventListener('keydown', function (event) {
        switch (event.key) {


            case 'ArrowLeft':
                if (state.duckCoord.c > 0) {

                    duck().classList.remove('bigblock--active');

                    state.direction = [0, -1]

                    duck().classList.add('bigblock--active');
                };
                break;
            case 'ArrowUp':
                if (state.duckCoord.r > 0) {
                    duck().classList.remove('bigblock--active');

                    state.direction = [-1, 0]

                    duck().classList.add('bigblock--active');
                };
                break;
            case 'ArrowRight':
                if (state.duckCoord.c < 9) {
                    duck().classList.remove('bigblock--active');

                    state.direction = [0, 1]


                    duck().classList.add('bigblock--active');
                };
                break;
            case 'ArrowDown':
                if ( state.duckCoord.r < 9) {
                    console.log(duck());
                    duck().classList.remove('bigblock--active');

                    // state.duckCoord.r += 1;

                    state.direction = [1, 0]

                    duck().classList.add('bigblock--active');
                };
                break;
        }
        let coinIndex = -1;
        for (let index = 0; index < coinsPoints.length; index++) {
            const coin = coinsPoints[index];
            let coinR = coin[1];
            let coinC = coin[0];
            if (state.duckCoord.r === coinR && state.duckCoord.c === coinC) {
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
function go(){
    function duck() {
        return state.cells[state.duckCoord.r * 10 + state.duckCoord.c].element
    }
    duck().classList.remove('bigblock--active');
    duck().classList.add('bigblock--active');
    if (state.duckCoord.r > 0) {
        duck().classList.remove('bigblock--active');

        // state.duckCoord.r -= 1;

        duck().classList.add('bigblock--active');
    };
}

const tick = () => {
    console.log('tick')
   moveDuck();
    render();
   go();
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

