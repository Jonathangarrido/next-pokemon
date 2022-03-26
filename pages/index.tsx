import { GetStaticProps, NextPage } from 'next'

import { Layout } from '../components/layouts'
import { pokeApi } from '../api'
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list'

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokemons">
      <ul>
        {pokemons.map(({ name, id }) => (
          <li key={id}>
            #{id} - {name}
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons: SmallPokemon[] = data.results.map((pokemon, key) => ({
    ...pokemon,
    id: key + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      key + 1
    }.svg`,
  }))

  return {
    props: {
      pokemons,
    },
  }
}

export default HomePage
