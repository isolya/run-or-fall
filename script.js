
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

function generateField(){
    let columns = 10;
    let rows = 10;
    
    for( i = 0; i < 100; i++){
       var row = document.createElement('div');
       
       document.getElementById("main").appendChild(row);
      
       row.classList.add("elem"); 
        
        
    }
}
