import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import { Button, Card, Container, Grid, Text } from '@nextui-org/react'

import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces/pokemon-full'
import pokeApi from '../../api/pokeApi'
import Image from 'next/image'

interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  console.log('pokemon:', pokemon)

  const { front_default, back_default, front_shiny, back_shiny } = pokemon.sprites
  const sprites = [front_default, back_default, front_shiny, back_shiny]

  const title = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

  return (
    <Layout title={`Pokemon - ${title}`}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default ?? '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button color="gradient" ghost>
                Guardar en favoritos
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0} justify="space-between">
                {sprites.map((sprite, id) => (
                  <Image key={id} src={sprite} alt={pokemon.name} width={100} height={100} />
                ))}
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`)

  return {
    paths: pokemon151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`)

  return {
    props: {
      pokemon: data,
    },
  }
}

export default PokemonPage
