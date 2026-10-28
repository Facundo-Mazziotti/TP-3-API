let pokemones = []
async function cargarPokemones(){
  const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
  const data = await respuesta.json()
  const results =  data.results


pokemones = await Promise.all(
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
actualizarFiltros()
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

const buscador = document.getElementById("buscador")
const filtroTipos = document.getElementById("filtroTipos")
const filtroRegiones = document.getElementById("filtroRegiones") 

function filtrar(){
  const pokemonesFiltrados = pokemones.filter( pokemon => {
    return pokemon.types.includes(filtroTipos.value)
      && pokemon.region.includes(filtroRegiones.value)
  })
  mostrarPokemon(pokemonesFiltrados)
}

function buscar(){
  const texto = buscador.value.toLowerCase()

  const pokemonesFiltrados = pokemones.filter ( pokemon =>{
    return pokemon.name.toLowerCase().includes(texto)
      || pokemon.type.toLowerCase().includes(texto)
      || pokemon.region.toLowerCase().includes(texto)
  })
  mostrarPokemon(pokemonesFiltrados)
}

filtroTipos.addEventListener("change", filtrar)
filtroRegiones.addEventListener("change", filtrar)
buscador.addEventListener("input", buscar)

function actualizarFiltros(){
  
filtroTipos.innerHTML =  `<option value="">Todas los tipos</option>`
filtroRegiones.innerHTML =  `<option value="">Todas las regiones</option>`

  let tipos = []
  let regiones = []

  pokemones.forEach(pokemon => {
    
    if( !tipos.includes(pokemon.type) ) {
    tipos.push(pokemon.type)
    }
    if( !regiones.includes(pokemon.region) ) {
      regiones.push(pokemon.region)
    }
  })

  tipos.forEach(tipo =>{
    filtroTipos.innerHTML +=  `<option value="${type}">${type}</option>`
  })
  regiones.forEach(region => {
    filtroRegiones.innerHTML += `<option value="${region}">${region}</option>`
  })
}