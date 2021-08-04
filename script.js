var vez = 0;
var vencedor = false;
var velha = false;

const jogoDaVelha = new JogoDaVelha();
jogoDaVelha.init();

function JogoDaVelha() {
  const tabuleiro = new Tabuleiro();
  const jogador1 = new Jogador1(tabuleiro);
  const jogador2 = new Jogador2(tabuleiro);
  

  this.init = function() {
    const config = { childList: true }; 
    const observer = new MutationObserver(() => mudaVez());
    tabuleiro.espacos.forEach((el) => 
    observer.observe(el, config)); 
    mudaVez();
  }

  function mudaVez(){
  vencedor = false;
  velha = false;
  
    if (tabuleiro.procuraVencedor()){
      return;
    }
    if (vez % 2 == 0) {
      jogador1.mudaVez();
    } else {
      jogador2.mudaVez();
    }

    vez++;
    
    if ((vez == 10) && (vencedor == false)){
      velha = true;
      let t1 = parseInt(document.querySelector("#empata").innerText);
      const t2 = parseInt(1)
      document.querySelector("#empata").innerText = t1 + t2
      setTimeout( swal({
        title: "Ihhh, deu velha!",
        text: "Deseja começar uma nova partida?",
        buttons: true,
        dangerMode: true
      }).then((ok) => {
        if(ok){
          vez = 0;
          for(var i = 1; i <= 9; i++){
          document.getElementById('posicao' + i).innerHTML = ''; }
        }
      }), 130);
    }
  }
}

function Tabuleiro(){  
  this.espacos = Array.from(document.querySelectorAll('.col'));
  this.procuraVencedor = function(){
    const combinacoesVencedor = [
      [0, 1, 2],    
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    combinacoesVencedor.forEach((comboVencedor) => {
      const ehComboVencedor =    
      this.espacos[comboVencedor[0]].innerText !== '' &&
      this.espacos[comboVencedor[0]].innerText == this.espacos[comboVencedor[1]].innerText &&
      this.espacos[comboVencedor[1]].innerText == this.espacos[comboVencedor[2]].innerText;

      if ((ehComboVencedor) && (vencedor == false)){
        vencedor = true;
        const jogadorVencedor = this.espacos[comboVencedor[0]].innerText; 
        let g1 = parseInt(document.querySelector("#vence" + jogadorVencedor).innerText);
        const g2 = parseInt(1);
        document.querySelector("#vence" + jogadorVencedor).innerText = g1 + g2;

        setTimeout( swal({
          title: "O jogador " + jogadorVencedor + " venceu!",
          text: "Deseja começar uma nova partida?",
          buttons: true,
          dangerMode: true
        }).then((ok) => {
          if(ok){
            vez = 0;
            for(var i = 1; i <= 9; i++){
            document.getElementById('posicao' + i).innerHTML = '';}
          } 
        }), 130);
      
      }    
    });
  };
}

function Jogador1(tabuleiro) {
  this.mudaVez = function(index){
    console.log(vez)
    tabuleiro.espacos.forEach(el => el.addEventListener('click', digitaVez))
  }
  function digitaVez(event){
    if(event.target.innerText == ''){
      event.target.innerText = 'X';
      tabuleiro.espacos.forEach(el => el.removeEventListener('click', digitaVez))
      document.querySelector("#vezO").innerHTML = '<u>Jogador 2 (O)</u>'
      document.querySelector("#vezX").innerHTML = 'Jogador 1 (X)'
    }
  }
}

function Jogador2(tabuleiro) {
  this.mudaVez = function(){
    console.log(vez)
    tabuleiro.espacos.forEach(el => el.addEventListener('click', digitaVez2))
  }
  function digitaVez2(event){
    if(event.target.innerText == ''){
      event.target.innerText = 'O';
      tabuleiro.espacos.forEach(el => el.removeEventListener('click', digitaVez2))
      document.querySelector("#vezO").innerHTML = 'Jogador 2 (O)'
      document.querySelector("#vezX").innerHTML = '<u>Jogador 1 (X)</u>'
    }
  }
}