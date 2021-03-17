import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import pokemon from '../pokemon';

const Game = ({ incrementScore, resetScore }) => {
  // the pokemon currently on display
  const [currentPokemon, setCurrentPokemon] = useState([]);
  // the pokemon that have been selected
  const [selectedPokemon, setSelectedPokemon] = useState([]);

  const [style, setStyle] = useState({ visibility: 'hidden' });

  // create image url for given pokemon id (array index + 1)
  const generateImageURL = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  // generate array of pokemon to display
  const generatePokemonToDisplay = () => {
    // array of 4 unique index numbers for pokemon array
    const randomNumbers = [];
    // array of 4 pokemon that will be displayed to screen
    const toDisplay = [];

    const score = selectedPokemon.length;

    // reshow selected pokemon until they are 3 out of 4 options
    // pokemon id is 1 more than its index
    if (score === 1) {
      randomNumbers[0] = selectedPokemon[0];
    }

    if (score === 2) {
      randomNumbers[1] = selectedPokemon[1];
      randomNumbers[0] = selectedPokemon[0];
    }

    if (score === 3) {
      randomNumbers[1] = selectedPokemon[1];
      randomNumbers[2] = selectedPokemon[2];
      randomNumbers[0] = selectedPokemon[0];
    }

    // show 3 random previously selected pokemon
    if (score > 3) {
      const pokemonToReshow = [];

      while (pokemonToReshow.length < 3) {
        // number between 0 and selectedPokemonLength -1
        const randomPokemonIndex = Math.floor(Math.random() * selectedPokemon.length);

        if (!pokemonToReshow.includes(randomPokemonIndex)) {
          pokemonToReshow.push(randomPokemonIndex);
        }
      }

      randomNumbers[1] = selectedPokemon[pokemonToReshow[1]];
      randomNumbers[2] = selectedPokemon[pokemonToReshow[2]];
      randomNumbers[0] = selectedPokemon[pokemonToReshow[0]];
    }

    // generate 4 unique random numbers between 0 and 150 and append to randomNumbers on first load,
    // then only generate enough random nunmbers to fill array

    // i had this while loop at the top originally, before the if statements and sometimes
    // i would get duplicate pokemon.
    while (randomNumbers.length < 4) {
      const randomPokemonIndex = Math.floor(Math.random() * 151);

      if (!randomNumbers.includes(randomPokemonIndex)) {
        randomNumbers.push(randomPokemonIndex);
      }
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    shuffleArray(randomNumbers);

    // use the 4 random numbers to access 4 random pokemon
    randomNumbers.forEach((num) => {
      const pokemonData = {
        name: pokemon[num],
        imageURL: generateImageURL(num + 1),
        id: num,
      };

      toDisplay.push(pokemonData);
    });
    // console.log(toDisplay);
    setCurrentPokemon(toDisplay);
    // console.log(currentPokemon);
  };

  // useEffect(() => {
  //   setStyle({});
  // });

  useEffect(() => {
    generatePokemonToDisplay();
    sleep(1000).then(() => {
      setStyle({});
    });
  }, []);

  // testing rare duplicate pokemon bug
  // useEffect(() => {
  //   console.log(currentPokemon);
  //   console.log(selectedPokemon);
  // }, [currentPokemon]);

  useEffect(() => {
    // reset display

    // hide pokemon after every reload
    setStyle({ visibility: 'hidden' });

    // make sure the hidden visibility is applied before the pokemon to display updates
    sleep(200).then(() => {
      generatePokemonToDisplay();
    });

    // after .7s, show the pokemon again
    sleep(700).then(() => {
      setStyle({});
    });
  }, [selectedPokemon]);

  const handleClick = (id) => {
    // only add selected pokemon if it has not been previously selected
    if (!selectedPokemon.includes(id)) {
      setSelectedPokemon((prevState) => {
        return [...prevState, id];
      });
      incrementScore();
    } else {
      resetScore();
      setSelectedPokemon([]);
    }
  };

  return (
    currentPokemon.length > 0 && (
      <div className={'card-container'} style={style}>
        <PokemonCard
          URL={currentPokemon[0].imageURL}
          id={currentPokemon[0].id}
          name={currentPokemon[0].name}
          handleClick={handleClick}
        />
        <PokemonCard
          URL={currentPokemon[1].imageURL}
          id={currentPokemon[1].id}
          name={currentPokemon[1].name}
          handleClick={handleClick}
        />
        <PokemonCard
          URL={currentPokemon[2].imageURL}
          id={currentPokemon[2].id}
          name={currentPokemon[2].name}
          handleClick={handleClick}
        />
        <PokemonCard
          URL={currentPokemon[3].imageURL}
          id={currentPokemon[3].id}
          name={currentPokemon[3].name}
          handleClick={handleClick}
        />
      </div>
    )
  );
};

export default Game;
