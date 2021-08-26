function abrirMenu(){
  document.querySelector("#idmenu").style.width = "250px";
}

function fecharMenu(){
  document.querySelector("#idmenu").style.width = "0";
}

function resetaTabuleiro(){
  vez = 0; // define a vez como 0
  for(var i = 1; i <= 9; i++){ // um for percorrerá todos os espaços do tabuleiro
    // reseta o conteudo das posições percorridas através do ID (X e O no caso)
    document.querySelector("#posicao" + i).innerHTML = ''; 
  }
}

function resetaPontuacao(){
  document.querySelector("#empata").innerText = 0;
  document.querySelector("#venceX").innerText = 0;
  document.querySelector("#venceO").innerText = 0;
}

function jogadores(){ // função que recebe o nome dos jogadores
  let jogX = '';
  let jogO = '';
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