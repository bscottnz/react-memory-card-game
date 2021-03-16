import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import pokemon from '../pokemon';

const Game = () => {
  // the pokemon currently on display
  const [currentPokemon, setCurrentPokemon] = useState([]);
  // the pokemon that have been selected
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  // current score
  const [score, setScore] = useState(0);
  // high score
  const [highScore, setHighScore] = useState(0);

  // create image url for given pokemon id (array index + 1)
  const generateImageURL = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  };

  // generate array of pokemon to display
  const generatePokemonToDisplay = () => {
    // array of 4 unique index numbers for pokemon array
    const randomNumbers = [];
    // array of 4 pokemon that will be displayed to screen
    const toDisplay = [];

    // generate 4 unique random numbers between 0 and 150 and append to randomNumbers
    while (randomNumbers.length < 4) {
      const randomPokemonIndex = Math.floor(Math.random() * 151);

      if (!randomNumbers.includes(randomPokemonIndex)) {
        randomNumbers.push(randomPokemonIndex);
      }
    }

    // use the 4 random numbers to access 4 random pokemon
    randomNumbers.forEach((num) => {
      const pokemonData = {
        name: pokemon[num],
        imageURL: generateImageURL(num + 1),
        id: num + 1,
      };

      toDisplay.push(pokemonData);
    });

    setCurrentPokemon(toDisplay);
    console.log(toDisplay);
  };

  useEffect(() => {
    generatePokemonToDisplay();
  }, []);

  return (
    currentPokemon.length > 0 && (
      <div className={'card-container'}>
        {/* <img src={currentPokemon[0].imageURL} onClick={generatePokemonToDisplay} />
        <img src={currentPokemon[1].imageURL} onClick={generatePokemonToDisplay} />
        <img src={currentPokemon[2].imageURL} onClick={generatePokemonToDisplay} />
        <img src={currentPokemon[3].imageURL} onClick={generatePokemonToDisplay} /> */}
        <PokemonCard URL={currentPokemon[0].imageURL} name={currentPokemon[0].name} />
        <PokemonCard URL={currentPokemon[1].imageURL} name={currentPokemon[1].name} />
        <PokemonCard URL={currentPokemon[2].imageURL} name={currentPokemon[2].name} />
        <PokemonCard URL={currentPokemon[3].imageURL} name={currentPokemon[3].name} />
      </div>
    )
  );
};

export default Game;
