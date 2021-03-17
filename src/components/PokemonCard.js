import { useEffect, useState } from 'react';

const PokemonCard = ({ name, URL, handleClick, id, style, imgNumber, setLoad }) => {
  // const [style, setStyle] = useState({});

  // useEffect(() => {
  //   setStyle({ transform: 'scale(1)' });
  // }, []);

  return (
    <div className="pokemon-card" onClick={(e) => handleClick(id)}>
      <img
        src={URL}
        className="pokemon-card__img"
        style={style}
        onLoad={(e) => setLoad(imgNumber)}
      />
      <p className="pokemon-card__name">{name}</p>
    </div>
  );
};

export default PokemonCard;
