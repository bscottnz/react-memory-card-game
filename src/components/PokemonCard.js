const PokemonCard = ({ name, URL }) => {
  return (
    <div className="pokemon-card">
      <img src={URL} className="pokemon-card__img" />
      <p className="pokemon-card__name">{name}</p>
    </div>
  );
};

export default PokemonCard;
