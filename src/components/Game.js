import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import pokemon from '../pokemon';

const Game = ({ incrementScore, resetScore }) => {
  // the pokemon currently on display
  const [currentPokemon, setCurrentPokemon] = useState([]);
  // the pokemon that have been selected
  const [selectedPokemon, setSelectedPokemon] = useState([]);

  // show iamges after they have loaded
  const [didLoad, setDidLoad] = useState(false);
  // const [didImgLoad, setDidImgLoad] = useState([false, false, false, false]);

  // sometimes the onload doesnt fire and the images never display. will fix later
  const [didImgLoad, setDidImgLoad] = useState([true, true, true, true]);

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

    const score = selectedPokemon.length;

    // generate 4 unique random numbers between 0 and 150 and append to randomNumbers
    while (randomNumbers.length < 4) {
      const randomPokemonIndex = Math.floor(Math.random() * 151);

      if (!randomNumbers.includes(randomPokemonIndex)) {
        randomNumbers.push(randomPokemonIndex);
      }
    }

    // reshow selected pokemon until they are 3 out of 4 options
    // pokemon id is 1 more than its index
    if (score === 1) {
      randomNumbers[0] = selectedPokemon[0] - 1;
    }

    if (score === 2) {
      randomNumbers[1] = selectedPokemon[1] - 1;
      randomNumbers[0] = selectedPokemon[0] - 1;
    }

    if (score === 3) {
      randomNumbers[1] = selectedPokemon[1] - 1;
      randomNumbers[2] = selectedPokemon[2] - 1;
      randomNumbers[0] = selectedPokemon[0] - 1;
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

      randomNumbers[1] = selectedPokemon[pokemonToReshow[1]] - 1;
      randomNumbers[2] = selectedPokemon[pokemonToReshow[2]] - 1;
      randomNumbers[0] = selectedPokemon[pokemonToReshow[0]] - 1;

      // console.log(randomNumbers[1]);
      // console.log(randomNumbers[2]);
      // console.log(randomNumbers[0]);
      // console.log(selectedPokemon);
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
        id: num + 1,
      };

      toDisplay.push(pokemonData);
    });

    setCurrentPokemon(toDisplay);
    // console.log(toDisplay);
  };

  useEffect(() => {
    generatePokemonToDisplay();
  }, []);

  useEffect(() => {
    // console.log(selectedPokemon);
    // reset display

    generatePokemonToDisplay();
  }, [selectedPokemon]);

  useEffect(() => {
    // console.log(selectedPokemon);
    // reset display
    // console.log(didImgLoad);
    if (didImgLoad.every(Boolean)) {
      setDidLoad(true);
    }
  }, [didImgLoad]);

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

    // setDidLoad(false);
    // setDidImgLoad([false, false, false, false]);
  };

  const setLoad = (imgNumber) => {
    setDidImgLoad((prevState) => {
      const newState = [...prevState];
      newState[imgNumber] = true;
      return newState;
    });
  };

  return (
    currentPokemon.length > 0 && (
      <div className={'card-container'}>
        {/* <img src={currentPokemon[0].imageURL} onClick={generatePokemonToDisplay} />
        <img src={currentPokemon[1].imageURL} onClick={generatePokemonToDisplay} />
        <img src={currentPokemon[2].imageURL} onClick={generatePokemonToDisplay} />
        <img src={currentPokemon[3].imageURL} onClick={generatePokemonToDisplay} /> */}
        <PokemonCard
          URL={currentPokemon[0].imageURL}
          id={currentPokemon[0].id}
          name={currentPokemon[0].name}
          handleClick={handleClick}
          style={didLoad ? {} : { visibility: 'hidden' }}
          imgNumber={0}
          setLoad={setLoad}
        />
        <PokemonCard
          URL={currentPokemon[1].imageURL}
          id={currentPokemon[1].id}
          name={currentPokemon[1].name}
          handleClick={handleClick}
          style={didLoad ? {} : { visibility: 'hidden' }}
          imgNumber={1}
          setLoad={setLoad}
        />
        <PokemonCard
          URL={currentPokemon[2].imageURL}
          id={currentPokemon[2].id}
          name={currentPokemon[2].name}
          handleClick={handleClick}
          style={didLoad ? {} : { visibility: 'hidden' }}
          imgNumber={2}
          setLoad={setLoad}
        />
        <PokemonCard
          URL={currentPokemon[3].imageURL}
          id={currentPokemon[3].id}
          name={currentPokemon[3].name}
          handleClick={handleClick}
          style={didLoad ? {} : { visibility: 'hidden' }}
          imgNumber={3}
          setLoad={setLoad}
        />
      </div>
    )
  );
};

export default Game;
