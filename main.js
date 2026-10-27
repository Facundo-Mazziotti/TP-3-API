
async function cargarPokemones(){
  const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
  const data = await respuesta.json()
  const results =  data.results


const pokemones = await Promise.all(
  results.map(async (pokemon) =>{
    const resultado = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.name)
    const p = await resultado.json()
    return{
      name: p.name,
      img: p.sprites.front_default,
      types: p.types.map(tipo=>tipo.type.name)
    }
  } 
  )
)
mostrarPokemon(pokemones)
}



const container = document.getElementById('pokemon-container')

 function mostrarPokemon(lista){

    container.innerHTML=""
    lista.forEach( pokemon => {
      let tipos=""
      pokemon.types.forEach(tipo=>{
        tipos += `<span class="tipo">${tipo}</span>`
      })
      container.innerHTML += 
    `
       <article class= "card">
       <h3 class="tipos">${tipos}</h3>
      <h2 class= "pokemon">${pokemon.name}</h2>
      <img src="${pokemon.img}">
    </article>
` 
    })
    }
    cargarPokemones()