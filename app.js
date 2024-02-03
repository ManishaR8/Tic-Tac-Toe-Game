let boxes = document.querySelectorAll('.box');
let main = document.querySelector('main');
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerY

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

let count = 0;

const resetGame = () =>{
    count = 0;
    main.classList.remove("hide");
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener('click', ()=>{
 
        box.classList.remove("neonColor-blue", "neonColor-red");
 
        if(turnO) {
            box.classList.add("neonColor-blue");
            box.innerText = "0";
            count++;
            turnO = false;
            
        }else{
            box.classList.add("neonColor-red");
            box.innerText = "X";

            count++;
          
            turnO = true;
        }

        box.disabled = true;
        console.log("count: ", count)

        gameDraw(count);
        
        checkWinner();
        
        
    })
})

const gameDraw = (count) =>{
    if(count === 9){
        main.classList.add("hide");
        msg.innerText = "Game is Draw , Start again";
        
        msgContainer.classList.remove("hide");

        disableBoxes();   
    }
    
}

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    main.classList.add("hide");
    msg.innerText = `Congratulations, Winner is ${winner}`
    msgContainer.classList.remove("hide");
    disableBoxes();

}


const checkWinner = () =>{
    for(let pattern of winPatterns){
        
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        
        }
    }
}

console.log(count)

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);