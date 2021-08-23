function resetaJogadas(){
  swal({ // alternativa ao alert através da lib "SweetAlert"
    title: "Tem certeza?",
    text: "Esta ação irá resetar todos os espaços do tabuleiro!",
    buttons: true,
    dangerMode: true
  }).then((ok) => { 
    if(ok){ // caso selecione começar uma nova partida
      resetaTabuleiro();
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
      resetaPontuacao();
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
      resetaPontuacao();
      resetaTabuleiro();
    }
  })
}
