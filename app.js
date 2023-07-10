const pokemonContainer = document.querySelector(".pokemon-container");

// funcion para hacer la solicitud a la api
async function getPokemon(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const responseJson = await response.json();
    const pokemonsData = await responseJson;
    console.log(pokemonsData);
    createPokemon(pokemonsData);

    // createPokemon(pokemonsData);
  } catch (err) {
    console.log(err);
  }
}

// funcion para traer solo 20 pokemons

function getPokemons(number) {
  for (let i = 1; i <= number; i++) {
    getPokemon(i);
  }
}

getPokemons(20);

//funcion para crear la card de los pokemon

function createPokemon(pokemon) {
  // creamos la card
  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  //   creamos el contenedor de la imagen

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("imag-container");

  // creamos el img

  const sprite = document.createElement("img");

  //modificasmo el src

  sprite.src = pokemon.sprites.front_default;

  //   creamos la imagen del pokemon
  spriteContainer.appendChild(sprite);

  //   creamos el numero del pokemon
  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  //   creamos el nombre del pokemon

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;

  //   agregamos a la card

  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);

  pokemonContainer.appendChild(card);
}
