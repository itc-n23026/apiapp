import React from 'react'
import PokemonStatusChart from './PokemonStatusChart'

const PokemonStatusChartComponent = ({ pokemonData }) => {
  return (
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
  )
}

export default PokemonStatusChartComponent
