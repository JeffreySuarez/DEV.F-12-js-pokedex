// ****************************************************************** //
// ***   CREACION DE VARIABLES EXTRAYENDO DEL HTML LA PROPIEDAD    ***//
// ****************************************************************** //

// almacenamos en una variable la clase donde vamos a almacenar la informacion de los pokemon donde almacenaremos las cards
let pokemonContainer = document.querySelector(".pokemon-container");

// creamos la variable donde almacenaremos el input que vamos a trabajar en este caso el search

let searchInput = document.querySelector("#search");

// creamos la variable donde almacenaremos el id del boton que usaremos para filtrar por tipo de pokemon
let buttonFilter = document.querySelectorAll(".btn-header");
// let buttonFilterFire = document.querySelector("#fire");
let buttonFilterTodos = document.querySelector("#ver-todos");
// let buttonFilterNormal = document.querySelector("#normal");
// let buttonFilterWater = document.querySelector("#water");
// let buttonFilterGrass = document.querySelector("#grass");
// let buttonFilterElectric = document.querySelector("#electric");
// let buttonFilterIce = document.querySelector("#ice");
// let buttonFilterFighting = document.querySelector("#fighting");
// let buttonFilterPoison = document.querySelector("#poison");
// let buttonFilterGround = document.querySelector("#ground");
// let buttonFilterFlying = document.querySelector("#flying");
// let buttonFilterPhychic = document.querySelector("#phychic");
// let buttonFilterBug = document.querySelector("#bug");
// let buttonFilterRock = document.querySelector("#rock");
// let buttonFilterGhost = document.querySelector("#ghost");
// let buttonFilterDark = document.querySelector("#dark");
// let buttonFilterDragon = document.querySelector("#dragon");
// let buttonFilterSteel = document.querySelector("#steel");
// let buttonFilterFairy = document.querySelector("#fairy");

// ****************************************************************** //
// ***                      CREACION VARIABLES                     ***//
// ****************************************************************** //

// almacenamos en una constante la URL de la api
const URL = "https://pokeapi.co/api/v2/pokemon/";
console.log(URL.count);

// creamos una variable donde almacenaremos los pokemon
let listPokemon = [];

//vamos a crear una funcion, que cuando realicemos el buscar o el filtrado de pokemons podamos limpiar el array antes de hacer la busqueda o filtrado
const cleanArrayPokemon = () => {
  pokemonContainer.innerHTML = "";
};

// ****************************************************************** //
// ***                      INPUT SEARCH  FILTER                   ***//
// ****************************************************************** //

// utilizaremos el addeventListener para almacenar el valor del input en una varialbe y enviarla como argumento a una funcion para que ella realice su busqueda por el texto que escribamos

//el keyup es un metodo que se ejecuta al terminar de escribir en el teclaro

searchInput.addEventListener("keyup", () => {
  // creamos una variable donde almacenaremos el valor del input al escribir
  const inputText = searchInput.value;

  //creamos una variable para almacenar otra funcion que utilizara un ciclo que recorrera el array principal filtrandolo por el texto que se escriba en el input, despues utilizaremos esta variable para enviarla como parametro a recorrido del array

  // cuando ejecutamos listPokemon2 se almacena en el un nuevo array con los pokemones filtrados en la funcion searchByName despues este nuevo array se envia como argumento a la funcion recorridoDelArray para que el renderice el html con cardPokemon
  let listPokemon2 = searchByName(inputText);

  // console.log(listPokemon2);

  // limpiamos el hmtl antes de mostrar la busqueda search
  cleanArrayPokemon();

  recorridoDelArray(listPokemon2);

  // console.log(listPokemon2);
});

// ****************************************************************** //

// Se crea una variable donde le llegara como parametro el nombre o el texto que se escriba en el input y esta funcion se ejecutara en el callback del addEventListener en el momento de escribir en el input

const searchByName = (searchByNameParameter) => {
  // se crea una variable para almacenar la informacion del filtrado

  //el filtrado funciona asi:  si pokemon.name incluye el texto que esta escrito en el input entonces retornar pokemon que es el listado o el objeto que se almacena en listPokemon de ahi filtra
  const filteredPokemon = listPokemon.filter((pokemon) => {
    if (pokemon.name.includes(searchByNameParameter)) {
      return pokemon;
    }
  });
  return filteredPokemon;
};
// ****************************************************************** //
// ***                          FILTER BUTTON                      ***//
// ****************************************************************** //

//*** Filtro fire **************************************************

let listPokemonType;

buttonFilter.forEach((button) => {
  button.addEventListener("click", (e) => {
    const botonId = e.currentTarget.id;
    console.log(botonId);
    listPokemonType = searchByType(botonId);
    cleanArrayPokemon();
    recorridoDelArray(listPokemonType);
  });
});

// buttonFilterNormal.addEventListener("click", () => {
//   const dataButton = buttonFilterNormal.textContent;
//   console.log(dataButton);
//   listPokemonType = searchByType(dataButton);
//   // limpiamos el hmtl antes de mostrar la busqueda search
//   cleanArrayPokemon();
//   console.log(listPokemon);
//   recorridoDelArray(listPokemonType);
//   console.log(listPokemonType);
// });

// buttonFilterFire.addEventListener("click", () => {
//   const dataButton = buttonFilterFire.textContent;
//   console.log(dataButton);
//   listPokemonType = searchByType(dataButton);
//   // limpiamos el hmtl antes de mostrar la busqueda search
//   cleanArrayPokemon();
//   console.log(listPokemon);
//   recorridoDelArray(listPokemonType);
//   console.log(listPokemonType);
// });

let searchByType = (search) => {
  const filteredPokemon = listPokemon.filter((pokemon) => {
    if (pokemon.tipo === search) {
      return pokemon;
    }
  });
  return filteredPokemon;
};

// ************* Filtro Todos ************************************

buttonFilterTodos.addEventListener("click", () => {
  const dataButton = buttonFilterTodos.textContent;
  cleanArrayPokemon();
  recorridoDelArray(listPokemon);

  console.log(dataButton);
});

// ****************************************************************** //
// ***                      OBTENER POKEMON API                    ***//
// ****************************************************************** //
// creamos una funcion asincrona donde extraemos los pokemons

const getPokemon = async (URL) => {
  try {
    for (let i = 1; i <= 1281; i++) {
      const response = await fetch(URL + i);
      const responseJson = await response.json();
      const pokemonsData = responseJson;

      console.log(pokemonsData);

      agregarListaPokemonArray(pokemonsData);
    }

    // const response = await fetch(URL);

    //creamos un ciclo for of para recorrer la data y extraer el name y la url donde se encontrara mas informacion del pokemon, esos datos los pasaremos luegos como argumento a la funcion agregarListaPokemonArray y como es un ciclo es ira mostrando uno a uno
    // for (pokemon of pokemonsData) {
    //   const name = pokemon.name;
    //   // const url = pokemon.url;
    //   // console.log(url);
    //   try {
    //     const res = await fetch(url);
    //     const resJson = await res.json();
    //     const pokemonData = resJson;
    //     console.log(pokemonData);

    //     // agregamos la funcion para hacer push al listPokemon estos datos van como argumentos a la funcion agregarListaPokemonArray
    //     agregarListaPokemonArray(name, pokemonData);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  } catch (err) {
    console.log(err);
  }
};

// for (let i = 0; i < listPokemon.length; i++) {
//   const element = listPokemon[i];
//   console.log(element);
// }

// ****************************************************************** //
// ***                      AGREGAR POKEMON AL ARRAY               ***//
// ****************************************************************** //
// creamos una variable donde alojaremos una funcion que va a recibir la informacion del ciclo for y almacenarlo en el objeto para hacerle push a la variable listPokemon y almacenarlo.
const agregarListaPokemonArray = (pokemonData) => {
  let name = pokemonData.name;

  // extraemos la imagen del pokemon
  let imagenPokemon = pokemonData.sprites.other["official-artwork"].front_default;
  //Extraemos el id de cada pokemon
  let id = pokemonData.id;
  // creamos una variable donde almacenaremos el tipo de pokemon a recorrer
  // realizamos un map para recorrer el array donde estan los tipos del pokemon al final le aplicamos un metodo join("") para mostrar los dos tipos si es que lo tienen.
  let tipo = pokemonData.types.map((type) => `<p class="tipoPokemon">${type.type.name}</p>`);
  tipo = tipo.join("");
  // console.log(tipo);

  let oneTipo = pokemonData.types.map((type) => type.type.name);
  oneTipo = oneTipo[0];
  // console.log(` El tipo del poquemon es = ${oneTipo}`);

  //   lo almacenamos en un objeto creado para luego hacer push
  const pokemon = {
    name: name,
    img: imagenPokemon,
    id: id,
    tipos: tipo,
    tipo: oneTipo,
  };
  // agregamos cada pokemon al arreglo listPokemon
  listPokemon.push(pokemon);
};
// ya teniendo los pokemons en listPokemon realizamos el render
// ****************************************************************** //
// ***                    RENDERIZAR POKEMON AL HTML               ***//
// ****************************************************************** //
// creamos una funcion donde se creara el html el card el contenido hay varias formas de hacerlo
let cardPokemon = (pokemon) => {
  // console.log(pokemon);
  // console.log(`listado = > ${pokemon.tipos}`);

  // let tipo = pokemon.tipos;
  let cardPokemonContainer = document.createElement("div");
  cardPokemonContainer.classList = "pokemon-card";
  cardPokemonContainer.innerHTML = ` 
            <p>${pokemon.id}</p>
            <h2 class="name" >${pokemon.name}</h2>
            <div class="img-container">
                <img src="${pokemon.img}"/>
            </div>
            <div class="tipo-pokemon">
            ${pokemon.tipos}
            </div>
`;

  pokemonContainer.appendChild(cardPokemonContainer);
};

// ****************************************************************** //

// se crea una variable donde la funcion le llega como parametro la lista de pokemos almacenados en listPokemon  y esta informacion que se recorre se agrega como argumento a la funcion cardPokemon

const recorridoDelArray = (array) => {
  for (let pokemon of array) {
    cardPokemon(pokemon);
  }
};

// ****************************************************************** //
// ***        INICIALIZACION AUTOMATICA DE LAS FUNCIONES           ***//
// ****************************************************************** //

(async () => {
  await getPokemon(URL);
  recorridoDelArray(listPokemon);
})();
