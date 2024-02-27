import React, { useState } from 'react'
import PokemonStatusChart from '../components/PokemonStatusChart'

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState(null)
  const [pokemonName, setPokemonName] = useState('')

  const loadPokemonData = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setPokemonData(data)
    } catch (error) {
      console.error('Error fetching Pokemon data:', error)
    }
  }

  const loadPokemonName = async englishName => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${englishName.toLowerCase()}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      const japaneseName = data.names.find(name => name.language.name === 'ja')
        .name
      setPokemonName(japaneseName)
    } catch (error) {
      console.error('Error fetching Pokemon species data:', error)
    }
  }

  const handleInputChange = event => {
    setPokemonName(event.target.value)
  }

  const handleButtonClick = () => {
    if (pokemonName !== '') {
      loadPokemonName(pokemonName)
      loadPokemonData()
    }
  }

  const typeTranslations = {
    normal: 'ノーマル',
    fire: 'ほのお',
    water: 'みず',
    electric: 'でんき',
    grass: 'くさ',
    ice: 'こおり',
    fighting: 'かくとう',
    poison: 'どく',
    ground: 'じめん',
    flying: 'ひこう',
    psychic: 'エスパー',
    bug: 'むし',
    rock: 'いわ',
    ghost: 'ゴースト',
    dragon: 'ドラゴン',
    dark: 'あく',
    steel: 'はがね',
    fairy: 'フェアリー'
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', flex: 1 }}>
        <input
          type='text'
          value={pokemonName}
          onChange={handleInputChange}
          placeholder='名前か図鑑番号を入力'
        />
        <button onClick={handleButtonClick}>検索</button>
        {pokemonData ? (
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
        ) : pokemonName !== '' ? (
          <p>Loading...</p>
        ) : (
          <p>ポケモンの名前、または図鑑番号を入力して検索できます。</p>
        )}
        <p>
          ポケモンの英語名の確認は
          <a
            href='https://wiki.xn--rckteqa2e.com/wiki/%E3%83%9D%E3%82%B1%E3%83%A2%E3%83%B3%E3%81%AE%E5%A4%96%E5%9B%BD%E8%AA%9E%E5%90%8D%E4%B8%80%E8%A6%A7'
            target='_blank'
          >
            コチラ
          </a>
          。
        </p>
      </div>
      {pokemonData && pokemonData.stats && pokemonData.stats.length > 0 && (
        <div style={{ marginLeft: 'auto', flex: 1 }}>
          <PokemonStatusChart
            pokemonData={[
              { status: 'HP', value: pokemonData.stats[0].base_stat },
              { status: 'こうげき', value: pokemonData.stats[1].base_stat },
              { status: 'ぼうぎょ', value: pokemonData.stats[2].base_stat },
              { status: 'すばやさ', value: pokemonData.stats[5].base_stat },
              {
                status: 'とくぼう',
                value: pokemonData.stats[4].base_stat
              },
              {
                status: 'とくこう',
                value: pokemonData.stats[3].base_stat
              }
            ]}
          />
        </div>
      )}
    </div>
  )
}

export default Pokemon
