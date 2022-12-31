// 2C Two of clubs (treboles)
// 2D Two of clubs (diamantes)
// 2H Two of heart (corazones)
// 2S Two of spades (spadas)

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHtml = document.querySelectorAll('small');



//Esta funcion crea una nueva baraja

const crearDeck = () => {
    for (let i = 2; i < 10; i++) {
        for (const tipo of tipos) {
            deck.push(i + tipo);
        }

    }

    for (const tipo of tipos) {
        for (const esp of especiales) {
            deck.push(esp + tipo);
        }
    }


    deck = _.shuffle(deck);


}

crearDeck();


//Esta funcion permite tomar una carta

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas'
    }

    const carta = deck.pop();

    return carta;
}

// pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    // let puntos = 0;
    // if(isNaN(valor)){
    //     puntos = (valor === 'A') ?  11:10;
    // }else{
    //     puntos = valor*1
    // }
    // console.log( {puntos})

    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}

//turno computadora
const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHtml[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        } 

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    if (puntosComputadora<=21)  {
        if (puntosComputadora > puntosMinimos) {
            console.warn('perdiste desde turnoComputadora');
        } 
        if (puntosComputadora === puntosMinimos) {
            console.warn('empate desde turnoComputadora');
        }
    }else{
        console.warn('ganaste...');
    }


    
    
    


}

//Eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Lo siento mucho perdiste');
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('Genial...');
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    }
})

btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    btnNuevo.disabled = true;
    turnoComputadora(puntosJugador);

    // if (puntosJugador > 21) {
    //     console.warn('Lo siento mucho perdiste');
    //     btnPedir.disabled = true;
    //     btnNuevo.disabled = true;
    //     turnoComputadora(puntosJugador);
    // } else if (puntosJugador === 21) {
    //     console.warn('Genial...');
    //     btnPedir.disabled = true;
    //     btnNuevo.disabled = true;
    //     turnoComputadora(puntosJugador);
    // }

})



