document.addEventListener("DOMContentLoaded",function(){
    const cuadrosTablero = document.querySelectorAll(".tablero div");
    const resultadoAliens = document.querySelector(".conteo");
    let cuadros  = 15;
    let posicionNave = 202;
    let posicionAliens = 0;
    let aliensMuertos = [];
    let iraDerecha = true;
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
    //alients.forEach(alien => cuadrosTablero[posicionAliens + alien].classList.add("aliens"));

    function ubicarAliens(){
        //forma sencilla
        for (let i = 0; i < alients.length; i++){
            if(!aliensMuertos.includes(i)){
                cuadrosTablero[alients[i]].classList.add("aliens")
            }
        }
    }
    ubicarAliens();

    //Funcion para quitar los aliens del tablero
    function quitarAliens(){
        //forma sencilla
        for (let index = 0; index < alients.length; index++){
            cuadrosTablero[alients[index]].classList.remove("aliens")
        }
    }

    //Colocar la nave en posicion inicial, en el tablero
    cuadrosTablero[posicionNave].classList.add("nave");

    //Funcion para mover la nave a los lados 
    function moverNave(e){
        //quitar la nave en el tablero
        cuadrosTablero[posicionNave].classList.remove("nave");

        //mover la nave dependiendo la tecla oprimida 
        switch(e.key){
            case 'ArrowLeft' :
                if( (posicionNave % cuadros) !== 0 ){
                    posicionNave -= 1;
                }
                break;
            case 'ArrowRight' :
                if( (posicionNave % cuadros) < cuadros -1 ){
                    posicionNave += 1;
                }
                break;
        }
        cuadrosTablero[posicionNave].classList.add("nave");
    }
    //Activar la funcion de mover la nave, evento teclado
    document.addEventListener('keydown',moverNave);

    //Mover aliens
    function moverAliens(){
        //Limite para que los alients no se pasen del tablero
        const limiteIzquierda = (alients[0] % cuadros) === 0;
        const limiteDerecha = (alients[alients.length -1] % cuadros) === cuadros -1;
        console.log(limiteDerecha)
        quitarAliens();

        //Mover cuadros a la Derecha
        if(limiteDerecha && iraDerecha){
            for (let i = 0; i < alients.length; i++) {
                alients[i] += cuadros +1;
                direccion = -1;
                iraDerecha = false; 
            }
        }
        //Mover cuadros a la izquierda
        if(limiteIzquierda && !iraDerecha){
            for (let i = 0; i < alients.length; i++) {
                alients[i] += cuadros -1;
                direccion = 1;
                iraDerecha = true; 
            }
        }
        for (let i =0; i < alients.length; i++) {
            alients[i] += direccion;
        }
        ubicarAliens();
        //Juego terminado
        if(cuadrosTablero[posicionNave].classList.contains("aliens")){
            alert("Perdiste")
            location.reload();
        }
    }
    moverAliens();
    alienId = setInterval(moverAliens, 300);

    //Funcion para disparar las balas
    function disparar(evento){
        let balaID;
        let posicionBala = posicionNave;

        //mover la bala
        function moverBala(){
            cuadrosTablero[posicionBala].classList.remove("balas");
            posicionBala -= cuadros;
            cuadrosTablero[posicionBala].classList.add("balas");
            //Matar aliens
            if(cuadrosTablero[posicionBala].classList.contains("aliens")){
                cuadrosTablero[posicionBala].classList.remove("aliens");
                cuadrosTablero[posicionBala].classList.remove("balas");
                cuadrosTablero[posicionBala].classList.add("explosion");
                //Tiempo de la explosion
                setTimeout(()=>cuadrosTablero[posicionBala].classList.remove("explosion"),300);
                clearInterval(balaID);
                //Buscar la posicion del alients eliminado y guardarlo en el arreglo de aliensEliminados
                const alientsEliminados = alients.indexOf(posicionBala);
                aliensMuertos.push(alientsEliminados);
                resultado++;
                resultadoAliens.textContent = resultado;
                console.log(aliensMuertos);
            }
        }
        switch (evento.key) {
            case "ArrowUp":balaID = setInterval(moverBala,100);
             break;
        }
    }
    document.addEventListener("keydown", disparar);

});
