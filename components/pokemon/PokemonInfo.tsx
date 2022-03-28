import { FC, useState } from 'react'
import Image from 'next/image'
import { Button, Card, Container, Grid, Text } from '@nextui-org/react'
import confetti from 'canvas-confetti'

import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces/pokemon-full'
import { localfavorites } from '../../utils/'

interface Props {
  pokemon: Pokemon
}

export const PokemonInfo: FC<Props> = ({ pokemon }) => {
  const { front_default, back_default, front_shiny, back_shiny, other } = pokemon.sprites
  const sprites = [front_default, back_default, front_shiny, back_shiny]

  const [isInFavorites, setIsInFavorites] = useState(localfavorites.existInFavorites(pokemon.id))

  const onToggleFavorite = () => {
    localfavorites.toggleFavorites(pokemon.id)
    setIsInFavorites(!isInFavorites)

    if (isInFavorites) return

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    })
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={other?.dream_world.front_default ?? '/no-image.png'}
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
              <Button color="gradient" ghost={!isInFavorites} onClick={onToggleFavorite}>
                {isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
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
