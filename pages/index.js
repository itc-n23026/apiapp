import React, { useState, useEffect } from 'react'
import PokemonStatusChart from '../components/PokemonStatusChart'

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState(null)
  const [pokemonName, setPokemonName] = useState('')

  useEffect(() => {
    const getPokemonData = async () => {
      try {
        const englishName = await getEnglishName(pokemonName)
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${englishName.toLowerCase()}`
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

    getPokemonData()
  }, [pokemonName])

  const handleInputChange = event => {
    setPokemonName(event.target.value)
  }

  const getEnglishName = async japaneseName => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${japaneseName.toLowerCase()}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      return data.name
    } catch (error) {
      console.error('Error fetching Pokemon species data:', error)
      return ''
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', flex: 1 }}>
        <input
          type='text'
          value={pokemonName}
          onChange={handleInputChange}
          placeholder='ポケモンの名前か図鑑番号を入力'
        />
        {pokemonData ? (
          <div>
            <h1>{pokemonData.name}</h1>
            {pokemonData.sprites && pokemonData.sprites.front_default ? (
              <img
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
              />
            ) : (
              <p>画像はありません</p>
            )}
            <h2>ステータス:</h2>
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
          <p>読み込み中...</p>
        ) : (
          <p>ポケモンの名前、または図鑑番号を入力してください</p>
        )}
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
