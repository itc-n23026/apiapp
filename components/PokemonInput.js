import React from 'react'

const PokemonInput = ({ value, onChange, onClick, placeholder }) => {
  return (
    <div>
      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button onClick={onClick}>検索</button>
    </div>
  )
}

export default PokemonInput
