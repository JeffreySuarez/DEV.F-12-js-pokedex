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
  card.classList.add("pokemon-card");

  //   creamos el contenedor de la imagen

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  // creamos el img

  const sprite = document.createElement("img");

  //modificasmo el src

  sprite.src = pokemon.sprites.other["official-artwork"].front_shiny;

  //   creamos la imagen del pokemon
  spriteContainer.appendChild(sprite);

  //   creamos el numero del pokemon
  const number = document.createElement("p");
  // number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;
  number.textContent = pokemon.id;

  //   creamos el nombre del pokemon

  const name = document.createElement("h2");
  name.classList.add("name");
  name.textContent = pokemon.name;

  // haremos un recorrido del tipo de pokemon para agregarlos como parrafo en cada card

  let tipos = pokemon.types.map((type) => ` <p>${type.type.name}</p> `);
  tipos = tipos.join("");
  console.log(tipos);

  const tipo = document.createElement("div");
  tipo.classList.add("tipo-pokemon");
  // tipo.textContent = pokemon.types[0].type.name;
  tipo.innerHTML = tipos;

  if (pokemon.types[0].type.name === "grass") {
    tipo.classList.add("tipoGrass");
    card.classList.add("backgroundGrass");
  } else if (pokemon.types[0].type.name === "fire") {
    tipo.classList.add("tipoFire");
  }

  //   agregamos a la card

  card.appendChild(number);
  card.appendChild(spriteContainer);
  card.appendChild(name);
  card.appendChild(tipo);

  pokemonContainer.appendChild(card);
}
