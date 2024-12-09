document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  // Get all display elements
  const pokemonNameDiv = document.getElementById("pokemon-name");
  const pokemonId = document.getElementById("pokemon-id");
  const pokemonImage = document.getElementById("pokemon-image");
  const weight = document.getElementById("weight");
  const height = document.getElementById("height");
  const types = document.getElementById("types");
  const hp = document.getElementById("hp");
  const attack = document.getElementById("attack");
  const defense = document.getElementById("defense");
  const specialAttack = document.getElementById("special-attack");
  const specialDefense = document.getElementById("special-defense");
  const speed = document.getElementById("speed");

  const capitalize = (str) => str.toUpperCase();

  const searchPokemon = async (pokemonName) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      const pokemon = await response.json();

      document.getElementById("pokemon-container").style.display = "grid";

      // Update DOM elements with Pokemon data
      pokemonNameDiv.textContent = capitalize(pokemon.name);
      pokemonId.textContent = `#${pokemon.id}`;
      pokemonImage.innerHTML = `
      <img src="${pokemon.sprites.front_default}" 
           id="sprite" 
           alt="Pokemon ${pokemon.name}" />`;
      weight.textContent = `Weight: ${pokemon.weight}`;
      height.textContent = `Height: ${pokemon.height}`;
      types.innerHTML = pokemon.types
        .map(
          (type) => `<span class="${type.type.name}">${type.type.name}</span>`
        )
        .join("");
      const stats = pokemon.stats;
      hp.textContent = stats[0].base_stat;
      attack.textContent = stats[1].base_stat;
      defense.textContent = stats[2].base_stat;
      specialAttack.textContent = stats[3].base_stat;
      specialDefense.textContent = stats[4].base_stat;
      speed.textContent = stats[5].base_stat;
    } catch (error) {
      alert("Pokemon not found");
    }
  };

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      searchPokemon(searchTerm);
    }
  });
});
