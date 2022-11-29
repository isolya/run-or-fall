
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
const render = () => {
    
    state.cells.forEach((cell) => {
     
      if  (cell.isBridge ){
        cell.element.classList.add('is-bridge');
      }
      if  (cell.isCoins ){
        cell.element.classList.add('is-coins');
      }
      
    });
   
        let c = document.querySelectorAll('.bigblock');
         let c_active = null;
        
        window.addEventListener('keydown', function(event) {
          if (event.key == "Enter") {
        
            if (c_active !== null) {
              c[c_active].classList.remove('bigblock--active,');
            };
        
            c_active = 0;
        
            c[c_active].classList.add('bigblock--active');
        
          } else if (event.key == "ArrowLeft") {
        
            if (c_active !== null && c_active %10>0) {
              
                c[c_active].classList.remove('bigblock--active');
        
                c_active = c_active - 1;
        
              c[c_active].classList.add('bigblock--active');
            };
        
          } else if (event.key == "ArrowUp") {
        
            if (c_active !== null && c_active >9 ) {
                c[c_active].classList.remove('bigblock--active');
        
                c_active = c_active - 10;
        
              c[c_active].classList.add('bigblock--active');
            };
        
          } else if (event.key == "ArrowRight") {
        
            if (c_active !== null && c_active %10<9) {
                c[c_active].classList.remove('bigblock--active');
        
                c_active = c_active + 1;
        
              c[c_active].classList.add('bigblock--active');
            };
        
          } else if (event.key == "ArrowDown") {
        
            if (c_active !== null && c_active <90) {
                c[c_active].classList.remove('bigblock--active');
        
              c_active = c_active + 10;
        
              c[c_active].classList.add('bigblock--active');
            };
        
          }
        });
       
        // if(c_active==this.document.getElementsByClassName('bigblock is-bridge bigblock--active')){
        //     c[c_active].classList.remove('bigblock is-bridge bigblock--active ');
        //     c[c_active].classList.add('bigblock--active');
        //   }
        
            
          
        
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
    generateCoins();
    mountField();
    tick();
}

const main = () => {
    initListeners();
}

main();
/////////////////////////////////////////////////////////////////////
