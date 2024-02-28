import React, { useState, useEffect } from 'react'
import PokemonInput from '../components/PokemonInput'
import PokemonInfo from '../components/PokemonInfo'
import PokemonStatusChartComponent from '../components/PokemonStatusChartHS'

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState(null)
  const [pokemonName, setPokemonName] = useState('')
  const [pokemonAbilities, setPokemonAbilities] = useState([])

  useEffect(() => {
    const fetchPokemonAbilities = async () => {
      if (pokemonData) {
        try {
          let abilitiesData
          if (pokemonData.id === 999 || pokemonData.id === 1000) {
            const uniqueAbilities = pokemonData.abilities.reduce(
              (unique, ability) => {
                if (!unique.some(item => item.id === ability.ability.id)) {
                  unique.push(ability)
                }
                return unique
              },
              []
            )

            abilitiesData = await Promise.all(
              uniqueAbilities.map(async ability => {
                const response = await fetch(ability.ability.url)
                if (!response.ok) {
                  throw new Error('Network response was not ok')
                }
                const data = await response.json()
                return data
              })
            )
          } else {
            abilitiesData = await Promise.all(
              pokemonData.abilities.map(async ability => {
                const response = await fetch(ability.ability.url)
                if (!response.ok) {
                  throw new Error('Network response was not ok')
                }
                const data = await response.json()
                return data
              })
            )
          }
          setPokemonAbilities(abilitiesData)
        } catch (error) {
          console.error('Error fetching Pokemon abilities:', error)
        }
      }
    }

    fetchPokemonAbilities()
  }, [pokemonData])

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
        <PokemonInput
          value={pokemonName}
          onChange={handleInputChange}
          onClick={handleButtonClick}
          placeholder='名前か図鑑番号を入力'
        />
        {pokemonData ? (
          <PokemonInfo
            pokemonName={pokemonName}
            pokemonData={pokemonData}
            pokemonAbilities={pokemonAbilities}
            typeTranslations={typeTranslations}
          />
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
        <PokemonStatusChartComponent pokemonData={pokemonData} />
      )}
    </div>
  )
}

export default Pokemon
