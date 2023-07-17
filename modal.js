const openModal = document.querySelectorAll(".pokemon-card");
console.log(openModal);

// openModal.addEventListener("click", () => {
//   alert("hola");
// });

openModal.forEach((card) => {
  card.addEventListener("click", () => {
    console.log("hola");
    // const idPokemon = e.currentTarget;
    // console.log(idPokemon);
  });
});
