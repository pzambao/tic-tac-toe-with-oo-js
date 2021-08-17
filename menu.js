function abrirMenu(){
  document.getElementById("idmenu").style.width = "250px";
}

function fecharMenu(){
  document.getElementById("idmenu").style.width = "0";
}

function alteraJogadores(){ // função que recebe o nome dos jogadores
  this.jogX = '';
  this.jogO = '';
  swal("Digite o nome do Jogador 1 (X):", {
    content: "input",
  })
  .then((value) => {
    jogX = value;
    if(value == '' || value == null ){ // caso não receba valor, não haverá modificações no nome do jogador
      document.querySelector("#vezX").innerHTML = document.querySelector("#vezX").innerHTML;
    }else{
      document.querySelector("#vezX").innerHTML = "<u>"+ jogX + " (X)</u>";
    }
    swal("Digite o nome do Jogador 2 (O):", {
      content: "input",
    })
    .then((value) => {
      jogO = value;
      if(value == '' || value == null ){ // caso não receba valor, não haverá modificações no nome do jogador
        document.querySelector("#vezO").innerHTML = document.querySelector("#vezO").innerHTML;
      }else{
        document.querySelector("#vezO").innerHTML = "<u>"+ jogO + " (O)</u>";
      }
    });
  });
}

function resetaTabuleiro(){
  swal({ // alternativa ao alert através da lib "SweetAlert"
    title: "Tem certeza?",
    text: "Esta ação irá resetar todos os espaços do tabuleiro!",
    buttons: true,
    dangerMode: true
  }).then((ok) => { 
    if(ok){ // caso selecione começar uma nova partida
      vez = 0; // define a vez como 0
      for(var i = 1; i <= 9; i++){ // um for percorrerá todos os espaços do tabuleiro
        // reseta o conteudo das posições percorridas através do ID (X e O no caso)
        document.getElementById('posicao' + i).innerHTML = ''; 
      }
    }
  })
}

function resetaPlacar(){
  swal({ // alternativa ao alert através da lib "SweetAlert"
    title: "Tem certeza?",
    text: "Esta ação irá zerar os pontos dos participantes e da velha!",
    buttons: true,
    dangerMode: true
  }).then((ok) => { 
    if(ok){ 
      document.querySelector("#empata").innerText = 0;
      document.querySelector("#venceX").innerText = 0;
      document.querySelector("#venceO").innerText = 0;
    }
  })
}

function resetaJogo(){
  swal({ // alternativa ao alert através da lib "SweetAlert"
    title: "Tem certeza?",
    text: "Esta ação irá resetar todas jogadas e as pontuações dos jogadores!",
    buttons: true,
    dangerMode: true
  }).then((ok) => { 
    if(ok){ 
      document.querySelector("#empata").innerText = 0;
      document.querySelector("#venceX").innerText = 0;
      document.querySelector("#venceO").innerText = 0;
      vez = 0; // define a vez como 0
      for(var i = 1; i <= 9; i++){ // um for percorrerá todos os espaços do tabuleiro
        // reseta o conteudo das posições percorridas através do ID (X e O no caso)
        document.getElementById('posicao' + i).innerHTML = ''; 
      }
    }
  })
}