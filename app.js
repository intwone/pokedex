const getPokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) => {
  return fetch(getPokemonURL(index + 1)).then(response => response.json())
}) 

const generateHTML = pokemons => {
  return pokemons.reduce((acc, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    acc += `
      <li class="card ${elementTypes[0]}">
        <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" />
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${elementTypes.join(' | ')}</p>
      </li>
    `
    return acc
  }, '')
}

const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons  
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)