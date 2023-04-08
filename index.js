const incognitas = []

const tabla = []

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

function meterInformacion(lugar, data) {
    for (const cosita of tabla) {
        if (cosita.lugar == lugar) {
            cosita.data = data
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
            casilla.innerHTML = 0
            datoTabla = {
                lugar: nombre, 
                data: casilla.innerHTML
            }
            tabla.push(datoTabla)
        }
    }
    console.log(tabla);
}

function darMinas() {
    for (const mina of incognitas) {
        let lugar = document.getElementById(mina)
        lugar.classList.add("mina")
        lugar.innerHTML = "🧨"
        meterInformacion(mina, lugar.innerHTML)
    }
    console.log(tabla);
}

function oprimir(casilla) {
    console.log(casilla.innerHTML);
    console.log(incognitas);
    if (casilla.classList.contains("mina")) {
        alert("¡Bum!")
    }
}

function marcar(casilla) {
    casilla.innerHTML = "🚩"
}

function darNumeros() {
    for (const mina of incognitas) {
        let n = mina[0]
        let m = mina[1]
        for (const datos of patron) {
            n = mina[0]
            m = mina[1]
            switch (datos[0]) {
                case "i":
                    n = n
                    break;
                case "r":
                    n++
                    break
                case "s":
                    n--
                    break
                default:
                    alert("algo está mal")
                    break;
            }
            switch (datos[1]) {
                case "i":
                    m = m
                    break;
                case "r":
                    m++
                    break
                case "s":
                    m--
                    break
                default:
                    alert("algo está mal")
                    break;
            }
            if (n < 1 || n > 8 || m < 1 || m > 8) {
                console.log("este no existe")
            } else {
                let lugar = document.getElementById(n + "" + m)
                if (!lugar.classList.contains("mina")) {
                    lugar.classList.add("numero")
                    lugar.innerHTML++
                    meterInformacion(n + "" + m, lugar.innerHTML)
                    let clase = ""
                    switch (lugar.innerHTML) {
                        case "1": clase = "uno"; break;
                        case "2": clase = "dos"; break;
                        case "3": clase = "tres"; break;
                        case "4": clase = "cuatro"; break
                        case "5": clase = "cinco"; break
                        case "6": clase = "seis"; break
                        case "7": clase = "siete"; break
                        case "8": clase = "ocho"; break
                        default:
                            alert("algo está mal")
                            break;
                    }
                    lugar.classList.add(clase)
                }
            }
        }
    }
    console.log(tabla);
}

function limpiarCeros() {
    let celdas = document.getElementsByTagName("td")
    for (const celda of celdas) {
        if (celda.innerHTML == "0") {
            celda.innerHTML = " "
            meterInformacion(celda.id, celda.innerHTML)
        }
    }
    console.log(tabla);
}

llenarIncognitas()
darIndices()
darMinas()
darNumeros()
limpiarCeros()