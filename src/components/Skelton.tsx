'use client'

import Container from '@mui/material/Container'
import MUISkelton from '@mui/material/Skeleton'

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
