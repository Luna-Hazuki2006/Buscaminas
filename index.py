import random as rd

incognitas = []
bombas = 0
tabla = []

patron = [
    ["r", "r"], ["r", "i"], ["r", "s"], 
    ["i", "r"], ["i", "s"], 
    ["s", "r"], ["s", "i"], ["s", "s"]
]

def random(): 
    return rd.randint(1, 8)

def llenarIncognitas():
    for i in range(10):
        n = 0
        m = 0
        nm = 0
        while True:
            n = random()
            m = random()
            nm = f"{n}{m}"
            if (nm in incognitas): break
        incognitas.append(nm)

def meterInformacion(lugar, data):
    for cosita in tabla:
        if (cosita.lugar == lugar): 
            cosita.data = data

def sacarInformacion(lugar): 
    for cosita in tabla:
        if (cosita.lugar == lugar): 
            return cosita.data
        
def darIndices():
    for i in range(1, 8):
        datoTabla = {}
        fila = Element(i).children
        numero = 0
        for casilla in fila:
            numero += 1
            nombre = f"{i}{numero}"
            casilla.element.setAttribute("id", nombre)
            casilla.element.setAttribute("onclick", "oprimir(this)")
            casilla.element.setAttribute("oncontextmenu", "marcar(this)")
            casilla.element.classList.add("vacio")
            casilla.element.innerHTML = " "
            datoTabla = {
                "lugar": nombre, 
                "data": casilla.element.innerHTML
            }
            tabla.append(datoTabla)
    print(tabla)

def main():
    llenarIncognitas()
    darIndices()

if (__name__ == "__main__"):
    main()