var id = 1 //variable que enumera los digimons mostrados en pantalla
var contenido = document.getElementById("contenido") 

//se agrega funcionalidad de buscar con tecla "Enter" al buscador
var botonBuscar = document.getElementById("buscar")
botonBuscar.addEventListener("keyup", () =>{
    if (event.key === "Enter"){
        buscar()
    }
})

//Se agrega funcionalidad de refrescar pagina al pulsar "Mundo Digimon"
var inicio = document.getElementById("inicio")
inicio.addEventListener("click", () =>{
    location.reload();
})

//Se cargan todos los digimons al ingresar a la pagina
fetch('https://digimon-api.vercel.app/api/digimon')
.then(response => response.json())
.then(digimons => {
    contenido.innerHTML = ""
    for (digimon of digimons) {
            var nombre = digimon.name
            var imagen = digimon.img
            var nivel =  digimon.level
            contenido.innerHTML += `
            <tr id="${nombre}">
                <th scope="row" onClick="popup('${nombre}')">${id}</th>
                <td onClick="popup('${nombre}')">${nombre}</td>
                <td onClick="popup('${nombre}')">${nivel}</td>
                <td onClick="popup('${nombre}')"><img src="${imagen}" width="100px"></td>
            </tr>
            `
            id++
    }
})

//funcion que filtra los digimons segun nivel seleccionado
function filtrar(nivel){
    fetch(`https://digimon-api.vercel.app/api/digimon/level/${nivel}`)
    .then(response => response.json())
    .then(digimons => {
        contenido.innerHTML = ""
        id = 1
        for (digimon of digimons) {
                var nombre = digimon.name
                var imagen = digimon.img
                var nivel =  digimon.level
                contenido.innerHTML += `
                <tr id="${nombre}">
                    <th scope="row" onClick="popup('${nombre}')">${id}</th>
                    <td onClick="popup('${nombre}')">${nombre}</td>
                    <td onClick="popup('${nombre}')">${nivel}</td>
                    <td onClick="popup('${nombre}')"><img src="${imagen}" width="100px"></td>
                </tr>
                `
                id++
        }
    })
}

//funcion que busca por nombre o parte de el
function buscar(){
    fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(digimons => {
        var texto = document.getElementById("buscar").value.toUpperCase()
        contenido.innerHTML = ""
        id=1
        for (digimon of digimons) {
            if(digimon.name.toUpperCase().includes(texto)){
                var nombre = digimon.name
                var imagen = digimon.img
                var nivel =  digimon.level
                contenido.innerHTML += `
                <tr id="${nombre}">
                    <th scope="row" onClick="popup('${nombre}')">${id}</th>
                    <td onClick="popup('${nombre}')">${nombre}</td>
                    <td onClick="popup('${nombre}')">${nivel}</td>
                    <td onClick="popup('${nombre}')"><img src="${imagen}" width="100px"></td>
                </tr>
                `
                id++
            }
        }
    })
}

function popup(nombre){
    
    var padre = document.getElementById(nombre)
    var tarjeta = document.createElement("tr")
    var imagen = padre.getElementsByTagName("img")[0].currentSrc
    var nivel = padre.getElementsByTagName("td")[1].innerText


    tarjeta.innerHTML = `
        <tr>
            <td></td>
            <td colspan="4" class="card" >
                <img src="${imagen}" alt="${nombre}" style="width:100%">
                <h1>${nombre}</h1>
                <p class="title">${nivel}</p>
            </td>
            <td></td>
            <td></td>
        </tr>
    `

    padre.innerHTML = tarjeta.innerHTML
    
}
