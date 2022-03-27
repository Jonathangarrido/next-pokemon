import { NextPage } from 'next'

import { Layout } from '../../components/layouts'
import { useState, useEffect } from 'react'
import localFavorites from '../../utils/localFavorites'
import { FavoritesEmpty } from '../../components/ui/FavoritesEmpty'
import { FavoritePokemons } from '../../components/pokemon/'

const FavoritesPage: NextPage = () => {
  const [pokemons, setpokemons] = useState<number[]>([])

  useEffect(() => {
    setpokemons(localFavorites.pokemons())
  }, [])

  return (
    <Layout title="Pokemon - favoritos">
      {pokemons.length === 0 ? <FavoritesEmpty /> : <FavoritePokemons pokemons={pokemons} />}
    </Layout>
  )
}

export default FavoritesPage
