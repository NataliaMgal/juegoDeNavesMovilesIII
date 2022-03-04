document.addEventListener("DOMContentLoaded",function(){
    const cuadrosTablero = document.querySelectorAll(".tablero div");
    const resultadoAliens = document.querySelector(".conteo");
    let cuadros  = 15;
    let posicionNave = 202;
    let posicionAliens = 0;
    let aliensMuertos = [];
    let resultado = 0;
    let direccion = 1;
    let alienId;

    //Posicion inicial de los aliens en el tablero
    let alients = [
        0,1,2,3,4,5,6,7,8,9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39,
    ]

    //Colocar los aliens en el tablero
    alients.forEach(alien => cuadrosTablero[posicionAliens + alien].classList.add("aliens"));
    //Colocar la nave en posicion inicial
    cuadrosTablero[posicionNave].classList.add("nave");

});