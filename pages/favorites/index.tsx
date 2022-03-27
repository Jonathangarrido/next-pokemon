import { NextPage } from 'next'
import { Text } from '@nextui-org/react'

import { Layout } from '../../components/layouts'

const FavoritesPage: NextPage = () => {
  return (
    <Layout title="Pokemon - favoritos">
      <Text h1>Favoritos</Text>
    </Layout>
  )
}

export default FavoritesPage
