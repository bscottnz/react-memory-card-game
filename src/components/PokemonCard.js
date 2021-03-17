import { useEffect, useState } from 'react';

const PokemonCard = ({ name, URL, handleClick, id }) => {
  return (
    <div
      className="pokemon-card"
      onClick={(e) => {
        handleClick(id);
      }}
    >
      <img src={URL} className="pokemon-card__img" />
      <p className="pokemon-card__name">{name}</p>
    </div>
  );
};

export default PokemonCard;
