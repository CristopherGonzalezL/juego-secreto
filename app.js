let numeroSecreto = 0;
let intentos = 0;
let listaNumeroSorteados = []; 
let numeroMaximo = 10 ;

function asignarTextoElemento(elemento,texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById(`valorUsuario`).value);
    /* typeof() me ayuda a saber cuál es el tipo de dato que me entrega la variable. boolean, number, string.
    console.log(typeof(numeroDeUsuario));
    console.log(numeroDeUsuario);
    console.log(typeof(numeroSecreto)); 
    console.log(numeroSecreto);
    al agregar === significa que debe ser igual en valor y en tipo de dato.*/
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento(`p`,`Acertaste el número en ${intentos} ${(intentos === 1) ? `vez` : `veces`}`);
        //mezcle template strings con operador ternario
        //el botón de nuevo juego se encuentra disabled, por lo tanto, lo habilitaremos
        document.getElementById(`reiniciar`).removeAttribute(`disabled`);
    } else {
        //el usuario no acertó
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento(`p`,`El número secreto es menor`);
        } else {
            asignarTextoElemento(`p`,`El número secreto es mayor`);
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja(){
    //puedo usar dos formas para llamar a una ID, con querySelector
    //# significa ID y se utiliza en querySelector
    //forma numero 1
    //let valorCaja = document.querySelector(`#valorUsuario`);
    //valorCaja.value = ``;
    //forma numero 2 y más eficiente
    document.querySelector(`#valorUsuario`).value = ``;  
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    //si ya sorteamos todos los intentos, debemos de parar.
    //para eso tomamos la longitud completa del arreglo con .length que debe ser igual al número máximo de oportunidades.
    if (listaNumeroSorteados.length == numeroMaximo) {
        asignarTextoElemento(`p`,`Ya se sortearon todos los números posibles`);
    }   else { 
            //Si el número generado está incluido en la lista 
            if (listaNumeroSorteados.includes(numeroGenerado)) {
                //en este caso se puede volver a usar la función dentro de la misma función
                return generarNumeroSecreto();
            } else {
                //si el numero no está incluido en la lista
                listaNumeroSorteados.push(numeroGenerado)
                return numeroGenerado;
            }
        }
}

function condicionesIniciales(){
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    asignarTextoElemento(`h1`,`Juego del número secreto`);
    asignarTextoElemento(`p`,`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){
    //limpiar la caja
    limpiarCaja();
    //enviar mensaje de inicio, elige un número del uno al diez
    //generar número aleatorio
    //Inicializar el número de intentos
    condicionesIniciales();
    //deshabilitar el botón de reincio
    //de esta forma, deshabilito el botón de reinicio. setAttribute(`string`,`false or true`);
    document.querySelector(`#reiniciar`).setAttribute(`disabled`,`true`);

}

condicionesIniciales();
reiniciarJuego(); 

