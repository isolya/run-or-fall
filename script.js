
document.querySelector('div.start').addEventListener('click', () => {
    document.querySelector('.page#intro').classList.remove('active');
    document.querySelector('.page#timer').classList.add('active');
    start(3);
} );

let timer;

function start(x){
    document.getElementById('time').innerHTML=x;
    if (x<=0){
        clearTimeout(timer);
        document.getElementById('time').innerHTML="Поехали!";
        document.querySelector('.page#timer').classList.remove('active');
        document.querySelector('.page#main').classList.add('active');
        
        generateField();
    }
    else{
        timer=setTimeout(start,1000, x - 1);
    }
}

function placeDiv(x1, y1, x2, y2){
    let div = document.createElement("div")
    let style = div.style
    style.gridColumnStart = x1;
    style.gridColumnEnd = x2;
    style.gridRowStart = y1;
    style.gridRowEnd = y2;
    div.classList.add("bigblock")
    return div
}

function generateField(){
    let columns = 10;
    let rows = 10;
    let grid = document.getElementById("main")
    for( i = 1; i < 10; i++){
       let div = placeDiv(i, i, i+2, i)
       grid.appendChild(div)
    }
}
