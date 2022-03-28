import { GetStaticProps, NextPage, GetStaticPaths } from 'next'

import { Pokemon, PokemonListResponse } from '../../interfaces/'
import pokeApi from '../../api/pokeApi'
import { PokemonInfo } from '../../components/pokemon'
import { getPokemonInfo } from '../../utils'

interface Props {
  pokemon: Pokemon
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  return <PokemonInfo pokemon={pokemon} />
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  return {
    paths: data.results.map(({ name }) => ({
      params: { name },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string }
  console.log('name:', name)

  const pokemon = await getPokemonInfo(name.toLowerCase())

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  }
}

export default PokemonByNamePage
