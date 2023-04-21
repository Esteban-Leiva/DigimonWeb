var id = 1 //variable que enumera los pokemones mostrados en pantalla
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
            <tr>
                <th scope="row">${id}</th>
                <td>${nombre}</td>
                <td>${nivel}</td>
                <td><img src="${imagen}" width="100px"></td>
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
                <tr>
                    <th scope="row">${id}</th>
                    <td>${nombre}</td>
                    <td>${nivel}</td>
                    <td><img src="${imagen}" width="100px"></td>
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
        console.log(texto)
        contenido.innerHTML = ""
        id=1
        for (digimon of digimons) {
            if(digimon.name.toUpperCase().includes(texto)){
                var nombre = digimon.name
                var imagen = digimon.img
                var nivel =  digimon.level
                contenido.innerHTML += `
                <tr>
                    <th scope="row">${id}</th>
                    <td>${nombre}</td>
                    <td>${nivel}</td>
                    <td><img src="${imagen}" width="100px"></td>
                </tr>
                `
                id++
            }
        }
    })
}