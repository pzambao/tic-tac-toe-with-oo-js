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
