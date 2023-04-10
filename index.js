let incognitas = []
let bombas = 0
let tabla = []
let ganar = new Audio("assets/berdly_audience.ogg")
let perder = new Audio("assets/midi-holiday-country.mp3")

const patron = [
    ["r", "r"], ["r", "i"], ["r", "s"], 
    ["i", "r"], ["i", "s"], 
    ["s", "r"], ["s", "i"], ["s", "s"]
]

function random() {
    return Math.floor(Math.random() * 8) + 1
}

function llenarIncognitas() {
    for (let i = 0; i < 10; i++) {
        let n, m, nm
        do {
            n = random()
            m = random()
            nm = n + "" + m
        } while (incognitas.includes(nm));
        incognitas.push(nm)
    }
    
}

function meterInformacion(lugar, data, uso) {
    for (const cosita of tabla) {
        if (cosita.lugar == lugar) {
            cosita.data = data
            cosita.uso = uso
        }
    }
}

function sacarInformacion(lugar) {
    for (const cosita of tabla) {
        if (cosita.lugar == lugar) {
            return cosita.data
        }
    }
}

function sacarRealidad(lugar) {
    for (const cosita of tabla) {
        if (cosita.lugar == lugar) {
            return cosita.uso
        }
    }
}

function darIndices() {
    for (let i = 1; i <= 8; i++) {
        let datoTabla = {}
        let fila = document.getElementById(i).children
        let numero = 0
        for (const casilla of fila) {
            numero++
            let nombre = i + "" + numero
            casilla.setAttribute("id", nombre)
            casilla.setAttribute("onclick", "oprimir(this)")
            casilla.setAttribute("oncontextmenu", "marcar(this)")
            casilla.classList.add("vacio")
            casilla.innerHTML = " "
            datoTabla = {
                lugar: nombre, 
                data: casilla.innerHTML, 
                uso: false
            }
            tabla.push(datoTabla)
        }
    }
    console.log(tabla);
}

function darMinas() {
    for (const mina of incognitas) {
        let lugar = document.getElementById(mina)
        // lugar.classList.add("mina")
        // lugar.innerHTML = "🧨"
        meterInformacion(mina, "🧨", true)
    }
    console.log(tabla);
}

function darClaseNumeros(casilla, info) {
    let clase = ""
    switch (info) {
        case 1: clase = "uno"; break;
        case 2: clase = "dos"; break;
        case 3: clase = "tres"; break;
        case 4: clase = "cuatro"; break
        case 5: clase = "cinco"; break
        case 6: clase = "seis"; break
        case 7: clase = "siete"; break
        case 8: clase = "ocho"; break
        default: alert("algo está mal"); break;
    }
    casilla.classList.add(clase)
}

function llenarBlancos(casilla) {
    let dato = casilla.id
    let verdad = sacarRealidad(dato)
    console.log(verdad);
    if (verdad) return
    meterInformacion(dato, casilla.innerHTML, true)
    for (const datos of patron) {
        let n = dato[0]
        let m = dato[1]
        switch (datos[0]) {
            case "i": n = n; break;
            case "r": n++; break
            case "s": n--; break
            default: alert("algo está mal"); break;
        }
        switch (datos[1]) {
            case "i": m = m; break;
            case "r": m++; break
            case "s": m--; break
            default: alert("algo está mal"); break;
        }
        if (n < 1 || n > 8 || m < 1 || m > 8) {
            console.log("este no existe")
        } else {
            let lugar = document.getElementById(n + "" + m)
            let real = sacarInformacion(lugar.id)
            lugar.removeAttribute("onclick")
            lugar.removeAttribute("oncontextmenu")
            lugar.classList.add("tocado")
            console.log(real);
            if (real != " ") {
                console.log("verdades");
                darClaseNumeros(lugar, real)
                lugar.innerHTML = real
            } else {
                llenarBlancos(lugar)
            }
        }
    }
    // for (const datos of patron) {
    //     let n = dato[0]
    //     let m = dato[1]
    //     switch (datos[0]) {
    //         case "i": n = n; break;
    //         case "r": n++; break
    //         case "s": n--; break
    //         default: alert("algo está mal"); break;
    //     }
    //     switch (datos[1]) {
    //         case "i": m = m; break;
    //         case "r": m++; break
    //         case "s": m--; break
    //         default: alert("algo está mal"); break;
    //     }
    //     if (n < 1 || n > 8 || m < 1 || m > 8) {
    //         console.log("este no existe")
    //     } else {
    //         let lugar = document.getElementById(n + "" + m)
    //         let real = sacarInformacion(lugar.id)
    //         lugar.removeAttribute("onclick")
    //         lugar.removeAttribute("oncontextmenu")
    //         lugar.classList.add("tocado")
    //         console.log(real);
    //         if (real != " ") {
    //             console.log("verdades");
    //             darClaseNumeros(lugar, real)
    //             lugar.innerHTML = real
    //         } else {
    //             llenarBlancos(casilla)
    //         }
    //     }
    // }
}

function oprimir(casilla) {
    casilla.removeAttribute("onclick")
    casilla.removeAttribute("oncontextmenu")
    casilla.classList.add("tocado")
    info = sacarInformacion(casilla.id)
    casilla.innerHTML = info
    if (info == "🧨") {
        for (const mina of incognitas) {
            let lugar = document.getElementById(mina)
            if (lugar.innerHTML != "🚩") {
                lugar.classList.add("mina")
                lugar.innerHTML = "🧨"
            }
        }
        let casillas = document.getElementsByTagName("td")
        for (const esto of casillas) {
            esto.removeAttribute("onclick")
            esto.removeAttribute("oncontextmenu")
        }
        let final = document.getElementById("final")
        final.innerHTML = "¡Perdiste! 😔"
        perder.play()
        alert("¡Bum!")
    } else if (info != " ") {
        darClaseNumeros(casilla, info)
    } else {
        llenarBlancos(casilla)
    }
}

function marcar(casilla) {
    let marca = " "
    switch (casilla.innerHTML) {
        case "🚩": 
            marca = "❓";
            bombas-- 
            break;
        case "❓": 
            marca = " "; 
            casilla.setAttribute("onclick", "oprimir(this)")
            break;
        case " ": 
            marca = "🚩"; 
            casilla.removeAttribute("onclick")
            bombas++
            break;
        default: alert("algo está mal"); break;
    }
    casilla.innerHTML = marca
    let contador = document.getElementById("contador")
    contador.innerHTML = "Bombas encontradas: " + bombas
    if (bombas == incognitas.length) {
        let verdad = true
        for (const mina of incognitas) {
            let lugar = document.getElementById(mina)
            if (lugar.innerHTML != "🚩") {
                verdad = false
            }
        }
        console.log("verdad");
        console.log(verdad);
        if (verdad) {
            ganar.play()
            let casillas = document.getElementsByTagName("td")
            for (const esto of casillas) {
                esto.removeAttribute("onclick")
                esto.removeAttribute("oncontextmenu")
            }
            let final = document.getElementById("final")
            final.innerHTML = "¡Ganaste! ✨"
            alert("¡Ganaste! ✨")
        }
    }
}

function darNumeros() {
    for (const mina of incognitas) {
        let n = mina[0]
        let m = mina[1]
        for (const datos of patron) {
            n = mina[0]
            m = mina[1]
            switch (datos[0]) {
                case "i": n = n; break;
                case "r": n++; break
                case "s": n--; break
                default:
                    alert("algo está mal")
                    break;
            }
            switch (datos[1]) {
                case "i": m = m; break;
                case "r": m++; break
                case "s": m--; break
                default:
                    alert("algo está mal")
                    break;
            }
            if (n < 1 || n > 8 || m < 1 || m > 8) {
                console.log("este no existe")
            } else {
                // let lugar = document.getElementById(n + "" + m)
                // if (!lugar.classList.contains("mina")) {
                //     lugar.classList.add("numero")
                //     lugar.innerHTML++
                let lugar = sacarInformacion(n + "" + m)
                console.log("lugar");
                console.log(lugar);
                if (lugar != "🧨") {
                    lugar++
                    meterInformacion(n + "" + m, lugar, true)
                }
            }
        }
    }
    console.log(tabla);
}

function limpiarCeros() {
    // let celdas = document.getElementsByTagName("td")
    // for (const celda of celdas) {
    //     if (celda.innerHTML == "0") {
    //         celda.innerHTML = " "
    //         meterInformacion(celda.id, celda.innerHTML)
    //     }
    // }
    for (const cosita of tabla) {
        if (cosita.data == "0") {
            cosita.data = " "
            meterInformacion(cosita.lugar, cosita.data, false)
        }
    }
    console.log(tabla);
}

function reiniciar() {
    incognitas = []
    bombas = 0
    tabla = []
    document.getElementById("final").innerHTML = ""
    document.getElementById("tiempo").innerHTML = ""
    document.getElementById("contador").innerHTML = "Bombas encontradas: 0"
    let cositas = document.getElementsByTagName("td")
    for (const lugar of cositas) {
        lugar.removeAttribute("class")
        lugar.classList.add("vacio")
    }
    perder.pause()
    ganar.pause()
    llenarIncognitas()
    darIndices()
    darMinas()
    darNumeros()
    limpiarCeros()
}

// let myVar = setInterval(myTimer, 0);
// function myTimer() {
//     const d = new Date();
//     document.getElementById("tiempo").innerHTML = d.toLocaleTimeString();
// }

reiniciar()