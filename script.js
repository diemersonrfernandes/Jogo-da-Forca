/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
   const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 7;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;

const categorias = {
Frutas:["banana", "maça", "pera", "laragnja", "uva", "melancia", "melão"],
Profissões:["engenheiro", "advogado", "medico", "desenvolvedor", "policial", "enfermeiro", "professor"],
Países:["brasil", "alemanha", "argentina", "mexico", "china", "russia", "polonia"],
Animais:["tigre", "cobra", "papagaio", "leopardo", "borboleta", "girafa", "elefante"],
Cores:["vermelho", "preto", "azul", "laranja", "verde", "cinza", "amarelo"],
};

function retornaArrayCategorias(){
    return Object.keys(categorias);
}

function retornaCategoria(){
    const arrayCategorias = retornaArrayCategorias();
    let indiceCategoria = Math.floor(Math.random()*arrayCategorias.length);
    return arrayCategorias[indiceCategoria];
}

function exibirCategoria(){
    categoria.innerHTML = retornaCategoria();
}

function definePalavraProposta(){
    const arrayPalavra = categorias[categoria.innerHTML];
    let indicePalavra = Math.floor(Math.random()*arrayPalavra.length);
    palavraProposta = arrayPalavra[indicePalavra];
    ocultaPalavra();
}

function retornaNumAleatorio(max){
    return Math.floor(Math.random()*max);
}

function ocultaPalavra(){
    let palavraOcultada = "";
    for(let i = 0; i < palavraProposta.length; i++){
            palavraOcultada += "-";
    }
    exibePalavraInterface(palavraOcultada);
}

function exibePalavraInterface(palavra){
    palavraInterface.innerHTML = palavra;
}

function tentativa(letra){
    if(palavraProposta.includes(letra)){
        atualizaPalavraInterface(letra);
    } else{
        letrasErradasArray.push(letra);
        letrasErradas.innerHTML = "Letras errdas: "+ letrasErradasArray;
        if(partesBoneco.length > indiceBoneco){
            desenhaBoneco();
        }
    }
    verificaFimDeJogo();
}

function verificaFimDeJogo(){
    if (!palavraInterface.innerHTML.includes("-")){
        exibePalavraInterface("Voce ganhou !!!");
        window.removeEventListener("keypress",retornaLetra);
    }else if(letrasErradasArray.length >= numTentativas){
        desenhaOlhos();
        exibePalavraInterface("Voce perdeu !!!");
        window.removeEventListener("keypress",retornaLetra);
    }
}

function atualizaPalavraInterface(letra){
    let palavraAux = "";
    for (let i = 0; i<palavraProposta.length; i++){
        if(palavraProposta[i] === letra){
            palavraAux += letra;
        } else if (palavraInterface.innerHTML[i] != "-"){
            palavraAux += palavraInterface.innerHTML[i];
    }else{
            palavraAux += "-";
        }
    }
    exibePalavraInterface(palavraAux);
}

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){ 
    tentativa(e.key);
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    indiceBoneco = 0;
    letrasErradasArray = [];
    ocultaBoneco();
    exibirCategoria();
    definePalavraProposta();
    letrasErradas.innerHTML = "Letras erradas: ";
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);
