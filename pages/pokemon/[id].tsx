import { GetStaticProps, NextPage, GetStaticPaths } from 'next'

import { Pokemon } from '../../interfaces/pokemon-full'
import { PokemonInfo } from '../../components/pokemon'
import { getPokemonInfo } from '../../utils/getPokemonInfo'

interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return <PokemonInfo pokemon={pokemon} />
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`)

  return {
    paths: pokemon151.map((id) => ({
      params: { id },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }

  const pokemon = await getPokemonInfo(id)

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

export default PokemonPage
