let pokemones = []
async function cargarPokemones(){
  const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500')
  const data = await respuesta.json()
  const results =  data.results

  const respGen = await fetch('https://pokeapi.co/api/v2/generation')
  const dataGen = await respGen.json()
  const generaciones = await Promise.all(
    dataGen.results.map(async (gen) => {
      const r = await fetch(gen.url)
      return await r.json()
    })
  )

  const regionPorId = {}
  generaciones.forEach(gen => {
    gen.pokemon_species.forEach(especie => {
      const id = especie.url.split('/').filter(Boolean).pop()
      regionPorId[id] = gen.main_region.name
    })
  })

  pokemones = await Promise.all(
    results.map(async (pokemon) =>{
      const id = pokemon.url.split('/').filter(Boolean).pop()
      const resultado = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.name)
      const p = await resultado.json()
      return{
        name: p.name,
        img: p.sprites.front_default,
        types: p.types.map(tipo=>tipo.type.name),
        region: regionPorId[id] || 'desconocida'
      }
    })
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
        tipos += `<span class="tipo ${tipo}">${tipo}</span>`
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
  const texto = buscador.value.toLowerCase()

  const pokemonesFiltrados = pokemones.filter(pokemon => {
    return (filtroTipos.value === "" || pokemon.types.includes(filtroTipos.value))
      && (filtroRegiones.value === "" || pokemon.region === filtroRegiones.value)
      && pokemon.name.toLowerCase().includes(texto)
  })
  mostrarPokemon(pokemonesFiltrados)
}

filtroTipos.addEventListener("change", filtrar)
filtroRegiones.addEventListener("change", filtrar)
buscador.addEventListener("input", filtrar)

function actualizarFiltros(){
  filtroTipos.innerHTML = `<option value="">Todos los tipos</option>`
  filtroRegiones.innerHTML = `<option value="">Todas las regiones</option>`

  let tipos = []
  let regiones = []

  pokemones.forEach(pokemon => {
    pokemon.types.forEach(tipo => {
      if (!tipos.includes(tipo)) {
        tipos.push(tipo)
      }
    })
    if (!regiones.includes(pokemon.region)) {
      regiones.push(pokemon.region)
    }
  })

  tipos.forEach(tipo => {
    filtroTipos.innerHTML += `<option value="${tipo}">${tipo}</option>`
  })
  regiones.forEach(region => {
    filtroRegiones.innerHTML += `<option value="${region}">${region}</option>`
  })
}

actualizarFiltros( )