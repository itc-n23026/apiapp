import React from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts'

const PokemonStatusChart = ({ pokemonData }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <RadarChart cx='50%' cy='50%' outerRadius='80%' data={pokemonData}>
        <PolarGrid />
        <PolarAngleAxis dataKey='status' />
        <PolarRadiusAxis />
        <Radar
          name='Pokemon Status'
          dataKey='value'
          stroke='#8884d8'
          fill='#8884d8'
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default PokemonStatusChart
