import { useState, useEffect } from 'react'

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState(null)
  const [pokemonName, setPokemonName] = useState('') // デフォルトのポケモン名

  useEffect(() => {
    const getPokemonData = async () => {
      try {
        // ポケモンの日本語名を英語名に変換
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

    if (pokemonName !== '') {
      getPokemonData()
    } else {
      setPokemonData(null)
    }
  }, [pokemonName])

  const handleInputChange = event => {
    setPokemonName(event.target.value)
  }

  // ポケモンの日本語名を英語名に変換する関数
  const getEnglishName = async japaneseName => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${japaneseName.toLowerCase()}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      return data.name // 英語名を返す
    } catch (error) {
      console.error('Error fetching Pokemon species data:', error)
      return '' // 変換できない場合は空文字を返す
    }
  }

  return (
    <div>
      <input
        type='text'
        value={pokemonName}
        onChange={handleInputChange}
        placeholder='ポケモンの名前を入力'
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
            <p>No image available</p>
          )}
          <h2>ステータス:</h2>
          <ul>
            {pokemonData.stats &&
              pokemonData.stats.map(stat => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
          </ul>
        </div>
      ) : pokemonName !== '' ? (
        <p>読み込み中...</p>
      ) : (
        <p>ポケモンの名前を入力してください</p>
      )}
    </div>
  )
}

export default Pokemon
