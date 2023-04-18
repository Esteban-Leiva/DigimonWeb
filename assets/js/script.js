var id = 1
let todoDigimon = {}
var contenido = document.getElementById("contenido")
contenido.innerHTML = ""

fetch('https://digimon-api.vercel.app/api/digimon')
.then(response => response.json())
.then(digimons => {
    todoDigimon = JSON.parse(JSON.stringify(digimons))
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

console.log(todoDigimon)