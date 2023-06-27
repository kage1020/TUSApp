'use client'

import { Container, Skeleton as MUISkelton } from '@mui/material'

const Skelton = () => {
  return (
    <Container sx={{ display: 'grid', rowGap: '1rem' }}>
      <MUISkelton sx={{ fontSize: '1.5rem' }} variant='rounded' animation='wave' />
      <MUISkelton sx={{ fontSize: '1.5rem' }} variant='rounded' animation='wave' />
      <MUISkelton sx={{ fontSize: '1.5rem' }} variant='rounded' animation='wave' />
      <MUISkelton sx={{ fontSize: '1.5rem' }} variant='rounded' animation='wave' />
      <MUISkelton sx={{ fontSize: '1.5rem' }} variant='rounded' animation='wave' />
    </Container>
  )
}

export default Skelton
