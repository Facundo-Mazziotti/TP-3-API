fetch('https://pokeapi.co/api/v2/pokemon')
.then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log(data)
    pokemones = data.results
    mostrarPokemon(pokemones)
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

 let pokemones = []

const container = document.getElementById('pokemon-container')

 function mostrarPokemon(lista){

    container.innerHTML=""
    lista.forEach( pokemon => {
      container.innerHTML += 
    `
       <article class= "card">
      <h2 class= "pokemon">${pokemon.name}</h2>
      <img src="${pokemon.url}"><img>

    </article>
` 
    })
    }