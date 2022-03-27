import { GetStaticProps, NextPage, GetStaticPaths } from 'next'

import { Pokemon, PokemonListResponse } from '../../interfaces/'
import pokeApi from '../../api/pokeApi'
import { PokemonInfo } from '../../components/pokemon'

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
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string }

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`)

  return {
    props: {
      pokemon: data,
    },
  }
}

export default PokemonByNamePage
