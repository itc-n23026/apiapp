import React, { useState } from 'react'

const BASE_URL = 'https://pokeapi.co/api/v2/'

const PokemonNameConverter = () => {
  const [japaneseName, setJapaneseName] = useState('')
  const [englishName, setEnglishName] = useState('')

  const getEnglishName = async japaneseName => {
    try {
      const encodedName = encodeURIComponent(japaneseName.trim()) // 不要な空白を削除してエンコードする
      const response = await fetch(`${BASE_URL}pokemon-species/${encodedName}`)
      if (!response.ok) {
        throw new Error('ポケモンの情報を取得できませんでした。')
      }
      const data = await response.json()
      const nameInfo = data.names.find(name => name.language.name === 'en')
      if (nameInfo) {
        setEnglishName(nameInfo.name)
      } else {
        setEnglishName('英語名が見つかりません。')
      }
    } catch (error) {
      console.error('エラー:', error)
      setEnglishName('ポケモンの情報を取得できませんでした。')
    }
  }

  const handleInputChange = event => {
    setJapaneseName(event.target.value)
  }

  const handleButtonClick = () => {
    if (japaneseName.trim() !== '') {
      getEnglishName(japaneseName)
    }
  }

  return (
    <div>
      <input
        type='text'
        value={japaneseName}
        onChange={handleInputChange}
        placeholder='ポケモンの日本語名を入力してください'
      />
      <button onClick={handleButtonClick}>変換する</button>
      <p>
        {japaneseName}の英語名: {englishName}
      </p>
    </div>
  )
}

export default PokemonNameConverter
