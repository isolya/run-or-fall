
document.querySelector('div.start').addEventListener('click', () => {
    document.querySelector('.page#intro').classList.remove('active');
    document.querySelector('.page#timer').classList.add('active');
    start(3);
} );

let timer;

const state = {
    columnNumber: 10,
    rowNumber: 10,
    cells: [],

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

function creatDiv(){
    let div = document.createElement("div");
    div.classList.add("bigblock")
    return div
}

function generateField(){
    for (let rowIndex = 0; rowIndex < state.rowNumber; rowIndex += 1) {
        for (let columnIndex = 0; columnIndex < state.columnNumber; columnIndex += 1) {

            let div = creatDiv()
            const cell = {
                element: div,
                rowIndex, columnIndex,
                isBridge: false,
                isCoins:false,
                isDuckling:false,
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
function generateCoins(){
    const coinsPoints = [
        [5, 4], [5, 6], [5, 8], [5,9], [5,3]
    ]

    coinsPoints.forEach(([columnIndex, rowIndex]) => {
        state.cells[rowIndex * state.columnNumber + columnIndex].isCoins = true;
       
    })
    
}
function generateBridge(){
    const bridgePoints = [
        [2,1], [3, 1], [4, 1], [5,1], [6,1], [7,1], [1,1],[1,2], [1,3], [1,4], [1,5], [1,6],
        [7,2],[7,3],
    ]

    bridgePoints.forEach(([columnIndex, rowIndex]) => {
        state.cells[rowIndex * state.columnNumber + columnIndex].isBridge = true;
       
    })
    
}
function generateDuckling(){
    const ducklingPoints = [
        [1, 6],
    ]

    ducklingPoints.forEach(([columnIndex, rowIndex]) => {
        state.cells[rowIndex * state.columnNumber + columnIndex].isDuckling = true;
       
    })
    
}
const render = () => {
    
    state.cells.forEach((cell) => {
      if  (cell.isDuckling ){
        cell.element.classList.add('is-duckling');
      }
      if  (cell.isBridge ){
        cell.element.classList.add('is-bridge');
      }
      if  (cell.isCoins ){
        cell.element.classList.add('is-coins');
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
    generateDuckling();
    generateBridge();
    generateCoins();
    mountField();
    tick();
}

const main = () => {
    initListeners();
}

main();
//https://ru.stackoverflow.com/questions/641090/%D0%9F%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BF%D0%BE-div%D0%B0%D0%BC-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-%D0%BA%D0%BD%D0%BE%D0%BF%D0%BE%D0%BA-%D0%BD%D0%B0-javascript