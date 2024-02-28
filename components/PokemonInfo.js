import React from 'react'

const PokemonInfo = ({
  pokemonName,
  pokemonData,
  pokemonAbilities,
  typeTranslations
}) => {
  return (
    <div>
      <h1>{pokemonName}</h1>
      {pokemonData.sprites && pokemonData.sprites.front_default ? (
        <img src={pokemonData.sprites.front_default} alt={pokemonName} />
      ) : (
        <p>画像が見つかりません</p>
      )}
      <h2>タイプ</h2>
      <ul>
        {pokemonData.types &&
          pokemonData.types.map(type => (
            <li key={type.slot}>{typeTranslations[type.type.name]}</li>
          ))}
      </ul>
      <h2>特性</h2>
      <ul>
        {pokemonAbilities.map(ability => (
          <li key={ability.id}>
            {ability.names.find(name => name.language.name === 'ja').name}
          </li>
        ))}
      </ul>
      <h2>ステータス</h2>
      <ul>
        {pokemonData.stats &&
          pokemonData.stats.map(stat => (
            <li key={stat.stat.name}>
              {stat.stat.name === 'hp'
                ? 'HP'
                : stat.stat.name === 'attack'
                ? 'こうげき'
                : stat.stat.name === 'defense'
                ? 'ぼうぎょ'
                : stat.stat.name === 'speed'
                ? 'すばやさ'
                : stat.stat.name === 'special-defense'
                ? 'とくぼう'
                : stat.stat.name === 'special-attack'
                ? 'とくこう'
                : stat.stat.name}
              : {stat.base_stat}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default PokemonInfo
