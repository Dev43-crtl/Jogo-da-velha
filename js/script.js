let board = document.getElementById('board')
let colunas = document.getElementsByClassName('col')
let linhas = document.getElementsByClassName('row')
let btn = document.getElementById('btn')
let reset = document.getElementById('btn-reset')
let scoreX = document.getElementById('scoreX')
let scoreO = document.getElementById('scoreO')

let player1 = 'X'
let player2 = 'O'
let nextTurn = false
let isGameOver = false
let XScore = 0
let OScore = 0

let ROW = 3
let COL = 3

onPlayerMove = function (){
  let text = document.getElementById('player')
  text.innerHTML = player1
  text.style.textTransform = 'uppercase'
};

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


createBoard()
collClick()

function createBoard() {

    for(let row = 0; row < ROW; row++){
        let div_row = document.createElement('div');
        div_row.classList.add('row');
        board.appendChild(div_row)
        for(let col = 0; col < COL; col++){
            let div_col = document.createElement('div');
            div_col.classList.add('col', 'empty')
            div_col.setAttribute('data-col', col)
            div_row.appendChild(div_col)
        }
    }
}

function collClick(){

    for( let cols = 0; cols < colunas.length; cols++){
        let col = colunas[cols]
       
         col.addEventListener('click', function(){
            if(col.classList.contains('empty')){
                col.classList.add(`${player1}`)
                col.classList.remove('empty') 
                if(col.classList.contains(`${player1}`)){
                    col.innerHTML = `${player1}`
                }

                
                if(checkWinner(player1)){
                  isGameOver = true
                  alert(`Game is over ${player1} wins`)
                  col.classList.remove('empty')
                  btn.style.display = "inline-block"
                  if(player1 === 'X'){
                    XScore++
                    scoreX.innerHTML = XScore
                  }else{
                    OScore++
                    scoreO.innerHTML = OScore
                  }
                  return
                    
                }else if(isDraw()){
                  isGameOver = true
                  alert(`Is a Draw`)
                  col.classList.remove('empty')
                  btn.style.display = "inline-block"
                  return
                    
                }
                nextPlayer()

            }
        })
       
    }

}


function nextPlayer() {
   player1 = (player1 === 'X') ? 'O' : 'X'
   onPlayerMove();
}


function checkWinner(player1){
  const cellElements = document.querySelectorAll('[data-col]')
  return winningConditions.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(`${player1}`)
    })
  })

}

function isDraw(){
  const cellElements = document.querySelectorAll('[data-col]')
  return [...cellElements].every(cell => {
    return cell.classList.contains('X') || cell.classList.contains('O')
  })
}


btn.addEventListener('click', () => {
  for( let cols = 0; cols < colunas.length; cols++){
    let col = colunas[cols]
    col.classList.remove(`X`)
    col.classList.remove(`O`)
    col.classList.add('empty') 
    col.innerHTML = ''
  }
})

btn-reset.addEventListener('click', () => {
  document.location.reload(isGameOver)
})
