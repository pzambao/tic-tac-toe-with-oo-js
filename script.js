// variáveis globais essenciais para o sistema de encerramento de partida
var vez = 0;
var vencedor = false;
var velha = false;

//Inicia a função JogoDaVelha
const jogoDaVelha = new JogoDaVelha();
jogoDaVelha.init();

function JogoDaVelha() {
  //declaração dos atributos(caracteristica)
  const jogadores = new Jogadores();
  const tabuleiro = new Tabuleiro();
  const jogador1 = new Jogador1(tabuleiro);
  const jogador2 = new Jogador2(tabuleiro);
  
  this.init = function() {
    const config = { childList: true }; // armazena em config qual o tipo de monitoramento do mutation observer
    const observer = new MutationObserver(() => mudaVez()); // chama em observer o objeto Mutation Observer e passa a parte do DOM que será observada
    tabuleiro.espacos.forEach((el) => // mapeia todas as divs com a classe ".col" 
    observer.observe(el, config)); // define el como "responsável" pelo monitoramento e avisa qual tipo de monitoramento.
    mudaVez();
    // chama a função mudaVez
  };
  
  //declaração do método(ação)
  function mudaVez(){
  vencedor = false;
  velha = false;

    if (tabuleiro.procuraVencedor()){ // sempre que mudar a vez ele chama o procuraVencedor
      return;
    }
    if (vez % 2 == 0) { // se a vez dividir por dois e o resto for 0 (par)
      jogador1.mudaVez();      
    } else { // caso contrário (impar)
      jogador2.mudaVez();
    }
    
    if ((vez == 9) && (vencedor == false)){ // se a vez for 9 e não houver um vencedor, significa que deu velha
      velha = true;
      document.querySelector("#empata").innerText++; // lógica que acrescenta +1 ao placa da velha
      swal({ // alternativa ao alert através da lib "SweetAlert"
        title: "Ihhh, deu velha!",
        text: "Deseja começar uma nova partida?",
        buttons: true,
        dangerMode: true
      }).then((ok) => { 
        if(ok){ 
          resetaTabuleiro(); 
        }
      });
    }
    vez++; // adiciona +1 a vez para que o jogo possa continuar
  }
}

function Jogadores(){ // função que recebe o nome dos jogadores
  this.jogX = '';
  this.jogO = '';
  swal("Digite o nome do Jogador 1 (X):", {
    content: "input",
  })
  .then((value) => {
    jogX = value;
    if(value == '' || value == null ){ // caso não receba valor será definido como padrão "Jogador1 (X)"
      document.querySelector("#vezX").innerHTML = document.querySelector("#vezX").innerHTML;
    }else{
      document.querySelector("#vezX").innerHTML = jogX + " (X)";
    }
    swal("Digite o nome do Jogador 2 (O):", {
      content: "input",
    })
    .then((value) => {
      jogO = value;
      if(value == '' || value == null ){ // caso não receba valor será definido como padrão "Jogador2 (O)"
        document.querySelector("#vezO").innerHTML = document.querySelector("#vezO").innerHTML;
      }else{
        document.querySelector("#vezO").innerHTML = jogO + " (O)";
      }
    });
  });
}

function Tabuleiro(){  
  this.espacos = Array.from(document.querySelectorAll('.col')); // seleciona todas as classes ".col"
  this.procuraVencedor = function(){ // armazena todas as combinações vencedoras
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

    combinacoesVencedor.forEach((comboVencedor) => { // percorre todas as posições jogadas buscando se há um combo de posições vencedor.
      const ehComboVencedor =   
      this.espacos[comboVencedor[0]].innerText !== '' &&
      this.espacos[comboVencedor[0]].innerText == this.espacos[comboVencedor[1]].innerText &&
      this.espacos[comboVencedor[1]].innerText == this.espacos[comboVencedor[2]].innerText;

      if ((ehComboVencedor) && (vencedor == false)){ // verifica se há o combo vencedor e confirma que a var vencedor está definida como false
        vencedor = true; // define vencedor como true
        const jogadorVencedor = this.espacos[comboVencedor[0]].innerText; //armazena 1º valor encontrado no combo vencedor para identificar o vencedor
        document.querySelector("#vence" + jogadorVencedor).innerText++; // lógica para funcionar o placar

        swal({ // alternativa para o alert através da lib "SweetAlert"
          title: document.querySelector("#vez" + jogadorVencedor).innerText + " venceu!",
          text: "Deseja começar uma nova partida?",
          buttons: true,
          dangerMode: true
        }).then((ok) => { 
          if(ok){ // ao selecionar para começar uma nova partida
            resetaTabuleiro();// a vez irá ser setada como 0 novamente
          } 
        });
      }    
    });
  };
}

function Jogador1(tabuleiro) {
  
  this.mudaVez = function(){ 
    // console.log(vez)
    // através do monitoramento do mutationObserver, ele detecta a div que foi clicada e chama a função digitaVez
    // ao ocorrer um MouseEvent(click) em algum dos espaços do 'el', ele chama a função digitaVez dentro do espaço clicado
    tabuleiro.espacos.forEach(el => el.addEventListener('click', digitaVez));
  };
  function digitaVez(event){ // função que insere a jogada na div em questão
    if(event.target.innerText == ''){ // verifica se já não existe valor dentro da div
      event.target.innerText = 'X'; // insere através do innerText o X na posição que disparou o evento através do target
      tabuleiro.espacos.forEach(el => el.removeEventListener('click', digitaVez)); // remove a possibilidade do jogador X clicar novamente 
      document.querySelector(".o").style.color = "white";  // sublinha o jogador O indicando que próximo jogador é ele
      document.querySelector(".x").style.color = "#ffffffa8"; // remove o sublinhado de sua vez
    }
  }
}

function Jogador2(tabuleiro) {
  this.mudaVez = function(){
    // console.log(vez)
    // através do monitoramento do mutationObserver, ele detecta a div que foi clicada e chama a função digitaVez
    tabuleiro.espacos.forEach(el => el.addEventListener('click', digitaVez2));
  };
  function digitaVez2(event){ // função que insere a jogada na div em questão
    if(event.target.innerText == ''){ // verifica se já não existe valor dentro da div
      event.target.innerText = 'O'; // insere através do innerText o X na posição
      tabuleiro.espacos.forEach(el => el.removeEventListener('click', digitaVez2)); // remove a possibilidade do jogador O clicar novamente 
      document.querySelector(".o").style.color = "#ffffffa8";  // sublinha o jogador O indicando que próximo jogador é ele
      document.querySelector(".x").style.color = "white"; // remove o sublinhado de sua vez
    }
  }
}
