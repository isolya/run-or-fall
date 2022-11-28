
document.querySelector('div.start').addEventListener('click', () => {
    document.querySelector('.page#intro').classList.remove('active');
    document.querySelector('.page#timer').classList.add('active');
    start(3);
} );

let timer;

const state = {
    columnNumber: 10,
    rowNumber: 10,
    cells: []
};

function start(x){
    document.getElementById('time').innerHTML=x;
    if (x<=0){
        clearTimeout(timer);
        document.getElementById('time').innerHTML="Поехали!";
        document.querySelector('.page#timer').classList.remove('active');
        document.querySelector('.page#main').classList.add('active');
        
        startGame();
    }
    else{
        timer=setTimeout(start,1000, x - 1);
    }
}

function placeDiv(){
    let div = document.createElement("div")

    div.classList.add("bigblock")
    return div
}

function generateField(){
    for (let rowIndex = 0; rowIndex < state.rowNumber; rowIndex += 1) {
        for (let columnIndex = 0; columnIndex < state.columnNumber; columnIndex += 1) {

            let div = placeDiv()
            const cell = {
                element: div,
                rowIndex, columnIndex,
                isBridge: false,
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

function generateBridge(){
    const bridgePoints = [
        [3, 3], [3, 4], [3, 5],
    ]

    bridgePoints.forEach(([columnIndex, rowIndex]) => {
        state.cells[rowIndex * state.columnNumber + columnIndex].isBridge = true;
        state.cells[rowIndex * state.columnNumber + columnIndex].element.classList.add('is-bridge'); // @TODO: JUST FOR DEV
    })
    
}

const render = () => {
    // ....
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
    mountField();
    tick();
}

const main = () => {
    initListeners();
}

main();